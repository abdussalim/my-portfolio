// Usage: node scripts/assets/check-blocklist.mjs [extraPath ...]
// Scans public/, content/ and any extra paths. Exit 1 on errors; warnings do not fail.
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const roots = ["public", "content", ...process.argv.slice(2)];

const OWN_EMAIL = "abdussalimsan@gmail.com";

// Known-safe findings. Each entry needs a reason. Matched against the finding's text.
const ALLOW = [
  // { rule: "hex32", text: "<exact match>", why: "..." },
];

const FORBIDDEN_NAME = [
  /\.sql$/i, /\.csv$/i, /\.pem$/i, /\.key$/i, /^\.env/i, /\.local\.json$/i, /\.zip$/i, /\.rar$/i, /\.dump$/i,
];

const TEXT_EXT = new Set([".ts", ".tsx", ".json", ".md", ".html", ".svg", ".txt", ".xml", ".css", ".js", ".mjs"]);
const IMG_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"]);
const VID_EXT = new Set([".mp4", ".webm", ".mov"]);

const O = "(?:25[0-5]|2[0-4]\\d|1?\\d?\\d)";
const TEXT_RULES = [
  { id: "ipv4", re: new RegExp(`(?<![\\w.])${O}(?:\\.${O}){3}(?![\\w.]*\\w)`, "g"), skip: (m) => m === "127.0.0.1" || m === "0.0.0.0" },
  { id: "pem-header", re: /-----BEGIN [A-Z ]*(?:PRIVATE KEY|CERTIFICATE|PUBLIC KEY)-----/g },
  { id: "telegram-token", re: /\b\d{8,10}:[A-Za-z0-9_-]{35}\b/g },
  { id: "github-token", re: /\b(?:ghp_|gho_|github_pat_)[A-Za-z0-9_]{20,}/g },
  { id: "aws-key", re: /\bAKIA[0-9A-Z]{16}\b/g },
  { id: "sk-key", re: /\bsk-[A-Za-z0-9_-]{20,}/g },
  { id: "windows-user-path", re: /[A-Za-z]:\\{1,2}Users\\/gi },
  { id: "email", re: /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/g, skip: (m) => m.toLowerCase() === OWN_EMAIL },
  { id: "id-phone", re: /(?<![\d.+-])(?:\+62|08)[\d -]?\d{8,12}(?!\d)/g },
  { id: "hex32", re: /(?<![0-9a-zA-Z])[a-f0-9]{32}(?![0-9a-zA-Z])/g },
];

const errors = [];
const warns = [];
let workBytes = 0;
let scanned = 0;

const rel = (p) => path.relative(ROOT, p).replaceAll("\\", "/");
const allowed = (rule, text) => ALLOW.some((a) => a.rule === rule && a.text === text);

async function walk(p) {
  let st;
  try {
    st = await stat(p);
  } catch {
    return;
  }
  if (st.isDirectory()) {
    for (const e of await readdir(p)) {
      if (e === "node_modules" || e === ".git") continue;
      await walk(path.join(p, e));
    }
    return;
  }
  await checkFile(p, st);
}

async function checkFile(p, st) {
  const name = path.basename(p);
  const ext = path.extname(p).toLowerCase();
  const r = rel(p);
  const inWork = r.startsWith("public/work/");
  const inPublic = r.startsWith("public/");
  scanned++;
  if (inWork) workBytes += st.size;

  if (FORBIDDEN_NAME.some((re) => re.test(name))) {
    errors.push(`${r}: forbidden file type`);
    return;
  }

  const kb = st.size / 1024;
  if (inPublic && IMG_EXT.has(ext) && kb > 250) {
    (inWork ? errors : warns).push(`${r}: image ${kb.toFixed(0)} KB > 250 KB${inWork ? "" : " (legacy)"}`);
  }
  if (inPublic && VID_EXT.has(ext) && kb > 4096) {
    (inWork ? errors : warns).push(`${r}: video ${(kb / 1024).toFixed(1)} MB > 4 MB${inWork ? "" : " (outside work/)"}`);
  }

  if (!TEXT_EXT.has(ext)) return;
  const text = await readFile(p, "utf8");
  for (const rule of TEXT_RULES) {
    for (const m of text.matchAll(rule.re)) {
      const hit = m[0];
      if (rule.skip?.(hit) || allowed(rule.id, hit)) continue;
      const line = text.slice(0, m.index).split("\n").length;
      errors.push(`${r}:${line}: [${rule.id}] ${hit.length > 60 ? hit.slice(0, 57) + "..." : hit}`);
    }
  }
}

for (const r of roots) await walk(path.resolve(ROOT, r));

const WORK_MAX = 60 * 1024 * 1024;
if (workBytes > WORK_MAX) errors.push(`public/work/: total ${(workBytes / 1048576).toFixed(1)} MB > 60 MB`);

console.log(`check-blocklist: scanned ${scanned} files in ${roots.join(", ")}`);
console.log(`public/work/ total: ${(workBytes / 1048576).toFixed(2)} MB / 60 MB`);
if (warns.length) console.log(`\nWARNINGS (${warns.length})\n` + warns.map((w) => "  " + w).join("\n"));
if (errors.length) {
  console.log(`\nERRORS (${errors.length})\n` + errors.map((e) => "  " + e).join("\n"));
  process.exit(1);
}
console.log("\nOK: no blocking findings.");

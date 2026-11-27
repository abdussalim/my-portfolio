// Usage: node scripts/diagrams/render.mjs [slug ...]   (no slug = all)
// Renders data/<slug>.mjs to PNG (light + dark) in the scratchpad dir, then converts to webp in public/work/<slug>/.
// Env: DIAGRAM_TMP overrides the PNG output dir.
import { chromium } from "@playwright/test";
import { mkdir, writeFile, readdir, stat } from "node:fs/promises";
import { pathToFileURL, fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const fontDir = pathToFileURL(path.join(root, "showreel/assets/fonts")).href;
const tmp = process.env.DIAGRAM_TMP || path.join(root, "node_modules/.cache/diagrams");
const W = 1600;
const QUALITY = Number(process.env.DIAGRAM_QUALITY || 82);

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function contours(H) {
  const centers = [[1380, 260, 3.1], [180, H - 220, 1.7]];
  let out = "";
  for (const [cx, cy, seed] of centers) {
    for (let r = 70; r < 1000; r += 52) {
      let d = "";
      for (let a = 0; a <= Math.PI * 2 + 0.01; a += 0.08) {
        const k = 1 + 0.11 * Math.sin(3 * a + seed + r / 140) + 0.06 * Math.sin(5 * a + r / 90 + seed * 2) + 0.04 * Math.sin(2 * a - r / 200);
        const x = cx + r * k * 1.25 * Math.cos(a), y = cy + r * k * 0.8 * Math.sin(a);
        d += (d ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
      }
      out += `<path d="${d}Z" class="ctr"/>`;
    }
  }
  return out;
}

function side(n, s, f = 0.5) {
  if (s === "l") return [n.x, n.y + n.h * f];
  if (s === "r") return [n.x + n.w, n.y + n.h * f];
  if (s === "t") return [n.x + n.w * f, n.y];
  return [n.x + n.w * f, n.y + n.h];
}

function route(e, nodes) {
  const [fid, fs] = e.from.split("."), [tid, ts] = e.to.split(".");
  const a = side(nodes[fid], fs, e.fa ?? 0.5), b = side(nodes[tid], ts, e.ta ?? 0.5);
  let pts = [a];
  if (e.via) pts.push(...e.via);
  else {
    const fh = fs === "l" || fs === "r", th = ts === "l" || ts === "r";
    if (fh && th) {
      if (Math.abs(a[1] - b[1]) > 0.5) { const mx = e.mid ?? (a[0] + b[0]) / 2; pts.push([mx, a[1]], [mx, b[1]]); }
    } else if (!fh && !th) {
      if (Math.abs(a[0] - b[0]) > 0.5) { const my = e.mid ?? (a[1] + b[1]) / 2; pts.push([a[0], my], [b[0], my]); }
    } else if (fh && !th) { if (Math.abs(a[0] - b[0]) > 0.5 && Math.abs(a[1] - b[1]) > 0.5) pts.push([b[0], a[1]]); }
    else { if (Math.abs(a[0] - b[0]) > 0.5 && Math.abs(a[1] - b[1]) > 0.5) pts.push([a[0], b[1]]); }
  }
  pts.push(b);
  return pts;
}

function build(D) {
  const H = D.height;
  const nodes = Object.fromEntries(D.nodes.map((n) => [n.id, n]));
  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(D.title)}">`;
  s += `<defs>
<marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse" markerUnits="userSpaceOnUse"><path d="M0 1.5L9 5L0 8.5Z" fill="var(--muted)"/></marker>
<marker id="ahp" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse" markerUnits="userSpaceOnUse"><path d="M0 1.5L9 5L0 8.5Z" fill="var(--signal)"/></marker>
<clipPath id="cv"><rect x="0" y="0" width="${W}" height="${H}"/></clipPath></defs>`;
  s += `<rect width="${W}" height="${H}" fill="var(--paper)"/><g clip-path="url(#cv)">${contours(H)}</g>`;
  // survey frame + ticks
  s += `<rect x="16.5" y="16.5" width="${W - 33}" height="${H - 33}" fill="none" stroke="var(--line)" rx="4"/>`;
  for (let x = 100; x < W - 16; x += 100) s += `<path d="M${x} 16v8M${x} ${H - 16}v-8" stroke="var(--line)"/>`;
  for (let y = 100; y < H - 16; y += 100) s += `<path d="M16 ${y}h8M${W - 16} ${y}h-8" stroke="var(--line)"/>`;
  // header
  s += `<text x="56" y="62" class="mono eyebrow">${esc(D.eyebrow)}</text>`;
  s += `<text x="56" y="108" class="title">${esc(D.title)}</text>`;
  if (D.subtitle) s += `<text x="56" y="140" class="sub">${esc(D.subtitle)}</text>`;
  // groups
  for (const g of D.groups || []) {
    s += `<rect x="${g.x}" y="${g.y}" width="${g.w}" height="${g.h}" rx="4" class="grp"/>`;
    s += `<text x="${g.x + 16}" y="${g.y + 26}" class="mono geyebrow">${esc(g.label)}</text>`;
  }
  // edges
  const labels = [];
  for (const e of D.edges || []) {
    const pts = route(e, nodes);
    const d = pts.map((p, i) => (i ? "L" : "M") + p[0] + " " + p[1]).join("");
    const cls = (e.primary ? "edge prim" : "edge") + (e.dashed ? " dash" : "");
    s += `<path d="${d}" class="${cls}" marker-end="url(#${e.primary ? "ahp" : "ah"})"${e.both ? ` marker-start="url(#${e.primary ? "ahp" : "ah"})"` : ""}/>`;
    if (e.label) {
      let bi = 0, bl = -1;
      for (let i = 0; i < pts.length - 1; i++) {
        const l = Math.abs(pts[i + 1][0] - pts[i][0]) + Math.abs(pts[i + 1][1] - pts[i][1]);
        if (l > bl) { bl = l; bi = i; }
      }
      const f = e.lp ?? 0.5;
      const lx = pts[bi][0] + (pts[bi + 1][0] - pts[bi][0]) * f, ly = pts[bi][1] + (pts[bi + 1][1] - pts[bi][1]) * f;
      labels.push({ lx, ly, t: e.label, dx: e.ldx || 0, dy: e.ldy || 0, prim: e.primary });
    }
  }
  // nodes
  for (const n of D.nodes) {
    if (n.k === "ghost") continue;
    const subs = n.s || [];
    const cls = "node" + (n.k === "strong" ? " strong" : "") + (n.k === "dashed" ? " dash" : "");
    s += `<rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="4" class="${cls}"/>`;
    const block = 20 + subs.length * 19;
    let y = n.y + (n.h - block) / 2 + 15;
    const maxw = n.w - 28 - (n.tag ? 70 : 0);
    s += `<text x="${n.x + 14}" y="${y}" class="nt" data-maxw="${maxw}" data-id="${n.id}">${esc(n.t)}</text>`;
    subs.forEach((t, i) => { s += `<text x="${n.x + 14}" y="${y + 21 + i * 19}" class="mono ns" data-maxw="${n.w - 28}" data-id="${n.id}">${esc(t)}</text>`; });
    if (n.tag) s += `<text x="${n.x + n.w - 12}" y="${n.y + 22}" text-anchor="end" class="mono tag">${esc(n.tag)}</text>`;
  }
  // edge labels on top
  for (const l of labels) {
    const w = l.t.length * 8.4 + 14, x = l.lx + l.dx, y = l.ly + l.dy;
    s += `<rect x="${x - w / 2}" y="${y - 12}" width="${w}" height="22" rx="3" class="lblbg"/><text x="${x}" y="${y + 4}" text-anchor="middle" class="mono el" data-maxw="${w}">${esc(l.t)}</text>`;
  }
  // legend
  const ly = H - 44;
  s += `<path d="M56 ${ly}H100" class="edge prim" marker-end="url(#ahp)"/><text x="112" y="${ly + 5}" class="mono lg">${esc(D.legend?.[0] || "primary request / data path")}</text>`;
  s += `<path d="M470 ${ly}H514" class="edge dash" marker-end="url(#ah)"/><text x="526" y="${ly + 5}" class="mono lg">${esc(D.legend?.[1] || "secondary / one-time / planned")}</text>`;
  s += `<text x="${W - 56}" y="${ly + 5}" text-anchor="end" class="mono lg">${esc(D.footer || "")}</text>`;
  return s + "</svg>";
}

const css = `
@font-face{font-family:"Bricolage Grotesque";font-weight:700;src:url("${fontDir}/BricolageGrotesque-700.woff2")}
@font-face{font-family:"Bricolage Grotesque";font-weight:500;src:url("${fontDir}/BricolageGrotesque-500.woff2")}
@font-face{font-family:"Geist";font-weight:400;src:url("${fontDir}/Geist-400.woff2")}
@font-face{font-family:"Geist";font-weight:500;src:url("${fontDir}/Geist-500.woff2")}
@font-face{font-family:"Geist Mono";font-weight:400;src:url("${fontDir}/GeistMono-400.woff2")}
@font-face{font-family:"Geist Mono";font-weight:500;src:url("${fontDir}/GeistMono-500.woff2")}
:root{--paper:#eef1ef;--surface:#f7f9f8;--ink:#15201c;--muted:#56635d;--line:rgba(21,32,28,.18);--lines:rgba(21,32,28,.42);--ctr:rgba(21,32,28,.06);--signal:#d9481a}
:root[data-theme=dark]{--paper:#0f1513;--surface:#151d1a;--ink:#e2e9e5;--muted:#94a29b;--line:rgba(226,233,229,.16);--lines:rgba(226,233,229,.42);--ctr:rgba(226,233,229,.05);--signal:#ff6a35}
html,body{margin:0;padding:0;background:var(--paper)}svg{display:block}
text{font-family:"Geist",sans-serif;fill:var(--ink)}
.mono{font-family:"Geist Mono",monospace}
.eyebrow{font-size:14px;letter-spacing:.14em;text-transform:uppercase;fill:var(--muted)}
.title{font-family:"Bricolage Grotesque",sans-serif;font-weight:700;font-size:38px;letter-spacing:-.01em}
.sub{font-size:17px;fill:var(--muted)}
.ctr{fill:none;stroke:var(--ctr);stroke-width:1}
.grp{fill:none;stroke:var(--lines);stroke-width:1;stroke-dasharray:6 5}
.geyebrow{font-size:14px;letter-spacing:.12em;text-transform:uppercase;fill:var(--muted)}
.node{fill:var(--surface);stroke:var(--lines);stroke-width:1}
.node.strong{stroke:var(--ink);stroke-width:1.5}
.node.dash{stroke-dasharray:4 4;fill:var(--paper)}
.nt{font-weight:500;font-size:16px}
.ns{font-size:14px;fill:var(--muted)}
.tag{font-size:14px;letter-spacing:.08em;fill:var(--muted)}
.edge{fill:none;stroke:var(--muted);stroke-width:1.25}
.edge.prim{stroke:var(--signal);stroke-width:2}
.edge.dash{stroke-dasharray:5 4}
.lblbg{fill:var(--paper);stroke:none}
.el{font-size:14px;fill:var(--muted)}
.lg{font-size:14px;fill:var(--muted)}
`;

const slugs = process.argv.slice(2);
const all = (await readdir(path.join(here, "data"))).filter((f) => f.endsWith(".mjs")).map((f) => f.replace(".mjs", ""));
const todo = slugs.length ? slugs : all;
await mkdir(tmp, { recursive: true });
const browser = await chromium.launch();
const results = [];
for (const slug of todo) {
  const D = (await import(pathToFileURL(path.join(here, "data", slug + ".mjs")).href)).default;
  const svg = build(D);
  const htmlPath = path.join(tmp, slug + ".html");
  await writeFile(htmlPath, `<!doctype html><meta charset="utf-8"><style>${css}</style><body>${svg}</body>`);
  const outDir = path.join(root, "public/work", slug);
  await mkdir(outDir, { recursive: true });
  for (const theme of ["light", "dark"]) {
    const page = await browser.newPage({ viewport: { width: W, height: D.height }, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(htmlPath).href);
    await page.evaluate((t) => document.documentElement.setAttribute("data-theme", t), theme);
    await page.evaluate(() => document.fonts.ready);
    const over = await page.evaluate(() => [...document.querySelectorAll("[data-maxw]")].filter((el) => el.getComputedTextLength() > Number(el.dataset.maxw)).map((el) => `${el.dataset.id || "label"}: "${el.textContent}" ${Math.round(el.getComputedTextLength())}>${el.dataset.maxw}`));
    if (theme === "light" && over.length) console.warn(`[${slug}] OVERFLOW\n  ` + over.join("\n  "));
    const png = path.join(tmp, `${slug}-${theme}.png`);
    await page.screenshot({ path: png, clip: { x: 0, y: 0, width: W, height: D.height } });
    await page.close();
    const out = path.join(outDir, `diagram-${theme}.webp`);
    const info = await sharp(png).webp({ quality: QUALITY, effort: 6 }).toFile(out);
    results.push(`${slug}/diagram-${theme}.webp ${info.width}x${info.height} ${(info.size / 1024).toFixed(1)} KB${info.size > 250 * 1024 ? " !! >250KB" : ""}`);
  }
}
await browser.close();
console.log(results.join("\n"));

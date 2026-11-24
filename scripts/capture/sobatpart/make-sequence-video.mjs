// Fallback "rangkaian tangkapan layar": calm crossfade over curated stills (no zoom).
// Usage: node scripts/capture/sobatpart/make-sequence-video.mjs <stageDir> <workDir>
// Output: <workDir>/sequence.mp4 ; then: npm run assets:video -- <workDir>/sequence.mp4 public/work/sobatpart sobatpart-screens-sequence
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import path from "node:path";
import fs from "node:fs";

const [stage, work] = process.argv.slice(2);
if (!stage || !work) { console.error("usage: <stageDir> <workDir>"); process.exit(2); }
fs.mkdirSync(work, { recursive: true });
const names = ["mkt-cari-cocok-unit", "mkt-produk-detail", "mkt-keranjang", "mkt-checkout", "ops-opname-menunggu", "ops-kurasi-vendor"];
const HOLD = 3.2, FADE = 0.6, W = 1280, H = 720;
for (const n of names) {
  const m = await sharp(path.join(stage, n + ".png")).resize({ width: W }).png().toBuffer();
  const meta = await sharp(m).metadata();
  const h = Math.min(meta.height, H);
  const top = await sharp(m).extract({ left: 0, top: 0, width: W, height: h }).toBuffer();
  await sharp({ create: { width: W, height: H, channels: 3, background: "#ecece6" } })
    .composite([{ input: top, left: 0, top: 0 }]).png().toFile(path.join(work, n + ".png"));
}
const inputs = names.flatMap((n) => ["-loop", "1", "-t", String(HOLD + FADE), "-i", path.join(work, n + ".png")]);
let chain = "", prev = "[0:v]";
names.slice(1).forEach((_, i) => {
  const off = (i + 1) * HOLD;
  const out = i === names.length - 2 ? "[v]" : `[x${i}]`;
  chain += `${prev}[${i + 1}:v]xfade=transition=fade:duration=${FADE}:offset=${off}${out};`;
  prev = out;
});
execFileSync("ffmpeg", ["-y", ...inputs, "-filter_complex", chain.replace(/;$/, ""), "-map", "[v]", "-r", "30", "-pix_fmt", "yuv420p", "-an", path.join(work, "sequence.mp4")], { stdio: "inherit" });

// Joins the frames written by calculator.mjs into one silent clip (cross-fades), then run
//   npm run assets:video -- <out.mp4> public/work/istana-block calculator-flow
// Usage: node encode-calculator.mjs <framesDir> <out.mp4>
import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
import path from "node:path";

const [dir, out] = process.argv.slice(2);
if (!dir || !out) throw new Error("usage: encode-calculator.mjs <framesDir> <out.mp4>");
const HOLD = 2.9, FADE = 0.4;
const frames = readdirSync(dir).filter((f) => /^frame-\d+-.*\.png$/.test(f)).sort();
const inputs = frames.flatMap((f) => ["-loop", "1", "-t", String(HOLD), "-framerate", "25", "-i", path.join(dir, f)]);
let chain = "", prev = "[0:v]";
frames.slice(1).forEach((_, i) => {
  const k = i + 1, label = k === frames.length - 1 ? "[v]" : `[x${k}]`;
  chain += `${prev}[${k}:v]xfade=transition=fade:duration=${FADE}:offset=${(k * (HOLD - FADE)).toFixed(2)}${label};`;
  prev = label;
});
const r = spawnSync("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", ...inputs, "-filter_complex", chain.slice(0, -1), "-map", "[v]", "-an", "-pix_fmt", "yuv420p", "-c:v", "libx264", "-crf", "20", out], { stdio: "inherit" });
process.exit(r.status ?? 1);

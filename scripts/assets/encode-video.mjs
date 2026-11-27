// Usage: node scripts/assets/encode-video.mjs <input> <outDir> <basename> [--start s] [--duration s] [--width 1280]
import { spawnSync } from "node:child_process";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";

const MP4_BUDGET_MB = 4;

const args = process.argv.slice(2);
const pos = [];
const opt = { start: 0, duration: 0, width: 1280 };
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--start") opt.start = Number(args[++i]);
  else if (args[i] === "--duration") opt.duration = Number(args[++i]);
  else if (args[i] === "--width") opt.width = Number(args[++i]);
  else pos.push(args[i]);
}
const [input, outDir, name] = pos;
if (!input || !outDir || !name) {
  console.error("Usage: node scripts/assets/encode-video.mjs <input> <outDir> <basename> [--start s] [--duration s] [--width 1280]");
  process.exit(2);
}

if (spawnSync("ffmpeg", ["-version"], { stdio: "ignore" }).status !== 0) {
  console.error("ffmpeg not found on PATH. Install it yourself (this script will not).");
  process.exit(1);
}

await mkdir(outDir, { recursive: true });
const mp4 = path.join(outDir, `${name}.mp4`);
const webm = path.join(outDir, `${name}.webm`);
const poster = path.join(outDir, `${name}-poster.jpg`);

const seek = opt.start > 0 ? ["-ss", String(opt.start)] : [];
const dur = opt.duration > 0 ? ["-t", String(opt.duration)] : [];
// scale to even width/height, never upscale
const vf = `scale='min(${opt.width},iw)':-2`;
const base = ["-y", "-hide_banner", "-loglevel", "error", ...seek, "-i", input, ...dur, "-an", "-vf", vf];

function run(label, extra) {
  const r = spawnSync("ffmpeg", [...base, ...extra], { stdio: "inherit" });
  if (r.status !== 0) {
    console.error(`ffmpeg failed: ${label}`);
    process.exit(1);
  }
}

run("mp4", ["-c:v", "libx264", "-crf", "28", "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart", mp4]);
run("webm", ["-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0", "-row-mt", "1", webm]);

// poster: frame at 1s into the clip, or at start if clip is shorter
const posterAt = opt.duration > 0 && opt.duration <= 1 ? 0 : 1;
const pr = spawnSync(
  "ffmpeg",
  ["-y", "-hide_banner", "-loglevel", "error", ...seek, "-ss", String(posterAt), "-i", input, "-frames:v", "1", "-vf", vf, "-q:v", "4", poster],
  { stdio: "inherit" },
);
if (pr.status !== 0) {
  console.error("ffmpeg failed: poster");
  process.exit(1);
}

let warn = false;
for (const f of [mp4, webm, poster]) {
  const mb = (await stat(f)).size / 1024 / 1024;
  console.log(`${path.basename(f).padEnd(36)} ${mb.toFixed(2)} MB`);
  if (f === mp4 && mb > MP4_BUDGET_MB) warn = true;
}
if (warn) console.warn(`WARNING: mp4 exceeds ${MP4_BUDGET_MB} MB. Shorten --duration or lower --width.`);

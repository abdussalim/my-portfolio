// Usage: node scripts/assets/optimize-images.mjs <srcFileOrDir> <outDir> [--width 1600] [--quality 78]
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const BUDGET_KB = 250;
const EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);

const args = process.argv.slice(2);
const pos = [];
const opt = { width: 1600, quality: 78 };
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--width") opt.width = Number(args[++i]);
  else if (args[i] === "--quality") opt.quality = Number(args[++i]);
  else pos.push(args[i]);
}
const [src, outDir] = pos;
if (!src || !outDir || !(opt.width > 0) || !(opt.quality > 0)) {
  console.error("Usage: node scripts/assets/optimize-images.mjs <srcFileOrDir> <outDir> [--width 1600] [--quality 78]");
  process.exit(2);
}

const st = await stat(src);
const files = st.isDirectory()
  ? (await readdir(src)).filter((f) => EXT.has(path.extname(f).toLowerCase())).map((f) => path.join(src, f))
  : [src];
if (!files.length) {
  console.error("No png/jpg/jpeg/webp files found.");
  process.exit(1);
}

await mkdir(outDir, { recursive: true });
const rows = [];
let over = 0;
for (const file of files) {
  const base = path.basename(file, path.extname(file));
  const out = path.join(outDir, `${base}.webp`);
  const info = await sharp(file)
    .rotate()
    .resize({ width: opt.width, withoutEnlargement: true })
    .webp({ quality: opt.quality })
    .toFile(out);
  const inKb = (await stat(file)).size / 1024;
  const outKb = info.size / 1024;
  const flag = outKb > BUDGET_KB ? " !! >250KB" : "";
  if (flag) over++;
  rows.push(`${base}.webp`.padEnd(40) + ` | ${inKb.toFixed(1).padStart(8)} | ${outKb.toFixed(1).padStart(8)} | ${info.width}x${info.height}${flag}`);
}
console.log("name".padEnd(40) + " |  in KB   |  out KB  | WxH");
console.log(rows.join("\n"));
if (over) console.warn(`\n${over} file(s) exceed ${BUDGET_KB} KB. Lower --quality or --width.`);

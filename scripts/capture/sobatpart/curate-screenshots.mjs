// Curate portraits from the owner's audit set (data fiktif) -> crop footer, blur person-like names -> staging dir.
// Usage: node scripts/capture/sobatpart/curate-screenshots.mjs <auditDir> <stageDir>
// Then: npm run assets:img -- <stageDir> public/work/sobatpart --width 1440 --quality 76
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const [A, OUT] = process.argv.slice(2);
if (!A || !OUT) { console.error("usage: <auditDir> <stageDir>"); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });

const CHIP = [700, 15, 757, 30];      // header account name (marketplace, desktop)
const OPSU = [36, 526, 102, 542];     // ops sidebar user name (900px-high shots)
const OPSU_DASH = [36, 847, 102, 863]; // same, on the tall dashboard shot
const VENU = [36, 529, 92, 541];      // vendor sidebar user name

// [auditFile, outName, cropHeight|null, blurBoxes (preview px, x0.. scale 1.6)]
const jobs = [
  ["marketplace/marketplace__cari__hasil-cocok-unit__1440", "mkt-cari-cocok-unit", 700, [CHIP]],
  ["marketplace/marketplace__produk_:id__detail-produk__1440", "mkt-produk-detail", 880, [CHIP]],
  ["marketplace/marketplace__keranjang__keranjang__1440", "mkt-keranjang", 690, [CHIP]],
  ["marketplace/marketplace__checkout__checkout__1440", "mkt-checkout", 1150, [CHIP, [150, 220, 200, 232], [150, 287, 174, 298]]],
  ["marketplace/marketplace__pesanan_:id__detail-menunggu-bayar__1440", "mkt-pesanan-menunggu-bayar", 760, [CHIP, [464, 245, 514, 257]]],
  ["ops/ops__beranda__dashboard__1440", "ops-dashboard", null, [OPSU_DASH, [165, 42, 292, 54]]],
  ["ops/ops__impor_katalog__impor-katalog__1440", "ops-impor-katalog", null, [OPSU]],
  ["ops/ops__opname_:id__detail-opname-menunggu__1440", "ops-opname-menunggu", null, [OPSU, [354, 118, 416, 132]]],
  ["ops/ops__kurasi__kurasi-vendor__1440", "ops-kurasi-vendor", null, [OPSU]],
  ["vendor/vendor__listing__daftar-listing__1440", "vendor-listing", null, [VENU]],
  ["marketplace/marketplace__cari__hasil-cocok-unit__375", "mkt-mobile-cari-cocok-unit", 670, []],
];

const real = (dir, base) =>
  fs.readdirSync(path.join(A, dir)).find((f) => f.replace(/\.png$/, "") === base || f.replace(/[^\x20-\x7e]/g, ":").replace(/\.png$/, "") === base);

for (const [file, name, crop, boxes] of jobs) {
  const [dir, base] = file.split("/");
  const f = real(dir, base);
  if (!f) throw new Error("missing " + file);
  const src = path.join(A, dir, f);
  const meta = await sharp(src).metadata();
  const h = crop ? Math.min(crop, meta.height) : meta.height;
  let img = sharp(src).extract({ left: 0, top: 0, width: meta.width, height: h });
  let buf = await img.png().toBuffer();
  const comps = [];
  for (const [x0, y0, x1, y1] of boxes) {
    const L = Math.round(x0 * 1.6), T = Math.round(y0 * 1.6);
    const W = Math.round((x1 - x0) * 1.6), H = Math.round((y1 - y0) * 1.6);
    const piece = await sharp(buf).extract({ left: L, top: T, width: W, height: H }).blur(9).toBuffer();
    comps.push({ input: piece, left: L, top: T });
  }
  if (comps.length) buf = await sharp(buf).composite(comps).png().toBuffer();
  await sharp(buf).toFile(path.join(OUT, name + ".png"));
  console.log(name, meta.width + "x" + h);
}

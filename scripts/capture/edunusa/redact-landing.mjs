// Blurs the tiny stock avatar + name/email in the live site's own dashboard mockup.
// Usage: node redact-landing.mjs <dir with landing-*.png>; writes *-b.png next to them.
import sharp from "sharp";

const dir = process.argv[2];
const jobs = [
  ["landing-desktop-section", { left: 650, top: 296, width: 95, height: 32 }],
  ["landing-mobile-hero", { left: 580, top: 962, width: 90, height: 36 }],
];
for (const [n, r] of jobs) {
  const src = `${dir}/${n}.png`;
  const blurred = await sharp(src).extract(r).blur(8).toBuffer();
  await sharp(src).composite([{ input: blurred, left: r.left, top: r.top }]).toFile(`${dir}/${n}-b.png`);
}

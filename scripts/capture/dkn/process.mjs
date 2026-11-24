// Post-process raw landing captures: crop, blur synthetic phone column, write PNG intermediates. Usage: node process.mjs <rawDir>
import sharp from "sharp";
const d = process.argv[2];
// desktop 1440x900 -> 1200x750 crop-resize, blur phone column of the mockup table
const dsk = await sharp(`${d}/landing-desktop.png`).toBuffer();
const blur = await sharp(dsk).extract({ left: 1050, top: 765, width: 150, height: 135 }).blur(12).toBuffer();
const comp = await sharp(dsk).composite([{ input: blur, left: 1050, top: 765 }]).toBuffer(); // composite before resize (sharp resizes first otherwise)
await sharp(comp).resize(1200, 750).png().toFile(`${d}/dkn-landing-card.png`);
// mobile: keep hero text only (top 1250 of 780x1688), drops mockup table and bottom dock
await sharp(`${d}/landing-mobile.png`).extract({ left: 0, top: 0, width: 780, height: 1250 }).png().toFile(`${d}/dkn-landing-mobile.png`);

// Captures the public pola-paving calculator flow on https://istanablock.com as ordered 1280x720 frames
// (map -> draw lot -> apply -> 2D -> Grass Block -> 3D). Nothing is submitted; the WhatsApp link is never clicked.
// Frames are later joined into a short clip with encode-calculator.sh (software WebGL is too slow to record in real time).
// Usage: node calculator.mjs <outDir> [baseUrl]
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const out = process.argv[2];
const BASE = process.argv[3] ?? "https://istanablock.com";
if (!out) throw new Error("usage: calculator.mjs <outDir> [baseUrl]");
await mkdir(out, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1, locale: "id-ID" });
const page = await ctx.newPage();
page.setDefaultTimeout(30000);
const wait = (ms = 800) => page.waitForTimeout(ms);
let n = 0;
async function frame(name, settle = 3000) {
  await wait(settle);
  n += 1;
  const f = path.join(out, `frame-${String(n).padStart(2, "0")}-${name}.png`);
  await page.screenshot({ path: f });
  console.log("frame", f);
}
async function center(loc) {
  for (let i = 0; i < 14; i++) {
    const b = await loc.boundingBox();
    if (b && b.y > 120 && b.y + b.height < 640) return;
    await page.mouse.move(1256, 400); // page margin: wheel over the map would zoom Leaflet
    await page.mouse.wheel(0, b ? Math.max(-700, Math.min(700, b.y - 300)) : 400);
    await wait(500);
  }
}
async function click(loc) {
  await center(loc);
  const b = await loc.boundingBox();
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 12 });
  await wait(300);
  await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
}
async function tileZoomsStable(min) {
  let prev = "", same = 0;
  for (let i = 0; i < 60 && same < 3; i++) {
    await wait(1500);
    const z = await page.evaluate(() => [...new Set([...document.querySelectorAll(".leaflet-tile-loaded")].map((i) => +((i.src.match(/tile\/(\d+)\//) || [])[1])))].filter(Boolean).sort((a, b) => a - b).join(","));
    same = z === prev && z && +z.split(",").at(-1) >= min ? same + 1 : 0;
    prev = z;
  }
}
const areaText = () => page.locator("body").innerText().then((t) => t.match(/Lahan\s*\n?\s*([\d.,]+ m²)/)?.[1] ?? "?");

await page.goto(`${BASE}/pola-paving`, { waitUntil: "networkidle" });
await frame("calculator-start", 1500);
await click(page.locator("button", { hasText: "Kalkulator Lahan Dinamis" }).first());
await wait(1500);

// satellite map; the location search step is skipped (Leaflet fly animation does not settle under headless software rendering)
await click(page.locator("button[class*=methodBtn]", { hasText: "Peta Satelit" }).first());
await wait(1500);
await click(page.locator("button", { hasText: "Lewati, geser peta sendiri" }).first());
const map = page.locator(".leaflet-container").first();
await map.waitFor({ state: "visible" });
await center(map);
await tileZoomsStable(17);
await page.locator(".leaflet-control-zoom-in").click(); // map opens at z17; z18 gives a lot of roughly 1000 m2
await wait(1500);
await tileZoomsStable(18);
await frame("map-satellite");

const mb = await map.boundingBox();
const cx = mb.x + mb.width / 2, cy = mb.y + mb.height / 2;
const pts = [[-34, -22], [36, -25], [38, 23], [-32, 26]];
let k = 0;
for (const [dx, dy] of pts) {
  await page.mouse.move(cx + dx, cy + dy, { steps: 15 });
  await wait(300);
  await page.mouse.click(cx + dx, cy + dy);
  k += 1;
  await wait(1200);
  if (k === 2 || k === 4) await frame(`points-${k}`, 2500);
}
console.log("area before apply:", await areaText());
await click(page.locator("button", { hasText: "Terapkan Bentuk Lahan" }).first());
await wait(2500);
console.log("area after apply:", await areaText());

await click(page.locator("button", { hasText: "2D Tampak Atas" }).first());
await center(page.locator("button", { hasText: "2D Tampak Atas" }).first());
await frame("layout-2d");

await center(page.getByText("Grass Block", { exact: true }).first());
await page.getByRole("radio", { name: /Grass Block/ }).first().check({ force: true });
await wait(2000);
await frame("grass-block-2d");

await click(page.locator("button", { hasText: "3D Interaktif" }).first());
await frame("3d-iso", 6000);
await click(page.locator("button", { hasText: /^Perspektif$/ }).first());
await frame("3d-perspective", 5000);
await click(page.locator("button", { hasText: /^Tampak Atas$/ }).first());
await frame("3d-top", 5000);

await browser.close();
console.log("done");

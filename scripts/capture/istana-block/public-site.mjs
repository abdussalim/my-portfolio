// Captures public pages of https://istanablock.com (no login, no form submit).
// Usage: node scripts/capture/istana-block/public-site.mjs <outDir>  (outputs png; converted and renamed with npm run assets:img, see docs/facts/istana-block-media.json)
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const out = process.argv[2];
if (!out) throw new Error("usage: public-site.mjs <outDir>");
await mkdir(out, { recursive: true });
const BASE = "https://istanablock.com";
const browser = await chromium.launch();

async function settle(page) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
}

const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: "id-ID" });
const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: "id-ID" });

const shots = [
  ["desktop", "/", "home-desktop", null],
  ["mobile", "/", "home-mobile", null],
  ["desktop", "/produk/u-ditch", "u-ditch-desktop", "price"],
  ["desktop", "/area-pengiriman", "area-desktop", null],
];
for (const [ctx, url, name, mode] of shots) {
  const page = await (ctx === "desktop" ? desktop : mobile).newPage();
  await page.goto(BASE + url, { waitUntil: "domcontentloaded" });
  await settle(page);
  if (mode === "price") {
    const t = page.locator("table").first();
    if (await t.count()) await t.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
  }
  await page.screenshot({ path: path.join(out, `${name}.png`) });
  console.log(name, await page.title());
  await page.close();
}
await browser.close();

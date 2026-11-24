// Captures the public EDUNUSA landing page (no login). Usage: node capture-landing.mjs <outDir>
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const out = process.argv[2];
if (!out) throw new Error("usage: node capture-landing.mjs <outDir>");
mkdirSync(out, { recursive: true });
const URL = "https://edunusa.co.id";

const browser = await chromium.launch();
for (const [name, opts] of [
  ["desktop", { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }],
  ["mobile", { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }],
]) {
  const ctx = await browser.newContext(opts);
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${out}/landing-${name}-hero.png` });
  // Desktop: open the "Produk" section from the nav. (The "Tentang" section shows unsourced
  // 10+/5000+ figures, so it is deliberately not captured.)
  if (name === "desktop") {
    await page.getByText("Produk", { exact: true }).first().click();
    await page.waitForTimeout(6000);
    await page.screenshot({ path: `${out}/landing-${name}-section.png` });
  }
  console.log(name, await page.title());
  await ctx.close();
}
await browser.close();

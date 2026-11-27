// Captures public DKN landing page (no login, no forms). Usage: node landing.mjs <outDir>
import { chromium } from "@playwright/test";
const out = process.argv[2];
if (!out) throw new Error("outDir required");
const url = "https://dkn.instrumeta.id";
const b = await chromium.launch();
for (const [name, vp, dsf] of [["desktop", { width: 1440, height: 900 }, 1], ["mobile", { width: 390, height: 844 }, 2]]) {
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: dsf });
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: "networkidle" });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `${out}/landing-${name}.png` });
  await ctx.close();
}
await b.close();

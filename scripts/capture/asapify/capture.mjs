// ASAPify public-page capture (read-only GETs, no login, no alerts triggered).
// Usage: node scripts/capture/asapify/capture.mjs <outDir> [baseUrl]
// Day 2026-11-23 is read from the archive (engine_days has no TTL); slot index = HHMM(UTC+7)/10, 55 = 09:10.
import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const out = process.argv[2];
const BASE = process.argv[3] || "https://hack2skill-510921.web.app";
const REGION = "R3.50S105.625E";
const ALERT_SLOT = 55;
if (!out) throw new Error("outDir required");
fs.mkdirSync(out, { recursive: true });
const wait = (p, ms = 600) => p.waitForTimeout(ms);

async function openArchive(p) {
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  await wait(p, 2500);
  await p.getByRole("button", { name: /previous day/i }).click().catch(() => p.locator(".day-pick .icon-btn").first().click());
  await wait(p, 1500);
  await p.locator("input.ribbon-range").fill(String(ALERT_SLOT));
  await wait(p, 2000);
}

const b = await chromium.launch();

// desktop stills
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  p.setDefaultTimeout(15000);
  await openArchive(p);
  await p.screenshot({ path: path.join(out, "map-desktop.png") });
  await p.locator(".player").screenshot({ path: path.join(out, "day-player.png") });
  await p.goto(`${BASE}/regions/${REGION}`, { waitUntil: "networkidle" });
  await wait(p, 2500);
  await p.screenshot({ path: path.join(out, "region-desktop.png") });
  const h = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 500) { await p.mouse.wheel(0, 500); await wait(p, 300); }
  await wait(p, 2500);
  const g = p.locator("section.rg-ver");
  await p.addStyleTag({ content: "header{position:static !important}" }); // sticky nav would overlap the element shot
  await g.scrollIntoViewIfNeeded();
  await wait(p, 3000); // GIBS imagery renders in seconds
  await g.screenshot({ path: path.join(out, "gemini-panel.png") });
  await ctx.close();
}

// mobile stills
{
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const p = await ctx.newPage();
  p.setDefaultTimeout(15000);
  // on a phone the bottom sheet covers the day player, so the mobile map shows the live "latest slot" state
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  await wait(p, 4000);
  await p.screenshot({ path: path.join(out, "map-mobile.png") });
  await p.goto(`${BASE}/regions/${REGION}`, { waitUntil: "networkidle" });
  await wait(p, 2500);
  await p.screenshot({ path: path.join(out, "region-mobile.png") });
  await ctx.close();
}

// video: map -> day player -> region -> status history + Gemini
{
  const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, recordVideo: { dir: out, size: { width: 1280, height: 720 } } });
  const p = await ctx.newPage();
  p.setDefaultTimeout(15000);
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  await wait(p, 3000);
  await p.getByRole("button", { name: /previous day/i }).click().catch(() => p.locator(".day-pick .icon-btn").first().click());
  await wait(p, 2000);
  await p.locator("input.ribbon-range").fill("42");
  await wait(p, 1200);
  await p.getByRole("button", { name: /^play/i }).click();
  await wait(p, 6000);
  await p.getByRole("button", { name: /^pause/i }).click();
  await wait(p, 1000);
  await p.goto(`${BASE}/regions/${REGION}`, { waitUntil: "networkidle" });
  await wait(p, 3000);
  for (let i = 0; i < 4; i++) { await p.mouse.wheel(0, 180); await wait(p, 450); }
  await wait(p, 1200);
  for (let i = 0; i < 6; i++) { await p.mouse.wheel(0, 170); await wait(p, 450); }
  await wait(p, 2000);
  await ctx.close(); // flushes the .webm
}
await b.close();
console.log("done", fs.readdirSync(out).join(", "));

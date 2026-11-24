// Captures the LOCAL zaina-shop (fictional seed) as staff use it. Re-runnable.
// 1. node make-seed.mjs <scratch>            (fictional seed + dummy creds)
// 2. node --no-warnings local-server.mjs <zainaRepo> <scratch>/seed.sql 8790
// 3. node capture.mjs http://localhost:8790 <scratch>/creds.json <scratch>/raw
import { chromium } from "@playwright/test";
import { readFileSync, mkdirSync, renameSync, readdirSync } from "node:fs";

const [base, credsPath, out] = process.argv.slice(2);
if (!/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(base)) throw new Error("refusing non-local base URL");
mkdirSync(out, { recursive: true });
const creds = JSON.parse(readFileSync(credsPath, "utf8"));
const pause = (p, ms = 600) => p.waitForTimeout(ms);
const MOBILE = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
const field = (d, name) => d.locator("label.form-field", { hasText: new RegExp(`^${name}`) }).locator("select, input");
const pick = async (d, name, label) => { const sel = field(d, name); await sel.locator("option", { hasText: label }).first().waitFor({ state: "attached" }); await sel.selectOption({ label: await sel.locator("option", { hasText: label }).first().innerText() }); };
const shot = (p, name, opts = {}) => p.screenshot({ path: `${out}/${name}.png`, ...opts });

const browser = await chromium.launch();

async function login(page) {
  await page.goto(base + "/login", { waitUntil: "networkidle" });
  await page.getByLabel("Nama pengguna").fill(creds.username);
  await page.getByLabel("Kata sandi").first().fill(creds.password);
  await page.keyboard.press("Enter");
  await page.waitForURL("**/dashboard", { timeout: 30000 });
  await page.waitForLoadState("networkidle");
}

// ---- public storefront (no login) ----
{
  const ctx = await browser.newContext(MOBILE);
  const page = await ctx.newPage();
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await pause(page, 800);
  await shot(page, "storefront-home");
  // open a product detail sheet (WhatsApp inquiry button is visible; never clicked)
  await page.getByRole("button", { name: /Tanya$/ }).first().click().catch(async () => {
    await page.locator(".storefront-card, article").first().click();
  });
  await pause(page, 900);
  await shot(page, "storefront-wa-sheet");
  await ctx.close();
}

// ---- staff session (mobile) ----
const ctx = await browser.newContext(MOBILE);
const page = await ctx.newPage();
await login(page);
await ctx.storageState({ path: `${out}/staff-state.json` });

// product list + search (430 wide: the 390 layout has a small known horizontal overflow on /products)
{
  const c2 = await browser.newContext({ ...MOBILE, viewport: { width: 430, height: 932 } });
  await c2.addCookies((await ctx.storageState()).cookies);
  const p2 = await c2.newPage();
  await p2.goto(base + "/products", { waitUntil: "networkidle" });
  await pause(p2, 6500); // let the one-time "ready offline" PWA toast clear
  await p2.getByLabel("Cari barang").fill("pi");
  await pause(p2, 900);
  await shot(p2, "products-search");
  await c2.close();
}

// stock in form, filled
await page.goto(base + "/inventory", { waitUntil: "networkidle" });
await pause(page, 600);
await page.getByRole("button", { name: "Terima stok" }).click();
const dlg = page.getByRole("dialog");
await pick(dlg, "Barang", "Piring Keramik");
await pick(dlg, "Satuan input", "lusin");
await field(dlg, "Jumlah").fill("1");
await pause(page, 700);
await shot(page, "stock-in-form");
await dlg.getByRole("button", { name: "Batal" }).click();

// low stock view on dashboard
await page.goto(base + "/dashboard", { waitUntil: "networkidle" });
await pause(page, 600);
await page.getByText("Stok di batas rak").scrollIntoViewIfNeeded();
await page.evaluate(() => window.scrollBy(0, -140));
await pause(page, 600);
await shot(page, "low-stock");

// offline indicator: load catalog online (snapshot saved), then go offline
await page.goto(base + "/products", { waitUntil: "networkidle" });
await pause(page, 1500);
await ctx.setOffline(true);
await pause(page, 1200);
await shot(page, "offline");
await ctx.setOffline(false);
await ctx.close();

// ---- desktop ----
{
  const d = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const p = await d.newPage();
  await login(p);
  await p.goto(base + "/monitor", { waitUntil: "networkidle" });
  await pause(p, 900);
  await shot(p, "monitor-desktop");
  await p.goto(base + "/dashboard", { waitUntil: "networkidle" });
  await pause(p, 900);
  await shot(p, "dashboard-desktop");
  await d.close();
}

// ---- video: stock in (1 lusin) then damaged item out, mobile ----
{
  const vdir = `${out}/video`;
  mkdirSync(vdir, { recursive: true });
  const v = await browser.newContext({ ...MOBILE, deviceScaleFactor: 1, storageState: `${out}/staff-state.json`, recordVideo: { dir: vdir, size: { width: 390, height: 844 } } });
  const p = await v.newPage();
  await p.goto(base + "/inventory", { waitUntil: "networkidle" });
  await pause(p, 7500); // loading + one-time PWA toast are trimmed with --start 7
  await p.getByRole("button", { name: "Terima stok" }).click();
  await pause(p, 900);
  const d = p.getByRole("dialog");
  await pick(d, "Barang", "Piring Keramik");
  await pause(p);
  await pick(d, "Satuan input", "lusin");
  await pause(p);
  await field(d, "Jumlah").fill("1");
  await pause(p, 1200);
  await d.getByRole("button", { name: "Simpan mutasi" }).click();
  await p.getByRole("dialog").waitFor({ state: "detached" });
  await pause(p, 1800);
  await p.getByRole("button", { name: "Barang pecah" }).click();
  await pause(p, 900);
  const d2 = p.getByRole("dialog");
  await pick(d2, "Barang", "Piring Keramik");
  await pause(p);
  await field(d2, "Jumlah").fill("1");
  await d2.locator("textarea").fill("Retak saat dibongkar");
  await pause(p, 1200);
  await d2.getByRole("button", { name: "Simpan mutasi" }).click();
  await p.getByRole("dialog").waitFor({ state: "detached" });
  await pause(p, 2200);
  await v.close();
  const f = readdirSync(vdir).find((x) => x.endsWith(".webm"));
  renameSync(`${vdir}/${f}`, `${out}/stock-flow.webm`);
}
await browser.close();
console.log("done");

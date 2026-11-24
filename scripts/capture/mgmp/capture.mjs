// Capture MGMP PAI screens from a LOCAL run (fictional seed, see seed-fiktif.ts).
// Env: MGMP_URL (default http://localhost:3501), MGMP_OUT (output dir),
//      MGMP_ADMIN_USER / MGMP_ADMIN_PW, MGMP_GURU_USER / MGMP_GURU_PW (never hard-coded).
// Usage: node scripts/capture/mgmp/capture.mjs [shots|video]
import { chromium } from "@playwright/test"
import fs from "node:fs"
import path from "node:path"

const BASE = process.env.MGMP_URL ?? "http://localhost:3501"
const OUT = process.env.MGMP_OUT ?? path.resolve("raw")
const need = (k) => {
  const v = process.env[k]
  if (!v) throw new Error(`missing env ${k}`)
  return v
}
const admin = { u: process.env.MGMP_ADMIN_USER ?? "admin.contoh", p: need("MGMP_ADMIN_PW") }
const mode = process.argv[2] ?? "shots"
fs.mkdirSync(OUT, { recursive: true })

const pause = (ms) => new Promise((r) => setTimeout(r, ms))
const MOBILE = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }

async function login(page, { u, p }) {
  await page.goto(`${BASE}/login`)
  await page.waitForSelector('input[type="password"]')
  await page.fill('input[type="text"]', u)
  await page.fill('input[type="password"]', p)
  await Promise.all([page.waitForURL("**/dashboard", { waitUntil: "commit", timeout: 90000 }), page.click('button[type="submit"]')])
  await page.getByText("Saldo Kas").waitFor({ timeout: 60000 })
  await page.waitForLoadState("networkidle")
  await pause(900)
}

async function shot(page, name, { full = false } = {}) {
  await page.waitForLoadState("networkidle")
  await pause(900)
  await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: full })
  console.log("shot", name)
}

const browser = await chromium.launch()

if (mode === "shots") {
  // Mobile
  let ctx = await browser.newContext({ ...MOBILE, locale: "id-ID" })
  let page = await ctx.newPage()
  await page.goto(`${BASE}/login`)
  await page.waitForSelector('input[type="password"]')
  await shot(page, "m-login")
  await login(page, admin)
  await pause(1800) // let the chart animation finish
  await shot(page, "m-dashboard")
  await page.mouse.move(12, 300)
  await page.mouse.wheel(0, 700)
  await pause(1500)
  await shot(page, "m-dashboard-chart")
  for (const [route, name] of [["guru", "m-guru"], ["keuangan", "m-keuangan"], ["absensi", "m-absensi"], ["dokumen", "m-dokumen"], ["bank-soal", "m-bank-soal"]]) {
    await page.goto(`${BASE}/${route}`)
    await shot(page, name)
  }
  await ctx.close()
  // Desktop
  ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: "id-ID" })
  page = await ctx.newPage()
  await page.goto(`${BASE}/login`)
  await page.waitForSelector('input[type="password"]')
  await shot(page, "d-login")
  await login(page, admin)
  await pause(1800)
  await shot(page, "d-dashboard")
  for (const [route, name] of [["guru", "d-guru"], ["keuangan", "d-keuangan"], ["absensi", "d-absensi"]]) {
    await page.goto(`${BASE}/${route}`)
    await shot(page, name)
  }
  await ctx.close()
}

if (mode === "video") {
  // Log in once in a throwaway context, then record from the dashboard with that session.
  const pre = await browser.newContext({ ...MOBILE, locale: "id-ID" })
  const prePage = await pre.newPage()
  await login(prePage, admin)
  const state = await pre.storageState()
  await pre.close()

  const ctx = await browser.newContext({
    ...MOBILE,
    deviceScaleFactor: 1,
    locale: "id-ID",
    storageState: state,
    recordVideo: { dir: OUT, size: { width: 390, height: 844 } },
  })
  const page = await ctx.newPage()
  await page.goto(`${BASE}/dashboard`)
  await page.getByText("Saldo Kas").waitFor({ timeout: 60000 })
  await page.getByText("Keuangan Bulanan").waitFor()
  await pause(2200)
  await page.mouse.move(12, 300)
  await page.mouse.wheel(0, 700)
  await pause(1800)
  for (const label of ["Data Guru:/guru", "Absensi:/absensi", "Keuangan:/keuangan"]) {
    const [, route] = label.split(":")
    // the bottom tab bar is the last matching link in the DOM
    const tab = page.locator(`a[href="${route}"]`).last()
    const box = await tab.boundingBox()
    if (box) await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
    await pause(500)
    if (!page.url().endsWith(route)) await page.goto(`${BASE}${route}`)
    await page.waitForLoadState("networkidle")
    await pause(1600)
    await page.mouse.move(12, 300)
    await page.mouse.wheel(0, 450)
    await pause(1500)
  }
  await ctx.close()
  console.log("video saved in", OUT)
}
await browser.close()

/**
 * Portfolio capture for EDUNUSA face attendance (Path A: the repo's own Playwright harness).
 * Camera feed, recognition worker and API are faked; students are fictional.
 *
 * This file imports the harness helpers by relative path, so to re-run it copy it to
 *   itn-edunusa-presensi-fe/e2e/capture/face-attendance.capture.spec.ts
 * then, from that repo:
 *   CAPTURE_OUT=<dir> npx playwright test e2e/capture --workers=1
 * and delete the copy afterwards. Writes <dir>/shots/*.png and <dir>/video/face-flow.webm.
 */
import { copyFileSync, mkdirSync } from "node:fs";
import { expect, type Page, test } from "@playwright/test";
import { ok } from "../support/api";
import { openFace } from "../support/app";
import { C7A, C7B, rosterStudent } from "../support/data";
import { show } from "../support/fakes";

const OUT = process.env.CAPTURE_OUT;
if (!OUT) throw new Error("set CAPTURE_OUT");
mkdirSync(`${OUT}/shots`, { recursive: true });
mkdirSync(`${OUT}/video`, { recursive: true });

const ANDI = { 1: 1 };
const DEWI = { 4: 1 };
const NEW_FACE = { 20: 1 };
const STUDENTS = [
  rosterStudent("s-20", "Gita Pertama", C7A, "granted"),
  rosterStudent("s-21", "Hadi Kedua", C7A, "granted"),
  rosterStudent("s-22", "Indah Tanpa Catatan", C7B, "none"),
  rosterStudent("s-1", "Andi Saputra", C7A, "granted", { enrolled: true }),
];
const card = (page: Page) => page.locator("section [role=status]").first();
const pause = (page: Page, ms = 600) => page.waitForTimeout(ms);

async function flow(page: Page, shots: boolean) {
  const shot = async (name: string) => {
    if (shots) await page.screenshot({ path: `${OUT}/shots/${name}.png` });
  };
  await openFace(page, "/face-attendance/scan", {
    role: "presensi_admin",
    setup: (api) => {
      api.on("GET", "/face/roster", () => ok({ summary: { total: 4, enrolled: 1, ready_to_enroll: 3, needs_reenroll: 0 }, students: STUDENTS }));
      api.on("PUT", /\/face\/templates\/s-20$/, ok({ student_id: "s-20", enrolled_at: "2026-11-20T23:12:00Z", replaced: false }));
    },
  });
  // 1. idle scan screen
  await expect(page.getByText("Silakan menghadap kamera")).toBeVisible();
  await pause(page, 1000);
  // 2. a fictional student is matched
  await show(page, ANDI);
  await expect(card(page)).toContainText("Akan dicatat: Hadir");
  await pause(page, 1200);
  await shot("scan-match");
  await show(page, null);
  await expect(page.getByText("Hadir 07.10")).toBeVisible({ timeout: 15_000 });
  await pause(page);
  // 3. offline queue: result is held on the device, then sent when back online
  await page.context().setOffline(true);
  await expect(page.getByText("Offline", { exact: true })).toBeVisible();
  await show(page, DEWI);
  await expect(card(page)).toContainText("tersimpan di perangkat, akan dikirim");
  await pause(page, 800);
  await show(page, null);
  await expect(page.getByText("Offline · 1 hasil menunggu dikirim")).toBeVisible({ timeout: 15_000 });
  await pause(page, 800);
  await shot("scan-offline-queue");
  await page.context().setOffline(false);
  await expect(page.getByText("1 hasil terkirim")).toBeVisible({ timeout: 15_000 });
  await pause(page, 1000);
  // 4. enrollment: three poses
  await page.goto("/face-attendance/enroll");
  await expect(page.getByText("Gita Pertama")).toBeVisible();
  await pause(page, 1000);
  await shot("enroll-roster");
  await page.getByRole("listitem").filter({ hasText: "Gita Pertama" }).getByRole("button", { name: "Daftarkan", exact: true }).click();
  await expect(page.getByText("Merekam wajah Gita Pertama (7A)")).toBeVisible();
  await show(page, NEW_FACE, "front");
  await expect(page.getByText(", Selesai", { exact: true })).toHaveCount(1, { timeout: 20_000 });
  await pause(page);
  await show(page, NEW_FACE, "left");
  await expect(page.getByText(", Selesai", { exact: true })).toHaveCount(2, { timeout: 20_000 });
  await shot("enroll-pose-2-of-3");
  await pause(page);
  await show(page, NEW_FACE, "right");
  await expect(page.getByText("Uji kenali")).toBeVisible({ timeout: 20_000 });
  await show(page, NEW_FACE, "front");
  await expect(page.getByText("Berhasil dikenali")).toBeVisible({ timeout: 20_000 });
  await pause(page, 1000);
  await shot("enroll-recognition-test");
  await page.getByRole("button", { name: "Simpan" }).click();
  await expect(page.getByText("Gita Pertama sudah terdaftar")).toBeVisible();
  await pause(page, 1500);
}

test("screenshots, desktop 1440x900", async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await flow(await ctx.newPage(), true);
  await ctx.close();
});

test("screenshots, mobile 390x844", async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await openFace(page, "/face-attendance/scan", { role: "presensi_admin" });
  await expect(page.getByText("Silakan menghadap kamera")).toBeVisible();
  await show(page, ANDI);
  await expect(card(page)).toContainText("Akan dicatat: Hadir");
  await pause(page, 1200);
  await page.screenshot({ path: `${OUT}/shots/scan-match-mobile.png` });
  await ctx.close();
});

test("video, 1280x720", async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, recordVideo: { dir: `${OUT}/video-raw`, size: { width: 1280, height: 720 } } });
  const page = await ctx.newPage();
  await flow(page, false);
  const video = page.video();
  await ctx.close();
  copyFileSync(await video!.path(), `${OUT}/video/face-flow.webm`);
});

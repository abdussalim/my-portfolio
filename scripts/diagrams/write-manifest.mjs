// Adds/updates the kind:"diagram" entries in docs/facts/<slug>-media.json (read-modify-write, keeps other entries).
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const H = { edunusa: 1300, sobatpart: 1010, "istana-block": 1050, asapify: 1010, mgmp: 1050, "zaina-shop": 1000 };
const C = {
  edunusa: ["EDUNUSA platform: Traefik, Kong, backends, data stores, CI/CD pipeline and the face attendance pilot flow.", "Platform EDUNUSA: Traefik, Kong, backend, penyimpanan data, pipeline CI/CD, dan alur absen wajah (pilot)."],
  sobatpart: ["SobatPart on a two-node kubeadm cluster: Traefik, Kong, Go api and worker, Postgres, SeaweedFS, and the Argo CD GitOps deploy path.", "SobatPart di klaster kubeadm dua node: Traefik, Kong, api dan worker Go, Postgres, SeaweedFS, dan jalur deploy GitOps Argo CD."],
  "istana-block": ["Istana Block on Cloudflare: one OpenNext Worker with D1, R2, a five-minute cron, GPS ingest, deploy path and the one-time data migration.", "Istana Block di Cloudflare: satu Worker OpenNext dengan D1, R2, cron lima menit, penerimaan GPS, jalur deploy, dan migrasi data sekali jalan."],
  asapify: ["ASAPify on Google Cloud: satellites, scheduler, Cloud Run engine, Firestore, Gemini agent, operator review, Cloud Tasks and Telegram.", "ASAPify di Google Cloud: satelit, scheduler, engine Cloud Run, Firestore, agen Gemini, tinjauan operator, Cloud Tasks, dan Telegram."],
  mgmp: ["MGMP PAI Kapuas: React PWA, Nginx, Express 5 with local JWT, Postgres, CI/CD with rollback, and the Cloudflare variant in progress.", "MGMP PAI Kapuas: PWA React, Nginx, Express 5 dengan JWT lokal, Postgres, CI/CD dengan rollback, dan varian Cloudflare yang masih berjalan."],
  "zaina-shop": ["Zaina Shop: React PWA and Hono on Cloudflare Pages, D1 and R2, with an OpenVINO visitor counter at the shop posting to the Worker.", "Zaina Shop: PWA React dan Hono di Cloudflare Pages, D1, dan R2, dengan penghitung pengunjung OpenVINO di toko yang mengirim ke Worker."],
};
for (const slug of Object.keys(H)) {
  const f = path.join(root, "docs/facts", `${slug}-media.json`);
  let arr = [];
  try { arr = JSON.parse(await readFile(f, "utf8")); } catch {}
  arr = arr.filter((e) => !(e.kind === "diagram" && /\/diagram-(light|dark)\.webp$/.test(e.file || "")));
  for (const theme of ["light", "dark"]) {
    arr.push({
      kind: "diagram",
      file: `/work/${slug}/diagram-${theme}.webp`,
      width: 1600,
      height: H[slug],
      theme,
      caption: { en: C[slug][0], id: C[slug][1] },
      alt: { en: `Architecture diagram. ${C[slug][0]}`, id: `Diagram arsitektur. ${C[slug][1]}` },
      source: `scripts/diagrams/data/${slug}.mjs rendered by scripts/diagrams/render.mjs (Playwright, inline SVG)`,
      dataNote: "redrawn from the project fact sheet, no live data",
      redaction: "none needed: no IPs, keys, internal hostnames or account IDs drawn",
    });
  }
  await writeFile(f, JSON.stringify(arr, null, 2) + "\n");
}

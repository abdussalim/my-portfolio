// read-modify-write docs/facts/zaina-shop-media.json: keep diagram entries, replace all others.
import { readFileSync, writeFileSync } from "node:fs";
const f = "docs/facts/zaina-shop-media.json";
const keep = JSON.parse(readFileSync(f, "utf8")).filter((e) => e.kind === "diagram");
const cap = "scripts/capture/zaina-shop/capture.mjs (Playwright) against the real built app on a local stand-in server with a fictional seed";
const seed = "data fiktif: seed lokal dari scripts/capture/zaina-shop/make-seed.mjs (12 produk, 18 nota, akun staf demo), dibuat 2026-11-24";
const img = (file, width, height, en, id, altEn, altId, extra = {}) => ({
  kind: "image", file, width, height, caption: { en, id }, alt: { en: altEn, id: altId },
  source: cap, dataNote: seed, redaction: "none needed: fictional store address and phone number (6281200000000), staff account 'staf-demo' is a dummy", ...extra,
});
const items = [
  img("/work/zaina-shop/storefront-wa-sheet.webp", 780, 1688,
    "Public storefront: product sheet with unit pricing and a pre-filled WhatsApp inquiry button (not clicked).",
    "Etalase publik: lembar produk dengan harga per satuan dan tombol tanya via WhatsApp yang sudah terisi pesan (tidak diklik).",
    "Mobile product detail sheet showing price per unit, quick questions and a green Ask via WhatsApp button.",
    "Lembar detail produk di ponsel: harga per satuan, pertanyaan cepat, dan tombol hijau Tanya via WhatsApp."),
  img("/work/zaina-shop/products-search.webp", 860, 1864,
    "Staff catalog: search by name or SKU, with category, shelf, price and base-unit balance per item.",
    "Katalog staf: cari berdasarkan nama atau SKU, lengkap dengan kategori, rak, harga, dan saldo satuan dasar.",
    "Mobile catalog filtered by the text 'pi', two products listed with price and stock balance.",
    "Katalog di ponsel yang difilter dengan teks 'pi', dua barang tampil dengan harga dan saldo stok.",
    { redaction: "none needed: fictional data. Captured at 430 px wide because the 390 px layout overflows by 16 px on this page" }),
  img("/work/zaina-shop/stock-in-form.webp", 780, 1688,
    "Stock-in form: receive 1 dozen, and the form shows the cost per piece converted from the dozen price.",
    "Form terima stok: 1 lusin masuk, dan form menghitung modal per buah dari harga per lusin.",
    "Mobile stock receipt form with product Piring Keramik Melati, unit dozen (12 pieces), quantity 1.",
    "Form terima stok di ponsel: produk Piring Keramik Melati, satuan lusin (12 buah), jumlah 1."),
  img("/work/zaina-shop/low-stock.webp", 780, 1688,
    "Dashboard: today's takings and the list of items at or below their shelf minimum.",
    "Dasbor: omzet hari ini dan daftar barang yang stoknya di batas minimum rak.",
    "Mobile dashboard with revenue tiles and a list of low-stock items, the first one at zero.",
    "Dasbor di ponsel dengan kartu omzet dan daftar stok tipis, barang pertama sudah nol."),
  img("/work/zaina-shop/offline.webp", 780, 1688,
    "Offline mode: the app keeps working from the last catalog and stock snapshot and says so.",
    "Mode offline: aplikasi tetap menampilkan katalog dan stok dari snapshot terakhir dan memberi tahu stafnya.",
    "Mobile catalog with a red Offline badge and a banner saying stock uses the last snapshot, with the update time.",
    "Katalog di ponsel dengan lencana Offline merah dan banner yang menyebut stok memakai snapshot terakhir beserta waktunya.",
    { dataNote: seed + "; offline state forced with Playwright context.setOffline(true)" }),
  img("/work/zaina-shop/monitor-desktop.webp", 1440, 900,
    "Monitor page for the visitor counter. The edge agent was not running: the count and CPU figures are synthetic seed rows.",
    "Halaman Monitor untuk penghitung pengunjung. Agen edge tidak dijalankan: angka pengunjung dan CPU adalah baris seed sintetis.",
    "Desktop monitor page with agent status Offline, 18 visitors today, two camera panels waiting for a feed.",
    "Halaman Monitor di desktop dengan status agen Offline, 18 pengunjung hari ini, dan dua panel kamera yang menunggu umpan.",
    { dataNote: seed + "; monitor_state and monitor_visitors_daily rows are synthetic, no CCTV, no model, no RTSP" }),
  img("/work/zaina-shop/brand-logo.webp", 1200, 1020,
    "Brand mark of the shop, from its own brand guideline: an awning with a smiling face.",
    "Logo toko dari panduan brand miliknya: kanopi toko dengan wajah tersenyum.",
    "Green shop awning logo with a smiling face and the words Zaina Arsyi, Toko Perabot Rumah.",
    "Logo kanopi toko hijau dengan wajah tersenyum dan tulisan Zaina Arsyi, Toko Perabot Rumah.",
    { source: "PRIVATE/zaina-arsyi-brand-guidelines/assets/logo-simpel4-primary.png (existing file, converted to webp)", dataNote: "brand asset of the shop, no customer data", redaction: "none needed: the logo carries only the shop name and tagline, no address or phone" }),
];
const video = {
  kind: "video",
  file: { mp4: "/work/zaina-shop/stock-flow.mp4", webm: "/work/zaina-shop/stock-flow.webm", poster: "/work/zaina-shop/stock-flow-poster.jpg" },
  width: 390, height: 844,
  caption: {
    en: "Stock flow on a phone: receive one dozen plates, the ledger and stock value go up, then log one broken plate and it goes down.",
    id: "Alur stok di ponsel: terima satu lusin piring, ledger dan nilai persediaan naik, lalu catat satu piring pecah dan turun lagi.",
  },
  source: cap + " (recordVideo, ffmpeg via npm run assets:video, trimmed to start at 7 s)",
  dataNote: seed,
  redaction: "none needed: fictional data only",
};
writeFileSync(f, JSON.stringify([...keep, ...items, video], null, 2) + "\n");
console.log("entries", keep.length + items.length + 1);

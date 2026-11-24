import type { Project } from "../projects";

export const istanaBlock: Project = {
  slug: "istana-block",
  name: "Istana Block",
  url: "https://istanablock.com",
  year: "2026",
  image: {
    src: "/work/istana-block/calculator-2d-layout.webp",
    width: 1280,
    height: 720,
    alt: {
      en: "Top-down 2D layout of a drawn lot filled with Grass Block pavers, with piece counts and cut-edge pieces highlighted.",
      id: "Denah 2D lahan hasil gambar yang terisi paving Grass Block, lengkap dengan jumlah keping dan potongan tepi."
    }
  },
  tags: {
    en: [
      "Client",
      "Web",
      "Cloudflare"
    ],
    id: [
      "Klien",
      "Web",
      "Cloudflare"
    ]
  },
  summary: {
    en: "A new site for a paving block factory in Purwakarta, replacing WordPress, with a Paving Designer that turns a lot drawn on a satellite map into a 2D and 3D layout. A staff app for orders, deliveries and accounts sits behind it.",
    id: "Situs baru untuk pabrik paving block di Purwakarta, menggantikan WordPress, dengan Paving Designer yang mengubah lahan di peta satelit menjadi denah 2D dan 3D. Di belakangnya ada aplikasi staf untuk pesanan, pengiriman, dan keuangan."
  },
  role: {
    en: "Full-stack developer, and the one who runs the deploys",
    id: "Developer full-stack, sekaligus yang menjalankan deploy"
  },
  stack: [
    "Next.js",
    "React",
    "TypeScript",
    "Cloudflare Workers",
    "OpenNext",
    "D1",
    "Drizzle",
    "R2",
    "Leaflet",
    "Three.js"
  ],
  challenge: {
    en: "A WordPress site that scored 6.4 out of 10 in an SEO audit with ads running, and daily operations in a separate older app. The factory wanted one new site, a staff app, and a way for buyers to plan a paving job.",
    id: "Situs WordPress dengan skor SEO 6,4 dari 10 di audit sementara iklan berjalan, dan operasional harian di aplikasi lama yang terpisah. Pabrik ingin satu situs baru, aplikasi staf, dan cara bagi pembeli untuk merencanakan pekerjaan paving."
  },
  approach: {
    en: [],
    id: []
  },
  outcome: {
    en: "istanablock.com is live on one Cloudflare Worker, and 194 of 196 WordPress articles moved across with redirects. The staff modules are built and loaded with migrated data, but daily use by staff is not confirmed.",
    id: "istanablock.com sudah live di satu Cloudflare Worker, dan 194 dari 196 artikel WordPress pindah lengkap dengan redirect. Modul staf sudah dibangun dan terisi data hasil migrasi, tetapi pemakaian harian oleh staf belum terkonfirmasi."
  },
  schemaType: "SoftwareApplication",
  status: "live",
  statusNote: {
    en: "The public site and the Paving Designer are live. The staff app (Operations and Finance) is built and still being rolled out; the older app stays in use until cutover.",
    id: "Situs publik dan Paving Designer sudah live. Aplikasi staf (Operasional dan Keuangan) sudah dibangun dan masih dalam peluncuran; aplikasi lama tetap dipakai sampai cutover."
  },
  category: "client",
  period: {
    en: "Oct to Nov 2026",
    id: "Okt sampai Nov 2026"
  },
  team: {
    en: "Mostly solo: 94% of the web repo's commits are mine, written with AI agents I directed and verified. The older operations app belongs to someone else.",
    id: "Hampir sendirian: 94% commit repo web adalah milik saya, ditulis dengan agen AI yang saya arahkan dan verifikasi. Aplikasi operasional lama milik pihak lain."
  },
  featured: 3,
  areas: [
    {
      area: "infra",
      items: {
        en: [
          "Moved the site from WordPress to Next.js on Cloudflare Workers through OpenNext, with D1, R2 and a five-minute cron.",
          "Wrapped the Worker in a page cache that ignores ad parameters (gclid, utm, fbclid), so ad clicks are served from cache.",
          "Fixed Worker error 1102 (CPU limit) by moving to a paid plan with a 30 s CPU limit. Before, 27 of 200 cold requests failed. After, 100 cold requests to 10 pages all returned 200.",
          "Worked around a Windows build crash by building and deploying from WSL, with a D1 export before every migration and a separate demo Worker for client presentations."
        ],
        id: [
          "Memindahkan situs dari WordPress ke Next.js di Cloudflare Workers lewat OpenNext, dengan D1, R2, dan cron lima menit.",
          "Membungkus Worker dengan cache halaman yang mengabaikan parameter iklan (gclid, utm, fbclid), jadi klik iklan dilayani dari cache.",
          "Memperbaiki error Worker 1102 (batas CPU) dengan pindah ke paket berbayar dan batas CPU 30 dtk. Sebelumnya 27 dari 200 permintaan dingin gagal. Sesudahnya 100 permintaan dingin ke 10 halaman semuanya 200.",
          "Menyiasati crash build di Windows dengan build dan deploy dari WSL, dengan ekspor D1 sebelum setiap migrasi dan Worker demo terpisah untuk presentasi ke klien."
        ]
      }
    },
    {
      area: "cicd",
      items: {
        en: [
          "Wrote a GitHub Actions check that runs typecheck and build on every push and PR, with no secrets and no deploy. Deploys stay manual on purpose.",
          "Added a manual SEO check job that runs a script against the staging URL."
        ],
        id: [
          "Menulis pemeriksaan GitHub Actions yang menjalankan typecheck dan build pada setiap push dan PR, tanpa secret dan tanpa deploy. Deploy sengaja tetap manual.",
          "Menambah job pemeriksaan SEO manual yang menjalankan skrip terhadap URL staging."
        ]
      }
    },
    {
      area: "backend",
      items: {
        en: [
          "Ported the staff operations app into the new site: orders, delivery notes, stock, production, fleet, drivers, GPS truck tracking and a driver task view for phones.",
          "Built an accounting module in the style of Zahir: paired journals, invoices, cash and bank, and reports (profit and loss, balance sheet, cash flow, ageing).",
          "Added login with email and password for the office, and phone number plus a 6-digit PIN for the field, with lockout after repeated misses.",
          "Added Web Push notifications and a five-minute cron for reminders, backups and reports."
        ],
        id: [
          "Memindahkan aplikasi operasional staf ke situs baru: pesanan, surat jalan, stok, produksi, armada, sopir, pelacakan truk lewat GPS, dan tampilan tugas sopir di ponsel.",
          "Membangun modul akuntansi ala Zahir: jurnal berpasangan, faktur, kas dan bank, serta laporan (laba rugi, neraca, arus kas, umur piutang).",
          "Menambah login email dan password untuk kantor, serta nomor HP dan PIN 6 angka untuk lapangan, dengan penguncian setelah salah berulang.",
          "Menambah notifikasi Web Push dan cron lima menit untuk pengingat, backup, dan laporan."
        ]
      }
    },
    {
      area: "frontend",
      items: {
        en: [
          "Built the public site: product pages with open price tables, delivery areas, a gallery, articles, and a quick calculator that hands off to WhatsApp.",
          "Grew a pattern calculator into Paving Designer: draw a lot on a satellite map, import GeoJSON, KML or KMZ, see it in 2D and then 3D with Three.js, and send it to WhatsApp.",
          "Kept big lots usable: layout runs in a Web Worker, 2D is drawn on a canvas, and the 3D view samples above 10,000 pieces.",
          "Added a visual editor for articles."
        ],
        id: [
          "Membangun situs publik: halaman produk dengan tabel harga terbuka, area pengiriman, galeri, artikel, dan kalkulator cepat yang meneruskan ke WhatsApp.",
          "Mengembangkan kalkulator pola menjadi Paving Designer: gambar lahan di peta satelit, impor GeoJSON, KML, atau KMZ, lihat dalam 2D lalu 3D dengan Three.js, dan kirim ke WhatsApp.",
          "Menjaga lahan besar tetap lancar: layout berjalan di Web Worker, 2D digambar di canvas, dan tampilan 3D memakai sampel di atas 10.000 keping.",
          "Menambah editor visual untuk artikel."
        ]
      }
    },
    {
      area: "data",
      items: {
        en: [
          "Migrated the old app's data into D1: about 5,400 rows across 31 tables, matched against the source, row ids kept. Moved 270 photos into R2.",
          "Migrated WordPress content through its REST API: 194 of 196 articles published as Markdown, 510 images moved, 301 redirects for 195 old URLs, and a sitemap that grew from 22 to 216 URLs.",
          "Added structured data for the business, products, FAQ, articles and breadcrumbs, plus an SEO check script that passes 3,476 of 3,476 checks.",
          "Ran a security audit on 15 Nov 2026: 5 findings (4 medium, 1 low), all fixed and live, covering security headers, a strict CSP and cookie flags."
        ],
        id: [
          "Memigrasikan data aplikasi lama ke D1: sekitar 5.400 baris di 31 tabel, dicocokkan dengan sumbernya, id baris dipertahankan. Memindahkan 270 foto ke R2.",
          "Memigrasikan konten WordPress lewat REST API: 194 dari 196 artikel terbit sebagai Markdown, 510 gambar dipindah, 301 redirect untuk 195 URL lama, dan sitemap tumbuh dari 22 menjadi 216 URL.",
          "Menambah structured data untuk bisnis, produk, FAQ, artikel, dan breadcrumb, plus skrip pemeriksaan SEO yang lolos 3.476 dari 3.476 cek.",
          "Menjalankan audit keamanan pada 15 Nov 2026: 5 temuan (4 medium, 1 low), semuanya diperbaiki dan live, mencakup header keamanan, CSP ketat, dan flag cookie."
        ]
      }
    }
  ],
  metrics: [
    {
      value: "194 / 196",
      label: {
        en: "WordPress articles migrated",
        id: "artikel WordPress dimigrasikan"
      }
    },
    {
      value: "5,400",
      label: {
        en: "rows of old-app data moved to D1",
        id: "baris data aplikasi lama dipindah ke D1"
      }
    },
    {
      value: "100%",
      label: {
        en: "HTTP 200 on 100 cold requests after the CPU fix (27 of 200 failed before)",
        id: "HTTP 200 pada 100 permintaan dingin setelah perbaikan CPU (sebelumnya 27 dari 200 gagal)"
      }
    },
    {
      value: "5 / 5",
      label: {
        en: "security audit findings fixed",
        id: "temuan audit keamanan diperbaiki"
      }
    }
  ],
  diagram: {
    src: "/work/istana-block/diagram-light.webp",
    srcDark: "/work/istana-block/diagram-dark.webp",
    width: 1600,
    height: 1050,
    alt: {
      en: "Architecture diagram. Istana Block on Cloudflare: one OpenNext Worker with D1, R2, a five-minute cron, GPS ingest, deploy path and the one-time data migration.",
      id: "Diagram arsitektur. Istana Block di Cloudflare: satu Worker OpenNext dengan D1, R2, cron lima menit, penerimaan GPS, jalur deploy, dan migrasi data sekali jalan."
    },
    caption: {
      en: "Istana Block on Cloudflare: one OpenNext Worker with D1, R2, a five-minute cron, GPS ingest, deploy path and the one-time data migration.",
      id: "Istana Block di Cloudflare: satu Worker OpenNext dengan D1, R2, cron lima menit, penerimaan GPS, jalur deploy, dan migrasi data sekali jalan."
    }
  },
  media: [
    {
      kind: "video",
      mp4: "/work/istana-block/calculator-flow.mp4",
      webm: "/work/istana-block/calculator-flow.webm",
      poster: "/work/istana-block/calculator-flow-poster.jpg",
      width: 1280,
      height: 720,
      caption: {
        en: "Calculator flow in about 23 s: satellite map, four lot corners, apply, 2D layout, Grass Block, 3D views. Esri imagery credit stays visible.",
        id: "Alur kalkulator sekitar 23 detik: peta satelit, empat sudut lahan, terapkan, denah 2D, Grass Block, tampilan 3D. Atribusi citra Esri tetap terlihat."
      }
    },
    {
      kind: "image",
      src: "/work/istana-block/calculator-2d-layout.webp",
      width: 1280,
      height: 720,
      alt: {
        en: "Top-down 2D layout of a drawn lot filled with Grass Block pavers, with piece counts and cut-edge pieces highlighted.",
        id: "Denah 2D lahan hasil gambar yang terisi paving Grass Block, lengkap dengan jumlah keping dan potongan tepi."
      },
      caption: {
        en: "Paving Designer: a 1,178 m2 lot drawn on the satellite map, laid out in 2D with Grass Block (9,202 pcs).",
        id: "Paving Designer: lahan 1.178 m2 yang digambar di peta satelit, tampil 2D dengan Grass Block (9.202 pcs)."
      }
    },
    {
      kind: "image",
      src: "/work/istana-block/calculator-3d-grass-block.webp",
      width: 1280,
      height: 720,
      alt: {
        en: "Interactive 3D preview of a lot paved with Grass Block, grass visible in the holes.",
        id: "Pratinjau 3D interaktif lahan berpaving Grass Block, rumput terlihat di lubangnya."
      },
      caption: {
        en: "3D view of the same lot with Grass Block holes, switched to the perspective camera.",
        id: "Tampilan 3D lahan yang sama dengan lubang rumput Grass Block, kamera perspektif."
      }
    },
    {
      kind: "image",
      src: "/work/istana-block/site-home-desktop.webp",
      width: 1440,
      height: 900,
      alt: {
        en: "Istana Block homepage hero with a paving press and the headline Pabrik Paving Block dan Beton Precast di Purwakarta.",
        id: "Hero beranda Istana Block dengan mesin cetak paving dan judul Pabrik Paving Block dan Beton Precast di Purwakarta."
      },
      caption: {
        en: "Public homepage on istanablock.com: factory hero and quote buttons.",
        id: "Beranda publik istanablock.com: hero pabrik dan tombol penawaran."
      }
    },
    {
      kind: "image",
      src: "/work/istana-block/site-u-ditch-price-table.webp",
      width: 1440,
      height: 900,
      alt: {
        en: "Price table listing twelve U-Ditch sizes and five heavy duty covers with weight and price per unit.",
        id: "Tabel harga dua belas ukuran U-Ditch dan lima cover heavy duty lengkap dengan berat dan harga per unit."
      },
      caption: {
        en: "U-Ditch product page: open price table by size, with heavy duty covers.",
        id: "Halaman produk U-Ditch: tabel harga terbuka per ukuran, beserta cover heavy duty."
      }
    },
    {
      kind: "image",
      src: "/work/istana-block/site-delivery-area.webp",
      width: 1440,
      height: 900,
      alt: {
        en: "Delivery area page with three toll corridor cards and region chips.",
        id: "Halaman area pengiriman dengan tiga kartu koridor tol dan label wilayah."
      },
      caption: {
        en: "Delivery area page: toll corridors and reach map from the Purwakarta plant.",
        id: "Halaman area pengiriman: koridor tol dan peta jangkauan dari pabrik Purwakarta."
      }
    },
    {
      kind: "image",
      src: "/work/istana-block/app-ops-dashboard.webp",
      width: 1366,
      height: 1233,
      alt: {
        en: "Operations dashboard with order counters, scheduled delivery notes and a delivery chart.",
        id: "Dasbor operasional dengan penghitung pesanan, surat jalan terjadwal dan grafik pengiriman."
      },
      caption: {
        en: "Staff app, Operasional summary: active orders, loads for today, low stock (earlier build).",
        id: "Aplikasi staf, ringkasan Operasional: pesanan aktif, muatan hari ini, stok menipis (build awal)."
      }
    },
    {
      kind: "image",
      src: "/work/istana-block/app-finance-summary.webp",
      width: 1366,
      height: 1100,
      alt: {
        en: "Finance overview with cash balance cards, billed versus received chart and customer invoices.",
        id: "Ringkasan keuangan dengan kartu saldo kas, grafik ditagih dan diterima, serta faktur pelanggan."
      },
      caption: {
        en: "Staff app, Keuangan summary: cash, receivables, payables and billing chart from seeded data (earlier build).",
        id: "Aplikasi staf, ringkasan Keuangan: kas, piutang, hutang dan grafik penagihan dari data seed (build awal)."
      }
    }
  ]
};

import type { Project } from "../projects";

export const zainaShop: Project = {
  slug: "zaina-shop",
  name: "Zaina Shop",
  url: "https://zaina-shop.pages.dev",
  year: "2026",
  image: {
    src: "/work/zaina-shop/monitor-desktop.webp",
    width: 1440,
    height: 900,
    alt: {
      en: "Desktop monitor page of the shop app with agent status Offline, 18 visitors today and two camera panels.",
      id: "Halaman Monitor aplikasi toko di desktop dengan status agen Offline, 18 pengunjung hari ini, dan dua panel kamera."
    }
  },
  tags: {
    en: [
      "Personal",
      "POS",
      "PWA"
    ],
    id: [
      "Pribadi",
      "Kasir",
      "PWA"
    ]
  },
  summary: {
    en: "Inventory, a cash register and a public storefront for a small household goods shop, as a phone-first PWA. A camera-based visitor counter for the shop door is built too.",
    id: "Inventaris, kasir, dan etalase publik untuk toko perabot rumah tangga kecil, dalam bentuk PWA yang mengutamakan ponsel. Penghitung pengunjung berbasis kamera untuk pintu toko juga sudah dibuat."
  },
  role: {
    en: "Designer and developer, solo",
    id: "Perancang dan developer, mengerjakan sendiri"
  },
  stack: [
    "React",
    "Vite",
    "Hono",
    "TypeScript",
    "Cloudflare Pages",
    "D1",
    "R2",
    "Python",
    "OpenVINO",
    "Playwright"
  ],
  challenge: {
    en: "A shop sells plates by the piece, the dozen and the set, with discounts per unit. Stock, sales and units had to live in one app that works from a phone, even on a weak signal.",
    id: "Toko menjual piring per buah, per lusin, dan per set, dengan diskon per satuan. Stok, penjualan, dan satuan harus ada di satu aplikasi yang jalan dari ponsel, bahkan saat sinyal lemah."
  },
  approach: {
    en: [],
    id: []
  },
  outcome: {
    en: "A working PWA with a stock ledger, receipts, reports and a public catalogue that sends orders by WhatsApp. The visitor counter is built, but I have no measured results from the shop to show.",
    id: "PWA yang berfungsi dengan ledger stok, nota, laporan, dan katalog publik yang mengirim pesanan lewat WhatsApp. Penghitung pengunjung sudah dibuat, tetapi saya belum punya hasil terukur dari toko untuk ditampilkan."
  },
  schemaType: "SoftwareApplication",
  status: "live",
  category: "personal",
  period: {
    en: "Aug to Nov 2026",
    id: "Agu sampai Nov 2026"
  },
  team: {
    en: "Solo. Built with AI agents I directed and verified, working from written specs and plans.",
    id: "Sendirian. Dibangun dengan agen AI yang saya arahkan dan verifikasi, berdasarkan spesifikasi dan rencana tertulis."
  },
  areas: [
    {
      area: "infra",
      items: {
        en: [
          "Moved from a Docker and Postgres VPS to Cloudflare: Pages with a Hono worker, D1, and R2 for images, planned in a written spec first.",
          "Wrote an operations runbook and backups for the first VPS generation: pg_dump with checksums, 14 days of retention, Linux and PowerShell scripts.",
          "Runs a manual quality gate instead of hosted CI: tests, typecheck, lint, build, a bundle budget check, Playwright and smoke tests before each deploy."
        ],
        id: [
          "Pindah dari VPS Docker dan Postgres ke Cloudflare: Pages dengan worker Hono, D1, dan R2 untuk gambar, direncanakan dulu dalam spesifikasi tertulis.",
          "Menulis runbook operasi dan backup untuk generasi VPS pertama: pg_dump dengan checksum, retensi 14 hari, skrip Linux dan PowerShell.",
          "Menjalankan quality gate manual, tanpa CI terhosting: tes, typecheck, lint, build, cek anggaran bundle, Playwright, dan smoke test sebelum setiap deploy."
        ]
      }
    },
    {
      area: "backend",
      items: {
        en: [
          "Built the API: a catalogue with unit conversion, an append-only stock ledger, sales and receipts, reports, store settings, a public storefront and a monitor.",
          "Protected stock integrity: no negative balance, used products are deactivated rather than deleted, and receipts keep a snapshot of name, factor, price and discount.",
          "Added discounts per unit, as a percentage or an amount, with a minimum and a maximum.",
          "Wrote a concurrency test: two sales on the same stock at the same moment, against a real PostgreSQL, as a release gate."
        ],
        id: [
          "Membangun API: katalog dengan konversi satuan, ledger stok append-only, penjualan dan nota, laporan, pengaturan toko, etalase publik, dan monitor.",
          "Menjaga integritas stok: saldo tidak boleh negatif, produk yang pernah dipakai dinonaktifkan bukan dihapus, dan nota menyimpan snapshot nama, faktor, harga, dan diskon.",
          "Menambah diskon per satuan, berupa persentase atau nominal, dengan batas minimum dan maksimum.",
          "Menulis tes konkurensi: dua penjualan atas stok yang sama di saat bersamaan, pada PostgreSQL sungguhan, sebagai gerbang rilis."
        ]
      }
    },
    {
      area: "frontend",
      items: {
        en: [
          "Built a phone-first PWA in React 19: register, products, stock in and out, reports with charts, a dashboard and a monitor page.",
          "Built a safe offline mode: only the sanitized catalogue and the last stock balances are cached. Reports, receipts, accounts and tokens never are, and the app says it shows a snapshot.",
          "Added a public storefront with a local cart that orders through WhatsApp, with no server checkout.",
          "Set a bundle budget (100 KB gzip for the first JS) and tested layouts at six widths from 320 to 1366 px."
        ],
        id: [
          "Membangun PWA mengutamakan ponsel di React 19: kasir, produk, stok masuk dan keluar, laporan dengan grafik, dasbor, dan halaman monitor.",
          "Membangun mode offline yang aman: hanya katalog yang sudah disanitasi dan saldo stok terakhir yang di-cache. Laporan, nota, akun, dan token tidak pernah, dan aplikasi memberi tahu bahwa yang tampil adalah snapshot.",
          "Menambah etalase publik dengan keranjang lokal yang memesan lewat WhatsApp, tanpa checkout di server.",
          "Menetapkan anggaran bundle (100 KB gzip untuk JS awal) dan menguji tata letak di enam lebar dari 320 sampai 1366 px."
        ]
      }
    },
    {
      area: "security",
      items: {
        en: [
          "Secured the shared shop account with persistent sessions, trusted-origin checks, a re-authentication dialog, and a sign-out that clears cookies, cache and IndexedDB.",
          "The edge agent talks to the Worker with a shared key, and env files and models stay out of git."
        ],
        id: [
          "Mengamankan akun toko bersama dengan sesi persisten, pemeriksaan trusted-origin, dialog autentikasi ulang, dan logout yang membersihkan cookie, cache, dan IndexedDB.",
          "Agen edge berbicara dengan Worker memakai kunci bersama, dan file env serta model tetap di luar git."
        ]
      }
    },
    {
      area: "data",
      items: {
        en: [
          "Designed the schema: Rupiah as integers, quantities with three decimals, and SQL migrations for both the Postgres and the D1 generations.",
          "Built the visitor counter: one Python process reads two camera streams, detects people with an OpenVINO model, tracks them and logs enter and exit events. It counts people and does not recognize faces.",
          "Packaged that edge agent in one Docker container for a PC at the shop, with an optional tunnel for the camera view."
        ],
        id: [
          "Merancang skema: Rupiah sebagai bilangan bulat, kuantitas dengan tiga desimal, dan migrasi SQL untuk generasi Postgres maupun D1.",
          "Membangun penghitung pengunjung: satu proses Python membaca dua stream kamera, mendeteksi orang dengan model OpenVINO, melacaknya, dan mencatat event masuk dan keluar. Ia menghitung orang dan tidak mengenali wajah.",
          "Mengemas agen edge itu dalam satu container Docker untuk PC di toko, dengan tunnel opsional untuk tampilan kamera."
        ]
      }
    }
  ],
  metrics: [
    {
      value: "6",
      label: {
        en: "screen widths in the layout tests, 320 to 1366 px",
        id: "lebar layar di tes tata letak, 320 sampai 1366 px"
      }
    },
    {
      value: "100 KB",
      label: {
        en: "gzip budget for the first JavaScript",
        id: "anggaran gzip untuk JavaScript awal"
      }
    },
    {
      value: "14 days",
      label: {
        en: "of backup retention on the first VPS generation",
        id: "retensi backup di generasi VPS pertama"
      }
    }
  ],
  diagram: {
    src: "/work/zaina-shop/diagram-light.webp",
    srcDark: "/work/zaina-shop/diagram-dark.webp",
    width: 1600,
    height: 1000,
    alt: {
      en: "Architecture diagram. Zaina Shop: React PWA and Hono on Cloudflare Pages, D1 and R2, with an OpenVINO visitor counter at the shop posting to the Worker.",
      id: "Diagram arsitektur. Zaina Shop: PWA React dan Hono di Cloudflare Pages, D1, dan R2, dengan penghitung pengunjung OpenVINO di toko yang mengirim ke Worker."
    },
    caption: {
      en: "Zaina Shop: React PWA and Hono on Cloudflare Pages, D1 and R2, with an OpenVINO visitor counter at the shop posting to the Worker.",
      id: "Zaina Shop: PWA React dan Hono di Cloudflare Pages, D1, dan R2, dengan penghitung pengunjung OpenVINO di toko yang mengirim ke Worker."
    }
  },
  media: [
    {
      kind: "video",
      mp4: "/work/zaina-shop/stock-flow.mp4",
      webm: "/work/zaina-shop/stock-flow.webm",
      poster: "/work/zaina-shop/stock-flow-poster.jpg",
      width: 390,
      height: 844,
      caption: {
        en: "Stock flow on a phone: receive one dozen plates, the ledger and stock value go up, then log one broken plate and it goes down.",
        id: "Alur stok di ponsel: terima satu lusin piring, ledger dan nilai persediaan naik, lalu catat satu piring pecah dan turun lagi."
      }
    },
    {
      kind: "image",
      src: "/work/zaina-shop/storefront-wa-sheet.webp",
      width: 780,
      height: 1688,
      alt: {
        en: "Mobile product detail sheet showing price per unit, quick questions and a green Ask via WhatsApp button.",
        id: "Lembar detail produk di ponsel: harga per satuan, pertanyaan cepat, dan tombol hijau Tanya via WhatsApp."
      },
      caption: {
        en: "Public storefront: product sheet with unit pricing and a pre-filled WhatsApp inquiry button (not clicked).",
        id: "Etalase publik: lembar produk dengan harga per satuan dan tombol tanya via WhatsApp yang sudah terisi pesan (tidak diklik)."
      }
    },
    {
      kind: "image",
      src: "/work/zaina-shop/products-search.webp",
      width: 860,
      height: 1864,
      alt: {
        en: "Mobile catalog filtered by the text 'pi', two products listed with price and stock balance.",
        id: "Katalog di ponsel yang difilter dengan teks 'pi', dua barang tampil dengan harga dan saldo stok."
      },
      caption: {
        en: "Staff catalog: search by name or SKU, with category, shelf, price and base-unit balance per item.",
        id: "Katalog staf: cari berdasarkan nama atau SKU, lengkap dengan kategori, rak, harga, dan saldo satuan dasar."
      }
    },
    {
      kind: "image",
      src: "/work/zaina-shop/stock-in-form.webp",
      width: 780,
      height: 1688,
      alt: {
        en: "Mobile stock receipt form with product Piring Keramik Melati, unit dozen (12 pieces), quantity 1.",
        id: "Form terima stok di ponsel: produk Piring Keramik Melati, satuan lusin (12 buah), jumlah 1."
      },
      caption: {
        en: "Stock-in form: receive 1 dozen, and the form shows the cost per piece converted from the dozen price.",
        id: "Form terima stok: 1 lusin masuk, dan form menghitung modal per buah dari harga per lusin."
      }
    },
    {
      kind: "image",
      src: "/work/zaina-shop/low-stock.webp",
      width: 780,
      height: 1688,
      alt: {
        en: "Mobile dashboard with revenue tiles and a list of low-stock items, the first one at zero.",
        id: "Dasbor di ponsel dengan kartu omzet dan daftar stok tipis, barang pertama sudah nol."
      },
      caption: {
        en: "Dashboard: today's takings and the list of items at or below their shelf minimum.",
        id: "Dasbor: omzet hari ini dan daftar barang yang stoknya di batas minimum rak."
      }
    },
    {
      kind: "image",
      src: "/work/zaina-shop/offline.webp",
      width: 780,
      height: 1688,
      alt: {
        en: "Mobile catalog with a red Offline badge and a banner saying stock uses the last snapshot, with the update time.",
        id: "Katalog di ponsel dengan lencana Offline merah dan banner yang menyebut stok memakai snapshot terakhir beserta waktunya."
      },
      caption: {
        en: "Offline mode: the app keeps working from the last catalog and stock snapshot and says so.",
        id: "Mode offline: aplikasi tetap menampilkan katalog dan stok dari snapshot terakhir dan memberi tahu stafnya."
      }
    },
    {
      kind: "image",
      src: "/work/zaina-shop/monitor-desktop.webp",
      width: 1440,
      height: 900,
      alt: {
        en: "Desktop monitor page with agent status Offline, 18 visitors today, two camera panels waiting for a feed.",
        id: "Halaman Monitor di desktop dengan status agen Offline, 18 pengunjung hari ini, dan dua panel kamera yang menunggu umpan."
      },
      caption: {
        en: "Monitor page for the visitor counter. The edge agent was not running: the count and CPU figures are synthetic seed rows.",
        id: "Halaman Monitor untuk penghitung pengunjung. Agen edge tidak dijalankan: angka pengunjung dan CPU adalah baris seed sintetis."
      }
    }
  ]
};

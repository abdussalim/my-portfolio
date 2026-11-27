import type { Project } from "../projects";

export const sobatpart: Project = {
  slug: "sobatpart",
  name: "SobatPart",
  url: "https://sobatpart.com",
  year: "2026",
  image: {
    src: "/work/sobatpart/mkt-cari-cocok-unit.webp",
    width: 1440,
    height: 700,
    alt: {
      en: "Marketplace search results with a fit-my-machine filter active, two oil and fuel filters listed",
      id: "Hasil pencarian marketplace dengan filter cocok unit aktif, menampilkan dua filter"
    }
  },
  tags: {
    en: [
      "Marketplace",
      "Operations",
      "GitOps"
    ],
    id: [
      "Marketplace",
      "Operasional",
      "GitOps"
    ]
  },
  summary: {
    en: "A marketplace for heavy equipment parts, with the back office for stock, purchasing and vendor curation behind it. Buyers search by the machine they own.",
    id: "Marketplace suku cadang alat berat, lengkap dengan back office untuk stok, pembelian, dan kurasi vendor. Pembeli mencari berdasarkan unit alat yang mereka punya."
  },
  role: {
    en: "Infrastructure and backend engineer, plus the marketplace frontend",
    id: "Engineer infrastruktur dan backend, plus frontend marketplace"
  },
  stack: [
    "Go",
    "PostgreSQL",
    "SvelteKit",
    "Kubernetes",
    "Argo CD",
    "Traefik",
    "Kong",
    "GitHub Actions",
    "SeaweedFS",
    "Kustomize"
  ],
  challenge: {
    en: "Imported and local spare parts of two legal entities were stocked and sold separately. One system had to give buyers, staff and vendors a door each.",
    id: "Stok dan penjualan suku cadang impor dan lokal milik dua badan hukum dikelola terpisah. Satu sistem harus memberi pembeli, staf, dan vendor pintu masing-masing."
  },
  approach: {
    en: [],
    id: []
  },
  outcome: {
    en: "The soft launch has been live since 31 Oct 2026 with the catalogue and the staff back office. Payment, shipping and buyer login are built and tested against simulated providers, but not switched on in production.",
    id: "Soft launch berjalan sejak 31 Okt 2026 dengan katalog dan back office staf. Pembayaran, pengiriman, dan login pembeli sudah dibangun dan diuji dengan penyedia simulasi, tetapi belum dinyalakan di production."
  },
  schemaType: "SoftwareApplication",
  status: "live",
  statusNote: {
    en: "Soft launch since 31 Oct 2026: the catalogue and the staff back office are live. Login, checkout and shipping are not active in production yet.",
    id: "Soft launch sejak 31 Okt 2026: katalog dan back office staf sudah live. Login, checkout, dan pengiriman belum aktif di production."
  },
  category: "product",
  period: {
    en: "Aug to Nov 2026",
    id: "Agu sampai Nov 2026"
  },
  team: {
    en: "Small team. I carry infrastructure, pipelines, the Go backend and the marketplace; the mobile app is a teammate's. Built with AI agents I directed and verified.",
    id: "Tim kecil. Saya memegang infrastruktur, pipeline, backend Go, dan marketplace; aplikasi mobile milik rekan tim. Dibangun dengan agen AI yang saya arahkan dan verifikasi."
  },
  featured: 2,
  areas: [
    {
      area: "infra",
      items: {
        en: [
          "Designed a two-node Kubernetes cluster with kubeadm, containerd, Calico and WireGuard between the nodes. Storage and ingress are installed by hand.",
          "Put Traefik on hostPort with Let's Encrypt TLS, since the VPS has no cloud load balancer, and wrote down the two live bugs found on the way.",
          "Wrote the backup and a restore drill: pg_dump, bucket mirror and artifact volumes, 35 days of retention. The drill also proves the append-only stock trigger survives a restore.",
          "Ran the production soft launch on 31 Oct: a first Argo sync that only applies, an admin created by a one-off job, backup checked."
        ],
        id: [
          "Merancang cluster Kubernetes dua node dengan kubeadm, containerd, Calico, dan WireGuard antar node. Storage dan ingress dipasang sendiri.",
          "Memasang Traefik di hostPort dengan TLS Let's Encrypt, karena VPS tidak punya load balancer cloud, dan mencatat dua bug live yang ditemukan di jalan.",
          "Menulis backup dan gladi restore: pg_dump, cermin bucket, dan volume artefak, retensi 35 hari. Gladi itu juga membuktikan trigger stok append-only ikut ter-restore.",
          "Menjalankan soft launch production 31 Okt: sync Argo pertama yang hanya apply, admin dibuat lewat job sekali jalan, backup diperiksa."
        ]
      }
    },
    {
      area: "cicd",
      items: {
        en: [
          "Built reusable CI/CD templates with three deploy modes: single host over SSH, cluster with kubectl, and GitOps.",
          "Moved deploys to GitOps: CI writes the image tag into the infra repo, Argo CD syncs by hand, and production waits for a button press.",
          "Made database migrations a PreSync job, so a failed migration stops the rollout before anything changes.",
          "Fixed 113 references to a version tag that never existed in the templates (v2.7.0), so monorepo pipelines stopped cancelling each other."
        ],
        id: [
          "Membangun template CI/CD reusable dengan tiga mode deploy: single host lewat SSH, cluster dengan kubectl, dan GitOps.",
          "Memindahkan deploy ke GitOps: CI menulis tag image ke repo infra, Argo CD sync manual, dan production menunggu tombol ditekan.",
          "Menjadikan migrasi database sebagai job PreSync, jadi migrasi yang gagal menghentikan rollout sebelum ada yang berubah.",
          "Memperbaiki 113 referensi ke tag versi yang tidak pernah ada di template (v2.7.0), sehingga pipeline monorepo tidak lagi saling membatalkan."
        ]
      }
    },
    {
      area: "backend",
      items: {
        en: [
          "Built one Go backend on PostgreSQL 17 with sqlc: API, worker, migrations and an admin bootstrap. It refuses to start without its database URL and service token.",
          "Wrote an append-only stock ledger with idempotency keys, so a retry never books a movement twice.",
          "Integrated Duitku payments and Biteship shipping behind switches. Tested with fake servers, not live yet, while the company account and business decisions are pending.",
          "Modelled invoices, the platform fee and vendor curation: a vendor listing goes from waiting to live through the Ops queue."
        ],
        id: [
          "Membangun satu backend Go di atas PostgreSQL 17 dengan sqlc: API, worker, migrasi, dan bootstrap admin. Backend menolak menyala tanpa URL database dan service token.",
          "Menulis ledger stok append-only dengan idempotency key, jadi retry tidak pernah mencatat pergerakan dua kali.",
          "Mengintegrasikan pembayaran Duitku dan pengiriman Biteship di balik saklar. Diuji dengan server palsu, belum live, karena akun perusahaan dan keputusan bisnis masih menunggu.",
          "Memodelkan faktur, biaya layanan platform, dan kurasi vendor: listing vendor berpindah dari menunggu ke tayang lewat antrean Ops."
        ]
      }
    },
    {
      area: "frontend",
      items: {
        en: [
          "Built the buyer marketplace in SvelteKit: search by part number with or without hyphens, filter by machine brand and model, cart, step-by-step checkout, order history.",
          "Kept money on the server: the cart updates optimistically for quantity only.",
          "Built most of the Ops back office (20 screens) and the vendor portal (12 screens), with teammates on some screens.",
          "Set up shared UI components and design tokens in packages, reused by the web apps and the mobile app."
        ],
        id: [
          "Membangun marketplace pembeli di SvelteKit: cari dengan nomor part berhubung atau tanpa tanda hubung, filter berdasarkan merek dan model alat, keranjang, checkout bertahap, riwayat pesanan.",
          "Menjaga urusan uang tetap di server: keranjang hanya optimistik untuk jumlah barang.",
          "Membangun sebagian besar back office Ops (20 layar) dan portal vendor (12 layar), dengan rekan tim di beberapa layar.",
          "Menyiapkan komponen UI dan design token bersama di packages, dipakai aplikasi web dan aplikasi mobile."
        ]
      }
    },
    {
      area: "security",
      items: {
        en: [
          "Put Kong in front of the API: explicit CORS origins, a rate limit of 600 a minute, and an upstream timeout above the database timeout.",
          "Ran a deep security audit with the security-audit skill: 26 findings, 15 confirmed (one medium IDOR). Fixed in four PRs on development first: authorization, stock integrity through database constraints, login (CSRF nonce, atomic lockout) and a fail-closed environment.",
          "Made everything fail closed: the API and payment routes refuse to run without their configuration, and Postgres has no host port."
        ],
        id: [
          "Memasang Kong di depan API: origin CORS eksplisit, rate limit 600 per menit, dan timeout upstream di atas timeout database.",
          "Menjalankan audit keamanan mendalam dengan skill security-audit: 26 temuan, 15 terkonfirmasi (satu IDOR tingkat medium). Diperbaiki dalam empat PR, di development lebih dulu: otorisasi, integritas stok lewat constraint database, login (nonce CSRF, lockout atomik), dan environment yang fail-closed.",
          "Membuat semuanya fail-closed: API dan rute pembayaran menolak jalan tanpa konfigurasinya, dan Postgres tidak punya port di host."
        ]
      }
    }
  ],
  metrics: [
    {
      value: "26",
      label: {
        en: "findings in the security audit, 15 confirmed",
        id: "temuan di audit keamanan, 15 terkonfirmasi"
      }
    },
    {
      value: "35 days",
      label: {
        en: "of backup retention, with a tested restore",
        id: "retensi backup, dengan restore yang sudah diuji"
      }
    },
    {
      value: "20",
      label: {
        en: "screens in the Ops back office",
        id: "layar di back office Ops"
      }
    },
    {
      value: "3",
      label: {
        en: "deploy modes in the CI/CD templates",
        id: "mode deploy di template CI/CD"
      }
    }
  ],
  diagram: {
    src: "/work/sobatpart/diagram-light.webp",
    srcDark: "/work/sobatpart/diagram-dark.webp",
    width: 1600,
    height: 1010,
    alt: {
      en: "Architecture diagram. SobatPart on a two-node Kubernetes cluster: Traefik, three static apps, Kong, the Go API and worker, Postgres, SeaweedFS, and the GitOps deploy path through Argo CD.",
      id: "Diagram arsitektur. SobatPart di cluster Kubernetes dua node: Traefik, tiga aplikasi statis, Kong, API dan worker Go, Postgres, SeaweedFS, dan jalur deploy GitOps lewat Argo CD."
    },
    caption: {
      en: "SobatPart on a two-node Kubernetes cluster: ingress, gateway, Go services and the GitOps deploy path.",
      id: "SobatPart di cluster Kubernetes dua node: ingress, gateway, layanan Go, dan jalur deploy GitOps."
    }
  },
  media: [
    {
      kind: "video",
      mp4: "/work/sobatpart/sobatpart-screens-sequence.mp4",
      webm: "/work/sobatpart/sobatpart-screens-sequence.webm",
      poster: "/work/sobatpart/sobatpart-screens-sequence-poster.jpg",
      width: 1280,
      height: 720,
      caption: {
        en: "Screenshot sequence (not a screen recording): search by unit fit, product, cart, checkout, then Ops stock count and vendor curation. Test data, payment and shipping simulated.",
        id: "Rangkaian tangkapan layar (bukan rekaman): cari berdasarkan kecocokan unit, produk, keranjang, checkout, lalu opname stok dan kurasi vendor di Ops. Data uji, pembayaran dan pengiriman disimulasikan."
      },
      duration: 19.8
    },
    {
      kind: "image",
      src: "/work/sobatpart/mkt-cari-cocok-unit.webp",
      width: 1440,
      height: 700,
      alt: {
        en: "Marketplace search results with a fit-my-machine filter active, two oil and fuel filters listed",
        id: "Hasil pencarian marketplace dengan filter cocok unit aktif, menampilkan dua filter"
      },
      caption: {
        en: "Marketplace: search \"filter\" narrowed to parts that fit the buyer's own Komatsu PC200-8. Test data.",
        id: "Marketplace: pencarian \"filter\" disaring ke part yang cocok untuk unit Komatsu PC200-8 milik pembeli. Data uji."
      }
    },
    {
      kind: "image",
      src: "/work/sobatpart/mkt-produk-detail.webp",
      width: 1440,
      height: 880,
      alt: {
        en: "Product detail page for an engine oil filter with a verified-fit banner and alternative part numbers",
        id: "Halaman detail produk filter oli dengan penanda cocok unit dan nomor alternatif"
      },
      caption: {
        en: "Product page: verified fit for the buyer's unit, alternative part numbers, add to cart. Test data.",
        id: "Halaman produk: kecocokan terverifikasi untuk unit pembeli, nomor alternatif, tambah ke keranjang. Data uji."
      }
    },
    {
      kind: "image",
      src: "/work/sobatpart/mkt-checkout.webp",
      width: 1440,
      height: 1150,
      alt: {
        en: "Checkout page with address, shipping options, payment methods and an order summary",
        id: "Halaman checkout dengan alamat, pilihan kurir, metode bayar, dan ringkasan pesanan"
      },
      caption: {
        en: "Checkout: address, courier and payment steps. Data uji, pembayaran dan pengiriman disimulasikan (stub).",
        id: "Checkout: alamat, kurir, dan pembayaran. Data uji, pembayaran dan pengiriman disimulasikan."
      }
    },
    {
      kind: "image",
      src: "/work/sobatpart/ops-dashboard.webp",
      width: 1440,
      height: 1405,
      alt: {
        en: "Staff dashboard with two entity sales cards, nine action tiles and a 30-day sales chart",
        id: "Dashboard staf dengan dua kartu penjualan entitas, sembilan kartu tindakan, dan grafik penjualan 30 hari"
      },
      caption: {
        en: "Ops dashboard: sales per entity and a queue of items that need action. Test data.",
        id: "Dashboard Ops: penjualan per entitas dan antrean yang perlu tindakan. Data uji."
      }
    },
    {
      kind: "image",
      src: "/work/sobatpart/ops-opname-menunggu.webp",
      width: 1440,
      height: 900,
      alt: {
        en: "Stock count detail with three counted parts, their differences and Approve and Reject buttons",
        id: "Detail opname stok dengan tiga part yang dihitung, selisihnya, dan tombol Setujui dan Tolak"
      },
      caption: {
        en: "Ops: stock count awaiting approval, physical vs system quantity per part. Test data.",
        id: "Ops: opname stok menunggu persetujuan, jumlah fisik vs sistem per part. Data uji."
      }
    },
    {
      kind: "image",
      src: "/work/sobatpart/ops-kurasi-vendor.webp",
      width: 1440,
      height: 900,
      alt: {
        en: "Vendor curation table with two pending listings, vendor and sale prices, margin and Hold or Publish actions",
        id: "Tabel kurasi vendor dengan dua listing menunggu, harga vendor dan jual, margin, dan aksi Tahan atau Tayangkan"
      },
      caption: {
        en: "Ops: vendor listing curation queue with margin per listing. Test data.",
        id: "Ops: antrean kurasi listing vendor dengan margin per listing. Data uji."
      }
    },
    {
      kind: "image",
      src: "/work/sobatpart/vendor-listing.webp",
      width: 1440,
      height: 900,
      alt: {
        en: "Vendor portal listing table with part numbers, prices, stock and status badges",
        id: "Tabel listing portal vendor dengan nomor part, harga, stok, dan lencana status"
      },
      caption: {
        en: "Vendor portal: my listings with status per item (live, awaiting curation, on hold). Test data.",
        id: "Portal vendor: listing saya dengan status per item (tayang, menunggu kurasi, ditahan). Data uji."
      }
    }
  ]
};

import type { Project } from "../projects";

export const edunusa: Project = {
  slug: "edunusa",
  name: "EDUNUSA",
  url: "https://edunusa.co.id",
  year: "2025",
  image: {
    src: "/work/edunusa/landing-desktop-hero.webp",
    width: 1440,
    height: 900,
    alt: {
      en: "EDUNUSA landing page hero on desktop: headline about faster, integrated school digitisation and two buttons.",
      id: "Hero landing page EDUNUSA di desktop: judul tentang digitalisasi pendidikan yang cepat dan terintegrasi, dengan dua tombol."
    }
  },
  tags: {
    en: [
      "EdTech",
      "Platform",
      "SRE"
    ],
    id: [
      "EdTech",
      "Platform",
      "SRE"
    ]
  },
  summary: {
    en: "A school platform of many modules on one login and one deploy path. I work the kitchen behind it: pipelines, gateway, and the parts I built myself.",
    id: "Platform sekolah dengan banyak modul, satu akun, dan satu jalur deploy. Saya menjaga dapur di belakangnya: pipeline, gateway, dan beberapa bagian yang saya bangun sendiri."
  },
  role: {
    en: "Site Reliability Engineer, plus frontend and backend work",
    id: "Site Reliability Engineer, plus kerja frontend dan backend"
  },
  stack: [
    "GitHub Actions",
    "Docker",
    "Traefik",
    "Kong",
    "Vault",
    "Proxmox",
    "PostgreSQL",
    "Node.js",
    "React",
    "Next.js"
  ],
  challenge: {
    en: "Attendance, report cards, exams, library, admissions and more had to feel like one product and ship the same way, on a single Docker host.",
    id: "Presensi, rapor, ujian, perpustakaan, PPDB, dan modul lain harus terasa seperti satu produk dan dirilis dengan cara yang sama, di satu host Docker."
  },
  approach: {
    en: [],
    id: []
  },
  outcome: {
    en: "The repos share one set of reusable pipeline templates, and the library module already routes to the merged backend through Kong. Face attendance is a pilot behind feature flags.",
    id: "Repo-repo-nya berbagi satu set template pipeline, dan modul perpustakaan sudah diarahkan ke backend gabungan lewat Kong. Absen wajah masih pilot di balik feature flag."
  },
  schemaType: "SoftwareApplication",
  status: "development",
  statusNote: {
    en: "The landing page is live. Newer pieces, like the merged backend and face attendance, are pilots.",
    id: "Landing page sudah live. Bagian yang lebih baru, seperti backend gabungan dan absen wajah, masih pilot."
  },
  category: "product",
  period: {
    en: "Aug 2025 to Nov 2026",
    id: "Agu 2025 sampai Nov 2026"
  },
  team: {
    en: "Large team. I own the CI/CD templates, the design system and several frontends. SSO, the library import and the database restructure are team work.",
    id: "Tim besar. Saya memegang template CI/CD, design system, dan beberapa frontend. SSO, impor perpustakaan, dan restrukturisasi database adalah kerja tim."
  },
  featured: 1,
  areas: [
    {
      area: "infra",
      items: {
        en: [
          "The team runs the platform on one host: a Proxmox VM, Docker per service and environment, Traefik at the edge, Vault for credentials. One deploy path for all of it.",
          "Wrote the Kong gateway config as declarative files per environment, so moving a module to a new backend means changing one url (35 of 77 commits are mine)."
        ],
        id: [
          "Tim menjalankan platform di satu host: VM Proxmox, Docker per layanan dan per environment, Traefik di tepi, Vault untuk kredensial. Satu jalur deploy untuk semuanya.",
          "Menulis konfigurasi gateway Kong sebagai file deklaratif per environment, jadi memindahkan modul ke backend baru cukup mengganti satu url (35 dari 77 commit milik saya)."
        ]
      }
    },
    {
      area: "cicd",
      items: {
        en: [
          "Built the reusable GitHub Actions templates (tag @v2) for Node, Go, Hono, Java, React, Next.js, Vue, SvelteKit and Kong repos. 133 of 152 commits are mine.",
          "Added Docker, Trivy, npm and Playwright caches for the self-hosted runners, and a rollback-to-tag workflow.",
          "Found a CI step in the merged backend that always showed as skipped, so its tests never ran. Fixed it, and 23 tests started running on 13 Aug 2026."
        ],
        id: [
          "Membangun template GitHub Actions reusable (tag @v2) untuk repo Node, Go, Hono, Java, React, Next.js, Vue, SvelteKit, dan Kong. 133 dari 152 commit milik saya.",
          "Menambah cache Docker, Trivy, npm, dan Playwright untuk runner self-hosted, serta workflow rollback-to-tag.",
          "Menemukan langkah CI di backend gabungan yang selalu berstatus skipped, sehingga tesnya tidak pernah jalan. Saya perbaiki, dan 23 tes mulai berjalan pada 13 Agu 2026."
        ]
      }
    },
    {
      area: "backend",
      items: {
        en: [
          "Built apps-be, the merged backend: one Express 5 service with 10 modules, one Prisma client, and module boundaries enforced by lint (26 of 26 commits). It is the first step of folding 13 backends into 3.",
          "Built the PENSIL backend, with teaching content shared across schools (36 of 38 commits).",
          "Designed the face attendance pilot's architecture and flow, and ran its deploy, CI and flag rollout. The code is a teammate's. Matching runs in the browser, so video frames never reach the server.",
          "With the team, built SSO as an OIDC provider with a BFF."
        ],
        id: [
          "Membangun apps-be, backend gabungan: satu layanan Express 5 dengan 10 modul, satu Prisma client, dan batas antar modul yang dijaga lint (26 dari 26 commit). Ini langkah awal melebur 13 backend menjadi 3.",
          "Membangun backend PENSIL, dengan konten ajar yang dipakai bersama lintas sekolah (36 dari 38 commit).",
          "Merancang arsitektur dan alur pilot absen wajah, lalu menjalankan deploy, CI, dan rollout flag-nya. Kodenya milik rekan tim. Pencocokan wajah berjalan di browser, jadi frame video tidak pernah sampai ke server.",
          "Bersama tim, membangun SSO sebagai OIDC provider dengan BFF."
        ]
      }
    },
    {
      area: "frontend",
      items: {
        en: [
          "Built authentic-ui, the shared design system (190 of 190 commits, v0.3 to v2.0): data tables, filter sheets, chart shells, an import wizard. It rolled out to three frontends.",
          "Built the PENSIL frontend (87 of 87 commits).",
          "Built the public landing page as a paper-flip book in Next.js 16 and Tailwind 4, with a 1.5 MB 3D mascot loaded lazily.",
          "Built most of TROOPS, the cross-school operations console: a dashboard of 13 apps and school onboarding."
        ],
        id: [
          "Membangun authentic-ui, design system bersama (190 dari 190 commit, v0.3 sampai v2.0): tabel data, filter sheet, chart shell, import wizard. Sudah dipakai di tiga frontend.",
          "Membangun frontend PENSIL (87 dari 87 commit).",
          "Membangun landing page publik berbentuk buku dengan balik halaman, memakai Next.js 16 dan Tailwind 4, dengan maskot 3D 1,5 MB yang dimuat tunda.",
          "Membangun sebagian besar TROOPS, konsol operasional lintas sekolah: dasbor 13 aplikasi dan onboarding sekolah."
        ]
      }
    },
    {
      area: "security",
      items: {
        en: [
          "Pipelines log in to Vault with a short-lived AppRole token and read per-service credentials as build and deploy variables.",
          "Added Trivy image scanning and a security audit step ahead of every build.",
          "Drafted, not shipped: least-privilege Postgres roles and Vault as the single source of database credentials."
        ],
        id: [
          "Pipeline masuk ke Vault dengan token AppRole berumur pendek dan membaca kredensial per layanan sebagai variabel build dan deploy.",
          "Menambah pemindaian image Trivy dan langkah audit keamanan sebelum setiap build.",
          "Masih draf, belum rilis: role Postgres least-privilege dan Vault sebagai sumber tunggal kredensial database."
        ]
      }
    }
  ],
  metrics: [
    {
      value: "133 / 152",
      label: {
        en: "commits are mine in the CI/CD templates",
        id: "commit milik saya di template CI/CD"
      }
    },
    {
      value: "190 / 190",
      label: {
        en: "commits in the authentic-ui design system",
        id: "commit di design system authentic-ui"
      }
    },
    {
      value: "10",
      label: {
        en: "modules in the merged backend",
        id: "modul di backend gabungan"
      }
    },
    {
      value: "23",
      label: {
        en: "tests that started running in CI",
        id: "tes yang mulai berjalan di CI"
      }
    }
  ],
  diagram: {
    src: "/work/edunusa/diagram-light.webp",
    srcDark: "/work/edunusa/diagram-dark.webp",
    width: 1600,
    height: 1300,
    alt: {
      en: "Architecture diagram. EDUNUSA platform: Traefik, Kong, backends, data stores, CI/CD pipeline and the face attendance pilot flow.",
      id: "Diagram arsitektur. Platform EDUNUSA: Traefik, Kong, backend, penyimpanan data, pipeline CI/CD, dan alur absen wajah (pilot)."
    },
    caption: {
      en: "EDUNUSA platform: Traefik, Kong, backends, data stores, CI/CD pipeline and the face attendance pilot flow.",
      id: "Platform EDUNUSA: Traefik, Kong, backend, penyimpanan data, pipeline CI/CD, dan alur absen wajah (pilot)."
    }
  },
  media: [
    {
      kind: "image",
      src: "/work/edunusa/landing-desktop-hero.webp",
      width: 1440,
      height: 900,
      alt: {
        en: "EDUNUSA landing page hero on desktop: headline about faster, integrated school digitisation and two buttons.",
        id: "Hero landing page EDUNUSA di desktop: judul tentang digitalisasi pendidikan yang cepat dan terintegrasi, dengan dua tombol."
      },
      caption: {
        en: "The public EDUNUSA landing page, desktop hero. I built the landing page (Next.js, paper-flip book layout).",
        id: "Landing page publik EDUNUSA, hero desktop. Landing page ini saya bangun (Next.js, tata letak buku dengan balik halaman)."
      }
    },
    {
      kind: "image",
      src: "/work/edunusa/landing-desktop-products.webp",
      width: 1440,
      height: 900,
      alt: {
        en: "EDUNUSA landing page products section with a portal dashboard mockup and an SSO product card.",
        id: "Bagian produk landing page EDUNUSA dengan mockup dasbor portal dan kartu produk SSO."
      },
      caption: {
        en: "Landing page, products section: a portal mockup and the SSO card. Mockup placeholder text on the live site.",
        id: "Landing page, bagian produk: mockup portal dan kartu SSO. Teks placeholder pada mockup memang ada di situs live."
      }
    },
    {
      kind: "image",
      src: "/work/edunusa/landing-mobile-hero.webp",
      width: 780,
      height: 1688,
      alt: {
        en: "EDUNUSA landing page hero on a phone with headline, two stacked buttons and a dashboard mockup.",
        id: "Hero landing page EDUNUSA di ponsel dengan judul, dua tombol bertumpuk, dan mockup dasbor."
      },
      caption: {
        en: "The same landing page on a phone (390 px wide).",
        id: "Landing page yang sama di ponsel (lebar 390 px)."
      }
    }
  ]
};

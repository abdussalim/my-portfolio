import type { Project } from "../projects";

export const dkn: Project = {
  slug: "dkn",
  name: "DKN",
  url: "https://dkn.instrumeta.id",
  year: "2026",
  image: {
    src: "/work/dkn/dkn-landing-card.webp",
    width: 1200,
    height: 750,
    alt: {
      en: "Landing page of DKN, Digitalisasi Klinik Nusantara: headline about tidier clinics, and a preview of the patient list screen.",
      id: "Landing page DKN, Digitalisasi Klinik Nusantara: judul tentang klinik lebih rapi dan pratinjau layar daftar pasien."
    }
  },
  tags: {
    en: [
      "Healthtech",
      "SaaS",
      "Team project"
    ],
    id: [
      "Healthtech",
      "SaaS",
      "Proyek tim"
    ]
  },
  summary: {
    en: "A multi-tenant clinic management SaaS connected to SATUSEHAT, built by a team. I laid its foundation: architecture decisions, design system, auth and tenant isolation, and about 100 screens.",
    id: "SaaS manajemen klinik multi-penyewa yang terhubung ke SATUSEHAT, dibangun oleh tim. Saya meletakkan fondasinya: keputusan arsitektur, design system, auth dan isolasi tenant, serta sekitar 100 layar."
  },
  role: {
    en: "Foundation phase: architecture, tenant isolation and screens",
    id: "Fase fondasi: arsitektur, isolasi tenant, dan layar"
  },
  stack: [
    "NestJS",
    "SvelteKit",
    "PostgreSQL",
    "Prisma",
    "Row Level Security",
    "Next.js",
    "Docker",
    "GitHub Actions"
  ],
  challenge: {
    en: "One platform for many clinics, human and veterinary, where each clinic's data stays apart and records can go to SATUSEHAT.",
    id: "Satu platform untuk banyak klinik, manusia dan hewan, dengan data tiap klinik terpisah dan rekam medis yang bisa dikirim ke SATUSEHAT."
  },
  approach: {
    en: [
      "Wrote the architecture decisions and the design system.",
      "Scaffolded the monorepo and built auth, tenancy and the first modules.",
      "Added a test that proves one clinic cannot read another clinic's rows."
    ],
    id: [
      "Menulis keputusan arsitektur dan design system.",
      "Menyiapkan kerangka monorepo dan membangun auth, tenancy, serta modul-modul pertama.",
      "Menambah tes yang membuktikan satu klinik tidak bisa membaca baris milik klinik lain."
    ]
  },
  outcome: {
    en: "The foundation I laid still carries the product: tenant isolation with row level security, deny-by-default permissions and the first screens wired to the API. It runs on a demo tenant only, with no real clinic yet.",
    id: "Fondasi yang saya letakkan masih menopang produknya: isolasi tenant dengan row level security, izin deny-by-default, dan layar-layar pertama yang tersambung ke API. Produk berjalan hanya dengan tenant demo, belum ada klinik nyata."
  },
  schemaType: "SoftwareApplication",
  status: "development",
  statusNote: {
    en: "Deployed with a demo tenant only. No real clinic is live yet.",
    id: "Sudah ter-deploy dengan tenant demo saja. Belum ada klinik nyata yang live."
  },
  category: "product",
  period: {
    en: "Aug 2026 (my phase), continued by the team",
    id: "Agu 2026 (fase saya), dilanjutkan oleh tim"
  },
  team: {
    en: "Team project. I did the foundation phase in August 2026 (77 of 603 commits). SATUSEHAT, CD, the veterinary module and the production rollout are the team's work.",
    id: "Proyek tim. Saya mengerjakan fase fondasi pada Agustus 2026 (77 dari 603 commit). SATUSEHAT, CD, modul veteriner, dan rollout production adalah kerja tim."
  },
  caseStudy: false,
  media: [
    {
      kind: "image",
      src: "/work/dkn/dkn-landing-card.webp",
      width: 1200,
      height: 750,
      alt: {
        en: "Landing page of DKN, Digitalisasi Klinik Nusantara: headline about tidier clinics, and a preview of the patient list screen.",
        id: "Landing page DKN, Digitalisasi Klinik Nusantara: judul tentang klinik lebih rapi dan pratinjau layar daftar pasien."
      },
      caption: {
        en: "DKN public landing page, desktop hero with the clinic app preview.",
        id: "Landing page publik DKN, hero desktop dengan pratinjau aplikasi klinik."
      }
    },
    {
      kind: "image",
      src: "/work/dkn/dkn-landing-mobile.webp",
      width: 780,
      height: 1250,
      alt: {
        en: "Mobile view of the DKN landing page hero with demo and WhatsApp buttons.",
        id: "Tampilan ponsel hero landing page DKN dengan tombol demo dan WhatsApp."
      },
      caption: {
        en: "Same landing page on a phone (390 px wide).",
        id: "Landing page yang sama di ponsel (lebar 390 px)."
      }
    }
  ]
};

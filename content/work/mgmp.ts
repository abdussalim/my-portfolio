import type { Project } from "../projects";

export const mgmp: Project = {
  slug: "mgmp",
  name: "MGMP PAI Kapuas",
  year: "2026",
  image: {
    src: "/work/mgmp/desktop-dashboard.webp",
    width: 1440,
    height: 900,
    alt: {
      en: "Desktop screenshot of the dashboard with a green sidebar and a bar chart.",
      id: "Tangkapan layar desktop dashboard dengan sidebar hijau dan grafik batang."
    }
  },
  tags: {
    en: [
      "Client",
      "PWA",
      "Education"
    ],
    id: [
      "Klien",
      "PWA",
      "Pendidikan"
    ]
  },
  summary: {
    en: "A web app for a regional forum of Islamic education teachers: members, finances, attendance, documents and a question bank in one place. It is a mobile-first PWA.",
    id: "Aplikasi web untuk forum guru Pendidikan Agama Islam tingkat kabupaten: data anggota, keuangan, absensi, dokumen, dan bank soal dalam satu tempat. Berbentuk PWA yang mengutamakan ponsel."
  },
  role: {
    en: "Solo full-stack developer",
    id: "Developer full-stack, mengerjakan sendiri"
  },
  stack: [
    "React",
    "Vite",
    "Tailwind",
    "Express",
    "TypeScript",
    "Prisma",
    "PostgreSQL",
    "Docker",
    "Nginx",
    "GitHub Actions"
  ],
  challenge: {
    en: "Member data, forum finances, event attendance, documents and exam questions were not kept in one place.",
    id: "Data anggota, keuangan forum, absensi kegiatan, dokumen, dan soal ujian belum tersimpan di satu tempat."
  },
  approach: {
    en: [],
    id: []
  },
  outcome: {
    en: "One monorepo that ships as two containers through reusable pipelines, with a PWA whose shell opens offline. It is a development build and has no usage numbers yet.",
    id: "Satu monorepo yang dirilis sebagai dua container lewat pipeline reusable, dengan PWA yang shell-nya terbuka saat offline. Ini build pengembangan dan belum punya angka pemakaian."
  },
  schemaType: "SoftwareApplication",
  status: "development",
  statusNote: {
    en: "In development. No public address yet.",
    id: "Tahap pengembangan. Belum ada alamat publik."
  },
  category: "client",
  period: {
    en: "Jul to Aug 2026, with a Cloudflare variant in progress",
    id: "Jul sampai Agu 2026, dengan varian Cloudflare yang masih berjalan"
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
          "Merged five repositories into one monorepo with a client and a server workspace and one API under /api/v1. The SSO design was dropped as too heavy for an app this size.",
          "Shipped the client (Nginx) and the server (Node, Prisma) as two containers, with Nginx proxying /api/ and no public route to the server.",
          "Supported file storage on local disk or MinIO (S3), with downloads streamed through an authenticated endpoint.",
          "Started a Cloudflare variant (Pages, Workers, D1, R2) as an alternative. It is still in progress."
        ],
        id: [
          "Menggabungkan lima repository menjadi satu monorepo dengan workspace client dan server serta satu API di bawah /api/v1. Rancangan SSO dibatalkan karena terlalu berat untuk aplikasi seukuran ini.",
          "Merilis client (Nginx) dan server (Node, Prisma) sebagai dua container, dengan Nginx mem-proxy /api/ dan tanpa rute publik ke server.",
          "Mendukung penyimpanan file di disk lokal atau MinIO (S3), dengan unduhan dialirkan lewat endpoint yang butuh autentikasi.",
          "Memulai varian Cloudflare (Pages, Workers, D1, R2) sebagai alternatif. Masih berjalan."
        ]
      }
    },
    {
      area: "cicd",
      items: {
        en: [
          "Wired six workflows (PR checks, deploy and rollback for client and server) to reusable templates tagged @v2.",
          "Found that the old workflows lived in client/.github and server/.github, so GitHub never ran them. Moved them to the root.",
          "PR checks run gitleaks, npm audit and the build. Deploys run per branch with a health check and a manual rollback.",
          "Maintained the shared pipeline templates: added an image_name input for monorepos and fixed internal references (v2.7.0)."
        ],
        id: [
          "Menyambungkan enam workflow (cek PR, deploy, dan rollback untuk client dan server) ke template reusable bertag @v2.",
          "Menemukan bahwa workflow lama berada di client/.github dan server/.github, jadi tidak pernah dijalankan GitHub. Saya pindahkan ke root.",
          "Cek PR menjalankan gitleaks, npm audit, dan build. Deploy berjalan per cabang dengan health check dan rollback manual.",
          "Memelihara template pipeline bersama: menambah input image_name untuk monorepo dan memperbaiki referensi internal (v2.7.0)."
        ]
      }
    },
    {
      area: "backend",
      items: {
        en: [
          "Built an Express 5 API in layers (route, controller, service, repository) with Zod validation for auth, teachers, finance, attendance, documents and the question bank.",
          "Wrote local JWT auth with bcrypt, 12-hour tokens and a login rate limit, plus admin and teacher roles.",
          "Designed one Prisma schema for PostgreSQL: organisation, teachers, roles, users, transactions, attendance, documents and question bank. The session and OIDC models from the SSO era are gone.",
          "Wrote tests with Vitest and Supertest across 15 test files."
        ],
        id: [
          "Membangun API Express 5 berlapis (route, controller, service, repository) dengan validasi Zod untuk auth, guru, keuangan, absensi, dokumen, dan bank soal.",
          "Menulis auth JWT lokal dengan bcrypt, token 12 jam, dan rate limit login, plus peran admin dan guru.",
          "Merancang satu skema Prisma untuk PostgreSQL: organisasi, guru, role, user, transaksi, kehadiran, dokumen, dan bank soal. Model session dan OIDC era SSO sudah dibuang.",
          "Menulis tes dengan Vitest dan Supertest di 15 berkas tes."
        ]
      }
    },
    {
      area: "frontend",
      items: {
        en: [
          "Built the React 19 app: a dashboard with a monthly finance chart, teachers, finance, attendance, documents and question bank.",
          "Made it mobile-first: a bottom tab bar, tables that turn into cards under 768 px, and an installable PWA with an offline shell and an update toast."
        ],
        id: [
          "Membangun aplikasi React 19: dasbor dengan grafik keuangan bulanan, guru, keuangan, absensi, dokumen, dan bank soal.",
          "Menjadikannya mobile-first: tab bar bawah, tabel yang berubah menjadi kartu di bawah 768 px, dan PWA yang bisa dipasang dengan shell offline dan toast pembaruan."
        ]
      }
    },
    {
      area: "security",
      items: {
        en: [
          "Added a guard that makes you type the database name before any migrate or seed.",
          "Added helmet, rate limiting, and a scan for leaked secrets on every pull request."
        ],
        id: [
          "Menambah pagar yang mewajibkan mengetik nama database sebelum migrate atau seed apa pun.",
          "Menambah helmet, rate limiting, dan pemindaian secret bocor pada setiap pull request."
        ]
      }
    }
  ],
  metrics: [
    {
      value: "5 to 1",
      label: {
        en: "repositories merged into one monorepo",
        id: "repository digabung menjadi satu monorepo"
      }
    },
    {
      value: "6",
      label: {
        en: "CI/CD workflows on reusable templates",
        id: "workflow CI/CD di atas template reusable"
      }
    },
    {
      value: "15",
      label: {
        en: "test files on the API",
        id: "berkas tes untuk API"
      }
    }
  ],
  diagram: {
    src: "/work/mgmp/diagram-light.webp",
    srcDark: "/work/mgmp/diagram-dark.webp",
    width: 1600,
    height: 1050,
    alt: {
      en: "Architecture diagram. MGMP PAI Kapuas: React PWA, Nginx, Express 5 with local JWT, Postgres, CI/CD with rollback, and the Cloudflare variant in progress.",
      id: "Diagram arsitektur. MGMP PAI Kapuas: PWA React, Nginx, Express 5 dengan JWT lokal, Postgres, CI/CD dengan rollback, dan varian Cloudflare yang masih berjalan."
    },
    caption: {
      en: "MGMP PAI Kapuas: React PWA, Nginx, Express 5 with local JWT, Postgres, CI/CD with rollback, and the Cloudflare variant in progress.",
      id: "MGMP PAI Kapuas: PWA React, Nginx, Express 5 dengan JWT lokal, Postgres, CI/CD dengan rollback, dan varian Cloudflare yang masih berjalan."
    }
  },
  media: [
    {
      kind: "video",
      mp4: "/work/mgmp/mobile-walkthrough.mp4",
      webm: "/work/mgmp/mobile-walkthrough.webm",
      poster: "/work/mgmp/mobile-walkthrough-poster.jpg",
      width: 390,
      height: 844,
      caption: {
        en: "Mobile walkthrough, 19 s: dashboard, teachers, attendance, finance, via the bottom tab bar.",
        id: "Penelusuran mobile, 19 dtk: dashboard, guru, absensi, keuangan lewat tab bar bawah."
      },
      duration: 19
    },
    {
      kind: "image",
      src: "/work/mgmp/desktop-dashboard.webp",
      width: 1440,
      height: 900,
      alt: {
        en: "Desktop screenshot of the dashboard with a green sidebar and a bar chart.",
        id: "Tangkapan layar desktop dashboard dengan sidebar hijau dan grafik batang."
      },
      caption: {
        en: "Desktop layout: sidebar navigation, four stat cards and the monthly finance chart.",
        id: "Tampilan desktop: navigasi sidebar, empat kartu statistik dan grafik keuangan bulanan."
      }
    },
    {
      kind: "image",
      src: "/work/mgmp/desktop-finance.webp",
      width: 1440,
      height: 900,
      alt: {
        en: "Desktop screenshot of the finance table with income and expense badges.",
        id: "Tangkapan layar desktop tabel keuangan dengan label pemasukan dan pengeluaran."
      },
      caption: {
        en: "Desktop finance page: balance cards, filters and paginated transaction table.",
        id: "Halaman keuangan desktop: kartu saldo, filter dan tabel transaksi berhalaman."
      }
    },
    {
      kind: "image",
      src: "/work/mgmp/mobile-dashboard.webp",
      width: 780,
      height: 1688,
      alt: {
        en: "Phone screenshot of the dashboard with stat cards and a monthly income and expense bar chart.",
        id: "Tangkapan layar dashboard dengan kartu statistik dan grafik batang pemasukan dan pengeluaran bulanan."
      },
      caption: {
        en: "Admin dashboard on mobile: stat cards and the monthly finance chart, bottom tab bar.",
        id: "Dashboard admin di mobile: kartu statistik dan grafik keuangan bulanan, tab bar bawah."
      }
    },
    {
      kind: "image",
      src: "/work/mgmp/mobile-teachers.webp",
      width: 780,
      height: 1688,
      alt: {
        en: "Phone screenshot of teacher cards with school, status and account actions.",
        id: "Tangkapan layar kartu guru dengan sekolah, status dan aksi akun."
      },
      caption: {
        en: "Teacher list on mobile: table turned into cards below 768 px, fictional members.",
        id: "Daftar guru di mobile: tabel menjadi kartu di bawah 768 px, anggota fiktif."
      }
    },
    {
      kind: "image",
      src: "/work/mgmp/mobile-attendance.webp",
      width: 780,
      height: 1688,
      alt: {
        en: "Phone screenshot of attendance records for a coordination meeting.",
        id: "Tangkapan layar catatan kehadiran untuk rapat koordinasi."
      },
      caption: {
        en: "Attendance page with event and date filters and attendance records.",
        id: "Halaman absensi dengan filter acara dan tanggal serta catatan kehadiran."
      }
    },
    {
      kind: "image",
      src: "/work/mgmp/mobile-finance.webp",
      width: 780,
      height: 1688,
      alt: {
        en: "Phone screenshot of finance summary cards and a transaction list.",
        id: "Tangkapan layar kartu ringkasan keuangan dan daftar transaksi."
      },
      caption: {
        en: "Finance page: cash balance, total income and expense, then the transaction cards.",
        id: "Halaman keuangan: saldo kas, total pemasukan dan pengeluaran, lalu kartu transaksi."
      }
    },
    {
      kind: "image",
      src: "/work/mgmp/mobile-question-bank.webp",
      width: 780,
      height: 1688,
      alt: {
        en: "Phone screenshot of question bank entries with class level and file info.",
        id: "Tangkapan layar entri bank soal dengan tingkat kelas dan info berkas."
      },
      caption: {
        en: "Question bank filtered by class, with download and delete actions for admins.",
        id: "Bank soal dengan filter kelas, aksi unduh dan hapus untuk admin."
      }
    }
  ]
};

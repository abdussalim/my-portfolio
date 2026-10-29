import type { Locale } from "./site";

type Localized<T> = Record<Locale, T>;

export type Project = {
  slug: string;
  name: string;
  url: string;
  year: string;
  image: { src: string; width: number; height: number; alt: Localized<string> };
  tags: Localized<string[]>;
  summary: Localized<string>;
  role: Localized<string>;
  stack: string[];
  challenge: Localized<string>;
  approach: Localized<string[]>;
  outcome: Localized<string>;
  /** schema.org type used for the case-study JSON-LD. */
  schemaType: "WebSite" | "ScholarlyArticle";
  /** Full publication title, used as the ScholarlyArticle headline. */
  headline?: string;
};

// Case-study copy only restates facts already published on the site/CV.
// Anything more specific should come from Abdus before it goes live.
export const projects: Project[] = [
  {
    slug: "edunusa",
    name: "EDUNUSA",
    url: "https://edunusa.co.id",
    year: "2025",
    image: {
      src: "/img/portfolio/edunusa-live.png",
      width: 1400,
      height: 788,
      alt: { en: "EDUNUSA education platform landing page", id: "Halaman depan platform edukasi EDUNUSA" },
    },
    tags: { en: ["EdTech", "10+ institutions", "5000+ users"], id: ["EdTech", "10+ lembaga", "5000+ pengguna"] },
    summary: {
      en: "10+ schools run attendance, exams, report cards, and admissions here, serving 5000+ people daily.",
      id: "10+ sekolah mengelola presensi, ujian, rapor, dan PPDB di sini, melayani 5000+ orang tiap hari.",
    },
    role: { en: "Site Reliability Engineer", id: "Site Reliability Engineer" },
    stack: ["GitHub Actions", "Docker", "Traefik", "Vault", "Linux VPS", "PostgreSQL"],
    challenge: {
      en: "Schools depend on the platform every day for attendance, exams, and report cards. Downtime during an exam window is not an option.",
      id: "Sekolah bergantung pada platform ini setiap hari untuk presensi, ujian, dan rapor. Down saat jadwal ujian bukan pilihan.",
    },
    approach: {
      en: [
        "Built CI/CD pipelines with GitHub Actions so every app ships the same way.",
        "Containerized services with Docker behind Traefik on Linux servers.",
        "Moved secrets into Vault instead of scattered environment files.",
      ],
      id: [
        "Membangun pipeline CI/CD dengan GitHub Actions agar setiap aplikasi rilis dengan cara yang sama.",
        "Mengemas layanan dengan Docker di belakang Traefik pada server Linux.",
        "Memindahkan secret ke Vault, tidak lagi tersebar di file environment.",
      ],
    },
    outcome: {
      en: "10+ institutions and 5000+ daily users running on a platform that ships without drama.",
      id: "10+ lembaga dan 5000+ pengguna harian berjalan di platform yang rilis tanpa drama.",
    },
    schemaType: "WebSite",
  },
  {
    slug: "instrumeta",
    name: "Instrumeta",
    url: "https://instrumeta.id",
    year: "2025",
    image: {
      src: "/img/portfolio/instrumeta-card.png",
      width: 1920,
      height: 686,
      alt: { en: "Instrumeta brand wordmark and tagline", id: "Wordmark dan tagline Instrumeta" },
    },
    tags: { en: ["Company site", "SRE"], id: ["Situs perusahaan", "SRE"] },
    summary: {
      en: "The digital home of an IoT and robotics company. I helped build it, and I keep the lights on.",
      id: "Rumah digital perusahaan IoT dan robotik. Saya ikut membangunnya, dan saya yang menjaganya tetap menyala.",
    },
    role: { en: "Developer & Site Reliability Engineer", id: "Developer & Site Reliability Engineer" },
    stack: ["Next.js", "React", "Docker", "Traefik", "GitHub Actions"],
    challenge: {
      en: "An IoT and robotics company needed a web presence that stays fast and online while the team focuses on hardware.",
      id: "Perusahaan IoT dan robotik butuh kehadiran web yang cepat dan selalu online, sementara timnya fokus ke hardware.",
    },
    approach: {
      en: ["Helped build the company site.", "Run its deployment and uptime as part of the SRE workload."],
      id: ["Ikut membangun situs perusahaan.", "Menjalankan deployment dan menjaga uptime-nya sebagai bagian dari pekerjaan SRE."],
    },
    outcome: {
      en: "A company site that ships through the same pipeline as the rest of the stack.",
      id: "Situs perusahaan yang rilis lewat pipeline yang sama dengan stack lainnya.",
    },
    schemaType: "WebSite",
  },
  {
    slug: "heliyon-research",
    name: "Heliyon Research",
    url: "https://doi.org/10.1016/j.heliyon.2023.e16425",
    year: "2023",
    image: {
      src: "/img/portfolio/my-publication-card.png",
      width: 713,
      height: 569,
      alt: { en: "Research article published in Heliyon", id: "Artikel riset yang terbit di Heliyon" },
    },
    tags: { en: ["Research", "Open access"], id: ["Riset", "Open access"] },
    summary: {
      en: "Physics roots, peer-reviewed: research on river sediment pollution, open access at Elsevier.",
      id: "Akar fisika, lolos peer-review: riset polusi sedimen sungai, open access di Elsevier.",
    },
    role: { en: "Co-author", id: "Penulis pendamping" },
    stack: ["Field sampling", "Data analysis", "Physics"],
    challenge: {
      en: "Magnetic susceptibility and heavy metal contents in sediments of the Riam Kiwa, Riam Kanan and Martapura rivers, South Kalimantan: how polluted is the riverbed, measured in a way that holds up to peer review?",
      id: "Suseptibilitas magnetik dan kandungan logam berat pada sedimen Sungai Riam Kiwa, Riam Kanan, dan Martapura, Kalimantan Selatan: seberapa tercemar dasar sungainya, diukur dengan cara yang lolos peer review?",
    },
    approach: {
      en: ["Worked from a physics background: cause, measure, feedback.", "Contributed to the research published in Heliyon."],
      id: ["Berangkat dari latar fisika: sebab, ukuran, feedback.", "Berkontribusi pada riset yang terbit di Heliyon."],
    },
    outcome: {
      en: "Published open access in Heliyon (Elsevier), 2023.",
      id: "Terbit open access di Heliyon (Elsevier), 2023.",
    },
    schemaType: "ScholarlyArticle",
    headline:
      "Magnetic susceptibility and heavy metal contents in sediments of Riam Kiwa, Riam Kanan and Martapura rivers, Kalimantan Selatan province, Indonesia",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

import type { Project } from "../projects";

export const instrumeta: Project = {
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
};

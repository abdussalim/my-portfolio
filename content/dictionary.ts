import type { Locale } from "./site";

const en = {
  meta: {
    title: "Abdus Salim | Site Reliability Engineer & Fullstack Developer",
    description:
      "Abdus Salim is a Site Reliability Engineer and fullstack developer in Jakarta. CI/CD, Docker, Kubernetes, Linux, React, Next.js, Cloudflare and GCP.",
    originsTitle: "Origins: early IoT prototypes | Abdus Salim",
    originsDescription:
      "Three hardware-first prototypes from Abdus Salim's student days: an air quality monitor, a voice-started motorcycle, and a QR goods scanner.",
  },
  nav: {
    about: "About",
    career: "Career",
    story: "Story",
    works: "Works",
    contact: "Contact",
    switchLabel: "Baca dalam Bahasa Indonesia",
    switchShort: "ID",
    themeLabel: "Toggle color theme",
    menuLabel: "Toggle navigation",
    skip: "Skip to content",
  },
  hero: {
    eyebrow: "Site Reliability Engineer / Fullstack / IoT",
    title: "I cook solid systems, then plate them clean.",
    lead: "From sensor to production: CI/CD, infrastructure, and the web apps on top, kept running.",
    primary: "See work",
    secondary: "Contact me",
    portraitAlt: "Portrait of Abdus Salim",
    station: "Base station, Jakarta",
  },
  about: {
    title: "I keep the lights on, and still build the thing.",
    text: "Reliability, CI/CD, Linux, and web apps are my lane. If the idea is raw, I take it from infrastructure all the way to the interface. Much of my recent code is written with AI coding agents that I brief, direct and verify. Every claim on this site is something I can walk you through.",
    metrics: [
      { value: "133 / 152", label: "CI/CD template commits are mine" },
      { value: "2", label: "node Kubernetes cluster I designed" },
      { value: "100%", label: "Istana cold requests return 200" },
    ],
  },
  photos: {
    title: "Outside the terminal.",
    note: "Snapshots of moving, learning, and tidying ideas.",
    items: [
      { src: "/img/portraits/sarimu-3-display.png", alt: "Abdus Salim standing near water", caption: "Field mode" },
      { src: "/img/portraits/sarimu-2-display.png", alt: "Abdus Salim checking a phone", caption: "Quiet build time" },
      { src: "/img/portraits/sarimu-4-display.png", alt: "Abdus Salim in a casual store moment", caption: "Off duty" },
    ],
  },
  career: {
    eyebrow: "Career",
    title: "Reliability first. The product keeps rolling.",
    note: "SRE since 2025, frontend since 2023. Pipelines that behave, zero drama.",
    jobs: [
      {
        date: "May 2025 - Present",
        role: "Site Reliability Engineer",
        org: "PT Instrumeta Teknologi Nusantara",
        text: "Keeps 7 education apps steady, secure, and easy to ship with GitHub Actions, Docker, Traefik, and Vault on Linux.",
      },
      {
        date: "Feb 2023 - Feb 2026",
        role: "Frontend Web Developer",
        org: "Kementerian Keuangan RI, via NashTa Group",
        text: "Built and maintained React interfaces for daily government workflows.",
      },
      {
        date: "Jan 2021 - Sep 2021",
        role: "Surveying Technician",
        org: "Dinas Pertanian Kabupaten Kapuas",
        text: "Mapped field data for oil palm areas.",
      },
    ],
    skillGroups: [
      {
        title: "Reliability & DevOps",
        items: ["GitHub Actions", "Docker", "Linux VPS", "Traefik", "Vault", "AWS", "Kubernetes (learning)", "Terraform (learning)", "Prometheus/Grafana (learning)"],
      },
      {
        title: "Product engineering",
        items: ["React", "Next.js", "TypeScript", "Node.js", "Express", "Go"],
      },
      {
        title: "Data",
        items: ["PostgreSQL", "MySQL", "Prisma"],
      },
    ],
    certsTitle: "Certifications & community",
    certs: ["AWS Solutions Architect Associate (2025)", "AWS Cloud Practitioner (2025)", "ICCom Board", "DF Labs"],
  },
  story: {
    title: "From tiny wires to systems built to last.",
    steps: [
      { title: "Read the room.", text: "Physics taught me cause, measure, and feedback." },
      { title: "Cook a prototype.", text: "Sensors and Arduino were my first test kitchen." },
      { title: "Wrap it in web.", text: "Raw data becomes flows, dashboards, and UI." },
      { title: "Ship the plate.", text: "Once it is cooked, it goes to production, light and ready." },
    ],
  },
  projects: {
    eyebrow: "Selected works",
    title: "From my kitchen to production.",
    note: "Four dishes from my kitchen: a school platform, a parts marketplace on Kubernetes, a paving factory site on Cloudflare, and a peatland fire early warning on GCP.",
    open: "Visit site",
    caseStudy: "Read case study",
    viewAll: "See all work",
    origins: "See where it started",
    reel: "Showreel: EDUNUSA, Instrumeta, and the Heliyon research in 24 seconds.",
  },
  contact: {
    title: "Got an idea to cook?",
    text: "Send the rough cut. We will plate it clean.",
    emailLabel: "Or email",
    form: {
      name: "Full name",
      email: "Email address",
      message: "Message",
      placeholder: "Tell me what we are building…",
      submit: "Send message",
      sending: "Sending…",
      success: "Message sent. I will get back to you soon.",
      error: "Sending failed. Email me at abdussalimsan@gmail.com instead.",
    },
  },
  footer: {
    created: "Plated neatly by",
    rights: "All rights reserved.",
  },
  easter: {
    kicker: "Easter egg",
    text: "Something is hiding here. Hold CTRL and move your cursor.",
    close: "Dismiss easter egg hint",
  },
  origins: {
    label: "Origins",
    title: "Three early experiments that started everything.",
    text: "Hardware-first prototypes from my student days, where the curiosity came from.",
    back: "Go to my recent works",
    archived: "archived",
    cards: {
      bahinak: { kicker: "IoT prototype", text: "Air quality checks from your own gadget, with sensors and a tiny dashboard." },
      motobike: { kicker: "Voice prototype", text: "A motorcycle that starts by voice. Demo recorded on Drive." },
      qr: { kicker: "Campus project", text: "QR scans for goods details and prices. Archived, fondly." },
    },
  },
  work: {
    back: "All works",
    role: "Role",
    stack: "Stack",
    year: "Year",
    challenge: "The problem",
    approach: "What I did",
    outcome: "Outcome",
    visit: "Visit",
    next: "Next project",
    did: "What I did",
    architecture: "Architecture",
    evidence: "Evidence",
    metrics: "By the numbers",
    period: "Period",
    team: "Team",
    links: "Links",
    playVideo: "Play video",
    zoom: "Zoom",
    close: "Close",
    prev: "Previous",
    nextImage: "Next",
    teamCard: "Team project. Details stay with the team, so no case study here.",
    allWork: "All work",
    statusLabel: { live: "Live", development: "In development", frozen: "Frozen", internal: "Internal" },
    categoryLabel: {
      client: "Client work",
      product: "Product",
      competition: "Competition",
      personal: "Personal",
      research: "Research",
    },
    areaLabel: {
      infra: "Infrastructure",
      cicd: "CI/CD",
      backend: "Backend",
      frontend: "Frontend",
      security: "Security",
      data: "Data",
    },
  },
  workIndex: {
    title: "Everything I have shipped, plated in order.",
    lead: "Client platforms, products, competition entries and research. Each card says honestly where it stands today.",
    all: "All",
    metaTitle: "Work: platforms, products and research | Abdus Salim",
    metaDescription:
      "Selected work by Abdus Salim: school platform EDUNUSA, SobatPart, Istana Block, ASAPIFY and more, with role, stack and honest status for each.",
  },
};

export type Dictionary = typeof en;

const id: Dictionary = {
  meta: {
    title: "Abdus Salim | Site Reliability Engineer & Fullstack Developer",
    description:
      "Abdus Salim, Site Reliability Engineer dan fullstack developer di Jakarta. CI/CD, Docker, Kubernetes, Linux, React, Next.js, Cloudflare, dan GCP.",
    originsTitle: "Asal mula: prototype IoT awal | Abdus Salim",
    originsDescription:
      "Tiga prototype hardware dari masa kuliah Abdus Salim: monitor kualitas udara, motor yang menyala lewat suara, dan pemindai barang berbasis QR.",
  },
  nav: {
    about: "Tentang",
    career: "Karier",
    story: "Cerita",
    works: "Karya",
    contact: "Kontak",
    switchLabel: "Read in English",
    switchShort: "EN",
    themeLabel: "Ganti tema warna",
    menuLabel: "Buka navigasi",
    skip: "Langsung ke konten",
  },
  hero: {
    eyebrow: "Site Reliability Engineer / Fullstack / IoT",
    title: "Saya masak sistem sampai matang, lalu sajikan dengan rapi.",
    lead: "Dari sensor sampai produksi: CI/CD, infrastruktur, dan aplikasi web di atasnya, tetap menyala.",
    primary: "Lihat karya",
    secondary: "Hubungi saya",
    portraitAlt: "Potret Abdus Salim",
    station: "Titik ikat, Jakarta",
  },
  about: {
    title: "Saya jaga mesinnya tetap nyala, sambil tetap membangun produknya.",
    text: "Reliability, CI/CD, Linux, dan aplikasi web adalah dapur saya. Ide mentah saya bawa dari infrastruktur sampai antarmuka. Sebagian besar kode terbaru saya ditulis bersama agen AI yang saya brief, arahkan, dan verifikasi. Setiap klaim di situs ini bisa saya jelaskan langkah demi langkah.",
    metrics: [
      { value: "133 / 152", label: "commit template CI/CD milik saya" },
      { value: "2", label: "node cluster Kubernetes rancangan saya" },
      { value: "100%", label: "permintaan dingin Istana semua 200" },
    ],
  },
  photos: {
    title: "Di luar terminal.",
    note: "Potongan jalan, belajar, lalu merapikan ide.",
    items: [
      { src: "/img/portraits/sarimu-3-display.png", alt: "Abdus Salim berdiri di dekat air", caption: "Mode lapangan" },
      { src: "/img/portraits/sarimu-2-display.png", alt: "Abdus Salim melihat ponsel", caption: "Waktu membangun" },
      { src: "/img/portraits/sarimu-4-display.png", alt: "Abdus Salim santai di sebuah toko", caption: "Lepas tugas" },
    ],
  },
  career: {
    eyebrow: "Karier",
    title: "Reliability dulu. Produk tetap jalan.",
    note: "SRE sejak 2025, frontend sejak 2023. Pipeline yang patuh, tanpa drama.",
    jobs: [
      {
        date: "Mei 2025 - Sekarang",
        role: "Site Reliability Engineer",
        org: "PT Instrumeta Teknologi Nusantara",
        text: "Menjaga 7 aplikasi edukasi tetap stabil, aman, dan mudah dirilis dengan GitHub Actions, Docker, Traefik, dan Vault di Linux.",
      },
      {
        date: "Feb 2023 - Feb 2026",
        role: "Frontend Web Developer",
        org: "Kementerian Keuangan RI, via NashTa Group",
        text: "Membangun dan merawat antarmuka React untuk alur kerja harian pemerintahan.",
      },
      {
        date: "Jan 2021 - Sep 2021",
        role: "Surveying Technician",
        org: "Dinas Pertanian Kabupaten Kapuas",
        text: "Memetakan data lapangan untuk area kebun sawit.",
      },
    ],
    skillGroups: [
      {
        title: "Reliability & DevOps",
        items: ["GitHub Actions", "Docker", "Linux VPS", "Traefik", "Vault", "AWS", "Kubernetes (belajar)", "Terraform (belajar)", "Prometheus/Grafana (belajar)"],
      },
      {
        title: "Rekayasa produk",
        items: ["React", "Next.js", "TypeScript", "Node.js", "Express", "Go"],
      },
      {
        title: "Data",
        items: ["PostgreSQL", "MySQL", "Prisma"],
      },
    ],
    certsTitle: "Sertifikasi & komunitas",
    certs: ["AWS Solutions Architect Associate (2025)", "AWS Cloud Practitioner (2025)", "ICCom Board", "DF Labs"],
  },
  story: {
    title: "Dari kabel kecil ke sistem yang siap dijaga.",
    steps: [
      { title: "Baca pola.", text: "Fisika mengajari saya membaca sebab, ukuran, dan feedback." },
      { title: "Racik prototype.", text: "Sensor dan Arduino jadi dapur pertama untuk menguji ide." },
      { title: "Bungkus jadi web.", text: "Data mentah saya tata jadi alur, dashboard, dan UI." },
      { title: "Sajikan ke pengguna.", text: "Yang sudah matang naik ke produksi: ringan, jelas, siap dipakai." },
    ],
  },
  projects: {
    eyebrow: "Karya pilihan",
    title: "Dari dapur saya ke produksi.",
    note: "Empat hidangan dari dapur saya: platform sekolah, marketplace suku cadang di Kubernetes, situs pabrik paving di Cloudflare, dan peringatan dini kebakaran gambut di GCP.",
    open: "Kunjungi situs",
    caseStudy: "Baca studi kasus",
    viewAll: "Lihat semua karya",
    origins: "Lihat asal mulanya",
    reel: "Showreel: EDUNUSA, Instrumeta, dan riset Heliyon dalam 24 detik.",
  },
  contact: {
    title: "Ada ide yang mau dimasak bareng?",
    text: "Kirim versi mentahnya. Nanti kita rapikan bersama.",
    emailLabel: "Atau email",
    form: {
      name: "Nama lengkap",
      email: "Alamat email",
      message: "Pesan",
      placeholder: "Ceritakan yang mau kamu bangun…",
      submit: "Kirim pesan",
      sending: "Mengirim…",
      success: "Pesan terkirim. Saya akan segera membalas.",
      error: "Gagal terkirim. Email langsung saja ke abdussalimsan@gmail.com.",
    },
  },
  footer: {
    created: "Ditata dengan rapi oleh",
    rights: "Hak cipta dilindungi.",
  },
  easter: {
    kicker: "Easter egg",
    text: "Ada yang tersembunyi di sini. Tahan CTRL sambil gerakkan kursor.",
    close: "Tutup petunjuk easter egg",
  },
  origins: {
    label: "Asal mula",
    title: "Tiga eksperimen awal yang memulai semuanya.",
    text: "Prototype hardware dari masa kuliah, tempat rasa penasaran ini tumbuh.",
    back: "Lihat karya terbaru saya",
    archived: "arsip",
    cards: {
      bahinak: { kicker: "Prototype IoT", text: "Cek kualitas udara dari gadget sendiri, dengan sensor dan dashboard kecil." },
      motobike: { kicker: "Prototype suara", text: "Motor yang menyala lewat suara. Demonya terekam di Drive." },
      qr: { kicker: "Project kampus", text: "Scan QR untuk detail dan harga barang. Diarsipkan baik-baik." },
    },
  },
  work: {
    back: "Semua karya",
    role: "Peran",
    stack: "Stack",
    year: "Tahun",
    challenge: "Masalahnya",
    approach: "Yang saya kerjakan",
    outcome: "Hasil",
    visit: "Kunjungi",
    next: "Project berikutnya",
    did: "Yang saya kerjakan",
    architecture: "Arsitektur",
    evidence: "Bukti",
    metrics: "Dalam angka",
    period: "Periode",
    team: "Tim",
    links: "Tautan",
    playVideo: "Putar video",
    zoom: "Perbesar",
    close: "Tutup",
    prev: "Sebelumnya",
    nextImage: "Berikutnya",
    teamCard: "Project tim. Detailnya dipegang tim, jadi tidak ada studi kasus di sini.",
    allWork: "Semua karya",
    statusLabel: { live: "Aktif", development: "Dalam pengembangan", frozen: "Dibekukan", internal: "Internal" },
    categoryLabel: {
      client: "Pekerjaan klien",
      product: "Produk",
      competition: "Kompetisi",
      personal: "Pribadi",
      research: "Riset",
    },
    areaLabel: {
      infra: "Infrastruktur",
      cicd: "CI/CD",
      backend: "Backend",
      frontend: "Frontend",
      security: "Keamanan",
      data: "Data",
    },
  },
  workIndex: {
    title: "Semua yang sudah saya rilis, disajikan berurutan.",
    lead: "Platform klien, produk, karya kompetisi, dan riset. Setiap kartu jujur soal posisinya hari ini.",
    all: "Semua",
    metaTitle: "Karya: platform, produk, dan riset | Abdus Salim",
    metaDescription:
      "Karya pilihan Abdus Salim: platform sekolah EDUNUSA, SobatPart, Istana Block, ASAPIFY, dan lainnya, lengkap dengan peran, stack, dan status yang jujur.",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, id };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

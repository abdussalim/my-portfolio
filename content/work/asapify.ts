import type { Project } from "../projects";

export const asapify: Project = {
  slug: "asapify",
  name: "ASAPify",
  url: "https://hack2skill-510921.web.app",
  year: "2026",
  image: {
    src: "/work/asapify/map-desktop.webp",
    width: 1440,
    height: 900,
    alt: {
      en: "ASAPify map in desktop width with 21 regions in Alert, a legend and a timeline player at the bottom.",
      id: "Peta ASAPify lebar desktop dengan 21 region berstatus Alert, legenda, dan pemutar garis waktu di bawah."
    }
  },
  tags: {
    en: [
      "Competition",
      "Satellite",
      "AI agent"
    ],
    id: [
      "Kompetisi",
      "Satelit",
      "Agen AI"
    ]
  },
  summary: {
    en: "An early indication map for hot spots on Indonesian peatlands. Two weather satellites feed the rules, a Gemini agent checks the evidence, and a person decides what gets published.",
    id: "Peta indikasi dini titik panas di lahan gambut Indonesia. Dua satelit cuaca memberi data ke aturan, agen Gemini memeriksa buktinya, dan manusia yang memutuskan apa yang diterbitkan."
  },
  role: {
    en: "Frontend Engineer, and main author of the code (96 to 97% of backend and frontend commits)",
    id: "Frontend Engineer, sekaligus penulis utama kode (96 sampai 97% commit backend dan frontend)"
  },
  stack: [
    "Python",
    "FastAPI",
    "Google ADK",
    "Gemini",
    "Cloud Run",
    "Firestore",
    "React",
    "MapLibre",
    "TypeScript",
    "Firebase"
  ],
  challenge: {
    en: "Peat fires start as heat that is hard to see before the smoke spreads. The team wanted an early indication across 65 peat regions in Sumatra and Kalimantan, without pretending it is a calibrated warning system.",
    id: "Kebakaran gambut berawal dari panas yang sulit terlihat sebelum asap menyebar. Tim ingin indikasi dini di 65 region gambut Sumatra dan Kalimantan, tanpa berpura-pura itu sistem peringatan yang sudah terkalibrasi."
  },
  approach: {
    en: [],
    id: []
  },
  outcome: {
    en: "A public map, day player and region pages, plus a Telegram alert path with a person in the loop. It is a thermal indication, checked against satellite fire detections on one night slot only, with no backtest against real fires.",
    id: "Peta publik, pemutar hari, dan halaman region, plus jalur peringatan Telegram yang melibatkan manusia. Ini indikasi termal, diperiksa terhadap deteksi api satelit pada satu slot malam saja, tanpa backtest terhadap kebakaran nyata."
  },
  schemaType: "CreativeWork",
  status: "frozen",
  statusNote: {
    en: "Frozen on 18 Oct 2026 after the competition submission. The public site is still online.",
    id: "Dibekukan pada 18 Okt 2026 setelah pengumpulan kompetisi. Situs publik masih online."
  },
  category: "competition",
  period: {
    en: "Sep to Oct 2026",
    id: "Sep sampai Okt 2026"
  },
  team: {
    en: "Team of 4 in the Google Cloud AI Builder Cup 2026. I wrote the engine, the API, the agent and the whole frontend; teammates led the project and wrote the first notification outbox.",
    id: "Tim 4 orang di Google Cloud AI Builder Cup 2026. Saya menulis engine, API, agen, dan seluruh frontend; rekan tim memimpin proyek dan menulis outbox notifikasi pertama."
  },
  featured: 4,
  areas: [
    {
      area: "infra",
      items: {
        en: [
          "Ran two Cloud Run services from one image, a public API and a private notification worker, in Jakarta.",
          "Set cost guardrails: scale to zero, at most 2 instances, and 20 agent runs a day counted in a Firestore transaction before any model call.",
          "Raised the worker memory from 512 MiB to 1 GiB after 17 of 144 ticks in 24 hours ran out of memory. None failed after.",
          "Built the backend pipeline: tests, image build, deploy to both services, a smoke test, and automatic rollback to the previous image. It signs in through Workload Identity Federation, with no service account keys."
        ],
        id: [
          "Menjalankan dua layanan Cloud Run dari satu image, API publik dan worker notifikasi privat, di Jakarta.",
          "Memasang pagar biaya: scale ke nol, maksimal 2 instance, dan 20 run agen per hari yang dihitung dalam transaksi Firestore sebelum panggilan model apa pun.",
          "Menaikkan memori worker dari 512 MiB ke 1 GiB setelah 17 dari 144 tick dalam 24 jam kehabisan memori. Sesudahnya tidak ada yang gagal.",
          "Membangun pipeline backend: tes, build image, deploy ke kedua layanan, smoke test, dan rollback otomatis ke image sebelumnya. Masuk lewat Workload Identity Federation, tanpa kunci service account."
        ]
      }
    },
    {
      area: "backend",
      items: {
        en: [
          "Wrote the engine that reads Himawari-9 and GK2A from open data and scores 65 regions as SAFE, WARNING, ALERT or NO_OBSERVABLE. Clouds or missing data never read as SAFE.",
          "Built the Gemini agent with Google ADK and one tool for NASA FIRMS hotspots. The backend checks its verdict against the tool results, it cannot change a status, and it has hard daily limits.",
          "Built the publish flow: an operator publishes or rejects in one transaction with an audit record. A confirmed alert that nobody decides on within 2 hours is posted automatically with a clear label.",
          "Sent alerts to Telegram through an outbox and Cloud Tasks, one job per group, so a timeout is never blindly retried."
        ],
        id: [
          "Menulis engine yang membaca Himawari-9 dan GK2A dari data terbuka dan menilai 65 region sebagai SAFE, WARNING, ALERT, atau NO_OBSERVABLE. Awan atau data hilang tidak pernah dibaca sebagai SAFE.",
          "Membangun agen Gemini dengan Google ADK dan satu alat untuk hotspot NASA FIRMS. Backend memeriksa putusannya terhadap hasil alat, agen tidak bisa mengubah status, dan ada batas harian yang keras.",
          "Membangun alur penerbitan: operator menerbitkan atau menolak dalam satu transaksi dengan catatan audit. Alert terkonfirmasi yang tidak diputuskan dalam 2 jam diterbitkan otomatis dengan label yang jelas.",
          "Mengirim peringatan ke Telegram lewat outbox dan Cloud Tasks, satu job per grup, jadi timeout tidak pernah dikirim ulang secara buta."
        ]
      }
    },
    {
      area: "frontend",
      items: {
        en: [
          "Built the whole web app in React 19 and MapLibre: a map of 65 regions, a day player, region pages with the Gemini analysis, and an operator view.",
          "Designed it mobile-first from a 360 by 640 reference screen.",
          "Moved the app to English only on 13 Oct for the competition, changing the API contract and shipping backend and frontend minutes apart.",
          "Built the frontend auto-deploy: type check, build, and a smoke test that the live bundle is the one just built."
        ],
        id: [
          "Membangun seluruh aplikasi web dengan React 19 dan MapLibre: peta 65 region, pemutar hari, halaman region dengan analisis Gemini, dan tampilan operator.",
          "Merancangnya mobile-first dari layar rujukan 360 kali 640.",
          "Memindahkan aplikasi ke bahasa Inggris saja pada 13 Okt untuk kompetisi, mengubah kontrak API dan merilis backend dan frontend berselang beberapa menit.",
          "Membangun auto-deploy frontend: type check, build, dan smoke test bahwa bundle live adalah bundle yang baru dibuild."
        ]
      }
    },
    {
      area: "security",
      items: {
        en: [
          "Verified Firebase ID tokens with a verified email and an operator role claim. Firestore rules deny direct browser access.",
          "Protected judge sign-up with reCAPTCHA Enterprise for a limited window, and kept keys out of GitHub: deploys use Workload Identity Federation, tokens sit in Secret Manager."
        ],
        id: [
          "Memverifikasi ID token Firebase dengan email terverifikasi dan klaim role operator. Aturan Firestore menolak akses langsung dari browser.",
          "Melindungi pendaftaran juri dengan reCAPTCHA Enterprise selama jendela waktu terbatas, dan menjaga kunci tetap di luar GitHub: deploy memakai Workload Identity Federation, token ada di Secret Manager."
        ]
      }
    },
    {
      area: "data",
      items: {
        en: [
          "Built the 65 regions offline from peat shapefiles of the forestry ministry.",
          "Kept a day archive with measured and computed temperature differences, so every ALERT can be explained.",
          "Checked the model against satellite fire detections on one night slot and re-scored 4,940 slots after a rule change. There is no backtest against real fires, and the README says so."
        ],
        id: [
          "Membangun 65 region secara offline dari shapefile gambut kementerian kehutanan.",
          "Menyimpan arsip hari dengan selisih suhu terukur dan terhitung, jadi setiap ALERT bisa dijelaskan.",
          "Memeriksa model terhadap deteksi api satelit pada satu slot malam dan menilai ulang 4.940 slot setelah aturan berubah. Tidak ada backtest terhadap kebakaran nyata, dan README menuliskannya."
        ]
      }
    }
  ],
  metrics: [
    {
      value: "65",
      label: {
        en: "peat regions in 11 provinces",
        id: "region gambut di 11 provinsi"
      }
    },
    {
      value: "96 to 97%",
      label: {
        en: "of backend and frontend commits are mine",
        id: "commit backend dan frontend milik saya"
      }
    },
    {
      value: "2",
      label: {
        en: "satellites, scanned every 10 minutes, scored every 15",
        id: "satelit, dipindai tiap 10 menit, dinilai tiap 15 menit"
      }
    },
    {
      value: "20",
      label: {
        en: "Gemini agent runs a day, the hard cap",
        id: "run agen Gemini per hari, batas keras"
      }
    }
  ],
  diagram: {
    src: "/work/asapify/diagram-light.webp",
    srcDark: "/work/asapify/diagram-dark.webp",
    width: 1600,
    height: 1010,
    alt: {
      en: "Architecture diagram. ASAPify on Google Cloud: satellites, scheduler, Cloud Run engine, Firestore, Gemini agent, operator review, Cloud Tasks and Telegram.",
      id: "Diagram arsitektur. ASAPify di Google Cloud: satelit, scheduler, engine Cloud Run, Firestore, agen Gemini, tinjauan operator, Cloud Tasks, dan Telegram."
    },
    caption: {
      en: "ASAPify on Google Cloud: satellites, scheduler, Cloud Run engine, Firestore, Gemini agent, operator review, Cloud Tasks and Telegram.",
      id: "ASAPify di Google Cloud: satelit, scheduler, engine Cloud Run, Firestore, agen Gemini, tinjauan operator, Cloud Tasks, dan Telegram."
    }
  },
  media: [
    {
      kind: "video",
      mp4: "/work/asapify/public-flow.mp4",
      webm: "/work/asapify/public-flow.webm",
      poster: "/work/asapify/public-flow-poster.jpg",
      width: 1280,
      height: 720,
      caption: {
        en: "Screen recording of the public site: play 23 Nov 2026 slot by slot on the map, then open a region page for its status history and the Gemini analysis. Two cuts, speed unchanged.",
        id: "Rekaman layar situs publik: memutar 23 Nov 2026 slot demi slot di peta, lalu membuka halaman region untuk riwayat status dan analisis Gemini. Dua potongan, kecepatan tidak diubah."
      },
      duration: 23
    },
    {
      kind: "image",
      src: "/work/asapify/map-desktop.webp",
      width: 1440,
      height: 900,
      alt: {
        en: "ASAPify map in desktop width with 21 regions in Alert, a legend and a timeline player at the bottom.",
        id: "Peta ASAPify lebar desktop dengan 21 region berstatus Alert, legenda, dan pemutar garis waktu di bawah."
      },
      caption: {
        en: "The public map: 65 peat regions coloured by status, Himawari-9 and GK2A footprints, VIIRS fire marks, and the day player. Archive of 23 Nov 2026, 09:10 UTC+7.",
        id: "Peta publik: 65 region gambut diwarnai menurut status, jejak Himawari-9 dan GK2A, tanda api VIIRS, dan pemutar hari. Arsip 23 Nov 2026, 09.10 WIB."
      }
    },
    {
      kind: "image",
      src: "/work/asapify/day-player.webp",
      width: 640,
      height: 122,
      alt: {
        en: "Timeline player with a play button, slot time 09:10, a day picker and a ribbon of coloured slots.",
        id: "Pemutar garis waktu dengan tombol putar, jam slot 09.10, pemilih hari, dan pita slot berwarna."
      },
      caption: {
        en: "The day player: one bar per 10 minute slot, Alert and Warning density on the top row, which satellite delivered below. Mon 23 Nov 2026.",
        id: "Pemutar hari: satu batang per slot 10 menit, kepadatan Alert dan Warning di baris atas, satelit yang mengirim di bawahnya. Senin 23 Nov 2026."
      }
    },
    {
      kind: "image",
      src: "/work/asapify/region-desktop.webp",
      width: 1440,
      height: 900,
      alt: {
        en: "Region page for R3.50S105.625E with a 24 hour chart of delta T, humidity and cloud.",
        id: "Halaman region R3.50S105.625E dengan grafik 24 jam delta T, kelembapan, dan awan."
      },
      caption: {
        en: "A region page: status, humidity, cloud, and the last 24 hours of the temperature difference against the Safe, Warning and Alert bands.",
        id: "Halaman region: status, kelembapan, awan, dan 24 jam terakhir selisih suhu terhadap pita Safe, Warning, dan Alert."
      }
    },
    {
      kind: "image",
      src: "/work/asapify/gemini-panel.webp",
      width: 555,
      height: 1678,
      alt: {
        en: "Panel with a Confirmed indication badge, three stat tiles, two satellite images mostly cloud covered, a draft alert and a hotspot table.",
        id: "Panel dengan lencana Confirmed indication, tiga kartu angka, dua citra satelit yang sebagian besar berawan, draf peringatan, dan tabel hotspot."
      },
      caption: {
        en: "The Gemini AI Analysis panel: confidence, FIRMS hotspots, NASA GIBS true and false colour images, the draft alert and the hotspots used. Confidence is the agent's own score, not a fire probability.",
        id: "Panel Gemini AI Analysis: keyakinan, hotspot FIRMS, citra NASA GIBS warna asli dan palsu, draf peringatan, dan hotspot yang dipakai. Keyakinan adalah skor agen sendiri, bukan probabilitas kebakaran."
      }
    },
    {
      kind: "image",
      src: "/work/asapify/telegram-alert.webp",
      width: 720,
      height: 1040,
      alt: {
        en: "Telegram message from the ASAPify Alerts bot reporting a confirmed thermal indication in a South Sumatra peatland region.",
        id: "Pesan Telegram dari bot ASAPify Alerts yang melaporkan indikasi termal terkonfirmasi di region gambut Sumatra Selatan."
      },
      caption: {
        en: "The alert as the Telegram group received it on 18 Oct 2026: region, hot pixel, Maps link, FIRMS count, details link and the closing line that an alert is an indication, not a confirmed fire.",
        id: "Peringatan seperti yang diterima grup Telegram pada 18 Okt 2026: region, piksel panas, tautan Maps, jumlah FIRMS, tautan detail, dan baris penutup bahwa alert adalah indikasi, bukan kebakaran terkonfirmasi."
      }
    },
    {
      kind: "image",
      src: "/work/asapify/alert-timeline.webp",
      width: 1600,
      height: 564,
      alt: {
        en: "Six step timeline with four colours for rules, AI agent, operator and automatic.",
        id: "Linimasa enam langkah dengan empat warna untuk aturan, agen AI, operator, dan otomatis."
      },
      caption: {
        en: "Who decides, and when: scan, status in 20 to 30 minutes, Gemini agent in the same tick, operator publish or reject, automatic post of a confirmed alert after 2 hours, publishing closes after 12 hours.",
        id: "Siapa memutuskan dan kapan: pindai, status dalam 20 sampai 30 menit, agen Gemini pada tick yang sama, operator terbitkan atau tolak, posting otomatis alert terkonfirmasi setelah 2 jam, penerbitan ditutup setelah 12 jam."
      }
    },
    {
      kind: "image",
      src: "/work/asapify/map-mobile.webp",
      width: 780,
      height: 1688,
      alt: {
        en: "ASAPify on a 390 px phone: legend and map on top, bottom sheet with status counts and region list.",
        id: "ASAPify di ponsel 390 px: legenda dan peta di atas, lembar bawah berisi hitungan status dan daftar region."
      },
      caption: {
        en: "The same map on a phone, status counts and region list in a bottom sheet. Live latest slot, 24 Nov 2026.",
        id: "Peta yang sama di ponsel, hitungan status dan daftar region di lembar bawah. Slot terbaru live, 24 Nov 2026."
      }
    }
  ]
};

# Rencana Portfolio v2: bukti kerja per project

Tanggal: 2026-11-24. Status: **disetujui lewat grill, belum dieksekusi.**
Basis: `main` setelah PR #3 (Next.js static export, gaya kontur/survey, EN `/` + ID `/id/`).

## Tujuan

Setiap project menjelaskan secara padat dan lengkap apa yang dikerjakan, beserta bukti hasilnya: diagram arsitektur, screenshot, video capture fitur, dan dokumen. Recruiter (SRE/DevOps + fullstack) harus bisa menangkap peran, skala, dan bukti dalam ±3 menit per project.

## Keputusan terkunci (grill 2026-11-24)

| # | Keputusan |
|---|---|
| D1 | Project yang masuk: **EDUNUSA (diperbarui, fitur baru termasuk absen wajah di repo presensi)**, **SobatPart (KMT)**, **Istana Block**, **ASAPify**, **DKN**, **MGMP**, **Zaina Shop**. Instrumeta dan Heliyon tetap ada. Tandahari dan my-finance tidak masuk. |
| D2 | Nama klien, perusahaan, dan modul **boleh** disebut, termasuk modul internal EDUNUSA (TROOPS, PENSIL, SSO). Aturan Juli 2026 dicabut. **Data asli wajib disensor.** |
| D3 | Peran di ASAPify: **lead/arsitektur, ditambah kerja lintas BE/FE/infra.** |
| D4 | Bukti yang belum ada **dibuat oleh agen**: diagram baru, screenshot, dan video fitur. |
| D5 | Screenshot dan video aplikasi internal diambil dari **app yang dijalankan di lokal dengan data seed atau dummy**. Data produksi tidak boleh disentuh. Halaman publik boleh di-capture dari URL live. |
| D6 | Project unggulan di home (berurutan): **EDUNUSA, SobatPart, Istana Block, ASAPify**. Sisanya ada di indeks `/work/`. |
| D7 | Kedalaman: **padat, 1 halaman per project** (±3 menit baca). |
| D8 | Voice "chef/dapur" tetap dipakai, tanpa em dash. Gaya visual mengikuti v1: kontur, satu aksen oranye, radius 4px. |

## Template case study (seragam)

1. **Header**: nama project, satu kalimat masalah dan solusi, dan **badge status yang jujur**: `Live`, `Development`, `Frozen`, atau `Internal`.
2. **Fakta singkat**: peran, periode, tim, stack inti, tautan (live, repo publik bila ada).
3. **Yang saya kerjakan**, dikelompokkan per area (Infra, CI/CD, Backend, Frontend, Keamanan, Data). Setiap bullet berupa kata kerja, hasil, lalu angka.
4. **Arsitektur**: 1 diagram utama (SVG/PNG) dan keterangan alurnya.
5. **Bukti**: galeri screenshot (lightbox), 1–3 video fitur pendek (10–25 dtk, muted, poster, `preload="none"`), dan tautan dokumen (PDF/HTML yang sudah disensor).
6. **Hasil dan angka**: hanya angka yang tertulis di repo, dokumen, atau vault.
7. **Stack**: chip, dikelompokkan.
8. Navigasi ke project berikut.

Setiap klaim punya sumber (path file, commit, atau zettel) di lembar fakta. Lembar fakta tidak dipublikasikan.

## Inventaris bukti dan celah

| Project | Bukti yang sudah ada | Perlu dibuat |
|---|---|---|
| EDUNUSA | `arsitektur-edunusa/index.html`, `ARCHITECTURE/edunusa-architecture*.html` + preview PNG, BE/DB/FE-ARCHITECTURE.md | Screenshot dan video fitur baru: **absen wajah (presensi-fe)**, perpustakaan SLiMS, dan dashboard TROOPS. Diagram diperbarui (konsolidasi 13 BE jadi 3 repo, Kong, Vault) |
| SobatPart | `ARCHITECTURE/sobatpart-architecture.html`, panduan deploy k8s, ringkasan cluster, brand kit v2.1, mockup Figma | Screenshot marketplace, ops, dan vendor (lokal + seed), video alur pesanan, diagram cluster yang sudah disensor (IP dan kunci WireGuard dihapus) |
| Istana Block | 50 screenshot webp, `05-media/brag.mp4` + vertikal, demo peta ke 3D (mp4/webm), PDF infra Cloudflare | **Diagram arsitektur** (Workers/OpenNext/D1/R2), video kalkulator pola paving (live), screenshot admin ulang bila datanya asli |
| ASAPify | `ASAPify_demo_v3.mp4` (27 MB, perlu dipotong dan dikompres), 7 diagram PNG, pitch PDF, foto alert Telegram | Potongan video fitur 15–25 dtk, sensor token dan chat ID di semua gambar |
| DKN | `docs/diagrams/*.html`, 13 flowchart SVG, proses bisnis semua role | Screenshot web klinik (lokal + seed), ekspor diagram arsitektur ke SVG/PNG |
| MGMP | 6 dokumen arsitektur (md), 6 workflow CI/CD | **Diagram baru**, screenshot dan video PWA mobile (lokal + seed, bukan CSV guru asli) |
| Zaina Shop | DEPLOYMENT/OPERATIONS/BACKUP.md, brand guideline HTML | **Diagram baru**, screenshot dan video PWA inventaris (lokal + seed) |

## Daftar blokir (tidak boleh masuk ke `public/` maupun git)

- Istana: `akun-*.local.json`, `03-backup-d1/*.sql`, `live-app-data-*.sql`, PDF panduan INTERNAL, screenshot DNS, ID akun dan ID D1 Cloudflare.
- SobatPart: IP VPS dan public key WireGuard di `kubernetes-cluster-setup-summary.md`, `01 - Legal & Perusahaan/`, dokumen bank, NIB.
- MGMP: `data/*.csv` (biodata dan akun guru), `server/uploads/`, SQL migrasi berisi data.
- ASAPify: semua zip, `.venv`, token bot Telegram dan chat ID, data audit Firestore, PDF pihak ketiga (`sofan2019_copy.pdf`).
- DKN: `_archive/`, `DKN.zip`, dump DB, `ops/postgres`.
- EDUNUSA: semua `.env*`, `keys/*.pem`, `credentials.ts`, strategi harga dan audit keamanan di `_assets/`.
- Umum: path lokal (`C:\Users\...`), email atau nomor HP orang lain, wajah orang lain selain pemilik (absen wajah memakai wajah pemilik atau wajah sintetis).

Gerbang otomatis sebelum PR: grep `public/` dan `content/` untuk pola IP, token, email, dan `.env`. Gambar dan video diperiksa manual per file.

## Fase kerja

Mandor (Opus) bertugas membuat brief, mengoordinasikan, dan memverifikasi. Eksekusi dikerjakan subagent `model: sonnet`. Branch baru dari `main`: `feat/portfolio-v2`.

| Fase | Isi | Verifikasi |
|---|---|---|
| **F0 Fondasi** | Perluas skema `content/projects.ts`: status, periode, peran, `areas[]`, `metrics[]`, `media[]` (image/video/doc + poster + caption), `diagram`. Siapkan pipeline aset (sharp ke webp, ffmpeg ke mp4/webm + poster), skrip gerbang blokir, dan anggaran ukuran (gambar ≤250 KB, video ≤4 MB, total aset ≤60 MB). | `tsc` dan build lolos, skrip gerbang jalan |
| **F1 Lembar fakta** | Satu subagent per project membaca repo dan zettel vault, lalu menulis lembar fakta bersumber (peran, kerja per area, angka, status). | **Kamu review dan setujui fakta** sebelum copy ditulis |
| **F2 Bukti** | Diagram baru dengan gaya kontur yang seragam. App dijalankan lokal dengan seed, lalu screenshot dan video Playwright diambil. Aset lama dipotong, dikompres, dan disensor. | Setiap aset dicek manual, gerbang blokir lolos |
| **F3 Halaman** | Template `WorkPage` v2 (galeri, video, diagram, status), indeks `/work/` dengan filter (Klien, Produk, Kompetisi, Personal), 4 project unggulan di home, copy EN + ID, JSON-LD per project, sitemap. | Build, browser desktop + 375px, light + dark, tanpa overflow |
| **F4 QA** | Lighthouse (perf/SEO/a11y), cek tautan, ukuran aset, hreflang, gerbang blokir final. | Skor dan angka dilaporkan |
| **F5 PR** | Commit per fase, PR ke `main`, cek preview Vercel (share link). | CI dan preview |

Urutan per project: EDUNUSA, SobatPart, Istana, ASAPify, DKN, MGMP, Zaina.

## Risiko

- **Menjalankan app lokal**: WSL tidak punya node, jadi beberapa app butuh Postgres atau Docker. Kalau satu app gagal dijalankan, fallback ke halaman mock statis dari komponen asli dan beri label "tampilan antarmuka" di caption. Kegagalan dilaporkan, tidak disembunyikan.
- **Repo portfolio bersifat publik**: semua yang masuk `public/` ikut terbit. Gerbang blokir wajib dijalankan.
- **Status jujur**: badge mengikuti keputusan F1 di bawah. Fitur yang belum aktif (misalnya checkout SobatPart, absen wajah EDUNUSA) diberi label sendiri.
- **Kredit individu**: sebagian besar dokumen tidak menyebut penulisnya. F1 memeriksa `git log --author` sebelum menulis klaim "saya".

## Keputusan F1 (2026-11-24, setelah review lembar fakta)

Lembar fakta ada di `docs/facts/<slug>.md` (gitignored). Keputusan di bawah ini menimpa bagian rencana di atas bila bertentangan.

| # | Keputusan |
|---|---|
| F1-1 | **Badge status**: SobatPart `Live (soft launch)` sejak 31 Okt 2026 (login, checkout, dan pengiriman belum aktif di production). Istana `Live`. ASAPify `Frozen` (18 Okt 2026). DKN `Development` (hanya tenant demo). MGMP `Development`. Zaina `Live` (pages.dev, dipakai toko). |
| F1-2 | **Absen wajah EDUNUSA**: ditulis sebagai fitur tim (status pilot di balik flag). Kontribusi pemilik: **merancang arsitektur dan alurnya**, serta **deploy, CI, dan rollout feature flag**. Kode milik rekan. Jangan pakai kata "liveness" atau "anti-spoof" (tidak ada di kode). Demo memakai harness Playwright (kamera palsu, siswa fiktif), diberi caption "tampilan antarmuka, data fiktif". |
| F1-3 | **EDUNUSA**: hapus "10+ lembaga" dan "5000+ pengguna" (tidak bersumber). Ganti "Linux VPS" menjadi Proxmox VM + Docker single-host. Klaim "saya" hanya untuk karya terbukti: pipeline-templates, authentic-ui, PENSIL FE, landing page, TROOPS FE, apps-be, sebagian Kong. SSO, perpustakaan SLiMS, dan restrukturisasi database ditulis sebagai kerja tim. Item draf (secrets-gateway, Vault OIDC, worker Go) tidak diklaim sebagai fitur yang sudah rilis. |
| F1-4 | **ASAPify**: peran ditulis **Frontend Engineer, sekaligus penulis utama kode** (96–97% commit BE dan FE, termasuk engine, API, dan deploy GCP). Video v3 tidak dipakai untuk klip fitur (masih tahap mock). Rekam ulang atau capture dari URL live atau worktree mock. |
| F1-5 | **DKN** masuk sebagai **kartu project tim di `/work/`**, tanpa case study penuh. Klaim pemilik: fondasi (arsitektur, ADR, scaffold, auth, isolasi tenant RLS, ±100 layar). |
| F1-6 | **Istana**: akun `Istana Block IT` bukan milik pemilik. App ops lama ditulis sebagai kerja pihak lain. Klaim hanya `istana-block-web` (94% commit). |
| F1-7 | **Kredit AI**: disebut terang-terangan sebagai cara kerja, dalam satu kalimat di About dan di case study yang relevan: pemilik mengarahkan dan memverifikasi agen AI. |

Temuan keamanan di luar portfolio (dilaporkan ke pemilik, tidak diperbaiki di sini):
- `PRIVATE/MGMP/swt-mgmppai-kapuas-fs/wrangler.toml` berisi `JWT_SECRET`, belum di-commit dan tidak ada di `.gitignore`.
- Next.js 16.4.3 di portfolio punya kerentanan keamanan yang sudah diketahui, menurut peringatan saat build. Upgrade perlu diputuskan terpisah.

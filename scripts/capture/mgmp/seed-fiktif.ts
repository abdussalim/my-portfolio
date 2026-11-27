// Fictional seed for the MGMP capture run. NOT part of the MGMP repo.
// Copy into <worktree>/server/prisma/seeds/ and run:
//   tsx --env-file=.env prisma/seeds/seed-fiktif.ts
// Needs SEED_ADMIN_PW and SEED_GURU_PW in the environment (locally generated, never committed).
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import fs from "node:fs"
import path from "node:path"
import { randomUUID } from "node:crypto"

const prisma = new PrismaClient()
const adminPw = process.env.SEED_ADMIN_PW
const guruPw = process.env.SEED_GURU_PW
if (!adminPw || !guruPw) throw new Error("SEED_ADMIN_PW / SEED_GURU_PW required")

const uploads = path.resolve("uploads")
function dummyFile(domain: string, ext: string, text: string) {
  const rel = `${domain}/${randomUUID()}${ext}`
  const abs = path.join(uploads, rel)
  fs.mkdirSync(path.dirname(abs), { recursive: true })
  fs.writeFileSync(abs, text)
  return { rel, size: BigInt(Buffer.byteLength(text)) }
}
const day = (offset: number) => {
  const d = new Date(Date.UTC(2026, 10, 24))
  d.setUTCDate(d.getUTCDate() + offset)
  return d
}

async function main() {
  await prisma.role.upsert({ where: { id: 1 }, update: {}, create: { id: 1, name: "admin", code: "admin", description: "Pengurus MGMP" } })
  await prisma.role.upsert({ where: { id: 2 }, update: {}, create: { id: 2, name: "guru", code: "guru", description: "Anggota guru MGMP" } })
  await prisma.organisasi.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, nama: "MGMP PAI Contoh", kabupaten: "Contoh", provinsi: "Provinsi Contoh" },
  })

  const admin = await prisma.user.create({
    data: { username: "admin.contoh", password: await bcrypt.hash(adminPw!, 10), name: "Pengurus Contoh", role_id: 1 },
  })

  const names = [
    ["Ahmad Contoh Satu", "SMAN 1 Contoh"], ["Siti Contoh Dua", "SMAN 2 Contoh"], ["Budi Contoh Tiga", "SMKN 1 Contoh"],
    ["Dewi Contoh Empat", "SMAN 3 Contoh"], ["Rahmat Contoh Lima", "SMKN 2 Contoh"], ["Nur Contoh Enam", "SMAS Harapan Contoh"],
    ["Fajar Contoh Tujuh", "SMAN 1 Contoh"], ["Lina Contoh Delapan", "SMAN 4 Contoh"], ["Hasan Contoh Sembilan", "SMKN 3 Contoh"],
    ["Mira Contoh Sepuluh", "SMAN 2 Contoh"], ["Yusuf Contoh Sebelas", "SMAS Harapan Contoh"], ["Rina Contoh Dua Belas", "SMAN 5 Contoh"],
  ]
  const gurus: { id: string; nama: string }[] = []
  for (let i = 0; i < names.length; i++) {
    const [nama, sekolah] = names[i]
    let userId: string | undefined
    if (i === 0) {
      const u = await prisma.user.create({
        data: { username: "guru.contoh", password: await bcrypt.hash(guruPw!, 10), name: nama, role_id: 2 },
      })
      userId = u.id
    }
    const g = await prisma.guru.create({
      data: {
        nama_lengkap: nama, asal_sekolah: sekolah, phone: `0800-0000-${String(i + 1).padStart(4, "0")}`,
        nip: i % 3 === 0 ? null : `0000000000${String(i + 1).padStart(8, "0")}`,
        status: i === 8 ? "tidak_aktif" : "aktif", user_id: userId,
      },
    })
    gurus.push({ id: g.id, nama })
  }

  const tx: [string, "pemasukan" | "pengeluaran", number, number][] = [
    ["Iuran anggota bulan ini", "pemasukan", 1800000, -3], ["Konsumsi rapat koordinasi", "pengeluaran", 450000, -5],
    ["Iuran anggota bulan lalu", "pemasukan", 1650000, -33], ["Cetak modul pelatihan", "pengeluaran", 600000, -40],
    ["Dana kegiatan pelatihan", "pemasukan", 2500000, -50], ["Sewa tempat workshop", "pengeluaran", 900000, -55],
    ["Iuran anggota dua bulan lalu", "pemasukan", 1700000, -63], ["Honor narasumber", "pengeluaran", 750000, -70],
    ["Iuran anggota tiga bulan lalu", "pemasukan", 1750000, -93], ["ATK sekretariat", "pengeluaran", 220000, -100],
    ["Sumbangan sukarela", "pemasukan", 500000, -110], ["Konsumsi pertemuan bulanan", "pengeluaran", 380000, -122],
    ["Iuran anggota empat bulan lalu", "pemasukan", 1600000, -125], ["Transport peserta lomba", "pengeluaran", 1100000, -135],
    ["Iuran anggota lima bulan lalu", "pemasukan", 1650000, -155], ["Cetak sertifikat", "pengeluaran", 300000, -160],
    ["Dana kegiatan Maulid", "pemasukan", 2000000, -170], ["Dekorasi kegiatan Maulid", "pengeluaran", 850000, -172],
  ]
  for (const [ket, tipe, jumlah, off] of tx)
    await prisma.transaksi.create({ data: { tipe, jumlah, keterangan: ket, tanggal: day(off), created_by: admin.id } })

  const acara: [string, number][] = [["Rapat Koordinasi Bulanan", -4], ["Workshop Penyusunan Modul", -18], ["Pelatihan Asesmen", -32]]
  const statuses = ["hadir", "hadir", "hadir", "izin", "hadir", "tidak_hadir"] as const
  for (const [nama, off] of acara)
    for (const [i, g] of gurus.slice(0, 10).entries())
      await prisma.kehadiran.create({
        data: { nama_acara: nama, nama_peserta: g.nama, tanggal: day(off), status: statuses[(i + Math.abs(off)) % statuses.length], created_by: admin.id },
      })

  const docs = ["Notulen Rapat Koordinasi", "Program Kerja Tahunan", "Daftar Hadir Workshop"]
  for (const d of docs) {
    const f = dummyFile("dokumen", ".txt", `Dokumen fiktif: ${d}\n`)
    await prisma.dokumen.create({ data: { nama_dokumen: d, file_name: `${d.toLowerCase().replace(/ /g, "-")}.txt`, file_path: f.rel, file_size: f.size, file_mime: "text/plain", uploaded_by: admin.id } })
  }
  const soal: [string, "kelas_10" | "kelas_11" | "kelas_12"][] = [
    ["Soal Penilaian Tengah Semester", "kelas_10"], ["Soal Latihan Bab Akhlak", "kelas_11"], ["Soal Persiapan Ujian Akhir", "kelas_12"], ["Soal Kuis Harian", "kelas_10"],
  ]
  for (const [judul, kelas] of soal) {
    const f = dummyFile("bank-soal", ".pdf", `%PDF-1.4 fiktif ${judul}\n`)
    await prisma.bank_soal.create({ data: { judul, kelas, file_name: `${judul.toLowerCase().replace(/ /g, "-")}.pdf`, file_path: f.rel, file_size: f.size, file_mime: "application/pdf", uploaded_by: admin.id } })
  }
  console.log("seed fiktif done")
}
main().finally(() => prisma.$disconnect())

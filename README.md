# ⚡ Dwi Dhasa - Website Resmi XII.2

Selamat datang di repositori **Dwi Dhasa (XII.2)**! Ini adalah platform web modern kelas XII.2 yang dirancang dengan estetika **Neobrutalisme** yang berani, dinamis, dan premium. Dilengkapi dengan asisten pintar DhasaBot, integrasi autentikasi, serta animasi atmosferik interaktif.

---

## 🎨 Karakteristik Desain (Neobrutalism)
Website ini mengusung tema **Neobrutalism UI** dengan karakteristik:
- Batas garis hitam tebal (`border-4` & `border-8`) yang tegas.
- Bayangan datar kontras tinggi (`shadow-brutalist`).
- Palet warna pastel yang cerah dan hidup (`brutalist-lime`, `brutalist-yellow`, `brutalist-pink`, `brutalist-blue`, `brutalist-purple`).
- Tipografi huruf besar tebal (*bold uppercase*) untuk kesan yang kuat dan modern.
- Transisi interaktif yang responsif dan micro-animations di setiap elemen.

---

## 🚀 Fitur Utama

### 🧑‍🎓 1. Direktori & Detail Bio Siswa
- Menampilkan seluruh siswa-siswi kelas XII.2 dengan kartu berbayang brutalist.
- Hover interaktif yang mengubah foto dari hitam-putih (*grayscale*) menjadi berwarna penuh.
- Indikator interaktif **"LIHAT DETAIL →"** yang berkedip lembut saat diarahkan.
- **Modal Profil Premium**: Menampilkan biodata lengkap termasuk Tempat Tanggal Lahir (TTL), kutipan hidup (*quote*), foto berwarna penuh, dan tombol media sosial (Instagram & TikTok) berdesain neobrutalis.

### ☁️ 2. Seksi Kutipan Atmosferik (Cloudy Quotes)
- Seksi khusus dengan gradien langit yang dinamis dan beranimasi.
- **Efek Partikel Atmosfer**: Partikel halus bercahaya yang melayang perlahan ke atas.
- **Efek Awan Berjatuhan**: Awan putih dekoratif yang meluncur turun dari atas layar dengan ukuran dan kecepatan acak.
- **Kartu Melayang (Floating Cards)**: Kartu kutipan siswa yang melayang naik-turun dengan rotasi sudut acak.
- **Tombol Pengacak (Shuffle)**: Memuat kombinasi 8 kutipan baru secara acak secara instan dengan transisi halus.

### 🤖 3. DhasaBot (AI Chat Assistant)
- Bot asisten cerdas khusus kelas XII.2 yang siap membantu menjawab pertanyaan seputar jadwal piket, jadwal pelajaran, guru, hingga data siswa.

### 📅 4. Informasi Akademik Lengkap
- **Wali Kelas**: Profil guru penanggung jawab kelas.
- **Struktur Organisasi**: Bagan kepengurusan kelas XII.2 yang terstruktur secara brutalist.
- **Jadwal Pelajaran**: Tampilan jadwal mata pelajaran mingguan.
- **Jadwal Piket**: Daftar pembagian regu piket kebersihan kelas.
- **Galeri Kelas**: Kumpulan dokumentasi foto kebersamaan kelas XII.2.

### 🔒 5. Sistem Autentikasi
- Halaman Login dan Register terintegrasi Firebase Auth (Mendukung Login Email/Sandi, Google, dan GitHub OAuth).

---

## 🛠️ Tech Stack

- **Framework Utama**: [React](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (menggunakan palet warna kustom & shadow brutalist)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend / Auth**: [Firebase](https://firebase.google.com/) & [Supabase](https://supabase.com/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)

---

## 📁 Struktur Proyek

```bash
dwidhasa/
├── src/
│   ├── components/       # Komponen UI utama (Hero, DaftarSiswa, FloatingQuotes, dll.)
│   ├── contexts/         # Manajemen State Global (AuthContext)
│   ├── data/             # Database lokal berbentuk JSON (siswa, jadwal, galeri)
│   │   ├── siswa.json    # Database utama profil 36 siswa
│   │   ├── jadwal.json   # Data jadwal pelajaran
│   │   └── piket.json    # Data pembagian piket harian
│   ├── firebase.ts       # Konfigurasi koneksi Firebase SDK
│   ├── App.tsx           # Entry point tata letak komponen halaman utama
│   ├── main.tsx          # Render React DOM dan Router wrapper
│   └── index.css         # Styling global & pola dot grid brutalist
├── tailwind.config.js    # Konfigurasi token warna brutalist & animasi kustom
└── vite.config.ts        # Bundler configuration
```

---

## 💻 Cara Menjalankan Project Secara Lokal

### Prasyarat
Pastikan Anda sudah menginstal **Node.js** di komputer Anda.

### 1. Clone & Masuk ke Folder Project
```bash
git clone <repository-url>
cd dwidhasa
```

### 2. Instal Dependensi
```bash
npm install
```

### 3. Jalankan Mode Development
```bash
npm run dev
```
Buka [http://localhost:5173](http://localhost:5173) di browser Anda untuk melihat hasilnya.

### 4. Build untuk Production
```bash
npm run build
```
Hasil build akan berada di folder `/dist` siap dideploy ke Firebase Hosting, Vercel, atau Netlify.

---

## 📝 Kontributor
Dibuat dengan 💻 dan ☕ oleh tim **XII.2**. Seluruh hak cipta dilindungi.

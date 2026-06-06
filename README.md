# ⚡ Dwi Dhasa - Website Resmi XII.2

Selamat datang di repositori **Dwi Dhasa (XII.2)**. Ini adalah platform web modern kelas XII.2 yang dirancang secara profesional dengan estetika **Neobrutalisme** yang berani, dinamis, dan premium. Website ini dilengkapi dengan arsitektur multi-halaman, asisten cerdas berbasis AI (LLaMA 70B), serta berbagai fitur interaktif kelas.

---

## 🎨 Karakteristik Desain (Neobrutalism)
Website ini mengusung tema **Neobrutalism UI** dengan karakteristik:
- Batas garis hitam tebal (`border-4` & `border-8`) yang tegas.
- Bayangan datar kontras tinggi (`shadow-brutalist`).
- Palet warna yang cerah dan hidup dipadukan dengan tipografi *bold uppercase* untuk kesan yang kuat dan modern.
- Transisi interaktif yang responsif dan micro-animations di setiap elemen.
- Mendukung fitur **Dark Mode** secara dinamis.

---

## 🚀 Fitur Utama

### 🤖 1. DhasaBot AI (Chat Assistant LLaMA 70B)
- Asisten virtual cerdas bertenaga **LLaMA 70B** via Groq API.
- Halaman obrolan (*chat*) mandiri bergaya profesional dengan UI/UX yang responsif.
- Memiliki *personality* khusus sebagai asisten kelas XII.2 untuk menjawab berbagai pertanyaan dan berinteraksi dengan siswa.

### 🧑‍🎓 2. Direktori & Detail Bio Siswa
- Menampilkan profil seluruh siswa-siswi kelas XII.2.
- **Modal Profil Premium**: Menampilkan biodata lengkap termasuk Tempat Tanggal Lahir (TTL), kutipan hidup (*quote*), dan koneksi media sosial (Instagram & TikTok).

### 🎮 3. Zona Permainan & Penghargaan (Interactive Pages)
- **Halaman Permainan (`/permainan`)**: Menyajikan fitur hiburan kelas seperti "Siapa Aku?" (Kuis tebak siswa), Pengacak Siswa (Random Picker), dan "Most Likely To" dengan sistem *voting* Realtime (Supabase).
- **Halaman Penghargaan (`/penghargaan`)**: Menampilkan daftar "Class Awards" yang dimenangkan oleh siswa-siswi kelas XII.2.

### ☁️ 4. Seksi Kutipan Atmosferik (Cloudy Quotes)
- Seksi khusus dengan efek partikel atmosfer dan awan berjatuhan.
- Menampilkan kartu kutipan siswa yang melayang secara acak dengan fitur *shuffle* interaktif.

### 📅 5. Informasi Akademik Terintegrasi
- **Struktur Organisasi & Wali Kelas**: Menampilkan bagan kepengurusan kelas secara interaktif.
- **Jadwal Pelajaran & Piket**: Menampilkan data jadwal mingguan yang mudah diakses.
- **Status Bar Real-time**: Indikator presensi bawah yang menampilkan jam real-time, tanggal, dan simulasi pengunjung aktif.

### 🔒 6. Sistem Autentikasi & Database
- Terintegrasi dengan **Firebase Auth** (Login Email/Google/GitHub) dan **Supabase** (Database Relasional & Realtime Voting).

---

## 🛠️ Tech Stack

- **Frontend**: [React](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/) (Multi-page Architecture)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (dengan palet warna neobrutalist)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend / Database**: [Supabase](https://supabase.com/) & [Firebase](https://firebase.google.com/)
- **AI Integration**: [Groq API](https://groq.com/) (LLaMA-3-70b-8192)

---

---

## 💻 Cara Menjalankan Project Secara Lokal

### Prasyarat
Pastikan Anda sudah menginstal **Node.js** di komputer Anda.

### 1. Instal Dependensi
Buka terminal di dalam folder project ini, lalu jalankan:
```bash
npm install
```

### 2. Konfigurasi Environment Variables
Pastikan file `.env` sudah diisi dengan kredensial API (Supabase & Groq).

### 3. Jalankan Mode Development
```bash
npm run dev
```
Buka `http://localhost:5173` di browser Anda untuk melihat hasilnya.

---

## 📝 Hak Cipta & Lisensi
Dibuat oleh **Tim IT DwiDhasa (XII.2)**. 

Project ini bersifat tertutup (Private Repository) dan dilindungi oleh Hak Cipta Internasional di bawah lisensi *All Rights Reserved*. Segala bentuk penyalinan, modifikasi, atau distribusi ulang dari kode sumber ini tanpa izin tertulis yang sah adalah dilarang keras secara hukum. 

Silakan lihat file [LICENSE](./LICENSE) untuk detail hukum selengkapnya.

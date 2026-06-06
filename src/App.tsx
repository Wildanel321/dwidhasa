import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { WaliKelas } from './components/WaliKelas';
import { StrukturKelas } from './components/StrukturKelas';
import { DaftarSiswa } from './components/DaftarSiswa';
import { JadwalPelajaran } from './components/JadwalPelajaran';
import { JadwalPiket } from './components/JadwalPiket';
import { Galeri } from './components/Galeri';
import { FloatingQuotes } from './components/FloatingQuotes';
import { Footer } from './components/Footer';
import { DarkModeToggle } from './components/DarkModeToggle';
import { DhasaBot } from './components/DhasaBot';
import { Toast } from './components/Toast';
import { SplashScreen } from './components/SplashScreen';
import { CountdownKelulusan } from './components/CountdownKelulusan';
import { StatistikKelas } from './components/StatistikKelas';
import { ClassAwards } from './components/ClassAwards';
import { BukuKenangan } from './components/BukuKenangan';
import { SiapaAkuQuiz } from './components/SiapaAkuQuiz';
import { RandomSiswa } from './components/RandomSiswa';
import { MostLikelyTo } from './components/MostLikelyTo';
import siswaData from './data/siswa.json';
import galeriData from './data/galeri.json';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Preload all image assets during the splash screen to avoid render delays on Android
  useEffect(() => {
    // 1. Preload splash screen image first
    const splashImg = new Image();
    splashImg.src = 'https://i.ibb.co/SYQFVVh/ali.jpg';

    // 2. Preload student profile photos
    siswaData.forEach((siswa) => {
      if (siswa.fotoUrl) {
        const img = new Image();
        img.src = siswa.fotoUrl;
      }
    });

    // 3. Preload gallery photos
    galeriData.forEach((item) => {
      if (item.fotoUrl) {
        const img = new Image();
        img.src = item.fotoUrl;
      }
    });
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-100 transition-colors duration-500">
      <Toast />
      <DarkModeToggle />
      <DhasaBot />

      {/* ── Core Sections ── */}
      <Hero />
      <WaliKelas />
      <StrukturKelas />
      <DaftarSiswa />

      {/* ── Celebration ── */}
      <CountdownKelulusan />

      {/* ── Data & Fun ── */}
      <StatistikKelas />
      <JadwalPelajaran />
      <JadwalPiket />
      <Galeri />

      {/* ── Interactive ── */}
      <FloatingQuotes />
      <RandomSiswa />
      <SiapaAkuQuiz />
      <MostLikelyTo />
      <ClassAwards />

      {/* ── Social ── */}
      <BukuKenangan />

      <Footer />
    </div>
  );
}

export default App;

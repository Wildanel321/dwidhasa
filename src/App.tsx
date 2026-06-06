import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { DarkModeToggle } from './components/DarkModeToggle';
import { DhasaBot } from './components/DhasaBot';
import { Toast } from './components/Toast';
import { SplashScreen } from './components/SplashScreen';
import { HomePage } from './pages/HomePage';
import { PermainanPage } from './pages/PermainanPage';
import { PenghargaanPage } from './pages/PenghargaanPage';
import { ChatPage } from './pages/ChatPage';
import siswaData from './data/siswa.json';
import galeriData from './data/galeri.json';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Preload all image assets during the splash screen
  useEffect(() => {
    const splashImg = new Image();
    splashImg.src = 'https://i.ibb.co/SYQFVVh/ali.jpg';

    siswaData.forEach((siswa) => {
      if (siswa.fotoUrl) {
        const img = new Image();
        img.src = siswa.fotoUrl;
      }
    });

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
      <ScrollToTop />
      <Toast />
      <DarkModeToggle />
      <DhasaBot />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/permainan" element={<PermainanPage />} />
        <Route path="/penghargaan" element={<PenghargaanPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;

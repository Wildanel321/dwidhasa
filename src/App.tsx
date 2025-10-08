import { Hero } from './components/Hero';
import { WaliKelas } from './components/WaliKelas';
import { StrukturKelas } from './components/StrukturKelas';
import { DaftarSiswa } from './components/DaftarSiswa';
import { JadwalPelajaran } from './components/JadwalPelajaran';
import { JadwalPiket } from './components/JadwalPiket';
import { Galeri } from './components/Galeri';
import { Footer } from './components/Footer';
import { DarkModeToggle } from './components/DarkModeToggle';
import { DhasaBot } from './components/DhasaBot';
import { Toast } from './components/Toast';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-100 transition-colors duration-500">
      <Toast />
      <DarkModeToggle />
      <DhasaBot />

      <Hero />
      <WaliKelas />
      <StrukturKelas />
      <DaftarSiswa />
      <JadwalPelajaran />
      <JadwalPiket />
      <Galeri />
      <Footer />
    </div>
  );
}

export default App;

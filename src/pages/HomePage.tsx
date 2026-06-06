import { Hero } from '../components/Hero';
import { WaliKelas } from '../components/WaliKelas';
import { StrukturKelas } from '../components/StrukturKelas';
import { DaftarSiswa } from '../components/DaftarSiswa';
import { JadwalPelajaran } from '../components/JadwalPelajaran';
import { JadwalPiket } from '../components/JadwalPiket';
import { Galeri } from '../components/Galeri';
import { CountdownKelulusan } from '../components/CountdownKelulusan';
import { BukuKenangan } from '../components/BukuKenangan';
import { Footer } from '../components/Footer';
import { StatusBar } from '../components/StatusBar';

export function HomePage() {
  return (
    <>
      <Hero />
      <WaliKelas />
      <StrukturKelas />
      <DaftarSiswa />
      <CountdownKelulusan />
      <JadwalPelajaran />
      <JadwalPiket />
      <Galeri />
      <BukuKenangan />
      <Footer />
      <StatusBar />
    </>
  );
}

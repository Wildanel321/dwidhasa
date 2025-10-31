import { Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
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
import { Login } from './components/Login';
import { Register } from './components/Register';
import { AdminDashboard } from './components/AdminDashboard';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Check if user is admin (you can modify this logic based on your admin criteria)
  const isAdmin = user?.email === 'admin@lifewildsmp.my.id' || user?.email?.endsWith('@lifewildsmp.my.id');

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Hero />} />
      <Route path="*" element={
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
      } />
    </Routes>
  );

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

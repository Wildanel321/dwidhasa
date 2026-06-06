import { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

export function StatusBar() {
  const [time, setTime] = useState(new Date());
  // Untuk awal, kita set jumlah pengunjung statis atau random kecil.
  // Jika ingin real-time dengan database, bisa dihubungkan ke Supabase nanti.
  const [visitors, setVisitors] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Kadang nambah pengunjung secara random agar terlihat hidup (simulasi)
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitors((prev) => prev + (Math.random() > 0.7 ? 1 : 0));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (d: Date) => {
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    return `${hh}.${mm}.${ss}`;
  };

  const formatDate = (d: Date) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-3xl transition-all duration-500">
      <div className="bg-[#0A1428] rounded-full p-2 pl-2 pr-3 sm:pr-4 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.4)] border border-blue-900/30">
        
        {/* Kiri: Waktu & Tanggal */}
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="bg-[#040B16] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-black text-lg sm:text-xl tracking-widest font-sans shadow-inner">
            {formatTime(time)}
          </div>
          <div className="text-slate-200 font-medium text-xs sm:text-sm tracking-wide hidden sm:block">
            {formatDate(time)}
          </div>
        </div>

        {/* Kanan: Pengunjung */}
        <div className="bg-[#b88645] text-[#1a1309] px-3 sm:px-5 py-2 sm:py-2.5 rounded-full flex items-center gap-2 font-bold text-xs sm:text-sm tracking-wide shadow-md hover:bg-[#cfa05d] transition-colors cursor-default">
          <Eye className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          <span>{visitors} Pengunjung</span>
        </div>
        
      </div>
    </div>
  );
}

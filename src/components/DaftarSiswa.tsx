import { GraduationCap, Instagram, Music } from 'lucide-react';
import siswaData from '../data/siswa.json';

export function DaftarSiswa() {
  const totalSiswa = siswaData.length;
  const siswaLakiLaki = siswaData.filter(s => s.jenisKelamin === 'Laki-laki').length;
  const siswaPerempuan = siswaData.filter(s => s.jenisKelamin === 'Perempuan').length;

  return (
    <section id="siswa" className="py-24 transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="text-left">
            <div className="inline-flex items-center gap-3 bg-brutalist-yellow border-4 border-black px-6 py-2 shadow-brutalist mb-4 -rotate-1">
              <GraduationCap className="w-8 h-8 text-black" />
              <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">
                Siswa & Siswi
              </h2>
            </div>
            <p className="text-lg font-bold text-black dark:text-gray-300 mt-2">
              MENAMPILKAN GENERASI PENERUS BANGSA YANG KREATIF
            </p>
          </div>
          
          <div className="bg-brutalist-white dark:bg-dark-50 border-4 border-black p-4 shadow-brutalist rotate-1">
            <p className="font-black text-black dark:text-white uppercase text-sm">
              Total {totalSiswa} Siswa
            </p>
            <div className="flex gap-4 mt-2">
              <span className="px-2 py-1 bg-brutalist-pink border-2 border-black text-xs font-bold text-black">{siswaPerempuan} SISWI</span>
              <span className="px-2 py-1 bg-brutalist-blue border-2 border-black text-xs font-bold text-black">{siswaLakiLaki} SISWA</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {siswaData.map((siswa, index) => (
            <div
              key={siswa.id}
              className="group relative"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Card Shadow Background */}
              <div className="absolute inset-0 bg-brutalist-black translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3" />
              
              {/* Main Card */}
              <div className="relative bg-brutalist-white dark:bg-dark-50 border-4 border-black overflow-hidden flex flex-col h-full transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden border-b-4 border-black">
                  <img
                    src={siswa.fotoUrl}
                    alt={siswa.nama}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                  />
                  
                  {/* Gender Tag */}
                  <div className={`absolute top-4 left-4 px-3 py-1 border-2 border-black font-black text-[10px] uppercase tracking-widest ${siswa.jenisKelamin === 'Perempuan' ? 'bg-brutalist-pink' : 'bg-brutalist-blue'} text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                    {siswa.jenisKelamin}
                  </div>

                  {/* Social Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-brutalist-lime/80 backdrop-blur-sm">
                    {siswa.instagram && (
                      <a
                        href={siswa.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-brutalist-white border-4 border-black flex items-center justify-center hover:bg-brutalist-pink transition-colors shadow-brutalist active:shadow-none active:translate-x-1 active:translate-y-1"
                        title="Instagram"
                      >
                        <Instagram className="w-6 h-6 text-black" />
                      </a>
                    )}
                    {siswa.tiktok && siswa.tiktok.replace(/^https?:\/\/(www\.)?tiktok\.com\/?/, '').length > 0 && siswa.tiktok.replace(/^https?:\/\/(www\.)?tiktok\.com\/?/, '') !== '@' && (
                      <a
                        href={siswa.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-brutalist-white border-4 border-black flex items-center justify-center hover:bg-brutalist-purple transition-colors shadow-brutalist active:shadow-none active:translate-x-1 active:translate-y-1"
                        title="TikTok"
                      >
                        <Music className="w-6 h-6 text-black" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-5 flex-grow flex flex-col justify-between bg-white dark:bg-dark-50">
                  <div>
                    <h3 className="font-black text-black dark:text-white text-xl uppercase leading-tight tracking-tighter mb-2 group-hover:text-brutalist-blue transition-colors">
                      {siswa.nama}
                    </h3>
                  </div>
                  <div className="pt-4 border-t-2 border-black/10 dark:border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-black text-black/40 dark:text-white/40 uppercase tracking-widest">
                      Member #{siswa.id.toString().padStart(2, '0')}
                    </span>
                    <div className="w-2 h-2 bg-brutalist-lime border border-black rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

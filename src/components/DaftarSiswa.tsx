import { GraduationCap, Instagram, Music, X, Calendar, Quote } from 'lucide-react';
import { useState } from 'react';
import siswaData from '../data/siswa.json';

export function DaftarSiswa() {
  const [selectedSiswa, setSelectedSiswa] = useState<typeof siswaData[0] | null>(null);
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
              className="group relative cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelectedSiswa(siswa)}
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
                        onClick={(e) => e.stopPropagation()}
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
                        onClick={(e) => e.stopPropagation()}
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
                    <span className="text-[10px] font-black text-black/40 dark:text-white/40 uppercase tracking-widest group-hover:hidden">
                      Member #{siswa.id.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-black text-brutalist-pink uppercase tracking-widest hidden group-hover:inline-block">
                      LIHAT DETAIL →
                    </span>
                    <div className="w-2 h-2 bg-brutalist-lime border border-black rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Detail Modal */}
      {selectedSiswa && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedSiswa(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-brutalist-white dark:bg-dark-50 border-4 border-black p-6 md:p-8 shadow-brutalist animate-scale-in text-left max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedSiswa(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-brutalist-pink border-4 border-black flex items-center justify-center hover:bg-brutalist-red transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
              title="Tutup"
            >
              <X className="w-6 h-6 text-black font-black" />
            </button>

            <div className="flex flex-col md:flex-row gap-6 items-start mt-4">
              {/* Photo section */}
              <div className="relative w-full md:w-56 shrink-0 aspect-[3/4] md:aspect-square overflow-hidden border-4 border-black bg-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <img
                  src={selectedSiswa.fotoUrl}
                  alt={selectedSiswa.nama}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-2 left-2 px-2 py-0.5 border-2 border-black font-black text-[9px] uppercase tracking-wider ${selectedSiswa.jenisKelamin === 'Perempuan' ? 'bg-brutalist-pink' : 'bg-brutalist-blue'} text-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]`}>
                  {selectedSiswa.jenisKelamin}
                </div>
              </div>

              {/* Details section */}
              <div className="flex-grow flex flex-col justify-between w-full">
                <div>
                  <span className="text-[10px] font-black bg-brutalist-purple border-2 border-black px-2 py-0.5 inline-block text-black uppercase tracking-widest mb-3 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                    Member #{selectedSiswa.id.toString().padStart(2, '0')}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-black dark:text-white uppercase leading-tight tracking-tighter mb-4">
                    {selectedSiswa.nama}
                  </h3>

                  {/* Place/Date of Birth */}
                  {selectedSiswa.ttl && (
                    <div className="flex items-center gap-2 mb-4 text-black dark:text-gray-300 font-bold text-sm">
                      <div className="p-1.5 bg-brutalist-blue border-2 border-black text-black">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs uppercase text-gray-500 dark:text-gray-400 block font-black">TTL</span>
                        <span>{selectedSiswa.ttl}</span>
                      </div>
                    </div>
                  )}

                  {/* Quote */}
                  {selectedSiswa.quote && (
                    <div className="mb-6 bg-brutalist-yellow border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative rotate-[-1deg]">
                      <Quote className="w-6 h-6 text-black/20 absolute -top-3 -left-1 transform -rotate-12 scale-150 font-black" />
                      <p className="text-sm font-bold text-black italic relative z-10 pl-4">
                        "{selectedSiswa.quote}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Social media links */}
                <div className="flex flex-wrap gap-3 mt-2">
                  {selectedSiswa.instagram && (
                    <a
                      href={selectedSiswa.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-brutalist-pink border-4 border-black font-black text-sm text-black shadow-brutalist hover:bg-brutalist-pink/90 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                    >
                      <Instagram className="w-5 h-5" />
                      <span>@{selectedSiswa.instagram.split('/').pop()}</span>
                    </a>
                  )}
                  {selectedSiswa.tiktok && selectedSiswa.tiktok.replace(/^https?:\/\/(www\.)?tiktok\.com\/?/, '').length > 0 && selectedSiswa.tiktok.replace(/^https?:\/\/(www\.)?tiktok\.com\/?/, '') !== '@' && (
                    <a
                      href={selectedSiswa.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-brutalist-purple border-4 border-black font-black text-sm text-black shadow-brutalist hover:bg-brutalist-purple/90 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                    >
                      <Music className="w-5 h-5" />
                      <span>TikTok</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

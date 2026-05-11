import { useEffect, useState } from 'react';
import { Instagram, Music } from 'lucide-react';
import classData from '../data/classData.json';

export function Hero() {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Dwi Dhasa';
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center transition-colors duration-500 relative overflow-hidden">
      
      {/* Decorative shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-brutalist-yellow border-4 border-black -rotate-12 hidden md:block" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-brutalist-pink border-4 border-black rotate-12 hidden md:block rounded-full" />
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-brutalist-lime border-4 border-black rotate-45 hidden lg:block" />

      <div className="container mx-auto px-6 py-20 text-center animate-fade-in relative z-10">
        <div className="inline-block bg-brutalist-lime border-4 border-black px-4 py-1 mb-6 -rotate-2 shadow-brutalist">
          <span className="font-bold text-black uppercase tracking-tighter">Official Class Website</span>
        </div>
        
        <h1 className="text-7xl md:text-9xl font-black text-black dark:text-white mb-6 uppercase tracking-tighter drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:drop-shadow-[4px_4px_0px_rgba(255,255,255,0.3)]">
          {displayText}
          <span className="animate-pulse">_</span>
        </h1>
        
        <p className="text-xl md:text-3xl font-bold text-black dark:text-gray-300 mb-12 max-w-2xl mx-auto bg-brutalist-white dark:bg-dark-100 border-4 border-black p-4 shadow-brutalist-lg">
          Kelas Unggulan dengan Semangat & Kreativitas Tanpa Batas
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <a
            href={classData.socialMedia.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brutalist bg-brutalist-pink shadow-brutalist hover:shadow-brutalist-hover hover:-translate-y-1 text-black flex items-center justify-center gap-2"
          >
            <Instagram className="w-6 h-6" />
            <span>INSTAGRAM</span>
          </a>
          <a
            href={classData.socialMedia.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brutalist bg-brutalist-white dark:bg-white dark:text-black shadow-brutalist hover:shadow-brutalist-hover hover:-translate-y-1 text-black flex items-center justify-center gap-2"
          >
            <Music className="w-6 h-6" />
            <span>TIKTOK</span>
          </a>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          {[
            { label: 'Tentang', id: 'wali-kelas', color: 'bg-brutalist-yellow' },
            { label: 'Struktur', id: 'struktur', color: 'bg-brutalist-blue' },
            { label: 'Siswa', id: 'siswa', color: 'bg-brutalist-lime' },
            { label: 'Jadwal', id: 'jadwal', color: 'bg-brutalist-purple' },
            { label: 'Piket', id: 'piket', color: 'bg-brutalist-red' },
            { label: 'Galeri', id: 'galeri', color: 'bg-brutalist-pink' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-4 py-2 border-2 border-black font-bold uppercase text-xs md:text-sm ${item.color} shadow-brutalist hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-black`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

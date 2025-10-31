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
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-100 via-white to-primary-50 dark:from-dark-100 dark:via-dark-50 dark:to-primary-900 transition-colors duration-500">
      <div className="container mx-auto px-6 py-20 text-center animate-fade-in">
        <h1 className="text-6xl md:text-7xl font-bold text-primary-700 dark:text-primary-300 mb-4 min-h-[80px]">
          {displayText}
          <span className="animate-pulse">|</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 italic">
          Kelas Unggulan dengan Semangat & Kreativitas
        </p>

        <div className="flex gap-4 justify-center mb-12">
          <a
            href={classData.socialMedia.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:scale-105 transition-transform duration-200 shadow-lg"
          >
            <Instagram className="w-5 h-5" />
            <span className="font-semibold">Instagram</span>
          </a>
          <a
            href={classData.socialMedia.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-black dark:bg-white dark:text-black text-white rounded-full hover:scale-105 transition-transform duration-200 shadow-lg"
          >
            <Music className="w-5 h-5" />
            <span className="font-semibold">TikTok</span>
          </a>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {[
            { label: 'Tentang', id: 'wali-kelas' },
            { label: 'Struktur Kelas', id: 'struktur' },
            { label: 'Siswa & Siswi', id: 'siswa' },
            { label: 'Jadwal', id: 'jadwal' },
            { label: 'Piket', id: 'piket' },
            { label: 'Galeri', id: 'galeri' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="px-5 py-2 bg-white dark:bg-dark-50 text-primary-700 dark:text-primary-300 rounded-full hover:bg-primary-500 hover:text-white dark:hover:bg-primary-600 transition-all duration-200 shadow-md hover:shadow-xl"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

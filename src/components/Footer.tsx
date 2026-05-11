import { Heart, Instagram, Music } from 'lucide-react';
import classData from '../data/classData.json';

export function Footer() {
  return (
    <footer className="bg-brutalist-white dark:bg-dark-200 text-black dark:text-white py-16 transition-colors duration-500 border-t-8 border-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left">
            <div className="inline-block bg-brutalist-lime border-4 border-black px-4 py-1 mb-4 -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-3xl font-black uppercase tracking-tighter">DWI DHASA</h3>
            </div>
            <p className="text-xl font-bold uppercase italic">
              1 hati 36 jiwa Dwi Dhasa Sukses Bersama
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href={classData.socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-brutalist-pink border-4 border-black flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-brutalist hover:shadow-none hover:translate-x-1 hover:translate-y-1"
              aria-label="Instagram"
            >
              <Instagram className="w-8 h-8" />
            </a>
            <a
              href={classData.socialMedia.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-brutalist-white dark:bg-white dark:text-black border-4 border-black flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-brutalist hover:shadow-none hover:translate-x-1 hover:translate-y-1"
              aria-label="TikTok"
            >
              <Music className="w-8 h-8" />
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t-4 border-black text-center flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-black uppercase tracking-widest text-sm">
            © 2025 CLASS OF DWI DHASA
          </p>
          <div className="flex items-center gap-2 bg-brutalist-yellow border-2 border-black px-4 py-2 rotate-1">
            <span className="font-black text-xs uppercase">Dibuat dengan Semangat dan Kreativitas</span>
            <Heart className="w-4 h-4 fill-current text-brutalist-red" />
          </div>
        </div>
      </div>
    </footer>
  );
}

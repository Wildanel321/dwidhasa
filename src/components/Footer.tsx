import { Heart, Instagram, Music } from 'lucide-react';
import classData from '../data/classData.json';

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary-700 to-primary-800 dark:from-dark-100 dark:to-dark-200 text-white py-12 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Kelas Dwi Dhasa</h3>
            <p className="text-primary-200 dark:text-gray-400">
              Kelas Unggulan dengan Semangat & Kreativitas
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href={classData.socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href={classData.socialMedia.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              aria-label="TikTok"
            >
              <Music className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20 dark:border-gray-700 text-center">
          <p className="text-primary-200 dark:text-gray-400 flex items-center justify-center gap-2">
            <span>2025 Kelas Dwi Dhasa</span>
            <span>—</span>
            <span className="flex items-center gap-1">
              Dibuat dengan Semangat dan Kreativitas
              <Heart className="w-4 h-4 fill-current text-red-400" />
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export function Toast() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenToast = localStorage.getItem('hasSeenWelcomeToast');

    if (!hasSeenToast) {
      setTimeout(() => {
        setIsVisible(true);
        localStorage.setItem('hasSeenWelcomeToast', 'true');
      }, 1000);

      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className="bg-white dark:bg-dark-100 text-gray-800 dark:text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-primary-200 dark:border-primary-800">
        <div>
          <p className="font-semibold text-lg">Selamat Datang di Kelas Dwi Dhasa!</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Jelajahi website kelas unggulan kami</p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="w-8 h-8 hover:bg-gray-100 dark:hover:bg-dark-50 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

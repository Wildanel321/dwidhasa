import { Bot } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export function DhasaBot() {
  const navigate = useNavigate();
  const location = useLocation();

  // Jangan tampilkan tombol DhasaBot jika sedang berada di halaman chat
  if (location.pathname === '/chat') {
    return null;
  }

  return (
    <button
      onClick={() => navigate('/chat')}
      className="fixed bottom-24 sm:bottom-6 right-6 z-[60] w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-200 flex items-center justify-center"
      aria-label="Open DhasaBot Chat"
    >
      <Bot className="w-7 h-7 sm:w-8 sm:h-8" />
    </button>
  );
}

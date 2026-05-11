import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-4 border-4 border-black bg-brutalist-yellow text-black shadow-brutalist hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
      aria-label="Toggle dark mode"
    >
      {theme === 'light' ? (
        <Moon className="w-6 h-6" />
      ) : (
        <Sun className="w-6 h-6" />
      )}
    </button>
  );
}

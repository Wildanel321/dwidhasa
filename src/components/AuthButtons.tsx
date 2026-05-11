import { useAuth } from '../contexts/AuthContext';
import { LogOut, User } from 'lucide-react';

export function AuthButtons() {
  const { user, logout } = useAuth();

  // Check if user is admin
  const isAdmin = user?.email === 'admin@lifewildsmp.my.id' || user?.email?.endsWith('@lifewildsmp.my.id');

  if (!user) {
    return (
      <div className="fixed top-6 left-6 z-50 flex items-center gap-4">
        <a
          href="/login"
          className="px-4 py-2 border-2 border-black bg-brutalist-white text-black font-black uppercase text-xs shadow-brutalist hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
        >
          Login
        </a>
        <a
          href="/register"
          className="px-4 py-2 border-2 border-black bg-brutalist-blue text-black font-black uppercase text-xs shadow-brutalist hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
        >
          Register
        </a>
      </div>
    );
  }

  return (
    <div className="fixed top-6 left-6 z-50 flex items-center gap-4">
      <div className="hidden md:flex items-center gap-2 bg-brutalist-white border-2 border-black px-3 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        <User className="h-4 w-4" />
        <span className="text-[10px] font-black uppercase">{user.displayName || user.email?.split('@')[0]}</span>
      </div>
      {isAdmin && (
        <a
          href="/admin"
          className="px-4 py-2 border-2 border-black bg-brutalist-purple text-black font-black uppercase text-xs shadow-brutalist hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
        >
          Admin
        </a>
      )}
      <button
        onClick={logout}
        className="px-4 py-2 border-2 border-black bg-brutalist-red text-black font-black uppercase text-xs shadow-brutalist hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-2"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </div>
  );
}

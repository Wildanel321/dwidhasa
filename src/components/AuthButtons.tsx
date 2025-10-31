import { useAuth } from '../contexts/AuthContext';
import { LogOut, User } from 'lucide-react';

export function AuthButtons() {
  const { user, logout } = useAuth();

  // Check if user is admin
  const isAdmin = user?.email === 'admin@lifewildsmp.my.id' || user?.email?.endsWith('@lifewildsmp.my.id');

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <a
          href="/login"
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Login
        </a>
        <a
          href="/register"
          className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Register
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
        <User className="h-4 w-4" />
        <span>{user.displayName || user.email}</span>
      </div>
      {isAdmin && (
        <a
          href="/admin"
          className="px-3 py-2 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Admin
        </a>
      )}
      <button
        onClick={logout}
        className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </button>
    </div>
  );
}

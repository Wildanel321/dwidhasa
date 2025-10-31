import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Github, Chrome, Leaf, TreePine, Flower, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export function Login() {
  const { signInWithGoogle, signInWithGithub, signInWithEmail, loading } = useAuth();
  const [isAnimating, setIsAnimating] = useState(false);
  const [floatingElements, setFloatingElements] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authMode, setAuthMode] = useState<'social' | 'email'>('social');

  useEffect(() => {
    // Generate floating forest elements
    const elements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setFloatingElements(elements);
  }, []);

  const handleGoogleSignIn = async () => {
    setIsAnimating(true);
    await signInWithGoogle();
    setIsAnimating(false);
  };

  const handleGithubSignIn = async () => {
    setIsAnimating(true);
    await signInWithGithub();
    setIsAnimating(false);
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnimating(true);
    try {
      await signInWithEmail(email, password);
    } catch (error) {
      // Show beautiful error popup for wrong admin password
      if (email === 'admin@lifewildsmp.my.id') {
        showErrorPopup('🔐 Admin Access Denied', 'The admin password you entered is incorrect. Please try again with the correct credentials.');
      } else {
        showErrorPopup('❌ Login Failed', 'Invalid email or password. Please check your credentials and try again.');
      }
    }
    setIsAnimating(false);
  };

  const showErrorPopup = (title: string, message: string) => {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in';
    overlay.id = 'error-popup-overlay';

    // Create popup content
    const popup = document.createElement('div');
    popup.className = 'bg-gradient-to-br from-red-900 via-red-800 to-pink-900 rounded-2xl shadow-2xl p-8 max-w-md w-full border border-red-400/30 animate-scale-in';

    popup.innerHTML = `
      <div class="text-center">
        <div class="mx-auto h-16 w-16 bg-gradient-to-br from-red-400 to-pink-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
          <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">${title}</h3>
        <p class="text-red-200 mb-6">${message}</p>
        <button class="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg" onclick="document.getElementById('error-popup-overlay').remove()">
          Try Again
        </button>
      </div>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Auto remove after 10 seconds
    setTimeout(() => {
      if (document.getElementById('error-popup-overlay')) {
        document.getElementById('error-popup-overlay')!.remove();
      }
    }, 10000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 relative overflow-hidden">
        {/* Floating forest elements */}
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute opacity-20 animate-bounce"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: '3s'
            }}
          >
            {element.id % 3 === 0 ? <Leaf className="h-6 w-6 text-green-300" /> :
             element.id % 3 === 1 ? <TreePine className="h-8 w-8 text-green-400" /> :
             <Flower className="h-5 w-5 text-yellow-300" />}
          </div>
        ))}

        <div className="relative z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-400 border-t-transparent"></div>
          <p className="text-emerald-200 mt-4 text-center font-medium">Loading magical forest...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 relative overflow-hidden">
      {/* Animated background elements */}
      {floatingElements.map((element) => (
        <div
          key={element.id}
          className="absolute opacity-10 animate-pulse"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animationDelay: `${element.delay}s`,
            animationDuration: '4s'
          }}
        >
          {element.id % 4 === 0 ? <Leaf className="h-8 w-8 text-green-300" /> :
           element.id % 4 === 1 ? <TreePine className="h-12 w-12 text-green-400" /> :
           element.id % 4 === 2 ? <Flower className="h-6 w-6 text-yellow-300" /> :
           <div className="h-4 w-4 bg-emerald-400 rounded-full"></div>}
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-md w-full space-y-8 p-4">
        <div className="text-center animate-fade-in-up">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-2xl animate-pulse">
            <TreePine className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-3 animate-slide-in-left">
            Welcome to the Forest
          </h2>
          <p className="text-emerald-200 text-lg animate-slide-in-right">
            Enter the magical realm of Dwi Dhasa
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-6 border border-white/20 animate-fade-in-up animation-delay-300">
          {/* Auth Mode Toggle */}
          <div className="flex rounded-lg bg-white/10 p-1">
            <button
              onClick={() => setAuthMode('social')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                authMode === 'social'
                  ? 'bg-white/20 text-white shadow-md'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              Social Login
            </button>
            <button
              onClick={() => setAuthMode('email')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                authMode === 'email'
                  ? 'bg-white/20 text-white shadow-md'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              Email Login
            </button>
          </div>

          {authMode === 'social' ? (
            <>
              <button
                onClick={handleGoogleSignIn}
                disabled={isAnimating}
                className="group w-full flex items-center justify-center px-6 py-4 bg-white/90 hover:bg-white rounded-xl shadow-lg text-gray-800 font-semibold text-base transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Chrome className="h-6 w-6 mr-4 text-red-500 group-hover:animate-bounce" />
                <span className="group-hover:animate-pulse">
                  {isAnimating ? '🌿 Entering Forest...' : 'Continue with Google'}
                </span>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-emerald-200 font-medium">or</span>
                </div>
              </div>

              <button
                onClick={handleGithubSignIn}
                disabled={isAnimating}
                className="group w-full flex items-center justify-center px-6 py-4 bg-gray-900/80 hover:bg-gray-900 rounded-xl shadow-lg text-white font-semibold text-base transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Github className="h-6 w-6 mr-4 group-hover:animate-bounce" />
                <span className="group-hover:animate-pulse">
                  {isAnimating ? '🌲 Entering Forest...' : 'Continue with GitHub'}
                </span>
              </button>
            </>
          ) : (
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-300" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-300 hover:text-white transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={isAnimating}
                className="group w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 rounded-xl shadow-lg text-white font-semibold text-base transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <TreePine className="h-6 w-6 mr-4 group-hover:animate-bounce" />
                <span className="group-hover:animate-pulse">
                  {isAnimating ? '🌿 Entering Forest...' : 'Enter the Forest'}
                </span>
              </button>
            </form>
          )}
        </div>

        <div className="text-center space-y-4 animate-fade-in-up animation-delay-500">
          <div className="text-sm text-emerald-300">
            🌿 By entering, you embrace the spirit of nature and creativity 🌿
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-200 rounded-lg transition-colors duration-200 text-sm font-medium border border-emerald-400/30"
            >
              🔄 Refresh Page
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload();
              }}
              className="px-4 py-2 bg-orange-600/20 hover:bg-orange-600/30 text-orange-200 rounded-lg transition-colors duration-200 text-sm font-medium border border-orange-400/30"
            >
              🗑️ Reset & Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

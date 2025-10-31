import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus, Github, Chrome, Leaf, TreePine, Flower, Sparkles, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export function Register() {
  const { signInWithGoogle, signInWithGithub, signUpWithEmail, loading } = useAuth();
  const [isAnimating, setIsAnimating] = useState(false);
  const [floatingElements, setFloatingElements] = useState<Array<{id: number, x: number, y: number, delay: number, type: string}>>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authMode, setAuthMode] = useState<'social' | 'email'>('social');

  useEffect(() => {
    // Generate floating forest elements with more variety
    const elements = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      type: ['leaf', 'tree', 'flower', 'sparkle'][i % 4]
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

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showErrorPopup('❌ Password Mismatch', 'The passwords you entered do not match. Please try again.');
      return;
    }
    setIsAnimating(true);
    try {
      await signUpWithEmail(email, password);
    } catch (error) {
      showErrorPopup('❌ Registration Failed', 'Unable to create account. Please check your information and try again.');
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 relative overflow-hidden">
        {/* Floating forest elements */}
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute opacity-30 animate-bounce"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: '2.5s'
            }}
          >
            {element.type === 'leaf' && <Leaf className="h-7 w-7 text-amber-300" />}
            {element.type === 'tree' && <TreePine className="h-10 w-10 text-orange-400" />}
            {element.type === 'flower' && <Flower className="h-6 w-6 text-yellow-300" />}
            {element.type === 'sparkle' && <Sparkles className="h-5 w-5 text-red-300" />}
          </div>
        ))}

        <div className="relative z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-400 border-t-transparent"></div>
          <p className="text-amber-200 mt-4 text-center font-medium">Awakening the ancient forest...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 relative overflow-hidden">
      {/* Animated background elements */}
      {floatingElements.map((element) => (
        <div
          key={element.id}
          className="absolute opacity-15 animate-pulse"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animationDelay: `${element.delay}s`,
            animationDuration: '5s'
          }}
        >
          {element.type === 'leaf' && <Leaf className="h-10 w-10 text-amber-300" />}
          {element.type === 'tree' && <TreePine className="h-14 w-14 text-orange-400" />}
          {element.type === 'flower' && <Flower className="h-8 w-8 text-yellow-300" />}
          {element.type === 'sparkle' && <Sparkles className="h-6 w-6 text-red-300" />}
        </div>
      ))}

      {/* Magical particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-md w-full space-y-8 p-4">
        <div className="text-center animate-fade-in-up">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 rounded-full flex items-center justify-center mb-6 shadow-2xl animate-pulse relative">
            <UserPlus className="h-10 w-10 text-white" />
            <div className="absolute -top-2 -right-2">
              <Sparkles className="h-6 w-6 text-yellow-300 animate-spin" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-3 animate-slide-in-left">
            Join the Enchanted Forest
          </h2>
          <p className="text-amber-200 text-lg animate-slide-in-right">
            Become part of the Dwi Dhasa magical community
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
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              Social Register
            </button>
            <button
              onClick={() => setAuthMode('email')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                authMode === 'email'
                  ? 'bg-white/20 text-white shadow-md'
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              Email Register
            </button>
          </div>

          {authMode === 'social' ? (
            <>
              <button
                onClick={handleGoogleSignIn}
                disabled={isAnimating}
                className="group w-full flex items-center justify-center px-6 py-4 bg-white/90 hover:bg-white rounded-xl shadow-lg text-gray-800 font-semibold text-base transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Chrome className="h-6 w-6 mr-4 text-red-500 group-hover:animate-bounce relative z-10" />
                <span className="group-hover:animate-pulse relative z-10">
                  {isAnimating ? '🌟 Awakening Magic...' : 'Join with Google'}
                </span>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-amber-200 font-medium flex items-center">
                    <Sparkles className="h-4 w-4 mr-1" />
                    or
                    <Sparkles className="h-4 w-4 ml-1" />
                  </span>
                </div>
              </div>

              <button
                onClick={handleGithubSignIn}
                disabled={isAnimating}
                className="group w-full flex items-center justify-center px-6 py-4 bg-gray-900/80 hover:bg-gray-900 rounded-xl shadow-lg text-white font-semibold text-base transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Github className="h-6 w-6 mr-4 group-hover:animate-bounce relative z-10" />
                <span className="group-hover:animate-pulse relative z-10">
                  {isAnimating ? '🌲 Channeling Energy...' : 'Join with GitHub'}
                </span>
              </button>
            </>
          ) : (
            <form onSubmit={handleEmailSignUp} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-300" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create password"
                  className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-300 hover:text-white transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-300" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-300 hover:text-white transition-colors duration-200"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={isAnimating}
                className="group w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-xl shadow-lg text-white font-semibold text-base transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Sparkles className="h-6 w-6 mr-4 group-hover:animate-spin" />
                <span className="group-hover:animate-pulse">
                  {isAnimating ? '✨ Creating Magic...' : 'Create Enchanted Account'}
                </span>
              </button>
            </form>
          )}
        </div>

        <div className="text-center space-y-4 animate-fade-in-up animation-delay-500">
          <div className="text-sm text-amber-300">
            ✨ By joining, you unlock the ancient wisdom of nature and creativity ✨
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-amber-600/20 hover:bg-amber-600/30 text-amber-200 rounded-lg transition-colors duration-200 text-sm font-medium border border-amber-400/30"
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

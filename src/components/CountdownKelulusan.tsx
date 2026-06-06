import { useEffect, useRef, useState } from 'react';

const confettiColors = [
  '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
  '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE',
  '#F8C471', '#82E0AA', '#85C1E9', '#F1948A', '#A9CCE3',
];

const confettiPieces = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 4,
  duration: 3 + Math.random() * 4,
  size: 6 + Math.random() * 10,
  color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
  rotate: Math.random() * 360,
  shape: Math.random() > 0.5 ? 'rect' : 'circle',
}));

export function CountdownKelulusan() {
  const [count, setCount] = useState(0);
  const targetCount = 36;
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    let start = 0;
    const step = Math.ceil(targetCount / 60);
    const interval = setInterval(() => {
      start += step;
      if (start >= targetCount) {
        setCount(targetCount);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const styles = `
    @keyframes confettiFall {
      0% {
        transform: translateY(-120px) rotate(0deg);
        opacity: 1;
      }
      80% { opacity: 1; }
      100% {
        transform: translateY(110vh) rotate(720deg);
        opacity: 0;
      }
    }

    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    @keyframes pulseGlow {
      0%, 100% {
        text-shadow:
          0 0 20px #FFD700,
          0 0 40px #FFD700,
          0 0 60px #FFD700;
      }
      50% {
        text-shadow:
          0 0 40px #FFD700,
          0 0 80px #FFA500,
          0 0 120px #FF8C00;
      }
    }

    @keyframes bounceIn {
      0% { transform: scale(0) rotate(-10deg); opacity: 0; }
      60% { transform: scale(1.15) rotate(3deg); opacity: 1; }
      80% { transform: scale(0.95) rotate(-2deg); }
      100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }

    @keyframes slideUp {
      0% { transform: translateY(60px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }

    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }

    @keyframes countUp {
      0% { transform: scale(0.5); opacity: 0; }
      60% { transform: scale(1.2); }
      100% { transform: scale(1); opacity: 1; }
    }

    @keyframes starSpin {
      0% { transform: rotate(0deg) scale(1); }
      50% { transform: rotate(180deg) scale(1.2); }
      100% { transform: rotate(360deg) scale(1); }
    }

    .graduation-bg {
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1200 25%, #2d1f00 50%, #1a1200 75%, #0a0a0a 100%);
      background-size: 400% 400%;
      animation: gradientShift 8s ease infinite;
    }

    .graduation-title {
      animation: bounceIn 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both;
    }

    .graduation-glow {
      animation: pulseGlow 2s ease-in-out infinite;
      color: #FFD700;
    }

    .count-number {
      animation: countUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s both;
    }

    .slide-up-1 { animation: slideUp 0.7s ease 0.5s both; }
    .slide-up-2 { animation: slideUp 0.7s ease 0.8s both; }
    .slide-up-3 { animation: slideUp 0.7s ease 1.1s both; }
    .slide-up-4 { animation: slideUp 0.7s ease 1.4s both; }

    .shimmer-text {
      background: linear-gradient(
        90deg,
        #FFD700 0%,
        #FFF9C4 20%,
        #FFD700 40%,
        #FFA500 60%,
        #FFD700 80%,
        #FFF9C4 100%
      );
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3s linear infinite;
    }

    .star-icon {
      display: inline-block;
      animation: starSpin 4s linear infinite;
    }

    .confetti-container {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
    }

    .confetti-piece {
      position: absolute;
      top: -20px;
      border-radius: 2px;
      animation: confettiFall linear infinite;
    }

    .neo-border-gold {
      border: 4px solid #FFD700;
      box-shadow: 6px 6px 0px #B8860B, 12px 12px 0px rgba(184,134,11,0.3);
    }

    .neo-card {
      border: 4px solid #000;
      box-shadow: 6px 6px 0px #000;
      background: rgba(255, 215, 0, 0.15);
      backdrop-filter: blur(8px);
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <section
        className="graduation-bg relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-16"
        aria-label="Selamat Lulus XII.2"
      >
        {/* Confetti */}
        <div className="confetti-container">
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              className="confetti-piece"
              style={{
                left: `${piece.left}%`,
                width: `${piece.size}px`,
                height: piece.shape === 'circle' ? `${piece.size}px` : `${piece.size * 0.6}px`,
                backgroundColor: piece.color,
                borderRadius: piece.shape === 'circle' ? '50%' : '2px',
                animationDelay: `${piece.delay}s`,
                animationDuration: `${piece.duration}s`,
                transform: `rotate(${piece.rotate}deg)`,
                opacity: 0.9,
              }}
            />
          ))}
        </div>

        {/* Stars decoration */}
        <div className="absolute top-8 left-8 text-4xl" style={{ animation: 'starSpin 3s linear infinite' }}>⭐</div>
        <div className="absolute top-12 right-12 text-3xl" style={{ animation: 'starSpin 4s linear infinite reverse' }}>🌟</div>
        <div className="absolute bottom-16 left-16 text-3xl" style={{ animation: 'starSpin 5s linear infinite' }}>✨</div>
        <div className="absolute bottom-12 right-8 text-4xl" style={{ animation: 'starSpin 3.5s linear infinite reverse' }}>⭐</div>

        {/* Main Card */}
        <div
          className="relative z-10 max-w-3xl w-full mx-auto text-center neo-border-gold rounded-none"
          style={{
            padding: '3rem 2rem',
            background: 'linear-gradient(145deg, rgba(10,10,10,0.95), rgba(26,18,0,0.98))',
          }}
        >
          {/* Trophy */}
          <div className="graduation-title text-7xl md:text-9xl mb-2 leading-none select-none">🎓</div>

          {/* Selamat Lulus */}
          <h1
            className="graduation-glow graduation-title font-black uppercase tracking-widest leading-none"
            style={{
              fontSize: 'clamp(2.2rem, 8vw, 5rem)',
              marginBottom: '0.25rem',
            }}
          >
            SELAMAT LULUS
          </h1>

          <div
            className="shimmer-text font-black uppercase tracking-widest slide-up-1"
            style={{ fontSize: 'clamp(2rem, 7vw, 4rem)', marginBottom: '1rem' }}
          >
            XII.2!
          </div>

          {/* Year badge */}
          <div
            className="inline-block neo-card px-6 py-2 mb-6 slide-up-2"
          >
            <span
              className="font-black uppercase tracking-wider"
              style={{ color: '#FFD700', fontSize: 'clamp(1rem, 3vw, 1.5rem)' }}
            >
              TAHUN KELULUSAN 2025/2026
            </span>
          </div>

          {/* Count up */}
          <div className="slide-up-3 mb-6">
            <div
              className="count-number font-black"
              style={{
                fontSize: 'clamp(5rem, 20vw, 10rem)',
                lineHeight: 1,
                color: '#FFD700',
                textShadow: '0 0 30px rgba(255,215,0,0.6)',
              }}
            >
              {count}
            </div>
            <div
              className="font-black uppercase tracking-widest"
              style={{ color: '#FFF9C4', fontSize: 'clamp(1rem, 3vw, 1.4rem)', letterSpacing: '0.3em' }}
            >
              SISWA TELAH LULUS 🎉
            </div>
          </div>

          {/* Divider */}
          <div
            className="slide-up-4"
            style={{
              borderTop: '3px solid #FFD700',
              margin: '1.5rem 0',
              boxShadow: '0 2px 10px rgba(255,215,0,0.4)',
            }}
          />

          {/* Motivational message */}
          <div className="slide-up-4">
            <p
              className="font-bold uppercase tracking-wide"
              style={{ color: '#FFF9C4', fontSize: 'clamp(0.85rem, 2.5vw, 1.1rem)', lineHeight: 1.7 }}
            >
              Tiga tahun penuh perjuangan, tawa, dan air mata.
              <br />
              Kini saatnya kalian terbang lebih tinggi. 🚀
              <br />
              <span style={{ color: '#FFD700', fontWeight: 900 }}>
                Bangga menjadi bagian dari XII.2 — FOREVER.
              </span>
            </p>
          </div>

          {/* Emoji row */}
          <div
            className="slide-up-4 mt-6"
            style={{ fontSize: '2rem', letterSpacing: '0.5rem' }}
          >
            🎓🥂🌈🎊🏆✨
          </div>
        </div>
      </section>
    </>
  );
}

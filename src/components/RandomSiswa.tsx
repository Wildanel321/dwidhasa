import { useState, useRef, useEffect, useCallback } from 'react';
import siswaData from '../data/siswa.json';

interface Siswa {
  id: number;
  nama: string;
  fotoUrl: string;
  instagram: string;
  quote: string;
}

const siswaList: Siswa[] = siswaData as Siswa[];

function playBeep(ctx: AudioContext, freq: number, duration: number) {
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.type = 'square';
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    // silent fail
  }
}

type SpinState = 'idle' | 'spinning' | 'slowing' | 'stopped';

export function RandomSiswa() {
  const [spinState, setSpinState] = useState<SpinState>('idle');
  const [displayIdx, setDisplayIdx] = useState(0);
  const [resultIdx, setResultIdx] = useState<number | null>(null);
  const [btnPressed, setBtnPressed] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const frameCountRef = useRef(0);

  const clearSpin = useCallback(() => {
    if (intervalRef.current) clearTimeout(intervalRef.current);
  }, []);

  const getAudioCtx = () => {
    if (!audioCtxRef.current) {
      try {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      } catch {
        return null;
      }
    }
    return audioCtxRef.current;
  };

  const spin = useCallback(() => {
    if (spinState === 'spinning' || spinState === 'slowing') return;

    clearSpin();
    setResultIdx(null);
    setSpinState('spinning');
    frameCountRef.current = 0;

    const target = Math.floor(Math.random() * siswaList.length);
    const totalSpins = 25 + Math.floor(Math.random() * 15); // 25-40 frames fast

    let currentFrame = 0;
    let currentIdx = displayIdx;

    const tick = (delay: number) => {
      intervalRef.current = setTimeout(() => {
        currentIdx = (currentIdx + 1) % siswaList.length;
        setDisplayIdx(currentIdx);
        currentFrame++;

        // Beep sound
        const ctx = getAudioCtx();
        if (ctx) {
          const freq = 200 + (currentFrame / totalSpins) * 400;
          playBeep(ctx, freq, 0.05);
        }

        if (currentFrame < totalSpins) {
          // Fast spin phase
          tick(50 + (currentFrame / totalSpins) * 30);
        } else {
          // Slowing phase
          setSpinState('slowing');
          const remaining = (target - currentIdx + siswaList.length) % siswaList.length;
          const slowFrames = Math.max(remaining, 5);

          let slowFrame = 0;
          const slowTick = (d: number) => {
            intervalRef.current = setTimeout(() => {
              currentIdx = (currentIdx + 1) % siswaList.length;
              setDisplayIdx(currentIdx);
              slowFrame++;

              const ctx2 = getAudioCtx();
              if (ctx2) {
                playBeep(ctx2, 800 - slowFrame * 40, 0.07);
              }

              if (slowFrame < slowFrames) {
                slowTick(80 + slowFrame * 60);
              } else {
                // Land exactly on target
                setDisplayIdx(target);
                setResultIdx(target);
                setSpinState('stopped');

                const ctx3 = getAudioCtx();
                if (ctx3) {
                  setTimeout(() => playBeep(ctx3, 1200, 0.15), 0);
                  setTimeout(() => playBeep(ctx3, 1000, 0.15), 150);
                  setTimeout(() => playBeep(ctx3, 1400, 0.2), 300);
                }
              }
            }, d);
          };
          slowTick(100);
        }
      }, delay);
    };

    tick(50);
  }, [spinState, displayIdx, clearSpin]);

  useEffect(() => {
    return () => clearSpin();
  }, [clearSpin]);

  const currentSiswa = siswaList[displayIdx];
  const resultSiswa = resultIdx !== null ? siswaList[resultIdx] : null;
  const isSpinning = spinState === 'spinning' || spinState === 'slowing';

  return (
    <>
      <style>{`
        @keyframes slotRoll {
          0% { transform: translateY(0); opacity: 1; }
          40% { transform: translateY(-120%); opacity: 0; }
          41% { transform: translateY(120%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes resultReveal {
          0% { transform: scale(0.7) rotate(-5deg); opacity: 0; }
          60% { transform: scale(1.05) rotate(1deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes btnGlow {
          0%, 100% { box-shadow: 6px 6px 0 #000, 0 0 20px #FFD700; }
          50% { box-shadow: 6px 6px 0 #000, 0 0 40px #FFD700, 0 0 60px #FFD700; }
        }
        @keyframes scanline {
          0% { background-position: 0 0; }
          100% { background-position: 0 100px; }
        }
        @keyframes winning {
          0%, 100% { border-color: #FFD700; box-shadow: 6px 6px 0 #FFD700; }
          33% { border-color: #FF69B4; box-shadow: 6px 6px 0 #FF69B4; }
          66% { border-color: #00C853; box-shadow: 6px 6px 0 #00C853; }
        }

        .slot-rolling {
          animation: slotRoll 0.12s ease-in-out infinite;
        }
        .result-reveal {
          animation: resultReveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .btn-idle {
          animation: btnGlow 2s ease-in-out infinite;
        }
        .winning-border {
          animation: winning 1s ease-in-out infinite;
        }
        .machine-screen {
          background: #0a0a0a;
          border: 4px solid #FFD700;
          position: relative;
          overflow: hidden;
        }
        .machine-screen::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0, 255, 0, 0.03) 4px
          );
          pointer-events: none;
          z-index: 10;
          animation: scanline 3s linear infinite;
        }
        .coin-insert {
          background: repeating-linear-gradient(
            45deg,
            #2a2a2a 0px,
            #2a2a2a 10px,
            #333 10px,
            #333 20px
          );
        }
        .spin-btn:active {
          transform: translate(4px, 4px) !important;
          box-shadow: 2px 2px 0 #000 !important;
        }
        .instagram-link {
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .instagram-link:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 #000 !important;
        }
      `}</style>

      <div
        className="min-h-screen py-8 px-4 flex flex-col items-center justify-center"
        style={{
          background: 'linear-gradient(180deg, #1a0033 0%, #0a0a0a 60%, #1a0000 100%)',
          fontFamily: "'Space Grotesk', 'Inter', sans-serif",
        }}
      >
        {/* Neon header */}
        <div className="text-center mb-8">
          <h1
            className="text-5xl md:text-6xl font-black tracking-tighter mb-2"
            style={{
              color: '#FFD700',
              textShadow: '0 0 20px #FFD700, 0 0 40px #FF6600, 0 0 60px #FF6600',
            }}
          >
            🎰 SLOT SISWA
          </h1>
          <p className="text-gray-400 font-bold text-lg">Spin untuk pilih siswa random!</p>
        </div>

        {/* Slot Machine */}
        <div
          className="relative border-8 border-yellow-400 p-6 max-w-sm w-full"
          style={{
            background: 'linear-gradient(180deg, #2a1a00 0%, #1a0a00 100%)',
            boxShadow: '0 0 40px rgba(255,215,0,0.3), 8px 8px 0 #000',
          }}
        >
          {/* Machine top decorations */}
          <div className="flex justify-center gap-3 mb-4">
            {['#FF69B4', '#FFD700', '#00C853'].map((c, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full border-2 border-black"
                style={{
                  background: c,
                  boxShadow: `0 0 ${isSpinning ? 12 : 6}px ${c}`,
                  transition: 'box-shadow 0.3s',
                }}
              />
            ))}
          </div>

          {/* Screen */}
          <div
            className="machine-screen mb-4 flex items-center justify-center"
            style={{
              height: '300px',
              borderRadius: '4px',
              boxShadow: spinState === 'stopped' && resultSiswa ? '0 0 30px #FFD700' : '0 0 10px rgba(255,215,0,0.3)',
            }}
          >
            {isSpinning && (
              <div className="text-center w-full px-4">
                <div className="slot-rolling">
                  <img
                    src={currentSiswa.fotoUrl}
                    alt={currentSiswa.nama}
                    className="w-32 h-32 object-cover object-top border-4 border-yellow-400 mx-auto mb-3"
                    style={{ filter: 'brightness(0.8) contrast(1.2)' }}
                  />
                  <p className="text-yellow-400 font-black text-xl tracking-widest uppercase"
                    style={{ textShadow: '0 0 10px #FFD700' }}>
                    {currentSiswa.nama.split(' ')[0]}
                  </p>
                </div>
              </div>
            )}

            {!isSpinning && spinState === 'idle' && (
              <div className="text-center px-6">
                <div className="text-6xl mb-4">🎰</div>
                <p className="text-yellow-400 font-black text-lg">Tekan SPIN!</p>
                <p className="text-gray-500 text-sm mt-2">untuk memilih siswa random</p>
              </div>
            )}

            {!isSpinning && spinState === 'stopped' && resultSiswa && (
              <div className="result-reveal text-center w-full px-4">
                <img
                  src={resultSiswa.fotoUrl}
                  alt={resultSiswa.nama}
                  className="w-36 h-36 object-cover object-top border-4 border-yellow-400 mx-auto mb-3"
                  style={{ boxShadow: '0 0 20px #FFD700' }}
                />
                <p
                  className="text-yellow-400 font-black text-lg mb-1 leading-tight"
                  style={{ textShadow: '0 0 10px #FFD700' }}
                >
                  {resultSiswa.nama}
                </p>
                <p className="text-gray-400 text-xs italic px-2 leading-tight">
                  "{resultSiswa.quote.slice(0, 60)}{resultSiswa.quote.length > 60 ? '...' : ''}"
                </p>
                {resultSiswa.instagram && (
                  <a
                    href={resultSiswa.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="instagram-link inline-block mt-3 border-2 border-pink-400 px-3 py-1 text-pink-400 text-xs font-bold"
                    style={{ boxShadow: '3px 3px 0 #000' }}
                  >
                    📷 Instagram
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Lever-like decorations */}
          <div className="coin-insert h-3 mb-4 border-2 border-yellow-700 rounded-sm" />

          {/* SPIN Button */}
          <button
            onClick={() => {
              setBtnPressed(true);
              setTimeout(() => setBtnPressed(false), 150);
              spin();
            }}
            disabled={isSpinning}
            className={`spin-btn w-full py-5 font-black text-2xl uppercase tracking-widest text-black border-4 border-black ${
              isSpinning ? '' : 'btn-idle'
            }`}
            style={{
              background: isSpinning
                ? '#666'
                : 'linear-gradient(180deg, #FFD700 0%, #FF8C00 100%)',
              transform: btnPressed ? 'translate(4px, 4px)' : 'none',
              boxShadow: btnPressed
                ? '2px 2px 0 #000'
                : isSpinning
                ? '4px 4px 0 #333'
                : '6px 6px 0 #000',
              cursor: isSpinning ? 'not-allowed' : 'pointer',
              transition: 'background 0.3s',
            }}
          >
            {isSpinning ? '⚡ SPINNING...' : '🎰 SPIN!'}
          </button>

          {spinState === 'stopped' && (
            <p className="text-center text-gray-400 text-sm mt-3 font-medium animate-pulse">
              Tekan SPIN lagi untuk memutar ulang!
            </p>
          )}
        </div>

        {/* Result card (expanded detail below machine) */}
        {spinState === 'stopped' && resultSiswa && (
          <div
            className="winning-border mt-6 border-4 p-5 max-w-sm w-full"
            style={{
              background: '#1a1a0a',
              boxShadow: '6px 6px 0 #FFD700',
            }}
          >
            <h3 className="text-yellow-400 font-black text-xl mb-3 border-b-2 border-yellow-400 pb-2">
              🎊 SISWA TERPILIH!
            </h3>
            <div className="flex gap-4 items-start">
              <img
                src={resultSiswa.fotoUrl}
                alt={resultSiswa.nama}
                className="w-20 h-20 object-cover object-top border-3 border-yellow-400 flex-shrink-0"
                style={{ borderWidth: '3px' }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-white font-black text-base mb-1">{resultSiswa.nama}</p>
                <p className="text-gray-400 text-xs italic leading-snug mb-2">
                  "{resultSiswa.quote}"
                </p>
                {resultSiswa.instagram && (
                  <a
                    href={resultSiswa.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="instagram-link inline-flex items-center gap-1 border-2 border-pink-400 px-3 py-1 text-pink-400 text-xs font-bold"
                    style={{ boxShadow: '3px 3px 0 #000' }}
                  >
                    📷 Follow IG
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default RandomSiswa;

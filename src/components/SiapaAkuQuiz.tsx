import { useState, useEffect, useRef, useCallback } from 'react';
import siswaData from '../data/siswa.json';
import { supabase, supabaseReady, QuizScoreRow } from '../lib/supabase';

interface Siswa {
  id: number;
  nama: string;
  fotoUrl: string;
  instagram: string;
  quote: string;
}

interface Question {
  siswa: Siswa;
  options: string[];
  correctIndex: number;
}

type GameState = 'idle' | 'playing' | 'correct' | 'wrong' | 'over';

const TOTAL_SOAL = 10;
const TIMER_DURATION = 15;
const HS_KEY = 'dwidhasa_siapaaqu_hs';

interface LeaderboardEntry {
  id: string;
  nama: string;
  score: number;
  total: number;
  created_at: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestions(siswaList: Siswa[]): Question[] {
  const shuffled = shuffle(siswaList).slice(0, TOTAL_SOAL);
  return shuffled.map((siswa) => {
    const others = siswaList.filter((s) => s.id !== siswa.id);
    const wrongOptions = shuffle(others)
      .slice(0, 3)
      .map((s) => s.nama);
    const allOptions = shuffle([siswa.nama, ...wrongOptions]);
    return {
      siswa,
      options: allOptions,
      correctIndex: allOptions.indexOf(siswa.nama),
    };
  });
}

export function SiapaAkuQuiz() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [blurAmount, setBlurAmount] = useState(12);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [highscore, setHighscore] = useState<number>(0);
  // Leaderboard
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [submitName, setSubmitName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const blurTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const siswaList: Siswa[] = siswaData as Siswa[];

  useEffect(() => {
    const hs = parseInt(localStorage.getItem(HS_KEY) || '0', 10);
    setHighscore(hs);
    // Load leaderboard on mount
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    if (!supabaseReady) return;
    const { data } = await supabase
      .from('quiz_scores')
      .select('*')
      .order('score', { ascending: false })
      .limit(10);
    if (data) setLeaderboard(data as LeaderboardEntry[]);
  };

  const handleSubmitScore = async () => {
    if (!supabaseReady || !submitName.trim() || submitting || submitted) return;
    setSubmitting(true);
    const finalScore = score;
    const { error } = await supabase
      .from('quiz_scores')
      .insert([{ nama: submitName.trim(), score: finalScore, total: TOTAL_SOAL }]);
    if (!error) {
      setSubmitted(true);
      await loadLeaderboard();
    }
    setSubmitting(false);
  };

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (blurTimerRef.current) clearInterval(blurTimerRef.current);
  }, []);

  const goNextQuestion = useCallback(() => {
    setSelectedOption(null);
    setTimeLeft(TIMER_DURATION);
    setBlurAmount(12);

    setCurrentIdx((prev) => {
      const next = prev + 1;
      if (next >= TOTAL_SOAL) {
        setGameState('over');
        return prev;
      }
      setGameState('playing');
      return next;
    });
  }, []);

  const startTimers = useCallback(() => {
    clearTimers();

    // Blur timer: reduce blur by ~1 every 1.2s (12 → 0 in ~14s)
    blurTimerRef.current = setInterval(() => {
      setBlurAmount((prev) => Math.max(0, prev - 1));
    }, 1200);

    // Countdown timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimers();
          setGameState('wrong');
          setTimeout(goNextQuestion, 1200);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimers, goNextQuestion]);

  const startGame = useCallback(() => {
    const q = buildQuestions(siswaList);
    setQuestions(q);
    setCurrentIdx(0);
    setScore(0);
    setTimeLeft(TIMER_DURATION);
    setBlurAmount(12);
    setSelectedOption(null);
    setGameState('playing');
  }, [siswaList]);

  useEffect(() => {
    if (gameState === 'playing') {
      startTimers();
    }
    return () => clearTimers();
  }, [gameState, currentIdx, startTimers, clearTimers]);

  useEffect(() => {
    if (gameState === 'over') {
      clearTimers();
      if (score > highscore) {
        setHighscore(score);
        localStorage.setItem(HS_KEY, String(score));
      }
      // Reset leaderboard submission state for new game
      setSubmitted(false);
      setSubmitName('');
      loadLeaderboard();
    }
  }, [gameState, score, highscore, clearTimers]);

  const handleAnswer = (optionIdx: number) => {
    if (gameState !== 'playing') return;
    clearTimers();
    setSelectedOption(optionIdx);

    const q = questions[currentIdx];
    if (optionIdx === q.correctIndex) {
      setScore((s) => s + 1);
      setBlurAmount(0);
      setGameState('correct');
      setTimeout(goNextQuestion, 1200);
    } else {
      setGameState('wrong');
      setTimeout(goNextQuestion, 1200);
    }
  };

  const getScoreMessage = (s: number) => {
    if (s >= 9) return { msg: '🏆 GENIUS! Kamu kenal semua orang!', color: '#FFD700' };
    if (s >= 7) return { msg: '😎 Mantap! Kamu tahu banyak teman!', color: '#00C853' };
    if (s >= 5) return { msg: '🙂 Lumayan! Masih banyak yang perlu dikenal', color: '#2979FF' };
    if (s >= 3) return { msg: '😅 Hm, teman sekelas sendiri lho...', color: '#FF6D00' };
    return { msg: '😭 Aduh, kenalan dulu yuk sama teman kelas!', color: '#E53935' };
  };

  const currentQ = questions[currentIdx];
  const timerPercent = (timeLeft / TIMER_DURATION) * 100;

  return (
    <>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        @keyframes correctPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        @keyframes timerPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .shake-anim { animation: shake 0.5s ease; }
        .correct-anim { animation: correctPop 0.4s ease; }
        .timer-urgent { animation: timerPulse 0.5s infinite; }

        .option-btn {
          transition: transform 0.1s, box-shadow 0.1s, background 0.15s;
        }
        .option-btn:hover:not(:disabled) {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 #000 !important;
        }
        .option-btn:active:not(:disabled) {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0 #000 !important;
        }
        .game-photo {
          transition: filter 0.8s ease;
        }
        .progress-bar-inner {
          transition: width 1s linear, background-color 0.3s;
        }
      `}</style>

      <div
        className="min-h-screen py-8 px-4 flex flex-col items-center"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
          fontFamily: "'Space Grotesk', 'Inter', sans-serif",
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="inline-block border-4 border-yellow-400 px-8 py-4 mb-2"
            style={{ background: '#1a1a2e', boxShadow: '6px 6px 0 #FFD700' }}
          >
            <h1 className="text-4xl md:text-5xl font-black text-yellow-400 tracking-tight">
              SIAPA AKU? 🕵️
            </h1>
            <p className="text-gray-300 font-bold mt-1">Tebak nama teman dari fotonya!</p>
          </div>
          {highscore > 0 && (
            <div className="mt-2 inline-block border-2 border-yellow-400 px-4 py-1" style={{ background: '#111' }}>
              <span className="text-yellow-400 font-black">🏆 Highscore: {highscore}/{TOTAL_SOAL}</span>
            </div>
          )}
        </div>

        {/* IDLE */}
        {gameState === 'idle' && (
          <div
            className="border-4 border-yellow-400 p-8 text-center max-w-md w-full"
            style={{ background: '#1a1a2e', boxShadow: '8px 8px 0 #FFD700' }}
          >
            <div className="text-6xl mb-4">🎮</div>
            <h2 className="text-2xl font-black text-white mb-3">Cara Main</h2>
            <ul className="text-gray-300 text-left space-y-2 mb-6 font-medium">
              <li>📸 Foto siswa akan ditampilkan dalam keadaan blur</li>
              <li>⏱️ Timer 15 detik per soal</li>
              <li>🔍 Semakin lama menunggu, foto makin jelas</li>
              <li>✅ Jawab benar = +1 poin</li>
              <li>🎯 Total {TOTAL_SOAL} soal</li>
            </ul>
            <button
              onClick={startGame}
              className="w-full border-4 border-yellow-400 py-4 font-black text-xl text-black uppercase"
              style={{ background: '#FFD700', boxShadow: '4px 4px 0 #fff', cursor: 'pointer' }}
            >
              🚀 MULAI GAME!
            </button>
          </div>
        )}

        {/* GAME OVER */}
        {gameState === 'over' && (
          <div className="w-full max-w-lg space-y-4">
            {/* Score card */}
            <div
              className="border-4 border-yellow-400 p-8 text-center"
              style={{ background: '#1a1a2e', boxShadow: '8px 8px 0 #FFD700' }}
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-black text-white mb-4">GAME OVER!</h2>
              <div className="text-7xl font-black mb-4" style={{ color: getScoreMessage(score).color }}>
                {score}/{TOTAL_SOAL}
              </div>
              <p className="text-xl font-bold mb-4 px-4" style={{ color: getScoreMessage(score).color }}>
                {getScoreMessage(score).msg}
              </p>
              {score >= highscore && score > 0 && (
                <div className="border-2 border-yellow-400 px-4 py-2 mb-4 text-yellow-400 font-bold">🎊 NEW HIGHSCORE!</div>
              )}
              <button
                onClick={startGame}
                className="w-full border-4 border-yellow-400 py-4 font-black text-xl text-black uppercase"
                style={{ background: '#FFD700', boxShadow: '4px 4px 0 #fff', cursor: 'pointer' }}
              >
                🔄 Main Lagi!
              </button>
            </div>

            {/* Submit score to global leaderboard */}
            <div
              className="border-4 border-yellow-400 p-5"
              style={{ background: '#1a1a2e', boxShadow: '6px 6px 0 #FFD700' }}
            >
              <h3 className="text-yellow-400 font-black text-lg mb-3">🌍 Global Leaderboard</h3>
              {!submitted ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={submitName}
                    onChange={(e) => setSubmitName(e.target.value.slice(0, 30))}
                    placeholder="Nama kamu..."
                    className="flex-1 border-2 border-yellow-400 px-3 py-2 font-bold text-black"
                    style={{ background: '#fffde7' }}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmitScore()}
                  />
                  <button
                    onClick={handleSubmitScore}
                    disabled={submitting || !submitName.trim()}
                    className="border-2 border-yellow-400 px-4 py-2 font-black text-black uppercase"
                    style={{ background: '#FFD700', cursor: submitting ? 'wait' : 'pointer', opacity: !submitName.trim() ? 0.5 : 1 }}
                  >
                    {submitting ? '...' : 'Submit!'}
                  </button>
                </div>
              ) : (
                <div className="text-green-400 font-black text-sm">✅ Skor kamu masuk leaderboard!</div>
              )}

              {/* Top 10 */}
              {leaderboard.length > 0 && (
                <div className="mt-4 space-y-2">
                  {leaderboard.map((entry, i) => (
                    <div
                      key={entry.id}
                      className="flex items-center gap-3 border-2 border-yellow-400/30 px-3 py-2"
                      style={{ background: i === 0 ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.05)' }}
                    >
                      <span className="font-black w-6 text-center" style={{ color: i === 0 ? '#FFD700' : '#888' }}>
                        {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                      </span>
                      <span className="flex-1 text-white font-bold text-sm truncate">{entry.nama}</span>
                      <span className="font-black text-yellow-400">{entry.score}/{entry.total}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PLAYING */}
        {(gameState === 'playing' || gameState === 'correct' || gameState === 'wrong') &&
          currentQ && (
            <div className="w-full max-w-lg">
              {/* Score + Progress */}
              <div className="flex justify-between items-center mb-4">
                <div className="border-2 border-green-400 px-3 py-1" style={{ background: '#111' }}>
                  <span className="text-green-400 font-black">⭐ {score} poin</span>
                </div>
                <div className="border-2 border-gray-500 px-3 py-1" style={{ background: '#111' }}>
                  <span className="text-gray-300 font-bold">
                    {currentIdx + 1} / {TOTAL_SOAL}
                  </span>
                </div>
              </div>

              {/* Timer bar */}
              <div
                className="border-2 border-gray-500 mb-4 h-4 overflow-hidden"
                style={{ background: '#222' }}
              >
                <div
                  className="progress-bar-inner h-full"
                  style={{
                    width: `${timerPercent}%`,
                    background: timerPercent > 50 ? '#00C853' : timerPercent > 25 ? '#FF6D00' : '#E53935',
                  }}
                />
              </div>
              <div
                className={`text-center mb-2 font-black text-2xl ${timeLeft <= 5 ? 'timer-urgent' : ''}`}
                style={{ color: timerPercent > 50 ? '#00C853' : timerPercent > 25 ? '#FF6D00' : '#E53935' }}
              >
                ⏱️ {timeLeft}s
              </div>

              {/* Photo */}
              <div
                className={`border-4 mb-6 overflow-hidden relative ${
                  gameState === 'correct' ? 'border-green-400 correct-anim' : 
                  gameState === 'wrong' ? 'border-red-500 shake-anim' : 
                  'border-yellow-400'
                }`}
                style={{
                  boxShadow: gameState === 'correct' 
                    ? '6px 6px 0 #00C853' 
                    : gameState === 'wrong' 
                    ? '6px 6px 0 #E53935' 
                    : '6px 6px 0 #FFD700',
                  height: '280px',
                  background: '#111',
                }}
              >
                <img
                  src={currentQ.siswa.fotoUrl}
                  alt="Siapa ini?"
                  className="game-photo w-full h-full object-cover object-top"
                  style={{
                    filter: `blur(${gameState === 'correct' ? 0 : blurAmount}px)`,
                  }}
                />
                {gameState === 'correct' && (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: 'rgba(0, 200, 83, 0.3)' }}
                  >
                    <span className="text-7xl">✅</span>
                  </div>
                )}
                {gameState === 'wrong' && (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: 'rgba(229, 57, 53, 0.3)' }}
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-2">❌</div>
                      <div className="text-white font-black text-lg px-4 py-2" style={{ background: 'rgba(0,0,0,0.8)' }}>
                        {currentQ.siswa.nama}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-3">
                {currentQ.options.map((opt, idx) => {
                  let btnStyle: React.CSSProperties = {
                    background: '#1a1a2e',
                    boxShadow: '4px 4px 0 #FFD700',
                    cursor: gameState !== 'playing' ? 'default' : 'pointer',
                  };
                  let borderClass = 'border-yellow-400';

                  if (selectedOption !== null || gameState === 'wrong') {
                    if (idx === currentQ.correctIndex) {
                      btnStyle.background = '#00C853';
                      btnStyle.boxShadow = '4px 4px 0 #00C853';
                      borderClass = 'border-green-400';
                    } else if (idx === selectedOption && selectedOption !== currentQ.correctIndex) {
                      btnStyle.background = '#E53935';
                      btnStyle.boxShadow = '4px 4px 0 #E53935';
                      borderClass = 'border-red-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={gameState !== 'playing'}
                      className={`option-btn border-3 border-${borderClass} px-3 py-4 font-black text-white text-sm text-left`}
                      style={{ ...btnStyle, borderWidth: '3px', borderColor: borderClass.includes('green') ? '#00C853' : borderClass.includes('red') ? '#E53935' : '#FFD700' }}
                    >
                      <span className="text-gray-400 mr-2">{['A', 'B', 'C', 'D'][idx]}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
      </div>
    </>
  );
}

export default SiapaAkuQuiz;

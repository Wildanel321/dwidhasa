import { useState, useEffect, useRef } from 'react';
import { RefreshCw, Sparkles } from 'lucide-react';
import siswaData from '../data/siswa.json';

/* ─── Injected CSS Keyframes ─────────────────────────────────────────────── */
const STYLES = `
  @keyframes floatCard0 {
    0%,100% { transform: translateY(0px) rotate(var(--r)); }
    33%      { transform: translateY(-18px) rotate(calc(var(--r) + 1.5deg)); }
    66%      { transform: translateY(-8px)  rotate(calc(var(--r) - 0.8deg)); }
  }
  @keyframes floatCard1 {
    0%,100% { transform: translateY(0px) rotate(var(--r)); }
    40%      { transform: translateY(-22px) rotate(calc(var(--r) - 2deg)); }
    70%      { transform: translateY(-10px) rotate(calc(var(--r) + 1deg)); }
  }
  @keyframes floatCard2 {
    0%,100% { transform: translateY(-6px) rotate(var(--r)); }
    50%      { transform: translateY(10px) rotate(calc(var(--r) + 1.2deg)); }
  }

  @keyframes cloudFall {
    0%   { transform: translateY(-220px) translateX(0px) scale(var(--cs)); opacity: 0; }
    8%   { opacity: var(--co); }
    92%  { opacity: var(--co); }
    100% { transform: translateY(120%) translateX(var(--cx)) scale(var(--cs)); opacity: 0; }
  }

  @keyframes cloudDrift {
    0%,100% { transform: translateX(0px); }
    50%     { transform: translateX(var(--cd)); }
  }

  @keyframes particleRise {
    0%   { transform: translateY(0px) translateX(0px) scale(0.6); opacity: 0; }
    10%  { opacity: var(--po); }
    85%  { opacity: var(--po); }
    100% { transform: translateY(-110%) translateX(var(--px)) scale(1.8); opacity: 0; }
  }

  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }

  .fq-shimmer {
    background: linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.55) 50%, transparent 75%);
    background-size: 200% auto;
    animation: shimmer 3s linear infinite;
  }

  .fq-card-hover:hover {
    filter: brightness(1.06) saturate(1.15);
  }
`;

/* ─── Types ────────────────────────────────────────────────────────────────── */
interface CloudDef {
  id: number;
  left: string;
  scale: number;
  opacity: number;
  duration: string;
  delay: string;
  driftX: string;
  driftDuration: string;
  driftDelay: string;
}

interface ParticleDef {
  id: number;
  left: string;
  bottom: string;
  size: number;
  color: string;
  opacity: number;
  duration: string;
  delay: string;
  driftX: string;
}

interface CardDef {
  id: number;
  nama: string;
  quote: string;
  /* absolute position within container */
  top: string;
  left: string;
  width: string;
  height: string;
  rotate: number;
  floatAnim: number;   // 0,1,2 → pick keyframe variant
  floatDur: string;
  floatDelay: string;
  bg: string;
  border: string;
  textCol: string;
  shape: 'rect' | 'wide' | 'tall' | 'square';
  zIndex: number;
}

/* ─── Constants ────────────────────────────────────────────────────────────── */
const CARD_THEMES = [
  { bg: '#fde68a', border: '#92400e', textCol: '#1c1917' }, // amber
  { bg: '#f9a8d4', border: '#9d174d', textCol: '#1c1917' }, // pink
  { bg: '#bbf7d0', border: '#166534', textCol: '#1c1917' }, // green
  { bg: '#a5f3fc', border: '#155e75', textCol: '#1c1917' }, // cyan
  { bg: '#c4b5fd', border: '#4c1d95', textCol: '#1c1917' }, // purple
  { bg: '#fed7aa', border: '#9a3412', textCol: '#1c1917' }, // orange
  { bg: '#bfdbfe', border: '#1e3a5f', textCol: '#1c1917' }, // blue
  { bg: '#fecaca', border: '#7f1d1d', textCol: '#1c1917' }, // red
];

const PARTICLE_COLORS = [
  'rgba(255,255,255,0.85)',
  'rgba(186,230,253,0.9)',
  'rgba(216,180,254,0.8)',
  'rgba(167,243,208,0.9)',
  'rgba(253,224,130,0.85)',
];

const SHAPES: CardDef['shape'][] = ['rect', 'wide', 'tall', 'square'];

function rnd(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ─── Generate helpers ─────────────────────────────────────────────────────── */
function genClouds(): CloudDef[] {
  return Array.from({ length: 9 }).map((_, i) => ({
    id: i,
    left: `${rnd(0, 95)}%`,
    scale: rnd(0.5, 1.4),
    opacity: rnd(0.18, 0.50),
    duration: `${rnd(18, 40).toFixed(1)}s`,
    delay: `${rnd(-30, 0).toFixed(1)}s`,
    driftX: `${rnd(-40, 40).toFixed(0)}px`,
    driftDuration: `${rnd(6, 14).toFixed(1)}s`,
    driftDelay: `${rnd(-8, 0).toFixed(1)}s`,
  }));
}

function genParticles(): ParticleDef[] {
  return Array.from({ length: 45 }).map((_, i) => ({
    id: i,
    left: `${rnd(0, 100)}%`,
    bottom: `${rnd(0, 5)}%`,
    size: rnd(2, 7),
    color: pick(PARTICLE_COLORS),
    opacity: rnd(0.4, 0.9),
    duration: `${rnd(7, 18).toFixed(1)}s`,
    delay: `${rnd(-15, 0).toFixed(1)}s`,
    driftX: `${rnd(-60, 60).toFixed(0)}px`,
  }));
}

function genCards(students: typeof siswaData): CardDef[] {
  const eligible = students.filter(s => s.quote && s.quote.trim().length > 3);
  const shuffled = [...eligible].sort(() => Math.random() - 0.5).slice(0, 8);

  // We lay cards out in a pseudo-random absolute position grid
  // Divide container into a 4×2 grid of rough cells for non-overlapping base positions
  const cells = [
    { cx: 2,  cy: 5  },
    { cx: 28, cy: 2  },
    { cx: 55, cy: 6  },
    { cx: 76, cy: 3  },
    { cx: 5,  cy: 52 },
    { cx: 30, cy: 49 },
    { cx: 57, cy: 53 },
    { cx: 75, cy: 50 },
  ];

  const shapeDims: Record<CardDef['shape'], { w: string; h: string }> = {
    rect:   { w: '220px', h: '200px' },
    wide:   { w: '280px', h: '160px' },
    tall:   { w: '190px', h: '240px' },
    square: { w: '210px', h: '210px' },
  };

  return shuffled.map((s, idx) => {
    const theme = CARD_THEMES[idx % CARD_THEMES.length];
    const shape = SHAPES[idx % SHAPES.length];
    const cell = cells[idx];
    const jitterX = rnd(-4, 4);
    const jitterY = rnd(-3, 3);

    return {
      id: s.id,
      nama: s.nama,
      quote: s.quote,
      top: `${(cell.cy + jitterY).toFixed(1)}%`,
      left: `${(cell.cx + jitterX).toFixed(1)}%`,
      width: shapeDims[shape].w,
      height: shapeDims[shape].h,
      rotate: rnd(-6, 6),
      floatAnim: idx % 3,
      floatDur: `${rnd(5, 9).toFixed(1)}s`,
      floatDelay: `${rnd(0, 3).toFixed(1)}s`,
      bg: theme.bg,
      border: theme.border,
      textCol: theme.textCol,
      shape,
      zIndex: 10 + idx,
    };
  });
}

/* ─── Cloud SVG ────────────────────────────────────────────────────────────── */
function CloudShape({ opacity }: { opacity: number }) {
  return (
    <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="100" cy="85" rx="90" ry="35" fill={`rgba(255,255,255,${opacity + 0.15})`} />
      <ellipse cx="70"  cy="70" rx="50" ry="38" fill={`rgba(255,255,255,${opacity + 0.05})`} />
      <ellipse cx="125" cy="65" rx="45" ry="35" fill={`rgba(255,255,255,${opacity + 0.10})`} />
      <ellipse cx="95"  cy="55" rx="38" ry="30" fill={`rgba(255,255,255,${opacity + 0.20})`} />
    </svg>
  );
}

/* ─── Main Component ────────────────────────────────────────────────────────── */
export function FloatingQuotes() {
  const [cards, setCards] = useState<CardDef[]>([]);
  const [clouds] = useState<CloudDef[]>(genClouds);
  const [particles] = useState<ParticleDef[]>(genParticles);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerH, setContainerH] = useState(620);

  const shuffle = () => setCards(genCards(siswaData));

  useEffect(() => {
    shuffle();
  }, []);

  // Dynamically size container so all cards are visible
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver(() => {
      const w = containerRef.current?.offsetWidth ?? 0;
      // Taller on narrow screens
      setContainerH(w < 768 ? 1200 : 640);
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-16 overflow-hidden transition-colors duration-500">
      <style>{STYLES}</style>

      <div className="container mx-auto px-4 md:px-8">
        {/* ── Outer Box ── */}
        <div
          className="relative overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, #0ea5e9 0%, #6366f1 40%, #a855f7 70%, #ec4899 100%)',
            border: '5px solid #000',
            boxShadow: '8px 8px 0 #000',
          }}
        >
          {/* Noise overlay for texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'300\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'300\' height=\'300\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
              opacity: 0.25,
            }}
          />

          {/* ── Falling Clouds Layer ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {clouds.map(c => (
              <div
                key={c.id}
                className="absolute"
                style={{
                  left: c.left,
                  top: 0,
                  width: `${c.scale * 140}px`,
                  height: `${c.scale * 85}px`,
                  animation: `cloudFall ${c.duration} linear infinite`,
                  animationDelay: c.delay,
                  ['--cs' as any]: c.scale,
                  ['--co' as any]: c.opacity,
                  ['--cx' as any]: c.driftX,
                }}
              >
                {/* inner drift */}
                <div
                  style={{
                    animation: `cloudDrift ${c.driftDuration} ease-in-out infinite alternate`,
                    animationDelay: c.driftDelay,
                    ['--cd' as any]: c.driftX,
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <CloudShape opacity={c.opacity} />
                </div>
              </div>
            ))}
          </div>

          {/* ── Atmospheric Particles Layer ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map(p => (
              <div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  left: p.left,
                  bottom: p.bottom,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  background: p.color,
                  boxShadow: `0 0 ${p.size * 3}px ${p.size}px ${p.color}`,
                  animation: `particleRise ${p.duration} ease-in-out infinite`,
                  animationDelay: p.delay,
                  ['--po' as any]: p.opacity,
                  ['--px' as any]: p.driftX,
                }}
              />
            ))}
          </div>

          {/* ── Content (above fx layers) ── */}
          <div className="relative z-10 p-6 md:p-10">

            {/* ── Header row ── */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div
                className="inline-flex items-center gap-3 px-5 py-3"
                style={{
                  background: '#facc15',
                  border: '4px solid #000',
                  boxShadow: '4px 4px 0 #000',
                  transform: 'rotate(-1.5deg)',
                }}
              >
                <Sparkles className="w-7 h-7 text-black animate-pulse" />
                <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tighter leading-none">
                  Quotes Kelas XII.2
                </h2>
              </div>

              <button
                onClick={shuffle}
                className="fq-card-hover inline-flex items-center gap-2 px-5 py-3 font-black text-black uppercase transition-all active:translate-x-1 active:translate-y-1"
                style={{
                  background: '#f0abfc',
                  border: '4px solid #000',
                  boxShadow: '4px 4px 0 #000',
                  transition: 'box-shadow .15s, transform .15s',
                }}
                onMouseDown={e => (e.currentTarget.style.boxShadow = 'none')}
                onMouseUp={e => (e.currentTarget.style.boxShadow = '4px 4px 0 #000')}
              >
                <RefreshCw className="w-5 h-5" />
                Acak Quote
              </button>
            </div>

            {/* ── Cards Wrapper (relative + fixed height so cards can be absolute) ── */}
            <div
              ref={containerRef}
              className="relative w-full"
              style={{ height: `${containerH}px` }}
            >
              {cards.map(card => (
                <div
                  key={card.id}
                  className="absolute fq-card-hover cursor-default select-none"
                  style={{
                    top: card.top,
                    left: card.left,
                    width: card.width,
                    height: card.height,
                    zIndex: card.zIndex,
                    animation: `floatCard${card.floatAnim} ${card.floatDur} ease-in-out infinite`,
                    animationDelay: card.floatDelay,
                    ['--r' as any]: `${card.rotate}deg`,
                    transform: `rotate(${card.rotate}deg)`,
                    transition: 'filter .2s',
                  }}
                >
                  {/* Shadow block */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: '#000',
                      transform: 'translate(5px, 5px)',
                      border: `4px solid #000`,
                    }}
                  />

                  {/* Card face */}
                  <div
                    className="absolute inset-0 flex flex-col justify-between overflow-hidden"
                    style={{
                      background: card.bg,
                      border: `4px solid ${card.border}`,
                    }}
                  >
                    {/* Shimmer overlay */}
                    <div className="fq-shimmer absolute inset-0 pointer-events-none" />

                    {/* Quote text */}
                    <div className="relative flex-1 p-4 overflow-hidden">
                      <span
                        className="absolute top-2 left-3 font-black select-none"
                        style={{ fontSize: '3.5rem', lineHeight: 1, color: `${card.border}30` }}
                      >
                        "
                      </span>
                      <p
                        className="relative text-xs font-bold leading-relaxed italic pt-5"
                        style={{
                          color: card.textCol,
                          display: '-webkit-box',
                          WebkitLineClamp: card.shape === 'wide' ? 4 : 6,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {card.quote}
                      </p>
                    </div>

                    {/* Name footer */}
                    <div
                      className="px-4 py-2 flex flex-col"
                      style={{
                        background: `${card.border}22`,
                        borderTop: `2px solid ${card.border}66`,
                      }}
                    >
                      <span
                        className="text-[10px] font-black uppercase tracking-widest"
                        style={{ color: `${card.border}99` }}
                      >
                        — by
                      </span>
                      <span
                        className="text-xs font-black uppercase truncate"
                        style={{ color: card.border }}
                        title={card.nama}
                      >
                        {card.nama}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

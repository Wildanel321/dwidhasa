import { useState, useEffect } from 'react';
import { Quote, RefreshCw, Cloud, Sparkles } from 'lucide-react';
import siswaData from '../data/siswa.json';

// Injected styles for the falling clouds, atmospheric particles, and floating cards
const customStyles = `
  @keyframes floatCard {
    0%, 100% {
      transform: translateY(0px) rotate(var(--rotate-deg));
    }
    50% {
      transform: translateY(-16px) rotate(calc(var(--rotate-deg) + 1.5deg));
    }
  }

  @keyframes fallCloud {
    0% {
      transform: translateY(-150px) translateX(var(--drift-start));
      opacity: 0;
    }
    10% {
      opacity: var(--base-opacity);
    }
    90% {
      opacity: var(--base-opacity);
    }
    100% {
      transform: translateY(850px) translateX(var(--drift-end));
      opacity: 0;
    }
  }

  @keyframes driftParticle {
    0% {
      transform: translateY(700px) translateX(0) scale(0.8);
      opacity: 0;
    }
    10% {
      opacity: 0.7;
    }
    90% {
      opacity: 0.7;
    }
    100% {
      transform: translateY(-50px) translateX(var(--drift-x)) scale(1.6);
      opacity: 0;
    }
  }
`;

interface CloudConfig {
  id: number;
  left: string;
  driftStart: string;
  driftEnd: string;
  baseOpacity: number;
  duration: string;
  delay: string;
  scale: number;
}

interface ParticleConfig {
  id: number;
  left: string;
  driftX: string;
  duration: string;
  delay: string;
  size: number;
}

interface QuoteCard {
  id: number;
  nama: string;
  quote: string;
  bgClass: string;
  rotate: number;
  duration: string;
  delay: string;
}

const colors = [
  'bg-brutalist-pink',
  'bg-brutalist-yellow',
  'bg-brutalist-lime',
  'bg-brutalist-blue',
  'bg-brutalist-purple',
];

export function FloatingQuotes() {
  const [activeQuotes, setActiveQuotes] = useState<QuoteCard[]>([]);
  const [clouds, setClouds] = useState<CloudConfig[]>([]);
  const [particles, setParticles] = useState<ParticleConfig[]>([]);

  // Function to select 8 random quotes from the student database
  const loadRandomQuotes = () => {
    // Filter out students with very short quotes or empty quotes
    const eligibleStudents = siswaData.filter(s => s.quote && s.quote.trim().length > 2);
    
    // Shuffle and pick 8
    const shuffled = [...eligibleStudents].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 8);

    const cards: QuoteCard[] = selected.map((s, idx) => {
      // Pick random background color
      const bgClass = colors[idx % colors.length];
      // Random rotation between -4deg and 4deg
      const rotate = Math.floor(Math.random() * 9) - 4; // -4 to 4
      // Random animation duration between 5s and 8s
      const duration = `${(Math.random() * 3 + 5).toFixed(1)}s`;
      // Random delay
      const delay = `${(Math.random() * 2).toFixed(1)}s`;

      return {
        id: s.id,
        nama: s.nama,
        quote: s.quote,
        bgClass,
        rotate,
        duration,
        delay,
      };
    });

    setActiveQuotes(cards);
  };

  // Generate clouds & particles on mount
  useEffect(() => {
    loadRandomQuotes();

    // Generate clouds config
    const generatedClouds: CloudConfig[] = Array.from({ length: 6 }).map((_, idx) => ({
      id: idx,
      left: `${idx * 18 + 5 + Math.random() * 5}%`,
      driftStart: `${(Math.random() * 40 - 20).toFixed(0)}px`,
      driftEnd: `${(Math.random() * 60 - 30).toFixed(0)}px`,
      baseOpacity: Number((Math.random() * 0.3 + 0.3).toFixed(2)),
      duration: `${(Math.random() * 15 + 20).toFixed(0)}s`,
      delay: `${(Math.random() * -15).toFixed(0)}s`, // Negative delay to start immediately mid-animation
      scale: Number((Math.random() * 0.8 + 0.6).toFixed(2)),
    }));
    setClouds(generatedClouds);

    // Generate particles config
    const generatedParticles: ParticleConfig[] = Array.from({ length: 30 }).map((_, idx) => ({
      id: idx,
      left: `${Math.random() * 100}%`,
      driftX: `${(Math.random() * 80 - 40).toFixed(0)}px`,
      duration: `${(Math.random() * 8 + 8).toFixed(0)}s`,
      delay: `${(Math.random() * -10).toFixed(0)}s`,
      size: Math.floor(Math.random() * 4) + 3, // 3px to 6px
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <section className="py-12 transition-colors duration-500 overflow-hidden">
      <style>{customStyles}</style>

      <div className="container mx-auto px-6">
        {/* Dedicated Box Container with Neobrutalism Border & Separate Theme */}
        <div className="relative bg-gradient-to-b from-[#7dd3fc] via-[#a5b4fc] to-[#c084fc] dark:from-dark-200 dark:via-purple-950 dark:to-indigo-950 border-8 border-black p-8 md:p-12 shadow-brutalist-lg overflow-hidden rounded-none">
          
          {/* Ambient Atmospherics */}
          {/* Clouds */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {clouds.map(cloud => (
              <div
                key={cloud.id}
                className="absolute text-white dark:text-sky-200/40"
                style={{
                  left: cloud.left,
                  top: 0,
                  transform: `scale(${cloud.scale})`,
                  animation: `fallCloud ${cloud.duration} linear infinite`,
                  animationDelay: cloud.delay,
                  // Custom properties for keyframe interpolations
                  ['--drift-start' as any]: cloud.driftStart,
                  ['--drift-end' as any]: cloud.driftEnd,
                  ['--base-opacity' as any]: cloud.baseOpacity,
                }}
              >
                <Cloud className="w-24 h-24 fill-current drop-shadow-md" />
              </div>
            ))}
          </div>

          {/* Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map(p => (
              <div
                key={p.id}
                className="absolute bg-white dark:bg-yellow-200 rounded-full"
                style={{
                  left: p.left,
                  top: 0,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.4)',
                  animation: `driftParticle ${p.duration} ease-in-out infinite`,
                  animationDelay: p.delay,
                  ['--drift-x' as any]: p.driftX,
                }}
              />
            ))}
          </div>

          {/* Section Content (Z-Index is higher to sit on top of clouds & particles) */}
          <div className="relative z-10 flex flex-col items-center">
            
            {/* Neobrutalist Title */}
            <div className="flex flex-col md:flex-row items-center justify-between w-full mb-12 gap-6">
              <div className="inline-flex items-center gap-3 bg-brutalist-lime border-4 border-black px-6 py-3 shadow-brutalist -rotate-1">
                <Sparkles className="w-8 h-8 text-black animate-spin" style={{ animationDuration: '6s' }} />
                <h2 className="text-2xl md:text-4xl font-black text-black uppercase tracking-tighter">
                  Quotes
                </h2>
              </div>

              {/* Shuffle button */}
              <button
                onClick={loadRandomQuotes}
                className="flex items-center gap-2 px-6 py-3 bg-brutalist-yellow border-4 border-black font-black text-black shadow-brutalist hover:bg-brutalist-pink active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                title="Acak Kutipan"
              >
                <RefreshCw className="w-5 h-5 font-black text-black" />
                <span>ACAK QUOTE</span>
              </button>
            </div>

            {/* Grid of Floating Quote Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full mt-4">
              {activeQuotes.map((card) => (
                <div
                  key={card.id}
                  className="relative group transition-transform duration-300 hover:scale-105"
                  style={{
                    animation: `floatCard ${card.duration} ease-in-out infinite`,
                    animationDelay: card.delay,
                    ['--rotate-deg' as any]: `${card.rotate}deg`,
                  }}
                >
                  {/* Card Shadow */}
                  <div className="absolute inset-0 bg-brutalist-black translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3" />
                  
                  {/* Card Box */}
                  <div className={`relative ${card.bgClass} border-4 border-black p-6 flex flex-col justify-between h-64 shadow-brutalist`}>
                    <div className="relative">
                      <Quote className="w-8 h-8 text-black/20 absolute -top-4 -left-3" />
                      <p className="text-sm font-bold text-black italic line-clamp-6 relative z-10 pt-2 leading-relaxed">
                        "{card.quote}"
                      </p>
                    </div>

                    <div className="pt-4 border-t-2 border-black/10 flex flex-col">
                      <span className="text-xs font-black text-black/50 uppercase tracking-wider">
                        Kutipan Oleh:
                      </span>
                      <span className="text-sm font-black text-black uppercase tracking-tighter truncate" title={card.nama}>
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

import { Globe, BookOpen, Trophy } from 'lucide-react';

export function KuisLink() {
  return (
    <>
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 6px 6px 0 #000, 0 0 15px rgba(96, 165, 250, 0.4); }
          50% { box-shadow: 6px 6px 0 #000, 0 0 30px rgba(96, 165, 250, 0.8); }
        }
        @keyframes floatEffect {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(0.5deg); }
        }
        .kuis-btn {
          animation: pulseGlow 2.5s ease-in-out infinite;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .kuis-btn:hover {
          transform: translate(-3px, -3px);
          box-shadow: 8px 8px 0 #000 !important;
        }
        .kuis-btn:active {
          transform: translate(3px, 3px);
          box-shadow: 2px 2px 0 #000 !important;
        }
        .retro-card {
          animation: floatEffect 5s ease-in-out infinite;
        }
        .scanlines {
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%, 
            rgba(0, 0, 0, 0.25) 50%
          ), linear-gradient(
            90deg, 
            rgba(255, 0, 0, 0.06), 
            rgba(0, 255, 0, 0.02), 
            rgba(0, 0, 255, 0.06)
          );
          background-size: 100% 4px, 6px 100%;
        }
      `}</style>

      <div
        className="py-12 px-4 flex flex-col items-center justify-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #090d16 0%, #05070c 100%)',
          fontFamily: "'Space Grotesk', 'Inter', sans-serif",
        }}
      >
        {/* Background decorations */}
        <div className="absolute top-10 left-10 text-6xl opacity-10 select-none">🧭</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-10 select-none">🗺️</div>

        {/* Header */}
        <div className="text-center mb-8 z-10">
          <h2
            className="text-4xl md:text-5xl font-black tracking-tighter mb-2 uppercase"
            style={{
              color: '#60A5FA',
              textShadow: '0 0 20px rgba(96, 165, 250, 0.6), 0 0 40px rgba(96, 165, 250, 0.3)',
            }}
          >
            ⚡ KUIS WAWASAN GLOBAL ⚡
          </h2>
          <p className="text-gray-400 font-bold text-base md:text-lg">
            Uji pengetahuan geografi & sejarah dunia kelas kita!
          </p>
        </div>

        {/* Console / Card */}
        <div
          className="retro-card relative border-4 border-black p-6 md:p-8 max-w-2xl w-full bg-brutalist-yellow text-black"
          style={{
            boxShadow: '8px 8px 0 #000',
          }}
        >
          {/* Top Info Bar */}
          <div className="flex items-center justify-between border-b-4 border-black pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-brutalist-red border-2 border-black animate-ping" />
              <span className="font-mono text-xs font-bold tracking-widest uppercase">LIVE ON: QUIZZ.DWIDHASA.MY.ID</span>
            </div>
            <span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5 border border-black">
              V1.0.0
            </span>
          </div>

          {/* Banner Image / Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-black leading-none uppercase">
                Kuis Ibu Kota & Sejarah Dunia
              </h3>
              <p className="text-sm font-bold leading-relaxed text-gray-800">
                Seberapa jauh kamu mengenal dunia? Uji wawasanmu dengan menebak ibu kota berbagai negara dan peristiwa penting sejarah dunia di platform kuis interaktif yang keren.
              </p>
              
              {/* Feature Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="inline-flex items-center gap-1 text-xs font-extrabold bg-brutalist-white border-2 border-black px-2.5 py-1 shadow-brutalist-hover">
                  <Globe className="w-3.5 h-3.5" /> Geografi
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-extrabold bg-brutalist-pink border-2 border-black px-2.5 py-1 shadow-brutalist-hover">
                  <BookOpen className="w-3.5 h-3.5" /> Sejarah
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-extrabold bg-brutalist-lime border-2 border-black px-2.5 py-1 shadow-brutalist-hover">
                  <Trophy className="w-3.5 h-3.5" /> Skor Realtime
                </span>
              </div>
            </div>

            {/* Vintage style preview mockup */}
            <div className="relative border-4 border-black bg-dark-200 text-teal-400 p-4 h-48 flex flex-col justify-between overflow-hidden shadow-brutalist-hover scanlines">
              <div className="text-xs font-mono opacity-80 flex justify-between">
                <span>[ STATUS: ACTIVE ]</span>
                <span>COMPASS v0.9</span>
              </div>
              <div className="text-center my-auto py-2">
                <span className="text-4xl block mb-1">🗺️</span>
                <span className="font-mono text-xs block font-bold text-white uppercase tracking-wider">
                  Kuis Ibu Kota & Sejarah
                </span>
                <span className="font-mono text-[10px] text-gray-400 block mt-1">
                  quizz.dwidhasa.my.id
                </span>
              </div>
              <div className="text-[10px] font-mono opacity-80 flex justify-between border-t border-gray-800 pt-2 text-white">
                <span>SEBARAN SKOR LIVE</span>
                <span>ENTER &gt;_</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8">
            <a
              href="https://quizz.dwidhasa.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="kuis-btn block text-center w-full py-4 bg-brutalist-blue text-black font-black text-xl md:text-2xl uppercase tracking-widest border-4 border-black"
              style={{
                boxShadow: '6px 6px 0 #000',
              }}
            >
              🎮 MAIN SEKARANG!
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default KuisLink;

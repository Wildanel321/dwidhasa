import { useState, useEffect } from 'react';
import { Quote, ArrowRight } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [timeLeft, setTimeLeft] = useState(15);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Timer interval to decrement timeLeft every second
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Frame-rate interval for smooth progress bar transition (updates every 50ms)
    const totalDuration = 15000; // 15 seconds
    const intervalTime = 50;
    let elapsed = 0;
    
    const progressInterval = setInterval(() => {
      elapsed += intervalTime;
      const percentage = Math.max(0, 100 - (elapsed / totalDuration) * 100);
      setProgress(percentage);
      
      if (elapsed >= totalDuration) {
        clearInterval(progressInterval);
      }
    }, intervalTime);

    return () => {
      clearInterval(timerInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-brutalist-black flex flex-col items-center justify-center p-4 overflow-y-auto">
      {/* Background Dots */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Large Neobrutalist Quote Card */}
      <div className="relative w-full max-w-3xl bg-brutalist-white dark:bg-dark-50 border-8 border-black p-6 md:p-8 shadow-brutalist-lg flex flex-col md:flex-row gap-8 items-center md:items-stretch z-10 animate-scale-in">
        
        {/* Photo Container */}
        <div className="relative w-full md:w-80 aspect-[3/4] overflow-hidden border-4 border-black bg-black shadow-brutalist shrink-0">
          <img
            src="https://i.ibb.co/SYQFVVh/ali.jpg"
            alt="Motto Wisuda"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-brutalist-blue border-2 border-black px-3 py-1 font-black text-[10px] text-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            SPECIAL INSPIRATION
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-between flex-grow w-full text-left">
          <div>
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 bg-brutalist-pink border-2 border-black px-4 py-1.5 font-black text-xs text-black uppercase tracking-widest mb-6 rotate-[-1deg] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span>MUTIARA HATI</span>
            </div>

            {/* Quote with decorative icon */}
            <div className="relative mb-6">
              <Quote className="w-12 h-12 text-brutalist-pink/20 absolute -top-6 -left-4 transform -rotate-6 scale-150" />
              <p className="text-xl md:text-2xl font-black text-black dark:text-white leading-relaxed italic relative z-10 pl-6 border-l-4 border-brutalist-yellow">
                "Jika kamu berusaha melupakan seseorang namun hati dan juga pikiranmu masih menyebut namanya, Itu tandanya orang tersebut mencintaimu"
              </p>
              <p className="text-right text-sm font-black text-black/60 dark:text-white/60 mt-3 uppercase tracking-wider">
                — Ali Bin Abi Thalib
              </p>
            </div>
          </div>

          {/* Progress and Skip Action */}
          <div className="mt-8">
            {/* Smooth Progress Bar */}
            <div className="w-full h-6 bg-gray-200 dark:bg-dark-200 border-4 border-black relative overflow-hidden mb-4">
              <div 
                className="h-full bg-brutalist-lime border-r-4 border-black transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center font-black text-xs text-black uppercase tracking-widest">
                Memasuki website dalam {timeLeft} detik...
              </span>
            </div>

            {/* Skip Button */}
            <button
              onClick={onComplete}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brutalist-yellow hover:bg-brutalist-lime border-4 border-black font-black text-black shadow-brutalist hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:translate-x-2 active:translate-y-2 transition-all text-base uppercase tracking-wider"
            >
              <span>MASUK SEKARANG</span>
              <ArrowRight className="w-5 h-5 font-black text-black" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

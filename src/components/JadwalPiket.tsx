import { Sparkles } from 'lucide-react';
import piketData from '../data/piket.json';

export function JadwalPiket() {
  return (
    <section id="piket" className="py-24 transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <div className="inline-flex items-center gap-4 bg-brutalist-yellow border-4 border-black px-8 py-3 shadow-brutalist rotate-1 mb-4">
             <Sparkles className="w-10 h-10 text-black" />
             <h2 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter">
              CLEAN SQUAD
            </h2>
          </div>
          <p className="text-xl font-bold text-black dark:text-gray-300 uppercase tracking-widest italic">Ready to make the class shine</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {piketData.map((kelompok, index) => (
            <div
              key={kelompok.hari}
              className="group relative"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3" />
              <div className="relative bg-brutalist-white dark:bg-dark-100 border-4 border-black overflow-hidden h-full">
                <div className={`${index % 2 === 0 ? 'bg-brutalist-pink' : 'bg-brutalist-blue'} border-b-4 border-black p-6`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-black uppercase tracking-tighter">
                      DAY: {kelompok.hari}
                    </h3>
                    <div className="w-10 h-10 bg-white border-2 border-black rotate-12 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-black" />
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white dark:bg-dark-100">
                  <ul className="space-y-4">
                    {kelompok.anggota.map((nama, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-black dark:text-white font-bold"
                      >
                        <div className="w-4 h-4 bg-brutalist-lime border-2 border-black" />
                        <span className="uppercase text-sm tracking-tight">{nama}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

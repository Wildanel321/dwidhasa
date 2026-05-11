import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import jadwalData from '../data/jadwal.json';

type Hari = 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat';

const jadwal: Record<Hari, typeof jadwalData.Senin> = jadwalData;

export function JadwalPelajaran() {
  const days: Hari[] = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
  const [selectedDay, setSelectedDay] = useState<Hari>('Senin');

  return (
    <section id="jadwal" className="py-24 transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div>
            <div className="inline-block bg-brutalist-lime border-4 border-black px-6 py-2 shadow-brutalist mb-4 -rotate-1">
              <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">
                STUDY TIME
              </h2>
            </div>
            <p className="text-xl font-bold text-black dark:text-gray-300">WAKTU BELAJAR: 07:00 - 15:00</p>
          </div>
          <Calendar className="w-20 h-20 text-brutalist-pink hidden md:block" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-8 py-4 border-4 border-black font-black uppercase transition-all duration-200 whitespace-nowrap ${
                  selectedDay === day
                    ? 'bg-brutalist-yellow translate-x-1 translate-y-1 shadow-none'
                    : 'bg-brutalist-white dark:bg-dark-50 text-black dark:text-white shadow-brutalist hover:shadow-brutalist-hover hover:translate-x-0.5 hover:translate-y-0.5'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="space-y-6 animate-fade-in">
            {jadwal[selectedDay].map((pelajaran, index) => (
              <div
                key={index}
                className="relative group"
              >
                <div className="absolute inset-0 bg-black translate-x-2 translate-y-2" />
                <div className="relative bg-brutalist-white dark:bg-dark-50 border-4 border-black p-6 hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-brutalist-purple border-4 border-black flex items-center justify-center text-black font-black text-2xl shadow-brutalist group-hover:rotate-6 transition-transform">
                    {pelajaran.urutan}
                  </div>

                  <div className="flex-grow text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-black text-black dark:text-white uppercase tracking-tighter mb-1">
                      {pelajaran.mataPelajaran}
                    </h3>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-black/60 dark:text-white/60 font-bold uppercase text-sm">
                      <Clock className="w-5 h-5" />
                      <span>
                        {pelajaran.waktuMulai} - {pelajaran.waktuSelesai}
                      </span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 bg-brutalist-blue border-2 border-black px-4 py-2 shadow-brutalist">
                    <p className="text-xs font-black text-black uppercase">90 MIN SESSION</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

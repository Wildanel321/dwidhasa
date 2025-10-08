import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import jadwalData from '../data/jadwal.json';

type Hari = 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat';

const jadwal: Record<Hari, typeof jadwalData.Senin> = jadwalData;

export function JadwalPelajaran() {
  const days: Hari[] = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
  const [selectedDay, setSelectedDay] = useState<Hari>('Senin');

  return (
    <section id="jadwal" className="py-20 bg-white dark:bg-dark-100 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="w-10 h-10 text-primary-600 dark:text-primary-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-primary-700 dark:text-primary-300">
              Jadwal Pelajaran
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Waktu Belajar: 07:00 - 15:00</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-200 ${
                  selectedDay === day
                    ? 'bg-primary-500 text-white shadow-lg scale-105'
                    : 'bg-gray-200 dark:bg-dark-50 text-gray-700 dark:text-gray-300 hover:bg-primary-200 dark:hover:bg-primary-800'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="space-y-4 animate-fade-in">
            {jadwal[selectedDay].map((pelajaran, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-dark-50 dark:to-primary-900 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="flex items-center p-6 gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary-500 dark:bg-primary-700 rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
                    {pelajaran.urutan}
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                      {pelajaran.mataPelajaran}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>
                        {pelajaran.waktuMulai} - {pelajaran.waktuSelesai}
                      </span>
                    </div>
                  </div>

                  <div className="hidden md:block flex-shrink-0 text-right">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Durasi</div>
                    <div className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                      90 menit
                    </div>
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

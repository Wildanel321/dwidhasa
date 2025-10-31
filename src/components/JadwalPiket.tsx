import { Sparkles } from 'lucide-react';
import piketData from '../data/piket.json';

export function JadwalPiket() {
  return (
    <section id="piket" className="py-20 bg-gray-50 dark:bg-dark-50 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-primary-600 dark:text-primary-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-primary-700 dark:text-primary-300">
              Jadwal Piket
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400">5 Kelompok Piket Kelas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {piketData.map((kelompok, index) => (
            <div
              key={kelompok.hari}
              className="bg-white dark:bg-dark-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-700 dark:to-primary-800 p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Kelompok {kelompok.hari}</h3>
                </div>
              </div>

              <div className="p-6">
                <ul className="space-y-3">
                  {kelompok.anggota.map((nama, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                    >
                      <div className="w-2 h-2 bg-primary-500 dark:bg-primary-400 rounded-full"></div>
                      <span>{nama}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

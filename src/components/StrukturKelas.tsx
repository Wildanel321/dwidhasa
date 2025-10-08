import { Users } from 'lucide-react';
import struktur from '../data/struktur.json';

export function StrukturKelas() {
  return (
    <section id="struktur" className="py-20 bg-gray-50 dark:bg-dark-50 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-10 h-10 text-primary-600 dark:text-primary-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-primary-700 dark:text-primary-300">
              Struktur Kelas
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Pengurus Kelas Dwi Dhasa</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {struktur.map((person, index) => (
            <div
              key={person.id}
              className="bg-white dark:bg-dark-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <img
                  src={person.fotoUrl}
                  alt={person.nama}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {person.nama}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-semibold">
                  {person.jabatan}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { GraduationCap, Instagram, Music } from 'lucide-react';
import siswaData from '../data/siswa.json';

export function DaftarSiswa() {
  const totalSiswa = siswaData.length;
  const siswaLakiLaki = siswaData.filter(s => s.jenisKelamin === 'Laki-laki').length;
  const siswaPerempuan = siswaData.filter(s => s.jenisKelamin === 'Perempuan').length;

  return (
    <section id="siswa" className="py-20 bg-white dark:bg-dark-100 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="w-10 h-10 text-primary-600 dark:text-primary-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-primary-700 dark:text-primary-300">
              Siswa & Siswi
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Total {totalSiswa} Siswa ({siswaPerempuan} Siswi, {siswaLakiLaki} Siswa)
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
          {siswaData.map((siswa, index) => (
            <div
              key={siswa.id}
              className="bg-gradient-to-br from-white to-primary-50 dark:from-dark-50 dark:to-primary-900 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2"
              style={{ animationDelay: `${index * 20}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={siswa.fotoUrl}
                  alt={siswa.nama}
                  className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2 gap-2">
                  <a
                    href={siswa.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Instagram className="w-4 h-4 text-white" />
                  </a>
                  <a
                    href={siswa.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Music className="w-4 h-4 text-white" />
                  </a>
                </div>
              </div>

              <div className="p-3 text-center">
                <h3 className="font-semibold text-gray-800 dark:text-white text-sm leading-tight">
                  {siswa.nama}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {siswa.jenisKelamin}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

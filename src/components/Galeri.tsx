import { useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import galeriData from '../data/galeri.json';

export function Galeri() {
  const [selectedImage, setSelectedImage] = useState<typeof galeriData[0] | null>(null);

  return (
    <section id="galeri" className="py-20 bg-gray-50 dark:bg-dark-50 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ImageIcon className="w-10 h-10 text-primary-600 dark:text-primary-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-primary-700 dark:text-primary-300">
              Galeri Kenangan
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Momen Berharga Kelas Dwi Dhasa</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {galeriData.map((foto, index) => (
            <div
              key={foto.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelectedImage(foto)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={foto.fotoUrl}
                  alt={foto.judul}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">{foto.judul}</h3>
                <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {new Date(foto.tanggal).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-w-4xl w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedImage.fotoUrl}
                alt={selectedImage.judul}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="text-center mt-6 text-white">
                <h3 className="text-3xl font-bold mb-2">{selectedImage.judul}</h3>
                <p className="text-gray-300">
                  {new Date(selectedImage.tanggal).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

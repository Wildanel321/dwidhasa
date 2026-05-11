import { useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import galeriData from '../data/galeri.json';

export function Galeri() {
  const [selectedImage, setSelectedImage] = useState<typeof galeriData[0] | null>(null);

  return (
    <section id="galeri" className="py-24 transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="inline-block bg-brutalist-pink border-4 border-black px-8 py-3 shadow-brutalist -rotate-2">
            <h2 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter">
              PHOTO VAULT
            </h2>
          </div>
          <div className="p-4 bg-brutalist-white dark:bg-dark-50 border-4 border-black rotate-1 shadow-brutalist">
            <p className="font-black text-black dark:text-white uppercase text-sm italic">
              CAPTURING THE BEST MOMENTS
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {galeriData.map((foto, index) => (
            <div
              key={foto.id}
              className="group relative cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelectedImage(foto)}
            >
              <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3" />
              <div className="relative bg-brutalist-white dark:bg-dark-100 border-4 border-black overflow-hidden hover:-translate-x-1 hover:-translate-y-1 transition-transform h-full">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={foto.fotoUrl}
                    alt={foto.judul}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-brutalist-lime/10 group-hover:bg-transparent transition-colors" />
                </div>

                <div className="p-6 bg-white dark:bg-dark-100 border-t-4 border-black">
                  <h3 className="text-xl font-black text-black dark:text-white uppercase tracking-tighter mb-2 group-hover:text-brutalist-pink transition-colors">
                    {foto.judul}
                  </h3>
                  <p className="text-[10px] font-black text-black/40 dark:text-white/40 uppercase tracking-widest italic">
                    {new Date(foto.tanggal).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-brutalist-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 w-14 h-14 bg-brutalist-red border-4 border-black shadow-brutalist hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex items-center justify-center text-black transition-all z-50"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>

            <div className="max-w-4xl w-full animate-scale-in relative" onClick={(e) => e.stopPropagation()}>
              <div className="absolute inset-0 bg-brutalist-white translate-x-4 translate-y-4" />
              <div className="relative bg-white border-4 border-black p-4">
                <img
                  src={selectedImage.fotoUrl}
                  alt={selectedImage.judul}
                  className="w-full h-auto grayscale-0"
                />
                <div className="bg-brutalist-yellow border-t-4 border-black p-6 mt-4 -mx-4 -mb-4">
                  <h3 className="text-3xl font-black text-black uppercase tracking-tighter mb-2">
                    {selectedImage.judul}
                  </h3>
                  <p className="font-bold text-black uppercase text-sm italic">
                    Momen pada {new Date(selectedImage.tanggal).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

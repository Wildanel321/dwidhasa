import classData from '../data/classData.json';

export function WaliKelas() {
  return (
    <section id="wali-kelas" className="py-24 transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="inline-block bg-brutalist-purple border-4 border-black px-8 py-3 mb-12 -rotate-1 shadow-brutalist mx-auto md:mx-0">
          <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">
            Guardian Of Class
          </h2>
        </div>

        <div className="max-w-5xl mx-auto relative group">
          <div className="absolute inset-0 bg-black translate-x-4 translate-y-4" />
          <div className="relative bg-brutalist-white dark:bg-dark-50 border-4 border-black p-1 md:p-4">
            <div className="md:flex items-stretch">
              <div className="md:w-2/5 relative border-b-4 md:border-b-0 md:border-r-4 border-black bg-brutalist-yellow">
                <img
                  src={classData.waliKelas.fotoUrl}
                  alt={classData.waliKelas.nama}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 min-h-[300px]"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-brutalist-white border-4 border-black p-2 shadow-brutalist">
                   <p className="text-xs font-black uppercase text-black">OFFICIAL GUARDIAN</p>
                </div>
              </div>

              <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-dark-50">
                <div className="inline-block bg-brutalist-lime border-2 border-black px-3 py-1 mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] self-start">
                  <p className="text-xs font-black uppercase text-black">Wali Kelas</p>
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-black dark:text-white mb-2 uppercase tracking-tighter">
                  {classData.waliKelas.nama}
                </h3>
                <p className="text-xl font-bold text-brutalist-purple uppercase mb-8">
                  Guru {classData.waliKelas.mataPelajaran}
                </p>

                <div className="space-y-4 text-black dark:text-gray-300 font-bold leading-relaxed border-l-4 border-brutalist-yellow pl-6">
                  {classData.waliKelas.sambutan.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

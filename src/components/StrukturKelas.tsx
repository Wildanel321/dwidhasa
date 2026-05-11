import { Users } from 'lucide-react';
import struktur from '../data/struktur.json';

export function StrukturKelas() {
  return (
    <section id="struktur" className="py-24 transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
          <div className="p-4 bg-brutalist-blue border-4 border-black rotate-3 shadow-brutalist">
            <Users className="w-12 h-12 text-black" />
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-black dark:text-white uppercase tracking-tighter text-center">
            The Council
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {struktur.map((person, index) => (
            <div
              key={person.id}
              className="group relative"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 transition-transform group-hover:translate-x-4 group-hover:translate-y-4" />
              <div className="relative bg-brutalist-white dark:bg-dark-100 border-4 border-black overflow-hidden hover:-translate-x-1 hover:-translate-y-1 transition-transform">
                <div className="relative h-64 overflow-hidden border-b-4 border-black bg-brutalist-lime">
                  <img
                    src={person.fotoUrl}
                    alt={person.nama}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-brutalist-yellow border-2 border-black font-black uppercase text-[10px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    ACTIVE MEMBER
                  </div>
                </div>

                <div className="p-6 bg-white dark:bg-dark-100">
                  <p className="text-xs font-black text-brutalist-purple uppercase tracking-widest mb-1 italic">
                    {person.jabatan}
                  </p>
                  <h3 className="text-2xl font-black text-black dark:text-white uppercase tracking-tighter">
                    {person.nama}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

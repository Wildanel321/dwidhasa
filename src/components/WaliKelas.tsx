import classData from '../data/classData.json';

export function WaliKelas() {
  return (
    <section id="wali-kelas" className="py-20 bg-white dark:bg-dark-100 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-primary-700 dark:text-primary-300 mb-12">
          Wali Kelas Kami
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-dark-50 dark:to-primary-900 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div className="md:flex">
              <div className="md:w-1/3 p-8 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-400 dark:bg-primary-600 rounded-full blur-xl opacity-50"></div>
                  <img
                    src={classData.waliKelas.fotoUrl}
                    alt={classData.waliKelas.nama}
                    className="relative w-48 h-48 rounded-full object-cover border-4 border-white dark:border-dark-100 shadow-xl"
                  />
                </div>
              </div>

              <div className="md:w-2/3 p-8">
                <h3 className="text-3xl font-bold text-primary-800 dark:text-primary-200 mb-2">
                  {classData.waliKelas.nama}
                </h3>
                <p className="text-lg text-primary-600 dark:text-primary-400 mb-6 font-semibold">
                  Guru {classData.waliKelas.mataPelajaran}
                </p>

                <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
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

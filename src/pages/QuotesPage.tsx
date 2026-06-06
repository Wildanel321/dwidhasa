import { FloatingQuotes } from '../components/FloatingQuotes';
import { Footer } from '../components/Footer';
import { StatusBar } from '../components/StatusBar';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function QuotesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-100">
      <div className="container mx-auto px-6 py-8">
        <Link to="/kelas" className="inline-flex items-center gap-2 px-4 py-2 bg-brutalist-blue border-2 border-black font-bold uppercase shadow-brutalist hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all mb-8 text-black">
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      <FloatingQuotes />
      
      <Footer />
      <StatusBar />
    </div>
  );
}

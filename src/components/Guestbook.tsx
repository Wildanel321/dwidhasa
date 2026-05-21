import { useState, useEffect } from 'react';
import { MessageSquare, Send, Trash2, Smile } from 'lucide-react';

interface GuestbookMessage {
  id: string;
  nama: string;
  pesan: string;
  emoji: string;
  tanggal: string;
}

const EMOJIS = ['❤️', '🔥', '🎓', '✨', '⭐', '😎', '🎉', '🙌', '🚀', '🌸'];

export function Guestbook() {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [nama, setNama] = useState('');
  const [pesan, setPesan] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(EMOJIS[0]);

  // Load messages from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('dwidhasa_guestbook');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse guestbook messages', e);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  const saveMessages = (newMessages: GuestbookMessage[]) => {
    setMessages(newMessages);
    localStorage.setItem('dwidhasa_guestbook', JSON.stringify(newMessages));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !pesan.trim()) return;

    const newMessage: GuestbookMessage = {
      id: Date.now().toString(),
      nama: nama.trim(),
      pesan: pesan.trim(),
      emoji: selectedEmoji,
      tanggal: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const updated = [newMessage, ...messages];
    saveMessages(updated);
    
    // Reset form fields
    setNama('');
    setPesan('');
    setSelectedEmoji(EMOJIS[0]);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pesan ini?')) {
      const filtered = messages.filter((msg) => msg.id !== id);
      saveMessages(filtered);
    }
  };

  return (
    <section id="guestbook" className="py-24 transition-colors duration-500 overflow-hidden bg-white dark:bg-dark-100">
      <div className="container mx-auto px-6">
        
        {/* Title Badge */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 max-w-6xl mx-auto">
          <div className="text-left">
            <div className="inline-flex items-center gap-3 bg-brutalist-pink border-4 border-black px-6 py-2 shadow-brutalist mb-4 rotate-1">
              <MessageSquare className="w-8 h-8 text-black" />
              <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">
                Buku Tamu Kesan
              </h2>
            </div>
            <p className="text-lg font-bold text-black dark:text-gray-300 mt-2">
              TINGGALKAN PESAN & KESAN SERTA DUKUNGAN UNTUK KELAS KAMI!
            </p>
          </div>
          
          <div className="bg-brutalist-white dark:bg-dark-55 border-4 border-black p-4 shadow-brutalist -rotate-1 shrink-0">
            <p className="font-black text-black dark:text-white uppercase text-sm">
              Total {messages.length} Pesan Masuk
            </p>
          </div>
        </div>

        {/* Guestbook Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          
          {/* Left Form (lg:col-span-5) */}
          <form 
            onSubmit={handleSubmit}
            className="lg:col-span-5 relative bg-brutalist-white dark:bg-dark-50 border-4 border-black p-6 md:p-8 shadow-brutalist"
          >
            <div className="absolute inset-0 bg-brutalist-black translate-x-2 translate-y-2 -z-10" />
            
            <h3 className="text-2xl font-black text-black dark:text-white uppercase tracking-tight mb-6 pb-2 border-b-4 border-black">
              Tulis Kesan Anda
            </h3>

            {/* Nama Field */}
            <div className="mb-5">
              <label className="block text-sm font-black text-black dark:text-white uppercase tracking-wider mb-2">
                Nama Lengkap / Panggilan
              </label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Contoh: Budi Santoso"
                maxLength={40}
                required
                className="w-full bg-white dark:bg-dark-100 border-4 border-black p-3 font-bold text-black dark:text-white focus:outline-none focus:bg-brutalist-blue/10 dark:focus:bg-brutalist-blue/5 transition-colors"
              />
            </div>

            {/* Pesan Field */}
            <div className="mb-5">
              <label className="block text-sm font-black text-black dark:text-white uppercase tracking-wider mb-2">
                Pesan & Kesan
              </label>
              <textarea
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                placeholder="Tulis kesan selama berinteraksi dengan kelas XII.2..."
                maxLength={300}
                rows={4}
                required
                className="w-full bg-white dark:bg-dark-100 border-4 border-black p-3 font-bold text-black dark:text-white focus:outline-none focus:bg-brutalist-pink/10 dark:focus:bg-brutalist-pink/5 transition-colors resize-none"
              />
            </div>

            {/* Emoji Selection */}
            <div className="mb-8">
              <label className="flex items-center gap-2 text-sm font-black text-black dark:text-white uppercase tracking-wider mb-3">
                <Smile className="w-4 h-4" />
                <span>Pilih Emoji Pendukung</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setSelectedEmoji(emoji)}
                    className={`w-10 h-10 text-xl border-4 border-black flex items-center justify-center transition-all ${
                      selectedEmoji === emoji 
                        ? 'bg-brutalist-yellow -translate-y-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                        : 'bg-white hover:bg-gray-100 dark:bg-dark-100 dark:hover:bg-dark-200'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 bg-brutalist-lime hover:bg-brutalist-lime/90 border-4 border-black font-black text-black text-base shadow-brutalist hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:translate-x-2 active:translate-y-2 transition-all uppercase tracking-wider"
            >
              <span>Kirim Kesan</span>
              <Send className="w-5 h-5 text-black" />
            </button>
          </form>

          {/* Right Message Scrollable List (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-6 max-h-[640px] overflow-y-auto pr-2 custom-scrollbar">
            {messages.length === 0 ? (
              <div className="relative border-4 border-black p-8 text-center bg-brutalist-white dark:bg-dark-50 shadow-brutalist">
                <div className="absolute inset-0 bg-brutalist-black translate-x-2 translate-y-2 -z-10" />
                <MessageSquare className="w-12 h-12 text-black/20 dark:text-white/20 mx-auto mb-3" />
                <p className="font-black text-black dark:text-white uppercase tracking-tight">
                  Belum ada pesan kesan.
                </p>
                <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mt-1">
                  Jadilah orang pertama yang meninggalkan pesan di papan kami!
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <div 
                  key={msg.id}
                  className="relative group bg-brutalist-white dark:bg-dark-50 border-4 border-black p-5 shadow-brutalist animate-fade-in"
                >
                  <div className="absolute inset-0 bg-brutalist-black translate-x-1.5 translate-y-1.5 -z-10" />
                  
                  {/* Top Bar inside Card */}
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div className="flex items-center gap-2.5">
                      {/* Emoji Badge */}
                      <span className="w-10 h-10 text-xl bg-brutalist-blue border-2 border-black rounded-none flex items-center justify-center shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                        {msg.emoji}
                      </span>
                      <div>
                        <h4 className="font-black text-black dark:text-white uppercase leading-tight tracking-tight text-base">
                          {msg.nama}
                        </h4>
                        <span className="text-[10px] font-black text-black/40 dark:text-white/40 uppercase tracking-widest block mt-0.5">
                          {msg.tanggal}
                        </span>
                      </div>
                    </div>

                    {/* Delete action button */}
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="p-2 bg-brutalist-pink border-2 border-black hover:bg-brutalist-red transition-colors shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
                      title="Hapus Pesan"
                    >
                      <Trash2 className="w-4 h-4 text-black" />
                    </button>
                  </div>

                  {/* Message Body */}
                  <div className="pt-2 border-t border-black/10 dark:border-white/10 text-sm font-bold text-black dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                    "{msg.pesan}"
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

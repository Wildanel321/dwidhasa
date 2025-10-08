import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Minimize2 } from 'lucide-react';
import classData from '../data/classData.json';
import jadwalData from '../data/jadwal.json';
import struktur from '../data/struktur.json';

interface Message {
  text: string;
  isBot: boolean;
}

export function DhasaBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Halo, aku DhasaBot! Mau tahu jadwal hari ini atau struktur kelas?',
      isBot: true,
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('jadwal') || lowerQuery.includes('pelajaran')) {
      const today = new Date().getDay();
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const dayName = days[today];

      if (today === 0 || today === 6) {
        return `Hari ini ${dayName}, tidak ada jadwal pelajaran. Selamat libur!`;
      }

      const jadwal = jadwalData[dayName as keyof typeof jadwalData];
      if (jadwal) {
        let response = `Jadwal pelajaran hari ini (${dayName}):\n\n`;
        jadwal.forEach((pelajaran) => {
          response += `${pelajaran.urutan}. ${pelajaran.mataPelajaran} (${pelajaran.waktuMulai}-${pelajaran.waktuSelesai})\n`;
        });
        return response;
      }
    }

    if (lowerQuery.includes('ketua') || lowerQuery.includes('struktur')) {
      const ketua = struktur.find((s) => s.jabatan === 'Ketua Kelas');
      let response = 'Struktur Kelas Dwi Dhasa:\n\n';
      struktur.slice(0, 4).forEach((s) => {
        response += `${s.jabatan}: ${s.nama}\n`;
      });
      return response;
    }

    if (lowerQuery.includes('wali kelas') || lowerQuery.includes('guru')) {
      return `Wali kelas kita adalah ${classData.waliKelas.nama}, beliau mengajar ${classData.waliKelas.mataPelajaran}.`;
    }

    if (lowerQuery.includes('instagram') || lowerQuery.includes('ig')) {
      return `Instagram kelas: ${classData.socialMedia.instagram}\nYuk follow!`;
    }

    if (lowerQuery.includes('tiktok') || lowerQuery.includes('tik tok')) {
      return `TikTok kelas: ${classData.socialMedia.tiktok}\nJangan lupa follow ya!`;
    }

    if (lowerQuery.includes('halo') || lowerQuery.includes('hai') || lowerQuery.includes('hi')) {
      return 'Halo juga! Ada yang bisa aku bantu? Kamu bisa tanya tentang jadwal, struktur kelas, atau info lainnya.';
    }

    if (lowerQuery.includes('terima kasih') || lowerQuery.includes('thanks')) {
      return 'Sama-sama! Senang bisa membantu. Ada yang lain?';
    }

    return 'Maaf, aku belum mengerti pertanyaanmu. Coba tanya tentang:\n- Jadwal pelajaran hari ini\n- Struktur kelas\n- Wali kelas\n- Instagram/TikTok kelas';
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, isBot: false };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botResponse: Message = {
        text: getResponse(input),
        isBot: true,
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);

    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-200 flex items-center justify-center"
          aria-label="Open DhasaBot"
        >
          <Bot className="w-8 h-8" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[32rem] bg-white dark:bg-dark-100 rounded-2xl shadow-2xl flex flex-col animate-scale-in">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 p-4 rounded-t-2xl flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <Bot className="w-6 h-6" />
              <div>
                <h3 className="font-bold">DhasaBot</h3>
                <p className="text-xs opacity-90">Asisten Virtual Kelas</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl whitespace-pre-line ${
                    message.isBot
                      ? 'bg-primary-100 dark:bg-primary-900 text-gray-800 dark:text-white'
                      : 'bg-primary-500 text-white'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t dark:border-dark-50">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ketik pertanyaan..."
                className="flex-1 px-4 py-2 rounded-full border dark:border-dark-50 bg-gray-50 dark:bg-dark-50 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                onClick={handleSend}
                className="w-10 h-10 bg-primary-500 hover:bg-primary-600 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

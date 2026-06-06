import { useState, useRef, useEffect } from 'react';
import { Bot, Send, ArrowLeft, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Halo! Aku adalah DhasaBot, asisten virtual pintar untuk kelas XII.2 Dwidhasa. Ada yang bisa kubantu hari ini?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    
    const newMessages: Message[] = [
      ...messages,
      { role: 'user', content: userMsg },
    ];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const systemPrompt: Message = {
        role: 'system',
        content: 'Kamu adalah DhasaBot, asisten virtual yang cerdas, ramah, dan asik untuk kelas XII.2 (Dwi Dhasa). Jawablah menggunakan bahasa Indonesia yang santai tapi sopan, dan kadang gunakan emoji yang relevan. Jika ditanya soal profil sekolah atau siswa, jawab sepengtahuanmu secara umum atau minta maaf jika tidak tahu spesifik siswa tersebut.'
      };

      // Hanya kirim riwayat chat tanpa pesan awal selamat datang (optional, tapi bagus untuk konteks)
      const apiMessages = [systemPrompt, ...newMessages.filter(m => m.role !== 'system')];

      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey) {
        throw new Error('API Key Groq belum disetting di .env.local!');
      }

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-70b-8192',
          messages: apiMessages,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData?.error?.message || 'Gagal menghubungi AI');
      }

      const data = await response.json();
      const botResponse = data.choices[0].message.content;

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: botResponse },
      ]);
    } catch (error: any) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `⚠️ Maaf, terjadi kesalahan: ${error.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-dark-100 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-dark-200 shadow-sm border-b dark:border-dark-50 p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link to="/kelas" className="p-2 hover:bg-gray-100 dark:hover:bg-dark-50 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg dark:text-white leading-tight">DhasaBot AI</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Powered by Groq LLaMA 70B</p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 w-full max-w-4xl mx-auto space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              <div className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center mt-1 ${
                msg.role === 'user' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-primary-500'
              }`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-gray-600 dark:text-gray-300" /> : <Bot className="w-5 h-5 text-white" />}
              </div>

              <div className={`px-5 py-3 rounded-2xl shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-primary-500 text-white rounded-tr-sm' 
                  : 'bg-white dark:bg-dark-200 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-dark-50 rounded-tl-sm'
              }`}>
                <p className="whitespace-pre-wrap leading-relaxed text-[15px]">{msg.content}</p>
              </div>

            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[85%] sm:max-w-[75%]">
              <div className="w-8 h-8 flex-shrink-0 rounded-full bg-primary-500 flex items-center justify-center mt-1">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="px-5 py-4 rounded-2xl bg-white dark:bg-dark-200 border border-gray-100 dark:border-dark-50 rounded-tl-sm shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <footer className="bg-white dark:bg-dark-200 p-4 border-t dark:border-dark-50 sticky bottom-0">
        <div className="max-w-4xl mx-auto flex gap-3 relative items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ketik pesan..."
            className="flex-1 resize-none overflow-hidden rounded-2xl border border-gray-300 dark:border-dark-50 bg-gray-50 dark:bg-dark-100 text-gray-800 dark:text-white px-5 py-4 pr-16 focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[56px] max-h-32"
            rows={1}
            style={{
              height: input ? 'auto' : '56px',
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 bottom-2 w-10 h-10 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-full flex items-center justify-center transition-colors mb-1"
          >
            <Send className="w-5 h-5 ml-1" />
          </button>
        </div>
      </footer>
    </div>
  );
}

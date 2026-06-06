import { useState, useEffect, useRef } from 'react';
import { supabase, supabaseReady, KenaganRow } from '../lib/supabase';

/* ── Types ─────────────────────────────────────────────────────────────── */
interface StickyNote {
  id: string;
  pengirim: string;
  pesan: string;
  warna: string;
  rotasi: number;
  offsetX: number;
  offsetY: number;
  creatorId: string;
  timestamp: number;
}

/* ── Constants ─────────────────────────────────────────────────────────── */
const WARNA_PASTEL = [
  '#FFF9C4', '#F8BBD9', '#C8E6C9', '#BBDEFB', '#E1BEE7',
];
const USER_ID_KEY = 'dwidhasa_user_id';

function getUserId(): string {
  let uid = localStorage.getItem(USER_ID_KEY);
  if (!uid) {
    uid = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem(USER_ID_KEY, uid);
  }
  return uid;
}

function rowToNote(row: KenaganRow, idx: number): StickyNote {
  return {
    id: row.id,
    pengirim: row.pengirim,
    pesan: row.pesan,
    warna: row.warna,
    rotasi: row.rotasi,
    offsetX: row.offset_x,
    offsetY: row.offset_y,
    creatorId: row.creator_id,
    timestamp: new Date(row.created_at).getTime(),
  };
}

/* ── Component ─────────────────────────────────────────────────────────── */
export function BukuKenangan() {
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [pengirim, setPengirim] = useState('');
  const [pesan, setPesan] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [newNoteId, setNewNoteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userId = useRef<string>('');

  if (!supabaseReady) {
    return (
      <div className="py-24 px-4 text-center">
        <div className="inline-block border-4 border-black bg-brutalist-yellow px-8 py-6" style={{ boxShadow: '6px 6px 0 #000' }}>
          <div className="text-4xl mb-3">📝</div>
          <h2 className="text-2xl font-black text-black mb-2">BUKU KENANGAN</h2>
          <p className="font-bold text-black">Fitur ini segera aktif setelah konfigurasi server selesai.</p>
        </div>
      </div>
    );
  }

  /* ── Initial Load ── */
  useEffect(() => {
    userId.current = getUserId();

    const fetchNotes = async () => {
      setLoading(true);
      const { data, error: err } = await supabase
        .from('kenangan')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (err) {
        setError('Gagal memuat pesan. Coba refresh halaman.');
      } else {
        setNotes((data as KenaganRow[]).map((r, i) => rowToNote(r, i)));
      }
      setLoading(false);
    };

    fetchNotes();

    /* ── Realtime Subscription ── */
    const channel = supabase
      .channel('kenangan-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'kenangan' },
        (payload) => {
          const newNote = rowToNote(payload.new as KenaganRow, 0);
          setNotes((prev) => [newNote, ...prev].slice(0, 100));
          setNewNoteId(newNote.id);
          setTimeout(() => setNewNoteId(null), 800);
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'kenangan' },
        (payload) => {
          setNotes((prev) => prev.filter((n) => n.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  /* ── Submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pengirim.trim() || !pesan.trim() || submitting) return;

    setSubmitting(true);
    setError(null);

    const idx = notes.length;
    const payload = {
      pengirim: pengirim.trim(),
      pesan: pesan.trim(),
      warna: WARNA_PASTEL[idx % WARNA_PASTEL.length],
      rotasi: (idx % 5) * 3 - 6,
      offset_x: (idx % 3) * 8 - 8,
      offset_y: (idx % 4) * 6 - 9,
      creator_id: userId.current,
    };

    const { error: err } = await supabase.from('kenangan').insert([payload]);

    if (err) {
      setError('Gagal menyimpan pesan. Coba lagi!');
    } else {
      setPengirim('');
      setPesan('');
    }
    setSubmitting(false);
  };

  /* ── Delete ── */
  const handleDelete = async (noteId: string, creatorId: string) => {
    if (creatorId !== userId.current) return;
    const { error: err } = await supabase
      .from('kenangan')
      .delete()
      .eq('id', noteId);
    if (err) setError('Gagal menghapus. Coba lagi!');
  };

  /* ── Render ── */
  return (
    <>
      <style>{`
        @keyframes noteAppear {
          0% { opacity: 0; transform: scale(0.5) rotate(-10deg); }
          60% { transform: scale(1.08) rotate(2deg); }
          100% { opacity: 1; transform: scale(1) rotate(var(--rot)); }
        }
        @keyframes noteNew {
          0% { opacity: 0; transform: scale(0.4) rotate(-15deg); }
          70% { transform: scale(1.1) rotate(3deg); }
          100% { opacity: 1; transform: scale(1) rotate(var(--rot)); }
        }
        @keyframes pulse-dot {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }
        .note-card {
          animation: noteAppear 0.5s ease forwards;
          transform: rotate(var(--rot));
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .note-card:hover {
          z-index: 99 !important;
          transform: rotate(0deg) scale(1.05) !important;
          box-shadow: 8px 8px 0px #000 !important;
        }
        .note-card.note-new {
          animation: noteNew 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .papan {
          background:
            repeating-linear-gradient(0deg, transparent, transparent 39px, #8B6914 40px),
            repeating-linear-gradient(90deg, transparent, transparent 39px, #8B6914 40px),
            linear-gradient(135deg, #A0522D 0%, #8B4513 40%, #6B3410 100%);
          box-shadow: inset 0 0 30px rgba(0,0,0,0.4), 4px 4px 0 #000;
        }
        .submit-btn { transition: transform 0.1s, box-shadow 0.1s; }
        .submit-btn:active { transform: translate(3px, 3px) !important; box-shadow: 2px 2px 0 #000 !important; }
        .live-dot { animation: pulse-dot 1.5s ease infinite; }
      `}</style>

      <div className="min-h-screen py-8 px-4" style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}>

        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="inline-block bg-brutalist-yellow border-4 border-black px-8 py-4"
            style={{ boxShadow: '6px 6px 0 #000', transform: 'rotate(-1deg)' }}
          >
            <h1 className="text-4xl md:text-5xl font-black text-black tracking-tight">
              BUKU KENANGAN 📝
            </h1>
            <p className="text-black font-bold mt-1">Tinggalkan pesan untuk XII.2 Dwidhasa!</p>
          </div>
          {/* Live badge */}
          <div className="mt-3 inline-flex items-center gap-2 border-2 border-black px-3 py-1 bg-green-100">
            <span className="live-dot w-2 h-2 rounded-full bg-green-500 inline-block" />
            <span className="text-xs font-black text-black uppercase tracking-widest">Live · Realtime</span>
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="max-w-xl mx-auto mb-4 border-4 border-red-500 bg-red-50 px-4 py-3 font-bold text-red-700 flex justify-between items-center" style={{ boxShadow: '4px 4px 0 #000' }}>
            ⚠️ {error}
            <button onClick={() => setError(null)} className="text-red-500 font-black ml-4">✕</button>
          </div>
        )}

        {/* Form */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="bg-white border-4 border-black p-6" style={{ boxShadow: '6px 6px 0 #000' }}>
            <h2 className="text-xl font-black text-black mb-4 border-b-4 border-black pb-2">✍️ Tulis Pesanmu</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block font-bold text-black mb-1">Nama Pengirim</label>
                <input
                  type="text"
                  value={pengirim}
                  onChange={(e) => setPengirim(e.target.value)}
                  placeholder="Nama kamu..."
                  maxLength={50}
                  required
                  className="w-full border-black px-3 py-2 font-semibold text-black focus:outline-none focus:ring-2 focus:ring-black"
                  style={{ borderWidth: '3px', borderStyle: 'solid', background: '#fffde7' }}
                />
              </div>
              <div>
                <label className="block font-bold text-black mb-1">
                  Pesan
                  <span className="ml-2 text-sm font-normal" style={{ color: pesan.length > 180 ? '#e53935' : '#666' }}>
                    ({pesan.length}/200)
                  </span>
                </label>
                <textarea
                  value={pesan}
                  onChange={(e) => setPesan(e.target.value.slice(0, 200))}
                  placeholder="Tulis kenangan terbaikmu bersama XII.2..."
                  rows={4}
                  required
                  className="w-full border-black px-3 py-2 font-semibold text-black focus:outline-none resize-none"
                  style={{ borderWidth: '3px', borderStyle: 'solid', background: '#fffde7' }}
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="submit-btn bg-brutalist-lime border-4 border-black px-6 py-3 font-black text-black text-lg uppercase tracking-wide"
                style={{ boxShadow: '4px 4px 0 #000', cursor: submitting ? 'wait' : 'pointer' }}
              >
                {submitting ? '📌 Menyimpan...' : '📌 Tempel Note!'}
              </button>
            </form>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-6xl mx-auto mb-4 flex items-center gap-4 flex-wrap">
          <div
            className="bg-brutalist-pink border-black px-4 py-1 font-bold text-black text-sm"
            style={{ borderWidth: '3px', borderStyle: 'solid', boxShadow: '3px 3px 0 #000' }}
          >
            📌 {notes.length} pesan tersimpan
          </div>
          {loading && (
            <div className="text-sm font-semibold text-gray-500 animate-pulse">Memuat pesan...</div>
          )}
          {!loading && notes.length === 0 && (
            <p className="text-gray-500 font-semibold italic">Belum ada pesan. Jadilah yang pertama! 🎉</p>
          )}
        </div>

        {/* Papan */}
        {notes.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <div
              className="papan rounded-none p-8 min-h-96 relative"
              style={{ border: '6px solid #5D3A1A', borderRadius: '4px' }}
            >
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'repeating-linear-gradient(92deg, transparent, transparent 8px, rgba(255,255,255,0.3) 9px)' }}
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 relative z-10">
                {notes.map((note, idx) => (
                  <div
                    key={note.id}
                    className={`note-card relative p-4 border-2 border-black cursor-default select-none ${note.id === newNoteId ? 'note-new' : ''}`}
                    style={{
                      background: note.warna,
                      boxShadow: '4px 4px 0 #000',
                      zIndex: idx + 1,
                      '--rot': `${note.rotasi}deg`,
                      minHeight: '130px',
                      transform: `rotate(${note.rotasi}deg) translate(${note.offsetX}px, ${note.offsetY}px)`,
                    } as React.CSSProperties}
                  >
                    {/* Pin */}
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-black"
                      style={{ background: '#c0392b', boxShadow: '1px 1px 0 #000' }}
                    />
                    {/* Delete (own notes only) */}
                    {note.creatorId === userId.current && (
                      <button
                        onClick={() => handleDelete(note.id, note.creatorId)}
                        className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center text-xs font-black border border-black bg-red-400 hover:bg-red-600 text-white"
                        style={{ borderRadius: '2px' }}
                        title="Hapus notemu"
                      >×</button>
                    )}
                    <p className="font-black text-black text-sm mb-2 border-b-2 border-black pb-1 pr-4">{note.pengirim}</p>
                    <p className="text-black text-xs font-medium leading-relaxed break-words">{note.pesan}</p>
                    <p className="text-gray-500 text-xs mt-2 font-mono">
                      {new Date(note.timestamp).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: '2-digit' })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-5 border-x-4 border-b-4" style={{ background: '#5D3A1A', borderColor: '#3d2208' }} />
          </div>
        )}
      </div>
    </>
  );
}

export default BukuKenangan;

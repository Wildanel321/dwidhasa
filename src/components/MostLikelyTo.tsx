import { useState, useEffect, useRef } from 'react';
import { supabase, supabaseReady, VoteRow } from '../lib/supabase';
import kategoriData from '../data/mostLikelyTo.json';
import siswaData from '../data/siswa.json';

/* ── Types ─────────────────────────────────────────────────────────────── */
interface Kategori {
  id: number;
  kategori: string;
  emoji: string;
  desc: string;
  color: string;
}

interface Siswa {
  id: number;
  nama: string;
  fotoUrl: string;
}

interface VoteTally {
  [siswaId: number]: number;
}

/* ── Constants ─────────────────────────────────────────────────────────── */
const VOTER_ID_KEY = 'dwidhasa_voter_id';
const TAB_COLORS = [
  '#FFD700','#FF69B4','#00BFFF','#32CD32',
  '#FF8C00','#FF4500','#8A2BE2','#20B2AA',
  '#DAA520','#4169E1',
];

function getVoterId(): string {
  let id = localStorage.getItem(VOTER_ID_KEY);
  if (!id) {
    id = `v-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    localStorage.setItem(VOTER_ID_KEY, id);
  }
  return id;
}

const kategoriList = kategoriData as Kategori[];
const siswaList    = siswaData    as Siswa[];

/* ── Component ─────────────────────────────────────────────────────────── */
export function MostLikelyTo() {
  const [selectedId, setSelectedId]   = useState<number>(1);
  const [tally, setTally]             = useState<VoteTally>({});
  const [myVote, setMyVote]           = useState<number | null>(null);
  const [totalVotes, setTotalVotes]   = useState(0);
  const [loading, setLoading]         = useState(false);
  const [votingAnim, setVotingAnim]   = useState<number | null>(null);
  const [error, setError]             = useState<string | null>(null);
  const voterId = useRef(getVoterId());

  if (!supabaseReady) {
    return (
      <div className="py-24 px-4 text-center">
        <div className="inline-block border-4 border-black bg-brutalist-blue px-8 py-6" style={{ boxShadow: '6px 6px 0 #000' }}>
          <div className="text-4xl mb-3">🗳️</div>
          <h2 className="text-2xl font-black text-black mb-2">MOST LIKELY TO</h2>
          <p className="font-bold text-black">Fitur voting segera aktif setelah konfigurasi server selesai.</p>
        </div>
      </div>
    );
  }

  /* ── Helpers ── */
  const buildTally = (rows: VoteRow[]): VoteTally => {
    const t: VoteTally = {};
    rows.forEach((r) => { t[r.siswa_id] = (t[r.siswa_id] ?? 0) + 1; });
    return t;
  };

  /* ── Load kategori ── */
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      setMyVote(null);
      setTally({});

      const { data, error: err } = await supabase
        .from('votes')
        .select('*')
        .eq('kategori_id', selectedId);

      if (err) {
        setError('Gagal memuat data voting.');
      } else {
        const rows = data as VoteRow[];
        setTally(buildTally(rows));
        setTotalVotes(rows.length);
        const mine = rows.find((r) => r.voter_id === voterId.current);
        setMyVote(mine ? mine.siswa_id : null);
      }
      setLoading(false);
    };

    load();

    /* Realtime per kategori */
    const channel = supabase
      .channel(`votes-${selectedId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'votes', filter: `kategori_id=eq.${selectedId}` },
        (payload) => {
          const row = payload.new as VoteRow;
          setTally((prev) => ({ ...prev, [row.siswa_id]: (prev[row.siswa_id] ?? 0) + 1 }));
          setTotalVotes((prev) => prev + 1);
          if (row.voter_id === voterId.current) setMyVote(row.siswa_id);
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'votes', filter: `kategori_id=eq.${selectedId}` },
        (payload) => {
          const row = payload.old as VoteRow;
          setTally((prev) => {
            const next = { ...prev };
            next[row.siswa_id] = Math.max(0, (next[row.siswa_id] ?? 1) - 1);
            return next;
          });
          setTotalVotes((prev) => Math.max(0, prev - 1));
          if (row.voter_id === voterId.current) setMyVote(null);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [selectedId]);

  /* ── Vote ── */
  const handleVote = async (siswaId: number) => {
    if (myVote !== null || loading) return;
    setVotingAnim(siswaId);
    setTimeout(() => setVotingAnim(null), 600);

    const { error: err } = await supabase
      .from('votes')
      .insert([{ kategori_id: selectedId, siswa_id: siswaId, voter_id: voterId.current }]);

    if (err) setError('Gagal menyimpan vote. Coba lagi!');
  };

  /* ── Ganti vote ── */
  const handleResetVote = async () => {
    const { error: err } = await supabase
      .from('votes')
      .delete()
      .eq('kategori_id', selectedId)
      .eq('voter_id', voterId.current);

    if (err) setError('Gagal menghapus vote. Coba lagi!');
  };

  /* ── Results sorted ── */
  const getResults = () =>
    siswaList
      .map((s) => ({ ...s, count: tally[s.id] ?? 0 }))
      .sort((a, b) => b.count - a.count);

  const currentKategori = kategoriList.find((k) => k.id === selectedId)!;
  const accentColor     = currentKategori?.color ?? '#FFD700';

  /* ── Render ── */
  return (
    <>
      <style>{`
        @keyframes votePopIn {
          0% { transform: scale(0.8); opacity: 0.5; }
          60% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes barGrow { from { width: 0%; } to { width: var(--bar-w); } }
        @keyframes pulse-dot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(1.5); } }
        .vote-pop { animation: votePopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .bar-animate { animation: barGrow 0.8s ease-out forwards; }
        .vote-card { transition: transform 0.15s, box-shadow 0.15s; }
        .vote-card:hover { transform: translate(-3px,-3px); box-shadow: 7px 7px 0 #000 !important; }
        .vote-card:active { transform: translate(2px,2px); box-shadow: 2px 2px 0 #000 !important; }
        .tab-btn { transition: transform 0.1s; }
        .tab-btn:hover { transform: translateX(3px); }
        .reset-btn { transition: transform 0.1s, box-shadow 0.1s; }
        .reset-btn:hover { transform: translate(-2px,-2px); box-shadow: 5px 5px 0 #000 !important; }
        .reset-btn:active { transform: translate(2px,2px) !important; box-shadow: 1px 1px 0 #000 !important; }
        .live-dot { animation: pulse-dot 1.5s ease infinite; }
      `}</style>

      <div className="min-h-screen py-8 px-4" style={{ fontFamily: "'Space Grotesk','Inter',sans-serif" }}>

        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="inline-block border-4 border-black px-8 py-4"
            style={{ background: accentColor, boxShadow: '6px 6px 0 #000', transition: 'background 0.4s', transform: 'rotate(-1deg)' }}
          >
            <h1 className="text-4xl md:text-5xl font-black text-black tracking-tight">MOST LIKELY TO 🗳️</h1>
            <p className="text-black font-bold mt-1">Vote siapa yang paling mungkin...</p>
          </div>
          <div className="mt-3 inline-flex items-center gap-2 border-2 border-black px-3 py-1 bg-green-100">
            <span className="live-dot w-2 h-2 rounded-full bg-green-500 inline-block" />
            <span className="text-xs font-black text-black uppercase tracking-widest">Live · Realtime</span>
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="max-w-6xl mx-auto mb-4 border-4 border-red-500 bg-red-50 px-4 py-3 font-bold text-red-700 flex justify-between" style={{ boxShadow: '4px 4px 0 #000' }}>
            ⚠️ {error}
            <button onClick={() => setError(null)} className="font-black ml-4 text-red-500">✕</button>
          </div>
        )}

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">

          {/* Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="border-4 border-black overflow-hidden" style={{ boxShadow: '5px 5px 0 #000', background: '#fff' }}>
              <div className="px-4 py-3 border-b-4 border-black font-black text-black text-sm uppercase tracking-wide" style={{ background: '#f0f0f0' }}>
                📋 Kategori
              </div>
              <div className="flex flex-col">
                {kategoriList.map((k, i) => {
                  const isActive  = k.id === selectedId;
                  const voted     = false; // shown via myVote in main area
                  return (
                    <button
                      key={k.id}
                      onClick={() => setSelectedId(k.id)}
                      className={`tab-btn text-left px-4 py-3 font-bold border-b-2 border-black text-sm flex items-start gap-2 ${isActive ? 'text-black' : 'text-gray-700 hover:bg-gray-50'}`}
                      style={{
                        background: isActive ? TAB_COLORS[i] : 'transparent',
                        borderLeftWidth: isActive ? '5px' : '0px',
                        borderLeftStyle: 'solid',
                        borderLeftColor: TAB_COLORS[i],
                        transition: 'background 0.2s, border 0.2s',
                      }}
                    >
                      <span className="text-lg flex-shrink-0">{k.emoji}</span>
                      <span className="leading-tight">{k.kategori}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main area */}
          <div className="flex-1 min-w-0">

            {/* Category header */}
            <div
              className="border-4 border-black p-5 mb-5"
              style={{ background: accentColor, boxShadow: '5px 5px 0 #000', transition: 'background 0.4s' }}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-black flex items-center gap-3">
                    <span className="text-4xl">{currentKategori.emoji}</span>
                    {currentKategori.kategori}
                  </h2>
                  <p className="text-black font-semibold mt-1 opacity-80">{currentKategori.desc}</p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="border-2 border-black px-3 py-1 font-bold text-black text-sm" style={{ background: 'rgba(255,255,255,0.6)' }}>
                    {totalVotes} vote{totalVotes !== 1 ? 's' : ''}
                  </div>
                  {myVote !== null && (
                    <button
                      onClick={handleResetVote}
                      className="reset-btn border-black px-3 py-1 font-black text-black text-sm uppercase"
                      style={{ borderWidth: '3px', borderStyle: 'solid', background: '#fff', boxShadow: '3px 3px 0 #000', cursor: 'pointer' }}
                    >
                      🔄 Ganti Vote
                    </button>
                  )}
                </div>
              </div>
            </div>

            {loading && (
              <div className="text-center py-16 font-black text-gray-400 text-lg animate-pulse">Memuat data voting...</div>
            )}

            {/* Vote mode */}
            {!loading && myVote === null && (
              <>
                <p className="font-black text-black text-lg mb-4 border-l-4 pl-3" style={{ borderColor: accentColor }}>
                  Pilih satu siswa untuk kategori ini:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {siswaList.map((siswa) => (
                    <button
                      key={siswa.id}
                      onClick={() => handleVote(siswa.id)}
                      className={`vote-card border-4 border-black p-3 text-left bg-white cursor-pointer ${votingAnim === siswa.id ? 'vote-pop' : ''}`}
                      style={{ boxShadow: '4px 4px 0 #000' }}
                    >
                      <img src={siswa.fotoUrl} alt={siswa.nama} className="w-full aspect-square object-cover object-top border-2 border-black mb-2" />
                      <p className="font-black text-black text-xs leading-tight">{siswa.nama}</p>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Results mode */}
            {!loading && myVote !== null && (
              <>
                <div className="border-4 border-black p-3 mb-5 font-bold text-black flex items-center gap-2" style={{ background: '#d4edda', boxShadow: '3px 3px 0 #000' }}>
                  ✅ Kamu sudah vote!
                  <span className="font-black" style={{ color: accentColor === '#FFD700' ? '#b8860b' : accentColor }}>
                    → {siswaList.find((s) => s.id === myVote)?.nama}
                  </span>
                </div>
                <div className="space-y-3">
                  {getResults().map((siswa, rank) => {
                    const pct       = totalVotes > 0 ? (siswa.count / totalVotes) * 100 : 0;
                    const isMyVote  = myVote === siswa.id;
                    const isWinner  = rank === 0 && siswa.count > 0;
                    return (
                      <div
                        key={siswa.id}
                        className="border-4 border-black p-3 flex items-center gap-3"
                        style={{ background: isWinner ? accentColor : isMyVote ? '#f0f8ff' : '#fff', boxShadow: isWinner ? '4px 4px 0 #000' : '3px 3px 0 #000', transition: 'background 0.3s' }}
                      >
                        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center border-2 border-black font-black text-sm" style={{ background: rank === 0 ? '#000' : '#f0f0f0', color: rank === 0 ? '#FFD700' : '#000' }}>
                          {rank === 0 && siswa.count > 0 ? '🥇' : rank + 1}
                        </div>
                        <img src={siswa.fotoUrl} alt={siswa.nama} className="w-10 h-10 object-cover object-top border-2 border-black flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-black text-black text-sm truncate">{siswa.nama}</span>
                            {isMyVote && (
                              <span className="text-xs border border-black px-1 font-bold" style={{ background: '#FFD700' }}>MY VOTE</span>
                            )}
                          </div>
                          <div className="h-4 border-2 border-black overflow-hidden" style={{ background: '#e0e0e0' }}>
                            <div
                              className="bar-animate h-full"
                              style={{ '--bar-w': `${pct}%`, width: `${pct}%`, background: accentColor, borderRight: pct > 0 ? '2px solid #000' : 'none' } as React.CSSProperties}
                            />
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="font-black text-black text-lg leading-none">{siswa.count}</div>
                          <div className="text-gray-600 text-xs font-semibold">{pct.toFixed(0)}%</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MostLikelyTo;

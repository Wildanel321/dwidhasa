import { useEffect, useRef, useState } from 'react';
import siswaData from '../data/siswa.json';

interface Siswa {
  id: number;
  nama: string;
  jenisKelamin: string;
  fotoUrl: string;
  instagram: string;
  tiktok: string;
  ttl: string;
  quote: string;
}

interface BirthInfo {
  kota: string;
  day: number;
  month: number;
  year: number;
}

const BULAN_MAP: Record<string, number> = {
  januari: 1, februari: 2, maret: 3, april: 4, mei: 5, juni: 6,
  juli: 7, agustus: 8, september: 9, oktober: 10, november: 11, desember: 12,
};

const BULAN_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
  'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
];

const BAR_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#F7DC6F', '#BB8FCE', '#82E0AA', '#F1948A',
  '#A9CCE3', '#F8C471',
];

function parseTTL(ttl: string): BirthInfo | null {
  try {
    const parts = ttl.split(',');
    if (parts.length < 2) return null;
    const kota = parts[0].trim();
    const datePart = parts.slice(1).join(',').trim();
    const tokens = datePart.split(' ').filter(Boolean);
    if (tokens.length < 3) return null;
    const day = parseInt(tokens[0], 10);
    const month = BULAN_MAP[tokens[1].toLowerCase()] ?? null;
    const year = parseInt(tokens[2], 10);
    if (!day || !month || !year) return null;
    return { kota, day, month, year };
  } catch {
    return null;
  }
}

function getZodiak(day: number, month: number): string {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries ♈';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus ♉';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini ♊';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer ♋';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo ♌';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo ♍';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra ♎';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio ♏';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagitarius ♐';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn ♑';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius ♒';
  return 'Pisces ♓';
}

function StatCard({
  emoji, label, value, sub, color, delay,
}: {
  emoji: string; label: string; value: string | number; sub?: string; color: string; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        border: '3px solid #000',
        boxShadow: '5px 5px 0px #000',
        backgroundColor: color,
        padding: '1.25rem',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
      }}
    >
      <div style={{ fontSize: '2.5rem', lineHeight: 1, marginBottom: '0.5rem' }}>{emoji}</div>
      <div style={{ fontWeight: 900, fontSize: '2rem', lineHeight: 1, color: '#000' }}>{value}</div>
      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#000', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.25rem' }}>{label}</div>
      {sub && <div style={{ fontSize: '0.75rem', color: '#333', marginTop: '0.25rem', fontWeight: 600 }}>{sub}</div>}
    </div>
  );
}

export function StatistikKelas() {
  const siswa: Siswa[] = siswaData as Siswa[];
  const [barWidths, setBarWidths] = useState<number[]>(Array(12).fill(0));
  const barRef = useRef<HTMLDivElement>(null);
  const barAnimated = useRef(false);

  // --- Calculations ---
  const cowok = siswa.filter((s) => s.jenisKelamin === 'Laki-laki').length;
  const cewek = siswa.filter((s) => s.jenisKelamin === 'Perempuan').length;
  const total = siswa.length;
  const cowokPct = Math.round((cowok / total) * 100);
  const cewekPct = 100 - cowokPct;

  const birthInfos = siswa.map((s) => parseTTL(s.ttl)).filter(Boolean) as BirthInfo[];

  // Month distribution
  const monthCount = Array(12).fill(0);
  birthInfos.forEach((b) => { if (b.month >= 1 && b.month <= 12) monthCount[b.month - 1]++; });
  const maxMonth = Math.max(...monthCount);

  // Zodiak
  const zodiakCount: Record<string, number> = {};
  birthInfos.forEach((b) => {
    const z = getZodiak(b.day, b.month);
    zodiakCount[z] = (zodiakCount[z] ?? 0) + 1;
  });
  const topZodiak = Object.entries(zodiakCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  // Ages & fun facts
  const now = new Date(2026, 5, 6); // June 6 2026
  const ages = birthInfos.map((b) => {
    const born = new Date(b.year, b.month - 1, b.day);
    let age = now.getFullYear() - born.getFullYear();
    const m = now.getMonth() - born.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < born.getDate())) age--;
    return age;
  });
  const avgAge = ages.length ? (ages.reduce((a, b) => a + b, 0) / ages.length).toFixed(1) : '-';

  const sortedByDate = [...birthInfos].sort((a, b) => {
    const da = new Date(a.year, a.month - 1, a.day);
    const db = new Date(b.year, b.month - 1, b.day);
    return da.getTime() - db.getTime();
  });
  const tertua = sortedByDate.length ? siswa.find((s) => {
    const p = parseTTL(s.ttl);
    return p && p.year === sortedByDate[0].year && p.month === sortedByDate[0].month && p.day === sortedByDate[0].day;
  }) : null;
  const termuda = sortedByDate.length ? siswa.find((s) => {
    const p = parseTTL(s.ttl);
    const last = sortedByDate[sortedByDate.length - 1];
    return p && p.year === last.year && p.month === last.month && p.day === last.day;
  }) : null;

  const dariBanyuwangi = birthInfos.filter((b) =>
    b.kota.toLowerCase().includes('banyuwangi'),
  ).length;
  const luarKota = total - dariBanyuwangi;

  // Bar chart animation via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !barAnimated.current) {
          barAnimated.current = true;
          setTimeout(() => {
            setBarWidths(monthCount.map((c) => (maxMonth > 0 ? (c / maxMonth) * 100 : 0)));
          }, 200);
        }
      },
      { threshold: 0.3 },
    );
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, []);

  const styles = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes donutSpin {
      from { transform: rotate(-90deg); }
      to { transform: rotate(270deg); }
    }

    .stat-section-header {
      animation: fadeInUp 0.6s ease both;
    }

    .donut-ring {
      transition: background 1s ease;
    }

    .bar-fill {
      transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
      min-width: 4px;
    }

    .zodiak-badge {
      border: 3px solid #000;
      box-shadow: 3px 3px 0px #000;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      padding: 0.5rem 1rem;
    }

    .section-neo-header {
      border: 4px solid #000;
      box-shadow: 6px 6px 0px #000;
      background: #FFD700;
      padding: 0.75rem 2rem;
      display: inline-block;
      font-weight: 900;
      font-size: 1.5rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #000;
      margin-bottom: 2rem;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <section
        style={{
          background: 'var(--bg, #fff)',
          padding: '4rem 1rem',
          fontFamily: 'inherit',
        }}
        className="dark:bg-dark-100"
        aria-label="Statistik Kelas XII.2"
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          {/* Header */}
          <div className="stat-section-header text-center" style={{ marginBottom: '3rem' }}>
            <div
              style={{
                border: '4px solid #000',
                boxShadow: '8px 8px 0px #000',
                background: '#FFD700',
                display: 'inline-block',
                padding: '0.75rem 2.5rem',
              }}
            >
              <h2
                style={{
                  fontWeight: 900,
                  fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#000',
                  margin: 0,
                }}
              >
                📊 STATISTIK KELAS XII.2
              </h2>
            </div>
          </div>

          {/* Fun Facts Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1rem',
              marginBottom: '3rem',
            }}
          >
            <StatCard emoji="👥" label="Total Siswa" value={total} color="#FFEAA7" delay={0} />
            <StatCard emoji="👦" label="Laki-laki" value={cowok} color="#85C1E9" delay={100} />
            <StatCard emoji="👧" label="Perempuan" value={cewek} color="#F1948A" delay={200} />
            <StatCard emoji="🎂" label="Rata-rata Umur" value={`${avgAge} th`} color="#96CEB4" delay={300} />
            <StatCard emoji="🏠" label="Dari Banyuwangi" value={dariBanyuwangi} color="#DDA0DD" delay={400} />
            <StatCard emoji="✈️" label="Luar Kota" value={luarKota} color="#82E0AA" delay={500} />
          </div>

          {/* Gender Donut + Zodiak */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem',
            }}
          >
            {/* Donut Chart */}
            <div
              style={{
                border: '4px solid #000',
                boxShadow: '6px 6px 0px #000',
                padding: '2rem',
                background: '#fff',
              }}
              className="dark:bg-dark-50"
            >
              <h3
                style={{
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '1.5rem',
                  borderBottom: '3px solid #000',
                  paddingBottom: '0.5rem',
                }}
                className="dark:text-white"
              >
                ⚥ Rasio Gender
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                {/* Donut */}
                <div style={{ position: 'relative', width: '140px', height: '140px', flexShrink: 0 }}>
                  <div
                    className="donut-ring"
                    style={{
                      width: '140px',
                      height: '140px',
                      borderRadius: '50%',
                      background: `conic-gradient(#85C1E9 0% ${cowokPct}%, #F1948A ${cowokPct}% 100%)`,
                      border: '4px solid #000',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: '24px',
                      borderRadius: '50%',
                      background: '#fff',
                      border: '3px solid #000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: '1rem',
                    }}
                    className="dark:bg-dark-50 dark:text-white"
                  >
                    {total}
                  </div>
                </div>

                {/* Legend */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: '20px', height: '20px', background: '#85C1E9', border: '2px solid #000' }} />
                    <span style={{ fontWeight: 700 }} className="dark:text-white">👦 Laki-laki</span>
                    <span
                      style={{
                        marginLeft: 'auto',
                        fontWeight: 900,
                        fontSize: '1.3rem',
                        border: '2px solid #000',
                        padding: '0 0.4rem',
                        background: '#85C1E9',
                      }}
                    >
                      {cowok} <span style={{ fontSize: '0.8rem' }}>({cowokPct}%)</span>
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '20px', height: '20px', background: '#F1948A', border: '2px solid #000' }} />
                    <span style={{ fontWeight: 700 }} className="dark:text-white">👧 Perempuan</span>
                    <span
                      style={{
                        marginLeft: 'auto',
                        fontWeight: 900,
                        fontSize: '1.3rem',
                        border: '2px solid #000',
                        padding: '0 0.4rem',
                        background: '#F1948A',
                      }}
                    >
                      {cewek} <span style={{ fontSize: '0.8rem' }}>({cewekPct}%)</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Zodiak */}
            <div
              style={{
                border: '4px solid #000',
                boxShadow: '6px 6px 0px #000',
                padding: '2rem',
                background: '#fff',
              }}
              className="dark:bg-dark-50"
            >
              <h3
                style={{
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '1.5rem',
                  borderBottom: '3px solid #000',
                  paddingBottom: '0.5rem',
                }}
                className="dark:text-white"
              >
                ⭐ Top 3 Zodiak
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {topZodiak.map(([zodiak, count], i) => {
                  const medals = ['🥇', '🥈', '🥉'];
                  const colors = ['#FFD700', '#C0C0C0', '#CD7F32'];
                  return (
                    <div
                      key={zodiak}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        border: '3px solid #000',
                        padding: '0.5rem 0.75rem',
                        background: colors[i] + '33',
                        boxShadow: '3px 3px 0px #000',
                      }}
                    >
                      <span style={{ fontSize: '1.5rem' }}>{medals[i]}</span>
                      <span style={{ fontWeight: 900, flex: 1, fontSize: '1.1rem' }} className="dark:text-white">{zodiak}</span>
                      <span
                        style={{
                          fontWeight: 900,
                          fontSize: '1.5rem',
                          background: colors[i],
                          border: '2px solid #000',
                          padding: '0.1rem 0.5rem',
                        }}
                      >
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Birth Month Bar Chart */}
          <div
            ref={barRef}
            style={{
              border: '4px solid #000',
              boxShadow: '6px 6px 0px #000',
              padding: '2rem',
              background: '#fff',
              marginBottom: '3rem',
            }}
            className="dark:bg-dark-50"
          >
            <h3
              style={{
                fontWeight: 900,
                fontSize: '1.1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '1.5rem',
                borderBottom: '3px solid #000',
                paddingBottom: '0.5rem',
              }}
              className="dark:text-white"
            >
              📅 Distribusi Bulan Lahir
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {BULAN_NAMES.map((bulan, i) => (
                <div key={bulan} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '36px',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      textAlign: 'right',
                      flexShrink: 0,
                    }}
                    className="dark:text-white"
                  >
                    {bulan}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      background: '#f0f0f0',
                      border: '2px solid #000',
                      height: '28px',
                      position: 'relative',
                    }}
                    className="dark:bg-dark-200"
                  >
                    <div
                      className="bar-fill"
                      style={{
                        height: '100%',
                        width: `${barWidths[i]}%`,
                        background: BAR_COLORS[i % BAR_COLORS.length],
                        borderRight: monthCount[i] > 0 ? '2px solid #000' : 'none',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      width: '24px',
                      fontWeight: 900,
                      fontSize: '0.85rem',
                      flexShrink: 0,
                    }}
                    className="dark:text-white"
                  >
                    {monthCount[i]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Podium Umur */}
          <div
            style={{
              border: '4px solid #000',
              boxShadow: '6px 6px 0px #000',
              padding: '2rem',
              background: '#fff',
              marginTop: '3rem',
            }}
            className="dark:bg-dark-50"
          >
            <h3
              style={{
                fontWeight: 900,
                fontSize: '1.1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '2rem',
                borderBottom: '3px solid #000',
                paddingBottom: '0.5rem',
                textAlign: 'center',
              }}
              className="dark:text-white"
            >
              🏆 Podium Umur
            </h3>
            
            <div className="flex flex-col md:flex-row justify-center items-end gap-4 md:gap-8 mt-8">
              
              {/* Podium 2: Tengah */}
              {sortedByDate.length >= 2 && (
                <div className="flex flex-col items-center order-2 md:order-1 flex-1">
                  <div className="bg-brutalist-blue border-4 border-black p-3 mb-2 text-center w-full shadow-[4px_4px_0px_#000]">
                    <div className="font-black text-sm uppercase">Paling Tengah</div>
                    <div className="font-black text-lg">{siswa.find(s => parseTTL(s.ttl)?.day === sortedByDate[Math.floor(sortedByDate.length/2)].day && parseTTL(s.ttl)?.month === sortedByDate[Math.floor(sortedByDate.length/2)].month)?.nama.split(' ')[0] ?? '-'}</div>
                    <div className="text-xs font-bold mt-1">{sortedByDate[Math.floor(sortedByDate.length/2)].day}/{sortedByDate[Math.floor(sortedByDate.length/2)].month}/{sortedByDate[Math.floor(sortedByDate.length/2)].year}</div>
                  </div>
                  <div className="w-full bg-[#C0C0C0] border-4 border-black border-b-0 h-24 flex items-start justify-center pt-2">
                    <span className="font-black text-3xl">#2</span>
                  </div>
                </div>
              )}

              {/* Podium 1: Tertua */}
              {tertua && (
                <div className="flex flex-col items-center order-1 md:order-2 flex-1 relative -top-4">
                  <div className="absolute -top-10 text-4xl animate-bounce">👑</div>
                  <div className="bg-brutalist-yellow border-4 border-black p-4 mb-2 text-center w-full shadow-[6px_6px_0px_#000] z-10">
                    <div className="font-black text-sm uppercase">Paling Tua</div>
                    <div className="font-black text-xl">{tertua.nama.split(' ')[0]}</div>
                    <div className="text-xs font-bold mt-1">{tertua.ttl.split(',')[1].trim()}</div>
                  </div>
                  <div className="w-full bg-[#FFD700] border-4 border-black border-b-0 h-32 flex items-start justify-center pt-2">
                    <span className="font-black text-4xl">#1</span>
                  </div>
                </div>
              )}

              {/* Podium 3: Termuda */}
              {termuda && (
                <div className="flex flex-col items-center order-3 flex-1">
                  <div className="bg-brutalist-pink border-4 border-black p-3 mb-2 text-center w-full shadow-[4px_4px_0px_#000]">
                    <div className="font-black text-sm uppercase">Paling Muda</div>
                    <div className="font-black text-lg">{termuda.nama.split(' ')[0]}</div>
                    <div className="text-xs font-bold mt-1">{termuda.ttl.split(',')[1].trim()}</div>
                  </div>
                  <div className="w-full bg-[#CD7F32] border-4 border-black border-b-0 h-16 flex items-start justify-center pt-2">
                    <span className="font-black text-2xl">#3</span>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>
    </>
  );
}

import { useState } from 'react';
import awardsData from '../data/awards.json';

interface Award {
  award: string;
  emoji: string;
  desc: string;
  namaSiswa: string;
  fotoUrl: string;
}

const awards: Award[] = awardsData as Award[];

const CARD_ACCENT_COLORS = [
  '#FFD700', '#FF6B6B', '#4ECDC4', '#96CEB4', '#DDA0DD',
  '#85C1E9', '#F8C471', '#82E0AA', '#FFEAA7', '#F1948A',
  '#BB8FCE', '#45B7D1', '#A9CCE3', '#F7DC6F', '#98D8C8',
  '#FFB347', '#87CEEB', '#DEB887', '#F0E68C', '#B0E0E6',
];

interface AwardCardProps {
  item: Award;
  index: number;
}

function AwardCard({ item, index }: AwardCardProps) {
  const [flipped, setFlipped] = useState(false);
  const accent = CARD_ACCENT_COLORS[index % CARD_ACCENT_COLORS.length];

  const styles = `
    .award-card-inner-${index} {
      position: relative;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .award-card-inner-${index}.flipped {
      transform: rotateY(180deg);
    }

    .award-card-front-${index},
    .award-card-back-${index} {
      position: absolute;
      inset: 0;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1.5rem 1rem;
      text-align: center;
    }

    .award-card-back-${index} {
      transform: rotateY(180deg);
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div
        style={{
          perspective: '1000px',
          height: '280px',
          cursor: 'pointer',
        }}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setFlipped((f) => !f); }}
        tabIndex={0}
        role="button"
        aria-label={`Award: ${item.award} — ${item.namaSiswa}. Klik untuk flip`}
      >
        {/* Outer neo border */}
        <div
          style={{
            border: '3px solid #000',
            boxShadow: `5px 5px 0px #000`,
            height: '100%',
            overflow: 'hidden',
            transition: 'box-shadow 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = '8px 8px 0px #000';
            (e.currentTarget as HTMLDivElement).style.transform = 'translate(-2px, -2px)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = '5px 5px 0px #000';
            (e.currentTarget as HTMLDivElement).style.transform = 'translate(0, 0)';
          }}
        >
          <div className={`award-card-inner-${index} ${flipped ? 'flipped' : ''}`}>
            {/* FRONT: emoji + award */}
            <div
              className={`award-card-front-${index}`}
              style={{ background: accent }}
            >
              <div
                style={{
                  fontSize: '4rem',
                  lineHeight: 1,
                  marginBottom: '0.75rem',
                  filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.3))',
                }}
              >
                {item.emoji}
              </div>
              <div
                style={{
                  fontWeight: 900,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#000',
                  lineHeight: 1.3,
                  marginBottom: '0.5rem',
                  maxWidth: '100%',
                }}
              >
                {item.award}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: '#222',
                  fontStyle: 'italic',
                  marginBottom: '1rem',
                  lineHeight: 1.4,
                }}
              >
                {item.desc}
              </div>
              <div
                style={{
                  border: '2px solid #000',
                  background: 'rgba(0,0,0,0.1)',
                  padding: '0.2rem 0.6rem',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#000',
                  letterSpacing: '0.05em',
                }}
              >
                FLIP ME →
              </div>
            </div>

            {/* BACK: photo + name */}
            <div
              className={`award-card-back-${index}`}
              style={{ background: '#fff' }}
            >
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  border: '4px solid #000',
                  boxShadow: '4px 4px 0px #000',
                  overflow: 'hidden',
                  marginBottom: '0.75rem',
                  flexShrink: 0,
                  background: '#eee',
                }}
              >
                <img
                  src={item.fotoUrl}
                  alt={item.namaSiswa}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>

              {/* Accent ribbon */}
              <div
                style={{
                  background: accent,
                  border: '2px solid #000',
                  padding: '0.15rem 0.75rem',
                  marginBottom: '0.5rem',
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{item.emoji}</span>
              </div>

              <div
                style={{
                  fontWeight: 900,
                  fontSize: '1rem',
                  color: '#000',
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                  lineHeight: 1.2,
                  marginBottom: '0.5rem',
                }}
              >
                {item.namaSiswa}
              </div>

              <div
                style={{
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#555',
                  borderTop: '2px solid #000',
                  paddingTop: '0.5rem',
                  maxWidth: '160px',
                }}
              >
                {item.award}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function ClassAwards() {
  const styles = `
    @keyframes awardsHeaderBounce {
      0%, 100% { transform: rotate(-1deg); }
      50% { transform: rotate(1deg); }
    }

    @keyframes trophySpin {
      0% { transform: scale(1) rotate(0deg); }
      25% { transform: scale(1.1) rotate(-5deg); }
      75% { transform: scale(1.1) rotate(5deg); }
      100% { transform: scale(1) rotate(0deg); }
    }

    @keyframes fadeInCard {
      from { opacity: 0; transform: translateY(30px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .awards-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.25rem;
    }

    @media (max-width: 900px) {
      .awards-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 640px) {
      .awards-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 380px) {
      .awards-grid {
        grid-template-columns: 1fr;
      }
    }

    .awards-header-box {
      animation: awardsHeaderBounce 3s ease-in-out infinite;
    }

    .trophy-icon {
      display: inline-block;
      animation: trophySpin 2s ease-in-out infinite;
    }

    .award-card-anim {
      animation: fadeInCard 0.5s ease both;
    }

    .hint-badge {
      border: 2px solid #000;
      background: #fff;
      padding: 0.3rem 1rem;
      font-weight: 700;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      display: inline-block;
      box-shadow: 3px 3px 0px #000;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <section
        aria-label="Class Awards XII.2"
        style={{ fontFamily: 'inherit' }}
      >
        {/* Header */}
        <div
          style={{
            background: '#FFD700',
            borderBottom: '4px solid #000',
            padding: '3rem 1rem 2rem',
            textAlign: 'center',
          }}
        >
          <div className="awards-header-box" style={{ display: 'inline-block', marginBottom: '1rem' }}>
            <div
              style={{
                border: '5px solid #000',
                boxShadow: '8px 8px 0px #000',
                background: '#fff',
                padding: '0.75rem 2rem',
                display: 'inline-block',
              }}
            >
              <h2
                style={{
                  fontWeight: 900,
                  fontSize: 'clamp(1.8rem, 6vw, 3rem)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#000',
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                <span className="trophy-icon">🏆</span>
                {' '}CLASS AWARDS{' '}
                <span className="trophy-icon" style={{ animationDelay: '1s' }}>🏆</span>
              </h2>
            </div>
          </div>

          <div>
            <p
              style={{
                fontWeight: 700,
                fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                color: '#000',
                margin: '0 auto 1rem',
                maxWidth: '500px',
                lineHeight: 1.6,
              }}
            >
              Penghargaan paling bergengsi se-XII.2 — dipilih oleh semesta, bukan panitia 😂
            </p>
            <span className="hint-badge">✨ Klik kartu untuk flip!</span>
          </div>
        </div>

        {/* Awards Grid */}
        <div
          style={{
            background: '#fff',
            borderTop: 'none',
            padding: '3rem 1.5rem',
          }}
          className="dark:bg-dark-100"
        >
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="awards-grid">
              {awards.map((item, index) => (
                <div
                  key={`${item.namaSiswa}-${index}`}
                  className="award-card-anim"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <AwardCard item={item} index={index} />
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <div
                style={{
                  border: '3px solid #000',
                  boxShadow: '5px 5px 0px #000',
                  background: '#FFD700',
                  display: 'inline-block',
                  padding: '0.5rem 1.5rem',
                }}
              >
                <span style={{ fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  🎓 XII.2 — FOREVER IN OUR HEARTS 🎓
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

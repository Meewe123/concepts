import type { CSSProperties } from 'react'

/**
 * Роза тонкими линиями. Лепестки (--k) раскрываются по --ratio: в планировщике — по мере роста
 * числа гостей, на первом экране — полностью (--ratio: 1) и рисуются линией при появлении.
 */
const PETALS = [
  'M0 -10 C 8 -14 12 -4 6 2 C 0 8 -10 4 -10 -4 C -10 -14 2 -22 12 -16',
  'M-24 -6 C -26 18, 26 18, 24 -6',
  'M-14 -20 C -30 -26 -34 -8 -24 -6',
  'M14 -20 C 30 -26 34 -8 24 -6',
  'M-36 -14 C -40 30, 40 30, 36 -14',
  'M-30 -30 C -50 -36 -52 -10 -36 -14',
  'M30 -30 C 50 -36 52 -10 36 -14',
  'M-48 -22 C -54 42, 54 42, 48 -22',
  'M-48 -22 C -66 -32 -72 -2 -56 16',
  'M48 -22 C 66 -32 72 -2 56 16',
  'M-56 16 C -50 44 -24 56 0 56 C 24 56 50 44 56 16',
]

export function Rose({ className = '', still = false, stem = true }: { className?: string; still?: boolean; stem?: boolean }) {
  return (
    <svg viewBox={stem ? '-80 -60 160 240' : '-74 -40 148 104'} className={`cv-rose ${still ? 'cv-still' : ''} ${className}`} aria-hidden fill="none">
      {PETALS.map((d, k) => (
        <path key={d} d={d} pathLength={1} className="cv-petal cv-draw" style={{ '--k': k, '--d': `${0.15 + k * 0.09}s` } as CSSProperties} />
      ))}
      {stem && (
        <g>
          <path d="M0 56 C 4 96 -4 132 2 176" pathLength={1} className="cv-draw" style={{ '--d': '1.1s' } as CSSProperties} />
          <path d="M2 112 C 24 96 46 102 56 88 C 42 112 24 116 2 112" pathLength={1} className="cv-draw" style={{ '--d': '1.3s' } as CSSProperties} />
          <path d="M0 140 C -22 126 -44 132 -52 118 C -40 142 -20 146 0 140" pathLength={1} className="cv-draw" style={{ '--d': '1.4s' } as CSSProperties} />
        </g>
      )}
    </svg>
  )
}

/** Бархатный занавес: две кулисы расходятся при загрузке и остаются по краям сцены. */
export function Curtain({ still = false }: { still?: boolean }) {
  return (
    <div aria-hidden className={`cv-curtain ${still ? 'cv-still' : ''}`}>
      <div className="cv-drape cv-drape-l" />
      <div className="cv-drape cv-drape-r" />
      <svg viewBox="0 0 400 40" preserveAspectRatio="none" className="cv-valance">
        <path d="M0 0 H400 V18 Q 380 40 360 18 Q 340 40 320 18 Q 300 40 280 18 Q 260 40 240 18 Q 220 40 200 18 Q 180 40 160 18 Q 140 40 120 18 Q 100 40 80 18 Q 60 40 40 18 Q 20 40 0 18 Z" />
      </svg>
    </div>
  )
}

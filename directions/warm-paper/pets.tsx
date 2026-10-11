import type { CSSProperties } from 'react'

/** Кошка и собака одной линией, как карандашный набросок. Рисуются при появлении (stroke-dashoffset). */

const CAT = [
  'M60 70 C60 40 140 40 140 70 C140 100 120 112 100 112 C80 112 60 100 60 70 Z',
  'M66 58 L70 22 L92 46',
  'M108 46 L130 22 L134 58',
  'M80 74 q6 -5 12 0',
  'M108 74 q6 -5 12 0',
  'M98 86 l2 3 l2 -3 M100 89 q-4 6 -9 4 M100 89 q4 6 9 4',
  'M74 90 h-22 M74 96 l-20 4 M126 90 h22 M126 96 l20 4',
  'M78 110 C50 140 46 210 60 240 L140 240 C154 210 150 140 122 110',
  'M84 240 q0 -40 6 -60 M116 240 q0 -40 -6 -60',
  'M140 236 C190 240 196 190 168 182',
]

const DOG = [
  'M58 78 C58 44 142 44 142 78 C142 108 124 122 100 122 C76 122 58 108 58 78 Z',
  'M62 62 C38 66 34 108 52 120 C60 112 62 96 64 84',
  'M138 62 C162 66 166 108 148 120 C140 112 138 96 136 84',
  'M88 101 q12 10 24 0',
  'M76 128 q24 12 48 0',
  'M74 120 C46 150 44 214 56 244 L144 244 C156 214 154 150 126 120',
  'M86 244 v-56 M114 244 v-56',
  'M144 230 C178 226 186 200 176 184',
]

function Strokes({ paths, delay = 0 }: { paths: string[]; delay?: number }) {
  return (
    <>
      {paths.map((d, i) => (
        <path key={d} d={d} pathLength={1} className="wp-draw" style={{ '--d': `${delay + i * 0.08}s` } as CSSProperties} />
      ))}
    </>
  )
}

export function LineCat({ delay = 0 }: { delay?: number }) {
  return (
    <g className="wp-cat">
      <Strokes paths={CAT} delay={delay} />
    </g>
  )
}

export function LineDog({ delay = 0 }: { delay?: number }) {
  return (
    <g className="wp-dog">
      <Strokes paths={DOG} delay={delay} />
      <circle cx={84} cy={80} r={3.2} className="wp-dot" />
      <circle cx={116} cy={80} r={3.2} className="wp-dot" />
      <ellipse cx={100} cy={93} rx={7} ry={5} className="wp-dot" />
    </g>
  )
}

/** Для календаря прививок: оба питомца, виден тот, что выбран (data-pet у предка). */
export function LinePet({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="20 10 180 250" className={`wp-pet ${className}`} aria-hidden fill="none">
      <LineCat />
      <LineDog />
    </svg>
  )
}

/** Сердечко терракотой. */
export function Heart({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 6 C-10 -4 -20 6 0 22 C20 6 10 -4 0 6 Z"
      className="wp-heart"
    />
  )
}

/** Короткая волнистая линия терракотой — подчёркивание заголовков. */
export function Squiggle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 12" className={className} aria-hidden fill="none">
      <path d="M2 7 q10 -8 20 0 t20 0 t20 0 t20 0 t20 0 t16 0" className="wp-squiggle" />
    </svg>
  )
}

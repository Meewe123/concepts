/**
 * Кошка и собака из простых фигур. Общие части (голова, глаза, лапы) остаются,
 * отличающиеся (уши, морда, хвост, туловище) — классы pg-cat / pg-dog: CSS показывает нужные
 * по data-pet у предка и «перестраивает» фигуры с пружинистой анимацией.
 */
export function GeoPet({ className = '', sun = true }: { className?: string; sun?: boolean }) {
  return (
    <svg viewBox="0 0 400 400" className={`pg-pet ${className}`} aria-hidden>
      {sun && <circle cx={200} cy={215} r={175} className="pg-sun" />}
      <g className="pg-body-wrap">
        {/* хвост */}
        <path className="pg-dog pg-ink-line" d="M300 362 q58 -36 44 -104" strokeWidth={16} />
        <path className="pg-cat pg-ink-line" d="M286 372 q96 6 76 -128 q-6 -26 -24 -18" strokeWidth={12} />
        {/* туловище */}
        <path className="pg-dog pg-fill-white pg-ink" d="M92 384 C92 226 308 226 308 384 Z" />
        <path className="pg-cat pg-fill-white pg-ink" d="M122 384 C122 236 278 236 278 384 Z" />
        {/* ошейник с жетоном-плюсом (доктор) */}
        <g className="pg-dog">
          <path d="M146 254 Q200 280 254 254" className="pg-ink-line" strokeWidth={9} />
          <circle cx={200} cy={282} r={15} className="pg-fill-yellow pg-ink" />
          <path d="M200 274 v16 M192 282 h16" className="pg-ink-line" strokeWidth={4} />
        </g>
        {/* лапы */}
        <circle cx={168} cy={376} r={19} className="pg-fill-white pg-ink" />
        <circle cx={232} cy={376} r={19} className="pg-fill-white pg-ink" />
        {/* уши */}
        <polygon className="pg-cat pg-fill-ink" points="132,140 146,52 196,112" />
        <polygon className="pg-cat pg-fill-ink" points="268,140 254,52 204,112" />
        <polygon className="pg-cat pg-fill-yellow" points="146,126 152,80 178,112" />
        <polygon className="pg-cat pg-fill-yellow" points="254,126 248,80 222,112" />
        {/* голова */}
        <circle cx={200} cy={172} r={76} className="pg-head pg-fill-white pg-ink" />
        <path className="pg-dog pg-fill-ink" d="M150 112 C104 104 92 150 100 222 C104 250 132 246 140 222 L154 150 Z" />
        <path className="pg-dog pg-fill-ink" d="M250 112 C296 104 308 150 300 222 C296 250 268 246 260 222 L246 150 Z" />
        {/* глаза */}
        <circle className="pg-dog pg-fill-ink" cx={172} cy={160} r={9} />
        <circle className="pg-dog pg-fill-ink" cx={228} cy={160} r={9} />
        <ellipse className="pg-cat pg-fill-ink" cx={172} cy={162} rx={7} ry={12} />
        <ellipse className="pg-cat pg-fill-ink" cx={228} cy={162} rx={7} ry={12} />
        {/* морда */}
        <ellipse className="pg-dog pg-fill-yellow pg-ink" cx={200} cy={200} rx={36} ry={27} />
        <ellipse className="pg-dog pg-fill-ink" cx={200} cy={189} rx={13} ry={9} />
        <path className="pg-dog pg-ink-line" d="M186 210 q14 10 28 0" strokeWidth={4} />
        <polygon className="pg-cat pg-fill-ink" points="190,190 210,190 200,202" />
        <path className="pg-cat pg-ink-line" d="M162 196 h-40 M162 206 l-38 8 M238 196 h40 M238 206 l38 8" strokeWidth={4} />
        <path className="pg-cat pg-ink-line" d="M190 212 q10 8 20 0" strokeWidth={4} />
      </g>
    </svg>
  )
}

/** Три фигуры — знак направления у заголовков. */
export function ShapesMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 24" width={54} height={18} className={className} aria-hidden>
      <circle cx={12} cy={12} r={10} className="pg-fill-yellow" />
      <polygon points="30,22 40,2 50,22" className="pg-fill-ink" />
      <rect x={56} y={4} width={15} height={15} rx={2} fill="none" stroke="currentColor" strokeWidth={3} />
    </svg>
  )
}

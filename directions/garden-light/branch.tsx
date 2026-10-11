import type { CSSProperties } from 'react'
import { r1 } from '@/core/random'

/** Ветка: стебель-кривая Безье и листья по обе стороны. Листья (--k) раскрываются по --ratio в планировщике. */
type P = [number, number]
const bez = (p0: P, p1: P, p2: P, p3: P, t: number): P => {
  const u = 1 - t
  return [
    u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
    u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
  ]
}

export function Branch({
  className = '',
  leaves = 9,
  still = false,
  flowers = true,
}: {
  className?: string
  leaves?: number
  still?: boolean
  flowers?: boolean
}) {
  const p0: P = [20, 300]
  const p1: P = [90, 250]
  const p2: P = [120, 150]
  const p3: P = [230, 40]
  const items = Array.from({ length: leaves }, (_, k) => {
    const t = 0.12 + (k / leaves) * 0.82
    const [x, y] = bez(p0, p1, p2, p3, t)
    const [x2, y2] = bez(p0, p1, p2, p3, t + 0.01)
    const angle = (Math.atan2(y2 - y, x2 - x) * 180) / Math.PI + (k % 2 ? 50 : -50)
    const size = 1 - k / (leaves * 1.6)
    return { k, x: r1(x), y: r1(y), angle: r1(angle), size: r1(size) }
  })
  const d = (s: number) => ({ '--d': `${s}s` }) as CSSProperties
  return (
    <svg viewBox="0 0 260 320" className={`gl-branch ${still ? 'gl-still' : ''} ${className}`} aria-hidden fill="none">
      <path d={`M${p0} C${p1} ${p2} ${p3}`} pathLength={1} className="gl-draw" style={d(0.1)} />
      {items.map((it) => (
        <path
          key={it.k}
          transform={`translate(${it.x} ${it.y}) rotate(${it.angle}) scale(${it.size})`}
          d="M0 0 C 10 -12 32 -12 42 0 C 32 12 10 12 0 0 Z M4 0 H36"
          pathLength={1}
          className="gl-leaf gl-draw"
          style={{ '--k': it.k, '--d': `${0.4 + it.k * 0.1}s` } as CSSProperties}
        />
      ))}
      {flowers && (
        <g className="gl-flowers">
          <circle cx={230} cy={40} r={7} className="gl-bloom" style={d(1.4)} />
          <circle cx={150} cy={120} r={5} className="gl-bloom" style={d(1.6)} />
          <circle cx={88} cy={232} r={4} className="gl-bloom" style={d(1.8)} />
        </g>
      )}
    </svg>
  )
}

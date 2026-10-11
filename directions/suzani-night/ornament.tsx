import type { CSSProperties } from 'react'
import { r1 } from '@/core/random'

/**
 * Собственный геометрический орнамент по мотивам гириха и сюзане (не копия конкретного узора):
 * восьмиконечная звезда {8/3}, венец из 16 лучей и стрельчатые лепестки по кругу.
 */

const rad = (deg: number) => (deg * Math.PI) / 180
const pt = (r: number, deg: number) => `${r1(r * Math.cos(rad(deg)))},${r1(r * Math.sin(rad(deg)))}`

export function starPoints(n: number, outer: number, inner: number, rot = -90): string {
  const pts: string[] = []
  for (let k = 0; k < n * 2; k++) pts.push(pt(k % 2 ? inner : outer, rot + (k * 180) / n))
  return pts.join(' ')
}

function lancets(n: number, from: number, to: number, half: number): string {
  let d = ''
  for (let k = 0; k < n; k++) {
    const a = -90 + (k * 360) / n
    d += `M${pt(from, a - half)} Q${pt(to - 7, a - half * 0.7)} ${pt(to, a)} Q${pt(to - 7, a + half * 0.7)} ${pt(from, a + half)} `
  }
  return d.trim()
}

function connectors(): string {
  let d = ''
  for (let k = 0; k < 8; k++) {
    const a = -90 + k * 45
    d += `M${pt(48, a)} L${pt(60, a - 11.25)} M${pt(48, a)} L${pt(60, a + 11.25)} `
  }
  return d.trim()
}

/** Звезда, нарисованная «лентой»: золотая линия с тёмной прорезью внутри, как в плетёном гирихе. */
function Band({ points, d, delay }: { points?: string; d?: string; delay: number }) {
  const style = { '--d': `${delay}s` } as CSSProperties
  const common = { pathLength: 1, className: 'sz-draw', style }
  return (
    <>
      {points ? <polygon points={points} {...common} strokeWidth={2.6} /> : <path d={d} {...common} strokeWidth={2.6} />}
      {points ? (
        <polygon points={points} {...common} className="sz-draw sz-cut" strokeWidth={0.9} />
      ) : (
        <path d={d} {...common} className="sz-draw sz-cut" strokeWidth={0.9} />
      )}
    </>
  )
}

export function Rosette({ className = '', still = false }: { className?: string; still?: boolean }) {
  const line = (delay: number) => ({ pathLength: 1, className: 'sz-draw', style: { '--d': `${delay}s` } as CSSProperties })
  return (
    <svg viewBox="-104 -104 208 208" className={`sz-rosette ${still ? 'sz-still' : ''} ${className}`} aria-hidden fill="none">
      <circle r={101} strokeWidth={0.6} {...line(0)} />
      <circle r={96.5} strokeWidth={1.2} {...line(0.1)} />
      <path d={lancets(16, 73, 94, 8.5)} strokeWidth={1} {...line(0.35)} />
      <path d={lancets(16, 73, 86, 3.2)} strokeWidth={0.6} {...line(0.5)} />
      <Band points={starPoints(16, 73, 61)} delay={0.25} />
      <path d={connectors()} strokeWidth={1} {...line(0.7)} />
      <Band points={starPoints(8, 49, 26)} delay={0.45} />
      <polygon points={starPoints(8, 26, 26, -90 + 22.5)} strokeWidth={0.8} {...line(0.8)} />
      <Band points={starPoints(8, 15, 8)} delay={0.9} />
      <circle r={3} className="sz-dot" />
    </svg>
  )
}

/** Маленькая восьмиконечная звезда — знак направления. */
export function StarMark({ className = '', size = 18 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="-12 -12 24 24" width={size} height={size} className={className} aria-hidden fill="none">
      <polygon points={starPoints(8, 11, 5.5)} stroke="currentColor" strokeWidth={1.2} />
      <circle r={1.6} fill="currentColor" />
    </svg>
  )
}

/** Плитка гириха для фона и заглушек фото. */
export function GirihPattern({ id, scale = 1, rotate = 0 }: { id: string; scale?: number; rotate?: number }) {
  const s = 56 * scale
  return (
    <pattern id={id} width={s} height={s} patternUnits="userSpaceOnUse" patternTransform={`rotate(${rotate})`}>
      <g transform={`translate(${s / 2} ${s / 2}) scale(${scale})`} fill="none" strokeWidth={0.8}>
        <polygon points={starPoints(8, 18, 9)} />
        <polygon points={starPoints(4, 28, 28, -45)} />
        <circle r={4} />
      </g>
    </pattern>
  )
}

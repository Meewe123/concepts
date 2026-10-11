import { r1 } from '@/core/random'
import type { SchemeSkin } from '@/niches/banquet/skin'
import { SPECTRUM } from './spectrum'

/** Схема зала crystal-facet: сцена — гранёная планка, столы — шестигранники, занятые ловят свет. */
export const scheme: SchemeSkin = {
    Defs: () => (
      <>
        <linearGradient id="bf-facet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#a9c7df" />
        </linearGradient>
        <linearGradient id="bf-spec" x1="0" y1="0" x2="1" y2="0">
          {SPECTRUM.map((c, i) => (
            <stop key={c} offset={i / (SPECTRUM.length - 1)} stopColor={c} />
          ))}
        </linearGradient>
      </>
    ),
    Frame: ({ width, height, stageBottom, label }) => {
      const cx = width / 2
      const top = 18
      const h = stageBottom - top - 8
      const w = 180
      const pts = `${cx - w / 2 + 12},${top} ${cx + w / 2 - 12},${top} ${cx + w / 2},${top + h / 2} ${cx + w / 2 - 12},${top + h} ${cx - w / 2 + 12},${top + h} ${cx - w / 2},${top + h / 2}`
      return (
        <g>
          <rect x={5} y={5} width={width - 10} height={height - 10} rx={10} className="bf-scheme-line" strokeWidth={1} />
          <polygon points={pts} fill="#e3edf5" className="bf-scheme-line" strokeWidth={0.8} />
          <text x={cx} y={top + h / 2 + 4} textAnchor="middle" fontSize={11} className="bf-scheme-text">
            {label}
          </text>
        </g>
      )
    },
    Floor: ({ x, y, w, h, label }) => (
      <g>
        <polygon
          points={`${x + w / 2},${y} ${x + w},${y + h / 2} ${x + w / 2},${y + h} ${x},${y + h / 2}`}
          className="bf-scheme-line"
          strokeWidth={0.8}
          strokeDasharray="3 4"
        />
        <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fontSize={11} className="bf-scheme-text">
          {label}
        </text>
      </g>
    ),
    Table: ({ x, y, r }) => {
      const hex = Array.from({ length: 6 }, (_, k) => {
        const a = ((-90 + k * 60) * Math.PI) / 180
        return [r1(r * Math.cos(a)), r1(r * Math.sin(a))]
      })
      const pts = hex.map((q) => q.join(',')).join(' ')
      return (
        <g transform={`translate(${x} ${y})`}>
          <polygon points={pts} className="t-off" />
          <g className="t-on">
            <polygon points={pts} fill="url(#bf-facet)" stroke="url(#bf-spec)" />
            <path d={`M0,0 L${hex[0]!.join(',')} M0,0 L${hex[2]!.join(',')} M0,0 L${hex[4]!.join(',')}`} stroke="#ffffff" strokeWidth={0.9} />
          </g>
        </g>
      )
    },
  }

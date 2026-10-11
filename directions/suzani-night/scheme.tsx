import type { SchemeSkin } from '@/niches/banquet/skin'
import { starPoints } from './ornament'

/** Схема зала suzani-night: сцена — стрельчатая арка, столы — восьмиконечные звёзды. Рисуется в островке. */
export const scheme: SchemeSkin = {
    Frame: ({ width, height, stageBottom, label }) => {
      const cx = width / 2
      const x0 = cx - 66
      const x1 = cx + 66
      const top = 14
      return (
        <g>
          <rect x={5} y={5} width={width - 10} height={height - 10} rx={2} className="sz-scheme-line" strokeWidth={1.2} />
          <rect x={9} y={9} width={width - 18} height={height - 18} rx={1} className="sz-scheme-line" strokeWidth={0.5} opacity={0.6} />
          <path
            d={`M${x0} ${stageBottom} L${x0} ${top + 20} Q${x0} ${top + 3} ${cx} ${top} Q${x1} ${top + 3} ${x1} ${top + 20} L${x1} ${stageBottom} Z`}
            className="sz-scheme-line"
            strokeWidth={1}
            fill="rgba(212,176,106,0.1)"
          />
          <text x={cx} y={stageBottom - 12} textAnchor="middle" fontSize={11} className="sz-scheme-text">
            {label}
          </text>
        </g>
      )
    },
    Floor: ({ x, y, w, h, label }) => {
      const c = Math.min(w, h) * 0.22
      const pts = `${x + c},${y} ${x + w - c},${y} ${x + w},${y + c} ${x + w},${y + h - c} ${x + w - c},${y + h} ${x + c},${y + h} ${x},${y + h - c} ${x},${y + c}`
      return (
        <g>
          <polygon points={pts} className="sz-scheme-line" strokeWidth={0.8} strokeDasharray="3 4" />
          <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fontSize={11} className="sz-scheme-text">
            {label}
          </text>
        </g>
      )
    },
    Table: ({ x, y, r }) => (
      <g transform={`translate(${x} ${y})`}>
        <polygon points={starPoints(8, r, r * 0.62)} className="t-off" />
        <polygon points={starPoints(8, r, r * 0.62)} className="t-on" />
        <circle r={r * 0.2} className="t-core" />
      </g>
    ),
  }

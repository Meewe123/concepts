import type { SchemeSkin } from '@/niches/banquet/skin'

/** Схема зала garden-light: сцена — пергола, танцпол — фонтан, столы — клумбы. */
export const scheme: SchemeSkin = {
  Frame: ({ width, height, stageBottom, label }) => {
    const cx = width / 2
    return (
      <g>
        <rect x={5} y={5} width={width - 10} height={height - 10} rx={26} className="gl-scheme" strokeWidth={1.2} />
        {[-56, 0, 56].map((dx) => (
          <path key={dx} d={`M${cx + dx - 26} ${stageBottom} V${30} Q${cx + dx} ${8} ${cx + dx + 26} ${30} V${stageBottom}`} className="gl-scheme" strokeWidth={1} />
        ))}
        <text x={cx} y={stageBottom - 8} textAnchor="middle" fontSize={11} className="gl-scheme-text">
          {label}
        </text>
      </g>
    )
  },
  Floor: ({ x, y, w, h, label }) => {
    const cx = x + w / 2
    const cy = y + h / 2
    const r = Math.min(w, h) / 2
    return (
      <g>
        <circle cx={cx} cy={cy} r={r} className="gl-scheme" strokeWidth={0.9} />
        <circle cx={cx} cy={cy} r={r * 0.62} className="gl-scheme" strokeWidth={0.6} strokeDasharray="2 3" />
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize={10.5} className="gl-scheme-text">
          {label}
        </text>
      </g>
    )
  },
  Table: ({ x, y, r }) => (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} className="t-off" />
      <g className="t-on">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx={0} cy={-r * 0.5} rx={r * 0.32} ry={r * 0.5} transform={`rotate(${a})`} />
        ))}
      </g>
      <circle r={r * 0.22} className="t-bud" />
    </g>
  ),
}

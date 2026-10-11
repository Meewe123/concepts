import type { SchemeSkin } from '@/niches/banquet/skin'

/** Схема зала marble-brass: двойная латунная рамка, полукруглая сцена, паркет «ёлочкой» на танцполе. */
export const scheme: SchemeSkin = {
  Frame: ({ width, height, stageBottom, label }) => {
    const cx = width / 2
    return (
      <g>
        <rect x={5} y={5} width={width - 10} height={height - 10} className="mb-scheme" strokeWidth={1.2} />
        <rect x={10} y={10} width={width - 20} height={height - 20} className="mb-scheme" strokeWidth={0.5} />
        <path d={`M${cx - 80} ${stageBottom} A 80 ${stageBottom - 14} 0 0 1 ${cx + 80} ${stageBottom} Z`} className="mb-scheme" fill="rgba(165,128,63,0.1)" strokeWidth={1} />
        <text x={cx} y={stageBottom - 10} textAnchor="middle" fontSize={11} className="mb-scheme-text">
          {label}
        </text>
      </g>
    )
  },
  Floor: ({ x, y, w, h, label }) => {
    const lines: string[] = []
    for (let i = -h; i < w; i += 12) lines.push(`M${x + i} ${y + h} L${x + i + h} ${y}`)
    return (
      <g>
        <clipPath id={`mb-floor-${x}-${y}`}>
          <rect x={x} y={y} width={w} height={h} />
        </clipPath>
        <g clipPath={`url(#mb-floor-${x}-${y})`} className="mb-scheme" strokeWidth={0.4} opacity={0.7}>
          {lines.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <rect x={x} y={y} width={w} height={h} className="mb-scheme" strokeWidth={0.9} />
        <rect x={x + w / 2 - 34} y={y + h / 2 - 9} width={68} height={18} fill="var(--c-surface)" />
        <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fontSize={11} className="mb-scheme-text">
          {label}
        </text>
      </g>
    )
  },
  Table: ({ x, y, r }) => (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} className="t-off" />
      <circle r={r} className="t-on" />
      <circle r={r * 0.25} className="t-dot" />
    </g>
  ),
}

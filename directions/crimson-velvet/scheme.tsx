import type { SchemeSkin } from '@/niches/banquet/skin'

/** Схема зала crimson-velvet: сцена с ламбрекеном, столы — розы-спирали. */
export const scheme: SchemeSkin = {
  Frame: ({ width, height, stageBottom, label }) => {
    const cx = width / 2
    const w = 170
    let scallops = ''
    for (let x = cx - w / 2; x < cx + w / 2; x += 17) scallops += `Q${x + 8.5} ${30} ${x + 17} 18 `
    return (
      <g>
        <rect x={5} y={5} width={width - 10} height={height - 10} rx={18} className="cv-scheme" strokeWidth={1.2} />
        <path d={`M${cx - w / 2} 14 H${cx + w / 2} V${stageBottom} H${cx - w / 2} Z`} className="cv-scheme" fill="rgba(232,207,159,0.08)" strokeWidth={1} />
        <path d={`M${cx - w / 2} 18 ${scallops}`} className="cv-scheme" strokeWidth={1} />
        <text x={cx} y={stageBottom - 10} textAnchor="middle" fontSize={11} className="cv-scheme-text">
          {label}
        </text>
      </g>
    )
  },
  Floor: ({ x, y, w, h, label }) => (
    <g>
      <ellipse cx={x + w / 2} cy={y + h / 2} rx={w / 2} ry={h / 2} className="cv-scheme" strokeWidth={0.8} strokeDasharray="2 4" />
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fontSize={11} className="cv-scheme-text">
        {label}
      </text>
    </g>
  ),
  Table: ({ x, y, r }) => (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} className="t-off" />
      <circle r={r} className="t-on" />
      <circle r={r * 0.48} className="t-spiral" />
      <circle r={r * 0.16} className="t-spiral" />
    </g>
  ),
}

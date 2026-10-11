import type { CSSProperties } from 'react'
import { layoutHall } from './layout'
import type { SchemeSkin } from './skin'

/** SVG-схема зала. Какие столы заняты, решает CSS по --filled у обёртки, без перерисовки. */
export function HallScheme({
  capacity,
  skin,
  label,
  stage,
  floor,
}: {
  capacity: number
  skin: SchemeSkin
  label: string
  stage: string
  floor: string
}) {
  const L = layoutHall(capacity)
  const { Defs, Frame, Floor, Table } = skin
  return (
    <svg viewBox={`0 0 ${L.width} ${L.height}`} className="hall-scheme block h-auto w-full" role="img" aria-label={label}>
      {Defs && (
        <defs>
          <Defs />
        </defs>
      )}
      <Frame width={L.width} height={L.height} stageBottom={L.stageBottom} label={stage} />
      <Floor {...L.floor} label={floor} />
      {L.tables.map((t, i) => (
        <g key={i} className="t" style={{ '--i': i } as CSSProperties}>
          <Table {...t} />
        </g>
      ))}
    </svg>
  )
}

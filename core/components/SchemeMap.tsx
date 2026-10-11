import { ui } from '@/core/i18n'
import { r1, seeded } from '@/core/random'
import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'

const W = 400
const H = 260

/**
 * Условная схема места без iframe и тайлов: улица с домом или квартал.
 * Никаких утверждений о соседних объектах — только то, что есть в адресе.
 */
export function SchemeMap({ lead, locale }: { lead: Lead; locale: Locale }) {
  const rand = seeded(lead.slug)
  const map = lead.map
  const label = `${ui.address[locale]}: ${tx(lead.address, locale)}`

  return (
    <figure className="m-0">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} className="block h-auto w-full">
        <rect width={W} height={H} className="fill-bg-2" />
        {map.kind === 'street' ? <Street rand={rand} lead={lead} locale={locale} /> : <Quarter lead={lead} locale={locale} />}
      </svg>
      <figcaption className="mt-3 text-sm text-ink-2">{tx(ui.mapNote, locale)}</figcaption>
    </figure>
  )
}

function Pin({ x, y, name }: { x: number; y: number; name: string }) {
  const w = name.length * 7.4 + 22
  const left = x + w + 24 > W
  const tagX = left ? x - 18 - w : x + 18
  return (
    <g>
      <circle cx={x} cy={y} r={20} className="fill-accent" opacity={0.16} />
      <circle cx={x} cy={y} r={7.5} className="fill-accent stroke-bg" strokeWidth={3} />
      <rect x={tagX} y={y - 15} width={w} height={30} rx={4} className="fill-ink" />
      <text x={tagX + w / 2} y={y + 5} textAnchor="middle" className="fill-bg font-body" fontSize={14} fontWeight={600}>
        {name}
      </text>
    </g>
  )
}

function Street({ rand, lead, locale }: { rand: () => number; lead: Lead; locale: Locale }) {
  if (lead.map.kind !== 'street') return null
  const minor: string[] = []
  for (let i = 0; i < 6; i++) {
    const y = 20 + i * 44 + rand() * 14
    minor.push(`M -10 ${r1(y)} L ${W + 10} ${r1(y + (rand() - 0.5) * 40)}`)
  }
  for (let i = 0; i < 7; i++) {
    const x = 20 + i * 62 + rand() * 18
    minor.push(`M ${r1(x)} -10 L ${r1(x + (rand() - 0.5) * 50)} ${H + 10}`)
  }
  const main = `M -20 ${H * 0.78} C ${W * 0.3} ${H * 0.64}, ${W * 0.62} ${H * 0.5}, ${W + 20} ${H * 0.2}`
  const street = lead.map.house ? `${tx(lead.map.street, locale)}, ${lead.map.house}` : tx(lead.map.street, locale)
  return (
    <>
      <g className="stroke-line" strokeWidth={1} fill="none">
        {minor.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <path id={`street-${lead.slug}`} d={main} fill="none" className="stroke-ink" strokeWidth={14} strokeLinecap="round" opacity={0.9} />
      <path d={main} fill="none" className="stroke-bg-2" strokeWidth={10} strokeLinecap="round" />
      <text fontSize={12.5} className="fill-ink-2 font-body" dy={-14}>
        <textPath href={`#street-${lead.slug}`} startOffset="6%">
          {street}
        </textPath>
      </text>
      <Pin x={W * 0.56} y={H * 0.52} name={lead.name} />
    </>
  )
}

function Quarter({ lead, locale }: { lead: Lead; locale: Locale }) {
  if (lead.map.kind !== 'quarter') return null
  const cols = 5
  const rows = 3
  const gap = 14
  const bw = (W - gap * (cols + 1)) / cols
  const bh = (H - 44 - gap * (rows + 1)) / rows
  const blocks = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const active = r === 1 && c === 2
      blocks.push(
        <rect
          key={`${r}-${c}`}
          x={r1(gap + c * (bw + gap))}
          y={r1(44 + gap + r * (bh + gap))}
          width={r1(bw)}
          height={r1(bh)}
          rx={6}
          className={active ? 'fill-surface stroke-ink' : 'fill-none stroke-line'}
          strokeWidth={active ? 1.5 : 1}
        />,
      )
    }
  }
  const cx = gap + 2 * (bw + gap) + bw / 2
  const cy = 44 + gap + (bh + gap) + bh / 2
  return (
    <>
      <text x={gap} y={30} fontSize={14} className="fill-ink-2 font-body">
        {tx(lead.map.area, locale)} · {tx(lead.map.quarter, locale)}
      </text>
      {blocks}
      <Pin x={cx} y={cy} name={lead.name} />
    </>
  )
}

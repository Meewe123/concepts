import { Unbounded } from 'next/font/google'
import { Check, Phone, Star } from 'lucide-react'
import type { CSSProperties } from 'react'
import { ExampleTag } from '@/core/components/ExampleTag'
import { Section } from '@/core/components/Section'
import { onest } from '@/core/fonts'
import { formatRating, groupDigits, telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { r1, seeded } from '@/core/random'
import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { copy, kindLine } from '@/niches/banquet/content'
import type { BanquetHeroProps, BanquetSkin, SectionProps } from '@/niches/banquet/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { SPECTRUM } from './spectrum'
import { css } from './style'

const unbounded = Unbounded({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '800'],
  variable: '--font-unbounded',
  display: 'swap',
  preload: false,
})

const STROKE = 1.5

const lines = {
  heroSub: {
    ru: 'Всё видно сразу, как сквозь хрусталь: сколько столов займут гости, какой зал подойдёт и во что обойдётся вечер.',
    uz: 'Hammasi billur orqali qaragandek aniq: mehmonlar nechta stolni egallaydi, qaysi zal mos keladi va kecha taxminan qanchaga tushadi.',
  },
  meaning: { ru: 'Billur по-узбекски — «хрусталь»', uz: 'Billur kabi tiniq bayram' },
  capacityNote: { ru: 'гостей максимум', uz: 'mehmongacha' },
}

/** Стеклянные плоскости на весь первый экран — без видимых краёв у иллюстрации. */
function GlassPlanes({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={`bf-fade ${className}`} aria-hidden>
      <polygon points="0,0 100,0 38,62" fill="#ffffff" opacity={0.6} />
      <polygon points="100,8 100,100 55,78" fill="#dce8f1" opacity={0.5} />
      <polygon points="0,100 0,36 46,100" fill="#e8eff5" opacity={0.75} />
    </svg>
  )
}

/** Подвеска хрустальной люстры: луч входит слева, преломляется и выходит спектром. */
function CrystalArt({ className = '', still = false }: { className?: string; still?: boolean }) {
  const T = [262, 64]
  const L = [214, 176]
  const R = [310, 176]
  const B = [262, 336]
  const ML = [245, 176]
  const MR = [281, 176]
  const p = (...pts: number[][]) => pts.map((q) => q.join(',')).join(' ')
  const entry = [235.6, 125.6] as const
  const exit = [295.6, 224] as const
  const d = (s: number) => ({ '--d': `${s}s` }) as CSSProperties
  return (
    <svg viewBox="0 0 400 380" overflow="visible" className={`bf-art ${still ? 'bf-still' : ''} ${className}`} aria-hidden>
      <line x1={262} y1={0} x2={262} y2={58} className="bf-edge" />
      <rect x={257.5} y={55} width={9} height={8} fill="#121820" opacity={0.75} />
      <g className="bf-fade" style={d(0.15)}>
        <polygon points={p(T, L, ML)} fill="#ffffff" />
        <polygon points={p(T, ML, MR)} fill="#e4eef6" />
        <polygon points={p(T, MR, R)} fill="#bcd3e6" />
        <polygon points={p(L, ML, B)} fill="#f3f8fb" />
        <polygon points={p(ML, MR, B)} fill="#cde0ee" />
        <polygon points={p(MR, R, B)} fill="#97b8d4" />
        <polygon points={p(T, L, B, R)} className="bf-edge" />
        <polyline points={p(L, ML, MR, R)} className="bf-edge" />
        <polyline points={p(T, ML, B)} className="bf-edge" />
        <polyline points={p(T, MR, B)} className="bf-edge" />
      </g>
      <line x1={-900} y1={-215.1} x2={entry[0]} y2={entry[1]} pathLength={1} className="bf-ray bf-draw" style={d(0.35)} />
      <line x1={entry[0]} y1={entry[1]} x2={exit[0]} y2={exit[1]} pathLength={1} className="bf-inner bf-draw" style={d(1.05)} />
      <g className="bf-spec" style={{ '--ox': `${exit[0]}px`, '--oy': `${exit[1]}px` } as CSSProperties}>
        {SPECTRUM.map((c, k) => (
          <line
            key={c}
            x1={exit[0]}
            y1={exit[1]}
            x2={exit[0] + 330}
            y2={exit[1]}
            stroke={c}
            pathLength={1}
            className="bf-draw"
            style={{ '--k': k, '--a0': '18deg', '--d': `${1.25 + k * 0.06}s` } as CSSProperties}
          />
        ))}
      </g>
      <path d="M250 92 l2.2 6.3 6.3 2.2 -6.3 2.2 -2.2 6.3 -2.2 -6.3 -6.3 -2.2 6.3 -2.2z" fill="#ffffff" stroke="#9fbfd8" strokeWidth={0.6} className="bf-spark" />
    </svg>
  )
}

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mb-10 max-w-3xl sm:mb-14">
      <h2 className="font-display text-[2.05rem] leading-[1.08] font-light tracking-[-0.035em] sm:text-5xl">{title}</h2>
      <span className="bf-bar mt-5 block h-[3px] w-14" aria-hidden />
      {tag && <div className="mt-4">{tag}</div>}
      {lead && <p className="mt-4 max-w-xl text-lg text-ink-2">{lead}</p>}
    </div>
  )
}

const FACET_TONES = ['#ffffff', '#f1f6fa', '#e1ecf4', '#cfe0ed', '#bad3e6', '#a3c3dc']

/** Заглушка фото: гранёная плоскость, свет слева, тонкая спектральная искра. */
function PhotoArt({ seed, label, className = '' }: PhotoArtProps) {
  const rand = seeded(`bf-${seed}`)
  const cols = 5
  const rows = 6
  const pts: number[][][] = []
  for (let y = 0; y <= rows; y++) {
    const row: number[][] = []
    for (let x = 0; x <= cols; x++) {
      const edgeX = x === 0 || x === cols
      const edgeY = y === 0 || y === rows
      row.push([
        r1((x / cols) * 100 + (edgeX ? 0 : (rand() - 0.5) * 14)),
        r1((y / rows) * 100 + (edgeY ? 0 : (rand() - 0.5) * 12)),
      ])
    }
    pts.push(row)
  }
  const tris: { d: string; fill: string }[] = []
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const a = pts[y]![x]!
      const b = pts[y]![x + 1]!
      const c = pts[y + 1]![x]!
      const e = pts[y + 1]![x + 1]!
      const light = x / cols
      const pick = () => FACET_TONES[Math.min(FACET_TONES.length - 1, Math.floor(light * 4 + rand() * 2.4))]!
      const flip = rand() > 0.5
      const [t1, t2] = flip ? [[a, b, e], [a, e, c]] : [[a, b, c], [b, e, c]]
      tris.push({ d: t1.map((q) => q.join(',')).join(' '), fill: pick() })
      tris.push({ d: t2.map((q) => q.join(',')).join(' '), fill: pick() })
    }
  }
  return (
    <div className={`bf-cut relative overflow-hidden bg-surface ${className}`}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        {tris.map((t, i) => (
          <polygon key={i} points={t.d} fill={t.fill} stroke="#ffffff" strokeWidth={0.25} />
        ))}
        <line x1={46 + seed * 7} y1={100} x2={78 + seed * 4} y2={0} stroke="url(#bf-spark-line)" strokeWidth={0.6} opacity={0.7} />
        <defs>
          <linearGradient id="bf-spark-line" x1="0" y1="1" x2="1" y2="0">
            {SPECTRUM.map((c, i) => (
              <stop key={c} offset={i / (SPECTRUM.length - 1)} stopColor={c} />
            ))}
          </linearGradient>
        </defs>
      </svg>
      <p className="absolute bottom-4 left-4 bg-surface px-3 py-1.5 text-sm">{label}</p>
    </div>
  )
}

function Hero({ lead, locale, langSwitch }: BanquetHeroProps) {
  const rating = lead.rating
  return (
    <header className="relative isolate flex min-h-[100svh] flex-col overflow-hidden px-5 pt-3 pb-8 sm:px-10">
      <GlassPlanes className="absolute inset-0 -z-10 h-full w-full" />
      <div className="flex items-center justify-between">
        <span className="font-display text-sm font-extrabold tracking-[-0.02em]">{lead.name}</span>
        {langSwitch}
      </div>
      <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-[minmax(0,1fr)] content-center items-center md:grid-cols-[1fr_1.1fr] md:gap-8">
        <CrystalArt className="-mt-2 block h-auto max-h-[min(46svh,23.5rem)] w-full md:order-2 md:mt-0 md:max-h-none" />
        <div className="relative -mt-10 md:order-1 md:mt-0">
          <h1 className="font-display text-[clamp(4.6rem,25vw,9.5rem)] leading-[0.86] font-extrabold tracking-[-0.06em]">{lead.name}</h1>
          <span className="bf-bar mt-5 block h-1 w-20" aria-hidden />
          <p className="mt-5 text-lg font-semibold">{kindLine(lead, locale)}</p>
          <p className="mt-1 font-display text-sm font-light text-ink-2">{tx(lines.meaning, locale)}</p>
          <p className="mt-4 max-w-md text-ink-2">{tx(lines.heroSub, locale)}</p>
          <div className="mt-6 flex gap-3">
            <a href="#data" className="btn min-w-[13rem] flex-1 sm:flex-none">
              {tx(copy.checkDate, locale)}
            </a>
            <a href={telHref(lead.phones[0]!)} className="btn btn-ghost btn-icon" aria-label={ui.call[locale]}>
              <Phone aria-hidden className="size-5" strokeWidth={STROKE} />
            </a>
          </div>
          {rating && (
            <p className="mt-5 flex items-center gap-2 text-sm text-ink-2">
              <Star aria-hidden className="size-4 fill-current text-ink" strokeWidth={STROKE} />
              <span className="font-semibold text-ink">{formatRating(rating.value)}</span>
              <span>
                · {rating.count} {ui.ratingCount[locale]} · {locale === 'ru' ? 'Яндекс Карты' : 'Yandex Xaritalar'}
              </span>
            </p>
          )}
        </div>
      </div>
    </header>
  )
}

function Halls({ lead, locale }: SectionProps) {
  return (
    <Section id="zaly" alt>
      <Heading title={tx(copy.halls.title, locale)} lead={tx(copy.halls.lead, locale)} tag={<ExampleTag locale={locale} />} />
      <ul className="grid gap-10 sm:grid-cols-2">
        {lead.banquet!.halls.map((h, i) => (
          <li key={h.id} className="grid gap-5">
            <PhotoArt seed={i + 2} label={ui.photosHere[locale]} className="aspect-[16/10]" />
            <div className="flex items-end justify-between gap-4 border-b border-line pb-4">
              <h3 className="font-display text-xl font-light tracking-[-0.02em]">{tx(h.name, locale)}</h3>
              <p className="text-right">
                <span className="font-display text-5xl leading-none font-extrabold tracking-[-0.05em]">{h.capacity}</span>
                <span className="mt-1 block text-sm text-ink-2">{tx(lines.capacityNote, locale)}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function Packages({ lead, locale }: SectionProps) {
  return (
    <Section id="menu">
      <Heading title={tx(copy.packages.title, locale)} lead={tx(copy.packages.lead, locale)} tag={<ExampleTag locale={locale} />} />
      <ul className="grid gap-4 md:grid-cols-3">
        {lead.banquet!.packages.map((p, i) => (
          <li key={p.id} className={`bf-cut relative grid content-start gap-5 bg-surface p-6 sm:p-7 ${i === 1 ? 'bf-card-hl' : ''}`}>
            <h3 className="font-display text-lg font-light tracking-[-0.02em]">{tx(p.name, locale)}</h3>
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span className="font-display text-[2.1rem] leading-none font-extrabold tracking-[-0.05em]">{groupDigits(p.pricePerGuest)}</span>
              <span className="text-ink-2">
                {locale === 'ru' ? 'сум' : 'soʻm'} {tx(copy.packages.perGuest, locale)}
              </span>
            </p>
            <ul className="grid gap-2">
              {p.items.map((it) => (
                <li key={it.ru} className="flex gap-2.5">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-[var(--crystal-deep)]" strokeWidth={STROKE + 0.5} />
                  {tx(it, locale)}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  )
}

const banquet: BanquetSkin = {
  Hero,
  order: ['planner', 'packages', 'halls', 'steps', 'includes', 'faq', 'location', 'booking'],
  Halls,
  Packages,
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  const rating = lead.rating
  return (
    <div className="relative h-[630px] w-[1200px] overflow-hidden bg-bg">
      <GlassPlanes className="bf-still absolute inset-0 h-full w-full" />
      <CrystalArt still className="absolute top-[10px] right-[-70px] h-[600px] w-[632px]" />
      <div className="absolute inset-y-0 left-[80px] flex w-[640px] flex-col justify-center">
        <p className="font-display text-[210px] leading-[0.82] font-extrabold tracking-[-0.06em]">{lead.name}</p>
        <span className="bf-bar mt-9 block h-[6px] w-32" />
        <p className="mt-9 text-[42px] leading-tight font-semibold">{kindLine(lead, locale)}</p>
        {rating && (
          <p className="mt-5 flex items-center gap-3 text-[28px] text-ink-2">
            <Star className="size-7 fill-current text-ink" />
            <span className="font-semibold text-ink">{formatRating(rating.value)}</span>· {rating.count} {ui.ratingCount[locale]}
          </p>
        )}
        <p className="mt-10 text-[24px] text-ink-2">
          {locale === 'ru' ? 'Концепт сайта — схема зала и проверка даты' : 'Sayt konsepti — zal sxemasi va sanani tekshirish'}
        </p>
      </div>
    </div>
  )
}

export const crystalFacet: Direction = {
  id: 'crystal-facet',
  fontClass: `${unbounded.variable} ${onest.variable}`,
  css,
  iconStroke: STROKE,
  themeColor: '#f2f5f8',
  heroFont: { family: 'Unbounded', weight: 800, style: 'normal' },
  Heading,
  PhotoArt,
  Og,
  banquet,
}

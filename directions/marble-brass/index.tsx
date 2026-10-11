import { Phone } from 'lucide-react'
import type { CSSProperties } from 'react'
import { ExampleTag } from '@/core/components/ExampleTag'
import { Section } from '@/core/components/Section'
import { commissioner, literata } from '@/core/fonts'
import { telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { copy, kindLine } from '@/niches/banquet/content'
import type { BanquetHeroProps, BanquetSkin, SectionProps } from '@/niches/banquet/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { css } from './style'

const STROKE = 1.3

/** Пилястра: база, ствол с каннелюрами, капитель. */
function Pilaster({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 400" preserveAspectRatio="none" className={`mb-art ${className}`} aria-hidden>
      <path d="M4 18 H36 M7 26 H33 M10 34 H30" strokeWidth={1.2} />
      <path d="M10 34 V370 M30 34 V370 M16 40 V364 M20 40 V364 M24 40 V364" strokeWidth={0.8} />
      <path d="M10 370 H30 M7 378 H33 M4 388 H36" strokeWidth={1.2} />
    </svg>
  )
}

/** Монограмма — первая буква в двойном латунном кольце (без гербов и чужих знаков). */
function Monogram({ letter, className = '' }: { letter: string; className?: string }) {
  return (
    <span className={`grid size-16 place-items-center rounded-full border border-[var(--brass)] p-1 ${className}`} aria-hidden>
      <span className="grid size-full place-items-center rounded-full border border-[var(--brass)] font-display text-2xl italic">{letter}</span>
    </span>
  )
}

/**
 * Анфилада: три проёма один в другом, внешний — самый большой зал. Каждый проём — кольцо
 * между своей аркой и следующей (evenodd), поэтому подсветка не перекрывает соседние.
 */
function Enfilade({ halls }: { halls: { id: string; capacity: number }[] }) {
  const sorted = [...halls].sort((a, b) => b.capacity - a.capacity).slice(0, 3)
  const frames = [
    { x: 30, w: 240, top: 22, bottom: 150 },
    { x: 78, w: 144, top: 48, bottom: 128 },
    { x: 112, w: 76, top: 68, bottom: 112 },
  ]
  const arch = (f: (typeof frames)[number]) => {
    const r = f.w / 2
    return `M${f.x} ${f.bottom} V${f.top + r * 0.55} A ${r} ${r * 0.55} 0 0 1 ${f.x + f.w} ${f.top + r * 0.55} V${f.bottom} Z`
  }
  const rules = sorted
    .map(
      (h) =>
        `[data-active-hall="${h.id}"] .mb-door[data-door="${h.id}"]{fill:rgba(165,128,63,.38)}[data-active-hall="${h.id}"] .mb-door-label[data-door="${h.id}"]{fill:var(--c-ink);font-weight:700}`,
    )
    .join('')
  return (
    <figure className="mb-5">
      <style dangerouslySetInnerHTML={{ __html: rules }} />
      <svg viewBox="0 0 300 166" className="block h-auto w-full" aria-hidden>
        <path d="M0 160 L112 112 M300 160 L188 112 M0 160 H300" className="mb-art" strokeWidth={0.8} />
        {sorted.map((h, i) => {
          const f = frames[i]!
          const inner = i < sorted.length - 1 ? frames[i + 1] : undefined
          return (
            <g key={h.id}>
              <path data-door={h.id} className="mb-door" fillRule="evenodd" d={inner ? `${arch(f)} ${arch(inner)}` : arch(f)} />
              <text data-door={h.id} className="mb-door-label" x={150} y={inner ? (f.bottom + inner.bottom) / 2 + 4 : f.bottom - 8} textAnchor="middle">
                {h.capacity}
              </text>
            </g>
          )
        })}
      </svg>
    </figure>
  )
}

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
      <div className="mb-rule mx-auto mb-5 w-16" />
      <h2 className="font-display text-[2.4rem] leading-[1.08] font-semibold tracking-[0.01em] sm:text-6xl">{title}</h2>
      {tag && <div className="mt-4">{tag}</div>}
      {lead && <p className="mt-4 text-lg text-ink-2">{lead}</p>}
    </div>
  )
}

function PhotoArt({ label, className = '' }: PhotoArtProps) {
  return (
    <div className={`mb-marble relative overflow-hidden rounded-t-[999px] border border-[var(--brass)] ${className}`}>
      <p className="absolute inset-x-0 bottom-5 text-center text-sm text-ink-2">{label}</p>
    </div>
  )
}

function Hero({ lead, locale, langSwitch }: BanquetHeroProps) {
  const fact = lead.facts[0]
  const d = (s: number) => ({ '--d': `${s}s` }) as CSSProperties
  return (
    <header className="mb-marble relative isolate flex min-h-[100svh] flex-col overflow-hidden px-5 pt-3 pb-8 sm:px-10">
      <Pilaster className="absolute top-[12%] bottom-[8%] left-2 h-[80%] w-8 sm:left-10 sm:w-12" />
      <Pilaster className="absolute top-[12%] right-2 bottom-[8%] h-[80%] w-8 sm:right-10 sm:w-12" />
      <div className="flex items-center justify-between text-sm text-ink-2">
        <span />
        {langSwitch}
      </div>
      <div className="mx-auto grid w-full max-w-3xl flex-1 content-center justify-items-center px-6 text-center">
        <Monogram letter={lead.name.charAt(0)} className="mb-rise" />
        <div className="mb-rule mt-6 w-24" />
        <h1 className="mt-6 font-display text-[clamp(3.4rem,16vw,7.5rem)] leading-[0.95] font-semibold tracking-[0.02em]">{lead.name}</h1>
        <div className="mb-rule mt-6 w-24" />
        <p className="mb-rise mt-6 text-lg" style={d(0.4)}>
          {kindLine(lead, locale)}
        </p>
        <p className="mb-rise mt-2 max-w-md text-ink-2" style={d(0.55)}>
          {locale === 'ru'
            ? 'От камерного ужина до большой свадьбы: выберите число гостей — анфилада откроет подходящий зал.'
            : 'Kichik kechadan katta toʻygacha: mehmonlar sonini tanlang — zallar qatori mos zalni ochadi.'}
        </p>
        <div className="mb-rise mt-7 flex justify-center gap-3" style={d(0.7)}>
          <a href="#data" className="btn min-w-[13rem]">
            {tx(copy.checkDate, locale)}
          </a>
          <a href={telHref(lead.phones[0]!)} className="btn btn-ghost btn-icon" aria-label={ui.call[locale]}>
            <Phone aria-hidden className="size-5" strokeWidth={STROKE} />
          </a>
        </div>
        {fact && (
          <p className="mb-rise mt-5 text-sm text-ink-2" style={d(0.85)}>
            {tx(fact.text, locale)}
          </p>
        )}
      </div>
    </header>
  )
}

/** Залы анфиладой: три арки в ряд, вместимость — по отзывам. */
function Halls({ lead, locale }: SectionProps) {
  const b = lead.banquet!
  return (
    <Section id="zaly" alt>
      <Heading title={tx(copy.halls.title, locale)} lead={tx(copy.halls.lead, locale)} tag={<ExampleTag locale={locale} />} />
      <ul className="grid grid-cols-3 items-end gap-3 sm:gap-8">
        {[...b.halls]
          .sort((x, y) => x.capacity - y.capacity)
          .map((h, i) => (
            <li key={h.id} className="grid justify-items-center gap-3 text-center">
              <div className="mb-marble w-full rounded-t-[999px] border border-[var(--brass)]" style={{ aspectRatio: `3 / ${4 + i}` }} />
              <p className="font-display text-3xl font-semibold sm:text-5xl">{h.capacity}</p>
              <p className="text-sm text-ink-2">{tx(h.name, locale)}</p>
            </li>
          ))}
      </ul>
      {b.hallsNote && <p className="mt-6 text-center text-sm text-ink-2">{tx(b.hallsNote, locale)}</p>}
      <p className="mt-2 text-center text-sm text-ink-2">{ui.photosHere[locale]}</p>
    </Section>
  )
}

const banquet: BanquetSkin = {
  Hero,
  order: ['planner', 'halls', 'packages', 'includes', 'steps', 'faq', 'location', 'booking'],
  Halls,
  PlannerArt: Enfilade,
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  return (
    <div className="mb-marble relative h-[630px] w-[1200px] overflow-hidden">
      <Pilaster className="absolute top-[60px] left-[60px] h-[510px] w-[60px]" />
      <Pilaster className="absolute top-[60px] right-[60px] h-[510px] w-[60px]" />
      <div className="absolute inset-0 grid content-center justify-items-center text-center">
        <Monogram letter={lead.name.charAt(0)} className="size-24 [&>span]:text-4xl" />
        <div className="mb-rule mt-8 w-40" />
        <p className="mt-8 font-display text-[150px] leading-[0.95] font-semibold tracking-[0.02em]">{lead.name}</p>
        <div className="mb-rule mt-12 w-40" />
        <p className="mt-8 text-[38px]">{kindLine(lead, locale)}</p>
        <p className="mt-4 text-[24px] text-ink-2">{locale === 'ru' ? 'Концепт сайта — залы анфиладой и проверка даты' : 'Sayt konsepti — zallar qatori va sanani tekshirish'}</p>
      </div>
    </div>
  )
}

export const marbleBrass: Direction = {
  id: 'marble-brass',
  fontClass: `${literata.variable} ${commissioner.variable}`,
  css,
  iconStroke: STROKE,
  themeColor: '#eee8de',
  fontFamilies: ['Literata', 'Commissioner'],
  heroFont: { family: 'Literata', weight: 600, style: 'normal' },
  Heading,
  PhotoArt,
  Og,
  banquet,
}

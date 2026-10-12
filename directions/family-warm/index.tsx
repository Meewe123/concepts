import { Activity, Anchor, CircleDot, Droplets, GitCommitHorizontal, Phone, Send, Sparkles } from 'lucide-react'
import type { CSSProperties } from 'react'
import { ExampleTag } from '@/core/components/ExampleTag'
import { Section } from '@/core/components/Section'
import { nunito } from '@/core/fonts'
import { telegramHref, telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { tx } from '@/core/text'
import type { DentalConcernId, Lead, Locale } from '@/core/types'
import { copy, kindLine } from '@/niches/dental/content'
import { visitSteps } from '@/niches/dental/sections'
import type { DentalHeroProps, DentalSectionProps, DentalSkin } from '@/niches/dental/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { css } from './style'

const STROKE = 2

/** Семья из трёх камешков — большой, средний, маленький. Без людей и без зубов. */
function Pebbles({ className = '', still = false }: { className?: string; still?: boolean }) {
  const d = (s: number) => (still ? undefined : ({ '--d': `${s}s` } as CSSProperties))
  const cls = still ? '' : 'fw-pebble'
  return (
    <svg viewBox="0 0 320 200" className={className} aria-hidden>
      <ellipse cx={160} cy={192} rx={150} ry={8} fill="rgba(43,40,34,0.07)" />
      <path className={cls} style={d(0.1)} d="M40 190 C 22 120 70 52 132 56 C 196 60 214 128 200 190 Z" fill="#3d6b50" />
      <path className={cls} style={d(0.3)} d="M188 190 C 180 140 206 104 240 106 C 276 108 290 150 280 190 Z" fill="#f1b68e" />
      <path className={cls} style={d(0.5)} d="M262 190 C 258 166 272 150 290 151 C 308 152 316 172 310 190 Z" fill="#d3e3d2" />
    </svg>
  )
}

const ICONS: Record<DentalConcernId, typeof Activity> = {
  pain: Activity,
  filling: CircleDot,
  hygiene: Droplets,
  whitening: Sparkles,
  braces: GitCommitHorizontal,
  implant: Anchor,
}

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mb-8 max-w-3xl sm:mb-12">
      <h2 className="text-[2.1rem] leading-[1.08] font-black tracking-[-0.02em] sm:text-5xl">{title}</h2>
      {tag && <div className="mt-3">{tag}</div>}
      {lead && <p className="mt-3 max-w-[58ch] text-lg text-ink-2">{lead}</p>}
    </div>
  )
}

function PhotoArt({ label, className = '' }: PhotoArtProps) {
  return (
    <div className={`relative grid place-items-center overflow-hidden rounded-[2rem] bg-bg-2 ${className}`}>
      <Pebbles still className="w-2/3" />
      <p className="absolute bottom-4 left-5 text-sm font-semibold text-ink-2">{label}</p>
    </div>
  )
}

function Hero({ lead, locale, langSwitch }: DentalHeroProps) {
  return (
    <header className="relative flex flex-col px-4 pt-2 pb-4 sm:px-8 md:min-h-[72svh]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between text-sm font-bold">
        <span className="text-ink-2">{tx(lead.district, locale)}</span>
        <span className="rounded-full bg-surface px-3">{langSwitch}</span>
      </div>
      <div className="mx-auto grid w-full max-w-6xl flex-1 content-center gap-6 pt-6 pb-4 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-12 md:py-6">
        <Pebbles className="mx-auto h-auto w-full max-w-[min(20rem,calc(30svh*1.6))] md:order-2 md:max-w-md" />
        <div className="md:order-1">
          <h1 className="text-[clamp(4.5rem,24vw,9rem)] leading-[0.92] font-black tracking-[-0.04em]">{lead.name}</h1>
          <p className="mt-4 max-w-[24ch] text-xl leading-snug font-bold sm:text-2xl">{kindLine(lead, locale)}</p>
          <p className="mt-2 max-w-[40ch] text-ink-2">
            {locale === 'ru' ? 'Принимают взрослых и детей — можно записать всю семью сразу.' : 'Kattalar va bolalarni qabul qilishadi — butun oilani birdan yozdirish mumkin.'}
          </p>
          <div className="mt-6 grid gap-3">
            <a href="#zapis" className="btn btn-lg sm:justify-self-start sm:px-10">
              {tx(copy.book, locale)}
            </a>
            <div className="flex gap-3">
              <a href={telHref(lead.phones[0]!)} className="btn btn-ghost flex-1 sm:flex-none">
                <Phone aria-hidden className="size-5" strokeWidth={STROKE} />
                {locale === 'ru' ? ui.call.ru : 'Qoʻngʻiroq'}
              </a>
              {lead.telegram && (
                <a href={telegramHref(lead.telegram)} target="_blank" rel="noopener" className="btn btn-ghost flex-1 sm:flex-none">
                  <Send aria-hidden className="size-5" strokeWidth={STROKE} />
                  Telegram
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function OptionMark({ id }: { id: DentalConcernId }) {
  const Icon = ICONS[id]
  return (
    <span className="fw-icon">
      <Icon aria-hidden className="size-5" strokeWidth={STROKE} />
    </span>
  )
}

/** «Для всей семьи»: кого записываете — выбор сразу попадает в форму. */
function Family({ locale }: DentalSectionProps) {
  const f = copy.family
  return (
    <Section id="semya">
      <div className="fw-family grid gap-6 p-6 sm:p-10 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <h2 className="text-[2rem] leading-tight font-black sm:text-4xl">{tx(f.title, locale)}</h2>
          <p className="mt-3 max-w-[46ch] text-lg text-white/90">
            {locale === 'ru'
              ? 'Iroda — семейная стоматология: здесь принимают и взрослых, и детей. Запишите всех сразу — отметьте, кого ведёте.'
              : 'Iroda — oilaviy stomatologiya: bu yerda kattalarni ham, bolalarni ham qabul qilishadi. Hammani birdan yozdiring — kimni olib kelishingizni belgilang.'}
          </p>
        </div>
        <div className="grid gap-3">
          <p className="font-bold text-white/90">{tx(f.who, locale)}</p>
          {f.whoOptions.map((o) => (
            <a key={o.ru} href="#zapis" data-family={tx(o, locale)} className="btn btn-lg justify-between">
              {tx(o, locale)}
              <span aria-hidden>→</span>
            </a>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Visit({ lead, locale }: DentalSectionProps) {
  return (
    <Section id="vizit" alt>
      <Heading title={tx(copy.visit.title, locale)} lead={tx(copy.visit.lead, locale)} tag={<ExampleTag locale={locale} />} />
      <ol className="fw-steps">
        {visitSteps(lead, locale).map((s, i) => (
          <li key={s.title}>
            <span className="fw-dot">{i + 1}</span>
            <div className="pt-2">
              <h3 className="text-xl font-extrabold">{s.title}</h3>
              <p className="mt-1 max-w-[42ch] text-ink-2">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

const dental: DentalSkin = {
  Hero,
  order: ['concern', 'family', 'visit', 'booking', 'contacts'],
  OptionMark,
  Family,
  Visit,
  familyChoice: true,
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  return (
    <div className="relative h-[630px] w-[1200px] overflow-hidden bg-bg">
      <Pebbles still className="absolute right-[48px] bottom-[64px] w-[500px]" />
      <div className="absolute top-[90px] left-[84px] w-[600px]">
        <p className="text-[24px] font-bold text-ink-2">{tx(lead.district, locale)}</p>
        <p className="mt-2 text-[200px] leading-[0.92] font-black tracking-[-0.04em]">{lead.name}</p>
        <p className="mt-6 text-[40px] leading-tight font-bold">{kindLine(lead, locale)}</p>
        <p className="mt-6 max-w-[470px] text-[26px] text-ink-2">
          {locale === 'ru' ? 'Концепт сайта — ориентир цены и запись всей семьи' : 'Sayt konsepti — taxminiy narx va butun oilani yozdirish'}
        </p>
      </div>
    </div>
  )
}

export const familyWarm: Direction = {
  id: 'family-warm',
  fontClass: nunito.variable,
  css,
  iconStroke: STROKE,
  themeColor: '#f7f0e5',
  fontFamilies: ['Nunito'],
  heroFont: { family: 'Nunito', weight: 900, style: 'normal' },
  Heading,
  PhotoArt,
  Og,
  dental,
}

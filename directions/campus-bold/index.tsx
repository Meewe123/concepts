import { Phone } from 'lucide-react'
import type { CSSProperties } from 'react'
import { ExampleTag } from '@/core/components/ExampleTag'
import { Section } from '@/core/components/Section'
import { commissioner, unbounded } from '@/core/fonts'
import { telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { copy, kindLine } from '@/niches/education/content'
import type { EducationHeroProps, EducationSectionProps, EducationSkin } from '@/niches/education/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { css } from './style'

const STROKE = 2
const TILES = [
  { label: 'A1', bg: 'var(--lemon)', fg: 'var(--c-ink)' },
  { label: 'A2', bg: 'var(--mint)', fg: 'var(--c-ink)' },
  { label: 'B1', bg: 'var(--blue)', fg: '#fff' },
  { label: 'B2', bg: 'var(--red)', fg: 'var(--c-ink)' },
  { label: 'C1', bg: 'var(--c-ink)', fg: 'var(--lemon)' },
  { label: 'IELTS', bg: '#ffffff', fg: 'var(--c-ink)' },
]

function Tiles({ className = '', still = false }: { className?: string; still?: boolean }) {
  return (
    <div className={`grid grid-cols-3 border-2 border-ink ${className}`} aria-hidden>
      {TILES.map((t, i) => (
        <div
          key={t.label}
          className={`cb-tile aspect-square border border-ink ${still ? '' : 'cb-pop'} ${t.label === 'IELTS' ? 'text-[min(4.5vw,1.4rem)]' : 'text-[min(9vw,2.6rem)]'}`}
          style={{ background: t.bg, color: t.fg, '--d': `${0.08 * i}s` } as CSSProperties}
        >
          {t.label}
        </div>
      ))}
    </div>
  )
}

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mb-10 max-w-3xl sm:mb-12">
      <h2 className="font-display text-[2rem] leading-[1.05] font-extrabold tracking-[-0.045em] sm:text-5xl">{title}</h2>
      <span className="mt-4 flex h-2 w-24" aria-hidden>
        <span className="flex-1 bg-[var(--lemon)]" />
        <span className="flex-1 bg-[var(--mint)]" />
        <span className="flex-1 bg-[var(--red)]" />
        <span className="flex-1 bg-[var(--blue)]" />
      </span>
      {tag && <div className="mt-3">{tag}</div>}
      {lead && <p className="mt-3 max-w-xl text-lg text-ink-2">{lead}</p>}
    </div>
  )
}

function PhotoArt({ label, className = '' }: PhotoArtProps) {
  return (
    <div className={`relative overflow-hidden border-2 border-ink ${className}`}>
      <Tiles still className="absolute inset-0 h-full w-full border-0" />
      <p className="absolute bottom-3 left-3 bg-surface px-3 py-1 text-sm">{label}</p>
    </div>
  )
}

function Monogram({ initials, seed }: { initials: string; seed: number }) {
  const t = TILES[seed % 5]!
  return (
    <div className="cb-tile aspect-square w-full max-w-[9rem] border-2 border-ink text-3xl" style={{ background: t.bg, color: t.fg }}>
      {initials}
    </div>
  )
}

function Hero({ lead, locale, langSwitch }: EducationHeroProps) {
  return (
    <header className="relative isolate flex min-h-[100svh] flex-col overflow-hidden px-5 pt-3 pb-8 sm:px-10">
      <div className="flex items-center justify-between text-sm font-semibold">
        <span>{locale === 'ru' ? 'Языки и IELTS' : 'Tillar va IELTS'}</span>
        {langSwitch}
      </div>
      <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-[minmax(0,1fr)] content-center gap-6 md:grid-cols-[1fr_1fr] md:items-center md:gap-12">
        <Tiles className="mx-auto w-full max-w-[19rem] md:order-2 md:max-w-md" />
        <div className="md:order-1">
          <h1 className="font-display text-[clamp(4.5rem,26vw,10rem)] leading-[0.82] font-extrabold tracking-[-0.07em]">{lead.name}</h1>
          <p className="mt-5 text-lg font-semibold">{kindLine(lead, locale)}</p>
          <p className="mt-2 max-w-md text-ink-2">
            {locale === 'ru'
              ? 'Узнайте уровень за минуту — табло сразу покажет вашу группу и ориентир по IELTS.'
              : 'Darajangizni bir daqiqada bilib oling — tablo darhol guruhingiz va IELTS moʻljalini koʻrsatadi.'}
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#data" className="btn flex-1 sm:flex-none sm:px-8">
              {tx(copy.trial, locale)}
            </a>
            <a href={telHref(lead.phones[0]!)} className="btn btn-ghost btn-icon" aria-label={ui.call[locale]}>
              <Phone aria-hidden className="size-5" strokeWidth={STROKE} />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

/** Расписание групп как табло вылетов. */
function Schedule({ lead, locale }: EducationSectionProps) {
  const head = locale === 'ru' ? ['Ур.', 'Группа', 'Время', ''] : ['Dar.', 'Guruh', 'Vaqt', '']
  return (
    <Section id="raspisanie">
      <Heading title={tx(copy.schedule.title, locale)} tag={<ExampleTag locale={locale} />} />
      <div className="cb-board overflow-hidden p-3 sm:p-5">
        <div className="cb-board-row grid-cols-[3rem_1fr_auto] gap-3 pb-2 text-[0.7rem] tracking-[0.12em] text-[#9a9a9a] sm:grid-cols-[4rem_1fr_7rem_6rem]">
          {head.map((h, i) => (
            <span key={i} className={i === 3 ? 'hidden sm:block' : ''}>
              {h}
            </span>
          ))}
        </div>
        {lead.education!.groups.map((g) => (
          <div key={g.id} className="cb-board-row grid-cols-[3rem_1fr_auto] items-center gap-3 py-2.5 sm:grid-cols-[4rem_1fr_7rem_6rem]">
            <span className="cb-flap justify-self-start">{g.level}</span>
            <span className="text-sm leading-tight text-white sm:text-base">
              {tx(g.course, locale)}
              <span className="block text-xs text-[#bdbdbd]">{tx(g.days, locale)}</span>
            </span>
            <span className="cb-flap tabular-nums">{g.time}</span>
            <span className="hidden text-sm text-[#bdbdbd] sm:block">{tx(copy.formats[g.format].title, locale)}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}

const education: EducationSkin = {
  Hero,
  order: ['test', 'schedule', 'courses', 'formats', 'teachers', 'faq', 'location', 'booking'],
  Schedule,
  Monogram,
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  return (
    <div className="relative h-[630px] w-[1200px] overflow-hidden bg-bg">
      <div className="absolute top-[60px] right-[70px] w-[510px]">
        <Tiles still className="w-full [&_.cb-tile]:text-[64px] [&_.cb-tile:last-child]:text-[38px]" />
      </div>
      <div className="absolute inset-y-0 left-[80px] flex w-[560px] flex-col justify-center">
        <p className="font-display text-[220px] leading-[0.82] font-extrabold tracking-[-0.07em]">{lead.name}</p>
        <p className="mt-10 text-[38px] leading-tight font-semibold">{kindLine(lead, locale)}</p>
        <p className="mt-6 text-[24px] text-ink-2">{locale === 'ru' ? 'Концепт сайта — тест уровня, IELTS и пробный урок' : 'Sayt konsepti — daraja testi, IELTS va sinov darsi'}</p>
      </div>
    </div>
  )
}

export const campusBold: Direction = {
  id: 'campus-bold',
  fontClass: `${unbounded.variable} ${commissioner.variable}`,
  css,
  iconStroke: STROKE,
  themeColor: '#ffffff',
  fontFamilies: ['Unbounded', 'Commissioner'],
  heroFont: { family: 'Unbounded', weight: 800, style: 'normal' },
  Heading,
  PhotoArt,
  Og,
  education,
}

import { Check, Phone } from 'lucide-react'
import type { CSSProperties } from 'react'
import { commissioner, spectral } from '@/core/fonts'
import { telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { tx, typo } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { copy, kindLine } from '@/niches/education/content'
import type { EducationHeroProps, EducationSkin } from '@/niches/education/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { css } from './style'

const STROKE = 1.75

/** Подчёркивание красной ручкой: две неровные линии. */
function PenUnderline({ className = '', delay = 0.5 }: { className?: string; delay?: number }) {
  const d = { '--d': `${delay}s` } as CSSProperties
  return (
    <svg viewBox="0 0 300 22" preserveAspectRatio="none" className={`bt-underline ${className}`} aria-hidden>
      <path d="M4 13 C 60 4, 120 19, 180 9 S 270 6, 296 12" pathLength={1} className="bt-draw" style={d} />
      <path d="M22 17 C 92 11, 172 21, 284 15" pathLength={1} className="bt-draw" style={{ '--d': `${delay + 0.25}s` } as CSSProperties} strokeWidth={2} />
    </svg>
  )
}

/** «Mr. Gordon's» → фамилия подчёркнута красной ручкой. */
function Title({ name }: { name: string }) {
  const i = name.lastIndexOf(' ')
  if (i < 0) return <>{name}</>
  return (
    <>
      {name.slice(0, i)}{' '}
      <span className="relative inline-block">
        {name.slice(i + 1)}
        <PenUnderline className="absolute -bottom-[0.12em] left-0 h-[0.22em] w-full" />
      </span>
    </>
  )
}

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mb-10 max-w-3xl sm:mb-14">
      <h2 className="relative inline-block font-display text-[2.3rem] leading-[1.1] font-semibold tracking-[-0.01em] sm:text-5xl">
        {title}
        <PenUnderline className="mt-1 block h-3 w-24" delay={0} />
      </h2>
      {tag && <div className="mt-3">{tag}</div>}
      {lead && <p className="mt-3 max-w-xl text-lg text-ink-2">{lead}</p>}
    </div>
  )
}

function PhotoArt({ label, className = '' }: PhotoArtProps) {
  return (
    <div className={`bt-paper relative overflow-hidden border border-line ${className}`}>
      <p className="absolute right-4 bottom-4 left-10 font-display text-lg text-ink-2 italic">{label}</p>
    </div>
  )
}

function Monogram({ initials, seed }: { initials: string; seed: number }) {
  return (
    <div className="grid aspect-square w-full max-w-[9rem] place-items-center rounded-full border-[1.5px] border-ink" style={{ transform: `rotate(${(seed % 3) - 1}deg)` }}>
      <div className="grid size-[82%] place-items-center rounded-full border-4 border-double border-[var(--mustard)]">
        <span className="font-display text-4xl italic">{initials}</span>
      </div>
    </div>
  )
}

function Hero({ lead, locale, langSwitch }: EducationHeroProps) {
  return (
    <header className="bt-paper relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-3 pr-5 pb-8 pl-11 sm:px-16">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold tracking-wide">English Academy</span>
        {langSwitch}
      </div>
      <div className="mx-auto grid w-full max-w-6xl flex-1 content-center gap-8 md:grid-cols-[1.3fr_1fr] md:items-center">
        <div>
          <h1 className="font-display text-[clamp(3.3rem,15.5vw,7rem)] leading-[1] font-semibold tracking-[-0.02em]">
            <Title name={lead.name} />
          </h1>
          <p className="mt-6 text-lg font-semibold">{kindLine(lead, locale)}</p>
          <p className="mt-2 max-w-md text-ink-2">
            {locale === 'ru'
              ? 'Группы по уровням от A1 до C1 и подготовка к IELTS. Узнайте свой уровень за минуту и приходите на пробный урок.'
              : 'A1 dan C1 gacha darajalar boʻyicha guruhlar va IELTSga tayyorlov. Darajangizni bir daqiqada bilib oling va sinov darsiga keling.'}
          </p>
          <div className="mt-7 flex gap-3">
            <a href="#data" className="btn flex-1 sm:flex-none sm:px-7">
              {tx(copy.trial, locale)}
            </a>
            <a href={telHref(lead.phones[0]!)} className="btn btn-ghost btn-icon" aria-label={ui.call[locale]}>
              <Phone aria-hidden className="size-5" strokeWidth={STROKE} />
            </a>
          </div>
        </div>
        <a href="#test" className="bt-note block max-w-[17rem] justify-self-end p-5 no-underline md:max-w-xs md:p-7">
          <span className="flex items-center gap-2 font-display text-2xl leading-tight font-semibold md:text-3xl">
            {tx(copy.test.title, locale)}
            <Check aria-hidden className="bt-red size-7 shrink-0" strokeWidth={3} />
          </span>
          <span className="mt-2 block text-sm">{tx(copy.test.lead, locale)}</span>
        </a>
      </div>
    </header>
  )
}

const education: EducationSkin = {
  Hero,
  order: ['test', 'courses', 'schedule', 'formats', 'teachers', 'faq', 'location', 'booking'],
  Monogram,
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  return (
    <div className="bt-paper relative h-[630px] w-[1200px] overflow-hidden">
      <div className="absolute inset-y-0 left-[96px] flex w-[760px] flex-col justify-center">
        <p className="font-display text-[150px] leading-none font-semibold tracking-[-0.02em]">
          <Title name={lead.name} />
        </p>
        <p className="mt-12 text-[40px] leading-tight font-semibold">{kindLine(lead, locale)}</p>
        <p className="mt-6 text-[26px] text-ink-2">
          {locale === 'ru' ? 'Концепт сайта — тест уровня и пробный урок' : 'Sayt konsepti — daraja testi va sinov darsi'}
        </p>
      </div>
      <p className="absolute top-[150px] right-[110px] rotate-[-8deg] rounded-[8px] border-[6px] border-double border-[var(--red)] px-8 pt-2 pb-4 font-display text-[110px] leading-none font-semibold text-[var(--red)]">
        B1
      </p>
      <p className="bt-note absolute right-[90px] bottom-[110px] w-[300px] p-7 font-display text-[30px] leading-tight font-semibold">
        {typo(locale === 'ru' ? '5 вопросов, 1 минута' : '5 ta savol, 1 daqiqa', locale)}
      </p>
    </div>
  )
}

export const britishTextbook: Direction = {
  id: 'british-textbook',
  fontClass: `${spectral.variable} ${commissioner.variable}`,
  css,
  iconStroke: STROKE,
  themeColor: '#fbf8ef',
  fontFamilies: ['Spectral', 'Commissioner'],
  heroFont: { family: 'Spectral', weight: 600, style: 'normal' },
  Heading,
  PhotoArt,
  Og,
  education,
}

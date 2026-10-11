import { Clock, Phone } from 'lucide-react'
import { Section } from '@/core/components/Section'
import { sourceCode, tektur } from '@/core/fonts'
import { formatPhone, telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { copy, kindLine } from '@/niches/vet/content'
import type { VetHeroProps, VetSectionProps, VetSkin } from '@/niches/vet/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { css } from './style'

const STROKE = 1.5

/** Ночной дом: тёмные окна и одно светится — клиника. В окне силуэт питомца (data-pet у предка). */
function NightWindow({ className = '', sign = true }: { className?: string; sign?: boolean }) {
  const windows = []
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 4; c++) {
      if (r === 2 && (c === 1 || c === 2)) continue
      windows.push(<rect key={`${r}-${c}`} x={62 + c * 52} y={92 + r * 54} width={34} height={38} rx={2} className="nv-win" />)
    }
  }
  return (
    <svg viewBox="0 0 320 380" className={`nv-window ${className}`} aria-hidden>
      <defs>
        <radialGradient id="nv-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffb547" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffb547" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M262 26 a22 22 0 1 0 18 30 a17 17 0 1 1 -18 -30 z" fill="#d9d2c4" opacity="0.8" />
      <rect x={40} y={60} width={240} height={330} className="nv-house" />
      {windows}
      <ellipse cx={160} cy={221} rx={150} ry={110} fill="url(#nv-glow)" className="nv-halo" />
      <g className="nv-flicker">
        <rect x={114} y={198} width={92} height={46} rx={2} className="nv-lit" />
        <path d="M160 198 v46 M114 221 h92" stroke="#e8a23c" strokeWidth={2} />
        <g className="nv-cat">
          <path d="M126 244 c0 -14 6 -20 12 -22 l-2 -10 l6 6 l6 -6 l-1 10 c6 3 10 10 10 22 z" className="nv-sil" />
          <path d="M156 242 c10 0 14 -6 10 -12" stroke="#3a2408" strokeWidth={3} fill="none" strokeLinecap="round" />
        </g>
        <g className="nv-dog">
          <path d="M168 244 c0 -12 4 -18 10 -20 c-6 -2 -8 -8 -4 -12 c4 -3 12 -2 14 2 l6 -2 c2 4 0 9 -4 11 c6 3 8 9 8 21 z" className="nv-sil" />
        </g>
      </g>
      {sign && (
        <g className="nv-flicker">
          <text x={160} y={46} textAnchor="middle" fontSize={30} fontWeight={700} className="nv-sign">
            24/7
          </text>
        </g>
      )}
    </svg>
  )
}

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mb-10 max-w-3xl sm:mb-12">
      <h2 className="font-display text-[2rem] leading-[1.1] font-semibold tracking-[0.01em] sm:text-5xl">{title}</h2>
      {tag && <div className="mt-3">{tag}</div>}
      {lead && <p className="mt-3 max-w-xl text-ink-2">{lead}</p>}
    </div>
  )
}

function PhotoArt({ label, className = '' }: PhotoArtProps) {
  return (
    <div data-pet="cat" className={`relative overflow-hidden rounded bg-surface ${className}`}>
      <NightWindow sign={false} className="absolute inset-0 h-full w-full opacity-60" />
      <p className="absolute bottom-3 left-3 text-sm text-ink-2">{label}</p>
    </div>
  )
}

function Hero({ lead, locale, langSwitch }: VetHeroProps) {
  return (
    <header className="relative isolate flex min-h-[100svh] flex-col overflow-hidden px-5 pt-3 pb-8 sm:px-10">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 text-ink-2">
          <Clock aria-hidden className="nv-amber size-4" strokeWidth={STROKE} />
          <span>{locale === 'ru' ? 'Ташкент' : 'Toshkent'}</span>
          <span className="nv-amber tabular-nums" data-clock="">
            --:--
          </span>
        </span>
        {langSwitch}
      </div>
      <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-[minmax(0,1fr)] content-center gap-4 md:grid-cols-[1fr_1fr] md:items-center md:gap-10">
        <div data-pet="cat" className="mx-auto w-full max-w-[17rem] md:order-2 md:max-w-sm">
          <NightWindow className="block h-auto max-h-[40svh] w-full md:max-h-none" />
        </div>
        <div className="md:order-1">
          <p className="nv-amber nv-glow-text font-display text-xl font-semibold">{locale === 'ru' ? 'Мы открыты ночью' : 'Biz tunda ham ochiqmiz'}</p>
          <h1 className="mt-2 font-display text-[clamp(3rem,15vw,6.5rem)] leading-[0.95] font-bold tracking-[-0.01em]">{lead.name}</h1>
          <p className="mt-4">{kindLine(lead, locale)}</p>
          <div className="mt-6 grid gap-3 sm:flex">
            <a href={telHref(lead.phones[0]!)} className="btn sm:px-7">
              <Phone aria-hidden className="size-5" strokeWidth={STROKE + 0.5} />
              {ui.call[locale]}: {formatPhone(lead.phones[0]!)}
            </a>
            <a href="#data" className="btn btn-ghost">
              {tx(copy.book, locale)}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

/** Срочная помощь — первым блоком: часы, круглосуточно, оба телефона. */
function Urgent({ lead, locale }: VetSectionProps) {
  return (
    <Section id="srochno">
      <div className="grid gap-6 border border-[var(--amber)] p-6 sm:grid-cols-[1fr_auto] sm:items-end sm:p-10">
        <div>
          <p className="nv-amber font-display text-sm font-semibold tracking-[0.08em]">{tx(copy.urgent.allDay, locale)}</p>
          <h2 className="mt-2 font-display text-3xl leading-tight font-semibold sm:text-4xl">{tx(copy.urgent.title, locale)}</h2>
          <p className="mt-3 max-w-xl text-ink-2">{tx(copy.urgent.allDayText, locale)}</p>
        </div>
        <ul className="grid gap-2">
          {lead.phones.map((p) => (
            <li key={p}>
              <a href={telHref(p)} className="btn w-full">
                <Phone aria-hidden className="size-5" strokeWidth={STROKE + 0.5} />
                {formatPhone(p)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

const vet: VetSkin = {
  Hero,
  order: ['urgent', 'calendar', 'services', 'prep', 'faq', 'location', 'booking'],
  PetArt: ({ className }) => <NightWindow sign={false} className={className} />,
  Urgent,
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  return (
    <div className="relative h-[630px] w-[1200px] overflow-hidden bg-bg">
      <div data-pet="cat" className="absolute top-[30px] right-[90px] h-[600px] w-[505px]">
        <NightWindow className="h-full w-full" />
      </div>
      <div className="absolute inset-y-0 left-[84px] flex w-[620px] flex-col justify-center">
        <p className="nv-amber nv-glow-text font-display text-[40px] font-semibold">{locale === 'ru' ? 'Мы открыты ночью' : 'Biz tunda ham ochiqmiz'}</p>
        <p className="mt-4 font-display text-[130px] leading-[0.95] font-bold">{lead.name}</p>
        <p className="mt-8 text-[32px]">{kindLine(lead, locale)}</p>
        <p className="mt-8 text-[24px] text-ink-2">{locale === 'ru' ? 'Концепт сайта — звонок в один тап и календарь прививок' : 'Sayt konsepti — bir bosishda qoʻngʻiroq va emlash taqvimi'}</p>
      </div>
    </div>
  )
}

export const nightVet: Direction = {
  id: 'night-vet',
  fontClass: `${tektur.variable} ${sourceCode.variable}`,
  css,
  iconStroke: STROKE,
  themeColor: '#111316',
  fontFamilies: ['Tektur', 'Source Code Pro'],
  heroFont: { family: 'Tektur', weight: 700, style: 'normal' },
  Heading,
  PhotoArt,
  Og,
  vet,
}

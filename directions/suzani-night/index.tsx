import { Cormorant_Garamond } from 'next/font/google'
import { Phone } from 'lucide-react'
import type { CSSProperties } from 'react'
import { ExampleTag } from '@/core/components/ExampleTag'
import { Section } from '@/core/components/Section'
import { onest } from '@/core/fonts'
import { formatSum, telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { copy, kindLine } from '@/niches/banquet/content'
import type { BanquetHeroProps, BanquetSkin, SectionProps } from '@/niches/banquet/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { GirihPattern, Rosette, StarMark, starPoints } from './ornament'
import { css } from './style'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: false,
})

const STROKE = 1.25

const lines: Record<string, { ru: string; uz: string }> = {
  heroSub: {
    ru: 'Свадьба, никох или сунъат-той — проверьте свободную дату и посмотрите, как разместятся гости.',
    uz: 'Toʻy, nikoh yoki sunnat toʻyi — boʻsh sanani tekshiring va mehmonlar qanday joylashishini koʻring.',
  },
}

/** «Osiyo Grand» → «Osiyo» прямым, остальное курсивом золотом. */
function Title({ name, className = '' }: { name: string; className?: string }) {
  const [first, ...rest] = name.split(' ')
  return (
    <span className={`sz-title ${className}`}>
      {first}
      {rest.length > 0 && (
        <>
          {' '}
          <em>{rest.join(' ')}</em>
        </>
      )}
    </span>
  )
}

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
      <StarMark className="mx-auto mb-5 text-[var(--gold)]" />
      <h2 className="font-display text-[2.75rem] leading-[1.02] tracking-[-0.01em] sm:text-6xl">{title}</h2>
      {tag && <div className="mt-4">{tag}</div>}
      {lead && <p className="mt-4 text-lg text-ink-2">{lead}</p>}
    </div>
  )
}

function Divider() {
  return (
    <div aria-hidden className="flex items-center gap-4 bg-bg px-8 text-[var(--gold)]">
      <span className="h-px flex-1 bg-line" />
      <StarMark size={14} />
      <span className="h-px flex-1 bg-line" />
    </div>
  )
}

function PhotoArt({ seed, label, className = '' }: PhotoArtProps) {
  const id = `sz-photo-${seed}`
  return (
    <div className={`sz-arch sz-photo relative overflow-hidden bg-[#08201b] ${className}`}>
      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <GirihPattern id={id} scale={0.75 + (seed % 3) * 0.2} rotate={seed * 11.25} />
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,transparent_20%,rgba(5,22,18,0.85)_75%)]" />
      <div className="sz-arch-line absolute inset-2" />
      <p className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-2 text-sm text-ink-2">
        <StarMark size={12} className="text-[var(--gold)]" />
        {label}
      </p>
    </div>
  )
}

function Hero({ lead, locale, langSwitch }: BanquetHeroProps) {
  const fact = lead.facts[0]
  return (
    <header className="relative isolate flex min-h-[100svh] flex-col overflow-hidden px-5 pt-3 pb-8 sm:px-10">
      <svg className="absolute inset-0 -z-10 h-full w-full opacity-[0.07]" aria-hidden>
        <defs>
          <GirihPattern id="sz-hero-pattern" scale={1.2} />
        </defs>
        <rect width="100%" height="100%" fill="url(#sz-hero-pattern)" className="sz-hero-pattern" />
      </svg>

      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm text-ink-2">
          <StarMark className="text-[var(--gold)]" />
          {lead.name}
        </span>
        {langSwitch}
      </div>

      <div className="mx-auto grid w-full max-w-6xl flex-1 items-center md:grid-cols-[1fr_1fr] md:gap-10">
        <div className="relative mx-auto grid w-[min(86vw,24rem)] place-items-center pt-6 md:order-2 md:w-full md:max-w-[34rem]">
          <div className="sz-glow absolute inset-[-12%] -z-10 rounded-full" />
          <Rosette className="w-full" />
        </div>

        <div className="relative -mt-12 text-center md:order-1 md:mt-0 md:text-left">
          <h1 className="font-display text-[clamp(3.6rem,17vw,7.5rem)] leading-[0.92] tracking-[-0.02em]">
            <Title name={lead.name} />
          </h1>
          <p className="sz-rise mt-4 text-lg" style={{ '--d': '0.7s' } as CSSProperties}>
            {kindLine(lead, locale)}
          </p>
          <p className="sz-rise mx-auto mt-3 max-w-sm text-ink-2 md:mx-0" style={{ '--d': '0.85s' } as CSSProperties}>
            {tx(lines.heroSub!, locale)}
          </p>
          <div className="sz-rise mt-7 flex justify-center gap-3 md:justify-start" style={{ '--d': '1s' } as CSSProperties}>
            <a href="#data" className="btn min-w-[13rem]">
              {tx(copy.checkDate, locale)}
            </a>
            <a href={telHref(lead.phones[0]!)} className="btn btn-ghost btn-icon" aria-label={ui.call[locale]}>
              <Phone aria-hidden className="size-5" strokeWidth={STROKE} />
            </a>
          </div>
          {fact && lead.instagram && (
            <p className="sz-rise mt-6 text-sm text-ink-2" style={{ '--d': '1.15s' } as CSSProperties}>
              @{lead.instagram} · {tx(fact.text, locale)}
            </p>
          )}
        </div>
      </div>
    </header>
  )
}

function Halls({ lead, locale }: SectionProps) {
  const halls = lead.banquet!.halls
  return (
    <Section id="zaly" alt>
      <Heading title={tx(copy.halls.title, locale)} lead={tx(copy.halls.lead, locale)} tag={<ExampleTag locale={locale} />} />
      <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-8 sm:overflow-visible sm:px-0">
        {halls.map((h, i) => (
          <li key={h.id} className="w-[74%] shrink-0 snap-center sm:w-auto">
            <PhotoArt seed={i + 1} label={ui.photosHere[locale]} className="aspect-[3/4]" />
            <div className="mt-5 text-center">
              <h3 className="font-display text-3xl">{tx(h.name, locale)}</h3>
              <p className="mt-1 text-ink-2">
                {locale === 'ru' ? 'до ' : ''}
                <span className="font-display text-4xl text-[var(--gold)]">{h.capacity}</span>
                {locale === 'ru' ? ' гостей' : ' mehmongacha'}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function Packages({ lead, locale }: SectionProps) {
  const packages = lead.banquet!.packages
  return (
    <Section id="menu">
      <Heading title={tx(copy.packages.title, locale)} lead={tx(copy.packages.lead, locale)} tag={<ExampleTag locale={locale} />} />
      <div className="mx-auto max-w-3xl border border-line p-1.5">
        <div className="border border-line px-5 py-4 sm:px-12 sm:py-8">
          {packages.map((p) => (
            <div key={p.id} className="border-b border-line py-6 last:border-0">
              <div className="flex items-baseline gap-3">
                <h3 className="font-display text-[1.75rem] leading-tight italic sm:text-3xl">{tx(p.name, locale)}</h3>
                <span className="sz-leader" aria-hidden />
                <p className="text-right whitespace-nowrap">
                  <span className="font-semibold sm:text-lg">{formatSum(p.pricePerGuest, locale)}</span>
                </p>
              </div>
              <p className="mt-1 text-right text-sm text-ink-2">{tx(copy.packages.perGuest, locale)}</p>
              <p className="mt-2 text-ink-2">{p.items.map((it) => tx(it, locale)).join(' · ')}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

const banquet: BanquetSkin = {
  Hero,
  order: ['planner', 'halls', 'packages', 'includes', 'steps', 'faq', 'location', 'booking'],
  Halls,
  Packages,
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  return (
    <div className="relative h-[630px] w-[1200px] overflow-hidden bg-bg">
      <svg className="absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden>
        <defs>
          <GirihPattern id="sz-og-pattern" scale={1.3} />
        </defs>
        <rect width="100%" height="100%" fill="url(#sz-og-pattern)" className="sz-hero-pattern" />
      </svg>
      <div className="absolute top-[-75px] right-[-250px] h-[780px] w-[780px]">
        <div className="sz-glow absolute inset-[-8%] rounded-full" />
        <Rosette still className="relative h-full w-full" />
      </div>
      <div className="absolute inset-y-0 left-0 w-[760px] bg-[linear-gradient(90deg,var(--c-bg)_62%,transparent)]" />
      <div className="absolute inset-y-0 left-[84px] flex w-[640px] flex-col justify-center">
        <StarMark size={30} className="text-[var(--gold)]" />
        <p className="mt-8 font-display text-[128px] leading-[0.92] tracking-[-0.02em] whitespace-nowrap">
          <Title name={lead.name} />
        </p>
        <p className="mt-8 text-[40px] leading-tight">{kindLine(lead, locale)}</p>
        <p className="mt-10 text-[26px] text-[var(--gold)]">
          {locale === 'ru' ? 'Концепт сайта — схема зала и проверка даты' : 'Sayt konsepti — zal sxemasi va sanani tekshirish'}
        </p>
      </div>
    </div>
  )
}

export const suzaniNight: Direction = {
  id: 'suzani-night',
  fontClass: `${cormorant.variable} ${onest.variable}`,
  css: `${css}
#sz-hero-pattern g, #sz-og-pattern g { stroke: var(--gold); }
.sz-photo pattern g { stroke: rgba(212, 176, 106, 0.28); }`,
  iconStroke: STROKE,
  themeColor: '#0b2620',
  fontFamilies: ['Cormorant Garamond', 'Onest'],
  heroFont: { family: 'Cormorant Garamond', weight: 400, style: 'normal' },
  Heading,
  PhotoArt,
  Divider,
  Og,
  banquet,
}

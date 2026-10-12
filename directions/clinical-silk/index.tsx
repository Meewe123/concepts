import { AtSign, Check, MapPin, Phone } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { ExampleTag } from '@/core/components/ExampleTag'
import { Section } from '@/core/components/Section'
import { plexMono, plexSans } from '@/core/fonts'
import { formatPhone, instagramHref, telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { copy, kindLine } from '@/niches/dental/content'
import { visitSteps } from '@/niches/dental/sections'
import type { DentalHeroProps, DentalSectionProps, DentalSkin } from '@/niches/dental/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { css } from './style'

const STROKE = 1.5
const UPPER = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28]
const LOWER = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38]

/** Зубная формула (нумерация FDI) — клетки бланка вместо картинки зубов. */
function Formula({ className = '' }: { className?: string }) {
  return (
    <div className={`cs-formula ${className}`} aria-hidden>
      {[...UPPER, ...LOWER].map((n, i) => (
        <span key={n} className={i < 16 ? 'cs-mid' : ''} style={{ '--i': i % 16 } as CSSProperties}>
          {n}
        </span>
      ))}
    </div>
  )
}

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mb-8 max-w-3xl sm:mb-12">
      <h2 className="text-[2rem] leading-[1.1] font-semibold tracking-[-0.02em] sm:text-5xl">{title}</h2>
      {tag && <div className="mt-3">{tag}</div>}
      {lead && <p className="mt-3 max-w-[60ch] text-lg text-ink-2">{lead}</p>}
    </div>
  )
}

function PhotoArt({ label, className = '' }: PhotoArtProps) {
  return (
    <div className={`cs-rule relative grid place-items-end border border-line p-4 ${className}`}>
      <p className="cs-mono text-sm text-ink-2">{label}</p>
    </div>
  )
}

function Hero({ lead, locale, langSwitch }: DentalHeroProps) {
  const phone = lead.phones[0]!
  return (
    <header className="relative flex flex-col px-4 pt-2 pb-4 sm:px-8 md:min-h-[72svh]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between border-b border-line text-sm">
        <span className="cs-mono text-ink-2">{tx(lead.district, locale)}</span>
        {langSwitch}
      </div>
      <div className="mx-auto grid w-full max-w-6xl flex-1 content-center gap-8 pt-14 pb-6 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-16 md:py-8">
        <div>
          <h1 className="text-[clamp(4.5rem,25vw,9.5rem)] leading-[0.9] font-semibold tracking-[-0.045em]">{lead.name}</h1>
          <p className="mt-5 max-w-[24ch] text-xl leading-snug sm:text-2xl">{kindLine(lead, locale)}</p>
          <p className="cs-mono mt-3 text-sm text-ink-2">{tx(lead.address, locale)}</p>
          <div className="mt-7 grid gap-3 sm:flex">
            <a href="#zapis" className="btn btn-lg">
              {tx(copy.book, locale)}
            </a>
            <a href={telHref(phone)} className="btn btn-ghost btn-lg">
              <Phone aria-hidden className="size-5" strokeWidth={STROKE} />
              <span className="cs-mono">{formatPhone(phone)}</span>
            </a>
          </div>
        </div>
        <div>
          <Formula />
          <p className="cs-mono mt-3 flex justify-between text-xs text-ink-2">
            <span>{locale === 'ru' ? 'Зубная формула' : 'Tish formulasi'}</span>
            <span>FDI</span>
          </p>
        </div>
      </div>
    </header>
  )
}

function OptionMark({ index }: { index: number }) {
  return (
    <>
      <span className="cs-num">{String(index + 1).padStart(2, '0')}</span>
      <span className="order-last mr-3">
        <span className="cs-box">
          <Check aria-hidden className="size-3.5 text-white" strokeWidth={3} />
        </span>
      </span>
    </>
  )
}

/** Первый визит — протокол в четыре строки. */
function Visit({ lead, locale }: DentalSectionProps) {
  return (
    <Section id="vizit" alt>
      <Heading title={tx(copy.visit.title, locale)} lead={tx(copy.visit.lead, locale)} tag={<ExampleTag locale={locale} />} />
      <ol className="cs-steps">
        {visitSteps(lead, locale).map((s, i) => (
          <li key={s.title}>
            <span className="cs-mono cs-ice pt-1 text-sm">{`${locale === 'ru' ? 'Шаг' : 'Qadam'} ${String(i + 1).padStart(2, '0')}`}</span>
            <div>
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 max-w-[40ch] text-ink-2">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

/** Контакты — как шапка бланка: поле и значение. */
function Contacts({ lead, locale }: DentalSectionProps) {
  const c = copy.contacts
  const rows: [string, ReactNode][] = [
    [ui.address[locale], tx(lead.address, locale)],
    ...(lead.landmark ? [[tx(c.landmark, locale), tx(lead.landmark, locale)] as [string, ReactNode]] : []),
    [tx(c.hours, locale), lead.hours ? tx(lead.hours, locale) : tx(c.hoursUnknown, locale)],
    [
      ui.phones[locale],
      lead.phones.map((p) => (
        <a key={p} href={telHref(p)} className="block underline decoration-1 underline-offset-4">
          {formatPhone(p)}
        </a>
      )),
    ],
  ]
  if (lead.instagram)
    rows.push([
      'Instagram',
      <a key="ig" href={instagramHref(lead.instagram)} target="_blank" rel="noopener" className="inline-flex items-center gap-2 underline decoration-1 underline-offset-4">
        <AtSign aria-hidden className="size-4" strokeWidth={STROKE} />
        {lead.instagram}
      </a>,
    ])
  return (
    <Section id="adres" alt>
      <Heading title={tx(c.title, locale)} />
      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
        <dl className="border-t border-ink">
          {rows.map(([k, v]) => (
            <div key={k} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="cs-mono text-xs tracking-[0.08em] text-ink-2 uppercase">{k}</dt>
              <dd className="text-lg">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="grid gap-3">
          <a href={lead.mapsUrl} target="_blank" rel="noopener" className="btn btn-lg">
            <MapPin aria-hidden className="size-5" strokeWidth={STROKE} />
            {ui.openMaps[locale]}
          </a>
          <a href="#zapis" className="btn btn-ghost btn-lg">
            {tx(copy.book, locale)}
          </a>
        </div>
      </div>
    </Section>
  )
}

const dental: DentalSkin = {
  Hero,
  order: ['concern', 'visit', 'promos', 'contacts', 'booking'],
  OptionMark,
  Visit,
  Contacts,
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  return (
    <div className="relative h-[630px] w-[1200px] overflow-hidden bg-bg">
      <div className="absolute inset-x-[72px] top-[52px] flex justify-between border-b border-line pb-4 text-[22px]">
        <span className="cs-mono text-ink-2">{tx(lead.district, locale)}</span>
        <span className="cs-mono cs-ice">{locale === 'ru' ? 'Концепт сайта' : 'Sayt konsepti'}</span>
      </div>
      <p className="absolute top-[118px] left-[66px] text-[200px] leading-[0.9] font-semibold tracking-[-0.045em]">{lead.name}</p>
      <div className="absolute top-[150px] right-[72px] w-[440px]">
        <p className="text-[36px] leading-tight">{kindLine(lead, locale)}</p>
        <p className="mt-5 text-[24px] leading-snug text-ink-2">
          {locale === 'ru' ? 'Что вас беспокоит? — ориентир цены, визиты и срок' : 'Nima bezovta qilyapti? — taxminiy narx, tashriflar va muddat'}
        </p>
      </div>
      <div className="absolute inset-x-[72px] bottom-[56px] [&_span]:!animate-none [&_span]:!text-[22px]">
        <Formula />
      </div>
    </div>
  )
}

export const clinicalSilk: Direction = {
  id: 'clinical-silk',
  fontClass: `${plexSans.variable} ${plexMono.variable}`,
  css,
  iconStroke: STROKE,
  themeColor: '#ffffff',
  fontFamilies: ['IBM Plex Sans', 'IBM Plex Mono'],
  heroFont: { family: 'IBM Plex Sans', weight: 600, style: 'normal' },
  Heading,
  PhotoArt,
  Og,
  dental,
}

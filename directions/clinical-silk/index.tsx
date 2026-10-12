import { AtSign, MapPin, Phone } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { ExampleTag } from '@/core/components/ExampleTag'
import { plexMono, plexSans } from '@/core/fonts'
import { formatPhone, instagramHref, telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { NBSP, tx } from '@/core/text'
import type { DentalConcern, DentalConcernId, Lead, Locale } from '@/core/types'
import { priceRange } from '@/niches/dental/ConcernPicker'
import { copy, keepDash, kindLine, monthly, MONTHS } from '@/niches/dental/content'
import { BookingForm, visitSteps } from '@/niches/dental/sections'
import type { DentalHeroProps, DentalSectionProps, DentalSkin } from '@/niches/dental/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { css } from './style'

const STROKE = 1.5
const pad = (n: number) => String(n).padStart(2, '0')
const v = (o: Record<string, string | number>) => o as CSSProperties

/** Тонкие клинические пиктограммы — свои, в одном стиле, без зубов и инструментов. */
const PICTO: Record<DentalConcernId, ReactNode> = {
  pain: <path d="M3 22h8l3-8 5 15 4-11 3 4h11" />,
  filling: (
    <>
      <rect x="8" y="8" width="24" height="24" rx="7" />
      <rect x="15" y="15" width="10" height="10" rx="2.5" fill="currentColor" stroke="none" />
    </>
  ),
  hygiene: (
    <>
      <path d="M20 5c7 9 10 15 10 20a10 10 0 0 1-20 0c0-5 3-11 10-20z" />
      <path d="M15 25a5 5 0 0 0 5 5" />
    </>
  ),
  whitening: (
    <>
      <circle cx="20" cy="20" r="6" />
      <path d="M20 4v5M20 31v5M4 20h5M31 20h5M8.7 8.7l3.5 3.5M27.8 27.8l3.5 3.5M8.7 31.3l3.5-3.5M27.8 12.2l3.5-3.5" />
    </>
  ),
  braces: (
    <>
      <path d="M3 22h4.5M13.5 22h3.5M23 22h3.5M32.5 22H37" />
      <rect x="7.5" y="18.5" width="6" height="7" rx="1.5" />
      <rect x="17" y="18.5" width="6" height="7" rx="1.5" />
      <rect x="26.5" y="18.5" width="6" height="7" rx="1.5" />
      <path d="M6 12c9-3 19-3 28 0" strokeDasharray="2 3" />
    </>
  ),
  implant: (
    <>
      <path d="M12.5 6h15l-2.5 6h-10z" />
      <path d="M14 16.5h12M15 21.5h10M16 26.5h8M17 31.5h6" />
    </>
  ),
}

function Picto({ id, className = '' }: { id: DentalConcernId; className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {PICTO[id]}
    </svg>
  )
}

/** Круглая печать «цены до визита». */
function Stamp({ locale, className = '' }: { locale: Locale; className?: string }) {
  const ring = locale === 'ru' ? 'ЦЕНЫ ДО ВИЗИТА · ЦЕНЫ ДО ВИЗИТА · ' : 'NARXLAR — TASHRIFDAN OLDIN · '
  return (
    <svg viewBox="0 0 120 120" className={`ds-stamp ${className}`} aria-hidden>
      <defs>
        <path id={`ds-ring-${locale}`} d="M60 60m-43 0a43 43 0 1 1 86 0a43 43 0 1 1-86 0" />
      </defs>
      <circle cx="60" cy="60" r="56" fill="none" strokeWidth="2" />
      <circle cx="60" cy="60" r="31" fill="none" strokeWidth="1.2" />
      <text fontSize="10.5" letterSpacing="1" className="ds-stamp-text">
        <textPath href={`#ds-ring-${locale}`} textLength="268" lengthAdjust="spacing">
          {ring}
        </textPath>
      </text>
      <text x="60" y="58" textAnchor="middle" fontSize="15" fontWeight="600" className="ds-stamp-text">
        Denta
      </text>
      <text x="60" y="73" textAnchor="middle" fontSize="8.5" className="ds-stamp-text">
        {locale === 'ru' ? 'м. Минор' : 'Minor'}
      </text>
    </svg>
  )
}

/** Строка чека: название ···· значение */
function SlipLine({ name, value, href }: { name: string; value: string; href?: string }) {
  const inner = (
    <>
      <span>{name}</span>
      <span className="ds-dots" aria-hidden />
      <span className="ds-slip-val">{value}</span>
    </>
  )
  return href ? (
    <a href={href} className="ds-slip-line">
      {inner}
    </a>
  ) : (
    <p className="ds-slip-line">{inner}</p>
  )
}

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mb-10 max-w-3xl sm:mb-14">
      <h2 className="ds-h2">{title}</h2>
      {tag && <div className="mt-3">{tag}</div>}
      {lead && <p className="mt-4 max-w-[52ch] text-lg text-ink-2">{lead}</p>}
    </div>
  )
}

function PhotoArt({ label, className = '' }: PhotoArtProps) {
  return (
    <div className={`grid place-items-end border border-line bg-bg-2 p-4 ${className}`}>
      <p className="ds-mono text-sm text-ink-2">{label}</p>
    </div>
  )
}

/** Первый экран — чек цен, который печатается из щели. Название клиники напечатано на нём. */
function Hero({ lead, locale, langSwitch }: DentalHeroProps) {
  const phone = lead.phones[0]!
  const promos = lead.dental?.promos ?? []
  const ru = locale === 'ru'
  return (
    <header className="ds-hero">
      <div className="ds-top">
        <span className="ds-mono">{tx(lead.district, locale)}</span>
        <span className="ds-lang">{langSwitch}</span>
      </div>
      <div className="ds-hero-grid">
        <div className="ds-hero-copy">
          <p className="ds-kicker">{ru ? 'Цена —' : 'Narx —'}</p>
          <p className="ds-kicker ds-kicker-2">{ru ? 'до визита.' : 'tashrifdan oldin.'}</p>
          <p className="mt-6 max-w-[34ch] text-lg text-ink-2">
            {ru
              ? 'Выберите, что беспокоит, — сайт покажет ориентир цены, число визитов и срок. Без звонков и переписки.'
              : 'Nima bezovta qilayotganini tanlang — sayt taxminiy narx, tashriflar soni va muddatni koʻrsatadi.'}
          </p>
        </div>
        <div className="ds-printer-stage">
          <div className="ds-printer" aria-hidden>
            <span />
          </div>
          <div className="ds-feed">
            <div className="ds-slip-shadow">
              <div className="ds-slip">
                <p className="ds-slip-head">
                  <span>{ru ? 'Стоматология' : 'Stomatologiya'}</span>
                  <span>№{NBSP}0001</span>
                </p>
                <h1 className="ds-name">{lead.name}</h1>
                <p className="ds-claim">{kindLine(lead, locale)}</p>
                <div className="ds-slip-lines">
                  {promos.map((p) => (
                    <SlipLine key={p.text.ru} name={tx(p.text, locale)} value={tx(p.big, locale)} />
                  ))}
                  <SlipLine name={ru ? 'Имплант, брекеты, пломба' : 'Implant, breket, plomba'} value={ru ? 'ориентир ↓' : 'taxminiy ↓'} href="#vybor" />
                </div>
                {promos.length > 0 && <p className="ds-slip-foot">{ru ? 'из карточки на Яндекс Картах · уточнить' : 'Yandex Xaritalardagi sahifadan · aniqlashtiring'}</p>}
              </div>
            </div>
            <Stamp locale={locale} className="ds-stamp-hero" />
          </div>
        </div>
        <div className="ds-hero-cta">
          <a href="#zapis" className="btn btn-lg">
            {tx(copy.book, locale)}
          </a>
          <a href={telHref(phone)} className="btn btn-ghost btn-lg">
            <Phone aria-hidden className="size-5" strokeWidth={STROKE} />
            <span className="ds-mono">{formatPhone(phone)}</span>
          </a>
        </div>
      </div>
    </header>
  )
}

/** Шкала визитов и срока: точки визитов на линии месяцев. */
function Timeline({ c, locale }: { c: DentalConcern; locale: Locale }) {
  const plan = c.plan
  const caption = (
    <p className="ds-tl-cap">
      <span>{keepDash(tx(c.visits!, locale))}</span>
      <span>{keepDash(tx(c.duration!, locale))}</span>
    </p>
  )
  if (!plan) return caption
  const long = plan.months >= 1
  const ticks = long ? Math.min(Math.round(plan.months), 24) : 0
  return (
    <div className="ds-tl">
      <div className={`ds-tl-track ${long ? '' : 'ds-tl-short'}`} aria-hidden>
        {Array.from({ length: ticks + 1 }, (_, i) => (
          <i key={`t${i}`} className="ds-tl-tick" style={v({ left: `${(i / Math.max(ticks, 1)) * 100}%` })} />
        ))}
        {Array.from({ length: plan.visits }, (_, i) => (
          <b
            key={`d${i}`}
            className="ds-tl-dot"
            style={v({ left: long || plan.visits > 1 ? `${(i / Math.max(plan.visits - 1, 1)) * 100}%` : '0%', '--i': i })}
          />
        ))}
      </div>
      {long && (
        <p className="ds-tl-scale" aria-hidden>
          <span>0</span>
          <span>
            {plan.months}
            {NBSP}
            {locale === 'ru' ? 'мес.' : 'oy'}
          </span>
        </p>
      )}
      {caption}
    </div>
  )
}

function Ticket({ c, index, lead, locale }: { c: DentalConcern; index: number; lead: Lead; locale: Locale }) {
  const k = copy.concern
  const label = tx(copy.labels[c.id], locale)
  if (c.id === 'pain')
    return (
      <div className="dc-panel ds-ticket" data-panel="pain">
        <p className="ds-ticket-head">
          <span>{`${locale === 'ru' ? 'ПОВОД' : 'SABAB'} · ${pad(index + 1)}`}</span>
        </p>
        <p className="ds-ticket-title">{label}</p>
        <p className="ds-calm">{tx(k.pain, locale)}</p>
        <div className="grid gap-3 sm:flex">
          <a href="#zapis" className="btn btn-lg" data-book="pain">
            {tx(copy.bookExam, locale)}
          </a>
          <a href={telHref(lead.phones[0]!)} className="btn btn-ghost btn-lg">
            <Phone aria-hidden className="size-5" strokeWidth={STROKE} />
            {ui.call[locale]}
          </a>
        </div>
      </div>
    )
  const p = c.price!
  return (
    <div className="dc-panel ds-ticket" data-panel={c.id}>
      <p className="ds-ticket-head">
        <span>{`${locale === 'ru' ? 'ОРИЕНТИР' : 'TAXMINIY'} · ${pad(index + 1)}`}</span>
        {c.example && <ExampleTag locale={locale} large />}
      </p>
      <p className="ds-ticket-title">{label}</p>
      <p className="dc-price ds-price">{priceRange(p.from, p.to, locale)}</p>
      {c.note && <p className="ds-note">{tx(c.note, locale)}</p>}
      <Timeline c={c} locale={locale} />
      {c.installment && (
        <div className="ds-plan">
          <fieldset className="dc-months">
            <legend className="ds-mono-label">{tx(k.installment, locale)}</legend>
            {MONTHS.map((m, i) => (
              <label key={m}>
                <input type="radio" name={`dc-months-${c.id}`} value={m} defaultChecked={i === 0} className="sr-only" />
                <span className="chip">
                  {m}
                  {NBSP}
                  {tx(k.months, locale)}
                </span>
              </label>
            ))}
          </fieldset>
          {MONTHS.map((m) => (
            <div key={m} className="dc-monthly" data-m={m}>
              <div className="ds-bars" aria-hidden>
                {Array.from({ length: m }, (_, i) => (
                  <i key={i} style={v({ '--i': i })} />
                ))}
              </div>
              <p className="ds-monthly">
                ≈{NBSP}
                {priceRange(monthly(p.from, m), monthly(p.to, m), locale)}
                <span className="dc-per">{tx(k.perMonth, locale)}</span>
              </p>
            </div>
          ))}
          <p className="ds-small">{tx(k.installmentNote, locale)}</p>
        </div>
      )}
      <p className="ds-small">{tx(k.consult, locale)}</p>
      <a href="#zapis" className="btn btn-lg" data-book={c.id}>
        {tx(copy.bookConsult, locale)}
      </a>
    </div>
  )
}

/** «Что вас беспокоит?» — тёмный зал, плитки с пиктограммами и белый «талон» с ориентиром. */
function Concern({ lead, locale }: DentalSectionProps) {
  const k = copy.concern
  const concerns = lead.dental!.concerns
  return (
    <section id="vybor" className="ds-dark">
      <div className="ds-wrap">
        <p className="ds-eyebrow">{locale === 'ru' ? 'Подбор · 6 поводов' : 'Tanlov · 6 sabab'}</p>
        <h2 className="ds-h2">{tx(k.title, locale)}</h2>
        <p className="mt-4 max-w-[46ch] text-lg text-[var(--night-ink-2)]">{tx(k.lead, locale)}</p>
        <div data-concern="" className="dc ds-pick">
          <fieldset className="dc-options ds-tiles">
            <legend className="sr-only">{tx(k.title, locale)}</legend>
            {concerns.map((c, i) => (
              <label key={c.id} className="dc-opt">
                <input type="radio" name="dc-concern" value={c.id} data-label={tx(copy.labels[c.id], locale)} className="sr-only" />
                <span className="dc-card ds-tile">
                  <span className="ds-tile-n">{pad(i + 1)}</span>
                  <Picto id={c.id} className="ds-tile-ico" />
                  <span className="dc-label ds-tile-label">{tx(copy.labels[c.id], locale)}</span>
                </span>
              </label>
            ))}
          </fieldset>
          <div className="dc-results ds-results" aria-live="polite">
            <div className="dc-empty ds-empty">
              <p>{tx(k.empty, locale)}</p>
            </div>
            {concerns.map((c, i) => (
              <Ticket key={c.id} c={c} index={i} lead={lead} locale={locale} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** Первый визит — четыре шага с крупными контурными номерами. */
function Visit({ lead, locale }: DentalSectionProps) {
  return (
    <section id="vizit" className="ds-light">
      <div className="ds-wrap">
        <p className="ds-eyebrow ds-eyebrow-dark">{locale === 'ru' ? 'Первый визит' : 'Birinchi tashrif'}</p>
        <Heading title={tx(copy.visit.title, locale)} lead={tx(copy.visit.lead, locale)} tag={<ExampleTag locale={locale} />} />
        <ol className="ds-steps">
          {visitSteps(lead, locale).map((s, i) => (
            <li key={s.title} style={v({ '--i': i })}>
              <span className="ds-step-n" aria-hidden>
                {pad(i + 1)}
              </span>
              <div>
                <h3 className="text-xl font-semibold sm:text-2xl">{s.title}</h3>
                <p className="mt-2 max-w-[36ch] text-ink-2">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/** Цены и акции из карточки — купоны с вырубкой. */
function Promos({ lead, locale }: DentalSectionProps) {
  const promos = lead.dental?.promos ?? []
  if (promos.length === 0) return null
  return (
    <section id="aktsii" className="ds-ice">
      <div className="ds-wrap">
        <p className="ds-eyebrow ds-eyebrow-dark">{locale === 'ru' ? 'Уже в вашей карточке' : 'Sahifangizda bor'}</p>
        <Heading title={tx(copy.promos.title, locale)} lead={tx(copy.promos.lead, locale)} />
        <ul className="ds-coupons">
          {promos.map((p, i) => (
            <li key={p.text.ru} className="ds-coupon">
              <span className="ds-coupon-n">{pad(i + 1)}</span>
              <p className="ds-coupon-big">{tx(p.big, locale)}</p>
              <p className="ds-coupon-text">{tx(p.text, locale)}</p>
              <p className="ds-coupon-src">
                {p.source} · {tx(copy.promos.check, locale)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Как добраться — схема «метро → напротив», адрес и телефоны в тёмном блоке. */
function Contacts({ lead, locale }: DentalSectionProps) {
  const c = copy.contacts
  const rows: [string, ReactNode][] = [
    [tx(c.hours, locale), lead.hours ? tx(lead.hours, locale) : tx(c.hoursUnknown, locale)],
    [
      ui.phones[locale],
      lead.phones.map((p) => (
        <a key={p} href={telHref(p)} className="ds-mono block text-xl underline decoration-1 underline-offset-4">
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
    <section id="adres" className="ds-dark">
      <div className="ds-wrap">
        <p className="ds-eyebrow">{locale === 'ru' ? 'Как добраться' : 'Qanday borish mumkin'}</p>
        <h2 className="ds-h2 ds-h2-sm">{tx(lead.address, locale)}</h2>
        <svg viewBox="0 0 340 92" className="ds-metro" role="img" aria-label={lead.landmark ? tx(lead.landmark, locale) : tx(lead.address, locale)}>
          <path d="M0 34H340" className="ds-metro-line" />
          <circle cx="112" cy="34" r="11" className="ds-metro-st" />
          <text x="112" y="38.5" textAnchor="middle" fontSize="12" fontWeight="600" className="ds-metro-m">
            M
          </text>
          <text x="112" y="70" textAnchor="middle" fontSize="13" className="ds-metro-label">
            {locale === 'ru' ? 'Минор' : 'Minor'}
          </text>
          <path d="M126 50 C 160 76, 200 76, 226 58" className="ds-metro-path" />
          <rect x="230" y="44" width="78" height="28" rx="2" className="ds-metro-pin" />
          <text x="269" y="62.5" textAnchor="middle" fontSize="13" fontWeight="600" className="ds-metro-pin-t">
            {lead.name}
          </text>
        </svg>
        {lead.landmark && <p className="max-w-[46ch] text-lg text-[var(--night-ink-2)]">{tx(lead.landmark, locale)}</p>}
        <dl className="ds-facts">
          {rows.map(([k, val]) => (
            <div key={k}>
              <dt className="ds-mono-label">{k}</dt>
              <dd>{val}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 grid gap-3 sm:flex">
          <a href={lead.mapsUrl} target="_blank" rel="noopener" className="btn btn-lg ds-btn-ice">
            <MapPin aria-hidden className="size-5" strokeWidth={STROKE} />
            {ui.openMaps[locale]}
          </a>
          <a href="#zapis" className="btn btn-lg ds-btn-line">
            {tx(copy.book, locale)}
          </a>
        </div>
      </div>
    </section>
  )
}

function Booking({ locale }: DentalSectionProps) {
  const b = copy.booking
  return (
    <section id="zapis" className="ds-light">
      <div className="ds-wrap grid gap-4 md:grid-cols-[1fr_1.3fr] md:gap-16">
        <div>
          <p className="ds-eyebrow ds-eyebrow-dark">{locale === 'ru' ? 'Запись' : 'Yozilish'}</p>
          <Heading title={tx(b.title, locale)} lead={tx(b.lead, locale)} />
        </div>
        <div className="ds-form-slip">
          <BookingForm locale={locale} stroke={STROKE} />
        </div>
      </div>
    </section>
  )
}

const dental: DentalSkin = {
  Hero,
  order: ['concern', 'visit', 'promos', 'contacts', 'booking'],
  Concern,
  Visit,
  Promos,
  Contacts,
  Booking,
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  const ru = locale === 'ru'
  const promos = lead.dental?.promos ?? []
  return (
    <div className="ds-og relative h-[630px] w-[1200px] overflow-hidden">
      <div className="absolute top-[96px] left-[72px] w-[560px]">
        <p className="ds-kicker text-[100px]">{ru ? 'Цена —' : 'Narx —'}</p>
        <p className="ds-kicker ds-kicker-2 text-[100px]">{ru ? 'до визита.' : 'tashrifdan oldin.'}</p>
        <p className="mt-8 max-w-[480px] text-[30px] leading-snug text-ink-2">{kindLine(lead, locale)}</p>
      </div>
      <div className="absolute top-[34px] right-[64px] w-[500px]">
        <div className="ds-printer" aria-hidden>
          <span />
        </div>
        <div className="ds-feed ds-feed-still">
          <div className="ds-slip-shadow">
            <div className="ds-slip ds-slip-og">
              <p className="ds-slip-head">
                <span>{ru ? 'Стоматология' : 'Stomatologiya'}</span>
                <span>№{NBSP}0001</span>
              </p>
              <p className="ds-name">{lead.name}</p>
              <div className="ds-slip-lines">
                {promos.map((p) => (
                  <SlipLine key={p.text.ru} name={tx(p.text, locale)} value={tx(p.big, locale)} />
                ))}
                <SlipLine name={ru ? 'Имплант, брекеты, пломба' : 'Implant, breket, plomba'} value={ru ? 'ориентир' : 'taxminiy'} />
              </div>
            </div>
          </div>
          <Stamp locale={locale} className="ds-stamp-og" />
        </div>
      </div>
    </div>
  )
}

export const clinicalSilk: Direction = {
  id: 'clinical-silk',
  fontClass: `${plexSans.variable} ${plexMono.variable}`,
  css,
  iconStroke: STROKE,
  themeColor: '#e4eff7',
  fontFamilies: ['IBM Plex Sans', 'IBM Plex Mono'],
  heroFont: { family: 'IBM Plex Sans', weight: 600, style: 'normal' },
  Heading,
  PhotoArt,
  Og,
  dental,
}

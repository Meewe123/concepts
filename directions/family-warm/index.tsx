import { MapPin, Phone, Send } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { ExampleTag } from '@/core/components/ExampleTag'
import { nunito } from '@/core/fonts'
import { formatPhone, telegramHref, telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { NBSP, tx } from '@/core/text'
import type { DentalConcern, DentalConcernId, Lead, Locale } from '@/core/types'
import { priceRange } from '@/niches/dental/ConcernPicker'
import { copy, keepDash, kindLine, monthly, MONTHS } from '@/niches/dental/content'
import { BookingForm, visitSteps } from '@/niches/dental/sections'
import type { DentalHeroProps, DentalSectionProps, DentalSkin } from '@/niches/dental/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { css } from './style'

const STROKE = 2
const v = (o: Record<string, string | number>) => o as CSSProperties

/**
 * Семья камешков: большой, средний и маленький — с лицами, моргают по очереди.
 * Ни людей, ни зубов: тёплый знак «приходите всей семьёй».
 */
function Pebbles({ className = '', still = false, only }: { className?: string; still?: boolean; only?: 'big' | 'small' }) {
  const anim = still ? '' : 'fw-pop'
  const face = (x1: number, x2: number, y: number, r: number, smile: string, cheeks: [number, number, number]) => (
    <g>
      <g className={still ? '' : 'fw-eyes'}>
        <ellipse cx={x1} cy={y} rx={r} ry={r * 1.3} className="fw-ink" />
        <ellipse cx={x2} cy={y} rx={r} ry={r * 1.3} className="fw-ink" />
      </g>
      <circle cx={cheeks[0]} cy={cheeks[2]} r={r * 1.7} className="fw-cheek" />
      <circle cx={cheeks[1]} cy={cheeks[2]} r={r * 1.7} className="fw-cheek" />
      <path d={smile} className="fw-smile" />
    </g>
  )
  const big = (
    <g className={anim} style={v({ '--d': '0.1s' })}>
      <path d="M32 196C18 120 60 40 120 38c62-2 86 82 70 158Z" className="fw-p-big" />
      {face(100, 138, 108, 4, 'M106 130q13 11 26 0', [84, 154, 124])}
    </g>
  )
  const small = (
    <g className={anim} style={v({ '--d': '0.45s' })}>
      <path d="M282 196c-4-28 10-48 30-48 22 0 32 22 28 48Z" className="fw-p-small" />
      {face(303, 321, 170, 2.6, 'M305 181q7 6 14 0', [295, 330, 178])}
    </g>
  )
  if (only === 'big')
    return (
      <svg viewBox="20 30 180 170" className={className} aria-hidden>
        {big}
      </svg>
    )
  if (only === 'small')
    return (
      <svg viewBox="272 140 76 60" className={className} aria-hidden>
        {small}
      </svg>
    )
  return (
    <svg viewBox="0 30 360 170" className={className} aria-hidden>
      {big}
      <g className={anim} style={v({ '--d': '0.28s' })}>
        <path d="M178 196c-8-56 18-100 58-100 42 0 60 50 52 100Z" className="fw-p-mid" />
        {face(222, 252, 138, 3.4, 'M227 156q10 9 20 0', [210, 264, 152])}
      </g>
      {small}
    </svg>
  )
}

/** Дружелюбные иконки — свои, с заливкой, в одном стиле. */
const ICON: Record<DentalConcernId, ReactNode> = {
  pain: (
    <>
      <path d="M24 41C10 31 6 23 6 17a9 9 0 0 1 18-3 9 9 0 0 1 18 3c0 6-4 14-18 24z" className="fw-f-apricot" />
      <g transform="rotate(-35 24 22)">
        <rect x="12" y="17.5" width="24" height="10" rx="5" className="fw-f-cream" />
        <circle cx="21.5" cy="22.5" r="1" className="fw-ink" />
        <circle cx="26.5" cy="22.5" r="1" className="fw-ink" />
      </g>
    </>
  ),
  filling: <path d="M9 14h10a5 5 0 1 1 10 0h10v10a5 5 0 1 0 0 10v6H9z" className="fw-f-green" />,
  hygiene: (
    <>
      <circle cx="19" cy="27" r="11" className="fw-f-cream" />
      <circle cx="34" cy="15" r="6.5" className="fw-f-cream" />
      <circle cx="36" cy="32" r="4" className="fw-f-cream" />
      <path d="M13 25a6 6 0 0 1 5-5" />
    </>
  ),
  whitening: (
    <>
      <path d="M22 5c2 12 6 16 18 18-12 2-16 6-18 18-2-12-6-16-18-18 12-2 16-6 18-18z" className="fw-f-apricot" />
      <path d="M38 5c.7 3.5 2 4.8 5.5 5.5-3.5.7-4.8 2-5.5 5.5-.7-3.5-2-4.8-5.5-5.5 3.5-.7 4.8-2 5.5-5.5z" className="fw-f-cream" />
    </>
  ),
  braces: (
    <>
      <path d="M5 27c10-9 28-9 38 0" fill="none" />
      <circle cx="11.5" cy="22.6" r="4.6" className="fw-f-green" />
      <circle cx="20" cy="19.8" r="4.6" className="fw-f-apricot" />
      <circle cx="28.5" cy="19.8" r="4.6" className="fw-f-green" />
      <circle cx="37" cy="22.6" r="4.6" className="fw-f-apricot" />
    </>
  ),
  implant: (
    <>
      <path d="M8 41h32" />
      <path d="M24 41V25" fill="none" />
      <path d="M24 30c-8 0-13-6-13-13 8 0 13 5 13 13z" className="fw-f-green" />
      <path d="M24 25c7 0 12-5 12-12-7 0-12 5-12 12z" className="fw-f-apricot" />
    </>
  ),
}

function Icon({ id }: { id: DentalConcernId }) {
  return (
    <svg viewBox="0 0 48 48" className="fw-ico" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {ICON[id]}
    </svg>
  )
}

/** Волна-переход между блоками */
function Wave({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 480 48" preserveAspectRatio="none" className={`fw-wave ${className}`} style={flip ? { transform: 'scaleY(-1)' } : undefined} aria-hidden>
      <path d="M0 26C70 4 150 2 240 20s170 26 240 4V48H0Z" />
    </svg>
  )
}

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mb-8 max-w-3xl sm:mb-12">
      <h2 className="fw-h2">{title}</h2>
      {tag && <div className="mt-3">{tag}</div>}
      {lead && <p className="mt-3 max-w-[50ch] text-lg text-ink-2">{lead}</p>}
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
  const ru = locale === 'ru'
  return (
    <header className="fw-hero">
      <div className="fw-top">
        <span>{tx(lead.district, locale)}</span>
        <span className="fw-lang">{langSwitch}</span>
      </div>
      <div className="fw-hero-grid">
        <div className="fw-hero-copy">
          <h1 className="fw-name">{lead.name}</h1>
          <p className="fw-claim">{kindLine(lead, locale)}</p>
          <p className="fw-sub">{ru ? 'Взрослых и детей — запишите всю семью сразу.' : 'Kattalar va bolalar — butun oilani birdan yozdiring.'}</p>
          <div className="fw-cta">
            <a href="#zapis" className="btn btn-lg fw-btn-cream">
              {tx(copy.book, locale)}
            </a>
            <div className="fw-cta-row">
              <a href={telHref(lead.phones[0]!)} className="btn fw-btn-outline">
                <Phone aria-hidden className="size-5" strokeWidth={STROKE} />
                {ru ? ui.call.ru : 'Qoʻngʻiroq'}
              </a>
              {lead.telegram && (
                <a href={telegramHref(lead.telegram)} target="_blank" rel="noopener" className="btn fw-btn-outline">
                  <Send aria-hidden className="size-5" strokeWidth={STROKE} />
                  Telegram
                </a>
              )}
            </div>
          </div>
        </div>
        <Pebbles className="fw-hero-pebbles" />
      </div>
      <Wave className="fw-wave-hero" />
    </header>
  )
}

/** Сколько визитов — камешками; больше 12 — «+N». */
function VisitPebbles({ n }: { n: number }) {
  const shown = Math.min(n, 12)
  return (
    <span className="fw-vp" aria-hidden>
      {Array.from({ length: shown }, (_, i) => (
        <i key={i} style={v({ '--i': i })} />
      ))}
      {n > shown && <b>+{n - shown}</b>}
    </span>
  )
}

function Card({ c, lead, locale }: { c: DentalConcern; lead: Lead; locale: Locale }) {
  const k = copy.concern
  const label = tx(copy.labels[c.id], locale)
  if (c.id === 'pain')
    return (
      <div className="dc-panel fw-card fw-card-pain" data-panel="pain">
        <Pebbles only="small" className="fw-card-pebble" />
        <p className="fw-chip">{label}</p>
        <p className="fw-calm">{tx(k.pain, locale)}</p>
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
    <div className="dc-panel fw-card" data-panel={c.id}>
      <div className="fw-card-head">
        <p className="fw-chip">{label}</p>
        {c.example && <ExampleTag locale={locale} large />}
      </div>
      <p className="fw-label">{tx(k.price, locale)}</p>
      <p className="dc-price fw-price">{priceRange(p.from, p.to, locale)}</p>
      {c.note && <p className="fw-note">{tx(c.note, locale)}</p>}
      <div className="fw-facts">
        <div>
          <p className="fw-label">{tx(k.visits, locale)}</p>
          {c.plan && <VisitPebbles n={c.plan.visits} />}
          <p className="fw-fact">{keepDash(tx(c.visits!, locale))}</p>
        </div>
        <div>
          <p className="fw-label">{tx(k.duration, locale)}</p>
          <p className="fw-fact fw-fact-big">{keepDash(tx(c.duration!, locale))}</p>
        </div>
      </div>
      {c.installment && (
        <div className="fw-plan">
          <fieldset className="dc-months">
            <legend className="fw-label">{tx(k.installment, locale)}</legend>
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
              <div className="fw-coins" aria-hidden>
                {Array.from({ length: m }, (_, i) => (
                  <i key={i} style={v({ '--i': i })} />
                ))}
              </div>
              <p className="fw-monthly">
                ≈{NBSP}
                {priceRange(monthly(p.from, m), monthly(p.to, m), locale)}
                <span className="dc-per">{tx(k.perMonth, locale)}</span>
              </p>
            </div>
          ))}
          <p className="fw-small">{tx(k.installmentNote, locale)}</p>
        </div>
      )}
      <p className="fw-small">{tx(k.consult, locale)}</p>
      <a href="#zapis" className="btn btn-lg" data-book={c.id}>
        {tx(copy.bookConsult, locale)}
      </a>
    </div>
  )
}

function Concern({ lead, locale }: DentalSectionProps) {
  const k = copy.concern
  const concerns = lead.dental!.concerns
  return (
    <section id="vybor" className="fw-sec">
      <div className="fw-wrap">
        <p className="fw-pill">{locale === 'ru' ? 'Подбор за одно касание' : 'Bir bosishda tanlov'}</p>
        <Heading title={tx(k.title, locale)} lead={tx(k.lead, locale)} />
        <div data-concern="" className="dc fw-pick">
          <fieldset className="dc-options fw-tiles">
            <legend className="sr-only">{tx(k.title, locale)}</legend>
            {concerns.map((c, i) => (
              <label key={c.id} className="dc-opt">
                <input type="radio" name="dc-concern" value={c.id} data-label={tx(copy.labels[c.id], locale)} className="sr-only" />
                <span className="dc-card fw-tile" style={v({ '--tint': i % 2 ? 'var(--green-soft)' : 'var(--apricot-soft)' })}>
                  <span className="fw-blob">
                    <Icon id={c.id} />
                  </span>
                  <span className="dc-label fw-tile-label">{tx(copy.labels[c.id], locale)}</span>
                </span>
              </label>
            ))}
          </fieldset>
          <div className="dc-results fw-results" aria-live="polite">
            <div className="dc-empty fw-empty">
              <Pebbles className="w-40" still />
              <p>{tx(k.empty, locale)}</p>
            </div>
            {concerns.map((c) => (
              <Card key={c.id} c={c} lead={lead} locale={locale} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** «Для всей семьи» — кого записываете; выбор уходит в форму. */
function Family({ locale }: DentalSectionProps) {
  const f = copy.family
  const avatars: ReactNode[] = [
    <Pebbles key="me" only="big" className="h-12 w-auto" still />,
    <Pebbles key="kid" only="small" className="h-8 w-auto" still />,
    <Pebbles key="all" className="h-auto w-[4.8rem]" still />,
  ]
  return (
    <section id="semya" className="fw-family">
      <Wave className="fw-wave-top" flip />
      <div className="fw-wrap fw-family-grid">
        <div>
          <h2 className="fw-h2">{tx(f.title, locale)}</h2>
          <p className="mt-4 max-w-[44ch] text-lg">
            {locale === 'ru'
              ? 'Iroda — семейная стоматология: здесь принимают и взрослых, и детей. Запишите всех сразу — отметьте, кого ведёте.'
              : 'Iroda — oilaviy stomatologiya: bu yerda kattalarni ham, bolalarni ham qabul qilishadi. Hammani birdan yozdiring — kimni olib kelishingizni belgilang.'}
          </p>
        </div>
        <div className="grid gap-3">
          <p className="fw-label">{tx(f.who, locale)}</p>
          {f.whoOptions.map((o, i) => (
            <a key={o.ru} href="#zapis" data-family={tx(o, locale)} className="fw-who">
              <span className="fw-who-av">{avatars[i]}</span>
              <span className="fw-who-t">{tx(o, locale)}</span>
              <span aria-hidden className="fw-who-arrow">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
      <Wave className="fw-wave-bottom" />
    </section>
  )
}

function Visit({ lead, locale }: DentalSectionProps) {
  return (
    <section id="vizit" className="fw-sec">
      <div className="fw-wrap">
        <p className="fw-pill">{locale === 'ru' ? 'Без сюрпризов' : 'Kutilmagan narsalarsiz'}</p>
        <Heading title={tx(copy.visit.title, locale)} lead={tx(copy.visit.lead, locale)} tag={<ExampleTag locale={locale} />} />
        <ol className="fw-steps">
          {visitSteps(lead, locale).map((s, i) => (
            <li key={s.title}>
              <span className="fw-step-n">{i + 1}</span>
              <div>
                <h3 className="text-xl font-extrabold sm:text-2xl">{s.title}</h3>
                <p className="mt-1 max-w-[34ch] text-ink-2">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Booking({ locale }: DentalSectionProps) {
  const b = copy.booking
  return (
    <section id="zapis" className="fw-green">
      <div className="fw-wrap fw-booking">
        <div>
          <h2 className="fw-h2">{tx(b.title, locale)}</h2>
          <p className="mt-4 max-w-[36ch] text-lg">{tx(b.lead, locale)}</p>
          <Pebbles className="mt-8 hidden w-72 md:block" still />
        </div>
        <div className="fw-form-card">
          <BookingForm locale={locale} stroke={STROKE} family />
        </div>
      </div>
    </section>
  )
}

function Contacts({ lead, locale }: DentalSectionProps) {
  const c = copy.contacts
  return (
    <section id="adres" className="fw-sec fw-sec-2">
      <div className="fw-wrap">
        <p className="fw-pill">{locale === 'ru' ? 'Где мы' : 'Biz qayerdamiz'}</p>
        <h2 className="fw-h2 fw-h2-sm">{tx(lead.address, locale)}</h2>
        <div className="fw-contact-grid">
          <div className="fw-contact-card">
            <p className="fw-label">{tx(c.hours, locale)}</p>
            <p className="fw-fact">{lead.hours ? tx(lead.hours, locale) : tx(c.hoursUnknown, locale)}</p>
          </div>
          <div className="fw-contact-card">
            <p className="fw-label">{ui.phones[locale]}</p>
            {lead.phones.map((p) => (
              <a key={p} href={telHref(p)} className="fw-phone">
                {formatPhone(p)}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={lead.mapsUrl} target="_blank" rel="noopener" className="btn btn-lg">
            <MapPin aria-hidden className="size-5" strokeWidth={STROKE} />
            {ui.openMaps[locale]}
          </a>
          {lead.telegram && (
            <a href={telegramHref(lead.telegram)} target="_blank" rel="noopener" className="btn btn-ghost btn-lg">
              <Send aria-hidden className="size-5" strokeWidth={STROKE} />
              {ui.telegram[locale]}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

const dental: DentalSkin = {
  Hero,
  order: ['concern', 'family', 'visit', 'booking', 'contacts'],
  Concern,
  Family,
  Visit,
  Booking,
  Contacts,
  familyChoice: true,
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  return (
    <div className="fw-og relative h-[630px] w-[1200px] overflow-hidden">
      <div className="absolute top-[70px] left-[84px] w-[640px]">
        <p className="fw-name !text-[210px]">{lead.name}</p>
        <p className="fw-claim !mt-4 !text-[44px]">{kindLine(lead, locale)}</p>
        <p className="mt-6 max-w-[520px] text-[28px] text-[#f6efe3]/85">
          {locale === 'ru' ? 'Концепт сайта — ориентир цены и запись всей семьи' : 'Sayt konsepti — taxminiy narx va butun oilani yozdirish'}
        </p>
      </div>
      <Pebbles still className="absolute right-[40px] bottom-[46px] w-[520px]" />
      <svg viewBox="0 0 480 48" preserveAspectRatio="none" className="fw-wave absolute inset-x-0 bottom-0 h-[70px] w-full" aria-hidden>
        <path d="M0 26C70 4 150 2 240 20s170 26 240 4V48H0Z" />
      </svg>
    </div>
  )
}

export const familyWarm: Direction = {
  id: 'family-warm',
  fontClass: nunito.variable,
  css,
  iconStroke: STROKE,
  themeColor: '#2f5e45',
  fontFamilies: ['Nunito'],
  heroFont: { family: 'Nunito', weight: 900, style: 'normal' },
  Heading,
  PhotoArt,
  Og,
  dental,
}

import { MapPin, Phone } from 'lucide-react'
import type { CSSProperties } from 'react'
import { ExampleTag } from '@/core/components/ExampleTag'
import { onest, spectral } from '@/core/fonts'
import { formatPhone, instagramHref, telHref, yandexSearch } from '@/core/format'
import { ui } from '@/core/i18n'
import { NBSP, tx } from '@/core/text'
import type { DentalConcern, Lead, Locale } from '@/core/types'
import { priceRange } from '@/niches/dental/ConcernPicker'
import { copy, keepDash, kindLine, monthly, MONTHS } from '@/niches/dental/content'
import { BookingForm, visitSteps } from '@/niches/dental/sections'
import type { DentalHeroProps, DentalSectionProps, DentalSkin } from '@/niches/dental/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { css } from './style'

const STROKE = 1.4
const v = (o: Record<string, string | number>) => o as CSSProperties
const pad = (n: number) => String(n).padStart(2, '0')

/** «Неровно → ровно»: капсулы стоят вкривь и выстраиваются в линию, по ним проходит коралловая дуга. */
const CROOKED = [
  [-14, 10],
  [9, -6],
  [-6, 12],
  [16, -2],
  [-11, 6],
  [7, -10],
  [-17, 4],
  [12, 9],
  [-5, -8],
  [14, 6],
]
function Align({ className = '', still = false }: { className?: string; still?: boolean }) {
  return (
    <svg viewBox="0 0 360 120" className={`es-align ${still ? 'es-still' : ''} ${className}`} aria-hidden>
      {CROOKED.map(([r, y], i) => (
        <rect key={i} x={12 + i * 34} y={22} width={22} height={70} rx={11} className="es-cap" style={v({ '--r': `${r}deg`, '--y': `${y}px`, '--i': i })} />
      ))}
      <path d="M8 57 H352" className="es-wire" pathLength={1} />
      {CROOKED.map((_, i) => (
        <rect key={`b${i}`} x={18 + i * 34} y={51} width={10} height={12} rx={2} className="es-bracket" style={v({ '--i': i })} />
      ))}
    </svg>
  )
}

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mb-10 max-w-3xl">
      <h2 className="es-h2">{title}</h2>
      {tag && <div className="mt-3">{tag}</div>}
      {lead && <p className="es-lead mt-4">{lead}</p>}
    </div>
  )
}

function PhotoArt({ label, className = '' }: PhotoArtProps) {
  return (
    <div className={`relative grid place-items-center bg-bg-2 ${className}`}>
      <Align still className="w-4/5" />
      <p className="absolute bottom-3 left-4 text-sm">{label}</p>
    </div>
  )
}

function Hero({ lead, locale, langSwitch }: DentalHeroProps) {
  const ru = locale === 'ru'
  const branches = lead.dental?.branches ?? []
  return (
    <header className="es-hero">
      <div className="es-top">
        <span>{tx(lead.district, locale)}</span>
        <span className="es-lang">{langSwitch}</span>
      </div>
      <div className="es-hero-grid">
        <div>
          <p className="es-kicker">{kindLine(lead, locale)}</p>
          <h1 className="es-name">
            <span>Nasimov</span>
            <span className="es-name-2">Dentistry</span>
          </h1>
        </div>
        <div className="es-art">
          <Align />
          <p className="es-rovno" aria-hidden>
            {ru ? 'Ровно.' : 'Tekis.'}
          </p>
        </div>
        <div>
          <p className="es-statement">
            {ru ? (
              <>
                Ровные зубы начинаются с ясных цифр: <em>ориентир цены, срок и платёж в месяц</em> — до первого визита.
              </>
            ) : (
              <>
                Tekis tishlar aniq raqamlardan boshlanadi: <em>taxminiy narx, muddat va oylik toʻlov</em> — birinchi tashrifgacha.
              </>
            )}
          </p>
          <div className="es-cta">
            <a href="#zapis" className="btn btn-lg">
              {tx(copy.book, locale)}
            </a>
            <a href={telHref(lead.phones[0]!)} className="btn btn-ghost btn-lg">
              <Phone aria-hidden className="size-5" strokeWidth={STROKE} />
              {formatPhone(lead.phones[0]!)}
            </a>
          </div>
          {branches.length > 1 && (
            <p className="es-branches">
              {branches.map((b, i) => (
                <span key={b.id}>
                  <b>{pad(i + 1)}</b> {tx(b.name, locale)}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
      <Marquee />
    </header>
  )
}

/** Бегущая строка «Ровно. Tekis.» — капсулы-разделители стоят то вкривь, то ровно. */
function Marquee() {
  const run = (k: number) => (
    <span key={k}>
      {[0, 1, 2, 3].map((i) => (
        <span key={i}>
          Ровно.
          <b style={v({ '--r': `${CROOKED[i * 2]![0]}deg` })} />
          <i>Tekis.</i>
          <b />
        </span>
      ))}
    </span>
  )
  return (
    <div className="es-marquee" aria-hidden>
      <div className="es-marquee-track">{[0, 1].map(run)}</div>
    </div>
  )
}

/** Капсулы-месяцы: в рассрочке каждый месяц «выравнивается» по очереди. */
function MonthCaps({ n }: { n: number }) {
  return (
    <span className="es-mcaps" aria-hidden>
      {Array.from({ length: n }, (_, i) => (
        <i key={i} style={v({ '--i': i, '--r': `${CROOKED[i % CROOKED.length]![0]}deg` })} />
      ))}
    </span>
  )
}

function Result({ c, index, lead, locale }: { c: DentalConcern; index: number; lead: Lead; locale: Locale }) {
  const k = copy.concern
  const label = tx(copy.labels[c.id], locale)
  if (c.id === 'pain')
    return (
      <div className="dc-panel es-card" data-panel="pain">
        <p className="es-card-n">{pad(index + 1)}</p>
        <p className="es-card-title">{label}</p>
        <p className="es-calm">{tx(k.pain, locale)}</p>
        <div className="grid gap-3 sm:flex">
          <a href="#zapis" className="btn btn-lg" data-book="pain">
            {tx(copy.bookExam, locale)}
          </a>
          <a href={telHref(lead.phones[0]!)} className="btn btn-ghost btn-lg es-on-dark">
            <Phone aria-hidden className="size-5" strokeWidth={STROKE} />
            {ui.call[locale]}
          </a>
        </div>
      </div>
    )
  const p = c.price!
  return (
    <div className="dc-panel es-card" data-panel={c.id}>
      <div className="flex items-start justify-between gap-3">
        <p className="es-card-n">{pad(index + 1)}</p>
        {c.example && <ExampleTag locale={locale} large />}
      </div>
      <p className="es-card-title">{label}</p>
      <p className="es-card-price">{priceRange(p.from, p.to, locale)}</p>
      {c.note && <p className="es-card-note">{tx(c.note, locale)}</p>}
      <dl className="es-card-facts">
        <div>
          <dt>{tx(k.visits, locale)}</dt>
          <dd>{keepDash(tx(c.visits!, locale))}</dd>
        </div>
        <div>
          <dt>{tx(k.duration, locale)}</dt>
          <dd>{keepDash(tx(c.duration!, locale))}</dd>
        </div>
      </dl>
      {c.installment && (
        <div className="es-plan">
          <fieldset className="dc-months">
            <legend className="es-label">{tx(k.installment, locale)}</legend>
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
              <MonthCaps n={m} />
              <p className="es-monthly">
                ≈{NBSP}
                {priceRange(monthly(p.from, m), monthly(p.to, m), locale)}
                <span className="dc-per">{tx(k.perMonth, locale)}</span>
              </p>
            </div>
          ))}
          <p className="es-small">{tx(k.installmentNote, locale)}</p>
        </div>
      )}
      <p className="es-small">{tx(k.consult, locale)}</p>
      <a href="#zapis" className="btn btn-lg" data-book={c.id}>
        {tx(copy.bookConsult, locale)}
      </a>
    </div>
  )
}

/** «Что вас беспокоит?» — журнальное оглавление; брекеты выделены как специализация. */
function Concern({ lead, locale }: DentalSectionProps) {
  const k = copy.concern
  const ru = locale === 'ru'
  const concerns = lead.dental!.concerns
  return (
    <section id="vybor" className="es-sec">
      <div className="es-wrap">
        <Heading title={tx(k.title, locale)} lead={tx(k.lead, locale)} />
        <div data-concern="" className="dc es-pick">
          <fieldset className="dc-options es-list">
            <legend className="sr-only">{tx(k.title, locale)}</legend>
            {concerns.map((c, i) => (
              <label key={c.id} className={`dc-opt ${c.id === 'braces' ? 'es-opt-star' : ''}`}>
                <input type="radio" name="dc-concern" value={c.id} data-label={tx(copy.labels[c.id], locale)} className="sr-only" />
                <span className="dc-card es-opt">
                  <span className="es-opt-n">{pad(i + 1)}</span>
                  <span className="dc-label es-opt-label">{tx(copy.labels[c.id], locale)}</span>
                  {c.id === 'braces' && <span className="es-opt-tag">{ru ? 'специализация' : 'ixtisoslik'}</span>}
                </span>
              </label>
            ))}
          </fieldset>
          <div className="dc-results es-results" aria-live="polite">
            <div className="dc-empty es-empty">
              <Align still className="w-full max-w-[16rem]" />
              <p>{tx(k.empty, locale)}</p>
            </div>
            {concerns.map((c, i) => (
              <Result key={c.id} c={c} index={i} lead={lead} locale={locale} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** Ортодонтия — специализация: публичный факт про Nasimov World. */
function Ortho({ locale }: DentalSectionProps) {
  const ru = locale === 'ru'
  return (
    <section className="es-sec es-sec-ink">
      <div className="es-wrap es-ortho">
        <p className="es-big-num">
          <span className="sr-only">2018</span>
          {'2018'.split('').map((d, i) => (
            <span key={i} aria-hidden style={v({ '--r': `${CROOKED[i * 3]![0]}deg`, '--y': `${CROOKED[i * 3]![1]! * 0.01}em` })}>
              {d}
            </span>
          ))}
        </p>
        <div>
          <h2 className="es-h2">{ru ? 'Ортодонтия — это наше' : 'Ortodontiya — bizning sohamiz'}</h2>
          <p className="es-lead mt-4">
            {ru
              ? 'С 2018 года на базе клиники работает Nasimov World: инструменты, материалы и системы для ортодонтов Узбекистана, семинары для врачей.'
              : '2018-yildan beri klinika negizida Nasimov World ishlaydi: Oʻzbekiston ortodontlari uchun asboblar, materiallar va tizimlar, shifokorlar uchun seminarlar.'}
          </p>
        </div>
      </div>
    </section>
  )
}

function Visit({ lead, locale }: DentalSectionProps) {
  return (
    <section id="vizit" className="es-sec es-sec-2">
      <div className="es-wrap">
        <Heading title={tx(copy.visit.title, locale)} lead={tx(copy.visit.lead, locale)} tag={<ExampleTag locale={locale} />} />
        <ol className="es-steps">
          {visitSteps(lead, locale).map((s, i) => (
            <li key={s.title}>
              <span className="es-step-n">{i + 1}</span>
              <h3 className="es-step-t">{s.title}</h3>
              <p className="es-step-p">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Contacts({ lead, locale }: DentalSectionProps) {
  const ru = locale === 'ru'
  const branches = lead.dental?.branches ?? []
  return (
    <section id="adres" className="es-sec">
      <div className="es-wrap">
        <Heading title={ru ? 'Два адреса' : 'Ikki manzil'} />
        <ol className="es-addr">
          {branches.map((b, i) => (
            <li key={b.id}>
              <span className="es-addr-n">{pad(i + 1)}</span>
              <h3 className="es-addr-t">{tx(b.name, locale)}</h3>
              <p>{tx(b.address, locale)}</p>
              <a href={i === 0 ? lead.mapsUrl : yandexSearch(tx(b.address, 'ru'))} target="_blank" rel="noopener" className="es-link">
                <MapPin aria-hidden className="size-4" strokeWidth={STROKE} />
                {ui.openMaps[locale]}
              </a>
            </li>
          ))}
        </ol>
        <div className="es-contact-row">
          <div>
            <p className="es-label">{tx(copy.contacts.hours, locale)}</p>
            <p className="es-contact-v">{lead.hours ? tx(lead.hours, locale) : tx(copy.contacts.hoursUnknown, locale)}</p>
          </div>
          <div>
            <p className="es-label">{ui.phones[locale]}</p>
            <a href={telHref(lead.phones[0]!)} className="es-contact-tel">
              {formatPhone(lead.phones[0]!)}
            </a>
          </div>
          {lead.instagram && (
            <div>
              <p className="es-label">Instagram</p>
              <a href={instagramHref(lead.instagram)} target="_blank" rel="noopener" className="es-contact-v underline decoration-1 underline-offset-4">
                @{lead.instagram}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Booking({ lead, locale }: DentalSectionProps) {
  const b = copy.booking
  return (
    <section id="zapis" className="es-sec es-sec-coral">
      <div className="es-wrap es-booking">
        <div>
          <h2 className="es-h2">{tx(b.title, locale)}</h2>
          <p className="es-lead mt-4">{tx(b.lead, locale)}</p>
          <Align still className="mt-8 hidden w-72 md:block" />
        </div>
        <div className="es-form">
          <BookingForm locale={locale} stroke={STROKE} branches={(lead.dental?.branches ?? []).map((x) => tx(x.name, locale))} />
        </div>
      </div>
    </section>
  )
}

const dental: DentalSkin = {
  Hero,
  order: ['concern', 'promos', 'visit', 'booking', 'contacts'],
  Concern,
  Promos: Ortho,
  Visit,
  Booking,
  Contacts,
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  return (
    <div className="es-hero es-og relative h-[630px] w-[1200px] overflow-hidden">
      <div className="absolute top-[78px] left-[80px] w-[560px]">
        <p className="es-kicker !text-[20px]">{kindLine(lead, locale)}</p>
        <p className="es-name !text-[150px]">
          <span>Nasimov</span>
          <span className="es-name-2 !text-[30px]">Dentistry</span>
        </p>
        <p className="es-statement !mt-9 !max-w-[540px] !text-[34px]">
          {locale === 'ru' ? 'Концепт сайта — брекеты и имплант: цена, срок и платёж в месяц' : 'Sayt konsepti — breket va implant: narx, muddat va oylik toʻlov'}
        </p>
      </div>
      <div className="absolute top-[40px] right-[40px] h-[550px] w-[500px]">
        <div className="es-art h-full">
          <Align still />
          <p className="es-rovno !text-[110px]">{locale === 'ru' ? 'Ровно.' : 'Tekis.'}</p>
        </div>
      </div>
    </div>
  )
}

export const editorialSmile: Direction = {
  id: 'editorial-smile',
  fontClass: `${spectral.variable} ${onest.variable}`,
  css,
  iconStroke: STROKE,
  themeColor: '#f7f0e6',
  fontFamilies: ['Spectral', 'Onest'],
  heroFont: { family: 'Spectral', weight: 600, style: 'normal' },
  Heading,
  PhotoArt,
  Og,
  dental,
}

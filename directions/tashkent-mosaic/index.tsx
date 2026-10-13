import { MapPin, Phone } from 'lucide-react'
import type { CSSProperties } from 'react'
import { ExampleTag } from '@/core/components/ExampleTag'
import { interTight, oswald } from '@/core/fonts'
import { formatPhone, telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { NBSP, tx } from '@/core/text'
import type { DentalConcern, L10n, Lead, Locale } from '@/core/types'
import { priceRange } from '@/niches/dental/ConcernPicker'
import { copy, keepDash, kindLine, monthly, MONTHS } from '@/niches/dental/content'
import { BookingForm, visitSteps } from '@/niches/dental/sections'
import type { DentalHeroProps, DentalSectionProps, DentalSkin } from '@/niches/dental/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { css } from './style'

const STROKE = 1.8
const v = (o: Record<string, string | number>) => o as CSSProperties
const pad = (n: number) => String(n).padStart(2, '0')

/** Детерминированный «случай»: одна и та же мозаика при каждой сборке. */
function rnd(c: number, r: number, s = 0): number {
  let h = (c * 374761393 + r * 668265263 + s * 982451653) | 0
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296
}

/**
 * Панно в духе чиланзарских фасадов: поле смальты кобальта, в центре — ромбический медальон
 * из концентрических колец (как в узбекском орнаменте), внизу — цокольная полоса.
 * Цвета: 0 кобальт, 1 глубокий синий, 2 небесный, 3 шафран, 4 штукатурка.
 */
const RING = [3, 3, 3, 1, 4, 3, 1, 2]
const ringOf = (c: number, r: number, cols: number, rows: number) => Math.round(Math.abs(c - (cols - 1) / 2) + Math.abs(r - (rows - 3) / 2))
function tileColor(c: number, r: number, cols: number, rows: number): number {
  if (r === rows - 2) return c % 2 ? 4 : 1
  if (r === rows - 1) return (c + 1) % 4 < 2 ? 3 : 1
  const d = ringOf(c, r, cols, rows)
  if (d < RING.length) return RING[d]!
  const x = rnd(c, r)
  if (x < 0.035) return 4
  return x < 0.6 ? 0 : x < 0.92 ? 1 : 2
}

function Mosaic({ cols = 18, rows = 12, className = '', still = false, slice = false }: { cols?: number; rows?: number; className?: string; still?: boolean; slice?: boolean }) {
  // плитки группируются по кольцам медальона: у кольца одна задержка — панно раскрывается ромбом
  const rings = new Map<number, { c: number; r: number; t: number }[]>()
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const ring = ringOf(c, r, cols, rows)
      if (!rings.has(ring)) rings.set(ring, [])
      rings.get(ring)!.push({ c, r, t: tileColor(c, r, cols, rows) })
    }
  return (
    <svg
      viewBox={`0 0 ${cols * 20} ${rows * 20}`}
      className={`tm-mosaic ${still ? 'tm-still' : ''} ${className}`}
      preserveAspectRatio={slice ? 'xMidYMid slice' : undefined}
      aria-hidden
    >
      <rect width={cols * 20} height={rows * 20} className="tm-grout" />
      {[...rings.entries()].map(([ring, tiles]) => (
        <g key={ring} style={v({ '--d': `${(ring * 0.06).toFixed(2)}s` })}>
          {tiles.map(({ c, r, t }) => {
            const glint = (t === 3 || t === 4) && rnd(c, r, 1) < 0.3
            return (
              <rect
                key={`${c}-${r}`}
                x={c * 20 + 1}
                y={r * 20 + 1}
                width={18}
                height={18}
                className={`tm-t${t} tm-a${Math.floor(rnd(c, r, 2) * 4)}${glint ? ` tm-glint tm-g${Math.floor(rnd(c, r, 3) * 4)}` : ''}`}
              />
            )
          })}
        </g>
      ))}
    </svg>
  )
}

/** Узор 3×3 на плитке варианта — у каждого свой. */
const MINI: number[][] = [
  [1, 0, 1, 0, 3, 0, 1, 0, 1],
  [0, 4, 0, 4, 0, 4, 0, 4, 0],
  [2, 2, 4, 2, 4, 2, 4, 2, 2],
  [4, 4, 4, 4, 3, 4, 4, 4, 4],
  [1, 1, 1, 3, 3, 3, 1, 1, 1],
  [0, 3, 0, 0, 3, 0, 1, 3, 1],
]
function Mini({ i }: { i: number }) {
  return (
    <span className="tm-mini" aria-hidden>
      {MINI[i % MINI.length]!.map((t, k) => (
        <i key={k} className={`tm-t${t}`} style={v({ '--k': k })} />
      ))}
    </span>
  )
}

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mb-10 max-w-3xl">
      <h2 className="tm-h2">{title}</h2>
      {tag && <div className="mt-4">{tag}</div>}
      {lead && <p className="tm-lead mt-4">{lead}</p>}
    </div>
  )
}

function PhotoArt({ label, className = '' }: PhotoArtProps) {
  return (
    <div className={`relative overflow-hidden bg-bg-2 ${className}`}>
      <Mosaic still slice cols={10} rows={7} className="h-full w-full" />
      <p className="absolute bottom-3 left-4 text-sm">{label}</p>
    </div>
  )
}

/** «Сейчас открыто · до 17:00» — считает островок по времени Ташкента; без JS виден график. */
function NowLine({ lead, locale, className = '' }: { lead: Lead; locale: Locale; className?: string }) {
  const s = lead.dental?.schedule
  if (!s) return null
  const ru = locale === 'ru'
  return (
    <p
      className={`tm-now ${className}`}
      data-now=""
      data-days={s.days.join(',')}
      data-open={s.open}
      data-close={s.close}
      data-t-open={ru ? 'Сейчас открыто · до {time}' : 'Hozir ochiq · {time} gacha'}
      data-t-closed={ru ? 'Сейчас закрыто · откроется {day} в\u00a0{time}' : 'Hozir yopiq · {day} soat {time} da ochiladi'}
      data-t-today={ru ? 'сегодня' : 'bugun'}
      data-t-tomorrow={ru ? 'завтра' : 'ertaga'}
      data-names={
        ru
          ? 'в воскресенье,в понедельник,во вторник,в среду,в четверг,в пятницу,в субботу'
          : 'yakshanba kuni,dushanba kuni,seshanba kuni,chorshanba kuni,payshanba kuni,juma kuni,shanba kuni'
      }
    >
      <i aria-hidden />
      <span data-o="now">{lead.hours ? tx(lead.hours, locale) : ''}</span>
    </p>
  )
}

function Hero({ lead, locale, langSwitch }: DentalHeroProps) {
  const ru = locale === 'ru'
  return (
    <header className="tm-hero">
      <div className="tm-top">
        <span>{tx(lead.district, locale)}</span>
        <span className="tm-lang">{langSwitch}</span>
      </div>
      <div className="tm-hero-grid">
        <div className="tm-panel">
          <Mosaic />
        </div>
        <div className="tm-hero-copy">
          <div className="tm-sign">
            <p className="tm-kicker">{kindLine(lead, locale)}</p>
            <h1 className="tm-name">
              <span>Chilonzor</span>
              <span className="tm-name-2">Dental Servis</span>
            </h1>
          </div>
          <p className="tm-statement">
            {ru ? (
              <>
                Клиника на Мукими, 12: лечение, протезирование, ортодонтия и <b>рентген в одном здании</b>. Ориентир цены — ещё до звонка.
              </>
            ) : (
              <>
                Muqimiy, 12-uydagi klinika: davolash, protezlash, ortodontiya va <b>rentgen bir binoda</b>. Taxminiy narx — qoʻngʻiroqdan oldin.
              </>
            )}
          </p>
          <NowLine lead={lead} locale={locale} />
          <div className="tm-cta">
            <a href="#vybor" className="btn btn-lg tm-btn-saffron">
              {ru ? 'Что вас беспокоит?' : 'Sizni nima bezovta qilyapti?'}
            </a>
            <a href={telHref(lead.phones[0]!)} className="btn btn-ghost btn-lg">
              <Phone aria-hidden className="size-5" strokeWidth={STROKE} />
              {formatPhone(lead.phones[0]!)}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

/** Месяцы рассрочки — ряд плиток, выкладываются по одной. */
function MonthTiles({ n }: { n: number }) {
  return (
    <span className="tm-mtiles" aria-hidden>
      {Array.from({ length: n }, (_, i) => (
        <i key={i} className={i % 3 === 2 ? 'tm-t3' : 'tm-t0'} style={v({ '--i': i })} />
      ))}
    </span>
  )
}

function Result({ c, index, lead, locale }: { c: DentalConcern; index: number; lead: Lead; locale: Locale }) {
  const k = copy.concern
  const label = tx(copy.labels[c.id], locale)
  const head = (
    <div className="flex items-start justify-between gap-3">
      <p className="tm-plaque-title">
        <span>{pad(index + 1)}</span> {label}
      </p>
      {c.example && c.id !== 'pain' && <ExampleTag locale={locale} />}
    </div>
  )
  if (c.id === 'pain')
    return (
      <div className="dc-panel tm-plaque" data-panel="pain">
        <div className="tm-plaque-in">
          {head}
          <p className="tm-calm">{tx(k.pain, locale)}</p>
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
      </div>
    )
  const p = c.price!
  return (
    <div className="dc-panel tm-plaque" data-panel={c.id}>
      <div className="tm-plaque-in">
        {head}
        <p className="tm-price">{priceRange(p.from, p.to, locale)}</p>
        {c.note && <p className="tm-note">{tx(c.note, locale)}</p>}
        <dl className="tm-facts-2">
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
          <div className="tm-plan">
            <fieldset className="dc-months">
              <legend className="tm-label">{tx(k.installment, locale)}</legend>
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
                <MonthTiles n={m} />
                <p className="tm-monthly">
                  ≈{NBSP}
                  {priceRange(monthly(p.from, m), monthly(p.to, m), locale)}
                  <span className="dc-per">{tx(k.perMonth, locale)}</span>
                </p>
              </div>
            ))}
            <p className="tm-small">{tx(k.installmentNote, locale)}</p>
          </div>
        )}
        <p className="tm-small">{tx(k.consult, locale)}</p>
        <a href="#zapis" className="btn btn-lg" data-book={c.id}>
          {tx(copy.bookConsult, locale)}
        </a>
      </div>
    </div>
  )
}

/** «Что вас беспокоит?» — шесть плиток смальты; выбранная переворачивается в кобальт. */
function Concern({ lead, locale }: DentalSectionProps) {
  const k = copy.concern
  const concerns = lead.dental!.concerns
  return (
    <section id="vybor" className="tm-sec">
      <div className="tm-wrap">
        <Heading title={tx(k.title, locale)} lead={tx(k.lead, locale)} />
        <div data-concern="" className="dc tm-pick">
          <fieldset className="dc-options tm-grid">
            <legend className="sr-only">{tx(k.title, locale)}</legend>
            {concerns.map((c, i) => (
              <label key={c.id} className="dc-opt">
                <input type="radio" name="dc-concern" value={c.id} data-label={tx(copy.labels[c.id], locale)} className="sr-only" />
                <span className="dc-card tm-opt">
                  <Mini i={i} />
                  <span className="tm-opt-n">{pad(i + 1)}</span>
                  <span className="dc-label tm-opt-label">{tx(copy.labels[c.id], locale)}</span>
                </span>
              </label>
            ))}
          </fieldset>
          <div className="dc-results tm-results" aria-live="polite">
            <div className="dc-empty tm-empty">
              <Mosaic still cols={9} rows={5} className="tm-empty-art" />
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

/** Адрес и «открыто сейчас» — сразу после подбора: клиника района, к ней приходят пешком. */
function Contacts({ lead, locale }: DentalSectionProps) {
  const ru = locale === 'ru'
  const street = lead.map.kind === 'street' ? `${tx(lead.map.street, locale)}, ${lead.map.house}` : tx(lead.address, locale)
  return (
    <section id="adres" className="tm-sec tm-sec-cobalt">
      <div className="tm-wrap tm-where">
        <div>
          <p className="tm-label">{ru ? 'Чиланзар · адрес' : 'Chilonzor · manzil'}</p>
          <h2 className="tm-street">{street}</h2>
          <p className="tm-where-p">{tx(lead.address, locale)}</p>
          <a href={lead.mapsUrl} target="_blank" rel="noopener" className="btn btn-lg tm-btn-saffron mt-6">
            <MapPin aria-hidden className="size-5" strokeWidth={STROKE} />
            {ui.openMaps[locale]}
          </a>
        </div>
        <dl className="tm-where-facts">
          <div>
            <dt className="tm-label">{tx(copy.contacts.hours, locale)}</dt>
            <dd>
              <NowLine lead={lead} locale={locale} className="tm-now-dark" />
              <p className="tm-where-p mt-2">
                {lead.hours ? tx(lead.hours, locale) : tx(copy.contacts.hoursUnknown, locale)}
                {lead.hours && (ru ? ' — по справочникам, уточняйте по телефону' : ' — maʼlumotnomalar boʻyicha, telefon orqali aniqlang')}
              </p>
            </dd>
          </div>
          <div>
            <dt className="tm-label">{ui.phones[locale]}</dt>
            <dd className="grid">
              {lead.phones.map((p) => (
                <a key={p} href={telHref(p)} className="tm-tel">
                  {formatPhone(p)}
                </a>
              ))}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

/** Что есть в клинике — список с её сайта chds.uz, плитками панно. */
const SERVICES: L10n[] = [
  { ru: 'Лечение зубов', uz: 'Tish davolash' },
  { ru: 'Хирургия', uz: 'Jarrohlik' },
  { ru: 'Протезирование', uz: 'Protezlash' },
  { ru: 'Ортодонтия', uz: 'Ortodontiya' },
  { ru: 'Детская стоматология', uz: 'Bolalar stomatologiyasi' },
  { ru: 'Рентген', uz: 'Rentgen' },
]
function Services({ locale }: DentalSectionProps) {
  const ru = locale === 'ru'
  return (
    <section className="tm-sec tm-sec-2">
      <div className="tm-wrap">
        <Heading title={ru ? 'Всё в одном здании' : 'Hammasi bir binoda'} lead={ru ? 'Направления — по сайту клиники chds.uz.' : 'Yoʻnalishlar — klinikaning chds.uz saytidan.'} />
        <ul className="tm-services">
          {SERVICES.map((s, i) => (
            <li key={s.ru} className={`tm-svc tm-svc-${i}`}>
              <span className="tm-svc-n">{pad(i + 1)}</span>
              <span className="tm-svc-t">{tx(s, locale)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Visit({ lead, locale }: DentalSectionProps) {
  return (
    <section id="vizit" className="tm-sec">
      <div className="tm-wrap">
        <Heading title={tx(copy.visit.title, locale)} lead={tx(copy.visit.lead, locale)} tag={<ExampleTag locale={locale} />} />
        <ol className="tm-steps">
          {visitSteps(lead, locale).map((s, i) => (
            <li key={s.title}>
              <span className={`tm-step-n tm-t${[0, 1, 0, 3][i]}`}>{i + 1}</span>
              <h3 className="tm-step-t">{s.title}</h3>
              <p className="tm-step-p">{s.text}</p>
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
    <section id="zapis" className="tm-sec tm-sec-deep">
      <div className="tm-wrap tm-booking">
        <div>
          <h2 className="tm-h2">{tx(b.title, locale)}</h2>
          <p className="tm-lead mt-4">{tx(b.lead, locale)}</p>
        </div>
        <div className="tm-plaque tm-form">
          <div className="tm-plaque-in">
            <BookingForm locale={locale} stroke={STROKE} />
          </div>
        </div>
      </div>
    </section>
  )
}

const dental: DentalSkin = {
  Hero,
  order: ['concern', 'contacts', 'visit', 'promos', 'booking'],
  Concern,
  Contacts,
  Visit,
  Promos: Services,
  Booking,
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  const ru = locale === 'ru'
  return (
    <div className="tm-hero tm-og relative h-[630px] w-[1200px] overflow-hidden">
      <div className="absolute top-0 left-0 h-[630px] w-[560px]">
        <Mosaic still slice cols={14} rows={16} className="tm-og-art" />
      </div>
      <div className="absolute top-[70px] left-[620px] w-[520px]">
        <p className="tm-kicker !text-[22px]">{kindLine(lead, locale)}</p>
        <p className="tm-name !text-[118px]">
          <span>Chilonzor</span>
          <span className="tm-name-2 !text-[46px]">Dental Servis</span>
        </p>
        <p className="tm-statement !mt-8 !text-[30px]">
          {ru ? 'Концепт сайта — что беспокоит, ориентир цены и «открыто сейчас»' : 'Sayt konsepti — nima bezovta qiladi, taxminiy narx va «hozir ochiq»'}
        </p>
        <p className="tm-og-addr">{ru ? 'Мукими, 12 · Пн–Пт 09:00–17:00' : 'Muqimiy, 12 · Du–Ju 09:00–17:00'}</p>
      </div>
    </div>
  )
}

export const tashkentMosaic: Direction = {
  id: 'tashkent-mosaic',
  fontClass: `${oswald.variable} ${interTight.variable}`,
  css,
  iconStroke: STROKE,
  themeColor: '#1f4fa0',
  fontFamilies: ['Oswald', 'Inter Tight'],
  heroFont: { family: 'Oswald', weight: 700, style: 'normal' },
  Heading,
  PhotoArt,
  Og,
  dental,
}

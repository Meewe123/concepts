import { AtSign, Coffee, Gamepad2, MapPin, Phone, Wifi } from 'lucide-react'
import type { ReactNode } from 'react'
import { ExampleTag } from '@/core/components/ExampleTag'
import { sourceCode, tektur } from '@/core/fonts'
import { formatPhone, instagramHref, telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { BookerRoot, BookingForm } from '@/niches/beauty/Booker'
import { copy, fmtDuration, fmtPrice, kindLine } from '@/niches/beauty/content'
import type { BeautyHeroProps, BeautySectionProps, BeautySkin } from '@/niches/beauty/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { css } from './style'

const STROKE = 1.75

/** Силуэты в профиль: седан, кроссовер, внедорожник, минивэн (viewBox 0 0 400 150, колёса на y=108). */
const BODIES: Record<string, { body: string; glass: string }> = {
  sedan: {
    body: 'M20 108 L26 86 Q32 76 52 73 L118 68 Q150 40 196 38 L250 38 Q282 40 312 66 L362 74 Q380 78 382 92 L384 108 Z',
    glass: 'M134 68 Q160 47 196 46 L244 46 Q268 48 292 66 Z',
  },
  crossover: {
    body: 'M20 108 L22 80 Q28 66 50 64 L108 60 Q140 30 190 28 L262 28 Q298 30 318 58 L364 66 Q382 70 384 86 L384 108 Z',
    glass: 'M124 60 Q150 36 190 36 L258 36 Q288 38 304 58 Z',
  },
  suv: {
    body: 'M20 108 L22 70 Q24 54 44 52 L96 50 L120 22 Q124 18 134 18 L300 18 Q314 18 322 30 L346 54 L370 58 Q384 62 384 78 L384 108 Z',
    glass: 'M110 50 L130 26 L300 26 Q308 26 314 34 L332 50 Z',
  },
  minivan: {
    body: 'M20 108 L22 74 Q24 58 44 52 L80 30 Q92 20 112 20 L330 20 Q350 20 360 36 L376 62 Q384 70 384 84 L384 108 Z',
    glass: 'M70 50 L94 30 Q100 26 112 26 L330 26 Q344 26 350 36 L364 54 Z',
  },
}

/** Чертёж машины с размерными линиями и выносками. cls — какой силуэт показан (остальные — для переключения классом). */
function Blueprint({ locale, only, className = '', still = false }: { locale: Locale; only?: string; className?: string; still?: boolean }) {
  const ru = locale === 'ru'
  const ids = only ? [only] : Object.keys(BODIES)
  return (
    <svg viewBox="-10 -20 430 190" className={`wc-car ${still ? 'wc-still' : ''} ${className}`} aria-hidden>
      <defs>
        <marker id={`wc-arr-${only ?? 'all'}`} viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="wc-arrow" />
        </marker>
      </defs>
      <path d="M0 130 H404" className="wc-ground" />
      {ids.map((id) => (
        <g key={id} data-cls={id}>
          <path d={BODIES[id]!.body} className="wc-line" pathLength={1} />
          <path d={BODIES[id]!.glass} className="wc-line wc-thin" pathLength={1} />
        </g>
      ))}
      <circle cx="95" cy="108" r="22" className="wc-line" pathLength={1} />
      <circle cx="95" cy="108" r="9" className="wc-line wc-thin" pathLength={1} />
      <circle cx="315" cy="108" r="22" className="wc-line" pathLength={1} />
      <circle cx="315" cy="108" r="9" className="wc-line wc-thin" pathLength={1} />
      <path d="M20 146 H384" className="wc-dim" markerStart={`url(#wc-arr-${only ?? 'all'})`} markerEnd={`url(#wc-arr-${only ?? 'all'})`} />
      <text x="202" y="160" textAnchor="middle" className="wc-dim-t">
        L
      </text>
      <path d="M398 18 V130" className="wc-dim" markerStart={`url(#wc-arr-${only ?? 'all'})`} markerEnd={`url(#wc-arr-${only ?? 'all'})`} />
      <text x="410" y="78" className="wc-dim-t">
        H
      </text>
      <g className="wc-callouts">
        <path d="M215 30 L232 -6 H286" className="wc-lead" />
        <text x="290" y="-2" className="wc-call">
          {ru ? '01 кузов' : '01 kuzov'}
        </text>
        <path d="M180 58 L150 -6 H96" className="wc-lead" />
        <text x="10" y="-2" className="wc-call">
          {ru ? '02 салон' : '02 salon'}
        </text>
        <path d="M95 108 L52 150" className="wc-lead" />
        <text x="-6" y="168" className="wc-call">
          {ru ? '03 диски' : '03 disklar'}
        </text>
      </g>
    </svg>
  )
}

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mb-8 max-w-3xl">
      <h2 className="wc-h2">{title}</h2>
      {tag && <div className="mt-3">{tag}</div>}
      {lead && <p className="mt-3 max-w-[46ch] text-lg text-ink-2">{lead}</p>}
    </div>
  )
}

function PhotoArt({ label, className = '' }: PhotoArtProps) {
  return (
    <div className={`wc-grid relative grid place-items-center ${className}`}>
      <Blueprint locale="ru" only="sedan" still className="w-4/5" />
      <p className="wc-mono absolute bottom-3 left-4 text-xs">{label}</p>
    </div>
  )
}

function Hero({ lead, locale, langSwitch }: BeautyHeroProps) {
  const ru = locale === 'ru'
  return (
    <header className="wc-hero">
      <div className="wc-top">
        <span className="wc-mono">{tx(lead.district, locale)}</span>
        <span className="wc-lang">{langSwitch}</span>
      </div>
      <div className="wc-hero-grid">
        <div>
          <p className="wc-mono wc-orange">{kindLine(lead, locale)}</p>
          <h1 className="wc-name">{lead.name}</h1>
          {lead.hours && <p className="wc-hours">{tx(lead.hours, locale)}</p>}
        </div>
        <div className="wc-grid wc-sheet">
          <span className="wc-sheet-tag wc-mono">{ru ? 'Лист 1 · мойка и уход' : '1-varaq · yuvish va parvarish'}</span>
          <Blueprint locale={locale} only="sedan" />
        </div>
        <div className="wc-cta">
          <a href="#vybor" className="btn btn-lg">
            {ru ? 'Рассчитать и записаться' : 'Hisoblash va yozilish'}
          </a>
          <a href={telHref(lead.phones[0]!)} className="btn btn-ghost btn-lg">
            <Phone aria-hidden className="size-5" strokeWidth={STROKE} />
            <span className="wc-mono">{formatPhone(lead.phones[0]!)}</span>
          </a>
        </div>
      </div>
      <div className="wc-hazard" aria-hidden />
    </header>
  )
}

/** Калькулятор: класс авто меняет чертёж, услуга — строка наряда, итог — цена, время и «готово к …». */
function Calculator({ lead, locale }: BeautySectionProps) {
  const b = lead.beauty!
  const k = copy.pick
  const ru = locale === 'ru'
  return (
    <section id="vybor" className="wc-sec">
      <div className="wc-wrap">
        <p className="wc-mono wc-eyebrow">{ru ? 'Наряд-заказ' : 'Buyurtma-naryad'}</p>
        <Heading title={ru ? 'Что делаем с машиной?' : 'Mashinaga nima qilamiz?'} lead={ru ? 'Класс авто и услуга — сразу видно цену, время работ и ближайшее свободное окно.' : 'Avtomobil klassi va xizmat — narx, ish vaqti va eng yaqin boʻsh vaqt darhol koʻrinadi.'} />
        <BookerRoot lead={lead} locale={locale} className="wc-booker">
          {b.variants && (
            <fieldset className="wc-classes">
              <legend className="wc-mono wc-label">{tx(b.variants.label, locale)}</legend>
              {b.variants.items.map((it, i) => (
                <label key={it.id}>
                  <input type="radio" name="bk-variant" value={it.id} defaultChecked={i === 0} className="sr-only" />
                  <span>{tx(it.name, locale)}</span>
                </label>
              ))}
            </fieldset>
          )}
          <div className="wc-grid wc-sheet wc-sheet-calc">
            <Blueprint locale={locale} still />
          </div>
          <fieldset className="wc-orders">
            <legend className="sr-only">{tx(k.title, locale)}</legend>
            {b.services.map((s, i) => (
              <label key={s.id} className="wc-order">
                <input type="radio" name="bk-service" value={s.id} className="sr-only" />
                <span className="wc-order-code">{`W-${String(i + 1).padStart(2, '0')}`}</span>
                <span className="wc-order-name">{tx(s.name, locale)}</span>
                <span className="wc-order-meta">
                  {fmtDuration(s.minutes, locale)} · {fmtPrice(s.price, s.from, locale)}
                </span>
              </label>
            ))}
          </fieldset>
          <div className="wc-ticket" data-o="result">
            <p className="wc-empty wc-mono">{tx(k.empty, locale)}</p>
            <div className="wc-ticket-body">
              <div className="flex items-center justify-between gap-3">
                <p className="wc-mono wc-label">{ru ? 'Итог по наряду' : 'Naryad boʻyicha jami'}</p>
                <ExampleTag locale={locale} large />
              </div>
              <p className="wc-ticket-title" data-o="name" />
              <dl className="wc-stats">
                <div>
                  <dt className="wc-mono wc-label">{tx(k.price, locale)}</dt>
                  <dd data-o="price" />
                </div>
                <div>
                  <dt className="wc-mono wc-label">{ru ? 'Время работ' : 'Ish vaqti'}</dt>
                  <dd data-o="duration" />
                </div>
              </dl>
              <div className="wc-gauge" aria-hidden>
                <span />
              </div>
              <p className="wc-mono wc-label">{tx(k.slots, locale)}</p>
              <div className="wc-slots" data-o="slots" role="radiogroup" aria-label={tx(k.slots, locale)} />
              <template data-tpl="slot">
                <label className="wc-slot">
                  <input type="radio" name="bk-slot" className="sr-only" />
                  <span data-f="day" className="wc-slot-day" />
                  <span data-f="time" className="wc-slot-time" />
                </label>
              </template>
              <p data-o="noslots" hidden className="wc-small">
                {tx(k.noSlots, locale)}
              </p>
              <p className="wc-until">
                {ru ? 'В работе' : 'Ishda'} <b data-o="until" />
              </p>
              <p className="wc-small">{tx(k.slotsDemo, locale)}</p>
              <a href="#zapis" data-o="cta" aria-disabled="true" className="btn btn-lg">
                <span data-o="cta-text">{tx(k.chooseSlot, locale)}</span>
              </a>
            </div>
          </div>
        </BookerRoot>
      </div>
    </section>
  )
}

/** Пока моем — кафе, компьютерный клуб и Wi-Fi (по отзывам гостей). */
function Lounge({ locale }: BeautySectionProps) {
  const ru = locale === 'ru'
  const items = [
    { icon: Coffee, t: ru ? 'Кафе' : 'Kafe', d: ru ? 'Кофе, пока машину моют' : 'Mashina yuvilayotganda qahva' },
    { icon: Gamepad2, t: ru ? 'Компьютерный клуб' : 'Kompyuter klubi', d: ru ? 'Партия, пока идёт детейлинг' : 'Deteyling paytida bir oʻyin' },
    { icon: Wifi, t: 'Wi-Fi', d: ru ? 'Можно поработать в ожидании' : 'Kutish paytida ishlash mumkin' },
  ]
  return (
    <section className="wc-sec wc-sec-dark" aria-labelledby="wc-lounge">
      <div className="wc-wrap">
        <p className="wc-mono wc-eyebrow">{ru ? 'Пока ждёте' : 'Kutayotganingizda'}</p>
        <h2 id="wc-lounge" className="wc-h2">
          {ru ? 'Пока моем — ' : 'Yuvayotganimizda — '}
          <span className="wc-orange">{ru ? 'кофе и игра' : 'qahva va oʻyin'}</span>
        </h2>
        <ul className="wc-lounge">
          {items.map((it, i) => (
            <li key={it.t}>
              <span className="wc-mono wc-orange">{`0${i + 1}`}</span>
              <it.icon aria-hidden className="size-8" strokeWidth={STROKE} />
              <p className="wc-lounge-t">{it.t}</p>
              <p className="text-[var(--wc-ink-2)]">{it.d}</p>
            </li>
          ))}
        </ul>
        <p className="wc-mono wc-small-d mt-6">{ru ? 'По отзывам гостей на Яндекс Картах.' : 'Yandex Xaritalardagi mehmonlar sharhlariga koʻra.'}</p>
      </div>
    </section>
  )
}

function Contacts({ lead, locale }: BeautySectionProps) {
  const ru = locale === 'ru'
  const rows: [string, ReactNode][] = [
    [ui.address[locale], tx(lead.address, locale)],
    ...(lead.landmark ? [[ru ? 'Ориентир' : 'Moʻljal', tx(lead.landmark, locale)] as [string, ReactNode]] : []),
    [tx(copy.hours, locale), lead.hours ? tx(lead.hours, locale) : tx(copy.hoursUnknown, locale)],
    [
      ui.phones[locale],
      <a key="t" href={telHref(lead.phones[0]!)} className="wc-mono text-xl underline underline-offset-4">
        {formatPhone(lead.phones[0]!)}
      </a>,
    ],
  ]
  if (lead.instagram)
    rows.push([
      'Instagram',
      <a key="ig" href={instagramHref(lead.instagram)} target="_blank" rel="noopener" className="inline-flex items-center gap-2 underline underline-offset-4">
        <AtSign aria-hidden className="size-4" strokeWidth={STROKE} />
        {lead.instagram}
      </a>,
    ])
  return (
    <section id="adres" className="wc-sec">
      <div className="wc-wrap">
        <p className="wc-mono wc-eyebrow">{ru ? 'Как заехать' : 'Qanday kelish mumkin'}</p>
        <Heading title={ru ? 'Адрес и график' : 'Manzil va ish vaqti'} />
        <dl className="wc-spec">
          {rows.map(([k, val]) => (
            <div key={k}>
              <dt className="wc-mono wc-label">{k}</dt>
              <dd>{val}</dd>
            </div>
          ))}
        </dl>
        <a href={lead.mapsUrl} target="_blank" rel="noopener" className="btn btn-lg mt-8">
          <MapPin aria-hidden className="size-5" strokeWidth={STROKE} />
          {ui.openMaps[locale]}
        </a>
      </div>
    </section>
  )
}

function Booking({ lead, locale }: BeautySectionProps) {
  const k = copy.booking
  return (
    <section id="zapis" className="wc-sec wc-sec-dark">
      <div className="wc-wrap wc-booking">
        <div>
          <p className="wc-mono wc-eyebrow">{locale === 'ru' ? 'Запись' : 'Yozilish'}</p>
          <h2 className="wc-h2">{tx(k.title, locale)}</h2>
          <p className="mt-3 max-w-[40ch] text-lg text-[var(--wc-ink-2)]">{tx(k.lead, locale)}</p>
        </div>
        <div className="wc-form">
          <BookingForm lead={lead} locale={locale} stroke={STROKE} />
        </div>
      </div>
    </section>
  )
}

const beauty: BeautySkin = {
  Hero,
  blocks: [Calculator, Lounge, Contacts, Booking],
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  return (
    <div className="wc-hero wc-og relative h-[630px] w-[1200px] overflow-hidden">
      <div className="absolute top-[80px] left-[72px] w-[580px]">
        <p className="wc-mono wc-orange !text-[24px]">{kindLine(lead, locale)}</p>
        <p className="wc-name !text-[96px]">{lead.name}</p>
        {lead.hours && <p className="wc-hours !text-[28px]">{tx(lead.hours, locale)}</p>}
        <p className="mt-8 max-w-[560px] text-[30px] leading-snug text-[var(--wc-ink-2)]">
          {locale === 'ru' ? 'Концепт сайта — цена и время по классу авто, запись на свободное окно' : 'Sayt konsepti — avto klassi boʻyicha narx va vaqt, boʻsh vaqtga yozilish'}
        </p>
      </div>
      <div className="absolute top-[170px] right-[50px] w-[470px]">
        <div className="wc-grid wc-sheet">
          <Blueprint locale={locale} only="sedan" still />
        </div>
      </div>
      <div className="wc-hazard absolute inset-x-0 bottom-0" aria-hidden />
    </div>
  )
}

export const workshopConcrete: Direction = {
  id: 'workshop-concrete',
  fontClass: `${tektur.variable} ${sourceCode.variable}`,
  css,
  iconStroke: STROKE,
  themeColor: '#1a1b1c',
  fontFamilies: ['Tektur', 'Source Code Pro'],
  heroFont: { family: 'Tektur', weight: 800, style: 'normal' },
  Heading,
  PhotoArt,
  Og,
  beauty,
}


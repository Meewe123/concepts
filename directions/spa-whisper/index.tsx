import { MapPin, Phone, Send } from 'lucide-react'
import type { ReactNode } from 'react'
import { ExampleTag } from '@/core/components/ExampleTag'
import { commissioner, spectralLight } from '@/core/fonts'
import { formatPhone, telegramHref, telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { BookerRoot, BookingForm } from '@/niches/beauty/Booker'
import { copy, fmtDuration, fmtPrice, kindLine } from '@/niches/beauty/content'
import type { BeautyHeroProps, BeautySectionProps, BeautySkin } from '@/niches/beauty/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { css } from './style'

const STROKE = 1.2

/** Дышащая сфера: мягкие слои и золотые кольца, медленный вдох и выдох (8 с). */
function Orb({ className = '', still = false, children }: { className?: string; still?: boolean; children?: ReactNode }) {
  return (
    <div className={`sw-orb ${still ? 'sw-still' : ''} ${className}`}>
      <span className="sw-orb-ring sw-r1" aria-hidden />
      <span className="sw-orb-ring sw-r2" aria-hidden />
      <span className="sw-orb-ring sw-r3" aria-hidden />
      <span className="sw-orb-core" aria-hidden />
      <div className="sw-orb-content">{children}</div>
    </div>
  )
}

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mb-10 max-w-3xl">
      <h2 className="sw-h2">{title}</h2>
      {tag && <div className="mt-3">{tag}</div>}
      {lead && <p className="sw-lead mt-4">{lead}</p>}
    </div>
  )
}

function PhotoArt({ label, className = '' }: PhotoArtProps) {
  return (
    <div className={`relative grid place-items-center overflow-hidden rounded-[2rem] bg-bg-2 ${className}`}>
      <Orb still className="w-1/2" />
      <p className="absolute bottom-4 text-sm">{label}</p>
    </div>
  )
}

function Hero({ lead, locale, langSwitch }: BeautyHeroProps) {
  const ru = locale === 'ru'
  return (
    <header className="sw-hero">
      <div className="sw-top">
        <span>{tx(lead.district, locale)}</span>
        <span className="sw-lang">{langSwitch}</span>
      </div>
      <div className="sw-hero-body">
        <Orb className="sw-orb-hero">
          <h1 className="sw-name">
            <span>Women</span>
            <span>Secret</span>
          </h1>
          <p className="sw-breath" aria-hidden>
            <span>{ru ? 'вдох' : 'nafas oling'}</span>
            <span>{ru ? 'выдох' : 'nafas chiqaring'}</span>
          </p>
        </Orb>
        <p className="sw-kind">{kindLine(lead, locale)}</p>
        <p className="sw-whisper">
          {ru ? 'Выберите ритуал и тихий час — без звонков и переписки.' : 'Marosim va sokin vaqtni tanlang — qoʻngʻiroq va yozishmalarsiz.'}
        </p>
        <div className="sw-cta">
          <a href="#zapis" className="btn btn-lg sw-btn-cream">
            {tx(copy.book, locale)}
          </a>
          <a href={telHref(lead.phones[0]!)} className="btn btn-lg sw-btn-line">
            <Phone aria-hidden className="size-5" strokeWidth={STROKE} />
            {formatPhone(lead.phones[0]!)}
          </a>
        </div>
      </div>
    </header>
  )
}

/** Ритуалы: список, кольцо длительности, тихие часы. */
function Rituals({ lead, locale }: BeautySectionProps) {
  const b = lead.beauty!
  const k = copy.pick
  const ru = locale === 'ru'
  return (
    <section id="vybor" className="sw-sec">
      <div className="sw-wrap">
        <p className="sw-caps">{ru ? 'Ритуалы' : 'Marosimlar'}</p>
        <Heading title={ru ? 'Выберите ритуал' : 'Marosimni tanlang'} lead={tx(k.lead, locale)} />
        <BookerRoot lead={lead} locale={locale} className="sw-booker">
          <fieldset className="sw-list">
            <legend className="sr-only">{tx(k.title, locale)}</legend>
            {b.services.map((s) => (
              <label key={s.id} className="sw-item" style={{ ['--m' as string]: s.minutes }}>
                <input type="radio" name="bk-service" value={s.id} className="sr-only" />
                <span className="sw-item-name">{tx(s.name, locale)}</span>
                <span className="sw-item-meta">
                  <i className="sw-item-arc" aria-hidden />
                  {fmtDuration(s.minutes, locale)} · {fmtPrice(s.price, s.from, locale)}
                </span>
              </label>
            ))}
          </fieldset>
          <div className="sw-card" data-o="result">
            <p className="sw-empty">{tx(k.empty, locale)}</p>
            <div className="sw-card-body">
              <div className="flex items-center justify-between gap-3">
                <p className="sw-caps">{ru ? 'Ваш ритуал' : 'Marosimingiz'}</p>
                <ExampleTag locale={locale} large />
              </div>
              <p className="sw-card-title" data-o="name" />
              <div className="sw-ring-row">
                <div className="sw-ring" aria-hidden>
                  <svg viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" className="sw-ring-bg" />
                    <circle cx="60" cy="60" r="52" className="sw-ring-fg" pathLength={180} />
                  </svg>
                </div>
                <dl>
                  <dt className="sw-caps">{tx(k.duration, locale)}</dt>
                  <dd className="sw-stat" data-o="duration" />
                  <dt className="sw-caps mt-3">{tx(k.price, locale)}</dt>
                  <dd className="sw-stat" data-o="price" />
                </dl>
              </div>
              <p className="sw-caps">{ru ? 'Тихие часы' : 'Sokin soatlar'}</p>
              <div className="sw-slots" data-o="slots" role="radiogroup" aria-label={tx(k.slots, locale)} />
              <template data-tpl="slot">
                <label className="sw-slot">
                  <input type="radio" name="bk-slot" className="sr-only" />
                  <span data-f="day" className="sw-slot-day" />
                  <span data-f="time" className="sw-slot-time" />
                </label>
              </template>
              <p data-o="noslots" hidden className="sw-small">
                {tx(k.noSlots, locale)}
              </p>
              <p className="sw-until">
                <span>{ru ? 'Вы с нами' : 'Biz bilan'}</span> <b data-o="until" />
              </p>
              <p className="sw-small">{tx(k.slotsDemo, locale)}</p>
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

/** «Пока ждёте — подышите»: вдох 4 секунды, выдох 4 секунды. */
function Breathe({ locale }: BeautySectionProps) {
  const ru = locale === 'ru'
  return (
    <section className="sw-sec sw-sec-dark" aria-label={ru ? 'Дыхательная пауза' : 'Nafas tanaffusi'}>
      <div className="sw-wrap sw-breathe">
        <Orb className="sw-orb-small">
          <p className="sw-breath sw-breath-big" aria-hidden>
            <span>{ru ? 'вдох' : 'nafas oling'}</span>
            <span>{ru ? 'выдох' : 'nafas chiqaring'}</span>
          </p>
        </Orb>
        <div>
          <h2 className="sw-h2">{ru ? 'Пока выбираете — подышите' : 'Tanlayotganda — nafas oling'}</h2>
          <p className="sw-lead mt-4">
            {ru ? 'Четыре секунды вдох, четыре — выдох. Сфера подскажет ритм.' : 'Toʻrt soniya nafas oling, toʻrt soniya chiqaring. Doira ritmni koʻrsatadi.'}
          </p>
        </div>
      </div>
    </section>
  )
}

function Place({ lead, locale }: BeautySectionProps) {
  const ru = locale === 'ru'
  return (
    <section id="adres" className="sw-sec sw-sec-2">
      <div className="sw-wrap">
        <p className="sw-caps">{ru ? 'Где нас найти' : 'Bizni qayerdan topasiz'}</p>
        <h2 className="sw-h2 sw-h2-sm">{tx(lead.address, locale)}</h2>
        <div className="sw-place">
          <div>
            <p className="sw-caps">{tx(copy.hours, locale)}</p>
            <p className="sw-place-v">{lead.hours ? tx(lead.hours, locale) : tx(copy.hoursUnknown, locale)}</p>
          </div>
          <div>
            <p className="sw-caps">{ui.phones[locale]}</p>
            <a href={telHref(lead.phones[0]!)} className="sw-place-tel">
              {formatPhone(lead.phones[0]!)}
            </a>
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
              Telegram
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

function Booking({ lead, locale }: BeautySectionProps) {
  const k = copy.booking
  return (
    <section id="zapis" className="sw-sec">
      <div className="sw-wrap sw-booking">
        <Heading title={tx(k.title, locale)} lead={tx(k.lead, locale)} />
        <div className="sw-form">
          <BookingForm lead={lead} locale={locale} stroke={STROKE} />
        </div>
      </div>
    </section>
  )
}

const beauty: BeautySkin = {
  Hero,
  blocks: [Rituals, Breathe, Place, Booking],
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  return (
    <div className="sw-hero sw-og relative h-[630px] w-[1200px] overflow-hidden">
      <div className="absolute top-[45px] right-[90px] w-[540px]">
        <Orb still>
          <p className="sw-name !text-[96px]">
            <span>Women</span>
            <span>Secret</span>
          </p>
        </Orb>
      </div>
      <div className="absolute top-[200px] left-[90px] w-[480px]">
        <p className="sw-caps !text-[20px] !text-[#e8e0d5]">{kindLine(lead, locale)}</p>
        <p className="sw-whisper !mt-6 !text-[44px] !leading-tight">
          {locale === 'ru' ? 'Выберите ритуал и тихий час — запись без звонков' : 'Marosim va sokin vaqtni tanlang — qoʻngʻiroqsiz yozilish'}
        </p>
      </div>
    </div>
  )
}

export const spaWhisper: Direction = {
  id: 'spa-whisper',
  fontClass: `${spectralLight.variable} ${commissioner.variable}`,
  css,
  iconStroke: STROKE,
  themeColor: '#64574a',
  fontFamilies: ['Spectral', 'Commissioner'],
  heroFont: { family: 'Spectral', weight: 200, style: 'italic' },
  Heading,
  PhotoArt,
  Og,
  beauty,
}

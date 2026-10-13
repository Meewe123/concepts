import { MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { ExampleTag } from '@/core/components/ExampleTag'
import { montserrat, unbounded } from '@/core/fonts'
import { formatPhone, telegramHref, telHref, whatsappHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { seeded } from '@/core/random'
import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { BookerRoot, BookingForm } from '@/niches/beauty/Booker'
import { copy, fmtDuration, fmtPrice, kindLine } from '@/niches/beauty/content'
import type { BeautyHeroProps, BeautySectionProps, BeautySkin } from '@/niches/beauty/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { css } from './style'

const STROKE = 2
const v = (o: Record<string, string | number>) => o as CSSProperties
const COLORS = ['var(--cf-coral)', 'var(--cf-sun)', 'var(--cf-mint)', 'var(--cf-lilac)', 'var(--cf-pink)', 'var(--cf-leaf)']

/** Конфетти-кусочки: кружок, полоска, треугольник, завиток. Раскладка детерминирована (seed). */
function Pieces({ seed, n, className = '', frame = false }: { seed: string; n: number; className?: string; frame?: boolean }) {
  const r = seeded(seed)
  const out: ReactNode[] = []
  // frame — конфетти по краям (верх, правый край, низ), чтобы не ложиться на текст
  const zones: (() => [number, number])[] = [
    () => [r() * 100, r() * 9],
    () => [86 + r() * 12, 8 + r() * 80],
    () => [r() * 100, 90 + r() * 9],
    () => [r() * 4, 12 + r() * 70],
  ]
  for (let i = 0; i < n; i++) {
    const [x, y]: [number, number] = frame ? zones[i % zones.length]!() : [r() * 100, r() * 100]
    const rot = Math.round(r() * 360)
    const kind = i % 4
    const color = COLORS[i % COLORS.length]!
    const s = 8 + r() * 9
    const style = v({ left: `${x.toFixed(1)}%`, top: `${y.toFixed(1)}%`, '--rot': `${rot}deg`, '--dur': `${(5 + r() * 5).toFixed(1)}s`, '--del': `${(-r() * 6).toFixed(1)}s`, color })
    out.push(
      <svg key={i} viewBox="0 0 20 20" className="cf-piece" style={{ ...style, width: s, height: s }} aria-hidden>
        {kind === 0 && <circle cx="10" cy="10" r="7" fill="currentColor" />}
        {kind === 1 && <rect x="2" y="7" width="16" height="6" rx="3" fill="currentColor" />}
        {kind === 2 && <path d="M10 3 L18 17 H2 Z" fill="currentColor" />}
        {kind === 3 && <path d="M2 12 q4 -8 8 0 t8 0" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />}
      </svg>,
    )
  }
  return <div className={`cf-pieces ${className}`}>{out}</div>
}

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mb-8 max-w-3xl">
      <h2 className="cf-h2">{title}</h2>
      {tag && <div className="mt-3">{tag}</div>}
      {lead && <p className="mt-3 max-w-[46ch] text-lg text-ink-2">{lead}</p>}
    </div>
  )
}

function PhotoArt({ label, className = '' }: PhotoArtProps) {
  return (
    <div className={`relative overflow-hidden rounded-[2rem] bg-surface ${className}`}>
      <Pieces seed="photo" n={18} />
      <p className="absolute bottom-4 left-5 text-sm font-semibold">{label}</p>
    </div>
  )
}

/** Первый экран: конфетти вокруг названия, от касания — взрыв конфетти. */
function Hero({ lead, locale, langSwitch }: BeautyHeroProps) {
  const ru = locale === 'ru'
  return (
    <header className="cf-hero" data-confetti="">
      <Pieces seed={lead.slug} n={30} frame className="cf-hero-pieces" />
      <div className="cf-top">
        <span>{tx(lead.district, locale)}</span>
        <span className="cf-lang">{langSwitch}</span>
      </div>
      <div className="cf-hero-body">
        <p className="cf-kicker">{kindLine(lead, locale)}</p>
        <h1 className="cf-name">
          {lead.name.split('').map((ch, i) => (
            <span key={i} style={v({ '--i': i })}>
              {ch}
            </span>
          ))}
        </h1>
        <p className="cf-promise">
          {ru ? (
            <>
              Выберите услугу и время — <mark>запись за полминуты</mark>, а конфетти за наш счёт.
            </>
          ) : (
            <>
              Xizmat va vaqtni tanlang — <mark>yarim daqiqada yozilish</mark>, konfetti esa bizdan.
            </>
          )}
        </p>
        <div className="cf-cta">
          <a href="#zapis" className="btn btn-lg">
            {tx(copy.book, locale)}
          </a>
          <a href={telHref(lead.phones[0]!)} className="btn btn-ghost btn-lg">
            <Phone aria-hidden className="size-5" strokeWidth={STROKE} />
            {ui.call[locale]}
          </a>
        </div>
        <p className="cf-tap" aria-hidden>
          {ru ? 'коснитесь фона — будет конфетти' : 'fonga teging — konfetti boʻladi'}
        </p>
      </div>
    </header>
  )
}

/** Подбор: услуги-конфетки, билет визита с круговой длительностью и окнами. */
function Picker({ lead, locale }: BeautySectionProps) {
  const b = lead.beauty!
  const k = copy.pick
  const ru = locale === 'ru'
  return (
    <section id="vybor" className="cf-sec">
      <div className="cf-wrap">
        <Heading title={ru ? 'Что делаем сегодня?' : 'Bugun nima qilamiz?'} lead={tx(k.lead, locale)} />
        <BookerRoot lead={lead} locale={locale} burst className="cf-booker">
          <fieldset className="cf-candies">
            <legend className="sr-only">{tx(k.title, locale)}</legend>
            {b.services.map((s, i) => (
              <label key={s.id} className="cf-candy" style={v({ '--c': COLORS[i % COLORS.length]! })}>
                <input type="radio" name="bk-service" value={s.id} className="sr-only" />
                <span className="cf-candy-dot" aria-hidden />
                <span className="cf-candy-name">{tx(s.name, locale)}</span>
                <span className="cf-candy-meta">{fmtDuration(s.minutes, locale)}</span>
              </label>
            ))}
          </fieldset>
          <div className="cf-ticket" data-o="result">
            <p className="cf-empty">{tx(k.empty, locale)}</p>
            <div className="cf-ticket-body">
              <div className="flex items-center justify-between gap-3">
                <p className="cf-label">{ru ? 'Ваш визит' : 'Tashrifingiz'}</p>
                <ExampleTag locale={locale} large />
              </div>
              <p className="cf-ticket-title" data-o="name" />
              <div className="cf-ticket-stats">
                <div className="cf-pie" aria-hidden>
                  <span />
                </div>
                <dl>
                  <dt className="cf-label">{tx(k.duration, locale)}</dt>
                  <dd className="cf-stat" data-o="duration" />
                  <dt className="cf-label mt-3">{tx(k.price, locale)}</dt>
                  <dd className="cf-stat" data-o="price" />
                </dl>
              </div>
              <p className="cf-label">{tx(k.slots, locale)}</p>
              <div className="cf-slots" data-o="slots" role="radiogroup" aria-label={tx(k.slots, locale)} />
              <template data-tpl="slot">
                <label className="cf-slot">
                  <input type="radio" name="bk-slot" className="sr-only" />
                  <span data-f="day" className="cf-slot-day" />
                  <span data-f="time" className="cf-slot-time" />
                </label>
              </template>
              <p data-o="noslots" hidden className="cf-small">
                {tx(k.noSlots, locale)}
              </p>
              <p className="cf-small">{tx(k.slotsDemo, locale)}</p>
              <div className="cf-cta-row">
                <p className="cf-sticker">
                  {ru ? 'Скидка за онлайн-бронь' : 'Onlayn bron uchun chegirma'}
                  <small>{ru ? 'размер уточнить' : 'miqdorini aniqlang'}</small>
                </p>
                <a href="#zapis" data-o="cta" aria-disabled="true" className="btn btn-lg">
                  <span data-o="cta-text">{tx(k.chooseSlot, locale)}</span>
                </a>
              </div>
            </div>
          </div>
        </BookerRoot>
      </div>
    </section>
  )
}

/** Адрес — как открытка-приглашение. */
function Invite({ lead, locale }: BeautySectionProps) {
  const ru = locale === 'ru'
  const phone = lead.phones[0]!
  return (
    <section id="adres" className="cf-sec cf-sec-2">
      <div className="cf-wrap">
        <div className="cf-invite">
          <Pieces seed={`${lead.slug}-invite`} n={18} frame className="cf-invite-pieces" />
          <p className="cf-label">{ru ? 'Приглашение' : 'Taklifnoma'}</p>
          <h2 className="cf-h2">{ru ? 'Ждём вас' : 'Sizni kutamiz'}</h2>
          <p className="cf-invite-addr">{tx(lead.address, locale)}</p>
          <p className="mt-2 text-ink-2">
            {tx(copy.hours, locale)}: {lead.hours ? tx(lead.hours, locale) : tx(copy.hoursUnknown, locale).toLowerCase()}
          </p>
          <a href={telHref(phone)} className="cf-invite-tel">
            {formatPhone(phone)}
          </a>
          <div className="cf-invite-actions">
            <a href={lead.mapsUrl} target="_blank" rel="noopener" className="btn">
              <MapPin aria-hidden className="size-5" strokeWidth={STROKE} />
              {ui.openMaps[locale]}
            </a>
            {lead.telegram && (
              <a href={telegramHref(lead.telegram)} target="_blank" rel="noopener" className="btn btn-ghost">
                <Send aria-hidden className="size-5" strokeWidth={STROKE} />
                Telegram
              </a>
            )}
            {lead.whatsapp && (
              <a href={whatsappHref(lead.whatsapp)} target="_blank" rel="noopener" className="btn btn-ghost">
                <MessageCircle aria-hidden className="size-5" strokeWidth={STROKE} />
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Booking({ lead, locale }: BeautySectionProps) {
  const k = copy.booking
  return (
    <section id="zapis" className="cf-sec">
      <div className="cf-wrap cf-booking">
        <Heading title={tx(k.title, locale)} lead={tx(k.lead, locale)} />
        <div className="cf-form-card">
          <BookingForm lead={lead} locale={locale} stroke={STROKE} />
        </div>
      </div>
    </section>
  )
}

const beauty: BeautySkin = {
  Hero,
  blocks: [Picker, Invite, Booking],
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  return (
    <div className="cf-hero cf-og relative h-[630px] w-[1200px] overflow-hidden">
      <Pieces seed={`${lead.slug}-og`} n={40} frame className="cf-hero-pieces cf-still" />
      <div className="absolute top-[150px] left-[90px] w-[1000px]">
        <p className="cf-kicker !text-[30px]">{kindLine(lead, locale)}</p>
        <p className="cf-name !mt-2 !text-[170px]">
          {lead.name.split('').map((ch, i) => (
            <span key={i} style={v({ '--i': i })}>
              {ch}
            </span>
          ))}
        </p>
        <p className="cf-promise !mt-6 !max-w-[860px] !text-[36px]">
          {locale === 'ru' ? (
            <>
              Концепт сайта — <mark>запись за полминуты</mark> и конфетти за выбор окна
            </>
          ) : (
            <>
              Sayt konsepti — <mark>yarim daqiqada yozilish</mark> va konfetti
            </>
          )}
        </p>
      </div>
    </div>
  )
}

export const confettiPop: Direction = {
  id: 'confetti-pop',
  fontClass: `${unbounded.variable} ${montserrat.variable}`,
  css,
  iconStroke: STROKE,
  themeColor: '#fbf6ee',
  fontFamilies: ['Unbounded', 'Montserrat'],
  heroFont: { family: 'Unbounded', weight: 800, style: 'normal' },
  Heading,
  PhotoArt,
  Og,
  beauty,
}

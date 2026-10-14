import { MapPin, Phone } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { mulish, notoSerifDisplay } from '@/core/fonts'
import { formatPhone, telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { tx } from '@/core/text'
import type { DentalConcernId, Lead, Locale } from '@/core/types'
import { ConcernPicker } from '@/niches/dental/ConcernPicker'
import { copy, kindLine } from '@/niches/dental/content'
import { BookingForm, visitSteps } from '@/niches/dental/sections'
import type { DentalHeroProps, DentalSectionProps, DentalSkin } from '@/niches/dental/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { DEFAULT_SHADE, SHADES } from './shades'
import { css } from './style'

const STROKE = 1.5
const v = (o: Record<string, string | number>) => o as CSSProperties

/**
 * Фарфоровый резец: тело с глазурью (радиальный градиент от белого к оттенку --shade),
 * прозрачный режущий край, блик, который медленно скользит, и кобальтовый ободок, как на тарелке.
 */
function Tooth({ className = '', still = false, id = 'ch' }: { className?: string; still?: boolean; id?: string }) {
  // моляр: коронка с двумя буграми и два корня — силуэт, который узнаётся сразу
  const body = 'M52 74 C52 38 82 24 106 32 C118 36 124 42 130 42 C136 42 142 36 154 32 C178 24 208 38 208 74 C208 112 200 142 194 170 C190 196 188 230 182 262 C178 288 164 300 154 290 C146 282 146 250 140 222 C137 208 134 200 130 200 C126 200 123 208 120 222 C114 250 114 282 106 290 C96 300 82 288 78 262 C72 230 70 196 66 170 C60 142 52 112 52 74 Z'
  return (
    <svg viewBox="0 0 260 330" className={`ch-tooth ${still ? 'ch-still' : ''} ${className}`} aria-hidden>
      <defs>
        <radialGradient id={`${id}-body`} cx="0.38" cy="0.34" r="0.85">
          <stop offset="0" className="ch-s0" />
          <stop offset="0.5" className="ch-s1" />
          <stop offset="1" className="ch-s2" />
        </radialGradient>
        <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.5" stopColor="#c4a978" stopOpacity="0" />
          <stop offset="1" stopColor="#c4a978" stopOpacity="0.4" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <path d={body} />
        </clipPath>
      </defs>
      <circle cx="130" cy="162" r="126" className="ch-ring" pathLength={1} />
      {Array.from({ length: 24 }, (_, i) => {
        const a = (i / 24) * Math.PI * 2
        return <circle key={i} cx={+(130 + Math.cos(a) * 126).toFixed(1)} cy={+(162 + Math.sin(a) * 126).toFixed(1)} r="2.2" className="ch-dot" style={v({ '--i': i })} />
      })}
      <ellipse cx="130" cy="312" rx="70" ry="8" className="ch-shadow" />
      <g className="ch-float">
        <g transform="translate(130 166) scale(0.86) translate(-130 -164)">
          <path d={body} fill={`url(#${id}-body)`} />
          <path d={body} fill={`url(#${id}-edge)`} />
          <g clipPath={`url(#${id}-clip)`}>
            <ellipse cx="88" cy="96" rx="15" ry="52" className="ch-shine" />
            <path d="M108 46 C118 62 142 62 152 46" className="ch-groove" />
          </g>
          <path d={body} className="ch-outline" />
        </g>
      </g>
    </svg>
  )
}

/** Веер шкалы оттенков: радиокнопки, выбранный образец красит зуб через :has() — без JS. */
function ShadeFan({ locale }: { locale: Locale }) {
  return (
    <fieldset className="ch-fan">
      <legend className="sr-only">{locale === 'ru' ? 'Шкала оттенков' : 'Rang shkalasi'}</legend>
      {SHADES.map((s, i) => (
        <label key={s.id} className="ch-tab" style={v({ '--i': i, '--n': SHADES.length, '--c': s.c })}>
          <input type="radio" name="ch-shade" value={s.id} defaultChecked={s.id === DEFAULT_SHADE} className="sr-only" />
          <span className="ch-tab-tooth" />
          <span className="ch-tab-stem">{s.id}</span>
        </label>
      ))}
    </fieldset>
  )
}

/** «Сейчас открыто · до 20:00» — островок ниши dental, время Ташкента. */
function NowLine({ lead, locale, className = '' }: { lead: Lead; locale: Locale; className?: string }) {
  const s = lead.dental?.schedule
  if (!s) return null
  const ru = locale === 'ru'
  return (
    <p
      className={`ch-now ${className}`}
      data-now=""
      data-days={s.days.join(',')}
      data-open={s.open}
      data-close={s.close}
      data-t-open={ru ? 'Сейчас открыто · до {time}' : 'Hozir ochiq · {time} gacha'}
      data-t-closed={ru ? 'Сейчас закрыто · откроется {day} в {time}' : 'Hozir yopiq · {day} soat {time} da ochiladi'}
      data-t-today={ru ? 'сегодня' : 'bugun'}
      data-t-tomorrow={ru ? 'завтра' : 'ertaga'}
      data-names={ru ? 'в воскресенье,в понедельник,во вторник,в среду,в четверг,в пятницу,в субботу' : 'yakshanba kuni,dushanba kuni,seshanba kuni,chorshanba kuni,payshanba kuni,juma kuni,shanba kuni'}
    >
      <i aria-hidden />
      <span data-o="now">{tx(lead.hours!, locale)}</span>
    </p>
  )
}

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mb-10 max-w-3xl">
      <h2 className="ch-h2">{title}</h2>
      {tag && <div className="mt-3">{tag}</div>}
      {lead && <p className="ch-lead mt-4">{lead}</p>}
    </div>
  )
}

function PhotoArt({ label, className = '' }: PhotoArtProps) {
  return (
    <div className={`relative grid place-items-center bg-bg-2 ${className}`} style={v({ '--shade': '#efe2c4' })}>
      <Tooth still id="ch-pa" className="w-1/3" />
      <p className="absolute bottom-3 left-4 text-sm">{label}</p>
    </div>
  )
}

function Hero({ lead, locale, langSwitch }: DentalHeroProps) {
  const ru = locale === 'ru'
  return (
    <header className="ch-hero">
      <div className="ch-top">
        <span>{tx(lead.district, locale)}</span>
        <span className="ch-lang">{langSwitch}</span>
      </div>
      <div className="ch-hero-grid">
        <div className="ch-sign">
          <p className="ch-kicker">{kindLine(lead, locale)}</p>
          <h1 className="ch-name">
            {lead.name}
            <span className="ch-name-dot" aria-hidden>
              .
            </span>
          </h1>
          <p className="ch-tagline">{ru ? 'Керамика, которую не отличить от своих зубов' : 'Oʻz tishingizdan ajratib boʻlmaydigan keramika'}</p>
        </div>
        <div className="ch-stage">
          <Tooth />
          <ShadeFan locale={locale} />
          <p className="ch-shade-now" aria-live="polite">
            {ru ? 'Оттенок' : 'Rang'}{' '}
            {SHADES.map((s) => (
              <b key={s.id} data-s={s.id}>
                {s.id}
              </b>
            ))}
            <span>{ru ? ' — нажмите на образец' : ' — namunani bosing'}</span>
          </p>
        </div>
        <div className="ch-hero-copy">
          <p className="ch-statement">
            {ru
              ? 'Цвет коронки и винира подбирают по шкале оттенков — попробуйте сами. Ниже — ориентир цены, число визитов и срок по вашему вопросу.'
              : 'Toj va vinir rangi rang shkalasi boʻyicha tanlanadi — oʻzingiz sinab koʻring. Pastda — savolingiz boʻyicha taxminiy narx, tashriflar soni va muddat.'}
          </p>
          <div className="ch-cta">
            <a href="#vybor" className="btn btn-lg">
              {ru ? 'Узнать ориентир цены' : 'Taxminiy narxni bilish'}
            </a>
            <a href={telHref(lead.phones[0]!)} className="btn btn-ghost btn-lg">
              <Phone aria-hidden className="size-5" strokeWidth={STROKE} />
              {formatPhone(lead.phones[0]!)}
            </a>
          </div>
          <NowLine lead={lead} locale={locale} />
        </div>
      </div>
    </header>
  )
}

/** Тонкие кобальтовые значки вариантов — как роспись на фарфоре. */
const TOOTH = 'M8 4.5 C10 3.6 14 3.6 16 4.5 C17.6 8 17.2 12.5 16.3 15.6 C15.6 18 14.9 20 14 20 C13 20 13 16.6 12 16.6 C11 16.6 11 20 10 20 C9.1 20 8.4 18 7.7 15.6 C6.8 12.5 6.4 8 8 4.5 Z'
const MARKS: Record<DentalConcernId, ReactNode> = {
  pain: (
    <>
      <path d={TOOTH} />
      <path d="M19.5 3.5 l-1.6 2.6 h2 l-1.6 2.6" />
    </>
  ),
  filling: (
    <>
      <path d={TOOTH} />
      <circle cx="12" cy="9" r="2" className="ch-mark-fill" />
    </>
  ),
  hygiene: (
    <>
      <path d={TOOTH} />
      <path d="M19 2.5 v4 M17 4.5 h4" />
    </>
  ),
  whitening: (
    <>
      <path d={TOOTH} />
      <path d="M3 4 l1.5 1 M2.5 9 h2 M19.5 9 h2 M21 4 l-1.5 1" />
    </>
  ),
  braces: (
    <>
      <path d={TOOTH} />
      <path d="M4 10 h16" />
      <rect x="10.2" y="8.6" width="3.6" height="2.8" rx="0.6" className="ch-mark-fill" />
    </>
  ),
  implant: (
    <>
      <path d="M8 4 C10 3.2 14 3.2 16 4 C16.8 6.2 16.4 8.4 15.6 9.6 H8.4 C7.6 8.4 7.2 6.2 8 4 Z" />
      <path d="M9.4 11.2 h5.2 M9.8 13.6 h4.4 M10.2 16 h3.6 M10.8 18.4 h2.4 M12 9.6 v11" />
    </>
  ),
}

function OptionMark({ id }: { id: DentalConcernId; index: number }) {
  return (
    <svg viewBox="0 0 24 24" className="ch-mark" aria-hidden>
      {MARKS[id]}
    </svg>
  )
}

function Concern({ lead, locale }: DentalSectionProps) {
  const ru = locale === 'ru'
  return (
    <section id="vybor" className="ch-sec">
      <div className="ch-wrap">
        <p className="ch-eyebrow">{ru ? 'Ориентир за минуту' : 'Bir daqiqada taxminiy narx'}</p>
        <Heading title={tx(copy.concern.title, locale)} lead={tx(copy.concern.lead, locale)} />
        <ConcernPicker lead={lead} locale={locale} dir={chinni} />
        <p className="ch-small mt-6">{tx(copy.concern.share, locale)}</p>
      </div>
    </section>
  )
}

const ROMAN = ['I', 'II', 'III', 'IV']

function Visit({ lead, locale }: DentalSectionProps) {
  const ru = locale === 'ru'
  return (
    <section id="vizit" className="ch-sec ch-sec-2">
      <div className="ch-wrap ch-visit">
        <div>
          <p className="ch-eyebrow">{ru ? 'Первый визит' : 'Birinchi tashrif'}</p>
          <Heading title={tx(copy.visit.title, locale)} lead={tx(copy.visit.lead, locale)} />
        </div>
        <ol className="ch-steps">
          {visitSteps(lead, locale).map((s, i) => (
            <li key={s.title} style={v({ '--i': i })}>
              <span className="ch-roman">{ROMAN[i]}</span>
              <div>
                <h3 className="ch-step-t">{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Booking({ lead, locale }: DentalSectionProps) {
  const ru = locale === 'ru'
  const b = copy.booking
  return (
    <section id="zapis" className="ch-sec">
      <div className="ch-wrap ch-booking">
        <div>
          <p className="ch-eyebrow">{ru ? 'Запись' : 'Yozilish'}</p>
          <Heading title={tx(b.title, locale)} lead={ru ? 'Что беспокоит, уже отмечено, если вы выбрали выше. Заявка придёт администратору в Telegram — он перезвонит и подберёт время.' : 'Yuqorida tanlagan boʻlsangiz, nima bezovta qilayotgani belgilangan. Ariza administratorga Telegramga keladi — u qoʻngʻiroq qilib, vaqt tanlaydi.'} />
        </div>
        <div className="ch-form">
          <BookingForm locale={locale} stroke={STROKE} />
        </div>
      </div>
    </section>
  )
}

function Contacts({ lead, locale }: DentalSectionProps) {
  const c = copy.contacts
  return (
    <section id="adres" className="ch-sec ch-sec-2">
      <div className="ch-wrap ch-where">
        <div>
          <p className="ch-eyebrow">{ui.address[locale]}</p>
          <p className="ch-address">{tx(lead.address, locale)}</p>
          <a href={lead.mapsUrl} target="_blank" rel="noopener" className="btn btn-lg mt-6">
            <MapPin aria-hidden className="size-5" strokeWidth={STROKE} />
            {ui.openMaps[locale]}
          </a>
        </div>
        <dl className="ch-facts">
          <div>
            <dt>{tx(c.hours, locale)}</dt>
            <dd>
              {lead.hours ? tx(lead.hours, locale) : tx(c.hoursUnknown, locale)}
              <NowLine lead={lead} locale={locale} className="mt-2" />
            </dd>
          </div>
          <div>
            <dt>{ui.phones[locale]}</dt>
            <dd>
              <a href={telHref(lead.phones[0]!)} className="ch-tel">
                {formatPhone(lead.phones[0]!)}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

const dental: DentalSkin = {
  Hero,
  order: ['concern', 'visit', 'booking', 'contacts'],
  OptionMark,
  Concern,
  Visit,
  Booking,
  Contacts,
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  return (
    <div className="ch-hero ch-og relative h-[630px] w-[1200px] overflow-hidden" style={v({ '--shade': '#efe2c4' })}>
      <div className="absolute top-[90px] left-[90px] w-[660px]">
        <p className="ch-kicker !text-[22px]">{kindLine(lead, locale)}</p>
        <p className="ch-name !text-[180px]">
          {lead.name}
          <span className="ch-name-dot">.</span>
        </p>
        <p className="ch-statement !mt-6 !max-w-[600px] !text-[30px]">{locale === 'ru' ? 'Концепт сайта: шкала оттенков, ориентир цены, визиты и срок' : 'Sayt konsepti: rang shkalasi, taxminiy narx, tashriflar va muddat'}</p>
      </div>
      <div className="absolute top-[80px] right-[70px] w-[370px]">
        <Tooth still id="ch-og" />
      </div>
    </div>
  )
}

export const chinni: Direction = {
  id: 'chinni',
  fontClass: `${notoSerifDisplay.variable} ${mulish.variable}`,
  css,
  iconStroke: STROKE,
  themeColor: '#fbfaf7',
  fontFamilies: ['Noto Serif Display', 'Mulish'],
  heroFont: { family: 'Noto Serif Display', weight: 300, style: 'normal' },
  Heading,
  PhotoArt,
  Og,
  dental,
}

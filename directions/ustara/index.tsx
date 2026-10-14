import { MapPin, Phone } from 'lucide-react'
import type { CSSProperties } from 'react'
import { ExampleTag } from '@/core/components/ExampleTag'
import { inter, playfair } from '@/core/fonts'
import { formatPhone, telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { BookerRoot, BookingForm } from '@/niches/beauty/Booker'
import { copy, fmtDuration, fmtPrice, kindLine } from '@/niches/beauty/content'
import type { BeautyHeroProps, BeautySectionProps, BeautySkin } from '@/niches/beauty/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { css } from './style'

const STROKE = 1.5
const v = (o: Record<string, string | number>) => o as CSSProperties

/**
 * Опасная бритва: рукоять с латунными штифтами и лезвие на шарнире (330, 92).
 * Лезвие раскрывается при загрузке (поворот вокруг шарнира), по стали пробегает блик.
 */
function Razor({ className = '', still = false, id = 'us' }: { className?: string; still?: boolean; id?: string }) {
  // хвостовик с насечками, плечо и полотно с прямым обухом, параллельной кромкой и круглым носком
  const blade = 'M322 86 C330 79 342 80 352 81 L398 78 L404 70 L598 64 C616 64 627 76 627 90 C627 104 616 116 598 116 L404 114 L398 106 L352 103 C342 104 330 105 322 98 Z'
  return (
    <svg viewBox="0 0 640 170" className={`us-razor ${still ? 'us-still' : ''} ${className}`} aria-hidden>
      <defs>
        <linearGradient id={`${id}-steel`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4f4f2" />
          <stop offset="0.45" stopColor="#b9bbbd" />
          <stop offset="0.7" stopColor="#8e9194" />
          <stop offset="1" stopColor="#e2e3e4" />
        </linearGradient>
        <clipPath id={`${id}-blade`}>
          <path d={blade} />
        </clipPath>
      </defs>
      {/* тень */}
      <ellipse cx="330" cy="150" rx="300" ry="8" className="us-shadow" />
      {/* рукоять */}
      <path d="M26 96 C26 80 60 71 112 69 L316 73 C330 74 340 83 340 92 C340 101 330 110 316 111 L112 115 C60 113 26 108 26 96 Z" className="us-handle" />
      <path d="M60 86 C90 80 160 78 310 81" className="us-handle-hi" />
      <circle cx="54" cy="92" r="5.5" className="us-pin" />
      {/* лезвие */}
      <g className="us-blade">
        <path d={blade} fill={`url(#${id}-steel)`} className="us-steel" />
        <g clipPath={`url(#${id}-blade)`}>
          <rect x="-120" y="40" width="54" height="110" className="us-gleam" transform="skewX(-24)" />
        </g>
        <path d="M406 70 L598 64" className="us-spine" />
        <path d="M410 99 C480 100 560 101 606 100" className="us-grind" />
        <path d="M404 114 L598 116" className="us-edge" />
        <path d="M356 82 v5 M364 81.5 v5 M372 81 v5 M380 80.5 v5 M388 80 v5" className="us-jimps" />
      </g>
      <circle cx="330" cy="92" r="7" className="us-pin" />
    </svg>
  )
}

/** Название, «разрезанное» лезвием: две половины расходятся после росчерка. */
function Word({ name, className = '' }: { name: string; className?: string }) {
  return (
    <span className={`us-word ${className}`}>
      <span className="sr-only">{name}</span>
      <span className="us-sl us-sl-a" aria-hidden>
        {name}
      </span>
      <span className="us-sl us-sl-b" aria-hidden>
        {name}
      </span>
      <span className="us-cut" aria-hidden />
    </span>
  )
}

/** Лента барбер-шеста: полосы бегут, как на вращающемся шесте. */
function Pole({ className = '' }: { className?: string }) {
  return (
    <div className={`us-pole ${className}`} aria-hidden>
      <i />
    </div>
  )
}

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mb-10 max-w-3xl">
      <h2 className="us-h2">{title}</h2>
      {tag && <div className="mt-3">{tag}</div>}
      {lead && <p className="us-lead mt-4">{lead}</p>}
    </div>
  )
}

function PhotoArt({ label, className = '' }: PhotoArtProps) {
  return (
    <div className={`relative grid place-items-center bg-bg-2 ${className}`}>
      <Razor still id="us-pa" className="w-4/5" />
      <p className="absolute bottom-3 left-4 text-sm">{label}</p>
    </div>
  )
}

function Hero({ lead, locale, langSwitch }: BeautyHeroProps) {
  const ru = locale === 'ru'
  return (
    <header className="us-hero us-red">
      <div className="us-top">
        <span>{tx(lead.district, locale)}</span>
        <span className="us-lang">{langSwitch}</span>
      </div>
      <div className="us-hero-in">
        <p className="us-kicker">{kindLine(lead, locale)}</p>
        <h1 className="us-h1">
          <Word name={lead.name} />
        </h1>
        <Razor className="us-hero-razor" />
        <div className="us-hero-copy">
          <p className="us-statement">
            {ru
              ? 'Стрижка, борода и бритьё опасной бритвой. Мастер, время и цена — за полминуты, без звонка и переписки.'
              : 'Soch turmagi, soqol va ustara bilan soqol olish. Usta, vaqt va narx — yarim daqiqada, qoʻngʻiroq va yozishmasiz.'}
          </p>
          <div className="us-cta">
            <a href="#vybor" className="btn btn-lg">
              {ru ? 'Выбрать мастера и время' : 'Usta va vaqtni tanlash'}
            </a>
            <a href={telHref(lead.phones[0]!)} className="btn btn-ghost btn-lg">
              <Phone aria-hidden className="size-5" strokeWidth={STROKE} />
              {formatPhone(lead.phones[0]!)}
            </a>
          </div>
          {lead.hours && <p className="us-hours">{tx(lead.hours, locale)}</p>}
        </div>
      </div>
      <Pole />
    </header>
  )
}

/** Сигнатура: мастер → услуга → окно. Цена пересчитывается по мастеру (вариант k). */
function Pick({ lead, locale }: BeautySectionProps) {
  const b = lead.beauty!
  const k = copy.pick
  const ru = locale === 'ru'
  const base = b.services[0]!
  return (
    <section id="vybor" className="us-sec">
      <div className="us-wrap">
        <p className="us-eyebrow">{ru ? 'Запись онлайн' : 'Onlayn yozilish'}</p>
        <Heading
          title={ru ? 'Мастер, услуга, окно' : 'Usta, xizmat, vaqt'}
          lead={ru ? 'Цена зависит от мастера и пересчитывается сразу; свободные окна — от текущего времени.' : 'Narx ustaga bogʻliq va darhol qayta hisoblanadi; boʻsh vaqtlar — hozirgi vaqtdan.'}
        />
        <BookerRoot lead={lead} locale={locale} className="us-booker">
          {b.variants && (
            <fieldset className="us-masters">
              <legend className="us-step">
                <span>1</span>
                {tx(b.variants.label, locale)}
              </legend>
              <div className="us-masters-row">
                {b.variants.items.map((m, i) => {
                  const [name, role] = tx(m.name, locale).split(' · ')
                  return (
                    <label key={m.id} className="us-master">
                      <input type="radio" name="bk-variant" value={m.id} defaultChecked={i === 0} className="sr-only" />
                      <span className="us-master-card">
                        <span className="us-mono" aria-hidden>
                          {name!.charAt(0)}
                        </span>
                        <span className="us-master-name">{name}</span>
                        <span className="us-master-role">{role}</span>
                        <span className="us-master-price">
                          <b>{fmtPrice(Math.round((base.price * m.k) / 5000) * 5000, false, locale)}</b> {tx(base.name, locale).toLowerCase()}
                        </span>
                      </span>
                    </label>
                  )
                })}
              </div>
            </fieldset>
          )}
          <fieldset className="us-services">
            <legend className="us-step">
              <span>2</span>
              {ru ? 'Услуга' : 'Xizmat'}
            </legend>
            {b.services.map((s, i) => (
              <label key={s.id} className="us-svc" style={v({ '--i': i })}>
                <input type="radio" name="bk-service" value={s.id} className="sr-only" />
                <span className="us-svc-name">
                  {tx(s.name, locale)}
                  {s.note && <small>{tx(s.note, locale)}</small>}
                </span>
                <span className="us-svc-meta">
                  {fmtDuration(s.minutes, locale)}
                  <b>{fmtPrice(s.price, true, locale)}</b>
                </span>
              </label>
            ))}
          </fieldset>
          <div className="us-ticket" data-o="result">
            <p className="us-step">
              <span>3</span>
              {ru ? 'Окно' : 'Vaqt'}
            </p>
            <p className="us-empty">{tx(k.empty, locale)}</p>
            <div className="us-ticket-body">
              <div className="flex items-start justify-between gap-3">
                <p className="us-ticket-title" data-o="name" />
                <ExampleTag locale={locale} />
              </div>
              <dl className="us-stats">
                <div>
                  <dt>{tx(k.price, locale)}</dt>
                  <dd data-o="price" />
                </div>
                <div>
                  <dt>{tx(k.duration, locale)}</dt>
                  <dd data-o="duration" />
                </div>
              </dl>
              <div className="us-len" aria-hidden>
                <span />
              </div>
              <p className="us-label">{tx(k.slots, locale)}</p>
              <div className="us-slots" data-o="slots" role="radiogroup" aria-label={tx(k.slots, locale)} />
              <template data-tpl="slot">
                <label className="us-slot">
                  <input type="radio" name="bk-slot" className="sr-only" />
                  <span data-f="day" className="us-slot-day" />
                  <span data-f="time" className="us-slot-time" />
                </label>
              </template>
              <p data-o="noslots" hidden className="us-small">
                {tx(k.noSlots, locale)}
              </p>
              <p className="us-until">
                {ru ? 'В кресле' : 'Kresloda'} <b data-o="until" />
              </p>
              <a href="#zapis" data-o="cta" aria-disabled="true" className="btn btn-lg">
                <span data-o="cta-text">{tx(k.chooseSlot, locale)}</span>
              </a>
              <p className="us-small">{tx(k.slotsDemo, locale)}</p>
            </div>
          </div>
        </BookerRoot>
      </div>
    </section>
  )
}

/** Иконки шагов бритья — тонкой линией, как гравюра на коробке бритвы. */
const ICONS: Record<string, string> = {
  towel: 'M14 34 h36 v14 h-36 z M14 41 h36 M20 26 c-3-4 3-6 0-10 M32 26 c-3-4 3-6 0-10 M44 26 c-3-4 3-6 0-10',
  brush: 'M24 12 h16 l-2 14 h-12 z M26 26 h12 v6 h-12 z M28 32 h8 l2 20 h-12 z',
  blade: 'M8 38 l26-2 v-6 l22-1 c4 0 5 4 4 7 l-3 8 c-1 2-3 2-5 2 l-18-1 v-4 l-26-1 z',
  balm: 'M26 12 h12 v8 h-12 z M22 20 h20 c2 0 4 2 4 4 v26 c0 2-2 4-4 4 h-20 c-2 0-4-2-4-4 v-26 c0-2 2-4 4-4 z M18 34 h28',
}

function Ritual({ locale }: BeautySectionProps) {
  const ru = locale === 'ru'
  const steps = ru
    ? [
        ['towel', 'Горячее полотенце', 'Две минуты пара — кожа мягкая, волос податливый.'],
        ['brush', 'Пена кисточкой', 'Масло под пену, взбиваем помазком прямо на лице.'],
        ['blade', 'Бритва в два прохода', 'По росту и против — без спешки, натянув кожу.'],
        ['balm', 'Холод и бальзам', 'Холодное полотенце закрывает поры, бальзам снимает раздражение.'],
      ]
    : [
        ['towel', 'Issiq sochiq', 'Ikki daqiqa bugʻ — teri yumshaydi, tuk boʻshashadi.'],
        ['brush', 'Moʻyqalam bilan koʻpik', 'Koʻpik ostidan moy, koʻpikni yuzning oʻzida koʻpirtiramiz.'],
        ['blade', 'Ustara bilan ikki marta', 'Tuk yoʻnalishi boʻyicha va unga qarshi — shoshilmasdan, terini tortib.'],
        ['balm', 'Sovuq sochiq va balzam', 'Sovuq sochiq teshiklarni yopadi, balzam qizarishni ketkazadi.'],
      ]
  return (
    <section className="us-sec us-ink" aria-labelledby="us-ritual">
      <div className="us-wrap">
        <p className="us-eyebrow">{ru ? 'Королевское бритьё · 45 минут' : 'Qirollik usulida soqol · 45 daqiqa'}</p>
        <h2 id="us-ritual" className="us-h2">
          {ru ? 'Четыре шага ' : 'Toʻrt qadam '}
          <span className="us-red-t">{ru ? 'до гладкой кожи' : 'silliq terigacha'}</span>
        </h2>
        <ol className="us-ritual">
          {steps.map(([icon, t, d], i) => (
            <li key={icon} style={v({ '--i': i })}>
              <span className="us-ritual-n">{String(i + 1).padStart(2, '0')}</span>
              <svg viewBox="0 0 64 64" className="us-ritual-i" aria-hidden>
                <path d={ICONS[icon!]} />
              </svg>
              <h3 className="us-ritual-t">{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Booking({ lead, locale }: BeautySectionProps) {
  const ru = locale === 'ru'
  const k = copy.booking
  return (
    <section id="zapis" className="us-sec us-sec-2">
      <div className="us-wrap us-booking">
        <div>
          <p className="us-eyebrow">{tx(k.title, locale)}</p>
          <h2 className="us-h2">{ru ? 'Оставьте имя — остальное уже в заявке' : 'Ismingizni qoldiring — qolgani arizada'}</h2>
          <p className="us-lead mt-4">{ru ? 'Мастер, услуга и время подставятся сами. Заявка придёт администратору в Telegram — он подтвердит запись.' : 'Usta, xizmat va vaqt oʻzi qoʻyiladi. Ariza administratorga Telegramga keladi — u yozilishni tasdiqlaydi.'}</p>
          <dl className="us-facts">
            <div>
              <dt>{ui.address[locale]}</dt>
              <dd>{tx(lead.address, locale)}</dd>
            </div>
            <div>
              <dt>{tx(copy.hours, locale)}</dt>
              <dd>{lead.hours ? tx(lead.hours, locale) : tx(copy.hoursUnknown, locale)}</dd>
            </div>
            <div>
              <dt>{ui.phones[locale]}</dt>
              <dd>
                <a href={telHref(lead.phones[0]!)} className="us-tel">
                  {formatPhone(lead.phones[0]!)}
                </a>
              </dd>
            </div>
          </dl>
          <a href={lead.mapsUrl} target="_blank" rel="noopener" className="btn btn-ghost btn-lg mt-6">
            <MapPin aria-hidden className="size-5" strokeWidth={STROKE} />
            {ui.openMaps[locale]}
          </a>
        </div>
        <div className="us-form">
          <BookingForm lead={lead} locale={locale} stroke={STROKE} />
        </div>
      </div>
    </section>
  )
}

const beauty: BeautySkin = {
  Hero,
  blocks: [Pick, Ritual, Booking],
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  return (
    <div className="us-hero us-red us-og relative h-[630px] w-[1200px] overflow-hidden">
      <div className="absolute top-[56px] left-[72px] w-[1060px]">
        <p className="us-kicker !text-[22px]">{kindLine(lead, locale)}</p>
        <p className="us-h1 !text-[250px]">
          <Word name={lead.name} />
        </p>
      </div>
      <div className="absolute top-[352px] left-[56px] w-[620px]">
        <Razor still id="us-og" />
      </div>
      <p className="us-statement absolute top-[400px] right-[64px] w-[420px] !text-[28px]">{locale === 'ru' ? 'Концепт сайта: мастер, услуга и свободное окно — запись за полминуты' : 'Sayt konsepti: usta, xizmat va boʻsh vaqt — yarim daqiqada yozilish'}</p>
      <div className="absolute inset-x-0 bottom-0">
        <Pole />
      </div>
    </div>
  )
}

export const ustara: Direction = {
  id: 'ustara',
  fontClass: `${playfair.variable} ${inter.variable}`,
  css,
  iconStroke: STROKE,
  themeColor: '#8e1b1f',
  fontFamilies: ['Playfair Display', 'Inter'],
  heroFont: { family: 'Playfair Display', weight: 800, style: 'normal' },
  Heading,
  PhotoArt,
  Og,
  beauty,
}

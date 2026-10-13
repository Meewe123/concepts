import { Armchair, Coffee, Cog, Droplets, MapPin, Phone, Sparkles } from 'lucide-react'
import type { CSSProperties, FC } from 'react'
import { ExampleTag } from '@/core/components/ExampleTag'
import { exo2, onest } from '@/core/fonts'
import { formatPhone, formatSum, instagramHref, telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { copy, fmtMinutes, kindLine } from '@/niches/auto/content'
import { AutoBookingForm, CalcRoot, loadHours, startTotal } from '@/niches/auto/parts'
import type { AutoHeroProps, AutoSectionProps, AutoSkin } from '@/niches/auto/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { css } from './style'

const STROKE = 1.6
const v = (o: Record<string, string | number>) => o as CSSProperties

const BODY =
  'M50 190 L48 150 Q52 124 86 104 L180 84 L380 80 Q414 82 448 110 L462 122 Q534 128 584 138 Q606 146 608 162 L610 182 Q608 190 594 190 L556 190 A46 46 0 0 0 464 190 L196 190 A46 46 0 0 0 104 190 Z'
const GLASS = 'M100 108 L180 90 L368 86 Q398 88 428 112 L436 122 L112 122 Z'

function Wheel({ cx }: { cx: number }) {
  return (
    <g>
      <circle cx={cx} cy="192" r="40" className="sc-tire" />
      <circle cx={cx} cy="192" r="27" className="sc-rim" />
      <path d={`M${cx} 167v50M${cx - 25} 192h50M${cx - 18} 174l36 36M${cx + 18} 174l-36 36`} className="sc-spokes" />
      <circle cx={cx} cy="192" r="7" className="sc-hub" />
    </g>
  )
}

/**
 * Мойка в первом экране: пыльная машина, через неё проходит арка с щёткой и струями — за аркой кузов глянцевый.
 * Проход и проявление синхронны (SMIL: одна длительность и кривая), потом по кузову пробегает блик.
 */
function CarWash({ still = false, className = '' }: { still?: boolean; className?: string }) {
  const spline = { calcMode: 'spline', keyTimes: '0;1', keySplines: '0.45 0.05 0.55 0.95', begin: '0.5s', dur: '2.8s', fill: 'freeze' } as const
  return (
    <svg viewBox="0 0 640 300" className={`sc-wash ${still ? 'sc-still' : ''} ${className}`} aria-hidden>
      <defs>
        <linearGradient id="sc-paint" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a5566" />
          <stop offset="0.42" stopColor="#1b2028" />
          <stop offset="0.56" stopColor="#0d1015" />
          <stop offset="1" stopColor="#2c333d" />
        </linearGradient>
        <linearGradient id="sc-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#334052" />
          <stop offset="1" stopColor="#090b0e" />
        </linearGradient>
        <linearGradient id="sc-glint-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sc-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="sc-refl-mask">
          <rect x="0" y="200" width="640" height="100" fill="url(#sc-fade)" />
        </mask>
        <clipPath id="sc-wash-clip">
          <rect x={still ? 0 : -760} y="0" width="700" height="300">
            {!still && <animate attributeName="x" from="-760" to="0" {...spline} />}
          </rect>
        </clipPath>
        <clipPath id="sc-body-clip">
          <path d={BODY} />
        </clipPath>
      </defs>
      <rect x="0" y="230" width="640" height="2" className="sc-floor" />
      <g id="sc-car">
        <g className="sc-dusty">
          <path d={BODY} className="sc-dust-body" />
          <path d={GLASS} className="sc-dust-glass" />
          <ellipse cx="240" cy="170" rx="40" ry="10" className="sc-dirt" />
          <ellipse cx="380" cy="160" rx="55" ry="12" className="sc-dirt" />
          <ellipse cx="560" cy="170" rx="24" ry="8" className="sc-dirt" />
          <ellipse cx="300" cy="100" rx="60" ry="6" className="sc-dirt" />
        </g>
        <g clipPath="url(#sc-wash-clip)" className="sc-gloss">
          <path d={BODY} fill="url(#sc-paint)" />
          <path d={GLASS} fill="url(#sc-glass)" />
          <path d="M92 130 Q300 118 592 142" className="sc-shoulder" />
          <path d="M570 140 L602 147 L600 157 L574 153Z" className="sc-headlight" />
          <g clipPath="url(#sc-body-clip)">
            <rect x="-160" y="60" width="120" height="140" fill="url(#sc-glint-g)" className="sc-glint" transform="skewX(-20)" />
          </g>
        </g>
        <rect x="264" y="88" width="8" height="34" className="sc-pillar" />
        <path d="M272 124 L272 180" className="sc-door" />
        <rect x="300" y="132" width="22" height="4" rx="2" className="sc-handle" />
        <rect x="200" y="132" width="22" height="4" rx="2" className="sc-handle" />
        <Wheel cx={150} />
        <Wheel cx={510} />
      </g>
      <use href="#sc-car" transform="translate(0 464) scale(1 -1)" mask="url(#sc-refl-mask)" className="sc-reflection" />
      {!still && (
        <g className="sc-arch" transform="translate(-60 0)">
          <animateTransform attributeName="transform" type="translate" from="-60 0" to="700 0" {...spline} />
          <rect x="-24" y="26" width="48" height="10" rx="3" className="sc-arch-beam" />
          <rect x="-24" y="26" width="6" height="206" className="sc-arch-post" />
          <rect x="18" y="26" width="6" height="206" className="sc-arch-post" />
          <rect x="-10" y="44" width="20" height="176" rx="10" className="sc-brush" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} cx={-16 + (i % 3) * 16} cy="44" r="2.6" className="sc-drop" style={v({ '--i': i })} />
          ))}
        </g>
      )}
    </svg>
  )
}

/** Силуэты классов: седан, кроссовер, внедорожник, минивэн. */
const CLASS_PATHS: Record<string, string> = {
  sedan: 'M3 21 L5 15 Q15 13 22 8 L38 7 Q46 8 52 13 L61 15 Q63 17 62 21 Z',
  crossover: 'M3 21 L4 13 Q12 11 19 6 L40 5 Q47 6 52 11 L60 13 Q63 15 62 21 Z',
  suv: 'M3 21 L3 10 Q6 5 12 4 L44 4 Q49 5 53 10 L60 12 Q63 14 62 21 Z',
  minivan: 'M2 21 L2 9 Q4 4 12 3 L48 3 Q54 4 58 11 L61 13 Q63 15 62 21 Z',
}
function ClassIcon({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 64 28" className="sc-class-ico" aria-hidden>
      <path d={CLASS_PATHS[id] ?? CLASS_PATHS.sedan} className="sc-class-body" />
      <circle cx="16" cy="21" r="4.6" className="sc-class-wheel" />
      <circle cx="49" cy="21" r="4.6" className="sc-class-wheel" />
    </svg>
  )
}

const SVC_ICONS: Record<string, FC<{ className?: string; strokeWidth?: number; 'aria-hidden'?: boolean }>> = {
  wash: Droplets,
  interior: Armchair,
  engine: Cog,
  polish: Sparkles,
}

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mb-10 max-w-3xl">
      <h2 className="sc-h2">{title}</h2>
      {tag && <div className="mt-3">{tag}</div>}
      {lead && <p className="sc-lead mt-4">{lead}</p>}
    </div>
  )
}

function PhotoArt({ label, className = '' }: PhotoArtProps) {
  return (
    <div className={`relative grid place-items-center bg-bg-2 ${className}`}>
      <CarWash still className="w-4/5" />
      <p className="absolute bottom-3 left-4 text-sm">{label}</p>
    </div>
  )
}

/** «Сейчас: 3 машины в очереди · ожидание ≈ 20 мин» — по демо-загрузке часа (островок). */
function QueueNow({ locale, className = '' }: { locale: Locale; className?: string }) {
  const k = copy.queue
  return (
    <p data-queue="" className={`sc-qnow ${className}`}>
      <i aria-hidden />
      <span className="sc-q-open">
        {tx(k.now, locale)}: <b data-o="q-cars">–</b> · {tx(k.wait, locale)} <b data-o="q-wait">–</b>
      </span>
      <span className="sc-q-closed">{tx(k.closed, locale)}</span>
      <span className="sc-q-demo">{locale === 'ru' ? 'демо' : 'demo'}</span>
    </p>
  )
}

function Hero({ lead, locale, langSwitch }: AutoHeroProps) {
  const ru = locale === 'ru'
  return (
    <header className="sc-hero">
      <div className="sc-top">
        <span>{tx(lead.district, locale)}</span>
        <span className="sc-lang">{langSwitch}</span>
      </div>
      <div className="sc-hero-in">
        <p className="sc-kicker">{kindLine(lead, locale)}</p>
        <h1 className="sc-name">
          <span className="sc-chrome">Urus</span>
          <span className="sc-name-2">Premium</span>
        </h1>
        <div className="sc-stage">
          <CarWash />
        </div>
        <div className="sc-hero-row">
          <p className="sc-statement">
            {ru
              ? 'Бесконтактная мойка, химчистка салона, мойка двигателя и полировка. Посчитайте цену и время — и приезжайте без очереди.'
              : 'Kontaktsiz yuvish, salonni kimyoviy tozalash, dvigatelni yuvish va sayqallash. Narx va vaqtni hisoblang — navbatsiz keling.'}
          </p>
          <div>
            <QueueNow locale={locale} />
            <div className="sc-cta">
              <a href="#vybor" className="btn btn-lg">
                {ru ? 'Посчитать мойку' : 'Yuvishni hisoblash'}
              </a>
              <a href={telHref(lead.phones[0]!)} className="btn btn-ghost btn-lg">
                <Phone aria-hidden className="size-5" strokeWidth={STROKE} />
                {formatPhone(lead.phones[0]!)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

/** Калькулятор: класс × услуги → цена, время, программа мойки полосой, «готово к…» и окна без очереди. */
function Calc({ lead, locale }: AutoSectionProps) {
  const a = lead.auto!
  const k = copy.calc
  const s = startTotal(lead)
  const ru = locale === 'ru'
  return (
    <section id="vybor" className="sc-sec">
      <div className="sc-wrap">
        <Heading title={tx(k.title, locale)} lead={tx(k.lead, locale)} />
        <CalcRoot className="sc-calc">
          <div className="sc-pick">
            <fieldset className="sc-classes">
              <legend className="sc-label">{tx(k.car, locale)}</legend>
              {a.classes.map((c, i) => (
                <label key={c.id}>
                  <input type="radio" name="au-class" value={c.id} defaultChecked={i === 0} className="sr-only" />
                  <span className="sc-class">
                    <ClassIcon id={c.id} />
                    <span className="sc-class-name">{tx(c.name, locale)}</span>
                    <small>{c.k === 1 ? (ru ? 'базовая цена' : 'asosiy narx') : `+${Math.round((c.k - 1) * 100)}%`}</small>
                  </span>
                </label>
              ))}
            </fieldset>
            <fieldset className="sc-svcs">
              <legend className="sc-label">{tx(k.services, locale)}</legend>
              {a.services.map((x, i) => {
                const Icon = SVC_ICONS[x.id] ?? Sparkles
                return (
                  <label key={x.id}>
                    <input type="checkbox" name="au-svc" value={x.id} defaultChecked={i === 0} className="sr-only" />
                    <span className="sc-svc" style={v({ '--i': i })}>
                      <Icon aria-hidden className="sc-svc-ico" strokeWidth={STROKE} />
                      <span className="sc-svc-name">{tx(x.name, locale)}</span>
                      <small>
                        {fmtMinutes(x.minutes, locale)} · {ru ? 'от ' : ''}
                        {formatSum(x.price, locale)}
                        {ru ? '' : 'dan'}
                      </small>
                      <span className="sc-check" aria-hidden />
                    </span>
                  </label>
                )
              })}
            </fieldset>
          </div>
          <div className="sc-result">
            <div className="flex items-center justify-between gap-3">
              <p className="sc-label">{tx(k.total, locale)}</p>
              <ExampleTag locale={locale} />
            </div>
            <p className="sc-price" data-o="price">
              {formatSum(s.price, locale)}
            </p>
            <p className="sc-time">
              <span className="sc-label">{tx(k.time, locale)}</span> <b data-o="minutes">{fmtMinutes(s.minutes, locale)}</b>
            </p>
            <div className="sc-timeline" data-o="timeline" aria-hidden />
            <p className="sc-ready" data-o="ready">
              {tx(k.readyClosed, locale)}
            </p>
            <div className="sc-slots-box">
              <p className="sc-label">{tx(copy.slots.title, locale)}</p>
              <div className="sc-slots" data-o="slots" role="radiogroup" aria-label={tx(copy.slots.title, locale)} />
              <template data-tpl="slot">
                <label className="sc-slot">
                  <input type="radio" name="au-slot" className="sr-only" />
                  <span data-f="day" className="sc-slot-day" />
                  <span data-f="time" className="sc-slot-time" />
                </label>
              </template>
              <p data-o="noslots" hidden className="sc-small">
                {tx(copy.slots.none, locale)}
              </p>
            </div>
            <a href="#zapis" data-o="cta" aria-disabled="true" className="btn btn-lg sc-cta-book">
              <span data-o="cta-text">{tx(copy.slots.pick, locale)}</span>
            </a>
            <p className="sc-small">{tx(copy.queue.demo, locale)}</p>
          </div>
        </CalcRoot>
      </div>
    </section>
  )
}

/** Загрузка по часам: столбики, текущий час — лаймовый, тихие часы подписаны. */
function Queue({ lead, locale }: AutoSectionProps) {
  const k = copy.queue
  const hours = loadHours(lead)
  const quiet = hours.filter((h) => h.quiet).map((h) => `${String(h.hour).padStart(2, '0')}:00`)
  return (
    <section id="ochered" className="sc-sec sc-sec-2">
      <div className="sc-wrap">
        <Heading title={tx(k.title, locale)} lead={tx(k.lead, locale)} tag={<ExampleTag locale={locale} />} />
        <div data-queue="" className="sc-q">
          <QueueNow locale={locale} className="sc-qnow-big" />
          <div className="sc-chart" role="img" aria-label={`${tx(k.quiet, locale)}: ${quiet.join(', ')}`}>
            {hours.map((h) => (
              <span key={h.hour} data-h={h.hour} className={`sc-bar ${h.quiet ? 'sc-bar-quiet' : ''}`} style={v({ '--l': h.load })}>
                <i />
                <b>{h.hour}</b>
              </span>
            ))}
          </div>
          <p className="sc-quiet">
            <span className="sc-label">{tx(k.quiet, locale)}</span> {quiet.join(' · ')}
          </p>
          <p className="sc-small">{tx(k.demo, locale)}</p>
        </div>
      </div>
    </section>
  )
}

function Booking({ lead, locale }: AutoSectionProps) {
  const ru = locale === 'ru'
  return (
    <section id="zapis" className="sc-sec">
      <div className="sc-wrap sc-booking">
        <div>
          <Heading
            title={ru ? 'Запись на время' : 'Vaqtga yozilish'}
            lead={ru ? 'Оставьте телефон — администратор подтвердит время. Машина и услуги уже в заявке.' : 'Telefon raqamingizni qoldiring — administrator vaqtni tasdiqlaydi. Mashina va xizmatlar arizada.'}
          />
          {lead.auto!.lounge && (
            <p className="sc-lounge">
              <Coffee aria-hidden className="size-6" strokeWidth={STROKE} />
              {ru ? 'Пока моют — зона ожидания и кафе.' : 'Yuvilayotganda — kutish zonasi va kafe.'}
            </p>
          )}
        </div>
        <div className="sc-form">
          <AutoBookingForm lead={lead} locale={locale} stroke={STROKE} />
        </div>
      </div>
    </section>
  )
}

function Location({ lead, locale }: AutoSectionProps) {
  const street = lead.map.kind === 'street' ? `${tx(lead.map.street, locale)}, ${lead.map.house}` : tx(lead.address, locale)
  return (
    <section id="adres" className="sc-sec sc-sec-2">
      <div className="sc-wrap sc-where">
        <div>
          <p className="sc-label">{ui.address[locale]}</p>
          <h2 className="sc-street">{street}</h2>
          <p className="sc-lead mt-3">{tx(lead.address, locale)}</p>
          <a href={lead.mapsUrl} target="_blank" rel="noopener" className="btn btn-lg mt-6">
            <MapPin aria-hidden className="size-5" strokeWidth={STROKE} />
            {ui.openMaps[locale]}
          </a>
        </div>
        <dl className="sc-facts">
          <div>
            <dt className="sc-label">{tx(copy.hours, locale)}</dt>
            <dd>{lead.hours ? tx(lead.hours, locale) : tx(copy.hoursUnknown, locale)}</dd>
          </div>
          <div>
            <dt className="sc-label">{ui.phones[locale]}</dt>
            <dd>
              {lead.phones.map((p) => (
                <a key={p} href={telHref(p)} className="sc-tel">
                  {formatPhone(p)}
                </a>
              ))}
            </dd>
          </div>
          {lead.instagram && (
            <div>
              <dt className="sc-label">Instagram</dt>
              <dd>
                <a href={instagramHref(lead.instagram)} target="_blank" rel="noopener" className="sc-link">
                  @{lead.instagram}
                </a>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  )
}

const auto: AutoSkin = {
  Hero,
  order: ['calc', 'queue', 'booking', 'location'],
  sections: { calc: Calc, queue: Queue, booking: Booking, location: Location },
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  return (
    <div className="sc-hero sc-og relative h-[630px] w-[1200px] overflow-hidden">
      <div className="absolute top-[56px] left-[70px] w-[1060px]">
        <p className="sc-kicker !text-[22px]">{kindLine(lead, locale)}</p>
        <p className="sc-name !text-[150px]">
          <span className="sc-chrome">Urus</span>
          <span className="sc-name-2 !text-[44px]">Premium</span>
        </p>
      </div>
      <div className="absolute top-[250px] left-[430px] w-[760px]">
        <CarWash still />
      </div>
      <p className="sc-og-t absolute top-[300px] left-[70px] w-[380px]">
        {locale === 'ru' ? 'Концепт сайта: цена и время мойки, загрузка по часам, запись без очереди' : 'Sayt konsepti: yuvish narxi va vaqti, soatlar boʻyicha band, navbatsiz yozilish'}
      </p>
    </div>
  )
}

export const showroomChrome: Direction = {
  id: 'showroom-chrome',
  fontClass: `${exo2.variable} ${onest.variable}`,
  css,
  iconStroke: STROKE,
  themeColor: '#0c0f13',
  fontFamilies: ['Exo 2', 'Onest'],
  heroFont: { family: 'Exo 2', weight: 800, style: 'italic' },
  Heading,
  PhotoArt,
  Og,
  auto,
}

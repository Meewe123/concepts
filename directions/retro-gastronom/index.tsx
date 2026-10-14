import { Clock, MapPin, Phone, Send } from 'lucide-react'
import type { CSSProperties } from 'react'
import { ExampleTag } from '@/core/components/ExampleTag'
import { lobster, podkova } from '@/core/fonts'
import { formatPhone, groupDigits, instagramHref, telegramHref, telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { tx } from '@/core/text'
import type { Lead, Locale, RestaurantTable, RestaurantZone } from '@/core/types'
import { copy, kindLine } from '@/niches/restaurant/content'
import { BronRoot, RestaurantBookingForm } from '@/niches/restaurant/parts'
import type { RestaurantHeroProps, RestaurantSectionProps, RestaurantSkin } from '@/niches/restaurant/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { css } from './style'

const STROKE = 1.6
const v = (o: Record<string, string | number>) => o as CSSProperties

/** Неоновая кружка: трубки зажигаются по очереди, внутри поднимаются пузырьки. */
function NeonMug({ className = '', still = false }: { className?: string; still?: boolean }) {
  return (
    <svg viewBox="0 0 130 150" className={`rg-mug ${still ? 'rg-still' : ''} ${className}`} aria-hidden>
      <path d="M22 40 L28 136 Q29 142 36 142 L82 142 Q89 142 90 136 L96 40" className="rg-tube" pathLength={1} style={v({ '--i': 0 })} />
      <path d="M95 62 Q122 62 120 90 Q118 114 92 114" className="rg-tube" pathLength={1} style={v({ '--i': 1 })} />
      <path d="M16 40 Q14 22 32 24 Q36 10 52 16 Q62 4 76 14 Q92 8 98 24 Q112 26 104 42" className="rg-tube rg-foam" pathLength={1} style={v({ '--i': 2 })} />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={40 + ((i * 11) % 44)} cy="128" r={2 + (i % 3)} className="rg-bubble" style={v({ '--i': i })} />
      ))}
    </svg>
  )
}

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mb-10 max-w-3xl">
      <h2 className="rg-h2">{title}</h2>
      {tag && <div className="mt-3">{tag}</div>}
      {lead && <p className="rg-lead mt-4">{lead}</p>}
    </div>
  )
}

function PhotoArt({ label, className = '' }: PhotoArtProps) {
  return (
    <div className={`relative grid place-items-center bg-bg-2 ${className}`}>
      <NeonMug still className="w-1/3" />
      <p className="absolute bottom-3 left-4 text-sm">{label}</p>
    </div>
  )
}

function Hero({ lead, locale, langSwitch }: RestaurantHeroProps) {
  const ru = locale === 'ru'
  const f = lead.restaurant!.features ?? []
  return (
    <header className="rg-hero">
      <div className="rg-top">
        <span>{tx(lead.district, locale)}</span>
        <span className="rg-lang">{langSwitch}</span>
      </div>
      <div className="rg-hero-grid">
        <div>
          <p className="rg-kicker">{kindLine(lead, locale)}</p>
          <h1 className="rg-neon">
            Petrovi<span className="rg-flick">c</span>
          </h1>
          <p className="rg-tube-line">{ru ? 'пиво · свои колбаски · раки' : 'pivo · oʻz kolbasalari · qisqichbaqa'}</p>
        </div>
        <NeonMug className="rg-hero-mug" />
        <div className="rg-hero-copy">
          <p className="rg-statement">
            {ru
              ? 'Заливное, форшмак, селёдка под шубой и раки — как в хорошей пивной. Стол теперь можно выбрать на схеме зала, без звонка.'
              : 'Zalivnoye, forshmak, «shuba» va qisqichbaqa — yaxshi pivoxonadagidek. Endi stolni zal sxemasida, qoʻngʻiroqsiz tanlash mumkin.'}
          </p>
          <ul className="rg-chips">
            {lead.hours && (
              <li>
                <Clock aria-hidden className="size-4" strokeWidth={STROKE} />
                {tx(lead.hours, locale)}
              </li>
            )}
            {f.map((x) => (
              <li key={x.ru}>{tx(x, locale)}</li>
            ))}
          </ul>
          <div className="rg-cta">
            <a href="#bron" className="btn btn-lg">
              {tx(copy.book, locale)}
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

/** Зоны на схеме: зал, кабинки справа, терраса снизу (раскладка — пример). */
const ZONE_RECTS: Record<string, { x: number; y: number; w: number; h: number }> = {
  hall: { x: 14, y: 14, w: 218, h: 170 },
  booths: { x: 244, y: 14, w: 102, h: 170 },
  terrace: { x: 14, y: 198, w: 332, h: 76 },
}
const fallbackRect = (i: number) => ({ x: 14, y: 14 + i * 90, w: 332, h: 80 })

function Table({ t, zone, r }: { t: RestaurantTable; zone: RestaurantZone; r: { x: number; y: number; w: number; h: number } }) {
  const cx = r.x + (t.x / 100) * r.w
  const cy = r.y + (t.y / 100) * r.h
  const common = { 'data-table': '', 'data-zone': zone.id, 'data-seats': t.seats, className: 'rg-table' }
  if (t.shape === 'round') {
    const rad = 8 + t.seats * 1.4
    return (
      <g {...common}>
        {Array.from({ length: t.seats }, (_, i) => {
          const a = (i / t.seats) * Math.PI * 2
          return <circle key={i} cx={+(cx + Math.cos(a) * (rad + 6)).toFixed(1)} cy={+(cy + Math.sin(a) * (rad + 6)).toFixed(1)} r="3.4" className="rg-chair" />
        })}
        <circle cx={cx} cy={cy} r={rad} className="rg-top-t" />
        <text x={cx} y={cy + 3.5} textAnchor="middle" className="rg-seats">
          {t.seats}
        </text>
      </g>
    )
  }
  if (t.shape === 'booth') {
    return (
      <g {...common}>
        <path d={`M${cx - 26} ${cy - 15} h52 M${cx - 26} ${cy + 15} h52 M${cx + 30} ${cy - 17} v34`} className="rg-bench" />
        <rect x={cx - 20} y={cy - 9} width="40" height="18" rx="3" className="rg-top-t" />
        <text x={cx} y={cy + 3.5} textAnchor="middle" className="rg-seats">
          {t.seats}
        </text>
      </g>
    )
  }
  const w = 14 + t.seats * 5
  return (
    <g {...common}>
      {Array.from({ length: t.seats }, (_, i) => {
        const side = i % 2 ? 1 : -1
        const k = Math.floor(i / 2)
        const per = Math.ceil(t.seats / 2)
        return <circle key={i} cx={+(cx - w / 2 + ((k + 0.5) * w) / per).toFixed(1)} cy={cy + side * 14} r="3.4" className="rg-chair" />
      })}
      <rect x={cx - w / 2} y={cy - 8} width={w} height="16" rx="2" className="rg-top-t" />
      <text x={cx} y={cy + 3.5} textAnchor="middle" className="rg-seats">
        {t.seats}
      </text>
    </g>
  )
}

function Plan({ lead, locale }: { lead: Lead; locale: Locale }) {
  const zones = lead.restaurant!.zones
  return (
    <svg viewBox="0 0 360 288" className="rg-plan" role="img" aria-label={zones.map((z) => tx(z.name, locale)).join(', ')}>
      {zones.map((z, i) => {
        const r = ZONE_RECTS[z.id] ?? fallbackRect(i)
        return (
          <g key={z.id} data-z={z.id} data-on={i === 0 ? '' : undefined} className={`rg-zone ${z.seasonal ? 'rg-zone-season' : ''}`}>
            <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="6" className="rg-zone-r" />
            <text x={r.x + 8} y={r.y + 18} className="rg-zone-t">
              {tx(z.name, locale)}
            </text>
            {z.tables.map((t) => (
              <Table key={t.id} t={t} zone={z} r={r} />
            ))}
          </g>
        )
      })}
      <path d="M100 184 h40" className="rg-door" />
      <text x="120" y="194" textAnchor="middle" className="rg-door-t">
        {locale === 'ru' ? 'вход' : 'kirish'}
      </text>
    </svg>
  )
}

/** Бронь: салфетка со схемой зала + выбор зоны, гостей, дня и времени. */
function Bron({ lead, locale }: RestaurantSectionProps) {
  const r = lead.restaurant!
  const k = copy.bron
  return (
    <section id="bron" className="rg-sec">
      <div className="rg-wrap">
        <Heading title={tx(k.title, locale)} lead={tx(k.lead, locale)} />
        <BronRoot lead={lead} locale={locale} className="rg-bron">
          <div className="rg-napkin">
            <Plan lead={lead} locale={locale} />
            <p className="rg-fit">
              {tx(k.fit, locale)}: <b data-o="fit">–</b>
            </p>
            <p className="rg-nofit">{tx(k.noFit, locale)}</p>
            <p className="rg-season">{tx(k.season, locale)}</p>
            <p className="rg-napkin-note">{tx(k.demo, locale)}</p>
          </div>
          <div className="rg-controls">
            <fieldset className="rg-group">
              <legend className="rg-label">{tx(k.zone, locale)}</legend>
              <div className="rg-chips-row">
                {r.zones.map((z, i) => (
                  <label key={z.id}>
                    <input type="radio" name="rb-zone" value={z.id} defaultChecked={i === 0} className="sr-only" />
                    <span className="chip">{tx(z.name, locale)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className="rg-group">
              <legend className="rg-label">{tx(k.guests, locale)}</legend>
              <div className="rg-chips-row">
                {r.guests.map((g, i) => (
                  <label key={g}>
                    <input type="radio" name="rb-guests" value={g} defaultChecked={i === 0} className="sr-only" />
                    <span className="chip rg-num">{g}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className="rg-group">
              <legend className="rg-label">{tx(k.day, locale)}</legend>
              <div className="rg-days" data-o="days" />
              <template data-tpl="day">
                <label className="rg-day">
                  <input type="radio" name="rb-day" className="sr-only" />
                  <span className="chip" data-f="label" />
                </label>
              </template>
            </fieldset>
            <fieldset className="rg-group">
              <legend className="rg-label">{tx(k.time, locale)}</legend>
              <div className="rg-times" data-o="times" />
              <template data-tpl="time">
                <label className="rg-time">
                  <input type="radio" name="rb-time" className="sr-only" />
                  <span className="chip" data-f="time" />
                </label>
              </template>
              <p data-o="notimes" hidden className="rg-small">
                {tx(k.noTimes, locale)}
              </p>
            </fieldset>
            <p className="rg-summary" data-o="summary" />
            <a href="#zapis" data-o="cta" aria-disabled="true" className="btn btn-lg rg-cta-book">
              <span data-o="cta-text">{tx(k.pick, locale)}</span>
            </a>
          </div>
        </BronRoot>
      </div>
    </section>
  )
}

/** Наборное табло: белые буквы в пазах чёрного войлока. */
function Menu({ lead, locale }: RestaurantSectionProps) {
  const k = copy.menu
  const ru = locale === 'ru'
  return (
    <section id="menu" className="rg-sec rg-sec-2">
      <div className="rg-wrap">
        <Heading title={tx(k.title, locale)} lead={tx(k.lead, locale)} tag={<ExampleTag locale={locale} />} />
        <div className="rg-board">
          <span className="rg-board-screw rg-s1" aria-hidden />
          <span className="rg-board-screw rg-s2" aria-hidden />
          {lead.restaurant!.menu.map((c) => (
            <div key={c.id} className="rg-board-cat">
              <h3 className="rg-board-h">{tx(c.name, locale)}</h3>
              <ul>
                {c.items.map((it, i) => (
                  <li key={it.id} style={v({ '--i': i })}>
                    <span className="rg-board-name">
                      {tx(it.name, locale)}
                      {it.note && <small>{tx(it.note, locale)}</small>}
                    </span>
                    <span className="rg-board-price">{groupDigits(it.price)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="rg-board-foot">{ru ? 'цены в сумах · пример' : 'narxlar soʻmda · namuna'}</p>
        </div>
      </div>
    </section>
  )
}

function Booking({ lead, locale }: { lead: Lead; locale: Locale }) {
  const ru = locale === 'ru'
  return (
    <div id="zapis" className="rg-booking">
      <div>
        <h3 className="rg-h3">{ru ? 'Заявка на бронь' : 'Band qilish arizasi'}</h3>
        <p className="rg-lead mt-3">{ru ? 'Зал, гости, день и время уже в заявке — оставьте имя и телефон, администратор подтвердит.' : 'Zal, mehmonlar, kun va vaqt arizada — ism va telefon qoldiring, administrator tasdiqlaydi.'}</p>
      </div>
      <div className="rg-form">
        <RestaurantBookingForm lead={lead} locale={locale} stroke={STROKE} />
      </div>
    </div>
  )
}

function Location({ lead, locale }: RestaurantSectionProps) {
  const street = lead.map.kind === 'street' ? `${tx(lead.map.street, locale)}, ${lead.map.house}` : tx(lead.address, locale)
  return (
    <section id="adres" className="rg-sec">
      <div className="rg-wrap">
        <Booking lead={lead} locale={locale} />
        <div className="rg-where">
          <div>
            <p className="rg-label">{ui.address[locale]}</p>
            <h2 className="rg-street">{street}</h2>
            <p className="rg-lead mt-3">{tx(lead.address, locale)}</p>
            {lead.landmark && <p className="rg-landmark">{tx(lead.landmark, locale)}</p>}
            <a href={lead.mapsUrl} target="_blank" rel="noopener" className="btn btn-lg mt-6">
              <MapPin aria-hidden className="size-5" strokeWidth={STROKE} />
              {ui.openMaps[locale]}
            </a>
          </div>
          <div>
            <dl className="rg-facts">
              <div>
                <dt className="rg-label">{tx(copy.hours, locale)}</dt>
                <dd>{lead.hours ? tx(lead.hours, locale) : tx(copy.hoursUnknown, locale)}</dd>
              </div>
              <div>
                <dt className="rg-label">{ui.phones[locale]}</dt>
                <dd>
                  {lead.phones.map((p) => (
                    <a key={p} href={telHref(p)} className="rg-tel">
                      {formatPhone(p)}
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
            <div className="rg-social">
              {lead.telegram && (
                <a href={telegramHref(lead.telegram)} target="_blank" rel="noopener" className="btn btn-ghost">
                  <Send aria-hidden className="size-5" strokeWidth={STROKE} />
                  Telegram
                </a>
              )}
              {lead.instagram && (
                <a href={instagramHref(lead.instagram)} target="_blank" rel="noopener" className="btn btn-ghost">
                  Instagram
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const restaurant: RestaurantSkin = {
  Hero,
  order: ['bron', 'menu', 'location'],
  sections: { bron: Bron, menu: Menu, location: Location },
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  return (
    <div className="rg-hero rg-og relative h-[630px] w-[1200px] overflow-hidden">
      <div className="absolute top-[70px] left-[80px] w-[760px]">
        <p className="rg-kicker !text-[22px]">{kindLine(lead, locale)}</p>
        <p className="rg-neon !text-[190px]">Petrovic</p>
        <p className="rg-tube-line !text-[34px]">{locale === 'ru' ? 'пиво · свои колбаски · раки' : 'pivo · oʻz kolbasalari · qisqichbaqa'}</p>
        <p className="rg-statement !mt-10 !max-w-[700px] !text-[32px]">{locale === 'ru' ? 'Концепт сайта — бронь стола по схеме зала' : 'Sayt konsepti — zal sxemasi boʻyicha stol band qilish'}</p>
      </div>
      <div className="absolute top-[110px] right-[80px] w-[300px]">
        <NeonMug still />
      </div>
    </div>
  )
}

export const retroGastronom: Direction = {
  id: 'retro-gastronom',
  fontClass: `${lobster.variable} ${podkova.variable}`,
  css,
  iconStroke: STROKE,
  themeColor: '#1a1310',
  fontFamilies: ['Lobster', 'Podkova'],
  heroFont: { family: 'Lobster', weight: 400, style: 'normal' },
  Heading,
  PhotoArt,
  Og,
  restaurant,
}

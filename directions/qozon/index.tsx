import { Clock, MapPin, Phone } from 'lucide-react'
import type { CSSProperties } from 'react'
import { ExampleTag } from '@/core/components/ExampleTag'
import { alegreyaSans, firaExtraCondensed } from '@/core/fonts'
import { formatPhone, groupDigits, telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { tx } from '@/core/text'
import type { Lead, Locale, MenuItem, RestaurantTable, RestaurantZone } from '@/core/types'
import { copy, kindLine } from '@/niches/restaurant/content'
import { BronRoot, PotRoot, RestaurantBookingForm } from '@/niches/restaurant/parts'
import type { RestaurantHeroProps, RestaurantSectionProps, RestaurantSkin } from '@/niches/restaurant/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { css } from './style'

const STROKE = 2
const v = (o: Record<string, string | number>) => o as CSSProperties

/** Псевдослучайные, но стабильные числа: зёрна риса и морковь раскладываются одинаково на сервере и в OG. */
function rand(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}

/** Рис с морковью: зёрна и жёлтые соломки в прямоугольнике w×h. */
function Rice({ w, h, seed, n = 120 }: { w: number; h: number; seed: number; n?: number }) {
  const r = rand(seed)
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const x = +(r() * w).toFixed(1)
        const y = +(r() * h).toFixed(1)
        const a = Math.round(r() * 180)
        const carrot = i % 4 === 0
        return carrot ? (
          <rect key={i} x={x} y={y} width="15" height="3.4" rx="1.7" transform={`rotate(${a} ${x} ${y})`} className={i % 8 === 0 ? 'qz-carrot-2' : 'qz-carrot'} />
        ) : (
          <ellipse key={i} cx={x} cy={y} rx="3.8" ry="1.6" transform={`rotate(${a} ${x} ${y})`} className={i % 3 ? 'qz-grain' : 'qz-grain-2'} />
        )
      })}
    </>
  )
}

/**
 * Казан в разрезе на огне. Уровень плова — CSS-переменная --level (её ставит островок по времени),
 * горка риса опускается transform-ом; пар и языки пламени — бесконечные анимации.
 */
function Kazan({ className = '', still = false }: { className?: string; still?: boolean }) {
  const inner = 'M60 120 C60 222 112 282 180 282 C248 282 300 222 300 120 Z'
  return (
    <svg viewBox="0 0 360 360" className={`qz-kazan ${still ? 'qz-still' : ''} ${className}`} aria-hidden>
      <defs>
        <clipPath id="qz-cavity">
          <path d={inner} />
        </clipPath>
      </defs>
      {/* огонь */}
      <g className="qz-fire">
        {[
          [120, 0.8],
          [150, 1.1],
          [180, 1.3],
          [210, 1.05],
          [240, 0.85],
        ].map(([x, s], i) => (
          <path
            key={i}
            d={`M${x} 346 C${x! - 16} 330 ${x! - 10} ${318 - s! * 20} ${x} ${300 - s! * 26} C${x! + 10} ${318 - s! * 20} ${x! + 16} 330 ${x} 346 Z`}
            className={i % 2 ? 'qz-flame qz-flame-2' : 'qz-flame'}
            style={v({ '--i': i })}
          />
        ))}
        <rect x="96" y="338" width="170" height="13" rx="6.5" transform="rotate(-6 180 344)" className="qz-log" />
        <rect x="96" y="338" width="170" height="13" rx="6.5" transform="rotate(7 180 344)" className="qz-log" />
      </g>
      {/* пар */}
      <g className="qz-steam">
        {[
          'M140 98 C126 76 152 64 138 40',
          'M182 92 C168 66 198 52 182 18',
          'M226 98 C240 76 214 62 230 38',
        ].map((d, i) => (
          <path key={d} d={d} className="qz-wisp" style={v({ '--i': i })} />
        ))}
      </g>
      {/* корпус */}
      <path d="M34 112 C34 236 96 304 180 304 C264 304 326 236 326 112 Z" className="qz-iron" />
      <path d={inner} className="qz-cavity" />
      {/* содержимое: зирвак и рис, опускается по --level */}
      <g clipPath="url(#qz-cavity)">
        <g className="qz-fill">
          <rect x="40" y="246" width="280" height="120" className="qz-zirvak" />
          <g transform="translate(46 252)">
            {Array.from({ length: 14 }, (_, i) => (
              <rect key={i} x={(i * 37) % 260} y={8 + ((i * 23) % 40)} width="18" height="12" rx="4" className="qz-meat" />
            ))}
          </g>
          <path d="M40 252 L40 178 C90 146 140 134 180 132 C220 134 270 146 320 178 L320 252 Z" className="qz-rice" />
          <g transform="translate(48 132)">
            <Rice w={264} h={118} seed={7} n={260} />
          </g>
          <g className="qz-garlic" transform="translate(180 134)">
            <circle r="13" />
            <path d="M-6 -11 Q-9 0 -6 11 M0 -13 V13 M6 -11 Q9 0 6 11" />
          </g>
        </g>
      </g>
      {/* блик на чугуне и ободок с ушками */}
      <path d="M58 150 C64 214 98 262 150 282" className="qz-shine" />
      <path d="M22 108 h316" className="qz-rim" />
      <path d="M26 118 C8 118 6 140 24 142" className="qz-ear" />
      <path d="M334 118 C352 118 354 140 336 142" className="qz-ear" />
      {/* капгир — шумовка */}
      <path d="M262 112 L338 22" className="qz-kapgir" />
    </svg>
  )
}

/** Ляган сверху: горка плова, сверху — своё для каждого вида. */
function Lagan({ kind, className = '' }: { kind: string; className?: string }) {
  const r = rand(kind.length * 31 + kind.charCodeAt(0))
  return (
    <svg viewBox="-100 -100 200 200" className={`qz-lagan ${className}`} aria-hidden>
      <circle r="96" className="qz-plate" />
      <circle r="84" className="qz-plate-ring" />
      {Array.from({ length: 36 }, (_, i) => (
        <rect key={i} x="-2" y="-93" width="4" height="7" rx="2" transform={`rotate(${i * 10})`} className="qz-plate-dash" />
      ))}
      <circle r="66" className="qz-mound" />
      <clipPath id={`qz-lg-${kind}`}>
        <circle r="64" />
      </clipPath>
      <g clipPath={`url(#qz-lg-${kind})`}>
        <g transform="translate(-64 -64)">
          <Rice w={128} h={128} seed={kind.length * 7 + 3} n={170} />
        </g>
      </g>
      {kind === 'toshkent' && (
        <g>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const a = (i / 6) * Math.PI * 2
            return (
              <g key={i} transform={`translate(${(Math.cos(a) * 30).toFixed(1)} ${(Math.sin(a) * 30).toFixed(1)})`}>
                <circle r="11" className="qz-qazi" />
                <circle r="5" className="qz-qazi-fat" />
              </g>
            )
          })}
          {[0, 1, 2].map((i) => {
            const a = (i / 3) * Math.PI * 2 + 0.5
            return (
              <g key={i} transform={`translate(${(Math.cos(a) * 12).toFixed(1)} ${(Math.sin(a) * 12).toFixed(1)})`}>
                <ellipse rx="8" ry="6.5" className="qz-egg" />
                <circle r="3.4" className="qz-yolk" />
              </g>
            )
          })}
        </g>
      )}
      {kind === 'samarqand' && (
        <g>
          {Array.from({ length: 9 }, (_, i) => {
            const a = (i / 9) * Math.PI * 2
            const d = i % 3 === 0 ? 10 : 34
            return <rect key={i} x={(Math.cos(a) * d - 12).toFixed(1)} y={(Math.sin(a) * d - 8).toFixed(1)} width="24" height="16" rx="6" transform={`rotate(${i * 40} ${(Math.cos(a) * d).toFixed(1)} ${(Math.sin(a) * d).toFixed(1)})`} className="qz-meat" />
          })}
        </g>
      )}
      {kind === 'toy' && (
        <g>
          {Array.from({ length: 34 }, (_, i) => {
            const a = r() * Math.PI * 2
            const d = 8 + r() * 50
            const x = +(Math.cos(a) * d).toFixed(1)
            const y = +(Math.sin(a) * d).toFixed(1)
            return i % 2 ? <circle key={i} cx={x} cy={y} r="4.6" className="qz-nut" /> : <ellipse key={i} cx={x} cy={y} rx="3.6" ry="2.4" className="qz-raisin" />
          })}
        </g>
      )}
    </svg>
  )
}

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mb-10 max-w-3xl">
      <h2 className="qz-h2">{title}</h2>
      {tag && <div className="mt-3">{tag}</div>}
      {lead && <p className="qz-lead mt-4">{lead}</p>}
    </div>
  )
}

function PhotoArt({ label, className = '' }: PhotoArtProps) {
  return (
    <div className={`relative grid place-items-center bg-bg-2 ${className}`}>
      <Lagan kind="toshkent" className="w-1/2" />
      <p className="absolute bottom-3 left-4 text-sm">{label}</p>
    </div>
  )
}

function Hero({ lead, locale, langSwitch }: RestaurantHeroProps) {
  const ru = locale === 'ru'
  const r = lead.restaurant!
  return (
    <header className="qz-hero qz-dark">
      <div className="qz-top">
        <span>{tx(lead.district, locale)}</span>
        <span className="qz-lang">{langSwitch}</span>
      </div>
      <div className="qz-hero-grid">
        <div className="qz-sign">
          <p className="qz-kicker">{kindLine(lead, locale)}</p>
          <h1 className="qz-word">
            <span className="qz-line">
              <span>Sariq</span>
            </span>
            <span className="qz-line">
              <span>Sabzi</span>
            </span>
          </h1>
          <p className="qz-meaning">{ru ? '«Жёлтая морковь» — без неё нет настоящего плова' : '«Sariq sabzi» — usiz haqiqiy osh boʻlmaydi'}</p>
        </div>
        <PotRoot lead={lead} locale={locale} className="qz-pot">
          <Kazan />
          <p className="qz-status">
            <i aria-hidden />
            <span data-o="pot" aria-live="polite">
              {ru ? 'Плов: смотрим, сколько осталось в казане…' : 'Osh: qozonda qancha qolganini koʻrmoqdamiz…'}
            </span>
          </p>
          <p className="qz-status-note">{ru ? 'Демо: на рабочем сайте уровень отмечает повар — одной кнопкой в Telegram-боте.' : 'Demo: ishlaydigan saytda darajani oshpaz belgilaydi — Telegram-botda bitta tugma bilan.'}</p>
        </PotRoot>
        <div className="qz-hero-copy">
          <p className="qz-statement">
            {ru
              ? 'Ташкентский плов из казана — с 11:00 и пока не кончится. Сколько осталось, видно прямо здесь, а топчан во дворе бронируется в два касания.'
              : 'Qozondan Toshkent oshi — 11:00 dan va tugaguncha. Qancha qolgani shu yerda koʻrinadi, hovlidagi soʻri esa ikki bosishda band qilinadi.'}
          </p>
          <ul className="qz-chips">
            {lead.hours && (
              <li>
                <Clock aria-hidden className="size-4" strokeWidth={STROKE} />
                {tx(lead.hours, locale)}
              </li>
            )}
            {(r.features ?? []).map((x) => (
              <li key={x.ru}>{tx(x, locale)}</li>
            ))}
          </ul>
          <div className="qz-cta">
            <a href="#bron" className="btn btn-lg">
              {ru ? 'Забронировать топчан' : 'Soʻri band qilish'}
            </a>
            <a href="#menu" className="btn btn-ghost btn-lg">
              {ru ? 'Меню' : 'Menyu'}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

/** Зоны на схеме двора: зал слева сверху, топчаны справа, двор под виноградником снизу. */
const ZONE_RECTS: Record<string, { x: number; y: number; w: number; h: number }> = {
  zal: { x: 12, y: 12, w: 210, h: 158 },
  sori: { x: 234, y: 12, w: 114, h: 296 },
  hovli: { x: 12, y: 182, w: 210, h: 126 },
}
const fallbackRect = (i: number) => ({ x: 12, y: 12 + i * 100, w: 336, h: 90 })

function Table({ t, zone, r }: { t: RestaurantTable; zone: RestaurantZone; r: { x: number; y: number; w: number; h: number } }) {
  const cx = +(r.x + (t.x / 100) * r.w).toFixed(1)
  const cy = +(r.y + (t.y / 100) * r.h).toFixed(1)
  const common = { 'data-table': '', 'data-zone': zone.id, 'data-seats': t.seats, className: 'qz-table' }
  const label = (
    <text x={cx} y={cy + 4} textAnchor="middle" className="qz-seats">
      {t.seats}
    </text>
  )
  if (t.shape === 'booth') {
    // топчан: помост, курпачи по краю и низкий столик
    const w = 50 + t.seats * 3
    const h = 44
    return (
      <g {...common}>
        <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx="5" className="qz-sori" />
        <rect x={cx - w / 2 + 5} y={cy - h / 2 + 5} width={w - 10} height={h - 10} rx="3" className="qz-kurpa" />
        <rect x={cx - 15} y={cy - 9} width="30" height="18" rx="3" className="qz-top-t" />
        {label}
      </g>
    )
  }
  if (t.shape === 'round') {
    const rad = 9 + t.seats * 1.5
    return (
      <g {...common}>
        {Array.from({ length: t.seats }, (_, i) => {
          const a = (i / t.seats) * Math.PI * 2 - Math.PI / 2
          return <circle key={i} cx={+(cx + Math.cos(a) * (rad + 6)).toFixed(1)} cy={+(cy + Math.sin(a) * (rad + 6)).toFixed(1)} r="3.6" className="qz-chair" />
        })}
        <circle cx={cx} cy={cy} r={rad} className="qz-top-t" />
        {label}
      </g>
    )
  }
  const w = 16 + t.seats * 5
  const per = Math.ceil(t.seats / 2)
  return (
    <g {...common}>
      {Array.from({ length: t.seats }, (_, i) => {
        const side = i % 2 ? 1 : -1
        const k = Math.floor(i / 2)
        return <circle key={i} cx={+(cx - w / 2 + ((k + 0.5) * w) / per).toFixed(1)} cy={cy + side * 15} r="3.6" className="qz-chair" />
      })}
      <rect x={cx - w / 2} y={cy - 9} width={w} height="18" rx="3" className="qz-top-t" />
      {label}
    </g>
  )
}

function Plan({ lead, locale }: { lead: Lead; locale: Locale }) {
  const zones = lead.restaurant!.zones
  return (
    <svg viewBox="0 0 360 320" className="qz-plan" role="img" aria-label={zones.map((z) => tx(z.name, locale)).join(', ')}>
      <defs>
        <pattern id="qz-vine" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 9 H18" className="qz-vine-l" />
        </pattern>
      </defs>
      {zones.map((z, i) => {
        const r = ZONE_RECTS[z.id] ?? fallbackRect(i)
        return (
          <g key={z.id} data-z={z.id} data-on={i === 0 ? '' : undefined} className="qz-zone">
            <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="8" className="qz-zone-r" />
            {z.seasonal && <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="8" fill="url(#qz-vine)" className="qz-zone-vine" />}
            <text x={r.x + 10} y={r.y + 20} className="qz-zone-t">
              {tx(z.name, locale)}
              {z.note && <tspan className="qz-zone-note"> · {tx(z.note, locale)}</tspan>}
            </text>
            {z.tables.map((t) => (
              <Table key={t.id} t={t} zone={z} r={r} />
            ))}
          </g>
        )
      })}
      <path d="M90 176 h44" className="qz-door" />
    </svg>
  )
}

function Bron({ lead, locale }: RestaurantSectionProps) {
  const r = lead.restaurant!
  const k = copy.bron
  const ru = locale === 'ru'
  return (
    <section id="bron" className="qz-sec">
      <div className="qz-wrap">
        <Heading
          title={ru ? 'Топчан, стол или двор' : 'Soʻri, stol yoki hovli'}
          lead={ru ? 'Выберите, где сесть, сколько вас и когда — на схеме загорятся подходящие места.' : 'Qayerda oʻtirish, necha kishi va qachonligini tanlang — sxemada mos joylar yonadi.'}
        />
        <BronRoot lead={lead} locale={locale} className="qz-bron">
          <div className="qz-yard">
            <Plan lead={lead} locale={locale} />
            <p className="qz-fit">
              {ru ? 'Подходящих мест' : 'Mos joylar'}: <b data-o="fit">–</b>
            </p>
            <p className="qz-nofit">{tx(k.noFit, locale)}</p>
            <p className="qz-season">{ru ? 'Двор открыт с мая по сентябрь — в другое время садимся в зал или на топчаны.' : 'Hovli maydan sentyabrgacha ochiq — boshqa paytda zal yoki soʻrilarda oʻtiramiz.'}</p>
          </div>
          <div className="qz-controls">
            <fieldset className="qz-group">
              <legend className="qz-label">{tx(k.zone, locale)}</legend>
              <div className="qz-chips-row">
                {r.zones.map((z, i) => (
                  <label key={z.id}>
                    <input type="radio" name="rb-zone" value={z.id} defaultChecked={i === 0} className="sr-only" />
                    <span className="chip">{tx(z.name, locale)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className="qz-group">
              <legend className="qz-label">{tx(k.guests, locale)}</legend>
              <div className="qz-chips-row">
                {r.guests.map((g, i) => (
                  <label key={g}>
                    <input type="radio" name="rb-guests" value={g} defaultChecked={i === 0} className="sr-only" />
                    <span className="chip qz-num">{g}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className="qz-group">
              <legend className="qz-label">{tx(k.day, locale)}</legend>
              <div className="qz-days" data-o="days" />
              <template data-tpl="day">
                <label className="qz-day">
                  <input type="radio" name="rb-day" className="sr-only" />
                  <span className="chip" data-f="label" />
                </label>
              </template>
            </fieldset>
            <fieldset className="qz-group">
              <legend className="qz-label">{tx(k.time, locale)}</legend>
              <div className="qz-times" data-o="times" />
              <template data-tpl="time">
                <label className="qz-time">
                  <input type="radio" name="rb-time" className="sr-only" />
                  <span className="chip" data-f="time" />
                </label>
              </template>
              <p data-o="notimes" hidden className="qz-small">
                {tx(k.noTimes, locale)}
              </p>
            </fieldset>
            <p className="qz-summary" data-o="summary" />
            <a href="#zapis" data-o="cta" aria-disabled="true" className="btn btn-lg qz-cta-book">
              <span data-o="cta-text">{tx(k.pick, locale)}</span>
            </a>
            <p className="qz-small">{tx(k.demo, locale)}</p>
          </div>
        </BronRoot>
      </div>
    </section>
  )
}

function Price({ item, locale }: { item: MenuItem; locale: Locale }) {
  return (
    <span className="qz-price">
      {groupDigits(item.price)} <small>{locale === 'ru' ? 'сум' : 'soʻm'}</small>
    </span>
  )
}

/** Меню: три плова на ляганах, остальное — списком с отточиями. */
function Menu({ lead, locale }: RestaurantSectionProps) {
  const ru = locale === 'ru'
  const [plov, ...rest] = lead.restaurant!.menu
  return (
    <section id="menu" className="qz-sec qz-dark">
      <div className="qz-wrap">
        <Heading title={ru ? 'Три плова и всё к ним' : 'Uch xil osh va yoniga'} lead={ru ? 'Порция — 350 граммов на ляган; лепёшку и чай несём сразу.' : 'Porsiya — lagan boshiga 350 gramm; non va choyni darhol olib kelamiz.'} tag={<ExampleTag locale={locale} />} />
        {plov && (
          <ul className="qz-lagans">
            {plov.items.map((it, i) => (
              <li key={it.id} className="qz-dish" style={v({ '--i': i })}>
                <Lagan kind={it.id} />
                <h3 className="qz-dish-t">{tx(it.name, locale)}</h3>
                {it.note && <p className="qz-dish-n">{tx(it.note, locale)}</p>}
                <Price item={it} locale={locale} />
              </li>
            ))}
          </ul>
        )}
        <div className="qz-list">
          {rest.map((c) => (
            <div key={c.id}>
              <h3 className="qz-list-h">{tx(c.name, locale)}</h3>
              <ul>
                {c.items.map((it) => (
                  <li key={it.id}>
                    <span className="qz-list-name">
                      {tx(it.name, locale)}
                      {it.note && <small>{tx(it.note, locale)}</small>}
                    </span>
                    <i aria-hidden />
                    <Price item={it} locale={locale} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Location({ lead, locale }: RestaurantSectionProps) {
  const ru = locale === 'ru'
  return (
    <section id="adres" className="qz-sec">
      <div className="qz-wrap">
        <div id="zapis" className="qz-booking">
          <div>
            <h2 className="qz-h2">{ru ? 'Заявка на бронь' : 'Band qilish arizasi'}</h2>
            <p className="qz-lead mt-4">{ru ? 'Место, гости, день и время уже в заявке — оставьте имя и телефон. Заявка придёт администратору в Telegram, он перезвонит.' : 'Joy, mehmonlar, kun va vaqt arizada — ism va telefon qoldiring. Ariza administratorga Telegramga keladi, u qoʻngʻiroq qiladi.'}</p>
          </div>
          <div className="qz-form">
            <RestaurantBookingForm lead={lead} locale={locale} stroke={STROKE} />
          </div>
        </div>
        <div className="qz-where">
          <div>
            <p className="qz-label">{ui.address[locale]}</p>
            <p className="qz-street">{tx(lead.address, locale)}</p>
            <a href={lead.mapsUrl} target="_blank" rel="noopener" className="btn btn-lg mt-6">
              <MapPin aria-hidden className="size-5" strokeWidth={STROKE} />
              {ui.openMaps[locale]}
            </a>
          </div>
          <dl className="qz-facts">
            <div>
              <dt className="qz-label">{tx(copy.hours, locale)}</dt>
              <dd>{lead.hours ? tx(lead.hours, locale) : tx(copy.hoursUnknown, locale)}</dd>
            </div>
            <div>
              <dt className="qz-label">{ru ? 'Плов' : 'Osh'}</dt>
              <dd>{ru ? 'с 11:00, пока не кончится — обычно до 16:00' : '11:00 dan, tugaguncha — odatda 16:00 gacha'}</dd>
            </div>
            <div>
              <dt className="qz-label">{ui.phones[locale]}</dt>
              <dd>
                <a href={telHref(lead.phones[0]!)} className="qz-tel">
                  <Phone aria-hidden className="size-5" strokeWidth={STROKE} />
                  {formatPhone(lead.phones[0]!)}
                </a>
              </dd>
            </div>
          </dl>
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
    <div className="qz-hero qz-dark qz-og relative h-[630px] w-[1200px] overflow-hidden">
      <div className="absolute top-[64px] left-[80px] w-[640px]">
        <p className="qz-kicker !text-[22px]">{kindLine(lead, locale)}</p>
        <p className="qz-word !text-[200px]">
          <span className="qz-line">
            <span>Sariq</span>
          </span>
          <span className="qz-line">
            <span>Sabzi</span>
          </span>
        </p>
        <p className="qz-statement !mt-6 !text-[30px]">{locale === 'ru' ? 'Концепт сайта: плов «пока не кончится» и бронь топчана' : 'Sayt konsepti: «tugaguncha» osh va soʻri band qilish'}</p>
      </div>
      <div className="absolute top-[70px] right-[60px] w-[460px]" style={v({ '--level': 0.62 })}>
        <Kazan still />
      </div>
    </div>
  )
}

export const qozon: Direction = {
  id: 'qozon',
  fontClass: `${firaExtraCondensed.variable} ${alegreyaSans.variable}`,
  css,
  iconStroke: STROKE,
  themeColor: '#1c1714',
  fontFamilies: ['Fira Sans Extra Condensed', 'Alegreya Sans'],
  heroFont: { family: 'Fira Sans Extra Condensed', weight: 900, style: 'normal' },
  Heading,
  PhotoArt,
  Og,
  restaurant,
}

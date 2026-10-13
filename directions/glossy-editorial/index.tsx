import { MapPin, Phone, Scissors } from 'lucide-react'
import type { CSSProperties } from 'react'
import { ExampleTag } from '@/core/components/ExampleTag'
import { cormorantEditorial, onest } from '@/core/fonts'
import { formatPhone, telHref, yandexSearch } from '@/core/format'
import { ui } from '@/core/i18n'
import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { BookerRoot, BookingForm } from '@/niches/beauty/Booker'
import { copy, fmtDuration, fmtPrice, kindLine, serviceGroups } from '@/niches/beauty/content'
import type { BeautyHeroProps, BeautySectionProps, BeautySkin } from '@/niches/beauty/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { css } from './style'

const STROKE = 1.25
const v = (o: Record<string, string | number>) => o as CSSProperties

/** Волны-пряди тонкой золотой линией в арке «обложки» — вместо фото. */
function Waves({ className = '', still = false }: { className?: string; still?: boolean }) {
  const lines = Array.from({ length: 9 }, (_, i) => {
    const x = 18 + i * 13
    return `M${x} -10 C ${x + 46} 70, ${x - 40} 150, ${x + 18} 230 S ${x - 10} 360, ${x + 34} 420`
  })
  return (
    <svg viewBox="0 0 200 400" preserveAspectRatio="xMidYMid slice" className={`ge-waves ${still ? 'ge-still' : ''} ${className}`} aria-hidden>
      <circle cx="150" cy="96" r="34" className="ge-sun" />
      {lines.map((d, i) => (
        <path key={d} d={d} pathLength={1} style={v({ '--i': i })} />
      ))}
    </svg>
  )
}

/** Штрихкод, как на журнальной обложке. */
function Barcode({ className = '' }: { className?: string }) {
  const widths = [2, 1, 1, 3, 1, 2, 1, 1, 2, 3, 1, 1, 2, 1, 3, 1, 2, 2, 1, 1, 3, 1, 2, 1, 1, 2]
  let x = 0
  return (
    <svg viewBox="0 0 74 36" className={`ge-barcode ${className}`} aria-hidden>
      {widths.map((w, i) => {
        const r = i % 2 === 0 ? <rect key={i} x={x} y={0} width={w} height={27} /> : null
        x += w + 0.6
        return r
      })}
      <text x="0" y="35" fontSize="6.4" letterSpacing="0.6">
        4 780000 177272
      </text>
    </svg>
  )
}

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mb-10 max-w-3xl">
      <h2 className="ge-h2">{title}</h2>
      {tag && <div className="mt-3">{tag}</div>}
      {lead && <p className="ge-lead mt-4">{lead}</p>}
    </div>
  )
}

function PhotoArt({ label, className = '' }: PhotoArtProps) {
  return (
    <div className={`ge-arch relative ${className}`}>
      <Waves still />
      <p className="absolute inset-x-0 bottom-4 text-center text-sm">{label}</p>
    </div>
  )
}

/** Первый экран — обложка журнала: мастхед, арка с золотыми волнами и анонсы. */
function Hero({ lead, locale, langSwitch }: BeautyHeroProps) {
  const ru = locale === 'ru'
  const branches = lead.beauty?.branches ?? []
  return (
    <header className="ge-cover">
      <div className="ge-strip">
        <span>{ru ? '№ 01 · Ташкент' : '№ 01 · Toshkent'}</span>
        <span className="ge-lang">{langSwitch}</span>
      </div>
      <h1 className="ge-mast" aria-label={lead.name}>
        <span className="ge-mast-1" aria-hidden>
          Expert
        </span>
        <span className="ge-mast-2" aria-hidden>
          Beauty
        </span>
      </h1>
      <div className="ge-cover-body">
        <div className="ge-arch ge-arch-cover">
          <Waves />
        </div>
        <ul className="ge-lines">
          <li className="ge-line-big">
            <em>{ru ? 'Запись без директа' : 'Directsiz yozilish'}</em>
            <span>{ru ? 'за одну минуту' : 'bir daqiqada'}</span>
          </li>
          <li>
            <a href="#soderzhanie" className="ge-line-link">
              <span className="ge-caps">{ru ? 'Сколько длится окрашивание?' : 'Boʻyash qancha davom etadi?'}</span>
              <em>{ru ? 'Ответ — на стр. 2' : 'Javob — 2-sahifada'}</em>
            </a>
          </li>
          {branches.length > 1 && (
            <li>
              <span className="ge-caps">{ru ? `${branches.length} адреса` : `${branches.length} ta manzil`}</span>
              <em>{branches.map((b) => tx(b.name, locale)).join(' · ')}</em>
            </li>
          )}
        </ul>
      </div>
      <p className="ge-kind">{kindLine(lead, locale)}</p>
      <div className="ge-cover-foot">
        <a href="#zapis" className="btn btn-lg ge-btn">
          {tx(copy.book, locale)}
        </a>
        <a href={telHref(lead.phones[0]!)} className="ge-tel">
          <Phone aria-hidden className="size-4" strokeWidth={STROKE} />
          {formatPhone(lead.phones[0]!)}
        </a>
        <Barcode className="ge-barcode-cover" />
      </div>
    </header>
  )
}

/** «Содержание»: меню услуг как оглавление номера, справа — разворот визита с окнами. */
function Contents({ lead, locale }: BeautySectionProps) {
  const b = lead.beauty!
  const k = copy.pick
  const ru = locale === 'ru'
  let page = 2
  return (
    <section id="soderzhanie" className="ge-sec">
      <div className="ge-wrap">
        <div className="ge-toc-head">
          <h2 className="ge-h2">
            <em>{ru ? 'Содержание' : 'Mundarija'}</em>
          </h2>
          <span className="ge-caps">{ru ? 'Выберите услугу' : 'Xizmatni tanlang'}</span>
        </div>
        <p className="ge-lead">{tx(k.lead, locale)}</p>
        <BookerRoot lead={lead} locale={locale} className="ge-booker">
          {b.branches && b.branches.length > 1 && (
            <fieldset className="ge-branches">
              <legend className="sr-only">{tx(copy.booking.branch, locale)}</legend>
              {b.branches.map((br, i) => (
                <label key={br.id}>
                  <input type="radio" name="bk-branch" value={br.id} data-label={tx(br.name, locale)} defaultChecked={i === 0} className="sr-only" />
                  <span>{tx(br.name, locale)}</span>
                </label>
              ))}
            </fieldset>
          )}
          <fieldset className="ge-toc">
            <legend className="sr-only">{tx(k.title, locale)}</legend>
            {serviceGroups(b.services).map((g) => (
              <div key={g.name?.ru ?? 'x'} className="ge-group">
                {g.name && <p className="ge-caps ge-group-name">{tx(g.name, locale)}</p>}
                {g.items.map((s) => (
                  <label key={s.id} className="ge-row">
                    <input type="radio" name="bk-service" value={s.id} className="sr-only" />
                    <span className="ge-row-p">{String(page++).padStart(2, '0')}</span>
                    <span className="ge-row-name">{tx(s.name, locale)}</span>
                    <span className="ge-row-meta">
                      {fmtDuration(s.minutes, locale)} · {fmtPrice(s.price, s.from, locale)}
                    </span>
                  </label>
                ))}
              </div>
            ))}
          </fieldset>
          <div className="ge-spread" data-o="result">
            <p className="ge-empty">
              <em>{tx(k.empty, locale)}</em>
            </p>
            <div className="ge-spread-body">
              <div className="flex items-center justify-between gap-3">
                <p className="ge-caps">{ru ? 'Ваш визит' : 'Tashrifingiz'}</p>
                <ExampleTag locale={locale} large />
              </div>
              <h3 className="ge-spread-title" data-o="name" />
              <dl className="ge-stats">
                <div>
                  <dt className="ge-caps">{tx(k.duration, locale)}</dt>
                  <dd data-o="duration" />
                </div>
                <div>
                  <dt className="ge-caps">{tx(k.price, locale)}</dt>
                  <dd data-o="price" />
                </div>
              </dl>
              <p className="ge-caps ge-slots-title">{tx(k.slots, locale)}</p>
              <div className="ge-slots" data-o="slots" role="radiogroup" aria-label={tx(k.slots, locale)} />
              <template data-tpl="slot">
                <label className="ge-slot">
                  <input type="radio" name="bk-slot" className="sr-only" />
                  <span data-f="day" className="ge-slot-day" />
                  <span data-f="time" className="ge-slot-time" />
                </label>
              </template>
              <p data-o="noslots" hidden className="ge-small">
                {tx(k.noSlots, locale)}
              </p>
              <p className="ge-small">{tx(k.slotsDemo, locale)}</p>
              <a href="#zapis" data-o="cta" aria-disabled="true" className="btn btn-lg ge-btn">
                <span data-o="cta-text">{tx(k.chooseSlot, locale)}</span>
              </a>
            </div>
          </div>
        </BookerRoot>
      </div>
    </section>
  )
}

/** Два адреса — как городской гид в конце номера. */
function Addresses({ lead, locale }: BeautySectionProps) {
  const branches = lead.beauty?.branches ?? []
  const ru = locale === 'ru'
  return (
    <section id="adres" className="ge-sec ge-sec-powder">
      <div className="ge-wrap">
        <Heading title={ru ? 'Где нас найти' : 'Bizni qayerdan topish mumkin'} lead={ru ? 'Запишитесь в тот салон, что ближе к дому или работе.' : 'Uy yoki ishga yaqin salonga yoziling.'} />
        <ol className="ge-guide">
          {branches.map((br, i) => (
            <li key={br.id}>
              <span className="ge-guide-n">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="ge-guide-name">
                <em>{tx(br.name, locale)}</em>
              </h3>
              <p>{tx(br.address, locale)}</p>
              <a href={i === 0 ? lead.mapsUrl : yandexSearch(tx(br.address, 'ru'))} target="_blank" rel="noopener" className="ge-link">
                <MapPin aria-hidden className="size-4" strokeWidth={STROKE} />
                {ui.openMaps[locale]}
              </a>
            </li>
          ))}
        </ol>
        <div className="ge-hours">
          <p className="ge-caps">{tx(copy.hours, locale)}</p>
          <p>{lead.hours ? tx(lead.hours, locale) : tx(copy.hoursUnknown, locale)}</p>
          <p className="ge-caps mt-6">{ui.phones[locale]}</p>
          {lead.phones.map((p) => (
            <a key={p} href={telHref(p)} className="ge-big-tel">
              {formatPhone(p)}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Запись — отрывной купон из журнала. */
function Booking({ lead, locale }: BeautySectionProps) {
  const k = copy.booking
  return (
    <section id="zapis" className="ge-sec">
      <div className="ge-wrap ge-coupon">
        <span className="ge-scissors" aria-hidden>
          <Scissors className="size-5" strokeWidth={STROKE} />
        </span>
        <div>
          <p className="ge-caps">{locale === 'ru' ? 'Купон записи' : 'Yozilish kuponi'}</p>
          <h2 className="ge-h2 mt-2">
            <em>{tx(k.title, locale)}</em>
          </h2>
          <p className="ge-lead mt-3">{tx(k.lead, locale)}</p>
        </div>
        <BookingForm lead={lead} locale={locale} stroke={STROKE} />
      </div>
    </section>
  )
}

const beauty: BeautySkin = {
  Hero,
  blocks: [Contents, Addresses, Booking],
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  const ru = locale === 'ru'
  return (
    <div className="ge-cover ge-og relative h-[630px] w-[1200px] overflow-hidden">
      <div className="absolute top-[50px] right-[150px] h-[480px] w-[300px]">
        <div className="ge-arch h-full w-full">
        <Waves still />
        </div>
      </div>
      <p className="ge-mast absolute top-[30px] left-[70px] w-[700px] !text-left">
        <span className="ge-mast-1 !text-[150px]">Expert</span>
        <span className="ge-mast-2 !text-[30px] !text-left">Beauty</span>
      </p>
      <div className="absolute top-[330px] left-[76px] w-[640px]">
        <p className="ge-line-big ge-line-og">
          <em>{ru ? 'Запись без директа' : 'Directsiz yozilish'}</em>
          <span>{ru ? 'за одну минуту' : 'bir daqiqada'}</span>
        </p>
        <p className="ge-caps mt-6 !text-[20px]">{kindLine(lead, locale)}</p>
      </div>
      <Barcode className="absolute right-[40px] bottom-[34px] w-[120px]" />
    </div>
  )
}

export const glossyEditorial: Direction = {
  id: 'glossy-editorial',
  fontClass: `${cormorantEditorial.variable} ${onest.variable}`,
  css,
  iconStroke: STROKE,
  themeColor: '#f6f1e8',
  fontFamilies: ['Cormorant Garamond', 'Onest'],
  heroFont: { family: 'Cormorant Garamond', weight: 600, style: 'normal' },
  Heading,
  PhotoArt,
  Og,
  beauty,
}

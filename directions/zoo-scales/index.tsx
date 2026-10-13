import { MapPin, Phone, Stethoscope, Truck } from 'lucide-react'
import type { CSSProperties } from 'react'
import { ExampleTag } from '@/core/components/ExampleTag'
import { comfortaa, firaSans } from '@/core/fonts'
import { formatPhone, formatSum, instagramHref, telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { tx } from '@/core/text'
import type { Lead, Locale, Pet } from '@/core/types'
import { copy, kgText, kindLine } from '@/niches/petshop/content'
import { AddButton, CartCount, CartList, formAdd, OrderForm, PETS, ScaleRoot, scaleMax, startState, WeightRange } from '@/niches/petshop/parts'
import type { PetshopHeroProps, PetshopSectionProps, PetshopSkin } from '@/niches/petshop/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { css } from './style'

const STROKE = 1.8
const v = (o: Record<string, string | number>) => o as CSSProperties
const brand = (locale: Locale) => (locale === 'ru' ? 'Зооцентр' : 'Zootsentr')

/** Точка на окружности: 0° — вверх, по часовой. */
function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180
  return [+(cx + r * Math.cos(a)).toFixed(2), +(cy + r * Math.sin(a)).toFixed(2)]
}
function arc(cx: number, cy: number, r: number, a0: number, a1: number): string {
  const [x0, y0] = polar(cx, cy, r, a0)
  const [x1, y1] = polar(cx, cy, r, a1)
  return `M${x0} ${y0}A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}`
}
const SWEEP = 260
const A0 = -130
const angle = (t: number) => A0 + SWEEP * t

/** Собака сидит: геометрия из кругов, ошейник с жетоном-ценником. */
function Dog() {
  return (
    <g>
      <ellipse cx="50" cy="72" rx="25" ry="23" className="zs-f-main" />
      <ellipse cx="38" cy="93" rx="8" ry="4.5" className="zs-f-deep" />
      <ellipse cx="62" cy="93" rx="8" ry="4.5" className="zs-f-deep" />
      <ellipse cx="31" cy="31" rx="7" ry="15" transform="rotate(22 31 31)" className="zs-f-deep" />
      <ellipse cx="69" cy="31" rx="7" ry="15" transform="rotate(-22 69 31)" className="zs-f-deep" />
      <circle cx="50" cy="37" r="19" className="zs-f-main" />
      <ellipse cx="50" cy="46" rx="10" ry="7.5" className="zs-f-paper" />
      <ellipse cx="50" cy="41.5" rx="3.6" ry="2.6" className="zs-f-ink" />
      <circle cx="42.5" cy="33" r="2.4" className="zs-f-ink zs-blink" />
      <circle cx="57.5" cy="33" r="2.4" className="zs-f-ink zs-blink" />
      <rect x="36" y="54" width="28" height="4.5" rx="2.2" className="zs-f-tag" />
      <circle cx="50" cy="61.5" r="3.4" className="zs-f-tag" />
    </g>
  )
}

function Cat() {
  return (
    <g>
      <path d="M71 88c10-2 17-12 15-26" className="zs-s-main" />
      <ellipse cx="50" cy="73" rx="21" ry="22" className="zs-f-main" />
      <ellipse cx="40" cy="93" rx="7" ry="4" className="zs-f-deep" />
      <ellipse cx="60" cy="93" rx="7" ry="4" className="zs-f-deep" />
      <path d="M34 34 36 13 48 27Z M66 34 64 13 52 27Z" className="zs-f-main" />
      <circle cx="50" cy="40" r="17" className="zs-f-main" />
      <path d="M38 23 39 17 44 23Z M62 23 61 17 56 23Z" className="zs-f-deep" />
      <ellipse cx="43.5" cy="39" rx="2.2" ry="3.2" className="zs-f-ink zs-blink" />
      <ellipse cx="56.5" cy="39" rx="2.2" ry="3.2" className="zs-f-ink zs-blink" />
      <path d="M47.5 45.5h5L50 48.3Z" className="zs-f-ink" />
      <path d="M36 46h-9M36 49l-8 2M64 46h9M64 49l8 2" className="zs-s-ink" />
      <rect x="38" y="55" width="24" height="4" rx="2" className="zs-f-tag" />
      <circle cx="50" cy="62" r="3" className="zs-f-tag" />
    </g>
  )
}

function PetIcon({ pet }: { pet: Pet }) {
  return (
    <svg viewBox="0 8 100 92" className="zs-pet-ico" aria-hidden>
      {pet === 'dog' ? <Dog /> : <Cat />}
    </svg>
  )
}

/** Шкала на циферблате: у собаки 0–60 кг, у кошки 0–12 кг; весовые группы — цветные дуги. */
function DialScale({ lead, pet }: { lead: Lead; pet: Pet }) {
  const bands = lead.petshop!.parasites[pet].bands
  const max = scaleMax(lead, pet)
  const step = pet === 'dog' ? 10 : 2
  const ticks = Array.from({ length: max / (step / 2) + 1 }, (_, i) => (i * step) / 2)
  return (
    <g className={`zs-ticks zs-ticks-${pet}`}>
      {bands.map((b, i) => (
        <path key={b} d={arc(150, 112, 78, angle((i ? bands[i - 1]! : 0) / max) + 0.8, angle(b / max) - 0.8)} className={`zs-band zs-band-${i % 2}`} />
      ))}
      {ticks.map((t) => {
        const major = t % step === 0
        const [x0, y0] = polar(150, 112, 70, angle(t / max))
        const [x1, y1] = polar(150, 112, major ? 60 : 64, angle(t / max))
        const [lx, ly] = polar(150, 112, 48, angle(t / max))
        return (
          <g key={t}>
            <line x1={x0} y1={y0} x2={x1} y2={y1} className={major ? 'zs-tick zs-tick-major' : 'zs-tick'} />
            {major && (
              <text x={lx} y={ly + 4} textAnchor="middle" className="zs-tick-t">
                {t}
              </text>
            )}
          </g>
        )
      })}
    </g>
  )
}

/** Напольные весы: циферблат со стрелкой, колонна, площадка с питомцем. Стрелка и питомец следуют за ползунком подбора. */
function Scales({ lead, locale, tag = true, className = '' }: { lead: Lead; locale: Locale; tag?: boolean; className?: string }) {
  const dog = lead.petshop!.parasites.dog
  const start = dog.start / scaleMax(lead, 'dog')
  const drops = dog.forms[0]!
  const s = startState(lead, 'dog', locale)
  return (
    <svg viewBox="0 0 300 330" className={`zs-scales ${className}`} style={v({ '--w0': start.toFixed(4) })} aria-hidden>
      <rect x="138" y="196" width="24" height="76" rx="4" className="zs-f-deep" />
      <circle cx="150" cy="112" r="100" className="zs-rim" />
      <circle cx="150" cy="112" r="90" className="zs-face" />
      {PETS.map((pet) => (
        <DialScale key={pet} lead={lead} pet={pet} />
      ))}
      <text x="150" y="160" textAnchor="middle" className="zs-dial-kg">
        <tspan data-o="kg">{kgText(dog.start)}</tspan> {locale === 'ru' ? 'кг' : 'kg'}
      </text>
      <g className="zs-needle">
        <path d="M150 122 147 112 150 38 153 112Z" className="zs-f-tag zs-needle-p" />
        <circle cx="150" cy="112" r="9" className="zs-f-ink" />
        <circle cx="150" cy="112" r="3" className="zs-f-tag" />
      </g>
      <rect x="22" y="270" width="256" height="18" rx="9" className="zs-f-main" />
      <rect x="40" y="288" width="22" height="10" rx="3" className="zs-f-deep" />
      <rect x="238" y="288" width="22" height="10" rx="3" className="zs-f-deep" />
      <g className="zs-on-scale">
        <g className="zs-only-dog">
          <svg x="168" y="172" width="104" height="100" viewBox="0 0 100 97">
            <Dog />
          </svg>
        </g>
        <g className="zs-only-cat">
          <svg x="172" y="176" width="96" height="96" viewBox="0 0 100 97">
            <Cat />
          </svg>
        </g>
      </g>
      {tag && (
        <g className="zs-hang">
          <path d="M66 172C63 188 65 202 66 216" className="zs-string" />
          <g transform="translate(18 212)">
            <path d="M14 0h66l14 12v40a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V12Z" className="zs-f-tag" />
            <circle cx="48" cy="8" r="3.2" className="zs-f-paper" />
            <text x="48" y="28" textAnchor="middle" className="zs-hang-t">
              {locale === 'ru' ? 'Капли' : 'Tomchilar'} {s.label}
            </text>
            <text x="48" y="46" textAnchor="middle" className="zs-hang-p">
              {formatSum(drops.prices[s.band]!, locale)}
            </text>
          </g>
        </g>
      )}
    </svg>
  )
}

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mb-10 max-w-3xl">
      <h2 className="zs-h2">{title}</h2>
      {tag && <div className="mt-3">{tag}</div>}
      {lead && <p className="zs-lead mt-4">{lead}</p>}
    </div>
  )
}

function PhotoArt({ label, className = '' }: PhotoArtProps) {
  return (
    <div className={`relative grid place-items-center bg-bg-2 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-1/3" aria-hidden>
        <Dog />
      </svg>
      <p className="absolute bottom-3 left-4 text-sm">{label}</p>
    </div>
  )
}

function Hero({ lead, locale, langSwitch }: PetshopHeroProps) {
  const ru = locale === 'ru'
  const d = lead.petshop!
  return (
    <header className="zs-hero">
      <div className="zs-top">
        <span>{tx(lead.district, locale)}</span>
        <span className="zs-lang">{langSwitch}</span>
      </div>
      <div className="zs-hero-grid">
        <div className="zs-hero-copy">
          <p className="zs-kicker">{kindLine(lead, locale)}</p>
          <h1 className="zs-name">{brand(locale)}</h1>
        </div>
        <div className="zs-art">
          <Scales lead={lead} locale={locale} />
        </div>
        <div className="zs-hero-copy">
          <p className="zs-statement">
            {ru ? (
              <>
                Средство от блох и клещей — <b>по весу питомца</b>, корм и всё для дома. Отложите заказ — соберём к вашему приходу.
              </>
            ) : (
              <>
                Burga va kanaga qarshi vosita — <b>hayvon vazniga qarab</b>, yem va uy uchun hamma narsa. Buyurtmani ajratib qoʻying — kelishingizga tayyorlaymiz.
              </>
            )}
          </p>
          <div className="zs-cta">
            <a href="#vybor" className="btn btn-lg">
              {ru ? 'Подобрать по весу' : 'Vaznga qarab tanlash'}
            </a>
            <a href={telHref(lead.phones[0]!)} className="btn btn-ghost btn-lg">
              <Phone aria-hidden className="size-5" strokeWidth={STROKE} />
              {formatPhone(lead.phones[0]!)}
            </a>
          </div>
          <ul className="zs-chips">
            {d.vet && (
              <li>
                <Stethoscope aria-hidden className="size-4" strokeWidth={STROKE} />
                {ru ? 'Ветврач здесь же' : 'Veterinar shu yerda'}
              </li>
            )}
            {d.delivery && (
              <li>
                <Truck aria-hidden className="size-4" strokeWidth={STROKE} />
                {ru ? 'Доставка — уточняйте' : 'Yetkazib berish — aniqlang'}
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  )
}

/** Подбор: кто, вес на линейке-ползунке, питомец растёт с весом; ценники трёх форм качаются при смене группы. */
function ScaleSection({ lead, locale }: PetshopSectionProps) {
  const k = copy.scale
  const d = lead.petshop!
  const dog = startState(lead, 'dog', locale)
  return (
    <section id="vybor" className="zs-sec">
      <div className="zs-wrap">
        <Heading title={tx(k.title, locale)} lead={tx(k.lead, locale)} />
        <ScaleRoot lead={lead} locale={locale} className="zs-scale">
          <div className="zs-controls">
            <fieldset className="zs-pets">
              <legend className="zs-label">{tx(k.who, locale)}</legend>
              {PETS.map((pet) => (
                <label key={pet}>
                  <input type="radio" name="ps-pet" value={pet} defaultChecked={pet === 'dog'} className="sr-only" />
                  <span className="zs-pet-btn">
                    <PetIcon pet={pet} />
                    {tx(copy.pets[pet], locale)}
                  </span>
                </label>
              ))}
            </fieldset>
            <div className="zs-readout">
              <p className="zs-kg">
                <b data-o="kg">{kgText(dog.kg)}</b> {locale === 'ru' ? 'кг' : 'kg'}
              </p>
              <p className="zs-band-chip">
                <span className="zs-label">{tx(k.group, locale)}</span> <b data-o="band">{dog.label}</b>
              </p>
            </div>
            <div className="zs-ruler">
              {PETS.map((pet) => {
                const bands = d.parasites[pet].bands
                const max = scaleMax(lead, pet)
                return (
                  <div key={pet} data-pet-only={pet} className="zs-ruler-bands" aria-hidden>
                    {bands.map((b, i) => {
                      const a = i ? bands[i - 1]! : 0
                      return (
                        <span key={b} className={`zs-seg zs-seg-${i % 2}`} style={v({ left: `${(a / max) * 100}%`, width: `${((b - a) / max) * 100}%` })}>
                          <i>{kgText(b)}</i>
                        </span>
                      )
                    })}
                  </div>
                )
              })}
              <WeightRange lead={lead} locale={locale} />
            </div>
          </div>
          <div className="zs-rail">
            {PETS.map((pet) => {
              const s = startState(lead, pet, locale)
              return (
                <ul key={pet} data-pet-forms={pet} className="zs-tags">
                  {d.parasites[pet].forms.map((f, i) => {
                    const add = formAdd(pet, f, s.band, s.label, locale)
                    return (
                      <li key={f.id} data-form={f.id} className="zs-tag" style={v({ '--i': i })}>
                        <span className="zs-tag-hole" aria-hidden />
                        <span className="zs-tag-name">{tx(f.name, locale)}</span>
                        <span className="zs-tag-for">
                          {tx(copy.forPet[pet], locale)} <b data-o="band">{s.label}</b>
                        </span>
                        <span className="zs-tag-note">{tx(f.note, locale)}</span>
                        <span className="zs-tag-price" data-o="price">
                          {formatSum(add.price, locale)}
                        </span>
                        <span className="flex items-center justify-between gap-2">
                          <ExampleTag locale={locale} />
                          <AddButton {...add} locale={locale} stroke={STROKE} className="zs-add" />
                        </span>
                      </li>
                    )
                  })}
                </ul>
              )
            })}
          </div>
          <p className="zs-caution">{tx(k.caution, locale)}</p>
        </ScaleRoot>
      </div>
    </section>
  )
}

/** Витрина: полки-рейки, ценники висят на нитках и качаются от касания. */
function Catalog({ lead, locale }: PetshopSectionProps) {
  const k = copy.catalog
  return (
    <section id="vitrina" className="zs-sec zs-sec-2">
      <div className="zs-wrap">
        <Heading title={tx(k.title, locale)} lead={tx(k.lead, locale)} />
        {lead.petshop!.catalog.map((c) => (
          <div key={c.id} className="zs-shelf">
            <h3 className="zs-shelf-t">{tx(c.name, locale)}</h3>
            <ul className="zs-shelf-rail">
              {c.items.map((it, i) => (
                <li key={it.id} className="zs-ptag" style={v({ '--i': i })}>
                  <span className="zs-tag-hole" aria-hidden />
                  <span className="zs-ptag-name">{tx(it.name, locale)}</span>
                  {it.size && <span className="zs-ptag-size">{tx(it.size, locale)}</span>}
                  <span className="zs-ptag-price">
                    {it.from && (locale === 'ru' ? 'от ' : '')}
                    {formatSum(it.price, locale)}
                    {it.from && locale === 'uz' ? 'dan' : ''}
                  </span>
                  <span className="mt-auto flex items-center justify-between gap-2">
                    <ExampleTag locale={locale} />
                    <AddButton id={it.id} name={`${tx(it.name, locale)}${it.size ? `, ${tx(it.size, locale)}` : ''}`} price={it.price} locale={locale} stroke={STROKE} className="zs-add" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function Clinic({ lead, locale }: PetshopSectionProps) {
  const ru = locale === 'ru'
  if (!lead.petshop!.vet) return null
  return (
    <section className="zs-sec zs-sec-green">
      <div className="zs-wrap zs-clinic">
        <svg viewBox="0 8 100 92" className="zs-clinic-art" aria-hidden>
          <Cat />
        </svg>
        <div>
          <h2 className="zs-h2">{ru ? 'Ветврач — здесь же' : 'Veterinar — shu yerda'}</h2>
          <p className="zs-lead mt-4">
            {ru
              ? 'Магазин работает при ветклинике: если сомневаетесь, что выбрать, — покажите питомца врачу. Приём — по записи, позвоните.'
              : 'Doʻkon veterinariya klinikasi qoshida ishlaydi: nima tanlashni bilmasangiz — hayvoningizni shifokorga koʻrsating. Qabul — yozilish orqali, qoʻngʻiroq qiling.'}
          </p>
          <a href={telHref(lead.phones[0]!)} className="btn btn-lg zs-btn-tag mt-7">
            <Phone aria-hidden className="size-5" strokeWidth={STROKE} />
            {ui.call[locale]}
          </a>
        </div>
      </div>
    </section>
  )
}

function Order({ locale }: PetshopSectionProps) {
  const k = copy.order
  return (
    <section id="zakaz" className="zs-sec">
      <div className="zs-wrap zs-order">
        <div>
          <Heading title={tx(k.title, locale)} lead={tx(k.lead, locale)} />
          <div className="zs-bag" data-cart-target="">
            <span className="zs-bag-handle" aria-hidden />
            <p className="zs-bag-count">
              <CartCount />
            </p>
            <CartList locale={locale} stroke={STROKE} />
          </div>
        </div>
        <div className="zs-form">
          <OrderForm locale={locale} stroke={STROKE} />
          <p className="zs-small mt-5">{tx(k.demo, locale)}</p>
        </div>
      </div>
    </section>
  )
}

function Location({ lead, locale }: PetshopSectionProps) {
  const ru = locale === 'ru'
  const street = lead.map.kind === 'street' ? `${tx(lead.map.street, locale)}, ${lead.map.house}` : tx(lead.address, locale)
  return (
    <section id="adres" className="zs-sec zs-sec-2">
      <div className="zs-wrap zs-where">
        <div>
          <p className="zs-label">{ui.address[locale]}</p>
          <h2 className="zs-street">{street}</h2>
          <p className="zs-lead mt-3">{tx(lead.address, locale)}</p>
          <a href={lead.mapsUrl} target="_blank" rel="noopener" className="btn btn-lg mt-6">
            <MapPin aria-hidden className="size-5" strokeWidth={STROKE} />
            {ui.openMaps[locale]}
          </a>
        </div>
        <dl className="zs-where-facts">
          <div>
            <dt className="zs-label">{tx(copy.hours, locale)}</dt>
            <dd>
              {lead.hours ? tx(lead.hours, locale) : tx(copy.hoursUnknown, locale)}
              {lead.hours && <span className="zs-small block">{ru ? 'По справочнику — уточняйте по телефону' : 'Maʼlumotnoma boʻyicha — telefon orqali aniqlang'}</span>}
            </dd>
          </div>
          <div>
            <dt className="zs-label">{ui.phones[locale]}</dt>
            <dd className="grid">
              {lead.phones.map((p) => (
                <a key={p} href={telHref(p)} className="zs-tel">
                  {formatPhone(p)}
                </a>
              ))}
            </dd>
          </div>
          {lead.instagram && (
            <div>
              <dt className="zs-label">Instagram</dt>
              <dd>
                <a href={instagramHref(lead.instagram)} target="_blank" rel="noopener" className="zs-link">
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

const petshop: PetshopSkin = {
  Hero,
  order: ['scale', 'catalog', 'clinic', 'order', 'location'],
  sections: { scale: ScaleSection, catalog: Catalog, clinic: Clinic, order: Order, location: Location },
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  return (
    <div className="zs-hero zs-og relative h-[630px] w-[1200px] overflow-hidden">
      <div className="absolute top-[40px] left-[60px] h-[560px] w-[510px]">
        <Scales lead={lead} locale={locale} className="zs-still h-full w-full" />
      </div>
      <div className="absolute top-[120px] left-[600px] w-[550px]">
        <p className="zs-kicker !text-[22px]">{kindLine(lead, locale)}</p>
        <p className="zs-name !text-[92px]">{brand(locale)}</p>
        <p className="zs-statement !mt-6 !text-[32px]">
          {locale === 'ru' ? 'Концепт сайта — средство от блох по весу питомца и «Отложить заказ»' : 'Sayt konsepti — hayvon vazniga qarab vosita va «Buyurtmani ajratish»'}
        </p>
      </div>
    </div>
  )
}

export const zooScales: Direction = {
  id: 'zoo-scales',
  fontClass: `${comfortaa.variable} ${firaSans.variable}`,
  css,
  iconStroke: STROKE,
  themeColor: '#0d6b55',
  fontFamilies: ['Comfortaa', 'Fira Sans'],
  heroFont: { family: 'Comfortaa', weight: 700, style: 'normal' },
  Heading,
  PhotoArt,
  Og,
  petshop,
}

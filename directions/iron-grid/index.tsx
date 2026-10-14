import { MapPin, Phone } from 'lucide-react'
import type { CSSProperties } from 'react'
import { ExampleTag } from '@/core/components/ExampleTag'
import { robotoFlex } from '@/core/fonts'
import { formatPhone, formatSum, instagramHref, telHref, yandexSearch } from '@/core/format'
import { ui } from '@/core/i18n'
import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { copy, kindLine } from '@/niches/fitness/content'
import { FitnessBookingForm, FitRoot } from '@/niches/fitness/parts'
import type { FitnessHeroProps, FitnessSectionProps, FitnessSkin } from '@/niches/fitness/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { css } from './style'

const STROKE = 2
const v = (o: Record<string, string | number>) => o as CSSProperties

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mb-10 max-w-3xl">
      <h2 className="ig-h2">{title}</h2>
      {tag && <div className="mt-3">{tag}</div>}
      {lead && <p className="ig-lead mt-4">{lead}</p>}
    </div>
  )
}

function PhotoArt({ label, className = '' }: PhotoArtProps) {
  return (
    <div className={`relative grid place-items-center bg-bg-2 ${className}`}>
      <p className="ig-name !text-[5rem]">BF</p>
      <p className="absolute bottom-3 left-4 text-sm">{label}</p>
    </div>
  )
}

/** Мини-линия в первом экране: четыре станции, по ней бегает «поезд». */
function MiniLine({ lead, locale }: { lead: Lead; locale: Locale }) {
  const clubs = lead.fitness!.clubs
  return (
    <div className="ig-mini" aria-hidden style={v({ '--n': clubs.length })}>
      <span className="ig-mini-track">
        <i className="ig-mini-train" />
      </span>
      {clubs.map((c, i) => (
        <span key={c.id} className="ig-mini-st" style={v({ '--i': i })}>
          <b />
          {tx(c.name, locale)}
        </span>
      ))}
    </div>
  )
}

function Hero({ lead, locale, langSwitch }: FitnessHeroProps) {
  const ru = locale === 'ru'
  const n = lead.fitness!.clubs.length
  return (
    <header className="ig-hero">
      <div className="ig-top">
        <span>{tx(lead.district, locale)}</span>
        <span className="ig-lang">{langSwitch}</span>
      </div>
      <div className="ig-hero-in">
        <p className="ig-kicker">{kindLine(lead, locale)}</p>
        <h1 className="ig-name">
          <span>Buka</span>
          <span className="ig-name-2">Fit</span>
        </h1>
        <MiniLine lead={lead} locale={locale} />
        <p className="ig-statement">
          {ru
            ? `${n} клуба по городу. Выберите свою станцию, цель и время — абонемент и ближайшее занятие за десять секунд.`
            : `Shahar boʻylab ${n} ta klub. Bekatingiz, maqsad va vaqtni tanlang — abonement va eng yaqin mashgʻulot oʻn soniyada.`}
        </p>
        <div className="ig-cta">
          <a href="#vybor" className="btn btn-lg">
            {ru ? 'Подобрать клуб' : 'Klub tanlash'}
          </a>
          <a href={telHref(lead.phones[0]!)} className="btn btn-ghost btn-lg">
            <Phone aria-hidden className="size-5" strokeWidth={STROKE} />
            {formatPhone(lead.phones[0]!)}
          </a>
        </div>
      </div>
    </header>
  )
}

/** Линия метро из клубов: нажатая станция загорается, поезд едет к ней; цель и время → абонемент и занятие. */
function Pick({ lead, locale }: FitnessSectionProps) {
  const f = lead.fitness!
  const k = copy.pick
  return (
    <section id="vybor" className="ig-sec">
      <div className="ig-wrap">
        <Heading title={tx(k.title, locale)} lead={tx(k.lead, locale)} />
        <FitRoot lead={lead} locale={locale} className="ig-pick">
          <fieldset className="ig-line" style={v({ '--n': f.clubs.length })}>
            <legend className="ig-label">{tx(k.club, locale)}</legend>
            <div className="ig-stations">
              <span className="ig-track" aria-hidden>
                <i className="ig-train" />
              </span>
              {f.clubs.map((c, i) => (
                <label key={c.id} className="ig-station" style={v({ '--i': i })}>
                  <input type="radio" name="ft-club" value={c.id} defaultChecked={i === 0} className="sr-only" />
                  <span className="ig-dot" aria-hidden />
                  <span className="ig-st-name">{tx(c.name, locale)}</span>
                  <span className="ig-st-addr">{c.address ? tx(c.address, locale) : tx(k.addressUnknown, locale)}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="ig-side">
            <fieldset className="ig-group">
              <legend className="ig-label">{tx(k.goal, locale)}</legend>
              <div className="ig-chips">
                {f.goals.map((g) => (
                  <label key={g.id}>
                    <input type="radio" name="ft-goal" value={g.id} className="sr-only" />
                    <span className="chip">{tx(g.name, locale)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className="ig-group">
              <legend className="ig-label">{tx(k.time, locale)}</legend>
              <div className="ig-chips">
                {k.times.map((t) => (
                  <label key={t.id}>
                    <input type="radio" name="ft-time" value={t.id} className="sr-only" />
                    <span className="chip">{t[locale]}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="ig-result" aria-live="polite">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="ig-label">{tx(k.club, locale)}</p>
                  <p className="ig-res-club" data-o="club">
                    {tx(f.clubs[0]!.name, locale)}
                  </p>
                  <p className="ig-res-addr" data-o="address" />
                </div>
                <ExampleTag locale={locale} />
              </div>
              <div className="ig-res-more">
                <div className="ig-res-row">
                  <p className="ig-label">{tx(k.plan, locale)}</p>
                  <p className="ig-res-plan">
                    <span data-o="plan" /> · <b data-o="price" />
                  </p>
                  <p className="ig-res-note" data-o="note" />
                </div>
                <div className="ig-res-row">
                  <p className="ig-label">{tx(k.next, locale)}</p>
                  <p className="ig-res-next" data-o="next" />
                </div>
                <a href="#zapis" className="btn btn-lg ig-res-cta">
                  {tx(k.cta, locale)}
                </a>
              </div>
              <p className="ig-res-hint">{locale === 'ru' ? 'Отметьте цель и время — покажем абонемент и занятие.' : 'Maqsad va vaqtni belgilang — abonement va mashgʻulotni koʻrsatamiz.'}</p>
            </div>
          </div>
        </FitRoot>
      </div>
    </section>
  )
}

/** Абонементы — «блины» штанги: чем дольше, тем тяжелее. */
function Plans({ lead, locale }: FitnessSectionProps) {
  const k = copy.plans
  return (
    <section id="abonementy" className="ig-sec ig-sec-2">
      <div className="ig-wrap">
        <Heading title={tx(k.title, locale)} lead={tx(k.lead, locale)} tag={<ExampleTag locale={locale} />} />
        <ul className="ig-plans">
          {lead.fitness!.plans.map((p, i) => (
            <li key={p.id} className="ig-plan" style={v({ '--i': i })}>
              <span className="ig-plate" aria-hidden>
                <i />
              </span>
              <h3 className="ig-plan-t">{tx(p.name, locale)}</h3>
              <p className="ig-plan-p">{formatSum(p.price, locale)}</p>
              <p className="ig-plan-n">{tx(p.note, locale)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Booking({ lead, locale }: FitnessSectionProps) {
  const ru = locale === 'ru'
  return (
    <section id="zapis" className="ig-sec">
      <div className="ig-wrap ig-booking">
        <Heading
          title={ru ? 'Гостевой визит' : 'Mehmon tashrifi'}
          lead={ru ? 'Клуб, абонемент и время уже в заявке — оставьте имя и телефон, администратор перезвонит.' : 'Klub, abonement va vaqt arizada — ism va telefonni qoldiring, administrator qoʻngʻiroq qiladi.'}
        />
        <div className="ig-form">
          <FitnessBookingForm lead={lead} locale={locale} stroke={STROKE} />
        </div>
      </div>
    </section>
  )
}

function Clubs({ lead, locale }: FitnessSectionProps) {
  const ru = locale === 'ru'
  return (
    <section id="adres" className="ig-sec ig-sec-2">
      <div className="ig-wrap">
        <Heading title={ru ? 'Все станции' : 'Barcha bekatlar'} />
        <ol className="ig-clubs">
          {lead.fitness!.clubs.map((c, i) => (
            <li key={c.id}>
              <span className="ig-clubs-n">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="ig-clubs-t">{tx(c.name, locale)}</h3>
              <p>{c.address ? tx(c.address, locale) : tx(copy.pick.addressUnknown, locale)}</p>
              {c.landmark && <p className="ig-small">{tx(c.landmark, locale)}</p>}
              {c.address && (
                <a href={yandexSearch(`Buka Fit ${tx(c.address, 'ru')}`)} target="_blank" rel="noopener" className="ig-link">
                  <MapPin aria-hidden className="size-4" strokeWidth={STROKE} />
                  {ui.openMaps[locale]}
                </a>
              )}
            </li>
          ))}
        </ol>
        <div className="ig-contacts">
          {lead.phones.map((p) => (
            <a key={p} href={telHref(p)} className="ig-tel">
              {formatPhone(p)}
            </a>
          ))}
          {lead.instagram && (
            <a href={instagramHref(lead.instagram)} target="_blank" rel="noopener" className="btn btn-ghost">
              Instagram
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

const fitness: FitnessSkin = {
  Hero,
  order: ['pick', 'plans', 'booking', 'clubs'],
  sections: { pick: Pick, plans: Plans, booking: Booking, clubs: Clubs },
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  return (
    <div className="ig-hero ig-og relative h-[630px] w-[1200px] overflow-hidden">
      <div className="absolute top-[60px] left-[80px] w-[1040px]">
        <p className="ig-kicker !text-[22px]">{kindLine(lead, locale)}</p>
        <p className="ig-name !text-[230px]">
          <span>Buka</span> <span className="ig-name-2">Fit</span>
        </p>
        <MiniLine lead={lead} locale={locale} />
        <p className="ig-statement !mt-8 !text-[30px]">{locale === 'ru' ? 'Концепт сайта: станция → клуб, абонемент и ближайшее занятие' : 'Sayt konsepti: bekat → klub, abonement va eng yaqin mashgʻulot'}</p>
      </div>
    </div>
  )
}

export const ironGrid: Direction = {
  id: 'iron-grid',
  fontClass: robotoFlex.variable,
  css,
  iconStroke: STROKE,
  themeColor: '#121315',
  fontFamilies: ['Roboto Flex'],
  heroFont: { family: 'Roboto Flex', weight: 900, style: 'normal' },
  Heading,
  PhotoArt,
  Og,
  fitness,
}

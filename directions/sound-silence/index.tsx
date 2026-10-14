import { Coffee, Laptop, MapPin, Music, Phone, Send } from 'lucide-react'
import type { CSSProperties } from 'react'
import { ExampleTag } from '@/core/components/ExampleTag'
import { ebGaramond, raleway } from '@/core/fonts'
import { formatPhone, instagramHref, telegramHref, telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { copy, fmtMinutes, kindLine } from '@/niches/wellness/content'
import { QuizRoot, WellnessBookingForm } from '@/niches/wellness/parts'
import type { WellnessHeroProps, WellnessSectionProps, WellnessSkin } from '@/niches/wellness/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { css } from './style'

const STROKE = 1.3
const v = (o: Record<string, string | number>) => o as CSSProperties

/** Поющая чаша: от неё медленно расходятся круги звука. */
function Bowl({ className = '', still = false }: { className?: string; still?: boolean }) {
  return (
    <svg viewBox="0 0 400 400" className={`ss-bowl ${still ? 'ss-still' : ''} ${className}`} aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx="200" cy="232" r="150" className="ss-ring" style={v({ '--i': i })} />
      ))}
      <ellipse cx="200" cy="300" rx="120" ry="12" className="ss-shadow" />
      <path d="M100 232 Q104 296 200 298 Q296 296 300 232 Z" className="ss-bowl-body" />
      <ellipse cx="200" cy="232" rx="100" ry="14" className="ss-bowl-rim" />
      <ellipse cx="200" cy="232" rx="86" ry="9" className="ss-bowl-in" />
      <path d="M262 150 L318 108" className="ss-stick" />
    </svg>
  )
}

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mb-10 max-w-3xl">
      <h2 className="ss-h2">{title}</h2>
      {tag && <div className="mt-3">{tag}</div>}
      {lead && <p className="ss-lead mt-4">{lead}</p>}
    </div>
  )
}

function PhotoArt({ label, className = '' }: PhotoArtProps) {
  return (
    <div className={`relative grid place-items-center bg-bg-2 ${className}`}>
      <Bowl still className="w-1/2" />
      <p className="absolute bottom-3 left-4 text-sm">{label}</p>
    </div>
  )
}

function Hero({ lead, locale, langSwitch }: WellnessHeroProps) {
  const ru = locale === 'ru'
  return (
    <header className="ss-hero">
      <div className="ss-top">
        <span>{tx(lead.district, locale)}</span>
        <span className="ss-lang">{langSwitch}</span>
      </div>
      <div className="ss-hero-in">
        <Bowl className="ss-hero-bowl" />
        <p className="ss-kicker">{kindLine(lead, locale)}</p>
        <h1 className="ss-name">Artha</h1>
        <p className="ss-sub">{ru ? 'йога · саундхилинг · медитация · веган\u2011кафе' : 'yoga · saundxiling · meditatsiya · vegan-kafe'}</p>
        <p className="ss-statement">
          {ru ? 'Выдохните. Ответьте на три вопроса — подскажем практику и ближайшее занятие.' : 'Nafas chiqaring. Uchta savolga javob bering — amaliyot va eng yaqin mashgʻulotni aytamiz.'}
        </p>
        <div className="ss-cta">
          <a href="#vybor" className="btn btn-lg">
            {tx(copy.quiz.title, locale)}
          </a>
          {lead.telegram ? (
            <a href={telegramHref(lead.telegram)} target="_blank" rel="noopener" className="btn btn-ghost btn-lg">
              <Send aria-hidden className="size-5" strokeWidth={STROKE} />
              Telegram
            </a>
          ) : (
            <a href={telHref(lead.phones[0]!)} className="btn btn-ghost btn-lg">
              <Phone aria-hidden className="size-5" strokeWidth={STROKE} />
              {formatPhone(lead.phones[0]!)}
            </a>
          )}
        </div>
      </div>
    </header>
  )
}

/** Три вопроса: от выбранного ответа расходятся круги; результат — практика и ближайшее занятие. */
function Quiz({ lead, locale }: WellnessSectionProps) {
  const w = lead.wellness!
  const k = copy.quiz
  const ru = locale === 'ru'
  return (
    <section id="vybor" className="ss-sec">
      <div className="ss-wrap">
        <Heading title={tx(k.title, locale)} lead={tx(k.lead, locale)} />
        <QuizRoot className="ss-quiz">
          <div className="ss-qs">
            {w.quiz.map((q, qi) => (
              <fieldset key={q.id} className="ss-q">
                <legend className="ss-q-t">
                  <span className="ss-q-n">{qi + 1}</span>
                  {tx(q.q, locale)}
                </legend>
                <div className="ss-opts">
                  {q.options.map((o) => (
                    <label key={o.id}>
                      <input type="radio" name={`wq-${q.id}`} value={o.id} className="sr-only" />
                      <span className="ss-opt">{tx(o.label, locale)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
          <div className="ss-result" aria-live="polite">
            <div className="ss-dots" aria-hidden>
              <i />
              <i />
              <i />
            </div>
            <div className="ss-res-empty">
              <p className="ss-res-hint">{tx(k.again, locale)}</p>
            </div>
            <div className="ss-res-done">
              <div className="flex items-center justify-between gap-3">
                <p className="ss-label">{tx(k.result, locale)}</p>
                <ExampleTag locale={locale} />
              </div>
              <p className="ss-res-name" data-o="practice" />
              <p className="ss-res-about" data-o="about" />
              <p className="ss-res-meta" data-o="meta" />
              <p className="ss-label mt-2">{tx(k.next, locale)}</p>
              <p className="ss-res-next" data-o="next" />
            </div>
            <a href="#zapis" data-o="cta" aria-disabled="true" className="btn btn-lg ss-res-cta">
              <span data-o="cta-text">{tx(k.again, locale)}</span>
            </a>
            <p className="ss-small">{ru ? 'Расписание и цены — пример.' : 'Jadval va narxlar — namuna.'}</p>
          </div>
        </QuizRoot>
      </div>
    </section>
  )
}

/** Неделя: семь колонок, фильтр по виду практики (CSS :has), «сегодня» отмечает островок. */
function Week({ lead, locale }: WellnessSectionProps) {
  const w = lead.wellness!
  const k = copy.week
  const byId = Object.fromEntries(w.practices.map((p) => [p.id, p]))
  const order = [1, 2, 3, 4, 5, 6, 0]
  const filters = w.kinds.map((x) => `.ss-week:has(input[name=wk-kind][value="${x.id}"]:checked) .ss-class:not([data-kind="${x.id}"]){display:none}`).join('')
  return (
    <section id="raspisanie" className="ss-sec ss-sec-2">
      <style dangerouslySetInnerHTML={{ __html: filters }} />
      <div className="ss-wrap ss-week" data-week="">
        <Heading title={tx(k.title, locale)} lead={tx(k.lead, locale)} tag={<ExampleTag locale={locale} />} />
        <fieldset className="ss-filter">
          <legend className="sr-only">{tx(k.title, locale)}</legend>
          <label>
            <input type="radio" name="wk-kind" value="all" defaultChecked className="sr-only" />
            <span className="chip">{tx(k.all, locale)}</span>
          </label>
          {w.kinds.map((x) => (
            <label key={x.id}>
              <input type="radio" name="wk-kind" value={x.id} className="sr-only" />
              <span className="chip">{tx(x.name, locale)}</span>
            </label>
          ))}
        </fieldset>
        <div className="ss-days">
          {order.map((d) => (
            <div key={d} data-day={d} className="ss-day">
              <p className="ss-day-t">
                {copy.days[locale][d]}
                <span className="ss-today">{tx(k.today, locale)}</span>
              </p>
              <ul>
                {w.week
                  .filter((c) => c.day === d)
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((c) => {
                    const p = byId[c.practice]!
                    return (
                      <li key={c.time + c.practice} className="ss-class" data-kind={p.kind}>
                        <span className="ss-class-time">{c.time}</span>
                        <span className="ss-class-name">{tx(p.name, locale)}</span>
                        <span className="ss-class-meta">{fmtMinutes(p.minutes, locale)}</span>
                      </li>
                    )
                  })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const SPACE_ICONS = [Coffee, Laptop, Music]
function Space({ lead, locale }: WellnessSectionProps) {
  const ru = locale === 'ru'
  const items = lead.wellness!.space ?? []
  if (!items.length) return null
  return (
    <section className="ss-sec ss-sec-sage">
      <div className="ss-wrap">
        <Heading title={ru ? 'После практики' : 'Amaliyotdan keyin'} />
        <ul className="ss-space">
          {items.map((it, i) => {
            const Icon = SPACE_ICONS[i % SPACE_ICONS.length]!
            return (
              <li key={it.title.ru} style={v({ '--i': i })}>
                <Icon aria-hidden className="ss-space-ico" strokeWidth={STROKE} />
                <h3 className="ss-space-t">{tx(it.title, locale)}</h3>
                <p>{tx(it.text, locale)}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

function Booking({ lead, locale }: WellnessSectionProps) {
  const ru = locale === 'ru'
  return (
    <section id="zapis" className="ss-sec">
      <div className="ss-wrap ss-booking">
        <Heading
          title={ru ? 'Запись' : 'Yozilish'}
          lead={ru ? 'Практика, дата и время уже в заявке — оставьте имя и телефон, мы подтвердим место.' : 'Amaliyot, sana va vaqt arizada — ism va telefonni qoldiring, joyni tasdiqlaymiz.'}
        />
        <div className="ss-form">
          <WellnessBookingForm lead={lead} locale={locale} stroke={STROKE} />
        </div>
      </div>
    </section>
  )
}

function Location({ lead, locale }: WellnessSectionProps) {
  const street = lead.map.kind === 'street' ? `${tx(lead.map.street, locale)}, ${lead.map.house}` : tx(lead.address, locale)
  return (
    <section id="adres" className="ss-sec ss-sec-2">
      <div className="ss-wrap ss-where">
        <div>
          <p className="ss-label">{ui.address[locale]}</p>
          <h2 className="ss-street">{street}</h2>
          <p className="ss-lead mt-3">{tx(lead.address, locale)}</p>
          <a href={lead.mapsUrl} target="_blank" rel="noopener" className="btn btn-lg mt-6">
            <MapPin aria-hidden className="size-5" strokeWidth={STROKE} />
            {ui.openMaps[locale]}
          </a>
        </div>
        <div>
          <dl className="ss-facts">
            <div>
              <dt className="ss-label">{ui.phones[locale]}</dt>
              <dd>
                {lead.phones.map((p) => (
                  <a key={p} href={telHref(p)} className="ss-tel">
                    {formatPhone(p)}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
          <div className="ss-social">
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
    </section>
  )
}

const wellness: WellnessSkin = {
  Hero,
  order: ['quiz', 'week', 'space', 'booking', 'location'],
  sections: { quiz: Quiz, week: Week, space: Space, booking: Booking, location: Location },
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  return (
    <div className="ss-hero ss-og relative h-[630px] w-[1200px] overflow-hidden">
      <div className="absolute top-[40px] right-[60px] w-[560px]">
        <Bowl still />
      </div>
      <div className="absolute top-[150px] left-[90px] w-[560px]">
        <p className="ss-kicker !text-left !text-[20px]">{kindLine(lead, locale)}</p>
        <p className="ss-name !text-left !text-[170px]">Artha</p>
        <p className="ss-statement !mx-0 !text-left !text-[30px]">
          {locale === 'ru' ? 'Концепт сайта: три вопроса — практика и ближайшее занятие' : 'Sayt konsepti: uchta savol — amaliyot va eng yaqin mashgʻulot'}
        </p>
      </div>
    </div>
  )
}

export const soundSilence: Direction = {
  id: 'sound-silence',
  fontClass: `${ebGaramond.variable} ${raleway.variable}`,
  css,
  iconStroke: STROKE,
  themeColor: '#efe6d6',
  fontFamilies: ['EB Garamond', 'Raleway'],
  heroFont: { family: 'EB Garamond', weight: 400, style: 'italic' },
  Heading,
  PhotoArt,
  Og,
  wellness,
}

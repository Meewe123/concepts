import { Phone } from 'lucide-react'
import { ExampleTag } from '@/core/components/ExampleTag'
import { formatSum, groupDigits, telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { NBSP, tx } from '@/core/text'
import type { DentalConcern, Lead, Locale } from '@/core/types'
import type { Direction } from '@/directions/types'
import { copy, monthly, MONTHS } from './content'

/** «300 000 сум» или «6 000 000 – 12 000 000 сум» */
export function priceRange(from: number, to: number, locale: Locale): string {
  return from === to ? formatSum(from, locale) : `${groupDigits(from)}${NBSP}– ${formatSum(to, locale)}`
}

/**
 * Сигнатура ниши dental: «Что вас беспокоит?» — шесть вариантов, под выбранным появляется ориентир.
 * Работает без JS: варианты — радиокнопки, нужная панель показывается через :has() (globals.css),
 * платёж в месяц посчитан заранее для 6 и 12 месяцев. Островок только пишет выбор в хеш адреса,
 * восстанавливает его по ссылке и передаёт выбор в форму записи.
 */
export function ConcernPicker({ lead, locale, dir }: { lead: Lead; locale: Locale; dir: Direction }) {
  const skin = dir.dental!
  const c = copy.concern
  const concerns = lead.dental!.concerns
  return (
    <div data-concern="" className="dc">
      <fieldset className="dc-options">
        <legend className="sr-only">{tx(c.title, locale)}</legend>
        {concerns.map((x, i) => (
          <label key={x.id} className="dc-opt">
            <input type="radio" name="dc-concern" value={x.id} data-label={tx(copy.labels[x.id], locale)} className="sr-only" />
            <span className="dc-card">
              {skin.OptionMark && <skin.OptionMark id={x.id} index={i} />}
              <span className="dc-label">{tx(copy.labels[x.id], locale)}</span>
            </span>
          </label>
        ))}
      </fieldset>
      <div className="dc-results" aria-live="polite">
        <p className="dc-empty">{tx(c.empty, locale)}</p>
        {concerns.map((x) => (x.id === 'pain' ? <PainPanel key={x.id} lead={lead} locale={locale} dir={dir} /> : <PricePanel key={x.id} concern={x} locale={locale} />))}
      </div>
    </div>
  )
}

function PainPanel({ lead, locale, dir }: { lead: Lead; locale: Locale; dir: Direction }) {
  return (
    <div className="dc-panel dc-pain" data-panel="pain">
      <p className="dc-calm">{tx(copy.concern.pain, locale)}</p>
      <div className="dc-actions">
        <a href="#zapis" className="btn btn-lg" data-book="pain">
          {tx(copy.bookExam, locale)}
        </a>
        <a href={telHref(lead.phones[0]!)} className="btn btn-ghost btn-lg">
          <Phone aria-hidden className="size-5" strokeWidth={dir.iconStroke} />
          {ui.call[locale]}
        </a>
      </div>
    </div>
  )
}

function PricePanel({ concern: x, locale }: { concern: DentalConcern; locale: Locale }) {
  const c = copy.concern
  const p = x.price!
  return (
    <div className="dc-panel" data-panel={x.id}>
      <div className="dc-head">
        <span className="dc-head-label">{tx(c.price, locale)}</span>
        {x.example && <ExampleTag locale={locale} large />}
      </div>
      <p className="dc-price">{priceRange(p.from, p.to, locale)}</p>
      {x.note && <p className="dc-note">{tx(x.note, locale)}</p>}
      <dl className="dc-facts">
        <div>
          <dt>{tx(c.visits, locale)}</dt>
          <dd>{tx(x.visits!, locale)}</dd>
        </div>
        <div>
          <dt>{tx(c.duration, locale)}</dt>
          <dd>{tx(x.duration!, locale)}</dd>
        </div>
      </dl>
      {x.installment && (
        <div className="dc-plan">
          <fieldset className="dc-months">
            <legend className="dc-head-label">{tx(c.installment, locale)}</legend>
            {MONTHS.map((m, i) => (
              <label key={m}>
                <input type="radio" name={`dc-months-${x.id}`} value={m} defaultChecked={i === 0} className="sr-only" />
                <span className="chip">
                  {m}
                  {NBSP}
                  {tx(c.months, locale)}
                </span>
              </label>
            ))}
          </fieldset>
          {MONTHS.map((m) => (
            <p key={m} className="dc-monthly" data-m={m}>
              ≈{NBSP}
              {priceRange(monthly(p.from, m), monthly(p.to, m), locale)} <span className="dc-per">{tx(c.perMonth, locale)}</span>
            </p>
          ))}
          <p className="dc-small">{tx(c.installmentNote, locale)}</p>
        </div>
      )}
      <p className="dc-small">{tx(c.consult, locale)}</p>
      <a href="#zapis" className="btn btn-lg dc-cta" data-book={x.id}>
        {tx(copy.bookConsult, locale)}
      </a>
    </div>
  )
}

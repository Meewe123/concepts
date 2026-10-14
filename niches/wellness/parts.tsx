import type { ReactNode } from 'react'
import { DemoForm } from '@/core/components/DemoForm'
import { formLabels } from '@/core/components/formLabels'
import { StickyBar } from '@/core/components/StickyBar'
import { groupDigits } from '@/core/format'
import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { copy, fmtMinutes } from './content'

/**
 * Контракт с островком (niches/wellness/island.ts), конфиг — script#wl-cfg:
 * [data-quiz]: input[name=wq-<id вопроса>] (радио), [data-o=practice|about|meta|next], [data-o=cta] > [data-o=cta-text];
 *   у корня data-state=empty|done, data-pick=<id практики>.
 * [data-week]: [data-day=<0…6>] — островок ставит data-today; [data-kind] у занятий, фильтр — input[name=wk-kind] (CSS :has).
 */
export interface WellnessConfig {
  locale: Locale
  practices: Record<string, { name: string; about: string; meta: string; tags: string[] }>
  week: { day: number; time: string; practice: string }[]
  labels: { today: string; tomorrow: string; days: string[]; none: string; bookThis: string; again: string; in: string }
}

export function WellnessConfigScript({ lead, locale }: { lead: Lead; locale: Locale }) {
  const w = lead.wellness!
  const cfg: WellnessConfig = {
    locale,
    practices: Object.fromEntries(
      w.practices.map((p) => [
        p.id,
        {
          name: tx(p.name, locale),
          about: tx(p.about, locale),
          meta: `${fmtMinutes(p.minutes, locale)} · ${p.donation ? tx(copy.quiz.donation, locale) : `${p.price.toLocaleString('ru-RU').replace(/ |\s/g, ' ')} ${locale === 'ru' ? 'сум' : 'soʻm'}`}`,
          tags: p.tags,
        },
      ]),
    ),
    week: w.week,
    labels: {
      today: locale === 'ru' ? 'Сегодня' : 'Bugun',
      tomorrow: locale === 'ru' ? 'Завтра' : 'Ertaga',
      days: copy.days[locale],
      none: tx(copy.quiz.none, locale),
      bookThis: tx(copy.quiz.bookThis, locale),
      again: tx(copy.quiz.again, locale),
      in: locale === 'ru' ? 'в' : 'soat',
    },
  }
  return <script type="application/json" id="wl-cfg" data-concept="" dangerouslySetInnerHTML={{ __html: JSON.stringify(cfg) }} />
}

export function QuizRoot({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div data-quiz="" data-state="empty" className={className}>
      {children}
    </div>
  )
}

export function WellnessBookingForm({ lead, locale, stroke }: { lead: Lead; locale: Locale; stroke: number }) {
  const k = copy.form
  return (
    <DemoForm
      stroke={stroke}
      date={{ label: tx(k.date, locale), required: false }}
      time={{ label: tx(k.time, locale) }}
      choices={[{ name: 'practice', label: tx(k.practice, locale), options: lead.wellness!.practices.map((p) => tx(p.name, locale)) }]}
      labels={formLabels(locale, tx(k.required, locale))}
    />
  )
}

export function WellnessStickyBar({ lead, locale, stroke }: { lead: Lead; locale: Locale; stroke: number }) {
  return <StickyBar label={tx(copy.book, locale)} phone={lead.phones[0]!} locale={locale} stroke={stroke} href="#zapis" />
}

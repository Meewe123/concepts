import type { CSSProperties, ReactNode } from 'react'
import { DemoForm } from '@/core/components/DemoForm'
import { formLabels } from '@/core/components/formLabels'
import { StickyBar } from '@/core/components/StickyBar'
import { groupDigits } from '@/core/format'
import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { copy } from './content'

/**
 * Контракт с островком (niches/fitness/island.ts), конфиг внутри корня [data-fit]:
 * input[name=ft-club] (станции), input[name=ft-goal], input[name=ft-time];
 * [data-o=club|address|plan|price|note|next], [data-o=cta] > [data-o=cta-text]; у корня --pos (0…1) и data-club.
 */
export interface FitConfig {
  clubs: Record<string, { name: string; address: string }>
  order: string[]
  goals: Record<string, string>
  plans: Record<string, { name: string; price: string; note: string }>
  classes: { club: string; day: number; time: string; name: string }[]
  labels: { today: string; tomorrow: string; days: string[]; none: string; cta: string }
}

export function FitRoot({ lead, locale, children, className = '' }: { lead: Lead; locale: Locale; children: ReactNode; className?: string }) {
  const f = lead.fitness!
  const sum = locale === 'ru' ? 'сум' : 'soʻm'
  const cfg: FitConfig = {
    clubs: Object.fromEntries(f.clubs.map((c) => [c.id, { name: tx(c.name, locale), address: c.address ? tx(c.address, locale) : tx(copy.pick.addressUnknown, locale) }])),
    order: f.clubs.map((c) => c.id),
    goals: Object.fromEntries(f.goals.map((g) => [g.id, g.plan])),
    plans: Object.fromEntries(f.plans.map((p) => [p.id, { name: tx(p.name, locale), price: `${groupDigits(p.price)} ${sum}`, note: tx(p.note, locale) }])),
    classes: f.classes.map((c) => ({ club: c.club, day: c.day, time: c.time, name: tx(c.name, locale) })),
    labels: {
      today: locale === 'ru' ? 'Сегодня' : 'Bugun',
      tomorrow: locale === 'ru' ? 'Завтра' : 'Ertaga',
      days: copy.days[locale],
      none: tx(copy.pick.none, locale),
      cta: tx(copy.pick.cta, locale),
    },
  }
  return (
    <div data-fit="" data-club={f.clubs[0]!.id} className={className} style={{ '--pos': 0 } as CSSProperties}>
      <script type="application/json" data-concept="" dangerouslySetInnerHTML={{ __html: JSON.stringify(cfg) }} />
      {children}
    </div>
  )
}

export function FitnessBookingForm({ lead, locale, stroke }: { lead: Lead; locale: Locale; stroke: number }) {
  const f = lead.fitness!
  const k = copy.form
  return (
    <DemoForm
      stroke={stroke}
      date={{ label: tx(k.date, locale), required: false }}
      time={{ label: tx(k.time, locale) }}
      choices={[
        { name: 'club', label: tx(k.club, locale), options: f.clubs.map((c) => tx(c.name, locale)) },
        { name: 'plan', label: tx(k.plan, locale), options: f.plans.map((p) => tx(p.name, locale)) },
      ]}
      labels={formLabels(locale, tx(k.required, locale))}
    />
  )
}

export function FitnessStickyBar({ lead, locale, stroke }: { lead: Lead; locale: Locale; stroke: number }) {
  return <StickyBar label={tx(copy.book, locale)} phone={lead.phones[0]!} locale={locale} stroke={stroke} href="#zapis" />
}

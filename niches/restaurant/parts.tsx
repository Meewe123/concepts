import type { ReactNode } from 'react'
import { DemoForm } from '@/core/components/DemoForm'
import { formLabels } from '@/core/components/formLabels'
import { StickyBar } from '@/core/components/StickyBar'
import { tx } from '@/core/text'
import type { BeautySchedule, Lead, Locale } from '@/core/types'
import { copy } from './content'

/**
 * Контракт с островком (niches/restaurant/island.ts), корень [data-bron] с конфигом внутри:
 * input[name=rb-zone] (радио, value = id зоны), input[name=rb-guests] (радио, число),
 * [data-o=days] + template[data-tpl=day] (input[name=rb-day], [data-f=label|date]),
 * [data-o=times] + template[data-tpl=time] (input[name=rb-time], [data-f=time]), [data-o=notimes],
 * [data-table] (data-zone, data-seats) — островок ставит data-fit; [data-o=fit|summary], [data-o=cta] > [data-o=cta-text].
 * У корня: data-zone, data-guests, data-season=off (сезонная зона вне сезона).
 */
export interface BronConfig {
  locale: Locale
  schedule: BeautySchedule
  zones: Record<string, { name: string; seasonal: boolean }>
  labels: { today: string; tomorrow: string; pick: string; bookAt: string; guests: [string, string, string] }
}

export function BronRoot({ lead, locale, children, className = '' }: { lead: Lead; locale: Locale; children: ReactNode; className?: string }) {
  const r = lead.restaurant!
  const cfg: BronConfig = {
    locale,
    schedule: r.schedule,
    zones: Object.fromEntries(r.zones.map((z) => [z.id, { name: tx(z.name, locale), seasonal: !!z.seasonal }])),
    labels: {
      today: tx(copy.bron.today, locale),
      tomorrow: tx(copy.bron.tomorrow, locale),
      pick: tx(copy.bron.pick, locale),
      bookAt: tx(copy.bron.bookAt, locale),
      guests: locale === 'ru' ? ['гость', 'гостя', 'гостей'] : ['mehmon', 'mehmon', 'mehmon'],
    },
  }
  return (
    <div data-bron="" data-zone={r.zones[0]!.id} data-guests={r.guests[0]} className={className}>
      <script type="application/json" data-concept="" dangerouslySetInnerHTML={{ __html: JSON.stringify(cfg) }} />
      {children}
    </div>
  )
}

export function RestaurantBookingForm({ lead, locale, stroke }: { lead: Lead; locale: Locale; stroke: number }) {
  const r = lead.restaurant!
  const k = copy.form
  return (
    <DemoForm
      stroke={stroke}
      date={{ label: tx(k.date, locale), required: false }}
      time={{ label: tx(k.time, locale) }}
      number={{ name: 'guests', label: tx(k.guests, locale), value: r.guests[0]!, min: 1, max: 40, step: 1 }}
      choices={[{ name: 'zone', label: tx(k.zone, locale), options: r.zones.map((z) => tx(z.name, locale)) }]}
      labels={formLabels(locale, tx(k.required, locale))}
    />
  )
}

export function RestaurantStickyBar({ lead, locale, stroke }: { lead: Lead; locale: Locale; stroke: number }) {
  return <StickyBar label={tx(copy.book, locale)} phone={lead.phones[0]!} locale={locale} stroke={stroke} href="#bron" />
}

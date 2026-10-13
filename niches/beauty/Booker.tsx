import type { ReactNode } from 'react'
import { DemoForm } from '@/core/components/DemoForm'
import { formLabels } from '@/core/components/formLabels'
import { StickyBar } from '@/core/components/StickyBar'
import { tx } from '@/core/text'
import type { BeautySchedule, Lead, Locale } from '@/core/types'
import { copy } from './content'

/** Конфиг островка записи (niches/beauty/island.ts). */
export interface BookerConfig {
  locale: Locale
  seed: string
  schedule: BeautySchedule
  services: Record<string, { name: string; minutes: number; price: number; from: boolean }>
  variants: Record<string, { k: number; t: number }>
  labels: { today: string; tomorrow: string; chooseSlot: string; bookAt: string }
}

/**
 * Корень сигнатуры «услуга → длительность, цена, ближайшие окна → запись».
 * Разметку внутри рисует направление; контракт с островком:
 *   input[name=bk-service] (value — id услуги), input[name=bk-variant], input[name=bk-branch];
 *   [data-o=name|duration|price|cta-text|until] (until — «17:00 — 18:30» для выбранного окна), a[data-o=cta];
 *   [data-o=slots] — контейнер окон, <template data-tpl=slot> с input[name=bk-slot] и [data-f=day|time];
 *   [data-o=noslots]; у корня data-state = empty | picked | slot (по нему CSS показывает части).
 *   data-burst у корня — конфетти при выборе окна.
 */
export function BookerRoot({
  lead,
  locale,
  children,
  className = '',
  burst = false,
}: {
  lead: Lead
  locale: Locale
  children: ReactNode
  className?: string
  burst?: boolean
}) {
  const b = lead.beauty!
  const cfg: BookerConfig = {
    locale,
    seed: lead.slug,
    schedule: b.schedule,
    services: Object.fromEntries(b.services.map((s) => [s.id, { name: tx(s.name, locale), minutes: s.minutes, price: s.price, from: !!s.from }])),
    variants: Object.fromEntries((b.variants?.items ?? []).map((v) => [v.id, { k: v.k, t: v.t }])),
    labels: {
      today: tx(copy.when.today, locale),
      tomorrow: tx(copy.when.tomorrow, locale),
      chooseSlot: tx(copy.pick.chooseSlot, locale),
      bookAt: tx(copy.pick.bookAt, locale),
    },
  }
  return (
    <div data-booker="" data-state="empty" data-burst={burst ? '' : undefined} className={className}>
      <script type="application/json" data-concept="" dangerouslySetInnerHTML={{ __html: JSON.stringify(cfg) }} />
      {children}
    </div>
  )
}

/** Демо-форма записи: услуга (без выбора по умолчанию), филиал, дата и время из выбранного окна. */
export function BookingForm({ lead, locale, stroke }: { lead: Lead; locale: Locale; stroke: number }) {
  const b = lead.beauty!
  const k = copy.booking
  return (
    <DemoForm
      stroke={stroke}
      date={{ label: tx(k.date, locale), required: false }}
      time={{ label: tx(k.time, locale) }}
      choices={[
        ...(b.branches && b.branches.length > 1 ? [{ name: 'branch', label: tx(k.branch, locale), options: b.branches.map((x) => tx(x.name, locale)) }] : []),
        { name: 'service', label: tx(k.service, locale), options: b.services.map((s) => tx(s.name, locale)), noDefault: true },
      ]}
      labels={formLabels(locale, tx(k.required, locale))}
    />
  )
}

export function BeautyStickyBar({ lead, locale, stroke }: { lead: Lead; locale: Locale; stroke: number }) {
  return <StickyBar label={tx(copy.book, locale)} phone={lead.phones[0]!} locale={locale} stroke={stroke} href="#zapis" />
}

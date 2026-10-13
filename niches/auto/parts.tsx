import type { ReactNode } from 'react'
import { DemoForm } from '@/core/components/DemoForm'
import { formLabels } from '@/core/components/formLabels'
import { StickyBar } from '@/core/components/StickyBar'
import { tx } from '@/core/text'
import type { BeautySchedule, Lead, Locale } from '@/core/types'
import { copy, total } from './content'

/**
 * Контракт с островком (niches/auto/island.ts). Конфиг — один на страницу: script#au-cfg.
 * [data-calc]: input[name=au-class] (радио), input[name=au-svc] (флажки), [data-o=price|minutes|ready],
 *   [data-o=timeline] (островок кладёт сегменты по услугам), [data-o=slots] + template[data-tpl=slot]
 *   (input[name=au-slot], [data-f=day|time]), [data-o=noslots], [data-o=cta] > [data-o=cta-text].
 * [data-queue]: [data-o=q-cars|q-wait|q-state], data-state=open|closed; [data-h=<час>] — столбики графика (островок ставит data-now).
 */
export interface AutoConfig {
  locale: Locale
  seed: string
  classes: Record<string, { k: number; t: number; name: string }>
  services: Record<string, { price: number; minutes: number; name: string }>
  schedule: BeautySchedule
  load: number[]
  maxWait: number
  labels: {
    sum: string
    h: string
    m: string
    ready: string
    readyClosed: string
    readyLate: string
    pickOne: string
    today: string
    tomorrow: string
    pick: string
    bookAt: string
  }
}

export function AutoConfigScript({ lead, locale }: { lead: Lead; locale: Locale }) {
  const a = lead.auto!
  const k = copy.calc
  const cfg: AutoConfig = {
    locale,
    seed: lead.slug,
    classes: Object.fromEntries(a.classes.map((c) => [c.id, { k: c.k, t: c.t, name: tx(c.name, locale) }])),
    services: Object.fromEntries(a.services.map((s) => [s.id, { price: s.price, minutes: s.minutes, name: tx(s.name, locale) }])),
    schedule: a.schedule,
    load: a.load,
    maxWait: a.maxWait,
    labels: {
      sum: locale === 'ru' ? 'сум' : 'soʻm',
      h: locale === 'ru' ? 'ч' : 'soat',
      m: locale === 'ru' ? 'мин' : 'daq',
      ready: tx(k.ready, locale),
      readyClosed: tx(k.readyClosed, locale),
      readyLate: tx(k.readyLate, locale),
      pickOne: tx(k.pickOne, locale),
      today: tx(copy.slots.today, locale),
      tomorrow: tx(copy.slots.tomorrow, locale),
      pick: tx(copy.slots.pick, locale),
      bookAt: tx(copy.slots.bookAt, locale),
    },
  }
  return <script type="application/json" id="au-cfg" data-concept="" dangerouslySetInnerHTML={{ __html: JSON.stringify(cfg) }} />
}

/** Стартовый расчёт для серверной разметки: первый класс и первая услуга. */
export function startTotal(lead: Lead) {
  const a = lead.auto!
  return total([a.services[0]!], a.classes[0]!)
}

export function CalcRoot({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div data-calc="" className={className}>
      {children}
    </div>
  )
}

/** Часы графика загрузки: [час, доля]; «тихие» — три самых свободных часа. */
export function loadHours(lead: Lead): { hour: number; load: number; quiet: boolean }[] {
  const a = lead.auto!
  const open = Number(a.schedule.open.slice(0, 2))
  const quiet = [...a.load.map((l, i) => [l, i] as const)].sort((x, y) => x[0] - y[0]).slice(0, 3).map(([, i]) => i)
  return a.load.map((load, i) => ({ hour: open + i, load, quiet: quiet.includes(i) }))
}

export function AutoBookingForm({ lead, locale, stroke }: { lead: Lead; locale: Locale; stroke: number }) {
  const k = copy.form
  return (
    <DemoForm
      stroke={stroke}
      hidden={['services']}
      date={{ label: tx(k.date, locale), required: false }}
      time={{ label: tx(k.time, locale) }}
      choices={[{ name: 'car', label: tx(k.car, locale), options: lead.auto!.classes.map((c) => tx(c.name, locale)) }]}
      labels={formLabels(locale, tx(k.required, locale))}
    />
  )
}

export function AutoStickyBar({ lead, locale, stroke }: { lead: Lead; locale: Locale; stroke: number }) {
  return <StickyBar label={tx(copy.book, locale)} phone={lead.phones[0]!} locale={locale} stroke={stroke} href="#zapis" />
}

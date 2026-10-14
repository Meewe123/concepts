import type { CSSProperties, ReactNode } from 'react'
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

/**
 * Блюдо «пока не кончится»: корень [data-pot] с конфигом; островок ставит data-pot = soon | serving | out,
 * --level (0…1) — сколько осталось в казане, и текст в [data-o=pot]. Уровень — по времени (демо):
 * на рабочем сайте его отмечает повар кнопкой в Telegram-боте.
 */
export interface PotConfig {
  locale: Locale
  from: string
  until: string
  days: number[]
  labels: { soon: string; serving: string; out: string; tomorrow: string; weekdays: string[] }
}

export function PotRoot({ lead, locale, children, className = '' }: { lead: Lead; locale: Locale; children: ReactNode; className?: string }) {
  const r = lead.restaurant!
  const pot = r.pot!
  const dish = tx(pot.dish, locale)
  const ru = locale === 'ru'
  const cfg: PotConfig = {
    locale,
    from: pot.from,
    until: pot.until,
    days: r.schedule.days,
    labels: ru
      ? {
          soon: `${dish} будет готов к ${pot.from} — казан уже на огне`,
          serving: `${dish}: в казане сейчас около {pct}%`,
          out: `${dish} на сегодня закончился — следующий казан {next}, с ${pot.from}`,
          tomorrow: 'завтра',
          weekdays: ['в воскресенье', 'в понедельник', 'во вторник', 'в среду', 'в четверг', 'в пятницу', 'в субботу'],
        }
      : {
          soon: `${dish} soat ${pot.from} ga tayyor boʻladi — qozon olovda`,
          serving: `${dish}: qozonda hozir taxminan {pct}%`,
          out: `${dish} bugunga tugadi — keyingi qozon {next}, soat ${pot.from} dan`,
          tomorrow: 'ertaga',
          weekdays: ['yakshanba', 'dushanba', 'seshanba', 'chorshanba', 'payshanba', 'juma', 'shanba'],
        },
  }
  return (
    <div data-pot="soon" className={className} style={{ '--level': 1 } as CSSProperties}>
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

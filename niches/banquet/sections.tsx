import { Camera, Flower2, Mic, Music } from 'lucide-react'
import { DemoForm } from '@/core/components/DemoForm'
import { formLabels } from '@/core/components/formLabels'
import { StickyBar } from '@/core/components/StickyBar'
import { ExampleTag } from '@/core/components/ExampleTag'
import { Faq } from '@/core/components/Faq'
import { LocationSection } from '@/core/components/LocationSection'
import { Section } from '@/core/components/Section'
import { formatSum } from '@/core/format'
import { ui } from '@/core/i18n'
import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import type { Direction } from '@/directions/types'
import { capacityLabel, copy, type IncludeIcon } from './content'
import { HallPlanner } from './HallPlanner'

export interface BanquetSectionProps {
  lead: Lead
  locale: Locale
  dir: Direction
}

function banquet(lead: Lead) {
  if (!lead.banquet) throw new Error(`lead ${lead.slug}: нет данных banquet`)
  return lead.banquet
}

export function PlannerSection({ lead, locale, dir }: BanquetSectionProps) {
  const data = banquet(lead)
  const p = copy.planner
  return (
    <Section id="zal">
      <dir.Heading title={tx(p.title, locale)} lead={tx(p.lead, locale)} />
      <HallPlanner
        direction={dir.id}
        config={{
          locale,
          halls: data.halls.map((h) => ({
            id: h.id,
            name: tx(h.name, locale),
            capacity: h.capacity,
            capacityLabel: tx(capacityLabel(h.capacity), locale),
          })),
          packages: data.packages.map((pk) => ({ id: pk.id, name: tx(pk.name, locale), price: pk.pricePerGuest })),
          defaultGuests: data.defaultGuests,
        }}
        labels={{
          sliderLabel: tx(p.sliderLabel, locale),
          perTable: tx(p.perTable, locale),
          fits: tx(p.fits, locale),
          package: tx(p.package, locale),
          estimate: tx(p.estimate, locale),
          note: tx(p.note, locale),
          example: ui.example[locale],
          legend: tx(p.legend, locale),
          stage: tx(p.stage, locale),
          floor: tx(p.floor, locale),
        }}
      />
    </Section>
  )
}

export function DefaultHalls({ lead, locale, dir }: BanquetSectionProps) {
  const data = banquet(lead)
  return (
    <Section id="zaly" alt>
      <dir.Heading title={tx(copy.halls.title, locale)} lead={tx(copy.halls.lead, locale)} tag={<ExampleTag locale={locale} />} />
      <ul className="grid gap-6 sm:grid-cols-3">
        {data.halls.map((h, i) => (
          <li key={h.id} className="grid gap-4">
            <dir.PhotoArt seed={i + 1} label={ui.photosHere[locale]} className="aspect-[4/5]" />
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-display text-2xl">{tx(h.name, locale)}</h3>
              <p className="text-ink-2">{tx(capacityLabel(h.capacity), locale)}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function DefaultPackages({ lead, locale, dir }: BanquetSectionProps) {
  const data = banquet(lead)
  return (
    <Section id="menu">
      <dir.Heading title={tx(copy.packages.title, locale)} lead={tx(copy.packages.lead, locale)} tag={<ExampleTag locale={locale} />} />
      <ul className="grid gap-px border border-line bg-line sm:grid-cols-3">
        {data.packages.map((p) => (
          <li key={p.id} className="grid content-start gap-4 bg-bg p-6">
            <h3 className="font-display text-2xl">{tx(p.name, locale)}</h3>
            <p>
              <span className="font-display text-3xl">{formatSum(p.pricePerGuest, locale)}</span>
              <span className="ml-2 text-sm text-ink-2">{tx(copy.packages.perGuest, locale)}</span>
            </p>
            <ul className="grid gap-2 text-ink-2">
              {p.items.map((it) => (
                <li key={it.ru}>{tx(it, locale)}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  )
}

const INCLUDE_ICONS: Record<IncludeIcon, typeof Flower2> = { flower: Flower2, music: Music, mic: Mic, camera: Camera }

export function Includes({ locale, dir }: BanquetSectionProps) {
  const c = copy.includes
  return (
    <Section id="opcii" alt>
      <dir.Heading title={tx(c.title, locale)} lead={tx(c.lead, locale)} tag={<ExampleTag locale={locale} />} />
      <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {c.items.map((it) => {
          const Icon = INCLUDE_ICONS[it.icon]
          return (
            <li key={it.icon} className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
              <Icon aria-hidden className="row-span-2 mt-1 size-6 text-accent" strokeWidth={dir.iconStroke} />
              <h3 className="text-lg font-semibold">{tx(it.title, locale)}</h3>
              <p className="text-ink-2">{tx(it.text, locale)}</p>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}

export function Steps({ locale, dir }: BanquetSectionProps) {
  const c = copy.steps
  return (
    <Section id="bron">
      <dir.Heading title={tx(c.title, locale)} />
      <ol className="grid gap-8 sm:grid-cols-4 sm:gap-6">
        {c.items.map((it, i) => (
          <li key={it.title.ru} className="grid content-start gap-2 border-t border-line pt-4">
            <span className="font-display text-4xl leading-none text-accent">{i + 1}</span>
            <h3 className="text-lg font-semibold">{tx(it.title, locale)}</h3>
            <p className="text-ink-2">{tx(it.text, locale)}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export function FaqSection({ locale, dir }: BanquetSectionProps) {
  return (
    <Section id="savollar" alt>
      <dir.Heading title={tx(copy.faq.title, locale)} tag={<ExampleTag locale={locale} />} />
      <Faq items={[...copy.faq.items]} locale={locale} stroke={dir.iconStroke} />
    </Section>
  )
}

export function Location({ lead, locale, dir }: BanquetSectionProps) {
  return (
    <LocationSection
      lead={lead}
      locale={locale}
      dir={dir}
      title={tx(copy.location.title, locale)}
      extra={
        <p className="flex flex-wrap items-center gap-3">
          {tx(copy.location.parking, locale)}
          <ExampleTag locale={locale} />
        </p>
      }
    />
  )
}

export function Booking({ lead, locale, dir }: BanquetSectionProps) {
  const data = banquet(lead)
  return (
    <Section id="data" alt>
      <div className="grid md:grid-cols-[1fr_1.4fr] md:gap-10">
        <dir.Heading title={tx(copy.checkDate, locale)} lead={tx(copy.booking.lead, locale)} />
        <DemoForm
          stroke={dir.iconStroke}
          date={{ label: ui.formDate[locale] }}
          number={{
            name: 'guests',
            label: ui.formGuests[locale],
            value: data.defaultGuests,
            min: 10,
            max: Math.max(...data.halls.map((h) => h.capacity)),
            step: 10,
          }}
          choices={[{ name: 'event', label: ui.formEvent[locale], options: copy.eventTypes.map((e) => tx(e, locale)) }]}
          labels={formLabels(locale, ui.formRequired[locale])}
        />
      </div>
    </Section>
  )
}

export function BanquetStickyBar({ lead, locale, dir }: BanquetSectionProps) {
  return <StickyBar label={tx(copy.checkDate, locale)} phone={lead.phones[0]!} locale={locale} stroke={dir.iconStroke} />
}

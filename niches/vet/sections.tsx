import { Clock, Phone } from 'lucide-react'
import { DemoForm } from '@/core/components/DemoForm'
import { ExampleTag } from '@/core/components/ExampleTag'
import { Faq } from '@/core/components/Faq'
import { formLabels } from '@/core/components/formLabels'
import { LocationSection } from '@/core/components/LocationSection'
import { Section } from '@/core/components/Section'
import { StickyBar } from '@/core/components/StickyBar'
import { formatPhone, formatSum, telHref } from '@/core/format'
import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import type { Direction } from '@/directions/types'
import { copy } from './content'
import { VaccineCalendar } from './VaccineCalendar'

export interface VetPageSectionProps {
  lead: Lead
  locale: Locale
  dir: Direction
}

function vet(lead: Lead) {
  if (!lead.vet) throw new Error(`lead ${lead.slug}: нет данных vet`)
  return lead.vet
}

export function CalendarSection({ lead, locale, dir }: VetPageSectionProps) {
  return (
    <Section id="privivki">
      <dir.Heading title={tx(copy.calendar.title, locale)} lead={tx(copy.calendar.lead, locale)} />
      <VaccineCalendar lead={lead} locale={locale} dir={dir} />
    </Section>
  )
}

export function DefaultServices({ lead, locale, dir }: VetPageSectionProps) {
  const services = vet(lead).services
  return (
    <Section id="uslugi" alt>
      <dir.Heading title={tx(copy.services.title, locale)} lead={tx(copy.services.lead, locale)} tag={<ExampleTag locale={locale} />} />
      <ul className="grid border-t border-line sm:grid-cols-2 sm:gap-x-12">
        {services.map((s) => (
          <li key={s.id} className="flex items-baseline justify-between gap-4 border-b border-line py-4">
            <span>
              {tx(s.name, locale)}
              {s.note && <span className="block text-sm text-ink-2">{tx(s.note, locale)}</span>}
            </span>
            <span className="shrink-0 text-right font-semibold whitespace-nowrap">
              {s.from && locale === 'ru' ? 'от ' : ''}
              {formatSum(s.price, locale)}
              {s.from && locale === 'uz' ? 'dan' : ''}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function DefaultUrgent({ lead, locale, dir }: VetPageSectionProps) {
  const phone = lead.phones[0]!
  return (
    <Section id="srochno">
      <div className="grid gap-6 border border-line p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-10">
        <div>
          {lead.is24h && (
            <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold">
              <Clock aria-hidden className="size-4" strokeWidth={dir.iconStroke} />
              {tx(copy.urgent.allDay, locale)}
            </p>
          )}
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">{tx(copy.urgent.title, locale)}</h2>
          <p className="mt-3 max-w-xl text-ink-2">{tx(lead.is24h ? copy.urgent.allDayText : copy.urgent.text, locale)}</p>
        </div>
        <a href={telHref(phone)} className="btn">
          <Phone aria-hidden className="size-5" strokeWidth={dir.iconStroke} />
          {formatPhone(phone)}
        </a>
      </div>
    </Section>
  )
}

export function Prep({ locale, dir }: VetPageSectionProps) {
  return (
    <Section id="podgotovka" alt>
      <dir.Heading title={tx(copy.prep.title, locale)} />
      <ol className="grid gap-6 sm:grid-cols-2 sm:gap-x-12">
        {copy.prep.items.map((it, i) => (
          <li key={it.ru} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-line pt-4">
            <span className="font-display text-2xl leading-none text-ink-2">{i + 1}</span>
            <p>{tx(it, locale)}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export function FaqSection({ locale, dir }: VetPageSectionProps) {
  return (
    <Section id="savollar">
      <dir.Heading title={tx(copy.faq.title, locale)} tag={<ExampleTag locale={locale} />} />
      <Faq items={[...copy.faq.items]} locale={locale} stroke={dir.iconStroke} />
    </Section>
  )
}

export function Location({ lead, locale, dir }: VetPageSectionProps) {
  const hours = lead.is24h ? tx(copy.urgent.allDay, locale) : lead.hours ? tx(lead.hours, locale) : null
  return (
    <LocationSection
      lead={lead}
      locale={locale}
      dir={dir}
      alt
      title={tx(copy.location.title, locale)}
      extra={hours && <p className="text-lg">{hours}</p>}
    />
  )
}

export function Booking({ locale, dir }: VetPageSectionProps) {
  const b = copy.booking
  return (
    <Section id="data">
      <div className="grid md:grid-cols-[1fr_1.4fr] md:gap-10">
        <dir.Heading title={tx(copy.book, locale)} lead={tx(b.lead, locale)} />
        <DemoForm
          stroke={dir.iconStroke}
          date={{ label: tx(b.date, locale), required: false }}
          choices={[
            { name: 'pet', label: tx(b.pet, locale), options: [copy.pets.cat, copy.pets.dog, copy.pets.other].map((p) => tx(p, locale)) },
            { name: 'service', label: tx(b.service, locale), options: b.services.map((s) => tx(s, locale)) },
          ]}
          labels={formLabels(locale, tx(b.required, locale))}
        />
      </div>
    </Section>
  )
}

export function VetStickyBar({ lead, locale, dir }: VetPageSectionProps) {
  return <StickyBar label={tx(copy.book, locale)} phone={lead.phones[0]!} locale={locale} stroke={dir.iconStroke} />
}

import { ExampleTag } from '@/core/components/ExampleTag'
import { DemoForm } from '@/core/components/DemoForm'
import { ContactActions, PhoneList } from '@/core/components/Contacts'
import { formLabels } from '@/core/components/formLabels'
import { Section } from '@/core/components/Section'
import { StickyBar } from '@/core/components/StickyBar'
import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import type { Direction } from '@/directions/types'
import { ConcernPicker } from './ConcernPicker'
import { copy } from './content'

export interface DentalPageSectionProps {
  lead: Lead
  locale: Locale
  dir: Direction
}

export function ConcernSection({ lead, locale, dir }: DentalPageSectionProps) {
  return (
    <Section id="vybor">
      <dir.Heading title={tx(copy.concern.title, locale)} lead={tx(copy.concern.lead, locale)} />
      <ConcernPicker lead={lead} locale={locale} dir={dir} />
    </Section>
  )
}

/** Шаги первого визита: текст шага 1 зависит от того, есть ли у клиники Telegram. */
export function visitSteps(lead: Lead, locale: Locale) {
  return copy.visit.steps.map((s) => ({
    title: tx(s.title, locale),
    text: tx(lead.telegram && 'textTg' in s && s.textTg ? s.textTg : s.text, locale),
  }))
}

export function DefaultVisit({ lead, locale, dir }: DentalPageSectionProps) {
  return (
    <Section id="vizit" alt>
      <dir.Heading title={tx(copy.visit.title, locale)} lead={tx(copy.visit.lead, locale)} tag={<ExampleTag locale={locale} />} />
      <ol className="grid gap-8 sm:grid-cols-2">
        {visitSteps(lead, locale).map((s, i) => (
          <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-3">
            <span className="font-display text-2xl leading-none text-ink-2">{i + 1}</span>
            <div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 max-w-prose text-ink-2">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

/** Публичные цены и акции из карточки — с пометкой «уточнить». */
export function PromosSection({ lead, locale, dir }: DentalPageSectionProps) {
  const promos = lead.dental?.promos ?? []
  if (promos.length === 0) return null
  return (
    <Section id="aktsii">
      <dir.Heading title={tx(copy.promos.title, locale)} lead={tx(copy.promos.lead, locale)} />
      <ul className="grid gap-4 sm:grid-cols-2">
        {promos.map((p) => (
          <li key={p.text.ru} className="dc-promo grid content-start gap-3 border border-line p-5">
            <p className="text-xl font-semibold">{tx(p.text, locale)}</p>
            <p className="text-sm text-ink-2">
              {p.source} · {tx(copy.promos.check, locale)}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function DefaultContacts({ lead, locale, dir }: DentalPageSectionProps) {
  const c = copy.contacts
  return (
    <Section id="adres" alt>
      <dir.Heading title={tx(c.title, locale)} />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-sm text-ink-2">{tx({ ru: 'Адрес', uz: 'Manzil' }, locale)}</p>
          <p className="mt-1 max-w-prose text-lg">{tx(lead.address, locale)}</p>
          {lead.landmark && <p className="mt-1 text-ink-2">{tx(lead.landmark, locale)}</p>}
        </div>
        <div>
          <p className="text-sm text-ink-2">{tx(c.hours, locale)}</p>
          <p className="mt-1 text-lg">{lead.hours ? tx(lead.hours, locale) : tx(c.hoursUnknown, locale)}</p>
        </div>
        <PhoneList lead={lead} locale={locale} />
      </div>
      <div className="mt-10">
        <ContactActions lead={lead} locale={locale} stroke={dir.iconStroke} />
      </div>
    </Section>
  )
}

export function Booking({ locale, dir }: DentalPageSectionProps) {
  const b = copy.booking
  const skin = dir.dental!
  return (
    <Section id="zapis">
      <div className="grid gap-2 md:grid-cols-[1fr_1.4fr] md:gap-10">
        <dir.Heading title={tx(b.title, locale)} lead={tx(b.lead, locale)} />
        <DemoForm
          stroke={dir.iconStroke}
          date={{ label: tx(b.date, locale), required: false }}
          choices={[
            ...(skin.familyChoice
              ? [{ name: 'who', label: tx(copy.family.who, locale), options: copy.family.whoOptions.map((o) => tx(o, locale)) }]
              : []),
            { name: 'concern', label: tx(b.concern, locale), options: Object.values(copy.labels).map((l) => tx(l, locale)), noDefault: true },
          ]}
          labels={formLabels(locale, tx(b.required, locale))}
        />
      </div>
    </Section>
  )
}

export function DentalStickyBar({ lead, locale, dir }: DentalPageSectionProps) {
  return <StickyBar label={tx(copy.book, locale)} phone={lead.phones[0]!} locale={locale} stroke={dir.iconStroke} href="#zapis" />
}

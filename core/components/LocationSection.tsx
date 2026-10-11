import type { ReactNode } from 'react'
import type { Lead, Locale } from '@/core/types'
import type { Direction } from '@/directions/types'
import { AddressLine, ContactActions, PhoneList } from './Contacts'
import { SchemeMap } from './SchemeMap'
import { Section } from './Section'

/** «Как добраться»: адрес, телефоны, строки ниши (парковка, часы), кнопки и условная схема. */
export function LocationSection({
  lead,
  locale,
  dir,
  title,
  extra,
  alt = false,
}: {
  lead: Lead
  locale: Locale
  dir: Direction
  title: string
  extra?: ReactNode
  alt?: boolean
}) {
  return (
    <Section id="adres" alt={alt}>
      <dir.Heading title={title} />
      <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-start">
        <div className="grid gap-6">
          <AddressLine lead={lead} locale={locale} />
          <PhoneList lead={lead} locale={locale} />
          {extra}
          <ContactActions lead={lead} locale={locale} stroke={dir.iconStroke} />
        </div>
        <SchemeMap lead={lead} locale={locale} />
      </div>
    </Section>
  )
}

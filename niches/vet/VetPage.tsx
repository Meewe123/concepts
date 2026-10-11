import type { FC } from 'react'
import { Footer } from '@/core/components/Footer'
import { LangSwitch } from '@/core/components/LangSwitch'
import type { Lead, Locale } from '@/core/types'
import type { Direction } from '@/directions/types'
import {
  Booking,
  CalendarSection,
  DefaultServices,
  DefaultUrgent,
  FaqSection,
  Location,
  Prep,
  VetStickyBar,
  type VetPageSectionProps,
} from './sections'
import type { VetSectionId } from './skin'

export function VetPage({ lead, locale, dir }: { lead: Lead; locale: Locale; dir: Direction }) {
  const skin = dir.vet
  if (!skin) throw new Error(`Направление ${dir.id} не умеет нишу vet`)

  const wrap = (C: FC<{ lead: Lead; locale: Locale }>): FC<VetPageSectionProps> => {
    const Wrapped = (p: VetPageSectionProps) => <C lead={p.lead} locale={p.locale} />
    return Wrapped
  }
  const sections: Record<VetSectionId, FC<VetPageSectionProps>> = {
    calendar: CalendarSection,
    services: skin.Services ? wrap(skin.Services) : DefaultServices,
    urgent: skin.Urgent ? wrap(skin.Urgent) : DefaultUrgent,
    prep: Prep,
    shop: skin.Shop ? wrap(skin.Shop) : () => null,
    faq: FaqSection,
    location: Location,
    booking: Booking,
  }

  return (
    <>
      <skin.Hero lead={lead} locale={locale} langSwitch={<LangSwitch lead={lead} locale={locale} />} />
      <div className="relative">
        {skin.order.map((id, i) => {
          const S = sections[id]
          return (
            <div key={id}>
              {i > 0 && dir.Divider && <dir.Divider />}
              <S lead={lead} locale={locale} dir={dir} />
            </div>
          )
        })}
        <VetStickyBar lead={lead} locale={locale} dir={dir} />
      </div>
      <Footer lead={lead} locale={locale} stroke={dir.iconStroke} />
      {/* Островок: календарь прививок, часы и демо-форма. Единственный JS страницы, кроме счётчика. */}
      <script type="module" src="/islands/vet.js" data-concept="" />
    </>
  )
}

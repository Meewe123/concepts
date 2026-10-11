import type { FC } from 'react'
import { Footer } from '@/core/components/Footer'
import { LangSwitch } from '@/core/components/LangSwitch'
import type { Lead, Locale } from '@/core/types'
import type { Direction } from '@/directions/types'
import {
  Booking,
  DefaultHalls,
  DefaultPackages,
  FaqSection,
  Includes,
  Location,
  PlannerSection,
  BanquetStickyBar,
  Steps,
  type BanquetSectionProps,
} from './sections'
import type { BanquetSectionId } from './skin'

export function BanquetPage({ lead, locale, dir }: { lead: Lead; locale: Locale; dir: Direction }) {
  const skin = dir.banquet
  if (!skin) throw new Error(`Направление ${dir.id} не умеет нишу banquet`)

  const sections: Record<BanquetSectionId, FC<BanquetSectionProps>> = {
    planner: PlannerSection,
    halls: skin.Halls ? (p) => skin.Halls!({ lead: p.lead, locale: p.locale }) : DefaultHalls,
    packages: skin.Packages ? (p) => skin.Packages!({ lead: p.lead, locale: p.locale }) : DefaultPackages,
    bar: skin.Bar ? (p) => skin.Bar!({ lead: p.lead, locale: p.locale }) : () => null,
    includes: Includes,
    steps: Steps,
    faq: FaqSection,
    location: Location,
    booking: Booking,
  }

  return (
    <>
      <skin.Hero lead={lead} locale={locale} langSwitch={<LangSwitch lead={lead} locale={locale} />} />
      <main className="relative">
        {skin.order.map((id, i) => {
          const S = sections[id]
          return (
            <div key={id}>
              {i > 0 && dir.Divider && <dir.Divider />}
              <S lead={lead} locale={locale} dir={dir} />
            </div>
          )
        })}
        <BanquetStickyBar lead={lead} locale={locale} dir={dir} />
      </main>
      <Footer lead={lead} locale={locale} stroke={dir.iconStroke} />
      {/* Островок: ползунок гостей и демо-форма. Единственный JS страницы, кроме счётчика. */}
      <script type="module" src="/islands/banquet.js" data-concept="" />
    </>
  )
}

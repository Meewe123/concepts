import type { FC } from 'react'
import { Footer } from '@/core/components/Footer'
import { LangSwitch } from '@/core/components/LangSwitch'
import type { Lead, Locale } from '@/core/types'
import type { Direction } from '@/directions/types'
import {
  Booking,
  ConcernSection,
  DefaultContacts,
  DefaultVisit,
  DentalStickyBar,
  PromosSection,
  type DentalPageSectionProps,
} from './sections'
import type { DentalSectionId } from './skin'

export function DentalPage({ lead, locale, dir }: { lead: Lead; locale: Locale; dir: Direction }) {
  const skin = dir.dental
  if (!skin) throw new Error(`Направление ${dir.id} не умеет нишу dental`)

  const wrap = (C: FC<{ lead: Lead; locale: Locale }>): FC<DentalPageSectionProps> => {
    const Wrapped = (p: DentalPageSectionProps) => <C lead={p.lead} locale={p.locale} />
    return Wrapped
  }
  const sections: Record<DentalSectionId, FC<DentalPageSectionProps>> = {
    concern: ConcernSection,
    visit: skin.Visit ? wrap(skin.Visit) : DefaultVisit,
    promos: PromosSection,
    family: skin.Family ? wrap(skin.Family) : () => null,
    contacts: skin.Contacts ? wrap(skin.Contacts) : DefaultContacts,
    booking: Booking,
  }

  return (
    <>
      <skin.Hero lead={lead} locale={locale} langSwitch={<LangSwitch lead={lead} locale={locale} />} />
      <main>
        {/* Нижняя панель живёт во второй обёртке: на первом экране и в «Что вас беспокоит?» её нет — там свои кнопки */}
        {skin.order.slice(0, 1).map((id) => {
          const S = sections[id]
          return <S key={id} lead={lead} locale={locale} dir={dir} />
        })}
        <div className="relative">
          {skin.order.slice(1).map((id) => {
            const S = sections[id]
            return (
              <div key={id}>
                {dir.Divider && <dir.Divider />}
                <S lead={lead} locale={locale} dir={dir} />
              </div>
            )
          })}
          <DentalStickyBar lead={lead} locale={locale} dir={dir} />
        </div>
      </main>
      <Footer lead={lead} locale={locale} stroke={dir.iconStroke} />
      {/* Островок: хеш выбора, передача в форму, демо-форма. Встраивается в страницу при сборке. */}
      <script type="module" src="/islands/dental.js" data-concept="" />
    </>
  )
}

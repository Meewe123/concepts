import { Footer } from '@/core/components/Footer'
import { LangSwitch } from '@/core/components/LangSwitch'
import type { Lead, Locale } from '@/core/types'
import type { Direction } from '@/directions/types'
import { WellnessConfigScript, WellnessStickyBar } from './parts'

export function WellnessPage({ lead, locale, dir }: { lead: Lead; locale: Locale; dir: Direction }) {
  const skin = dir.wellness
  if (!skin) throw new Error(`Направление ${dir.id} не умеет нишу wellness`)
  const [first, ...rest] = skin.order
  const First = first ? skin.sections[first] : null
  return (
    <>
      <WellnessConfigScript lead={lead} locale={locale} />
      <skin.Hero lead={lead} locale={locale} langSwitch={<LangSwitch lead={lead} locale={locale} />} />
      <main>
        {First && <First lead={lead} locale={locale} />}
        <div className="relative">
          {rest.map((id) => {
            const S = skin.sections[id]
            return <S key={id} lead={lead} locale={locale} />
          })}
          <WellnessStickyBar lead={lead} locale={locale} stroke={dir.iconStroke} />
        </div>
      </main>
      <Footer lead={lead} locale={locale} stroke={dir.iconStroke} />
      {/* Островок: подбор практики и ближайшего занятия, «сегодня» в расписании, форма. */}
      <script type="module" src="/islands/wellness.js" data-concept="" />
    </>
  )
}

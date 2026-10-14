import { Footer } from '@/core/components/Footer'
import { LangSwitch } from '@/core/components/LangSwitch'
import type { Lead, Locale } from '@/core/types'
import type { Direction } from '@/directions/types'
import { FitnessStickyBar } from './parts'

export function FitnessPage({ lead, locale, dir }: { lead: Lead; locale: Locale; dir: Direction }) {
  const skin = dir.fitness
  if (!skin) throw new Error(`Направление ${dir.id} не умеет нишу fitness`)
  const [first, ...rest] = skin.order
  const First = first ? skin.sections[first] : null
  return (
    <>
      <skin.Hero lead={lead} locale={locale} langSwitch={<LangSwitch lead={lead} locale={locale} />} />
      <main>
        {First && <First lead={lead} locale={locale} />}
        <div className="relative">
          {rest.map((id) => {
            const S = skin.sections[id]
            return <S key={id} lead={lead} locale={locale} />
          })}
          <FitnessStickyBar lead={lead} locale={locale} stroke={dir.iconStroke} />
        </div>
      </main>
      <Footer lead={lead} locale={locale} stroke={dir.iconStroke} />
      {/* Островок: станция → клуб, цель → абонемент, время → ближайшее занятие; форма. */}
      <script type="module" src="/islands/fitness.js" data-concept="" />
    </>
  )
}

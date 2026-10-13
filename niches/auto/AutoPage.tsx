import { Footer } from '@/core/components/Footer'
import { LangSwitch } from '@/core/components/LangSwitch'
import type { Lead, Locale } from '@/core/types'
import type { Direction } from '@/directions/types'
import { AutoConfigScript, AutoStickyBar } from './parts'

export function AutoPage({ lead, locale, dir }: { lead: Lead; locale: Locale; dir: Direction }) {
  const skin = dir.auto
  if (!skin) throw new Error(`Направление ${dir.id} не умеет нишу auto`)
  const [first, ...rest] = skin.order
  const First = first ? skin.sections[first] : null
  return (
    <>
      <AutoConfigScript lead={lead} locale={locale} />
      <skin.Hero lead={lead} locale={locale} langSwitch={<LangSwitch lead={lead} locale={locale} />} />
      <main>
        {First && <First lead={lead} locale={locale} />}
        <div className="relative">
          {rest.map((id) => {
            const S = skin.sections[id]
            return <S key={id} lead={lead} locale={locale} />
          })}
          <AutoStickyBar lead={lead} locale={locale} stroke={dir.iconStroke} />
        </div>
      </main>
      <Footer lead={lead} locale={locale} stroke={dir.iconStroke} />
      {/* Островок: расчёт, очередь сейчас, окна записи, форма. Встраивается в страницу при сборке. */}
      <script type="module" src="/islands/auto.js" data-concept="" />
    </>
  )
}

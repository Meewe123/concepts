import { Footer } from '@/core/components/Footer'
import { LangSwitch } from '@/core/components/LangSwitch'
import type { Lead, Locale } from '@/core/types'
import type { Direction } from '@/directions/types'
import { BeautyStickyBar } from './Booker'

export function BeautyPage({ lead, locale, dir }: { lead: Lead; locale: Locale; dir: Direction }) {
  const skin = dir.beauty
  if (!skin) throw new Error(`Направление ${dir.id} не умеет нишу beauty`)
  const [First, ...rest] = skin.blocks
  return (
    <>
      <skin.Hero lead={lead} locale={locale} langSwitch={<LangSwitch lead={lead} locale={locale} />} />
      <main>
        {First && <First lead={lead} locale={locale} />}
        <div className="relative">
          {rest.map((B, i) => (
            <B key={i} lead={lead} locale={locale} />
          ))}
          <BeautyStickyBar lead={lead} locale={locale} stroke={dir.iconStroke} />
        </div>
      </main>
      <Footer lead={lead} locale={locale} stroke={dir.iconStroke} />
      {/* Островок: окна записи, выбор, форма. Встраивается в страницу при сборке. */}
      <script type="module" src="/islands/beauty.js" data-concept="" />
    </>
  )
}

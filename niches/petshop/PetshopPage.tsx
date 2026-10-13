import { Footer } from '@/core/components/Footer'
import { LangSwitch } from '@/core/components/LangSwitch'
import type { Lead, Locale } from '@/core/types'
import type { Direction } from '@/directions/types'
import { PetshopStickyBar } from './parts'

export function PetshopPage({ lead, locale, dir }: { lead: Lead; locale: Locale; dir: Direction }) {
  const skin = dir.petshop
  if (!skin) throw new Error(`Направление ${dir.id} не умеет нишу petshop`)
  const [first, ...rest] = skin.order
  const First = first ? skin.sections[first] : null
  return (
    <>
      <skin.Hero lead={lead} locale={locale} langSwitch={<LangSwitch lead={lead} locale={locale} />} />
      <main>
        {First && <First lead={lead} locale={locale} />}
        {/* Нижняя панель — во второй обёртке: на первом экране и в подборе её нет */}
        <div className="relative">
          {rest.map((id) => {
            const S = skin.sections[id]
            return <S key={id} lead={lead} locale={locale} />
          })}
          <PetshopStickyBar lead={lead} locale={locale} stroke={dir.iconStroke} />
        </div>
      </main>
      <Footer lead={lead} locale={locale} stroke={dir.iconStroke} />
      {/* Островок: весы подбора, «Отложить», список и демо-форма. Встраивается в страницу при сборке. */}
      <script type="module" src="/islands/petshop.js" data-concept="" />
    </>
  )
}

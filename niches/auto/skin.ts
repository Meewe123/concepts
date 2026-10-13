import type { FC, ReactNode } from 'react'
import type { Lead, Locale } from '@/core/types'

export type AutoSectionId = 'calc' | 'queue' | 'booking' | 'location'

export interface AutoHeroProps {
  lead: Lead
  locale: Locale
  langSwitch: ReactNode
}

export interface AutoSectionProps {
  lead: Lead
  locale: Locale
}

/** Как направление выглядит в нише auto. Контракт с островком — в niches/auto/parts. */
export interface AutoSkin {
  Hero: FC<AutoHeroProps>
  order: AutoSectionId[]
  sections: Record<AutoSectionId, FC<AutoSectionProps>>
}

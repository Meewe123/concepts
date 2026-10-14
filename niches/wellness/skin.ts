import type { FC, ReactNode } from 'react'
import type { Lead, Locale } from '@/core/types'

export type WellnessSectionId = 'quiz' | 'week' | 'space' | 'booking' | 'location'

export interface WellnessHeroProps {
  lead: Lead
  locale: Locale
  langSwitch: ReactNode
}

export interface WellnessSectionProps {
  lead: Lead
  locale: Locale
}

/** Как направление выглядит в нише wellness. Контракт с островком — в niches/wellness/parts. */
export interface WellnessSkin {
  Hero: FC<WellnessHeroProps>
  order: WellnessSectionId[]
  sections: Record<WellnessSectionId, FC<WellnessSectionProps>>
}

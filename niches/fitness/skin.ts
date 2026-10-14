import type { FC, ReactNode } from 'react'
import type { Lead, Locale } from '@/core/types'

export type FitnessSectionId = 'pick' | 'plans' | 'booking' | 'clubs'

export interface FitnessHeroProps {
  lead: Lead
  locale: Locale
  langSwitch: ReactNode
}

export interface FitnessSectionProps {
  lead: Lead
  locale: Locale
}

/** Как направление выглядит в нише fitness. Контракт с островком — в niches/fitness/parts. */
export interface FitnessSkin {
  Hero: FC<FitnessHeroProps>
  order: FitnessSectionId[]
  sections: Record<FitnessSectionId, FC<FitnessSectionProps>>
}

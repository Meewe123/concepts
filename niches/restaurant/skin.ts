import type { FC, ReactNode } from 'react'
import type { Lead, Locale } from '@/core/types'

export type RestaurantSectionId = 'bron' | 'menu' | 'location'

export interface RestaurantHeroProps {
  lead: Lead
  locale: Locale
  langSwitch: ReactNode
}

export interface RestaurantSectionProps {
  lead: Lead
  locale: Locale
}

/** Как направление выглядит в нише restaurant. Контракт с островком — в niches/restaurant/parts. */
export interface RestaurantSkin {
  Hero: FC<RestaurantHeroProps>
  order: RestaurantSectionId[]
  sections: Record<RestaurantSectionId, FC<RestaurantSectionProps>>
}

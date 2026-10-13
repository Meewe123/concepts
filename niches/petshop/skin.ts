import type { FC, ReactNode } from 'react'
import type { Lead, Locale } from '@/core/types'

export type PetshopSectionId = 'scale' | 'catalog' | 'clinic' | 'order' | 'location'

export interface PetshopHeroProps {
  lead: Lead
  locale: Locale
  langSwitch: ReactNode
}

export interface PetshopSectionProps {
  lead: Lead
  locale: Locale
}

/**
 * Как направление выглядит в нише petshop. Блоки рисует направление, а контракт с островком дают
 * ScaleRoot, AddButton, CartList, OrderForm и CartCount из niches/petshop/parts.
 */
export interface PetshopSkin {
  Hero: FC<PetshopHeroProps>
  /** «scale» — первым после первого экрана */
  order: PetshopSectionId[]
  sections: Record<PetshopSectionId, FC<PetshopSectionProps>>
}

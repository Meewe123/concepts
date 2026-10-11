import type { FC, ReactNode } from 'react'
import type { Lead, Locale } from '@/core/types'

export type VetSectionId = 'calendar' | 'services' | 'urgent' | 'prep' | 'shop' | 'faq' | 'location' | 'booking'

export interface VetHeroProps {
  lead: Lead
  locale: Locale
  langSwitch: ReactNode
}

export interface VetSectionProps {
  lead: Lead
  locale: Locale
}

/** Как направление выглядит в нише vet. Чего нет — берётся из шаблона ниши. */
export interface VetSkin {
  Hero: FC<VetHeroProps>
  order: VetSectionId[]
  /**
   * Питомец для календаря прививок. Рисует обоих — кошку и собаку; какой виден, решает CSS
   * по атрибуту data-pet у ближайшего [data-vaccines] (его переключает островок).
   */
  PetArt: FC<{ className?: string }>
  Services?: FC<VetSectionProps>
  Urgent?: FC<VetSectionProps>
  /** Только для клиник с магазином: «к прививке пригодится» */
  Shop?: FC<VetSectionProps>
}

import type { FC, ReactNode } from 'react'
import type { DentalConcernId, Lead, Locale } from '@/core/types'

export type DentalSectionId = 'concern' | 'visit' | 'promos' | 'family' | 'contacts' | 'booking'

export interface DentalHeroProps {
  lead: Lead
  locale: Locale
  langSwitch: ReactNode
}

export interface DentalSectionProps {
  lead: Lead
  locale: Locale
}

/** Как направление выглядит в нише dental. Чего нет — берётся из шаблона ниши. */
export interface DentalSkin {
  Hero: FC<DentalHeroProps>
  /** «concern» всегда первым после первого экрана — так задумано нишей */
  order: DentalSectionId[]
  /** Метка варианта в шаблонном «Что вас беспокоит?» (если своего блока нет) */
  OptionMark?: FC<{ id: DentalConcernId; index: number }>
  /**
   * Свои блоки целиком. Для «Что вас беспокоит?» — тот же контракт, что у ConcernPicker:
   * [data-concern] > input[name=dc-concern], [data-panel=<id>], input[name=dc-months-<id>],
   * .dc-monthly[data-m], .dc-empty, [data-book] — его понимают CSS (:has) и островок.
   */
  Concern?: FC<DentalSectionProps>
  Visit?: FC<DentalSectionProps>
  Promos?: FC<DentalSectionProps>
  Contacts?: FC<DentalSectionProps>
  Family?: FC<DentalSectionProps>
  Booking?: FC<DentalSectionProps>
  /** В форме записи — «Кого записываете: себя / ребёнка / всю семью» */
  familyChoice?: boolean
}

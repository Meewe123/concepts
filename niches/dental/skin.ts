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
  /** Метка варианта в «Что вас беспокоит?»: номер строки бланка, иконка… */
  OptionMark: FC<{ id: DentalConcernId; index: number }>
  Visit?: FC<DentalSectionProps>
  Contacts?: FC<DentalSectionProps>
  Family?: FC<DentalSectionProps>
  /** В форме записи — «Кого записываете: себя / ребёнка / всю семью» */
  familyChoice?: boolean
}

import type { FC, ReactNode } from 'react'
import type { Lead, Locale } from '@/core/types'

export type EducationSectionId = 'test' | 'courses' | 'schedule' | 'teachers' | 'formats' | 'faq' | 'location' | 'booking'

export interface EducationHeroProps {
  lead: Lead
  locale: Locale
  langSwitch: ReactNode
}

export interface EducationSectionProps {
  lead: Lead
  locale: Locale
}

/**
 * Как направление выглядит в нише education. Тест уровня — общая разметка с классами lt-*:
 * направление оформляет их в своём CSS (красная ручка, табло и т. п.), островок ставит data-mark и data-done.
 */
export interface EducationSkin {
  Hero: FC<EducationHeroProps>
  order: EducationSectionId[]
  Courses?: FC<EducationSectionProps>
  Schedule?: FC<EducationSectionProps>
  /** Монограмма преподавателя */
  Monogram: FC<{ initials: string; seed: number }>
}

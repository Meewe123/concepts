import type { FC, ReactNode } from 'react'
import type { Lead, Locale } from '@/core/types'

export type BanquetSectionId = 'planner' | 'halls' | 'packages' | 'bar' | 'includes' | 'steps' | 'faq' | 'location' | 'booking'

export interface BanquetHeroProps {
  lead: Lead
  locale: Locale
  /** Переключатель языка — рисует ниша, направление решает, где его поставить */
  langSwitch: ReactNode
}

export interface SectionProps {
  lead: Lead
  locale: Locale
}

export interface SchemeFrameProps {
  width: number
  height: number
  /** Нижняя граница сцены */
  stageBottom: number
  label: string
}

export interface SchemeFloorProps {
  x: number
  y: number
  w: number
  h: number
  label: string
}

export interface SchemeTableProps {
  x: number
  y: number
  r: number
}

/** Как направление выглядит в нише banquet. Чего нет — берётся из шаблона ниши. */
export interface BanquetSkin {
  Hero: FC<BanquetHeroProps>
  /** Порядок секций после первого экрана */
  order: BanquetSectionId[]
  Halls?: FC<SectionProps>
  Packages?: FC<SectionProps>
  /** Секция бара — только у залов с баром */
  Bar?: FC<SectionProps>
  /**
   * Иллюстрация над схемой зала. Может реагировать на CSS-переменную --ratio (0…1, доля гостей
   * от вместимости самого большого зала) и атрибут data-active-hall у обёртки — их ставит островок.
   */
  PlannerArt?: FC<{ halls: { id: string; capacity: number }[] }>
}

/** Схема зала направления: рисуется в островке HallPlanner, регистрируется в directions/schemes.ts. */
export interface SchemeSkin {
  Defs?: FC
  Frame: FC<SchemeFrameProps>
  Floor: FC<SchemeFloorProps>
  /** Стол: элементы с классом t-off — пустой стол, t-on — занятый */
  Table: FC<SchemeTableProps>
}

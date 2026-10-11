import type { FC, ReactNode } from 'react'
import type { Lead, Locale } from '@/core/types'

export type BanquetSectionId = 'planner' | 'halls' | 'packages' | 'includes' | 'steps' | 'faq' | 'location' | 'booking'

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
}

/** Схема зала направления: рисуется в островке HallPlanner, регистрируется в directions/schemes.ts. */
export interface SchemeSkin {
  Defs?: FC
  Frame: FC<SchemeFrameProps>
  Floor: FC<SchemeFloorProps>
  /** Стол: элементы с классом t-off — пустой стол, t-on — занятый */
  Table: FC<SchemeTableProps>
}

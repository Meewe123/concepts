import type { FC, ReactNode } from 'react'
import type { Lead, Locale } from '@/core/types'
import type { BanquetSkin } from '@/niches/banquet/skin'
import type { DentalSkin } from '@/niches/dental/skin'
import type { EducationSkin } from '@/niches/education/skin'
import type { VetSkin } from '@/niches/vet/skin'

export interface HeadingProps {
  title: string
  lead?: string
  /** Пометка «пример» рядом с заголовком */
  tag?: ReactNode
}

export interface PhotoArtProps {
  seed: number
  label: string
  className?: string
}

/**
 * Арт-дирекшн: токены, шрифты, мотивы и «кожа» для ниши.
 * Внутри одной ниши у направлений не повторяются палитра, шрифтовая пара, композиция и движение.
 */
export interface Direction {
  id: string
  /** Классы next/font с CSS-переменными шрифтов направления */
  fontClass: string
  /** Токены и эффекты направления — вставляются только на его страницах */
  css: string
  /** Толщина линии иконок Lucide */
  iconStroke: number
  /** Цвет адресной строки мобильного браузера */
  themeColor: string
  /** Шрифт главного заголовка — его латиницу предзагружаем (scripts/strip-runtime.ts) */
  heroFont: { family: string; weight: number; style: 'normal' | 'italic' }
  /** Семейства шрифтов направления (как в CSS) — остальные @font-face вырезаются со страницы */
  fontFamilies: string[]
  Heading: FC<HeadingProps>
  /** Генеративная заглушка на месте фото с подписью «здесь будут ваши фото» */
  PhotoArt: FC<PhotoArtProps>
  /** Разделитель между секциями */
  Divider?: FC
  /** Карточка превью ссылки 1200×630 */
  Og: FC<{ lead: Lead; locale: Locale }>
  banquet?: BanquetSkin
  vet?: VetSkin
  education?: EducationSkin
  dental?: DentalSkin
}

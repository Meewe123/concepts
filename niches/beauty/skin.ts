import type { FC, ReactNode } from 'react'
import type { Lead, Locale } from '@/core/types'

export interface BeautyHeroProps {
  lead: Lead
  locale: Locale
  langSwitch: ReactNode
}

export interface BeautySectionProps {
  lead: Lead
  locale: Locale
}

/**
 * Ниша beauty целиком рисуется направлением: свой первый экран и свои блоки.
 * Ниша даёт данные, тексты, островок записи (BookerRoot) и форму (BookingForm).
 */
export interface BeautySkin {
  Hero: FC<BeautyHeroProps>
  /** Первый блок — сигнатура записи; нижняя панель появляется только после него */
  blocks: FC<BeautySectionProps>[]
}

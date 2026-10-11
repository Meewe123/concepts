import { formatSum, groupDigits } from '@/core/format'
import { countWord } from '@/core/text'
import type { Locale } from '@/core/types'

// Общая логика планировщика: ей пользуются и серверная разметка, и островок island.ts.

export const GUESTS_RU = ['гость', 'гостя', 'гостей'] as const
export const TABLES_RU = ['стол', 'стола', 'столов'] as const

export interface PlannerConfig {
  locale: Locale
  halls: { id: string; name: string; capacity: number; capacityLabel: string }[]
  packages: { id: string; name: string; price: number }[]
  /** Выездной кейтеринг: свои пакеты */
  catering?: { packages: { id: string; name: string; price: number }[] }
  defaultGuests: number
}

export type PlannerMode = 'hall' | 'catering'

export function plannerState(cfg: PlannerConfig, guests: number, pkgId: string, mode: PlannerMode = 'hall') {
  const ru = cfg.locale === 'ru'
  const sorted = [...cfg.halls].sort((a, b) => a.capacity - b.capacity)
  const biggest = sorted[sorted.length - 1]!
  const hall = sorted.find((h) => h.capacity >= guests) ?? biggest
  const tables = Math.ceil(guests / 10)
  const list = mode === 'catering' && cfg.catering ? cfg.catering.packages : cfg.packages
  const pkg = list.find((p) => p.id === pkgId) ?? list[0]!
  const total = guests * pkg.price
  const guestsWord = countWord(guests, cfg.locale, GUESTS_RU, 'mehmon')
  return {
    guests,
    sorted,
    max: biggest.capacity,
    hall,
    tables,
    pkg,
    total,
    progress: ((guests - 10) / (biggest.capacity - 10)) * 100,
    ratio: guests / biggest.capacity,
    valueText: `${guests} ${guestsWord}`,
    tablesOf: `${tables} / ${Math.ceil(hall.capacity / 10)}`,
    cta: ru ? `Проверить дату на ${guests} ${guestsWord}` : `${guests} mehmon uchun sanani tekshirish`,
    calc: ru
      ? `${groupDigits(guests)} ${guestsWord} × ${formatSum(pkg.price, cfg.locale)}, ${mode === 'catering' ? 'кейтеринг' : 'пакет'} «${pkg.name}»`
      : `${groupDigits(guests)} mehmon × ${formatSum(pkg.price, cfg.locale)}, «${pkg.name}» ${mode === 'catering' ? 'keyteringi' : 'paketi'}`,
  }
}

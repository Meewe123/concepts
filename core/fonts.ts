import { Onest } from 'next/font/google'

/**
 * Onest — общий текстовый шрифт: страница студии и большинство направлений.
 * Остальные шрифты объявляются в своих направлениях с preload: false,
 * чтобы на странице концепта не предзагружались шрифты чужих направлений.
 */
export const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  weight: 'variable',
  variable: '--font-onest',
  display: 'swap',
})

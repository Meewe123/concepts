import { Commissioner, Onest, Spectral, Unbounded } from 'next/font/google'

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

/** Unbounded — у нескольких направлений (crystal-facet, playful-geometry …): одно объявление на всех. */
export const unbounded = Unbounded({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '600', '800'],
  variable: '--font-unbounded',
  display: 'swap',
  preload: false,
})

/** Commissioner — текстовый у многих направлений. */
export const commissioner = Commissioner({
  subsets: ['latin', 'cyrillic'],
  weight: 'variable',
  variable: '--font-commissioner',
  display: 'swap',
  preload: false,
})

/** Spectral — у british-textbook, garden-light и др. */
export const spectral = Spectral({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-spectral',
  display: 'swap',
  preload: false,
})

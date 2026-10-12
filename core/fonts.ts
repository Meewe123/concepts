import {
  Commissioner,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Literata,
  Nunito,
  Onest,
  Playfair_Display,
  Source_Code_Pro,
  Spectral,
  Tektur,
  Unbounded,
  Ysabeau_Office,
} from 'next/font/google'

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

/** Literata — warm-paper, marble-brass, family-warm. */
export const literata = Literata({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-literata',
  display: 'swap',
  preload: false,
})

/** Ysabeau Office — текстовый у warm-paper, garden-light, family-warm, sound-silence. */
export const ysabeau = Ysabeau_Office({
  subsets: ['latin', 'cyrillic'],
  weight: 'variable',
  variable: '--font-ysabeau',
  display: 'swap',
  preload: false,
})

/** Tektur — night-vet, workshop-concrete. */
export const tektur = Tektur({
  subsets: ['latin', 'cyrillic'],
  weight: 'variable',
  variable: '--font-tektur',
  display: 'swap',
  preload: false,
})

/** Source Code Pro — цифры, часы, табло. */
export const sourceCode = Source_Code_Pro({
  subsets: ['latin', 'cyrillic'],
  weight: 'variable',
  variable: '--font-source-code',
  display: 'swap',
  preload: false,
})

/** Playfair Display — crimson-velvet, retro-gastronom. */
export const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: 'variable',
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
  preload: false,
})

/** IBM Plex Sans — clinical-silk. */
export const plexSans = IBM_Plex_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: 'variable',
  variable: '--font-plex-sans',
  display: 'swap',
  preload: false,
})

/** IBM Plex Mono — цифры «медицинского бланка» у clinical-silk. */
export const plexMono = IBM_Plex_Mono({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
  preload: false,
})

/** Nunito — family-warm: округлый, мягкий, один шрифт на всё. */
export const nunito = Nunito({
  subsets: ['latin', 'cyrillic'],
  weight: 'variable',
  variable: '--font-nunito',
  display: 'swap',
  preload: false,
})

import {
  Alegreya_Sans,
  Comfortaa,
  Commissioner,
  Cormorant_Garamond,
  EB_Garamond,
  Exo_2,
  Fira_Sans_Extra_Condensed,
  Fira_Sans,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Inter,
  Inter_Tight,
  Literata,
  Lobster,
  Montserrat,
  Mulish,
  Noto_Serif_Display,
  Nunito,
  Onest,
  Oswald,
  Playfair,
  Playfair_Display,
  Podkova,
  Raleway,
  Roboto_Flex,
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

/** Cormorant Garamond для glossy-editorial: светлый, средний и полужирный, с курсивом. */
export const cormorantEditorial = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant-ed',
  display: 'swap',
  preload: false,
})

/** Montserrat — текстовый у confetti-pop (Onest уже у glossy-editorial в той же нише). */
export const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: 'variable',
  variable: '--font-montserrat',
  display: 'swap',
  preload: false,
})

/** Spectral ExtraLight / Light с курсивом — шёпот spa-whisper. */
export const spectralLight = Spectral({
  subsets: ['latin', 'cyrillic'],
  weight: ['200', '300'],
  style: ['normal', 'italic'],
  variable: '--font-spectral-light',
  display: 'swap',
  preload: false,
})

/** Oswald — tashkent-mosaic (Chilonzor Dental Servis): узкие прописные, как буквы на фасадах Чиланзара. */
export const oswald = Oswald({
  subsets: ['latin', 'cyrillic'],
  weight: 'variable',
  variable: '--font-oswald',
  display: 'swap',
  preload: false,
})

/** Inter Tight — текст tashkent-mosaic. */
export const interTight = Inter_Tight({
  subsets: ['latin', 'cyrillic'],
  weight: 'variable',
  variable: '--font-inter-tight',
  display: 'swap',
  preload: false,
})

/** Comfortaa — zoo-scales (Зооцентр): округлые буквы и цифры ценников, дружелюбно к хозяевам питомцев. */
export const comfortaa = Comfortaa({
  subsets: ['latin', 'cyrillic'],
  weight: 'variable',
  variable: '--font-comfortaa',
  display: 'swap',
  preload: false,
})

/** Fira Sans — текст zoo-scales. */
export const firaSans = Fira_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600'],
  variable: '--font-fira-sans',
  display: 'swap',
  preload: false,
})

/** Exo 2 — showroom-chrome (Urus): технический курсив, как шильдики на кузове. */
export const exo2 = Exo_2({
  subsets: ['latin', 'cyrillic'],
  weight: 'variable',
  style: ['normal', 'italic'],
  variable: '--font-exo2',
  display: 'swap',
  preload: false,
})

/** Lobster — retro-gastronom (Petrovic): неоновая вывеска. */
export const lobster = Lobster({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  variable: '--font-lobster',
  display: 'swap',
  preload: false,
})

/** Podkova — текст и наборное табло retro-gastronom. */
export const podkova = Podkova({
  subsets: ['latin', 'cyrillic'],
  weight: 'variable',
  variable: '--font-podkova',
  display: 'swap',
  preload: false,
})

/** EB Garamond — sound-silence (Артха): спокойный книжный курсив. */
export const ebGaramond = EB_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: 'variable',
  style: ['normal', 'italic'],
  variable: '--font-eb-garamond',
  display: 'swap',
  preload: false,
})

/** Raleway — текст sound-silence: лёгкий, много воздуха. */
export const raleway = Raleway({
  subsets: ['latin', 'cyrillic'],
  weight: 'variable',
  variable: '--font-raleway',
  display: 'swap',
  preload: false,
})

/** Roboto Flex — iron-grid (Buka Fit): одна переменная гарнитура, ширина от сверхузкой до широкой — кинетический заголовок. */
export const robotoFlex = Roboto_Flex({
  subsets: ['latin', 'cyrillic'],
  weight: 'variable',
  axes: ['wdth'],
  variable: '--font-roboto-flex',
  display: 'swap',
  preload: false,
})

/** Fira Sans Extra Condensed — qozon (Sariq Sabzi): высокие плотные буквы, как вывеска над чайханой. */
export const firaExtraCondensed = Fira_Sans_Extra_Condensed({
  subsets: ['latin', 'cyrillic'],
  weight: ['700', '900'],
  variable: '--font-fira-xc',
  display: 'swap',
  preload: false,
})

/** Alegreya Sans — текст qozon: тёплый гуманистический гротеск. */
export const alegreyaSans = Alegreya_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  variable: '--font-alegreya-sans',
  display: 'swap',
  preload: false,
})

/** Playfair 2 — ustara (Ustara): при большом кегле волосяные засечки, как лезвие; ось ширины — для узкого начертания. */
export const playfairBlade = Playfair({
  subsets: ['latin', 'cyrillic'],
  weight: 'variable',
  axes: ['opsz', 'wdth'],
  variable: '--font-playfair-blade',
  display: 'swap',
  preload: false,
})

/** Inter — текст ustara: нейтральный и точный рядом с острыми засечками. */
export const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: 'variable',
  variable: '--font-inter',
  display: 'swap',
  preload: false,
})

/** Noto Serif Display — chinni (Chinni): тонкий контрастный антиква, как надпись кобальтом на фарфоре. */
export const notoSerifDisplay = Noto_Serif_Display({
  subsets: ['latin', 'cyrillic'],
  weight: 'variable',
  variable: '--font-noto-serif-display',
  display: 'swap',
  preload: false,
})

/** Mulish — текст chinni: мягкий, светлый, хорошо читается мелко. */
export const mulish = Mulish({
  subsets: ['latin', 'cyrillic'],
  weight: 'variable',
  variable: '--font-mulish',
  display: 'swap',
  preload: false,
})

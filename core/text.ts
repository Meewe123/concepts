import type { L10n, Locale } from './types'

export const NBSP = ' '

/** Короткие слова, после которых не должно быть переноса строки. */
const RU_SHORT = /(?<=^|[\s(«„])([а-яёА-ЯЁ]{1,2}|без|для|под|над|при|про|через|или|что|как) (?=\S)/g

/**
 * Типограф: «ёлочки», длинное тире с неразрывным пробелом перед ним,
 * неразрывные пробелы после коротких слов (RU), между числом и словом, после №.
 */
export function typo(input: string, locale: Locale): string {
  let s = input.replace(/"([^"]+)"/g, '«$1»')
  s = s.replace(/ +[—–-] +/g, `${NBSP}— `)
  s = s.replace(/№ ?(?=\d)/g, `№${NBSP}`)
  s = s.replace(/(\d) (?=[^\d\s—])/g, `$1${NBSP}`)
  if (locale === 'ru') s = s.replace(RU_SHORT, `$1${NBSP}`)
  return s
}

/** Достаёт текст нужного языка и прогоняет через типограф. */
export function tx(v: L10n, locale: Locale): string {
  return typo(v[locale], locale)
}

/** Склонение для русского: plural(5, ['гость', 'гостя', 'гостей']). */
export function pluralRu(n: number, forms: readonly [string, string, string]): string {
  const a = Math.abs(n) % 100
  const b = a % 10
  if (a > 10 && a < 20) return forms[2]
  if (b > 1 && b < 5) return forms[1]
  if (b === 1) return forms[0]
  return forms[2]
}

/** «300 гостей» / «300 mehmon»: в узбекском после числа — единственное число. */
export function countWord(n: number, locale: Locale, ru: readonly [string, string, string], uz: string): string {
  return locale === 'ru' ? pluralRu(n, ru) : uz
}

import { NBSP } from './text'
import type { Locale } from './types'

/** 18200000 → «18 200 000» с неразрывными пробелами. */
export function groupDigits(n: number): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, NBSP)
}

/** «300 000 сум» / «300 000 soʻm». */
export function formatSum(n: number, locale: Locale): string {
  return `${groupDigits(n)}${NBSP}${locale === 'ru' ? 'сум' : 'soʻm'}`
}

/** Телефон для показа: пробелы неразрывные, номер не разваливается на две строки. */
export function formatPhone(phone: string): string {
  return phone.replace(/ /g, NBSP)
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export function telegramHref(telegram: string): string {
  return telegram.startsWith('+')
    ? `https://t.me/${telegram.replace(/[^\d+]/g, '')}`
    : `https://t.me/${telegram.replace(/^@/, '')}`
}

export function instagramHref(username: string): string {
  return `https://www.instagram.com/${username.replace(/^@/, '')}/`
}

export function whatsappHref(phone: string): string {
  return `https://wa.me/${phone.replace(/\D/g, '')}`
}

const MONTHS_RU = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
const MONTHS_UZ = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr']

/** '2026-10' → «октябрь 2026» / «2026-yil oktabr». */
export function formatMonth(asOf: string, locale: Locale): string {
  const [y, m] = asOf.split('-').map(Number)
  const i = (m ?? 1) - 1
  return locale === 'ru' ? `${MONTHS_RU[i]} ${y}` : `${y}-yil ${MONTHS_UZ[i]}`
}

/** 5 → «5,0» / «5,0». */
export function formatRating(v: number): string {
  return v.toFixed(1).replace('.', ',')
}

/** Поиск в Яндекс Картах — когда ссылки на карточку организации нет. */
export function yandexSearch(text: string): string {
  return `https://yandex.uz/maps/?text=${encodeURIComponent(text)}`
}

import { conceptPath } from '@/core/paths'
import type { Lead, Locale } from '@/core/types'
import { formatPhone, instagramHref, telegramHref, whatsappHref } from '@/core/format'
import { absoluteUrl } from '@/site.config'

/**
 * Тексты сообщений и «куда писать» — общие для npm run pitch и пульта /internal.
 * Без node-модулей: модуль подключается и к странице.
 */
export const MAX = 350
const FORBIDDEN = [
  'мы делаем сайты',
  'уникальное предложение',
  'добро пожаловать',
  'команда профессионалов',
  'индивидуальный подход',
  'высокое качество по доступным ценам',
  'наша миссия',
  'lorem',
]

export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
export const low = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)
export const dot = (s: string) => s.replace(/[.\s]+$/, '')

/** Куда отправлять: Telegram, если есть; иначе Instagram, WhatsApp; иначе — что известно. */
export function sendTo(lead: Lead): string {
  const out: string[] = []
  if (lead.telegram) out.push(`Telegram: ${telegramHref(lead.telegram)}`)
  if (lead.instagram) out.push(`Instagram: ${instagramHref(lead.instagram)}`)
  if (lead.whatsapp) out.push(`WhatsApp: ${whatsappHref(lead.whatsapp)}`)
  if (!lead.telegram) out.unshift('Telegram не найден')
  if (!lead.telegram && !lead.instagram && !lead.whatsapp) out.push(`${lead.channel === 'facebook' ? 'Facebook — ссылка из таблицы заказчика; ' : ''}звонок: ${formatPhone(lead.phones[0]!)}`)
  return out.join(' · ')
}

export function linkFor(lead: Lead, locale: Locale): string {
  return absoluteUrl(conceptPath(lead, locale))
}

/** Текст сообщения под contactStatus лида. null — писать не нужно (ответили или отказались). */
export function message(lead: Lead, locale: Locale): string | null {
  const link = linkFor(lead, locale)
  // свой текст лида — вместо шаблона (заказчик пишет короче и живее шаблонов)
  const own = lead.pitchText?.[locale]
  if (own) return own.replace('{link}', link)
  const pitch = dot(lead.signaturePitch[locale])
  const hook = locale === 'ru' ? lead.hook : lead.hookUz
  const needHook = () => {
    if (!hook) throw new Error(`${lead.slug}: для статуса ${lead.contactStatus} на ${locale} нужен хук (hook / hookUz)`)
    return cap(dot(hook))
  }
  const ru = locale === 'ru'
  const name = lead.messageName?.[locale] ?? lead.name
  switch (lead.contactStatus) {
    case 'not-contacted':
      return ru
        ? `Здравствуйте! ${needHook()}. Набросал, как мог бы выглядеть сайт ${name}: ${link} — это концепт, удобнее смотреть с телефона. Если понравится, доведу до рабочего сайта с вашими фото и ценами за неделю.`
        : `Assalomu alaykum! ${needHook()}. ${name} sayti qanday boʻlishi mumkinligini chizib koʻrdim: ${link} — bu konsept, telefonda koʻrish qulayroq. Yoqsa, bir haftada suratlaringiz va narxlaringiz bilan ishlaydigan saytga aylantiraman.`
    case 'unread':
      return ru
        ? `Здравствуйте! ${needHook()}. Набросал концепт сайта ${name}: ${link} — удобнее смотреть с телефона.`
        : `Assalomu alaykum! ${needHook()}. ${name} uchun sayt konseptini chizdim: ${link} — telefonda koʻrish qulayroq.`
    case 'forwarded':
      return ru
        ? `Добрый день! Ваш контакт мне дали в ${lead.name}. Сделал концепт сайта: ${link} — ${low(pitch)}. Если интересно, доведу до рабочего сайта за неделю.`
        : `Assalomu alaykum! Kontaktingizni ${lead.name}da berishdi. Sayt konseptini tayyorladim: ${link}. ${pitch}. Qiziq boʻlsa, bir haftada ishlaydigan saytga aylantiraman.`
    case 'read-silent':
    case 'sent':
      return ru
        ? `Добрый день! Чтобы не объяснять на словах — сделал концепт сайта ${name}: ${link}. ${pitch}. Если интересно, доведу до рабочего сайта за неделю.`
        : // TODO: проверить носителем — вступление «Soʻz bilan tushuntirgandan koʻra koʻrsatish osonroq»
          `Assalomu alaykum! Soʻz bilan tushuntirgandan koʻra koʻrsatish osonroq — ${name} uchun sayt konseptini tayyorladim: ${link}. ${pitch}. Qiziq boʻlsa, bir haftada ishlaydigan saytga aylantiraman.`
    default:
      return null
  }
}

/** Правила сообщений: до 350 знаков, без эмодзи, без «!!», без запрещённых фраз, ссылка ровно одна. */
export function lintMessage(text: string, link: string, locale: Locale, name: string): string[] {
  const errors: string[] = []
  const length = [...text].length
  if (length > MAX) errors.push(`${length} знаков — больше ${MAX}`)
  if (/\p{Extended_Pictographic}/u.test(text)) errors.push('эмодзи')
  if (/!\s*!/.test(text)) errors.push('восклицательные знаки подряд')
  for (const f of FORBIDDEN) if (text.toLowerCase().includes(f)) errors.push(`запрещённая фраза «${f}»`)
  if (text.split(link).length !== 2) errors.push('ссылка должна встречаться ровно один раз')
  // в узбекском тексте апостроф вместо ʻ/ʼ — ошибка; название компании не трогаем (Mr. Gordon’s)
  if (locale === 'uz' && /['‘’`]/.test(text.split(name).join(''))) errors.push('апостроф вместо ʻ/ʼ')
  return errors
}

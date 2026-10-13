import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { kindLine } from './content'

export function beautyMeta(lead: Lead, locale: Locale) {
  const kind = kindLine(lead, locale)
  return {
    title: `${lead.name} — ${locale === 'ru' ? kind.charAt(0).toLowerCase() + kind.slice(1) : kind}`,
    description: tx(
      {
        ru: 'Концепт сайта: выберите услугу — сразу видно длительность, цену и ближайшие свободные окна. Запись в два касания.',
        uz: 'Sayt konsepti: xizmatni tanlang — davomiyligi, narxi va eng yaqin boʻsh vaqtlar darhol koʻrinadi.',
      },
      locale,
    ),
  }
}

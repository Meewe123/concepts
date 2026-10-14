import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { kindLine } from './content'

export function wellnessMeta(lead: Lead, locale: Locale) {
  const kind = kindLine(lead, locale)
  return {
    title: `${lead.name} — ${locale === 'ru' ? kind.charAt(0).toLowerCase() + kind.slice(1) : kind}`,
    description: tx(
      {
        ru: 'Концепт сайта: три вопроса — практика и ближайшее занятие; расписание недели и запись онлайн.',
        uz: 'Sayt konsepti: uchta savol — amaliyot va eng yaqin mashgʻulot; haftalik jadval va onlayn yozilish.',
      },
      locale,
    ),
  }
}

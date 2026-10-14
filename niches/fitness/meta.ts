import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { kindLine } from './content'

export function fitnessMeta(lead: Lead, locale: Locale) {
  const kind = kindLine(lead, locale)
  return {
    title: `${lead.name} — ${locale === 'ru' ? kind.charAt(0).toLowerCase() + kind.slice(1) : kind}`,
    description: tx(
      {
        ru: 'Концепт сайта: схема клубов как линия метро — выберите станцию, цель и время: абонемент и ближайшее занятие, гостевой визит.',
        uz: 'Sayt konsepti: klublar sxemasi metro liniyasidek — bekat, maqsad va vaqtni tanlang: abonement va eng yaqin mashgʻulot.',
      },
      locale,
    ),
  }
}

import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { kindLine } from './content'

export function restaurantMeta(lead: Lead, locale: Locale) {
  const kind = kindLine(lead, locale)
  return {
    title: `${lead.name} — ${locale === 'ru' ? kind.charAt(0).toLowerCase() + kind.slice(1) : kind}`,
    description: tx(
      {
        ru: 'Концепт сайта: бронь стола по схеме зала — зона, гости, день и время; меню и адрес.',
        uz: 'Sayt konsepti: zal sxemasi boʻyicha stol band qilish — zona, mehmonlar, kun va vaqt; menyu va manzil.',
      },
      locale,
    ),
  }
}

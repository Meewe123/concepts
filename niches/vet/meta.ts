import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { kindLine } from './content'

export function vetMeta(lead: Lead, locale: Locale) {
  const kind = kindLine(lead, locale)
  return {
    title: `${lead.name} — ${locale === 'ru' ? kind.charAt(0).toLowerCase() + kind.slice(1) : kind}`,
    description: tx(
      {
        ru: 'Концепт сайта: календарь прививок для кошки или собаки, цены и запись на приём.',
        uz: 'Sayt konsepti: mushuk yoki it uchun emlash taqvimi, narxlar va qabulga yozilish.',
      },
      locale,
    ),
  }
}

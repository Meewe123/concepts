import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { kindLine } from './content'

export function banquetMeta(lead: Lead, locale: Locale) {
  const kind = kindLine(lead, locale)
  return {
    title: `${lead.name} — ${locale === 'ru' ? kind.charAt(0).toLowerCase() + kind.slice(1) : kind}`,
    description: tx(
      {
        ru: 'Концепт сайта: схема зала по числу гостей, пакеты меню и проверка свободной даты.',
        uz: 'Sayt konsepti: mehmonlar soniga qarab zal sxemasi, menyu paketlari va boʻsh sanani tekshirish.',
      },
      locale,
    ),
  }
}

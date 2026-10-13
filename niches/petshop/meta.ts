import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { kindLine } from './content'

export function petshopMeta(lead: Lead, locale: Locale) {
  const kind = kindLine(lead, locale)
  return {
    title: `${lead.name} — ${locale === 'ru' ? kind.charAt(0).toLowerCase() + kind.slice(1) : kind}`,
    description: tx(
      {
        ru: 'Концепт сайта: подбор средства от блох и клещей по весу питомца, витрина с ценами и «Отложить» — заказ соберут к приходу.',
        uz: 'Sayt konsepti: hayvon vazniga qarab burga va kanaga qarshi vosita, narxli vitrina va «Ajratib qoʻyish» — buyurtma kelishingizga tayyor.',
      },
      locale,
    ),
  }
}

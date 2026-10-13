import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { kindLine } from './content'

export function autoMeta(lead: Lead, locale: Locale) {
  const kind = kindLine(lead, locale)
  return {
    title: `${lead.name} — ${locale === 'ru' ? kind.charAt(0).toLowerCase() + kind.slice(1) : kind}`,
    description: tx(
      {
        ru: 'Концепт сайта: класс машины и услуги → цена, время и «готово к…»; загрузка по часам и запись на время без очереди.',
        uz: 'Sayt konsepti: mashina sinfi va xizmatlar → narx, vaqt va «tayyor boʻladi…»; soatlar boʻyicha band va navbatsiz yozilish.',
      },
      locale,
    ),
  }
}

import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { kindLine } from './content'

export function educationMeta(lead: Lead, locale: Locale) {
  const kind = kindLine(lead, locale)
  return {
    title: `${lead.name} — ${locale === 'ru' ? kind.charAt(0).toLowerCase() + kind.slice(1) : kind}`,
    description: tx(
      {
        ru: 'Концепт сайта: тест уровня за минуту, подходящая группа и запись на пробный урок.',
        uz: 'Sayt konsepti: bir daqiqada daraja testi, mos guruh va sinov darsiga yozilish.',
      },
      locale,
    ),
  }
}

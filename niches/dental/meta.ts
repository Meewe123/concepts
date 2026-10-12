import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { kindLine } from './content'

export function dentalMeta(lead: Lead, locale: Locale) {
  const kind = kindLine(lead, locale)
  return {
    title: `${lead.name} — ${locale === 'ru' ? kind.charAt(0).toLowerCase() + kind.slice(1) : kind}`,
    description: tx(
      {
        ru: 'Концепт сайта: выберите, что беспокоит, — и сразу видно ориентир цены, число визитов и срок. Запись на консультацию.',
        uz: 'Sayt konsepti: nima bezovta qilayotganini tanlang — taxminiy narx, tashriflar soni va muddat darhol koʻrinadi. Konsultatsiyaga yozilish.',
      },
      locale,
    ),
  }
}

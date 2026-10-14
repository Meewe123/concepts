import { formatMonth, formatRating } from '@/core/format'
import { plaque, showcasePlaque, ui } from '@/core/i18n'
import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { Messengers, PhoneList } from './Contacts'
import { LangSwitch } from './LangSwitch'

/** Подвал: контакты, источники фактов и обязательная плашка «Демо-концепт». */
export function Footer({ lead, locale, stroke }: { lead: Lead; locale: Locale; stroke: number }) {
  return (
    <footer className="border-t border-line px-4 pt-12 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl leading-none">{lead.name}</p>
          <p className="mt-3 text-ink-2">{tx(lead.address, locale)}</p>
        </div>
        <PhoneList lead={lead} locale={locale} />
        <div className="grid content-start gap-2">
          <p className="text-sm text-ink-2">{ui.contacts[locale]}</p>
          <Messengers lead={lead} locale={locale} stroke={stroke} />
          <LangSwitch lead={lead} locale={locale} className="justify-self-start" />
        </div>
      </div>
      {lead.rating && (
        <p className="mx-auto mt-10 max-w-6xl text-sm text-ink-2">
          {locale === 'ru'
            ? `Рейтинг ${formatRating(lead.rating.value)} и ${lead.rating.count} оценок — ${ui.ratingSource.ru}, ${formatMonth(lead.rating.asOf, 'ru')}.`
            : `Reyting ${formatRating(lead.rating.value)} va ${lead.rating.count} ta baho — ${ui.ratingSource.uz}, ${formatMonth(lead.rating.asOf, 'uz')}.`}
        </p>
      )}
      {lead.showcase ? (
        <p className="concept-plaque mx-auto mt-10 max-w-6xl border-t border-line py-6 text-sm text-ink-2">
          {tx(showcasePlaque, locale)}{' '}
          <a href={locale === 'ru' ? '/' : '/uz'} className="underline decoration-1 underline-offset-4">
            {locale === 'ru' ? 'Вернуться к студии' : 'Studiyaga qaytish'}
          </a>
        </p>
      ) : (
        <p className="concept-plaque mx-auto mt-10 max-w-6xl border-t border-line py-6 text-sm text-ink-2">
          {tx(plaque(lead.messageName ?? lead.name), locale)}
        </p>
      )}
    </footer>
  )
}

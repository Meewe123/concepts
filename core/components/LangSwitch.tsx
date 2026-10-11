import { ui } from '@/core/i18n'
import type { Lead, Locale } from '@/core/types'

/** Обычная ссылка на вторую языковую версию — без JS. */
export function LangSwitch({ lead, locale, className = '' }: { lead: Lead; locale: Locale; className?: string }) {
  if (!lead.langs.includes('uz')) return null
  const other: Locale = locale === 'ru' ? 'uz' : 'ru'
  const href = other === 'uz' ? `/c/${lead.slug}/uz` : `/c/${lead.slug}`
  return (
    <a
      href={href}
      hrefLang={other}
      lang={other}
      className={`inline-flex min-h-11 items-center px-1 text-sm underline decoration-1 underline-offset-4 ${className}`}
    >
      {ui.langSwitch[locale]}
    </a>
  )
}

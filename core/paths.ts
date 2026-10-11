import type { Lead, Locale } from './types'

// Без зависимостей от next/font и компонентов — импортируется и из scripts/.

export function conceptPath(lead: Lead, locale: Locale): string {
  return locale === 'ru' ? `/c/${lead.slug}` : `/c/${lead.slug}/${locale}`
}

/** Картинка превью: public/og/<slug>.png и public/og/<slug>.uz.png — рендерит scripts/og.ts. */
export function ogImagePath(lead: Lead, locale: Locale): string {
  return locale === 'ru' ? `/og/${lead.slug}.png` : `/og/${lead.slug}.${locale}.png`
}

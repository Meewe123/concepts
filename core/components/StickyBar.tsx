import { Phone } from 'lucide-react'
import { telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import type { Locale } from '@/core/types'

/**
 * Нижняя панель на телефоне. Лежит последним элементом в обёртке после первого экрана:
 * sticky держит её внизу, пока обёртка на экране, и сама панель появляется только после первого экрана.
 */
export function StickyBar({
  label,
  phone,
  locale,
  stroke,
  href = '#data',
}: {
  label: string
  phone: string
  locale: Locale
  stroke: number
  href?: string
}) {
  return (
    <div className="sticky-bar sticky bottom-0 z-20 border-t border-line bg-bg px-4 py-3 md:hidden">
      <div className="flex gap-2">
        <a href={href} className="btn flex-1">
          {label}
        </a>
        <a href={telHref(phone)} className="btn btn-ghost btn-icon" aria-label={ui.call[locale]}>
          <Phone aria-hidden className="size-5" strokeWidth={stroke} />
        </a>
      </div>
    </div>
  )
}

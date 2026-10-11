import { Plus } from 'lucide-react'
import { tx } from '@/core/text'
import type { L10n, Locale } from '@/core/types'

/** Вопросы и ответы на <details>: раскрываются без JS. */
export function Faq({ items, locale, stroke }: { items: { q: L10n; a: L10n }[]; locale: Locale; stroke: number }) {
  return (
    <div className="faq border-t border-line">
      {items.map((item) => (
        <details key={item.q.ru} className="border-b border-line">
          <summary className="flex min-h-16 items-center justify-between gap-6 py-4 text-lg leading-snug">
            <span>{tx(item.q, locale)}</span>
            <Plus aria-hidden className="faq-mark size-5 shrink-0" strokeWidth={stroke} />
          </summary>
          <p className="max-w-2xl pb-6 text-ink-2">{tx(item.a, locale)}</p>
        </details>
      ))}
    </div>
  )
}

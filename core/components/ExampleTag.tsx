import { ui } from '@/core/i18n'
import type { Locale } from '@/core/types'

/** Пометка «пример» у данных, которых мы не знаем. */
export function ExampleTag({ locale, large = false }: { locale: Locale; large?: boolean }) {
  return <span className={large ? 'ex-tag ex-tag-lg' : 'ex-tag'}>{ui.example[locale]}</span>
}

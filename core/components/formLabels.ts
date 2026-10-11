import { ui } from '@/core/i18n'
import { tx } from '@/core/text'
import type { Locale } from '@/core/types'
import type { DemoFormLabels } from './DemoForm'

export function formLabels(locale: Locale, required: string): DemoFormLabels {
  return {
    name: ui.formName[locale],
    phone: ui.formPhone[locale],
    submit: ui.formSubmit[locale],
    sent: ui.formSent[locale],
    sentNote: tx(ui.formSentNote, locale),
    again: ui.formAgain[locale],
    required,
  }
}

import { Check } from 'lucide-react'

export interface DemoFormLabels {
  name: string
  phone: string
  submit: string
  sent: string
  sentNote: string
  again: string
  /** Текст ошибки, если не заполнены обязательные поля */
  required: string
}

export interface DemoFormChoice {
  name: string
  label: string
  options: string[]
  /** Не отмечать первый вариант заранее (например, «что беспокоит» — выбирает сам человек) */
  noDefault?: boolean
}

/**
 * Демо-форма: показывает «Заявка отправлена» и никуда ничего не отправляет (логика — в островке core/islands/form.ts).
 * method="dialog": даже без JS отправка не уводит со страницы и не кладёт телефон в адрес.
 * Поля ниши: дата, число и группы вариантов-«чипов». В продакшне — запрос к воркеру → Telegram-бот клиента.
 */
export function DemoForm({
  labels,
  date,
  number,
  choices = [],
  stroke,
}: {
  labels: DemoFormLabels
  date?: { label: string; required?: boolean }
  number?: { name: string; label: string; value: number; min: number; max: number; step: number }
  choices?: DemoFormChoice[]
  stroke: number
}) {
  return (
    <div data-demo-form="">
      <form method="dialog" noValidate className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="field">
            <span>{labels.name}</span>
            <input name="name" autoComplete="name" required />
          </label>
          <label className="field">
            <span>{labels.phone}</span>
            <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+998" required />
          </label>
          {date && (
            <label className="field">
              <span>{date.label}</span>
              <input name="date" type="date" required={date.required ?? true} />
            </label>
          )}
          {number && (
            <label className="field">
              <span>{number.label}</span>
              <input
                name={number.name}
                type="number"
                inputMode="numeric"
                min={number.min}
                max={number.max}
                step={number.step}
                defaultValue={number.value}
              />
            </label>
          )}
        </div>
        {choices.map((c) => (
          <fieldset key={c.name} className="grid gap-3">
            <legend className="mb-3 text-sm text-ink-2">{c.label}</legend>
            <div className="flex flex-wrap gap-2">
              {c.options.map((o, i) => (
                <label key={o}>
                  <input type="radio" name={c.name} value={o} defaultChecked={!c.noDefault && i === 0} className="sr-only" />
                  <span className="chip">{o}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        <p role="alert" data-error="" hidden className="text-sm font-semibold">
          {labels.required}
        </p>
        <button type="submit" className="btn w-full sm:w-auto sm:justify-self-start">
          {labels.submit}
        </button>
      </form>
      <div role="status" data-sent="" hidden tabIndex={-1} className="grid gap-4 border border-line p-6 outline-none sm:p-8">
        <span className="grid size-12 place-items-center rounded-full bg-accent text-accent-ink">
          <Check aria-hidden className="size-6" strokeWidth={stroke + 0.5} />
        </span>
        <p className="font-display text-3xl leading-tight">{labels.sent}</p>
        <p className="max-w-md text-ink-2">{labels.sentNote}</p>
        <button type="button" data-again="" className="btn btn-ghost justify-self-start">
          {labels.again}
        </button>
      </div>
    </div>
  )
}

import { Check } from 'lucide-react'

export interface DemoFormLabels {
  name: string
  phone: string
  date: string
  guests: string
  choice: string
  submit: string
  sent: string
  sentNote: string
  again: string
  required: string
}

/**
 * Демо-форма: показывает «Заявка отправлена» и никуда ничего не отправляет (логика — в островке core/islands/form.ts).
 * method="dialog": даже без JS отправка не уводит со страницы и не кладёт телефон в адрес.
 * В продакшне здесь будет запрос к воркеру, который перешлёт заявку в Telegram-бот клиента.
 */
export function DemoForm({
  labels,
  choices,
  defaultGuests,
  maxGuests,
  stroke,
}: {
  labels: DemoFormLabels
  choices: string[]
  defaultGuests: number
  maxGuests: number
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
          <label className="field">
            <span>{labels.date}</span>
            <input name="date" type="date" required />
          </label>
          <label className="field">
            <span>{labels.guests}</span>
            <input name="guests" type="number" inputMode="numeric" min={10} max={maxGuests} step={10} defaultValue={defaultGuests} />
          </label>
        </div>
        <fieldset className="grid gap-3">
          <legend className="mb-3 text-sm text-ink-2">{labels.choice}</legend>
          <div className="flex flex-wrap gap-2">
            {choices.map((c, i) => (
              <label key={c}>
                <input type="radio" name="event" value={c} defaultChecked={i === 0} className="sr-only" />
                <span className="chip">{c}</span>
              </label>
            ))}
          </div>
        </fieldset>
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

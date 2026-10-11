/** Островок демо-формы: проверка обязательных полей и «Заявка отправлена». Данные никуда не уходят. */
export function initDemoForm(root: HTMLElement): void {
  const form = root.querySelector('form')
  const sent = root.querySelector<HTMLElement>('[data-sent]')
  const error = root.querySelector<HTMLElement>('[data-error]')
  if (!form || !sent || !error) return

  const date = form.querySelector<HTMLInputElement>('input[type=date]')
  if (date) {
    const now = new Date()
    date.min = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const required = [...form.querySelectorAll<HTMLInputElement>('input[required]')]
    const ok = required.every((i) => i.value.trim())
    error.hidden = ok
    if (!ok) {
      required.find((i) => !i.value.trim())?.focus()
      return
    }
    form.hidden = true
    sent.hidden = false
    sent.focus()
  })

  root.querySelector('[data-again]')?.addEventListener('click', () => {
    form.reset()
    sent.hidden = true
    form.hidden = false
  })
}

/**
 * Передать в форму то, что человек выбрал в сигнатурном интерактиве:
 * для радиокнопок отмечается вариант с таким значением, для остальных полей — значение.
 */
export function prefillForm(values: Record<string, string | number>): void {
  const form = document.querySelector<HTMLFormElement>('[data-demo-form] form')
  if (!form) return
  for (const [name, value] of Object.entries(values)) {
    const inputs = form.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`)
    inputs.forEach((i) => {
      if (i.type === 'radio') i.checked = i.value === String(value)
      else i.value = String(value)
    })
  }
}

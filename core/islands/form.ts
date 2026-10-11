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
    const data = new FormData(form)
    const ok = ['name', 'phone', 'date'].every((k) => String(data.get(k) ?? '').trim())
    error.hidden = ok
    if (!ok) return
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

/** Подставить число гостей в форму — из сигнатурного интерактива. */
export function prefillGuests(guests: number): void {
  const input = document.querySelector<HTMLInputElement>('[data-demo-form] input[name=guests]')
  if (input) input.value = String(guests)
}

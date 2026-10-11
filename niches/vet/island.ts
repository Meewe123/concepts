import { initDemoForm, prefillForm } from '@/core/islands/form'
import type { Pet } from '@/core/types'
import { approxDate, rowElement } from './plan-view'
import { ageLabel, MAX_AGE, vaccinePlan } from './vaccines'
import type { VaccineConfig } from './VaccineCalendar'

/** Островок ниши vet: календарь прививок и демо-форма. */
function initCalendar(root: HTMLElement): void {
  const cfgEl = root.querySelector('script[type="application/json"]')
  const age = root.querySelector<HTMLInputElement>('[data-i=age]')
  const plan = root.querySelector<HTMLOListElement>('[data-o=plan]')
  const ageOut = root.querySelector<HTMLElement>('[data-o=age]')
  if (!cfgEl?.textContent || !age || !plan || !ageOut) return
  const cfg = JSON.parse(cfgEl.textContent) as VaccineConfig
  const radios = root.querySelectorAll<HTMLInputElement>('input[name=vax-pet]')
  const pet = (): Pet => ([...radios].find((r) => r.checked)?.value as Pet) ?? 'dog'

  function render(): void {
    const months = Number(age!.value)
    const p = pet()
    root.dataset.pet = p
    root.style.setProperty('--grow', String(months / MAX_AGE))
    const label = ageLabel(months, cfg.locale)
    ageOut!.textContent = label
    age!.setAttribute('aria-valuetext', label)
    age!.style.setProperty('--p', `${((months - 1) / (MAX_AGE - 1)) * 100}%`)
    plan!.replaceChildren(...vaccinePlan(p, months, cfg.locale).map((r) => rowElement(r, cfg.locale)))
  }

  age.addEventListener('input', render)
  radios.forEach((r) => r.addEventListener('change', render))
  root.querySelector('[data-o=cta]')?.addEventListener('click', () =>
    prefillForm({ pet: cfg.petLabels[pet()], service: cfg.vaccineService }),
  )
  // даты считаются от сегодняшнего дня — только в браузере
  root.querySelectorAll<HTMLElement>('[data-weeks]').forEach((el) => (el.textContent = approxDate(Number(el.dataset.weeks), cfg.locale)))
  render()
}

/** Живые часы Ташкента — для круглосуточных клиник. */
function initClock(el: HTMLElement): void {
  const fmt = new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Tashkent' })
  const tick = () => (el.textContent = fmt.format(new Date()))
  tick()
  setInterval(tick, 15000)
}

document.querySelectorAll<HTMLElement>('[data-vaccines]').forEach(initCalendar)
document.querySelectorAll<HTMLElement>('[data-clock]').forEach(initClock)
document.querySelectorAll<HTMLElement>('[data-demo-form]').forEach(initDemoForm)

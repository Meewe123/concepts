import { formatSum, groupDigits } from '@/core/format'
import { initDemoForm, prefillForm } from '@/core/islands/form'
import { countWord } from '@/core/text'
import { GUESTS_RU, TABLES_RU, plannerState, type PlannerConfig } from './planner-shared'

/**
 * Островок ниши banquet — единственный JS на странице концепта (кроме счётчика).
 * Собирается scripts/islands.ts в public/islands/banquet.js.
 */
function initPlanner(root: HTMLElement): void {
  const cfgEl = root.querySelector('script[type="application/json"]')
  const range = root.querySelector<HTMLInputElement>('[data-i=range]')
  const stage = root.querySelector<HTMLElement>('[data-o=stage]')
  if (!cfgEl?.textContent || !range || !stage) return
  const cfg = JSON.parse(cfgEl.textContent) as PlannerConfig
  const set = (key: string, value: string) => root.querySelectorAll<HTMLElement>(`[data-o="${key}"]`).forEach((el) => (el.textContent = value))
  const radios = root.querySelectorAll<HTMLInputElement>('input[name=planner-package]')
  let pkgId = [...radios].find((r) => r.checked)?.value ?? cfg.packages[0]!.id

  function render(): void {
    const s = plannerState(cfg, Number(range!.value), pkgId)
    set('guests', groupDigits(s.guests))
    set('guestsWord', countWord(s.guests, cfg.locale, GUESTS_RU, 'mehmon'))
    set('tables', String(s.tables))
    set('tablesWord', countWord(s.tables, cfg.locale, TABLES_RU, 'stol'))
    set('hallName', s.hall.name)
    set('tablesOf', s.tablesOf)
    set('sum', `≈ ${formatSum(s.total, cfg.locale)}`)
    set('calc', s.calc)
    set('cta', s.cta)
    stage!.style.setProperty('--filled', String(s.tables))
    range!.style.setProperty('--p', `${s.progress}%`)
    range!.setAttribute('aria-valuetext', s.valueText)
    root.querySelectorAll<HTMLElement>('[data-scheme]').forEach((el) => (el.hidden = el.dataset.scheme !== s.hall.id))
    root.querySelectorAll<HTMLButtonElement>('[data-hall]').forEach((btn) => {
      const active = btn.dataset.hall === s.hall.id
      btn.setAttribute('aria-pressed', String(active))
      const fits = btn.querySelector<HTMLElement>('[data-fits]')
      if (fits) fits.hidden = !active
    })
  }

  range.addEventListener('input', render)
  radios.forEach((r) => r.addEventListener('change', () => ((pkgId = r.value), render())))
  root.querySelectorAll<HTMLButtonElement>('[data-hall]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const hall = cfg.halls.find((h) => h.id === btn.dataset.hall)
      if (!hall) return
      range.value = String(Math.min(Number(range.value), hall.capacity))
      // если гостей меньше, чем вмещает меньший зал, — показываем этот зал на его вместимости
      const smaller = cfg.halls.filter((h) => h.capacity < hall.capacity).map((h) => h.capacity)
      if (smaller.length && Number(range.value) <= Math.max(...smaller)) range.value = String(hall.capacity)
      render()
    }),
  )
  root.querySelector('[data-o=cta]')?.addEventListener('click', () => prefillForm({ guests: range.value }))
  render()
}

document.querySelectorAll<HTMLElement>('[data-planner]').forEach(initPlanner)
document.querySelectorAll<HTMLElement>('[data-demo-form]').forEach(initDemoForm)

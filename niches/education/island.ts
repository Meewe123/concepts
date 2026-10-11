import { initDemoForm, prefillForm } from '@/core/islands/form'
import type { LevelTestConfig } from './LevelTest'

/** Островок ниши education: тест уровня и демо-форма. */
function initTest(root: HTMLElement): void {
  const cfgEl = root.querySelector('script[type="application/json"]')
  if (!cfgEl?.textContent) return
  const cfg = JSON.parse(cfgEl.textContent) as LevelTestConfig
  const q = (sel: string) => root.querySelector<HTMLElement>(sel)
  const set = (key: string, value: string) => {
    const el = q(`[data-o="${key}"]`)
    if (el) el.textContent = value
  }
  const result = q('[data-result]')!
  const hint = q('[data-o="hint"]')!
  const check = q('[data-check]')!
  let level = cfg.levels[0]!

  check.addEventListener('click', () => {
    const picked = cfg.answers.map((_, i) => root.querySelector<HTMLInputElement>(`input[name="lt-${i}"]:checked`))
    if (picked.some((p) => !p)) {
      hint.hidden = false
      root.querySelector<HTMLElement>(`[data-q="${picked.findIndex((p) => !p)}"]`)?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      return
    }
    hint.hidden = true
    let correct = 0
    picked.forEach((p, i) => {
      const right = Number(p!.value) === cfg.answers[i]
      if (right) correct++
      const li = root.querySelector<HTMLElement>(`[data-q="${i}"]`)!
      li.dataset.mark = right ? 'right' : 'wrong'
      li.querySelectorAll<HTMLElement>('[data-opt]').forEach((o) => {
        o.dataset.correct = String(Number(o.dataset.opt) === cfg.answers[i])
        o.dataset.picked = String(o.dataset.opt === p!.value)
      })
    })
    level = cfg.levels[Math.max(0, Math.min(cfg.levels.length - 1, correct - 1))]!
    set('level', level.code)
    set('levelName', level.name)
    set('score', `${correct} / ${cfg.answers.length} ${cfg.labels.score}`)
    const ielts = q('[data-o="ielts"]')!
    ielts.hidden = !(cfg.ielts && level.ielts)
    if (cfg.ielts && level.ielts) ielts.textContent = `IELTS ≈ ${level.ielts}`
    const group = cfg.groups.find((g) => g.level === level.code)
    set('group', group ? `${cfg.labels.group}: ${group.text}` : cfg.labels.noGroup)
    root.dataset.done = 'true'
    check.hidden = true
    result.hidden = false
    result.focus({ preventScroll: true })
  })

  q('[data-reset]')?.addEventListener('click', () => {
    root.querySelectorAll<HTMLInputElement>('input[type=radio]').forEach((r) => (r.checked = false))
    root.querySelectorAll<HTMLElement>('[data-q]').forEach((li) => delete li.dataset.mark)
    root.querySelectorAll<HTMLElement>('[data-opt]').forEach((o) => {
      delete o.dataset.correct
      delete o.dataset.picked
    })
    delete root.dataset.done
    result.hidden = true
    check.hidden = false
  })

  q('[data-o="cta"]')?.addEventListener('click', () => prefillForm({ level: level.code }))
}

document.querySelectorAll<HTMLElement>('[data-leveltest]').forEach(initTest)
document.querySelectorAll<HTMLElement>('[data-demo-form]').forEach(initDemoForm)

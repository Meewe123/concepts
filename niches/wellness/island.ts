import { initDemoForm, prefillForm } from '@/core/islands/form'
import { tashkentNow } from '@/niches/beauty/slots'
import type { WellnessConfig } from './parts'

/**
 * Островок ниши wellness: три ответа → практика (по совпадению тегов) и ближайшее занятие из расписания
 * (от текущего времени Ташкента, с учётом «когда удобно»); «сегодня» в расписании; передача в форму; ответы в хеше.
 */
const cfg = JSON.parse(document.getElementById('wl-cfg')!.textContent!) as WellnessConfig
const L = cfg.labels
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
const pad = (n: number) => String(n).padStart(2, '0')
const toMin = (hm: string) => Number(hm.slice(0, 2)) * 60 + Number(hm.slice(3, 5))

/** Ближайшее занятие практики не раньше чем через 30 минут; when — morning / evening / weekend. */
function nextSession(practice: string, when?: string) {
  const now = tashkentNow()
  const nowMin = now.getHours() * 60 + now.getMinutes()
  const fits = (day: number, time: string) =>
    when === 'morning' ? toMin(time) < 12 * 60 : when === 'evening' ? toMin(time) >= 17 * 60 : when === 'weekend' ? day === 0 || day === 6 : true
  for (const strict of [true, false])
    for (let d = 0; d < 14; d++) {
      const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + d)
      const list = cfg.week
        .filter((c) => c.practice === practice && c.day === date.getDay() && (!strict || fits(c.day, c.time)))
        .filter((c) => d > 0 || toMin(c.time) > nowMin + 30)
        .sort((a, b) => toMin(a.time) - toMin(b.time))
      if (list[0]) {
        const label = d === 0 ? L.today : d === 1 ? L.tomorrow : L.days[date.getDay()]!
        return { date: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`, time: list[0].time, label }
      }
    }
  return null
}

function initQuiz(root: HTMLElement): void {
  const names = [...new Set([...root.querySelectorAll<HTMLInputElement>('input[name^="wq-"]')].map((i) => i.name))]
  const out = (k: string, text: string) => root.querySelectorAll(`[data-o=${k}]`).forEach((el) => (el.textContent = text))
  const cta = root.querySelector<HTMLAnchorElement>('[data-o=cta]')
  const ctaText = root.querySelector<HTMLElement>('[data-o=cta-text]')

  const update = (writeHash: boolean) => {
    const answers = names.map((n) => root.querySelector<HTMLInputElement>(`input[name="${n}"]:checked`)?.value)
    root.dataset.answered = String(answers.filter(Boolean).length)
    if (answers.some((a) => !a)) {
      root.dataset.state = 'empty'
      if (ctaText) ctaText.textContent = L.again
      cta?.setAttribute('aria-disabled', 'true')
      return
    }
    const when = root.querySelector<HTMLInputElement>('input[name="wq-when"]:checked')?.value
    const tags = answers.filter((a) => a !== when) as string[]
    // практика с наибольшим числом совпавших ответов; при равенстве — та, что раньше в списке
    let best = ''
    let score = -1
    for (const [id, p] of Object.entries(cfg.practices)) {
      const s = tags.filter((t) => p.tags.includes(t)).length + (when && p.tags.includes(when) ? 0.5 : 0)
      if (s > score) [best, score] = [id, s]
    }
    const p = cfg.practices[best]!
    const next = nextSession(best, when)
    root.dataset.state = 'done'
    root.dataset.pick = best
    out('practice', p.name)
    out('about', p.about)
    out('meta', p.meta)
    out('next', next ? `${next.label}, ${next.time}` : L.none)
    if (ctaText) ctaText.textContent = L.bookThis
    cta?.removeAttribute('aria-disabled')
    prefillForm({ practice: p.name, ...(next ? { date: next.date, time: next.time } : {}) })
    if (writeHash) history.replaceState(history.state, '', `${location.pathname}${location.search}#${answers.join('-')}`)
  }

  root.addEventListener('change', () => update(true))
  cta?.addEventListener('click', (e) => {
    if (cta.getAttribute('aria-disabled') === 'true') {
      e.preventDefault()
      e.stopPropagation()
      root.querySelector('fieldset')?.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' })
    }
  })

  const want = location.hash.slice(1).split('-')
  if (want.length === names.length) {
    names.forEach((n, i) => {
      const input = root.querySelector<HTMLInputElement>(`input[name="${n}"][value="${want[i]}"]`)
      if (input) input.checked = true
    })
    if (names.every((n) => root.querySelector(`input[name="${n}"]:checked`))) root.closest('section')?.scrollIntoView({ block: 'start' })
  }
  update(false)
}

/** «Сегодня» в расписании недели. */
const today = tashkentNow().getDay()
document.querySelectorAll<HTMLElement>(`[data-week] [data-day="${today}"]`).forEach((el) => el.setAttribute('data-today', ''))

/** Якоря прокручиваем сами, чтобы не затереть ответы в хеше. */
document.addEventListener('click', (e) => {
  const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
  const target = a ? document.getElementById(a.getAttribute('href')!.slice(1)) : null
  if (!target || e.defaultPrevented) return
  e.preventDefault()
  target.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' })
})

document.querySelectorAll<HTMLElement>('[data-quiz]').forEach(initQuiz)
document.querySelectorAll<HTMLElement>('[data-demo-form]').forEach(initDemoForm)

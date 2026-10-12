import { initDemoForm, prefillForm } from '@/core/islands/form'
import { DENTAL_CONCERNS } from '@/core/types'

/**
 * Островок ниши dental. Сами панели переключает CSS (:has), здесь — только то, что CSS не умеет:
 * выбор в хеше адреса (ссылку можно переслать), восстановление по ссылке, передача выбора в форму
 * и прокрутка к якорям без потери хеша.
 */
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
const HASH = new RegExp(`^#(${DENTAL_CONCERNS.join('|')})(?:-(6|12))?$`)

function initConcern(root: HTMLElement): void {
  const options = [...root.querySelectorAll<HTMLInputElement>('input[name=dc-concern]')]
  const picked = () => options.find((o) => o.checked)

  const state = (): string => {
    const c = picked()
    if (!c) return ''
    const m = root.querySelector<HTMLInputElement>(`input[name="dc-months-${c.value}"]:checked`)
    return m && m.value !== '6' ? `${c.value}-${m.value}` : c.value
  }
  const save = () => history.replaceState(history.state, '', `${location.pathname}${location.search}#${state()}`)

  const reveal = () => {
    const panel = root.querySelector<HTMLElement>(`[data-panel="${picked()?.value}"]`)
    if (!panel) return
    const r = panel.getBoundingClientRect()
    // на телефоне результат под шестью карточками — подкрутить, чтобы его было видно
    if (r.top > innerHeight - 160) panel.scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' })
  }

  root.addEventListener('change', (e) => {
    const t = e.target as HTMLInputElement
    save()
    if (t.name === 'dc-concern') reveal()
  })

  root.querySelectorAll<HTMLElement>('[data-book]').forEach((a) =>
    a.addEventListener('click', () => {
      const label = picked()?.dataset.label
      if (label) prefillForm({ concern: label })
    }),
  )

  const m = location.hash.match(HASH)
  if (m) {
    const opt = options.find((o) => o.value === m[1])
    if (opt) {
      opt.checked = true
      if (m[2]) {
        const month = root.querySelector<HTMLInputElement>(`input[name="dc-months-${m[1]}"][value="${m[2]}"]`)
        if (month) month.checked = true
      }
      root.closest('section')?.scrollIntoView({ block: 'start' })
    }
  }
}

/** Якоря (#zapis и др.) прокручиваем сами: обычный переход затёр бы выбор в хеше. */
function initAnchors(): void {
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
    const id = a?.getAttribute('href')?.slice(1)
    const target = id ? document.getElementById(id) : null
    if (!target) return
    e.preventDefault()
    target.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' })
  })
}

document.querySelectorAll<HTMLElement>('[data-concern]').forEach(initConcern)
document.querySelectorAll<HTMLElement>('[data-family]').forEach((b) =>
  b.addEventListener('click', () => prefillForm({ who: b.dataset.family ?? '' })),
)
document.querySelectorAll<HTMLElement>('[data-demo-form]').forEach(initDemoForm)
initAnchors()

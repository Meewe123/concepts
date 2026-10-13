import { initDemoForm, prefillForm } from '@/core/islands/form'
import type { BookerConfig } from './Booker'
import { fmtDuration, fmtPrice } from './content'
import { dayLabel, freeSlots, tashkentNow } from './slots'

/** Островок ниши beauty: услуга → длительность, цена, ближайшие окна → выбор окна → запись. */
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

function initBooker(root: HTMLElement): void {
  const cfgEl = root.querySelector('script[type="application/json"]')
  if (!cfgEl?.textContent) return
  const cfg = JSON.parse(cfgEl.textContent) as BookerConfig
  const tpl = root.querySelector<HTMLTemplateElement>('template[data-tpl=slot]')
  const box = root.querySelector<HTMLElement>('[data-o=slots]')
  const cta = root.querySelector<HTMLAnchorElement>('a[data-o=cta]')
  const now = tashkentNow()
  const set = (key: string, text: string) => root.querySelectorAll<HTMLElement>(`[data-o="${key}"]`).forEach((el) => (el.textContent = text))
  const checked = (name: string) => root.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)

  let picked: { service: string; date: string; time: string } | null = null
  let minutes = 0

  function render(): void {
    const s = checked('bk-service')
    const svc = s ? cfg.services[s.value] : undefined
    picked = null
    if (!svc) {
      root.dataset.state = 'empty'
      return
    }
    const variant = cfg.variants[checked('bk-variant')?.value ?? '']
    minutes = Math.round((svc.minutes * (variant?.t ?? 1)) / 15) * 15
    const price = Math.round((svc.price * (variant?.k ?? 1)) / 5000) * 5000
    set('name', svc.name)
    set('duration', fmtDuration(minutes, cfg.locale))
    set('price', fmtPrice(price, svc.from, cfg.locale))
    root.style.setProperty('--minutes', String(minutes))

    const branch = checked('bk-branch')?.value ?? ''
    const slots = freeSlots(now, cfg.schedule, minutes, `${cfg.seed}|${s!.value}|${branch}`)
    if (box && tpl) {
      box.replaceChildren(
        ...slots.map((slot, i) => {
          const node = tpl.content.firstElementChild!.cloneNode(true) as HTMLElement
          const input = node.querySelector('input')!
          const day = dayLabel(slot, cfg.locale, cfg.labels.today, cfg.labels.tomorrow)
          input.value = `${slot.date}T${slot.time}`
          input.dataset.label = `${day}, ${slot.time}`
          node.querySelector('[data-f=day]')!.textContent = day
          node.querySelector('[data-f=time]')!.textContent = slot.time
          node.style.setProperty('--i', String(i))
          return node
        }),
      )
    }
    root.querySelectorAll<HTMLElement>('[data-o=noslots]').forEach((el) => (el.hidden = slots.length > 0))
    set('cta-text', cfg.labels.chooseSlot)
    set('until', '')
    cta?.setAttribute('aria-disabled', 'true')
    root.dataset.state = 'picked'
  }

  /** На телефоне итог ниже списка услуг — подкрутить, чтобы его было видно. */
  const reveal = () => {
    const res = root.querySelector<HTMLElement>('[data-o=result]')
    if (!res) return
    const r = res.getBoundingClientRect()
    if (r.top > innerHeight - 140) res.scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' })
  }

  root.addEventListener('change', (e) => {
    const t = e.target as HTMLInputElement
    if (t.name !== 'bk-slot') {
      render()
      if (t.name === 'bk-service') reveal()
      return
    }
    const s = checked('bk-service')
    if (!s) return
    const [date, time] = t.value.split('T') as [string, string]
    picked = { service: cfg.services[s.value]!.name, date, time }
    set('cta-text', `${cfg.labels.bookAt} ${t.dataset.label}`)
    const [h, m] = time.split(':').map(Number) as [number, number]
    const end = (h * 60 + m + minutes) % (24 * 60)
    set('until', `${time} — ${String(Math.floor(end / 60)).padStart(2, '0')}:${String(end % 60).padStart(2, '0')}`)
    cta?.removeAttribute('aria-disabled')
    root.dataset.state = 'slot'
    if (root.hasAttribute('data-burst')) {
      const r = (t.closest('label') ?? t).getBoundingClientRect()
      burst(r.left + r.width / 2, r.top + r.height / 2)
    }
  })

  cta?.addEventListener('click', (e) => {
    if (!picked) {
      // окно ещё не выбрано — показать окна, а не уводить к форме
      e.preventDefault()
      ;(box ?? root).scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' })
      return
    }
    const branch = checked('bk-branch')?.dataset.label
    prefillForm({ service: picked.service, date: picked.date, time: picked.time, ...(branch ? { branch } : {}) })
  })

  render()
}

/** Конфетти из точки касания — только у направлений, которые попросили (data-burst / data-confetti). */
const COLORS = ['#ff6b6b', '#ffc145', '#4ecdc4', '#7b6cf6', '#ff8fb1', '#2ec27e']
function burst(x: number, y: number, n = 22): void {
  if (reduced) return
  const layer = document.createElement('div')
  layer.className = 'cf-layer'
  layer.setAttribute('aria-hidden', 'true')
  for (let i = 0; i < n; i++) {
    const p = document.createElement('i')
    const a = (Math.PI * 2 * i) / n + Math.random() * 0.5
    const d = 50 + Math.random() * 90
    p.style.cssText = `left:${x}px;top:${y}px;--x:${Math.cos(a) * d}px;--y:${Math.sin(a) * d - 30}px;--r:${Math.random() * 540 - 270}deg;background:${COLORS[i % COLORS.length]};${i % 3 ? '' : 'border-radius:50%;'}`
    layer.append(p)
  }
  document.body.append(layer)
  setTimeout(() => layer.remove(), 1100)
}

document.querySelectorAll<HTMLElement>('[data-booker]').forEach(initBooker)
document.querySelectorAll<HTMLElement>('[data-confetti]').forEach((el) =>
  el.addEventListener('pointerdown', (e) => {
    if ((e.target as Element).closest('a, button, input, label')) return
    burst(e.clientX, e.clientY, 14)
  }),
)
document.querySelectorAll<HTMLElement>('[data-demo-form]').forEach(initDemoForm)

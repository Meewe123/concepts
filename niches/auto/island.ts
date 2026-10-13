import { groupDigits } from '@/core/format'
import { initDemoForm, prefillForm } from '@/core/islands/form'
import { dayLabel, freeSlots, tashkentNow } from '@/niches/beauty/slots'
import type { AutoConfig } from './parts'

/**
 * Островок ниши auto: расчёт цены и времени по классу машины и услугам, «готово к…» от текущего
 * времени Ташкента и демо-загрузки, очередь сейчас, ближайшие окна, передача в форму. Выбор — в хеше (#suv:wash,polish).
 */
const cfg = JSON.parse(document.getElementById('au-cfg')!.textContent!) as AutoConfig
const L = cfg.labels
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
const NBSP = ' '
const pad = (n: number) => String(n).padStart(2, '0')
const money = (n: number) => `${groupDigits(n)}${NBSP}${L.sum}`
const toMin = (hm: string) => Number(hm.slice(0, 2)) * 60 + Number(hm.slice(3, 5))
const fmtMin = (m: number) => [Math.floor(m / 60) ? `${Math.floor(m / 60)}${NBSP}${L.h}` : '', m % 60 ? `${m % 60}${NBSP}${L.m}` : ''].filter(Boolean).join(' ')
const open = toMin(cfg.schedule.open)
const close = toMin(cfg.schedule.close)

/** Очередь сейчас по демо-загрузке часа. */
function queueNow() {
  const now = tashkentNow()
  const m = now.getHours() * 60 + now.getMinutes()
  const isOpen = cfg.schedule.days.includes(now.getDay()) && m >= open && m < close
  const load = isOpen ? (cfg.load[Math.floor((m - open) / 60)] ?? 0) : 0
  return { now, m, isOpen, hour: now.getHours(), wait: Math.round((load * cfg.maxWait) / 5) * 5, cars: Math.round(load * 6) }
}

function renderQueue(): void {
  const q = queueNow()
  document.querySelectorAll<HTMLElement>('[data-queue]').forEach((el) => {
    el.dataset.state = q.isOpen ? 'open' : 'closed'
    el.querySelectorAll('[data-o=q-cars]').forEach((o) => (o.textContent = String(q.cars)))
    el.querySelectorAll('[data-o=q-wait]').forEach((o) => (o.textContent = q.wait ? `≈${NBSP}${fmtMin(q.wait)}` : `0${NBSP}${L.m}`))
    el.querySelectorAll<HTMLElement>('[data-h]').forEach((b) => b.toggleAttribute('data-now', q.isOpen && Number(b.dataset.h) === q.hour))
  })
}

function initCalc(root: HTMLElement): void {
  const classes = [...root.querySelectorAll<HTMLInputElement>('input[name=au-class]')]
  const svcs = [...root.querySelectorAll<HTMLInputElement>('input[name=au-svc]')]
  const slotsBox = root.querySelector<HTMLElement>('[data-o=slots]')
  const tpl = root.querySelector<HTMLTemplateElement>('template[data-tpl=slot]')
  const noSlots = root.querySelector<HTMLElement>('[data-o=noslots]')
  const cta = root.querySelector<HTMLAnchorElement>('[data-o=cta]')
  const ctaText = root.querySelector<HTMLElement>('[data-o=cta-text]')
  const out = (name: string, text: string) => root.querySelectorAll(`[data-o=${name}]`).forEach((el) => (el.textContent = text))
  let minutes = 0
  let slotKey = ''

  const picked = () => svcs.filter((s) => s.checked).map((s) => s.value)
  const cls = () => classes.find((c) => c.checked)?.value ?? classes[0]!.value

  const renderSlots = () => {
    if (!slotsBox || !tpl) return
    const key = `${minutes}`
    if (key === slotKey) return
    slotKey = key
    const list = minutes ? freeSlots(tashkentNow(), cfg.schedule, minutes, cfg.seed, 4, 2) : []
    slotsBox.replaceChildren(
      ...list.map((s, i) => {
        const node = tpl.content.firstElementChild!.cloneNode(true) as HTMLElement
        const input = node.querySelector('input')!
        input.value = `${s.date}|${s.time}`
        node.querySelector('[data-f=day]')!.textContent = dayLabel(s, cfg.locale, L.today, L.tomorrow)
        node.querySelector('[data-f=time]')!.textContent = s.time
        node.style.setProperty('--i', String(i))
        return node
      }),
    )
    if (noSlots) noSlots.hidden = list.length > 0 || !minutes
    if (ctaText) ctaText.textContent = L.pick
    cta?.setAttribute('aria-disabled', 'true')
    root.dataset.slot = ''
  }

  const update = (writeHash: boolean) => {
    const c = cfg.classes[cls()]!
    const ids = picked()
    const price = Math.round((ids.reduce((s, id) => s + cfg.services[id]!.price, 0) * c.k) / 5000) * 5000
    minutes = ids.length ? Math.max(5, Math.round((ids.reduce((s, id) => s + cfg.services[id]!.minutes, 0) * c.t) / 5) * 5) : 0
    root.dataset.empty = ids.length ? 'false' : 'true'
    out('price', ids.length ? money(price) : '—')
    out('minutes', ids.length ? fmtMin(minutes) : '—')
    // «готово к» = сейчас + ожидание в очереди + работа
    const q = queueNow()
    const end = q.m + q.wait + minutes
    out('ready', !ids.length ? L.pickOne : !q.isOpen ? L.readyClosed : end > close ? L.readyLate : `${L.ready} ${pad(Math.floor(end / 60) % 24)}:${pad(end % 60)}`)
    // шкала: сегменты по услугам пропорционально времени
    const tl = root.querySelector<HTMLElement>('[data-o=timeline]')
    if (tl)
      tl.replaceChildren(
        ...ids.map((id, i) => {
          const seg = document.createElement('i')
          seg.dataset.svc = id
          seg.style.flexGrow = String(cfg.services[id]!.minutes)
          seg.style.setProperty('--i', String(i))
          seg.title = cfg.services[id]!.name
          return seg
        }),
      )
    renderSlots()
    prefillForm({ car: c.name, services: ids.map((id) => cfg.services[id]!.name).join(', ') })
    if (writeHash) history.replaceState(history.state, '', `${location.pathname}${location.search}#${cls()}:${ids.join(',')}`)
  }

  root.addEventListener('change', (e) => {
    const t = e.target as HTMLInputElement
    if (t.name === 'au-slot') {
      const [date, time] = t.value.split('|')
      const label = t.closest('label')?.querySelector('[data-f=day]')?.textContent ?? ''
      if (ctaText) ctaText.textContent = `${L.bookAt} ${label}, ${time}`
      cta?.removeAttribute('aria-disabled')
      root.dataset.slot = t.value
      prefillForm({ date: date!, time: time! })
      return
    }
    update(true)
  })

  // кнопка без окна ведёт к окнам, с окном — к форме
  cta?.addEventListener('click', (e) => {
    if (cta.getAttribute('aria-disabled') === 'true') {
      e.preventDefault()
      e.stopPropagation()
      slotsBox?.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' })
    }
  })

  const m = location.hash.match(/^#([a-z-]+):([a-z,-]*)$/)
  if (m && classes.some((c) => c.value === m[1])) {
    classes.forEach((c) => (c.checked = c.value === m[1]))
    const want = m[2]!.split(',')
    svcs.forEach((s) => (s.checked = want.includes(s.value)))
    update(false)
    root.closest('section')?.scrollIntoView({ block: 'start' })
  } else update(false)
}

/** Якоря прокручиваем сами, чтобы не затереть выбор в хеше. */
document.addEventListener('click', (e) => {
  const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
  const target = a ? document.getElementById(a.getAttribute('href')!.slice(1)) : null
  if (!target || e.defaultPrevented) return
  e.preventDefault()
  target.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' })
})

renderQueue()
setInterval(renderQueue, 60000)
document.querySelectorAll<HTMLElement>('[data-calc]').forEach(initCalc)
document.querySelectorAll<HTMLElement>('[data-demo-form]').forEach(initDemoForm)

import { initDemoForm, prefillForm } from '@/core/islands/form'
import { tashkentNow } from '@/niches/beauty/slots'
import type { FitConfig } from './parts'

/**
 * Островок ниши fitness: станция на линии → клуб (поезд едет к станции через --pos), цель → абонемент,
 * время → ближайшее групповое занятие в этом клубе (от текущего времени Ташкента); всё — в заявку и хеш (#minor-weight-evening).
 */
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
const pad = (n: number) => String(n).padStart(2, '0')
const toMin = (hm: string) => Number(hm.slice(0, 2)) * 60 + Number(hm.slice(3, 5))
const inWindow = (time: string, w?: string) => (w === 'morning' ? toMin(time) < 720 : w === 'day' ? toMin(time) >= 720 && toMin(time) < 1020 : w === 'evening' ? toMin(time) >= 1020 : true)

function initFit(root: HTMLElement): void {
  const cfg = JSON.parse(root.querySelector('script[type="application/json"]')!.textContent!) as FitConfig
  const L = cfg.labels
  const get = (n: string) => root.querySelector<HTMLInputElement>(`input[name=${n}]:checked`)?.value
  const out = (k: string, text: string) => root.querySelectorAll(`[data-o=${k}]`).forEach((el) => (el.textContent = text))

  const next = (club: string, w?: string) => {
    const now = tashkentNow()
    const nowMin = now.getHours() * 60 + now.getMinutes()
    for (let d = 0; d < 8; d++) {
      const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + d)
      const c = cfg.classes
        .filter((x) => x.club === club && x.day === date.getDay() && inWindow(x.time, w) && (d > 0 || toMin(x.time) > nowMin + 30))
        .sort((a, b) => toMin(a.time) - toMin(b.time))[0]
      if (c) return { ...c, date: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`, label: d === 0 ? L.today : d === 1 ? L.tomorrow : L.days[date.getDay()]! }
    }
    return null
  }

  const update = (writeHash: boolean) => {
    const club = get('ft-club') ?? cfg.order[0]!
    const goal = get('ft-goal')
    const time = get('ft-time')
    root.dataset.club = club
    root.style.setProperty('--pos', String(cfg.order.indexOf(club) / Math.max(1, cfg.order.length - 1)))
    const c = cfg.clubs[club]!
    out('club', c.name)
    out('address', c.address)
    const plan = goal ? cfg.plans[cfg.goals[goal]!] : undefined
    root.dataset.ready = goal && time ? 'true' : 'false'
    if (plan) {
      out('plan', plan.name)
      out('price', plan.price)
      out('note', plan.note)
    }
    const n = time ? next(club, time) : null
    out('next', n ? `${n.label}, ${n.time} · ${n.name}` : time ? L.none : '')
    prefillForm({ club: c.name, ...(plan ? { plan: plan.name } : {}), ...(n ? { date: n.date, time: n.time } : {}) })
    if (writeHash) history.replaceState(history.state, '', `${location.pathname}${location.search}#${[club, goal, time].filter(Boolean).join('-')}`)
  }

  root.addEventListener('change', () => update(true))
  const want = location.hash.slice(1).split('-')
  const set = (n: string, v?: string) => {
    const i = v ? root.querySelector<HTMLInputElement>(`input[name=${n}][value="${v}"]`) : null
    if (i) i.checked = true
    return !!i
  }
  if (want[0] && set('ft-club', want[0])) {
    set('ft-goal', want[1])
    set('ft-time', want[2])
    root.closest('section')?.scrollIntoView({ block: 'start' })
  }
  update(false)
}

/** Якоря прокручиваем сами, чтобы не затереть выбор в хеше. */
document.addEventListener('click', (e) => {
  const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
  const target = a ? document.getElementById(a.getAttribute('href')!.slice(1)) : null
  if (!target || e.defaultPrevented) return
  e.preventDefault()
  target.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' })
})

document.querySelectorAll<HTMLElement>('[data-fit]').forEach(initFit)
document.querySelectorAll<HTMLElement>('[data-demo-form]').forEach(initDemoForm)

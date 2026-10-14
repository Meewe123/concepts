import { initDemoForm, prefillForm } from '@/core/islands/form'
import { tashkentNow } from '@/niches/beauty/slots'
import type { BronConfig, PotConfig } from './parts'

/**
 * Островок ниши restaurant: бронь по схеме зала. Зона и число гостей подсвечивают подходящие столы,
 * дни и время считаются от текущего времени Ташкента и графика, выбор уходит в форму и в хеш (#terrace-4).
 */
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
const pad = (n: number) => String(n).padStart(2, '0')
/** 1 гость, 2 гостя, 5 гостей */
const plural = (n: number, f: [string, string, string]) => f[n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
const toMin = (hm: string) => Number(hm.slice(0, 2)) * 60 + Number(hm.slice(3, 5))
const WD = { ru: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'], uz: ['yak', 'dush', 'sesh', 'chor', 'pay', 'jum', 'shan'] }
const MON = {
  ru: ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
  uz: ['yan', 'fev', 'mar', 'apr', 'may', 'iyn', 'iyl', 'avg', 'sen', 'okt', 'noy', 'dek'],
}

function initBron(root: HTMLElement): void {
  const cfg = JSON.parse(root.querySelector('script[type="application/json"]')!.textContent!) as BronConfig
  const L = cfg.labels
  const zones = [...root.querySelectorAll<HTMLInputElement>('input[name=rb-zone]')]
  const guests = [...root.querySelectorAll<HTMLInputElement>('input[name=rb-guests]')]
  const daysBox = root.querySelector<HTMLElement>('[data-o=days]')
  const timesBox = root.querySelector<HTMLElement>('[data-o=times]')
  const dayTpl = root.querySelector<HTMLTemplateElement>('template[data-tpl=day]')
  const timeTpl = root.querySelector<HTMLTemplateElement>('template[data-tpl=time]')
  const noTimes = root.querySelector<HTMLElement>('[data-o=notimes]')
  const cta = root.querySelector<HTMLAnchorElement>('[data-o=cta]')
  const ctaText = root.querySelector<HTMLElement>('[data-o=cta-text]')
  const open = toMin(cfg.schedule.open)
  const close = toMin(cfg.schedule.close)
  const now = tashkentNow()
  const summer = now.getMonth() >= 4 && now.getMonth() <= 8

  const zone = () => zones.find((z) => z.checked)?.value ?? zones[0]!.value
  const count = () => Number(guests.find((g) => g.checked)?.value ?? guests[0]!.value)
  const day = () => root.querySelector<HTMLInputElement>('input[name=rb-day]:checked')
  const time = () => root.querySelector<HTMLInputElement>('input[name=rb-time]:checked')

  // дни: ближайшая неделя по графику
  const days: { date: string; label: string; offset: number }[] = []
  for (let d = 0; d < 14 && days.length < 7; d++) {
    const x = new Date(now.getFullYear(), now.getMonth(), now.getDate() + d)
    if (!cfg.schedule.days.includes(x.getDay())) continue
    const label = d === 0 ? L.today : d === 1 ? L.tomorrow : `${WD[cfg.locale][x.getDay()]}, ${x.getDate()} ${MON[cfg.locale][x.getMonth()]}`
    days.push({ date: `${x.getFullYear()}-${pad(x.getMonth() + 1)}-${pad(x.getDate())}`, label, offset: d })
  }
  if (daysBox && dayTpl) {
    daysBox.replaceChildren(
      ...days.map((d, i) => {
        const node = dayTpl.content.firstElementChild!.cloneNode(true) as HTMLElement
        const input = node.querySelector('input')!
        input.value = d.date
        input.dataset.offset = String(d.offset)
        input.checked = i === 0
        node.querySelector('[data-f=label]')!.textContent = d.label
        node.style.setProperty('--i', String(i))
        return node
      }),
    )
  }

  /** Время: каждые 30 минут, последняя бронь — за час до закрытия; сегодня — не раньше чем через час. */
  const renderTimes = () => {
    if (!timesBox || !timeTpl) return
    const d = day()
    const today = d?.dataset.offset === '0'
    const nowMin = now.getHours() * 60 + now.getMinutes()
    const from = today ? Math.max(open, Math.ceil((nowMin + 60) / 30) * 30) : open
    const list: string[] = []
    for (let t = from; t <= close - 60; t += 30) list.push(`${pad(Math.floor(t / 60))}:${pad(t % 60)}`)
    timesBox.replaceChildren(
      ...list.map((t, i) => {
        const node = timeTpl.content.firstElementChild!.cloneNode(true) as HTMLElement
        node.querySelector('input')!.value = t
        node.querySelector('[data-f=time]')!.textContent = t
        node.style.setProperty('--i', String(i))
        return node
      }),
    )
    if (noTimes) noTimes.hidden = list.length > 0
    if (ctaText) ctaText.textContent = L.pick
    cta?.setAttribute('aria-disabled', 'true')
  }

  const update = (writeHash: boolean) => {
    const z = zone()
    const g = count()
    root.dataset.zone = z
    root.dataset.guests = String(g)
    root.dataset.season = cfg.zones[z]?.seasonal && !summer ? 'off' : 'on'
    root.querySelectorAll<HTMLElement | SVGElement>('[data-z]').forEach((el) => el.toggleAttribute('data-on', el.dataset.z === z))
    let fit = 0
    root.querySelectorAll<HTMLElement>('[data-table]').forEach((t) => {
      const seats = Number(t.dataset.seats)
      // подходит стол своей зоны, где хватает мест, но не втрое больше компании
      const ok = t.dataset.zone === z && seats >= g && seats <= g + 4
      t.toggleAttribute('data-fit', ok)
      if (ok) fit++
    })
    root.querySelectorAll('[data-o=fit]').forEach((el) => (el.textContent = String(fit)))
    root.dataset.fit = String(fit)
    const d = day()
    const t = time()
    const dayLabel = d?.closest('label')?.querySelector('[data-f=label]')?.textContent ?? ''
    root.querySelectorAll('[data-o=summary]').forEach((el) => (el.textContent = [cfg.zones[z]?.name, `${g} ${plural(g, L.guests)}`, dayLabel, t?.value].filter(Boolean).join(' · ')))
    if (t && ctaText) {
      ctaText.textContent = `${L.bookAt} ${dayLabel}, ${t.value}`
      cta?.removeAttribute('aria-disabled')
    }
    prefillForm({ zone: cfg.zones[z]?.name ?? '', guests: g, ...(d ? { date: d.value } : {}), ...(t ? { time: t.value } : {}) })
    if (writeHash) history.replaceState(history.state, '', `${location.pathname}${location.search}#${z}-${g}`)
  }

  root.addEventListener('change', (e) => {
    const name = (e.target as HTMLInputElement).name
    if (name === 'rb-day') renderTimes()
    update(name === 'rb-zone' || name === 'rb-guests')
  })
  cta?.addEventListener('click', (e) => {
    if (cta.getAttribute('aria-disabled') === 'true') {
      e.preventDefault()
      e.stopPropagation()
      timesBox?.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' })
    }
  })

  const m = location.hash.match(/^#([a-z-]+)-(\d+)$/)
  if (m && zones.some((z) => z.value === m[1])) {
    zones.forEach((z) => (z.checked = z.value === m[1]))
    guests.forEach((g) => (g.checked = g.value === m[2]))
    root.closest('section')?.scrollIntoView({ block: 'start' })
  }
  renderTimes()
  update(false)
}

/** Казан: сколько осталось — по ташкентскому времени (демо; на рабочем сайте — кнопка повара в боте). */
function initPot(root: HTMLElement): void {
  const cfg = JSON.parse(root.querySelector('script[type="application/json"]')!.textContent!) as PotConfig
  const L = cfg.labels
  const from = toMin(cfg.from)
  const until = toMin(cfg.until)
  const tick = () => {
    const now = tashkentNow()
    const m = now.getHours() * 60 + now.getMinutes()
    const open = cfg.days.includes(now.getDay())
    let state: 'soon' | 'serving' | 'out'
    let level: number
    if (open && m < from) [state, level] = ['soon', 1]
    else if (open && m < until) [state, level] = ['serving', 1 - ((m - from) / (until - from)) * 0.86]
    else [state, level] = ['out', 0.1]
    // следующий казан: сегодня (если ещё не начали), иначе ближайший рабочий день
    let next = ''
    if (state === 'out') {
      for (let d = 1; d <= 7; d++) {
        const x = new Date(now.getFullYear(), now.getMonth(), now.getDate() + d)
        if (!cfg.days.includes(x.getDay())) continue
        next = d === 1 ? L.tomorrow : L.weekdays[x.getDay()]!
        break
      }
    }
    root.dataset.pot = state
    root.style.setProperty('--level', level.toFixed(3))
    const pct = Math.max(5, Math.round((level * 100) / 5) * 5)
    const text = (state === 'soon' ? L.soon : state === 'serving' ? L.serving : L.out).replace('{pct}', String(pct)).replace('{next}', next)
    root.querySelectorAll('[data-o=pot]').forEach((el) => (el.textContent = text))
  }
  tick()
  setInterval(tick, 60_000)
}

/** Якоря прокручиваем сами, чтобы не затереть выбор в хеше. */
document.addEventListener('click', (e) => {
  const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
  const target = a ? document.getElementById(a.getAttribute('href')!.slice(1)) : null
  if (!target || e.defaultPrevented) return
  e.preventDefault()
  target.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' })
})

document.querySelectorAll<HTMLElement>('[data-pot]').forEach(initPot)
document.querySelectorAll<HTMLElement>('[data-bron]').forEach(initBron)
document.querySelectorAll<HTMLElement>('[data-demo-form]').forEach(initDemoForm)

import { groupDigits } from '@/core/format'
import { initDemoForm, prefillForm } from '@/core/islands/form'
import type { Pet } from '@/core/types'
import type { ScaleConfig } from './parts'

/**
 * Островок ниши petshop: весы подбора (вес → группа → цены), «Отложить» с полётом ценника к счётчику,
 * список отложенного и демо-форма. Выбор подбора — в хеше (#dog-12), список — в localStorage этого браузера.
 */
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
const kg = (n: number) => String(n).replace('.', ',')
const NBSP = ' '
let sum = 'сум'

// ---------- Отложенное ----------
type Item = { name: string; price: number }
const cart = new Map<string, Item>()
const KEY = `ps-cart:${location.pathname}`
try {
  for (const [id, it] of JSON.parse(localStorage.getItem(KEY) ?? '[]') as [string, Item][]) cart.set(id, it)
} catch {
  /* приватный режим — список живёт до перезагрузки */
}
const money = (n: number) => `${groupDigits(n)}${NBSP}${sum}`

function save(): void {
  try {
    localStorage.setItem(KEY, JSON.stringify([...cart]))
  } catch {
    /* без хранилища — ничего страшного */
  }
}

function renderCart(): void {
  const total = [...cart.values()].reduce((s, i) => s + i.price, 0)
  document.querySelectorAll<HTMLElement>('[data-o=cart-count]').forEach((el) => (el.textContent = String(cart.size)))
  document.querySelectorAll<HTMLElement>('[data-add]').forEach((b) => {
    const on = cart.has(b.dataset.id ?? '')
    b.toggleAttribute('data-added', on)
    b.setAttribute('aria-pressed', String(on))
  })
  document.querySelectorAll<HTMLElement>('[data-cart]').forEach((root) => {
    root.dataset.state = cart.size ? 'full' : 'empty'
    const list = root.querySelector<HTMLElement>('[data-o=cart-list]')
    const tpl = root.querySelector<HTMLTemplateElement>('template[data-tpl=cart-item]')
    if (list && tpl) {
      list.replaceChildren(
        ...[...cart].map(([id, it]) => {
          const li = tpl.content.firstElementChild!.cloneNode(true) as HTMLElement
          li.querySelector('[data-f=name]')!.textContent = it.name
          li.querySelector('[data-f=price]')!.textContent = money(it.price)
          const rm = li.querySelector<HTMLElement>('[data-remove]')!
          rm.dataset.id = id
          rm.setAttribute('aria-label', `${rm.getAttribute('aria-label')}: ${it.name}`)
          return li
        }),
      )
    }
    const t = root.querySelector('[data-o=cart-total]')
    if (t) t.textContent = money(total)
  })
  prefillForm({ items: [...cart.values()].map((i) => `${i.name} — ${money(i.price)}`).join('; ') })
}

/** Ценник «летит» от кнопки к видимому счётчику, счётчик подпрыгивает. */
function fly(from: HTMLElement): void {
  const target = [...document.querySelectorAll<HTMLElement>('[data-cart-target]')].find((t) => {
    const r = t.getBoundingClientRect()
    return r.width > 0 && r.bottom > 0 && r.top < innerHeight
  })
  if (!target) return
  const bump = () => target.querySelectorAll('[data-o=cart-count]').forEach((c) => c.animate([{ transform: 'scale(1.5)' }, { transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.3,1.6,.5,1)' }))
  if (reduced) return bump()
  const a = from.getBoundingClientRect()
  const b = target.getBoundingClientRect()
  const tag = document.createElement('i')
  tag.className = 'ps-fly'
  tag.style.left = `${a.left + a.width / 2}px`
  tag.style.top = `${a.top + a.height / 2}px`
  document.body.append(tag)
  const dx = b.left + b.width / 2 - (a.left + a.width / 2)
  const dy = b.top + b.height / 2 - (a.top + a.height / 2)
  tag
    .animate(
      [
        { transform: 'translate(-50%, -50%) rotate(0) scale(1)' },
        { transform: `translate(calc(-50% + ${dx * 0.5}px), calc(-50% + ${dy * 0.5 - 90}px)) rotate(-25deg) scale(1.1)`, offset: 0.45 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(-50deg) scale(0.35)`, opacity: 0.6 },
      ],
      { duration: 650, easing: 'cubic-bezier(.45,0,.3,1)' },
    )
    .finished.then(() => {
      tag.remove()
      bump()
    })
}

document.addEventListener('click', (e) => {
  const el = e.target as Element
  const add = el.closest<HTMLElement>('[data-add]')
  if (add) {
    const id = add.dataset.id ?? ''
    if (cart.has(id)) cart.delete(id)
    else {
      cart.set(id, { name: add.dataset.name ?? '', price: Number(add.dataset.price) })
      fly(add)
    }
    save()
    renderCart()
    return
  }
  const rm = el.closest<HTMLElement>('[data-remove]')
  if (rm) {
    cart.delete(rm.dataset.id ?? '')
    save()
    renderCart()
    return
  }
  // якоря прокручиваем сами, чтобы не затереть выбор в хеше
  const a = el.closest<HTMLAnchorElement>('a[href^="#"]')
  const target = a ? document.getElementById(a.getAttribute('href')!.slice(1)) : null
  if (target) {
    e.preventDefault()
    target.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' })
  }
})

// ---------- Весы подбора ----------
const HASH = /^#(dog|cat)-(\d+(?:[.,]5)?)$/

function initScale(root: HTMLElement): void {
  const cfg = JSON.parse(root.querySelector('script[type="application/json"]')!.textContent!) as ScaleConfig
  sum = cfg.labels.sum
  const range = root.querySelector<HTMLInputElement>('input[data-weight]')!
  const pets = [...root.querySelectorAll<HTMLInputElement>('input[name=ps-pet]')]
  const weights: Record<Pet, number> = { dog: cfg.pets.dog.start, cat: cfg.pets.cat.start }
  let pet: Pet = 'dog'
  let band = -1

  const label = (bands: number[], i: number) =>
    i === 0 ? cfg.labels.upTo.replace('{n}', kg(bands[0]!)) : cfg.labels.range.replace('{a}', kg(bands[i - 1]!)).replace('{b}', kg(bands[i]!))

  const update = (writeHash: boolean) => {
    const p = cfg.pets[pet]
    const max = p.bands[p.bands.length - 1]!
    const w = Math.min(max, Math.max(0.5, weights[pet]))
    range.max = String(max)
    range.value = String(w)
    const i = Math.max(0, p.bands.findIndex((b) => w <= b))
    const text = label(p.bands, i)
    root.style.setProperty('--w', (w / max).toFixed(4))
    root.dataset.pet = pet
    // весы первого экрана живут вне подбора — им тот же вес и питомец через корень документа
    document.documentElement.style.setProperty('--ps-w', (w / max).toFixed(4))
    document.documentElement.dataset.psPet = pet
    document.querySelectorAll('[data-o=kg]').forEach((el) => (el.textContent = kg(w)))
    root.querySelectorAll('[data-o=band]').forEach((el) => (el.textContent = text))
    root.querySelectorAll<HTMLElement>(`[data-pet-forms=${pet}] [data-form]`).forEach((card) => {
      const f = p.forms.find((x) => x.id === card.dataset.form)
      if (!f) return
      const price = f.prices[i]!
      card.querySelectorAll('[data-o=price]').forEach((el) => (el.textContent = money(price)))
      card.querySelectorAll('[data-o=band]').forEach((el) => (el.textContent = text))
      const btn = card.querySelector<HTMLElement>('[data-add]')
      if (btn) {
        btn.dataset.id = `${pet}-${f.id}-${i}`
        btn.dataset.name = `${f.name} ${cfg.labels.forPet[pet]} ${text}`
        btn.dataset.price = String(price)
      }
    })
    if (i !== band) {
      root.dataset.band = String(i)
      document.documentElement.dataset.psBand = String(i)
      // перезапуск «качания» ценников при смене группы
      if (band !== -1) {
        root.removeAttribute('data-swing')
        void root.offsetWidth
        root.setAttribute('data-swing', '')
      }
      band = i
    }
    renderCart()
    if (writeHash) history.replaceState(history.state, '', `${location.pathname}${location.search}#${pet}-${w}`)
  }

  range.addEventListener('input', () => {
    weights[pet] = Number(range.value)
    update(true)
  })
  pets.forEach((r) =>
    r.addEventListener('change', () => {
      if (!r.checked) return
      pet = r.value as Pet
      band = -1
      update(true)
    }),
  )

  const m = location.hash.match(HASH)
  if (m) {
    pet = m[1] as Pet
    weights[pet] = Number(m[2]!.replace(',', '.'))
    pets.forEach((r) => (r.checked = r.value === pet))
    update(false)
    root.closest('section')?.scrollIntoView({ block: 'start' })
  } else {
    pet = (pets.find((r) => r.checked)?.value as Pet) ?? 'dog'
    update(false)
  }
}

document.querySelectorAll<HTMLElement>('[data-scale]').forEach(initScale)
document.querySelectorAll<HTMLElement>('[data-demo-form]').forEach(initDemoForm)
renderCart()

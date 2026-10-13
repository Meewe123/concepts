import { Check, Phone, ShoppingBag, X } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { DemoForm } from '@/core/components/DemoForm'
import { formLabels } from '@/core/components/formLabels'
import { telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { tx } from '@/core/text'
import type { Lead, Locale, ParasiteForm, Pet } from '@/core/types'
import { bandLabel, bandOf, copy } from './content'

/**
 * Контракт с островком (niches/petshop/island.ts):
 * [data-scale] — подбор: input[name=ps-pet] (dog/cat), input[data-weight], [data-o=kg|band],
 *   [data-pet-forms=<pet>] > [data-form=<id>] > [data-o=price] + [data-add]; у корня --w (0…1), data-pet, data-band.
 * [data-add] — «Отложить» (data-id, data-name, data-price; островок ставит aria-pressed).
 * [data-cart] — список: [data-o=cart-list], template[data-tpl=cart-item] с [data-f=name|price] и [data-remove], [data-o=cart-total].
 * [data-o=cart-count] — счётчик где угодно; [data-cart-target] — куда «летит» отложенный ценник.
 */
export interface ScaleConfig {
  pets: Record<Pet, { bands: number[]; start: number; forms: { id: string; name: string; prices: number[] }[] }>
  labels: { upTo: string; range: string; forPet: Record<Pet, string>; sum: string }
}

export const PETS: Pet[] = ['dog', 'cat']

export function scaleMax(lead: Lead, pet: Pet): number {
  const b = lead.petshop!.parasites[pet].bands
  return b[b.length - 1]!
}

export function ScaleRoot({ lead, locale, children, className = '' }: { lead: Lead; locale: Locale; children: ReactNode; className?: string }) {
  const d = lead.petshop!
  const cfg: ScaleConfig = {
    pets: Object.fromEntries(
      PETS.map((pet) => {
        const p = d.parasites[pet]
        return [pet, { bands: p.bands, start: p.start, forms: p.forms.map((f) => ({ id: f.id, name: tx(f.name, locale), prices: f.prices })) }]
      }),
    ) as ScaleConfig['pets'],
    labels: {
      upTo: copy.scale.upTo[locale],
      range: copy.scale.range[locale],
      forPet: { dog: tx(copy.forPet.dog, locale), cat: tx(copy.forPet.cat, locale) },
      sum: locale === 'ru' ? 'сум' : 'soʻm',
    },
  }
  const dog = d.parasites.dog
  return (
    <div
      data-scale=""
      data-pet="dog"
      data-band={bandOf(dog.bands, dog.start)}
      className={`ps ${className}`}
      style={{ '--w': (dog.start / scaleMax(lead, 'dog')).toFixed(4) } as CSSProperties}
    >
      <script type="application/json" data-concept="" dangerouslySetInnerHTML={{ __html: JSON.stringify(cfg) }} />
      {children}
    </div>
  )
}

/** Ползунок веса: без JS стоит на стартовом весе собаки. */
export function WeightRange({ lead, locale, className = '' }: { lead: Lead; locale: Locale; className?: string }) {
  return (
    <input
      type="range"
      data-weight=""
      min={0.5}
      max={scaleMax(lead, 'dog')}
      step={0.5}
      defaultValue={lead.petshop!.parasites.dog.start}
      aria-label={tx(copy.scale.weight, locale)}
      className={`ps-range ${className}`}
    />
  )
}

/** Стартовое состояние подбора для серверной разметки (островок дальше пересчитывает). */
export function startState(lead: Lead, pet: Pet, locale: Locale) {
  const p = lead.petshop!.parasites[pet]
  const band = bandOf(p.bands, p.start)
  return { band, label: bandLabel(p.bands, band, locale), kg: p.start }
}

export function formAdd(pet: Pet, f: ParasiteForm, band: number, label: string, locale: Locale) {
  return { id: `${pet}-${f.id}-${band}`, name: `${tx(f.name, locale)} ${tx(copy.forPet[pet], locale)} ${label}`, price: f.prices[band]! }
}

export function AddButton({ id, name, price, locale, stroke, className = '' }: { id: string; name: string; price: number; locale: Locale; stroke: number; className?: string }) {
  return (
    <button type="button" className={`ps-add ${className}`} data-add="" data-id={id} data-name={name} data-price={price} aria-pressed="false">
      <span className="ps-add-t">{tx(copy.reserve, locale)}</span>
      <span className="ps-added-t">
        <Check aria-hidden className="size-4" strokeWidth={stroke + 0.6} />
        {tx(copy.reserved, locale)}
      </span>
    </button>
  )
}

export function CartCount({ className = '' }: { className?: string }) {
  return (
    <span data-o="cart-count" className={`ps-count ${className}`}>
      0
    </span>
  )
}

export function CartList({ locale, stroke, className = '' }: { locale: Locale; stroke: number; className?: string }) {
  const k = copy.order
  return (
    <div data-cart="" data-state="empty" className={`ps-cart ${className}`}>
      <p className="ps-cart-empty">{tx(k.empty, locale)}</p>
      <ul className="ps-cart-list" data-o="cart-list" />
      <template data-tpl="cart-item">
        <li className="ps-cart-item">
          <span data-f="name" className="ps-cart-name" />
          <span data-f="price" className="ps-cart-price" />
          <button type="button" data-remove="" className="ps-cart-remove" aria-label={tx(k.remove, locale)}>
            <X aria-hidden className="size-4" strokeWidth={stroke + 0.4} />
          </button>
        </li>
      </template>
      <p className="ps-cart-total">
        <span>{tx(k.total, locale)}</span>
        <b data-o="cart-total">0</b>
      </p>
    </div>
  )
}

export function OrderForm({ locale, stroke }: { locale: Locale; stroke: number }) {
  const k = copy.order
  return (
    <DemoForm
      stroke={stroke}
      hidden={['items']}
      choices={[{ name: 'pickup', label: tx(k.pickup, locale), options: k.pickupOptions.map((o) => tx(o, locale)) }]}
      labels={formLabels(locale, tx(k.required, locale))}
    />
  )
}

/** Нижняя панель на телефоне: сколько отложено → к заказу, и звонок. */
export function PetshopStickyBar({ lead, locale, stroke }: { lead: Lead; locale: Locale; stroke: number }) {
  return (
    <div className="sticky-bar sticky bottom-0 z-20 border-t border-line bg-bg px-4 py-3 md:hidden">
      <div className="flex gap-2">
        <a href="#zakaz" className="btn flex-1" data-cart-target="">
          <ShoppingBag aria-hidden className="size-5" strokeWidth={stroke} />
          {tx(copy.reserved, locale)}: <CartCount />
        </a>
        <a href={telHref(lead.phones[0]!)} className="btn btn-ghost btn-icon" aria-label={ui.call[locale]}>
          <Phone aria-hidden className="size-5" strokeWidth={stroke} />
        </a>
      </div>
    </div>
  )
}

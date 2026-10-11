import { AtSign, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import { formatPhone, instagramHref, telegramHref, telHref, whatsappHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'

/** Главные действия: Яндекс Карты и звонок — кнопками, мессенджеры — ссылками. */
export function ContactActions({ lead, locale, stroke }: { lead: Lead; locale: Locale; stroke: number }) {
  const phone = lead.phones[0]!
  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap gap-3">
        <a href={lead.mapsUrl} target="_blank" rel="noopener" className="btn">
          <MapPin aria-hidden className="size-5" strokeWidth={stroke} />
          {ui.openMaps[locale]}
        </a>
        <a href={telHref(phone)} className="btn btn-ghost">
          <Phone aria-hidden className="size-5" strokeWidth={stroke} />
          {ui.call[locale]}
        </a>
      </div>
      <Messengers lead={lead} locale={locale} stroke={stroke} />
    </div>
  )
}

export function Messengers({ lead, locale, stroke }: { lead: Lead; locale: Locale; stroke: number }) {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-1">
      {lead.telegram && (
        <li>
          <a href={telegramHref(lead.telegram)} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2 underline decoration-1 underline-offset-4">
            <Send aria-hidden className="size-4" strokeWidth={stroke} />
            {ui.telegram[locale]}
          </a>
        </li>
      )}
      {lead.whatsapp && (
        <li>
          <a href={whatsappHref(lead.whatsapp)} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2 underline decoration-1 underline-offset-4">
            <MessageCircle aria-hidden className="size-4" strokeWidth={stroke} />
            {ui.whatsapp[locale]}
          </a>
        </li>
      )}
      {lead.instagram && (
        <li>
          <a href={instagramHref(lead.instagram)} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2 underline decoration-1 underline-offset-4">
            <AtSign aria-hidden className="size-4" strokeWidth={stroke} />
            {lead.instagram}
          </a>
        </li>
      )}
    </ul>
  )
}

export function PhoneList({ lead, locale }: { lead: Lead; locale: Locale }) {
  return (
    <div>
      <p className="text-sm text-ink-2">{ui.phones[locale]}</p>
      <ul className="mt-1">
        {lead.phones.map((p) => (
          <li key={p}>
            <a href={telHref(p)} className="inline-flex min-h-11 items-center text-lg">
              {formatPhone(p)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function AddressLine({ lead, locale }: { lead: Lead; locale: Locale }) {
  return (
    <div>
      <p className="text-sm text-ink-2">{ui.address[locale]}</p>
      <p className="mt-1 text-lg">{tx(lead.address, locale)}</p>
    </div>
  )
}

import { DENTAL_CONCERNS, type L10n, type Lead } from './types'

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*-[abcdefghjkmnpqrstuvwxyz23456789]{4}$/
const PHONE = /^\+998 \d{2} \d{3} \d{2} \d{2}$/
/** В узбекской латинице вместо ' и ‘ ’ должны стоять ʻ (U+02BB) и ʼ (U+02BC). */
const WRONG_UZ_APOSTROPHE = /[A-Za-z]['‘’`]|['‘’`][A-Za-z]/

function isL10n(v: unknown): v is L10n {
  return typeof v === 'object' && v !== null && typeof (v as L10n).ru === 'string' && typeof (v as L10n).uz === 'string'
}

function walkL10n(v: unknown, path: string, visit: (t: L10n, path: string) => void): void {
  if (isL10n(v)) return visit(v, path)
  if (Array.isArray(v)) return v.forEach((x, i) => walkL10n(x, `${path}[${i}]`, visit))
  if (typeof v === 'object' && v !== null) {
    for (const [k, x] of Object.entries(v)) walkL10n(x, path ? `${path}.${k}` : k, visit)
  }
}

/** Проверяет ошибки, которые иначе всплыли бы только на живой странице. */
export function lintL10n(v: unknown, where: string): string[] {
  const errors: string[] = []
  walkL10n(v, '', (t, path) => {
    if (WRONG_UZ_APOSTROPHE.test(t.uz)) errors.push(`${where} ${path}: в узбекском тексте апостроф вместо ʻ/ʼ — «${t.uz}»`)
    if (!t.ru.trim() || !t.uz.trim()) errors.push(`${where} ${path}: пустой перевод`)
  })
  return errors
}

export function defineLead(lead: Lead): Lead {
  const errors: string[] = []
  const at = `lead ${lead.slug}:`

  if (!SLUG.test(lead.slug)) errors.push(`${at} slug должен быть «название-xxxx», где xxxx из алфавита без похожих символов`)
  for (const p of lead.phones) if (!PHONE.test(p)) errors.push(`${at} телефон «${p}» — нужен формат +998 XX XXX XX XX`)
  if (lead.phones.length === 0) errors.push(`${at} нет ни одного телефона`)
  if (!lead.langs.includes('ru')) errors.push(`${at} русская версия обязательна`)
  if (lead.messageLang === 'uz' && !lead.langs.includes('uz')) errors.push(`${at} сообщение на узбекском, а узбекской версии сайта нет`)
  if (!/^https:\/\/yandex\.(uz|ru|com)\/maps\//.test(lead.mapsUrl)) errors.push(`${at} mapsUrl должен вести на Яндекс Карты`)
  if (lead.rating && !/^\d{4}-\d{2}$/.test(lead.rating.asOf)) errors.push(`${at} rating.asOf — формат YYYY-MM`)

  if (lead.niche === 'banquet') {
    const b = lead.banquet
    if (!b || b.halls.length === 0 || b.packages.length === 0) errors.push(`${at} для banquet нужны залы и пакеты`)
    else {
      const ids = [...b.halls.map((h) => h.id), ...b.packages.map((p) => p.id)]
      if (new Set(ids).size !== ids.length) errors.push(`${at} id залов и пакетов должны быть уникальны`)
      const max = Math.max(...b.halls.map((h) => h.capacity))
      if (b.defaultGuests > max) errors.push(`${at} defaultGuests больше вместимости самого большого зала`)
    }
  }

  if (lead.niche === 'vet' && (!lead.vet || lead.vet.services.length === 0)) errors.push(`${at} для vet нужны услуги`)
  if (lead.niche === 'education') {
    const e = lead.education
    if (!e || e.courses.length === 0 || e.groups.length === 0) errors.push(`${at} для education нужны курсы и группы`)
  }

  if (lead.niche === 'dental') {
    const d = lead.dental
    if (!d || d.concerns.map((c) => c.id).join() !== DENTAL_CONCERNS.join()) errors.push(`${at} для dental нужны все шесть вариантов в порядке ${DENTAL_CONCERNS.join(', ')}`)
    else
      for (const c of d.concerns) {
        if (c.id === 'pain' && c.price) errors.push(`${at} у «болит зуб» не должно быть цены`)
        if (c.id !== 'pain' && (!c.price || c.price.from > c.price.to || !c.visits || !c.duration)) errors.push(`${at} у ${c.id} нужны цена от–до, визиты и срок`)
        if (c.installment && c.id !== 'braces' && c.id !== 'implant') errors.push(`${at} рассрочка — только у брекетов и импланта`)
      }
  }
  if (lead.niche === 'beauty') {
    const b = lead.beauty
    if (!b || b.services.length < 3) errors.push(`${at} для beauty нужны хотя бы три услуги`)
    else {
      if (new Set(b.services.map((x) => x.id)).size !== b.services.length) errors.push(`${at} id услуг должны быть уникальны`)
      if (!/^\d\d:\d\d$/.test(b.schedule.open) || !/^\d\d:\d\d$/.test(b.schedule.close) || b.schedule.days.length === 0) errors.push(`${at} график: open/close «ЧЧ:ММ» и хотя бы один рабочий день`)
    }
  }
  if (lead.pitchText) for (const [l, t] of Object.entries(lead.pitchText)) if (!t.includes('{link}')) errors.push(`${at} pitchText.${l}: нет {link}`)

  errors.push(...lintL10n(lead, at))
  if (errors.length) throw new Error(errors.join('\n'))
  return lead
}

import { NBSP, typo } from '@/core/text'
import type { BeautyService, Lead, Locale } from '@/core/types'
import { formatSum } from '@/core/format'

/** Тексты ниши beauty. Услуги, цены и длительности — в конфиге лида (example: true). TODO: проверить носителем — узбекские строки. */
export const copy = {
  book: { ru: 'Записаться', uz: 'Yozilish' },
  pick: {
    title: { ru: 'Выберите услугу', uz: 'Xizmatni tanlang' },
    lead: {
      ru: 'Сразу видно, сколько это займёт, сколько стоит и когда есть свободное окно.',
      uz: 'Qancha vaqt olishi, narxi va boʻsh vaqt darhol koʻrinadi.',
    },
    duration: { ru: 'Длительность', uz: 'Davomiyligi' },
    price: { ru: 'Цена', uz: 'Narxi' },
    slots: { ru: 'Ближайшие свободные окна', uz: 'Eng yaqin boʻsh vaqtlar' },
    slotsDemo: {
      ru: 'Демо: окна условные — считаются от текущего времени и графика.',
      uz: 'Demo: vaqtlar shartli — hozirgi vaqt va ish jadvalidan hisoblanadi.',
    },
    empty: { ru: 'Выберите услугу — покажем время, цену и свободные окна.', uz: 'Xizmatni tanlang — vaqt, narx va boʻsh oynalarni koʻrsatamiz.' },
    chooseSlot: { ru: 'Выберите окно', uz: 'Vaqtni tanlang' },
    bookAt: { ru: 'Записаться:', uz: 'Yozilish:' },
    noSlots: { ru: 'В ближайшие дни окон нет — позвоните, подберём время.', uz: 'Yaqin kunlarda boʻsh vaqt yoʻq — qoʻngʻiroq qiling, vaqt topamiz.' },
  },
  when: {
    today: { ru: 'Сегодня', uz: 'Bugun' },
    tomorrow: { ru: 'Завтра', uz: 'Ertaga' },
  },
  booking: {
    title: { ru: 'Запись', uz: 'Yozilish' },
    lead: {
      ru: 'Выберите услугу и время — администратор подтвердит запись звонком или в Telegram.',
      uz: 'Xizmat va vaqtni tanlang — administrator qoʻngʻiroq yoki Telegram orqali tasdiqlaydi.',
    },
    service: { ru: 'Услуга', uz: 'Xizmat' },
    date: { ru: 'Дата', uz: 'Sana' },
    time: { ru: 'Время', uz: 'Vaqt' },
    branch: { ru: 'Филиал', uz: 'Filial' },
    required: { ru: 'Заполните имя и телефон', uz: 'Ism va telefon raqamini kiriting' },
  },
  hours: { ru: 'График', uz: 'Ish vaqti' },
  hoursUnknown: { ru: 'Уточняйте по телефону', uz: 'Telefon orqali aniqlang' },
  daily: { ru: 'Ежедневно', uz: 'Har kuni' },
}

/** «45 мин», «1 ч 30 мин» / «45 daq», «1 soat 30 daq» */
export function fmtDuration(min: number, locale: Locale): string {
  const h = Math.floor(min / 60)
  const m = min % 60
  const [hu, mu] = locale === 'ru' ? ['ч', 'мин'] : ['soat', 'daq']
  return [h ? `${h}${NBSP}${hu}` : '', m ? `${m}${NBSP}${mu}` : ''].filter(Boolean).join(' ')
}

/** «от 150 000 сум» / «150 000 soʻmdan» */
export function fmtPrice(n: number, from: boolean | undefined, locale: Locale): string {
  if (!from) return formatSum(n, locale)
  return locale === 'ru' ? `от${NBSP}${formatSum(n, locale)}` : `${formatSum(n, locale)}dan`
}

export function serviceGroups(services: BeautyService[]): { name?: BeautyService['group']; items: BeautyService[] }[] {
  const out: { name?: BeautyService['group']; items: BeautyService[] }[] = []
  for (const s of services) {
    const last = out[out.length - 1]
    if (last && last.name?.ru === s.group?.ru) last.items.push(s)
    else out.push({ name: s.group, items: [s] })
  }
  return out
}

export function kindLine(lead: Lead, locale: Locale): string {
  const kind = lead.kind ?? { ru: 'Салон красоты', uz: 'goʻzallik saloni' }
  return locale === 'ru' ? typo(`${kind.ru} ${lead.where.ru}`, 'ru') : `${lead.where.uz} ${kind.uz}`
}

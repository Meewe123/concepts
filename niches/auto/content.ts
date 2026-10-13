import { NBSP, typo } from '@/core/text'
import type { AutoClass, AutoService, Lead, Locale } from '@/core/types'

/** Тексты ниши auto (автомойка, детейлинг). Цены, время и загрузка — в конфиге лида (пример). TODO: проверить носителем — узбекские строки. */
export const copy = {
  book: { ru: 'Записаться', uz: 'Yozilish' },
  calc: {
    title: { ru: 'Цена и время — до приезда', uz: 'Narx va vaqt — kelishdan oldin' },
    lead: {
      ru: 'Выберите машину и что сделать — посчитаем цену, сколько это займёт и к какому времени будет готово.',
      uz: 'Mashina va nima qilishni tanlang — narxi, qancha vaqt olishi va qachon tayyor boʻlishini hisoblaymiz.',
    },
    car: { ru: 'Машина', uz: 'Mashina' },
    services: { ru: 'Что сделать', uz: 'Nima qilish kerak' },
    total: { ru: 'Итого', uz: 'Jami' },
    time: { ru: 'Займёт', uz: 'Davomiyligi' },
    ready: { ru: 'Если приехать сейчас — готово к', uz: 'Hozir kelsangiz — tayyor boʻladi' },
    readyClosed: { ru: 'Сейчас закрыто — запишитесь на удобное время', uz: 'Hozir yopiq — qulay vaqtga yoziling' },
    readyLate: { ru: 'Сегодня уже не успеть — запишитесь на завтра', uz: 'Bugun ulgurmaydi — ertaga yoziling' },
    pickOne: { ru: 'Отметьте хотя бы одну услугу', uz: 'Kamida bitta xizmatni belgilang' },
    bookThis: { ru: 'Записаться без очереди', uz: 'Navbatsiz yozilish' },
  },
  queue: {
    title: { ru: 'Когда у нас тихо', uz: 'Qachon tinch' },
    lead: {
      ru: 'Загрузка по часам: приезжайте в тихие часы или запишитесь на время — и не ждите в очереди.',
      uz: 'Soatlar boʻyicha band: tinch soatlarda keling yoki vaqtga yoziling — navbatda kutmang.',
    },
    now: { ru: 'Сейчас в очереди', uz: 'Hozir navbatda' },
    wait: { ru: 'ожидание', uz: 'kutish' },
    closed: { ru: 'Сейчас закрыто', uz: 'Hozir yopiq' },
    quiet: { ru: 'Тихие часы', uz: 'Tinch soatlar' },
    demo: {
      ru: 'Демо: загрузка условная. На рабочем сайте здесь будет живая очередь.',
      uz: 'Demo: band boʻlish shartli. Ishlaydigan saytda bu yerda jonli navbat boʻladi.',
    },
  },
  slots: {
    title: { ru: 'Без очереди — на время', uz: 'Navbatsiz — vaqtga' },
    lead: { ru: 'Ближайшие свободные окна под выбранные услуги.', uz: 'Tanlangan xizmatlar uchun eng yaqin boʻsh vaqtlar.' },
    none: { ru: 'В ближайшие дни окон нет — позвоните, подберём время.', uz: 'Yaqin kunlarda boʻsh vaqt yoʻq — qoʻngʻiroq qiling.' },
    today: { ru: 'Сегодня', uz: 'Bugun' },
    tomorrow: { ru: 'Завтра', uz: 'Ertaga' },
    pick: { ru: 'Выберите окно', uz: 'Vaqtni tanlang' },
    bookAt: { ru: 'Записаться:', uz: 'Yozilish:' },
  },
  form: {
    car: { ru: 'Машина', uz: 'Mashina' },
    date: { ru: 'Дата', uz: 'Sana' },
    time: { ru: 'Время', uz: 'Vaqt' },
    required: { ru: 'Заполните имя и телефон', uz: 'Ism va telefon raqamini kiriting' },
  },
  hours: { ru: 'Часы работы', uz: 'Ish vaqti' },
  hoursUnknown: { ru: 'Уточняйте по телефону', uz: 'Telefon orqali aniqlang' },
}

export const roundPrice = (n: number) => Math.round(n / 5000) * 5000
export const roundMin = (n: number) => Math.max(5, Math.round(n / 5) * 5)
export const total = (svc: AutoService[], cls: AutoClass) => ({
  price: roundPrice(svc.reduce((s, x) => s + x.price, 0) * cls.k),
  minutes: roundMin(svc.reduce((s, x) => s + x.minutes, 0) * cls.t),
})

export function fmtMinutes(m: number, locale: Locale): string {
  const h = Math.floor(m / 60)
  const r = m % 60
  if (locale === 'ru') return [h ? `${h}${NBSP}ч` : '', r ? `${r}${NBSP}мин` : ''].filter(Boolean).join(' ')
  return [h ? `${h}${NBSP}soat` : '', r ? `${r}${NBSP}daq` : ''].filter(Boolean).join(' ')
}

export function kindLine(lead: Lead, locale: Locale): string {
  const kind = lead.kind ?? { ru: 'Автомойка', uz: 'avtomoyka' }
  return locale === 'ru' ? typo(`${kind.ru} ${lead.where.ru}`, 'ru') : `${lead.where.uz} ${kind.uz}`
}

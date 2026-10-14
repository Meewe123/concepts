import { typo } from '@/core/text'
import type { Lead, Locale } from '@/core/types'

/** Тексты ниши restaurant. Зоны, столы, меню и цены — в конфиге лида (пример). TODO: проверить носителем — узбекские строки. */
export const copy = {
  book: { ru: 'Забронировать стол', uz: 'Stol band qilish' },
  bron: {
    title: { ru: 'Бронь стола — по схеме', uz: 'Stolni sxema boʻyicha band qilish' },
    lead: {
      ru: 'Выберите зал, сколько вас и когда — на схеме загорятся подходящие столы.',
      uz: 'Zal, necha kishi va qachonligini tanlang — sxemada mos stollar yonadi.',
    },
    zone: { ru: 'Где сесть', uz: 'Qayerda oʻtirish' },
    guests: { ru: 'Сколько гостей', uz: 'Mehmonlar soni' },
    day: { ru: 'Когда', uz: 'Qachon' },
    time: { ru: 'Во сколько', uz: 'Soat nechada' },
    fit: { ru: 'Подходящих столов', uz: 'Mos stollar' },
    pick: { ru: 'Выберите время', uz: 'Vaqtni tanlang' },
    bookAt: { ru: 'Забронировать:', uz: 'Band qilish:' },
    today: { ru: 'Сегодня', uz: 'Bugun' },
    tomorrow: { ru: 'Завтра', uz: 'Ertaga' },
    noFit: { ru: 'Свободного стола под вашу компанию здесь нет — выберите другой зал или позвоните, сдвинем столы.', uz: 'Bu yerda kompaniyangizga mos stol yoʻq — boshqa zalni tanlang yoki qoʻngʻiroq qiling, stollarni birlashtiramiz.' },
    noTimes: { ru: 'На сегодня мест уже не принимаем — выберите другой день.', uz: 'Bugunga joy qabul qilinmaydi — boshqa kunni tanlang.' },
    season: { ru: 'Терраса работает летом — в другое время года уточняйте по телефону.', uz: 'Terrasa yozda ishlaydi — boshqa paytda telefon orqali aniqlang.' },
    demo: { ru: 'Схема и названия зон — пример: на рабочем сайте будет ваш зал.', uz: 'Sxema va zonalar nomi — namuna: ishlaydigan saytda sizning zalingiz boʻladi.' },
  },
  menu: {
    title: { ru: 'Прейскурант', uz: 'Narxnoma' },
    lead: { ru: 'Блюда — из вашего канала, цены — пример.', uz: 'Taomlar — kanalingizdan, narxlar — namuna.' },
  },
  form: {
    zone: { ru: 'Зал', uz: 'Zal' },
    guests: { ru: 'Гостей', uz: 'Mehmonlar' },
    date: { ru: 'Дата', uz: 'Sana' },
    time: { ru: 'Время', uz: 'Vaqt' },
    required: { ru: 'Заполните имя и телефон', uz: 'Ism va telefon raqamini kiriting' },
  },
  hours: { ru: 'Часы работы', uz: 'Ish vaqti' },
  hoursUnknown: { ru: 'Уточняйте по телефону', uz: 'Telefon orqali aniqlang' },
}

export function kindLine(lead: Lead, locale: Locale): string {
  const kind = lead.kind ?? { ru: 'Ресторан', uz: 'restoran' }
  return locale === 'ru' ? typo(`${kind.ru} ${lead.where.ru}`, 'ru') : `${lead.where.uz} ${kind.uz}`
}

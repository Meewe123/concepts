import { NBSP, typo } from '@/core/text'
import type { Lead, Locale } from '@/core/types'

/** Тексты ниши wellness. Практики, расписание и цены — в конфиге лида (пример). TODO: проверить носителем — узбекские строки. */
export const copy = {
  book: { ru: 'Записаться', uz: 'Yozilish' },
  quiz: {
    title: { ru: 'Подобрать практику', uz: 'Amaliyotni tanlash' },
    lead: { ru: 'Три вопроса — и мы предложим практику и ближайшее занятие.', uz: 'Uchta savol — amaliyot va eng yaqin mashgʻulotni taklif qilamiz.' },
    result: { ru: 'Вам подойдёт', uz: 'Sizga mos keladi' },
    next: { ru: 'Ближайшее занятие', uz: 'Eng yaqin mashgʻulot' },
    none: { ru: 'В ближайшие дни такого занятия нет — напишите, подскажем время.', uz: 'Yaqin kunlarda bunday mashgʻulot yoʻq — yozing, vaqtni aytamiz.' },
    bookThis: { ru: 'Записаться на это занятие', uz: 'Shu mashgʻulotga yozilish' },
    again: { ru: 'Ответьте на три вопроса — покажем практику', uz: 'Uchta savolga javob bering — amaliyotni koʻrsatamiz' },
    donation: { ru: 'по донации', uz: 'xayriya asosida' },
  },
  week: {
    title: { ru: 'Расписание недели', uz: 'Haftalik jadval' },
    lead: { ru: 'Пример: на рабочем сайте здесь будет ваше расписание.', uz: 'Namuna: ishlaydigan saytda bu yerda sizning jadvalingiz boʻladi.' },
    all: { ru: 'Все', uz: 'Hammasi' },
    today: { ru: 'сегодня', uz: 'bugun' },
  },
  days: {
    ru: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    uz: ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'],
  },
  form: {
    practice: { ru: 'Практика', uz: 'Amaliyot' },
    date: { ru: 'Дата', uz: 'Sana' },
    time: { ru: 'Время', uz: 'Vaqt' },
    required: { ru: 'Заполните имя и телефон', uz: 'Ism va telefon raqamini kiriting' },
  },
  hours: { ru: 'Часы работы', uz: 'Ish vaqti' },
  hoursUnknown: { ru: 'По расписанию занятий', uz: 'Mashgʻulotlar jadvali boʻyicha' },
}

export function fmtMinutes(m: number, locale: Locale): string {
  const h = Math.floor(m / 60)
  const r = m % 60
  if (locale === 'ru') return [h ? `${h}${NBSP}ч` : '', r ? `${r}${NBSP}мин` : ''].filter(Boolean).join(' ')
  return [h ? `${h}${NBSP}soat` : '', r ? `${r}${NBSP}daq` : ''].filter(Boolean).join(' ')
}

export function kindLine(lead: Lead, locale: Locale): string {
  const kind = lead.kind ?? { ru: 'Пространство практик', uz: 'amaliyotlar maskani' }
  return locale === 'ru' ? typo(`${kind.ru} ${lead.where.ru}`, 'ru') : `${lead.where.uz} ${kind.uz}`
}

import { typo } from '@/core/text'
import type { Lead, Locale } from '@/core/types'

/** Тексты ниши fitness. Абонементы, цены и расписание — в конфиге лида (пример). TODO: проверить носителем — узбекские строки. */
export const copy = {
  book: { ru: 'Гостевой визит', uz: 'Mehmon tashrifi' },
  pick: {
    title: { ru: 'Какой клуб вам подходит', uz: 'Qaysi klub sizga mos' },
    lead: { ru: 'Нажмите станцию рядом с домом или работой, отметьте цель и время — покажем абонемент и ближайшее занятие.', uz: 'Uy yoki ish yonidagi bekatni bosing, maqsad va vaqtni belgilang — abonement va eng yaqin mashgʻulotni koʻrsatamiz.' },
    club: { ru: 'Клуб', uz: 'Klub' },
    goal: { ru: 'Цель', uz: 'Maqsad' },
    time: { ru: 'Когда удобно', uz: 'Qachon qulay' },
    times: [
      { id: 'morning', ru: 'Утром', uz: 'Ertalab' },
      { id: 'day', ru: 'Днём', uz: 'Kunduzi' },
      { id: 'evening', ru: 'Вечером', uz: 'Kechqurun' },
    ],
    plan: { ru: 'Абонемент', uz: 'Abonement' },
    next: { ru: 'Ближайшее групповое', uz: 'Eng yaqin guruh mashgʻuloti' },
    none: { ru: 'В это время групповых нет — приходите в зал, тренер подскажет.', uz: 'Bu vaqtda guruh mashgʻuloti yoʻq — zalga keling, murabbiy yordam beradi.' },
    cta: { ru: 'Записаться на гостевой визит', uz: 'Mehmon tashrifiga yozilish' },
    addressUnknown: { ru: 'адрес уточняйте по телефону', uz: 'manzilni telefon orqali aniqlang' },
  },
  plans: {
    title: { ru: 'Абонементы', uz: 'Abonementlar' },
    lead: { ru: 'Цены — пример: на рабочем сайте будут ваши.', uz: 'Narxlar — namuna: ishlaydigan saytda sizniki boʻladi.' },
  },
  days: {
    ru: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    uz: ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'],
  },
  form: {
    club: { ru: 'Клуб', uz: 'Klub' },
    plan: { ru: 'Абонемент', uz: 'Abonement' },
    date: { ru: 'Дата', uz: 'Sana' },
    time: { ru: 'Время', uz: 'Vaqt' },
    required: { ru: 'Заполните имя и телефон', uz: 'Ism va telefon raqamini kiriting' },
  },
}

export function kindLine(lead: Lead, locale: Locale): string {
  const kind = lead.kind ?? { ru: 'Фитнес-клуб', uz: 'fitnes-klub' }
  return locale === 'ru' ? typo(`${kind.ru} ${lead.where.ru}`, 'ru') : `${lead.where.uz} ${kind.uz}`
}

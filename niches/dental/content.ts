import { typo } from '@/core/text'
import type { DentalConcern, DentalConcernId, L10n, Lead, Locale } from '@/core/types'

/**
 * Тексты ниши dental. Цены, визиты и сроки — пример (example: true), лид может заменить любое поле.
 * Медицинские правила: никаких обещаний результата («без боли», «гарантия», «100%», «лучшая»),
 * сайт не ставит диагноз и не советует лечение. Проверка — scripts/pitch.ts и самопроверка фазы.
 * TODO: проверить носителем — узбекские строки.
 */
export const copy = {
  book: { ru: 'Записаться', uz: 'Yozilish' },
  bookConsult: { ru: 'Записаться на консультацию', uz: 'Konsultatsiyaga yozilish' },
  bookExam: { ru: 'Записаться на осмотр', uz: 'Koʻrikka yozilish' },
  concern: {
    title: { ru: 'Что вас беспокоит?', uz: 'Sizni nima bezovta qilyapti?' },
    lead: {
      ru: 'Выберите — и сразу увидите ориентир цены, число визитов и срок.',
      uz: 'Tanlang — taxminiy narx, tashriflar soni va muddat darhol koʻrinadi.',
    },
    empty: {
      ru: 'Выберите вариант выше — здесь появится ориентир цены, число визитов и срок лечения.',
      uz: 'Yuqoridagi variantlardan birini tanlang — bu yerda taxminiy narx, tashriflar soni va davolash muddati chiqadi.',
    },
    price: { ru: 'Ориентир цены', uz: 'Taxminiy narx' },
    visits: { ru: 'Визиты', uz: 'Tashriflar' },
    duration: { ru: 'Срок лечения', uz: 'Davolash muddati' },
    installment: { ru: 'Рассрочка', uz: 'Muddatli toʻlov' },
    months: { ru: 'мес.', uz: 'oy' },
    perMonth: { ru: 'в месяц', uz: 'oyiga' },
    installmentNote: { ru: 'Условия рассрочки уточняйте в клинике.', uz: 'Muddatli toʻlov shartlarini klinikadan soʻrang.' },
    consult: { ru: 'Ориентир, точнее — на консультации.', uz: 'Bu taxminiy narx, aniqrogʻi — konsultatsiyada.' },
    pain: {
      ru: 'Расскажите врачу, что беспокоит — запишем на осмотр.',
      uz: 'Shifokorga nima bezovta qilayotganini aytib bering — koʻrikka yozib qoʻyamiz.',
    },
    share: { ru: 'Выбор сохраняется в ссылке — её можно переслать.', uz: 'Tanlov havolada saqlanadi — uni yuborish mumkin.' },
  },
  labels: {
    pain: { ru: 'Болит зуб', uz: 'Tish ogʻriyapti' },
    filling: { ru: 'Нужна пломба', uz: 'Plomba kerak' },
    hygiene: { ru: 'Чистка и гигиена', uz: 'Tozalash va gigiyena' },
    whitening: { ru: 'Отбеливание', uz: 'Oqartirish' },
    braces: { ru: 'Брекеты', uz: 'Breketlar' },
    implant: { ru: 'Имплант', uz: 'Implant' },
  } satisfies Record<DentalConcernId, L10n>,
  visit: {
    title: { ru: 'Как проходит первый визит', uz: 'Birinchi tashrif qanday oʻtadi' },
    lead: { ru: 'Спокойно и по шагам. Ничего не начинают без вашего согласия.', uz: 'Xotirjam va bosqichma-bosqich. Roziligingizsiz hech narsa boshlanmaydi.' },
    steps: [
      {
        title: { ru: 'Запись', uz: 'Yozilish' },
        text: { ru: 'По телефону или через форму — на удобное время.', uz: 'Telefon yoki forma orqali — qulay vaqtga.' },
        textTg: { ru: 'По телефону, в Telegram или через форму — на удобное время.', uz: 'Telefon, Telegram yoki forma orqali — qulay vaqtga.' },
      },
      {
        title: { ru: 'Осмотр и разговор', uz: 'Koʻrik va suhbat' },
        text: { ru: 'Врач спросит, что беспокоит, и посмотрит. Задавайте любые вопросы.', uz: 'Shifokor nima bezovta qilayotganini soʻraydi va koʻrib chiqadi. Istalgan savolni bering.' },
      },
      {
        title: { ru: 'План и стоимость на бумаге', uz: 'Reja va narx qogʻozda' },
        text: { ru: 'До начала лечения вы получаете план и цену.', uz: 'Davolashdan oldin reja va narxni qoʻlingizga olasiz.' },
      },
      {
        title: { ru: 'Решение за вами', uz: 'Qaror sizda' },
        text: { ru: 'Можно взять время подумать — лечение начинается только с вашего согласия.', uz: 'Oʻylab koʻrish uchun vaqt olishingiz mumkin — davolash faqat roziligingiz bilan boshlanadi.' },
      },
    ],
  },
  promos: {
    title: { ru: 'Акции и цены', uz: 'Aksiyalar va narxlar' },
    lead: {
      ru: 'Из карточки клиники на Яндекс Картах. Актуальность уточняйте у администратора.',
      uz: 'Klinikaning Yandex Xaritalardagi sahifasidan. Dolzarbligini administratordan soʻrang.',
    },
    check: { ru: 'уточнить', uz: 'aniqlashtirish kerak' },
  },
  family: {
    title: { ru: 'Для всей семьи', uz: 'Butun oila uchun' },
    who: { ru: 'Кого записываете', uz: 'Kimni yozdirasiz' },
    whoOptions: [
      { ru: 'Себя', uz: 'Oʻzimni' },
      { ru: 'Ребёнка', uz: 'Farzandimni' },
      { ru: 'Всю семью', uz: 'Butun oilani' },
    ],
    bookFamily: { ru: 'Записать семью', uz: 'Oilani yozdirish' },
  },
  contacts: {
    title: { ru: 'Адрес и запись', uz: 'Manzil va yozilish' },
    hours: { ru: 'График', uz: 'Ish vaqti' },
    hoursUnknown: { ru: 'Уточняйте по телефону', uz: 'Telefon orqali aniqlang' },
    landmark: { ru: 'Ориентир', uz: 'Moʻljal' },
  },
  booking: {
    title: { ru: 'Запись на приём', uz: 'Qabulga yozilish' },
    lead: {
      ru: 'Оставьте телефон — администратор перезвонит и подберёт время.',
      uz: 'Telefon raqamingizni qoldiring — administrator qoʻngʻiroq qilib, vaqt tanlaydi.',
    },
    date: { ru: 'Удобная дата', uz: 'Qulay sana' },
    concern: { ru: 'Что беспокоит', uz: 'Nima bezovta qilyapti' },
    required: { ru: 'Заполните имя и телефон', uz: 'Ism va telefon raqamini kiriting' },
  },
}

/** Пример: вилки цен по Ташкенту, 2026. Всё помечено «пример» на странице. */
const DEFAULTS: Record<DentalConcernId, Omit<DentalConcern, 'id'>> = {
  pain: { example: true },
  filling: {
    price: { from: 250_000, to: 600_000 },
    visits: { ru: '1 визит', uz: '1 ta tashrif' },
    duration: { ru: 'за один визит', uz: 'bir tashrifda' },
    example: true,
  },
  hygiene: {
    price: { from: 300_000, to: 450_000 },
    visits: { ru: '1 визит', uz: '1 ta tashrif' },
    duration: { ru: 'около часа', uz: 'taxminan bir soat' },
    example: true,
  },
  whitening: {
    price: { from: 1_200_000, to: 3_000_000 },
    visits: { ru: '1–2 визита', uz: '1–2 ta tashrif' },
    duration: { ru: 'от 1 дня до 2 недель', uz: '1 kundan 2 haftagacha' },
    example: true,
  },
  braces: {
    price: { from: 9_000_000, to: 20_000_000 },
    visits: { ru: 'раз в 4–6 недель', uz: 'har 4–6 haftada' },
    duration: { ru: '12–24 месяца', uz: '12–24 oy' },
    installment: true,
    example: true,
  },
  implant: {
    price: { from: 6_000_000, to: 12_000_000 },
    visits: { ru: '3–5 визитов', uz: '3–5 ta tashrif' },
    duration: { ru: '3–6 месяцев', uz: '3–6 oy' },
    installment: true,
    note: { ru: 'Один зуб: имплант и коронка.', uz: 'Bitta tish: implant va toj.' },
    example: true,
  },
}

/** Шесть вариантов с примерными данными; лид переопределяет нужные поля. */
export function dentalConcerns(overrides: Partial<Record<DentalConcernId, Partial<DentalConcern>>> = {}): DentalConcern[] {
  return (Object.keys(DEFAULTS) as DentalConcernId[]).map((id) => ({ id, ...DEFAULTS[id], ...overrides[id] }))
}

/** Платёж в месяц: сумма / месяцы, округление до 1 000 сум. Без процентов. */
export function monthly(sum: number, months: number): number {
  return Math.round(sum / months / 1000) * 1000
}

export const MONTHS = [6, 12] as const

export function kindLine(lead: Lead, locale: Locale): string {
  const kind = lead.kind ?? { ru: 'Стоматология', uz: 'stomatologiya' }
  return locale === 'ru' ? typo(`${kind.ru} ${lead.where.ru}`, 'ru') : `${lead.where.uz} ${kind.uz}`
}

import { typo } from '@/core/text'
import type { Lead, Locale, StudyGroup } from '@/core/types'

/** Тексты ниши education. Курсы, цены, группы — в конфиге лида (example: true). TODO: проверить носителем — узбекские строки. */
export const copy = {
  trial: { ru: 'Записаться на пробный урок', uz: 'Sinov darsiga yozilish' },
  trialShort: { ru: 'Пробный урок', uz: 'Sinov darsi' },
  test: {
    title: { ru: 'Тест уровня за минуту', uz: 'Bir daqiqada daraja testi' },
    lead: {
      ru: 'Пять вопросов — и вы узнаете свой уровень и подходящую группу.',
      uz: 'Beshta savol — va darajangiz hamda mos guruhni bilib olasiz.',
    },
    pick: { ru: 'Отметьте по одному варианту в каждом вопросе.', uz: 'Har bir savolda bitta variantni belgilang.' },
    check: { ru: 'Узнать уровень', uz: 'Darajani bilish' },
    hint: { ru: 'Ответьте на все пять вопросов', uz: 'Beshala savolga javob bering' },
    resultLabel: { ru: 'Ваш уровень — ориентир', uz: 'Darajangiz — taxminiy' },
    group: { ru: 'Подходит группа', uz: 'Mos guruh' },
    noGroup: { ru: 'Группу подберём на пробном уроке', uz: 'Guruhni sinov darsida tanlaymiz' },
    reset: { ru: 'Пройти заново', uz: 'Qaytadan topshirish' },
    score: { ru: 'правильных ответов', uz: 'ta toʻgʻri javob' },
    note: {
      ru: 'Это быстрый ориентир, а не экзамен: точный уровень определит преподаватель на пробном уроке.',
      uz: 'Bu imtihon emas, tezkor moʻljal: aniq darajani oʻqituvchi sinov darsida aniqlaydi.',
    },
  },
  courses: {
    title: { ru: 'Курсы', uz: 'Kurslar' },
    lead: { ru: 'Цена — за месяц занятий.', uz: 'Narx — bir oylik mashgʻulot uchun.' },
    perMonth: { ru: 'в месяц', uz: 'oyiga' },
  },
  schedule: {
    title: { ru: 'Расписание групп', uz: 'Guruhlar jadvali' },
    level: { ru: 'Уровень', uz: 'Daraja' },
  },
  teachers: { title: { ru: 'Преподаватели', uz: 'Oʻqituvchilar' } },
  formats: {
    title: { ru: 'Офлайн или онлайн', uz: 'Oflayn yoki onlayn' },
    offline: {
      title: { ru: 'Офлайн', uz: 'Oflayn' },
      text: {
        ru: 'Занятия в классе: живое общение и разговорная практика в группе.',
        uz: 'Sinfxonadagi mashgʻulotlar: jonli muloqot va guruhda soʻzlashuv amaliyoti.',
      },
    },
    online: {
      title: { ru: 'Онлайн', uz: 'Onlayn' },
      text: {
        ru: 'Та же программа и домашние задания — из дома, по видеосвязи.',
        uz: 'Xuddi shu dastur va uy vazifalari — uydan, videoaloqa orqali.',
      },
    },
  },
  faq: {
    title: { ru: 'Частые вопросы', uz: 'Koʻp beriladigan savollar' },
    items: [
      {
        q: { ru: 'Нужно ли знать свой уровень заранее?', uz: 'Darajamni oldindan bilishim kerakmi?' },
        a: {
          ru: 'Нет. Пройдите тест на этой странице или приходите на пробный урок — преподаватель определит уровень.',
          uz: 'Yoʻq. Shu sahifadagi testni topshiring yoki sinov darsiga keling — oʻqituvchi darajani aniqlaydi.',
        },
      },
      {
        q: { ru: 'Сколько человек в группе?', uz: 'Guruhda necha kishi boʻladi?' },
        a: {
          ru: 'Обычно 6–10 человек: достаточно, чтобы говорить, и при этом не тесно.',
          uz: 'Odatda 6–10 kishi: gapirish uchun yetarli va tor emas.',
        },
      },
      {
        q: { ru: 'Можно заниматься онлайн?', uz: 'Onlayn oʻqisa boʻladimi?' },
        a: { ru: 'Да, онлайн-группы идут по той же программе.', uz: 'Ha, onlayn guruhlar xuddi shu dastur boʻyicha oʻqiydi.' },
      },
      {
        q: { ru: 'Как проходит пробный урок?', uz: 'Sinov darsi qanday oʻtadi?' },
        a: {
          ru: 'Знакомство, короткая проверка уровня и мини-урок. После него посоветуем группу.',
          uz: 'Tanishuv, qisqa daraja tekshiruvi va kichik dars. Undan keyin guruh tavsiya qilamiz.',
        },
      },
    ],
  },
  location: { title: { ru: 'Как нас найти', uz: 'Bizni qanday topish mumkin' } },
  booking: {
    lead: {
      ru: 'Оставьте телефон — администратор перезвонит и подберёт время пробного урока.',
      uz: 'Telefon raqamingizni qoldiring — administrator qayta qoʻngʻiroq qilib, sinov darsi vaqtini tanlaydi.',
    },
    level: { ru: 'Ваш уровень', uz: 'Darajangiz' },
    unknown: { ru: 'Не знаю', uz: 'Bilmayman' },
    format: { ru: 'Формат', uz: 'Format' },
    required: { ru: 'Заполните имя и телефон', uz: 'Ism va telefon raqamini kiriting' },
  },
} as const

/** Пять вопросов по возрастающей сложности (A1 → C1). Свои, не из чужих тестов. */
export const QUESTIONS: { text: string; options: string[]; answer: number }[] = [
  { text: 'She ___ a teacher.', options: ['is', 'are', 'am'], answer: 0 },
  { text: 'I ___ to the cinema yesterday.', options: ['go', 'went', 'have gone'], answer: 1 },
  { text: 'If it rains tomorrow, we ___ at home.', options: ['stay', 'will stay', 'would stay'], answer: 1 },
  { text: 'I wish I ___ more time to practise.', options: ['have', 'had', 'would have'], answer: 1 },
  { text: 'Hardly ___ the station when the train left.', options: ['I had reached', 'had I reached', 'I reached'], answer: 1 },
]

export const LEVELS: { code: StudyGroup['level']; name: string; ielts?: string }[] = [
  { code: 'A1', name: 'Beginner' },
  { code: 'A2', name: 'Elementary', ielts: 'до 3.5' },
  { code: 'B1', name: 'Intermediate', ielts: '4.0–5.0' },
  { code: 'B2', name: 'Upper-Intermediate', ielts: '5.5–6.5' },
  { code: 'C1', name: 'Advanced', ielts: '7.0+' },
]

/** Число правильных ответов → уровень: 0–1 → A1, 2 → A2, 3 → B1, 4 → B2, 5 → C1. */
export function levelFor(correct: number): (typeof LEVELS)[number] {
  return LEVELS[Math.max(0, Math.min(LEVELS.length - 1, correct - 1))]!
}

/** «Школа английского на Афросиабе» / «Afrosiyobdagi ingliz tili akademiyasi» */
export function kindLine(lead: Lead, locale: Locale): string {
  const kind = lead.kind ?? { ru: 'Учебный центр', uz: 'oʻquv markazi' }
  return locale === 'ru' ? typo(`${kind.ru} ${lead.where.ru}`, 'ru') : `${lead.where.uz} ${kind.uz}`
}

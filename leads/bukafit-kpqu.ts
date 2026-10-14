import { defineLead } from '@/core/define'
import type { FitnessData } from '@/core/types'
import { mapsUrlFor } from './maps'

// Расписание групповых — пример: у каждого клуба одна и та же сетка
const CLASSES: [number, string, string, string][] = [
  [1, '07:00', 'Функциональный тренинг', 'Funksional trening'],
  [1, '19:00', 'Круговая тренировка', 'Aylanma mashq'],
  [2, '13:00', 'Растяжка', 'Choʻzilish'],
  [2, '20:00', 'Функциональный тренинг', 'Funksional trening'],
  [3, '07:00', 'Круговая тренировка', 'Aylanma mashq'],
  [3, '19:00', 'Растяжка', 'Choʻzilish'],
  [4, '13:00', 'Функциональный тренинг', 'Funksional trening'],
  [4, '20:00', 'Круговая тренировка', 'Aylanma mashq'],
  [5, '07:00', 'Растяжка', 'Choʻzilish'],
  [5, '19:00', 'Функциональный тренинг', 'Funksional trening'],
  [6, '11:00', 'Круговая тренировка', 'Aylanma mashq'],
  [0, '11:00', 'Растяжка', 'Choʻzilish'],
]
const CLUBS = ['minor', 'mirabad', 'bahor', 'q3']
const classes: FitnessData['classes'] = CLUBS.flatMap((club, ci) =>
  // клубы сдвинуты на полчаса, чтобы расписания различались
  CLASSES.map(([day, time, ru, uz]) => ({ club, day, time: ci % 2 ? time.replace(':00', ':30') : time, name: { ru, uz } })),
)

// Сайт только на русском; узбекские строки нужны типу. TODO: проверить носителем
export default defineLead({
  slug: 'bukafit-kpqu',
  name: 'Buka Fit',
  niche: 'fitness',
  district: { ru: 'Ташкент · 4 клуба', uz: 'Toshkent · 4 ta klub' },
  where: { ru: 'в Ташкенте', uz: 'Toshkentdagi' },
  kind: { ru: 'Сеть фитнес-клубов', uz: 'fitnes-klublar tarmogʻi' },
  address: { ru: 'Ташкент, Мирабадский район, ул. Мирабад, 41/6', uz: 'Toshkent, Mirobod tumani, Mirobod koʻchasi, 41/6' },
  phones: ['+998 90 018 33 77', '+998 90 018 33 88'],
  instagram: 'bukafit_uz',
  mapsUrl: mapsUrlFor('bukafit-kpqu'),
  facts: [],
  hook: 'четыре филиала, и ни у одного нет сайта с расписанием и ценами',
  direction: 'iron-grid',
  directionWhy:
    'iron-grid — сеть из четырёх клубов: схема как своя линия метро (не копия ташкентской), станция загорается, поезд едет к ней; «BUKA FIT» сжимается как пружина по оси ширины Roboto Flex; графит, белый, сигнальный красный.',
  langs: ['ru'],
  map: { kind: 'street', street: { ru: 'ул. Мирабад', uz: 'Mirobod koʻchasi' }, house: '41/6' },
  contactStatus: 'not-contacted',
  channel: 'instagram',
  messageLang: 'ru',
  signaturePitch: {
    ru: 'Четыре клуба — как линия метро: человек нажимает свою станцию, цель и время и видит абонемент и ближайшее занятие',
    uz: 'Toʻrt klub — metro liniyasidek: odam bekatini, maqsad va vaqtni bosadi va abonement hamda eng yaqin mashgʻulotni koʻradi',
  },
  pitchText: {
    ru: 'Здравствуйте! Сделал концепт сайта для Buka Fit: {link}. Четыре клуба — как линия метро: человек нажимает свою станцию, цель и время и сразу видит абонемент и ближайшее занятие. Посмотрите с телефона; если заинтересует — напишите.',
  },
  fitness: {
    clubs: [
      { id: 'minor', name: { ru: 'Минор', uz: 'Minor' }, address: { ru: 'наб. Анхора, 57А', uz: 'Anhor sohili, 57A' } },
      {
        id: 'mirabad',
        name: { ru: 'Мирабад', uz: 'Mirobod' },
        address: { ru: 'ул. Мирабад, 41/6, Госпитальный квартал', uz: 'Mirobod koʻchasi, 41/6, Gospitalniy mavzesi' },
        landmark: { ru: 'Рядом — ресторан «Kamolon milliy taomlar»', uz: 'Yonida — «Kamolon milliy taomlar» restorani' },
      },
      { id: 'bahor', name: { ru: 'Bahor', uz: 'Bahor' } },
      { id: 'q3', name: { ru: 'Куйлюк', uz: 'Qoʻyliq' }, address: { ru: 'Куйлюк, 3-й квартал, 36/1 (Q3)', uz: 'Qoʻyliq, 3-mavze, 36/1 (Q3)' } },
    ],
    goals: [
      { id: 'weight', name: { ru: 'Похудеть', uz: 'Ozish' }, plan: 'month3' },
      { id: 'strength', name: { ru: 'Набрать силу', uz: 'Kuch toʻplash' }, plan: 'month1' },
      { id: 'group', name: { ru: 'Групповые занятия', uz: 'Guruh mashgʻulotlari' }, plan: 'group12' },
      { id: 'start', name: { ru: 'Начать с нуля', uz: 'Noldan boshlash' }, plan: 'month1' },
    ],
    plans: [
      { id: 'month1', name: { ru: 'Месяц', uz: 'Bir oy' }, price: 450_000, note: { ru: 'Безлимит в тренажёрный зал', uz: 'Trenajyor zaliga cheklovsiz' }, example: true },
      { id: 'month3', name: { ru: '3 месяца', uz: '3 oy' }, price: 1_150_000, note: { ru: 'Зал и групповые занятия', uz: 'Zal va guruh mashgʻulotlari' }, example: true },
      { id: 'group12', name: { ru: '12 групповых', uz: '12 guruh mashgʻuloti' }, price: 600_000, note: { ru: 'Групповые по расписанию клуба', uz: 'Klub jadvali boʻyicha guruh mashgʻulotlari' }, example: true },
    ],
    classes,
  },
  sources: [
    { what: 'BUKA FIT: Мирабадский район, ул. Мирабад, Госпитальный квартал, 41/6; ориентир — ресторан «Kamolon milliy taomlar»', url: 'https://www.goldenpages.uz/uz/rubrics/?Id=3410', checked: '2026-10-14, по выдаче веб-поиска' },
    { what: 'BukaFit — фитнес-клуб, компания Sport Venture', url: 'https://hh.ru/employer/10162379', checked: '2026-10-14, по выдаче веб-поиска' },
    { what: '4 филиала: ул. Мирабад, 41/6; наб. Анхора, 57А (Минор); Bahor; Куйлюк, 3-й кв., 36/1 (Q3); +998 90 018 33 77, +998 90 018 33 88; Instagram @bukafit_uz (≈18 тыс.); сайта нет', checked: 'таблица заказчика, 10.2026' },
  ],
  unverified: [
    'Филиалы Минор, Bahor и Куйлюк — из таблицы заказчика; поиск подтвердил только Мирабад (Golden Pages). Адрес филиала Bahor неизвестен — на сайте «адрес уточняйте по телефону».',
    'Связь Buka Fit с Buka Gym (Абдуллы Каххара, bukagym.com) не проверена — на сайт не вынесено.',
    'Цели, абонементы, цены и расписание групповых — пример; часы работы не найдены.',
  ],
  notes: [
    'Показать: «Какой клуб вам подходит» — нажать станцию на линии (поезд едет к ней), отметить цель и время: абонемент и ближайшее групповое, гостевой визит с уже заполненными клубом и абонементом.',
    'Хук для разговора: четыре филиала, и ни у одного нет сайта с расписанием и ценами — новичок не понимает, в какой клуб идти.',
    'Если ответят — спросить: точный адрес Bahor, реальные абонементы и цены, расписание групповых по клубам, есть ли гостевой визит.',
  ],
})

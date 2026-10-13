import { defineLead } from '@/core/define'
import { mapsUrlFor } from './maps'

const ex = true

export default defineLead({
  slug: 'brookland-4857',
  name: 'Brookland',
  niche: 'beauty',
  district: { ru: 'Ташкент · Узбекистон Овози', uz: 'Toshkent · Oʻzbekiston ovozi' },
  where: { ru: 'на Узбекистон Овози', uz: 'Oʻzbekiston ovozi koʻchasidagi' },
  kind: { ru: 'Автомойка и детейлинг', uz: 'avtomoyka va deteyling' },
  address: { ru: 'Ташкент, ул. Узбекистон Овози, 2/1', uz: 'Toshkent, Oʻzbekiston ovozi koʻchasi, 2/1' },
  landmark: { ru: 'Рядом с отелем Le Grand Plaza и рестораном Hori', uz: 'Le Grand Plaza mehmonxonasi va Hori restorani yonida' },
  phones: ['+998 99 988 80 00'],
  instagram: 'brookland_uzb',
  mapsUrl: mapsUrlFor('brookland-4857'),
  hours: { ru: 'Ежедневно 09:00–02:00', uz: 'Har kuni 09:00–02:00' },
  facts: [],
  hook: 'прайс разбросан по постам — его не найти, не листая ленту',
  direction: 'workshop-concrete',
  directionWhy:
    'workshop-concrete — мойка и детейлинг: технический чертёж машины с размерными линиями, бетон, чёрный и «safety»-оранжевый; класс авто меняет чертёж и цену — это язык мастерской, а не салона.',
  langs: ['ru', 'uz'],
  map: { kind: 'street', street: { ru: 'ул. Узбекистон Овози', uz: 'Oʻzbekiston ovozi koʻchasi' }, house: '2/1' },
  contactStatus: 'read-silent',
  channel: 'instagram',
  messageLang: 'ru',
  signaturePitch: {
    ru: 'Клиент выбирает класс авто и услугу — чертёж меняется, сразу видно цену, время работ и свободное окно',
    uz: 'Mijoz avto klassi va xizmatni tanlaydi — chizma oʻzgaradi, narx, ish vaqti va boʻsh vaqt darhol koʻrinadi',
  },
  pitchText: {
    ru: 'Дополню своё сообщение выше — сделал концепт сайта Brookland: {link}. Выбираешь класс авто и услугу — чертёж машины меняется, сразу видно цену, время работ и свободное окно, хоть в час ночи. Посмотрите с телефона; если заинтересует — напишите.',
    // TODO: проверить носителем
    uz: 'Yuqoridagi xabarimga qoʻshimcha — Brookland uchun sayt konseptini tayyorladim: {link}. Avto klassi va xizmatni tanlaysiz — mashina chizmasi oʻzgaradi, narx, ish vaqti va boʻsh vaqt darhol koʻrinadi. Telefondan koʻring; qiziqtirsa — yozing.',
  },
  beauty: {
    schedule: { days: [0, 1, 2, 3, 4, 5, 6], open: '09:00', close: '02:00', real: true },
    variants: {
      label: { ru: 'Класс авто', uz: 'Avto klassi' },
      items: [
        { id: 'sedan', name: { ru: 'Седан', uz: 'Sedan' }, k: 1, t: 1 },
        { id: 'crossover', name: { ru: 'Кросс­овер', uz: 'Krossover' }, k: 1.2, t: 1.15 },
        { id: 'suv', name: { ru: 'Внедо­рожник', uz: 'Yoʻltanlamas' }, k: 1.4, t: 1.3 },
        { id: 'minivan', name: { ru: 'Минивэн', uz: 'Miniven' }, k: 1.5, t: 1.35 },
      ],
    },
    services: [
      { id: 'express', name: { ru: 'Экспресс-мойка', uz: 'Ekspress-yuvish' }, minutes: 30, price: 60_000, from: true, example: ex },
      { id: 'complex', name: { ru: 'Комплексная мойка', uz: 'Kompleks yuvish' }, minutes: 60, price: 120_000, from: true, example: ex },
      { id: 'engine', name: { ru: 'Мойка двигателя', uz: 'Dvigatelni yuvish' }, minutes: 45, price: 100_000, from: true, example: ex },
      { id: 'interior', name: { ru: 'Химчистка салона', uz: 'Salonni kimyoviy tozalash' }, minutes: 240, price: 900_000, from: true, example: ex },
      { id: 'polish', name: { ru: 'Полировка кузова', uz: 'Kuzovni sayqallash' }, minutes: 360, price: 1_500_000, from: true, example: ex },
      { id: 'ceramic', name: { ru: 'Керамическое покрытие', uz: 'Keramik qoplama' }, minutes: 480, price: 3_500_000, from: true, example: ex },
    ],
  },
  sources: [
    { what: 'ул. Узбекистон Овози, 2/1; телефон +998 99 988 80 00; Instagram @brookland_uzb (≈42 тыс.); прайс только в постах', checked: 'таблица заказчика, 10.2026' },
    {
      what: 'Автомойка «Brookland»: ориентиры — отель Le Grand Plaza и ресторан Hori; ежедневно 09:00–02:00',
      url: 'https://www.goldenpages.uz/company/?Id=100985',
      checked: '2026-10-13, по выдаче веб-поиска',
    },
    { what: 'В отзывах: кафе, компьютерный клуб и Wi-Fi, пока моют машину; цены сверяют с прайсом в Instagram', url: 'https://yandex.ee/navi/org/brookland/116112604844/reviews', checked: '2026-10-13, по выдаче веб-поиска' },
  ],
  unverified: [
    'Детейлинг (полировка, керамика, химчистка) веб-поиск не подтвердил — Golden Pages пишет «автомойка», а в описании — диагностика и установка доп. оборудования. Услуги на сайте — пример.',
    'График 09:00–02:00 — по Golden Pages (дата обновления не видна); сверить. Окна записи считаются по нему.',
    'Все цены, длительности и коэффициенты классов авто — пример.',
  ],
  notes: [
    'Показать: чертёж в первом экране; в калькуляторе переключить «Внедорожник» (чертёж меняется), выбрать «Полировку» → выбрать позднее окно — видно «В работе 22:00 — 23:15»: окна учитывают закрытие в 02:00.',
    'Хук для разговора: прайс разбросан по постам и, по отзывам, расходится с тем, что говорят на месте — на сайте цена и время видны сразу.',
    'Если ответят — спросить: актуальный прайс по классам авто, какие услуги детейлинга есть, сколько постов (сколько машин одновременно).',
  ],
})

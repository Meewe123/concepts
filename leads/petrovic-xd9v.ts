import { defineLead } from '@/core/define'
import type { MenuItem } from '@/core/types'
import { mapsUrlFor } from './maps'

// TODO: проверить носителем — узбекские названия (сайт только на русском, поля нужны типу)
const dish = (id: string, ru: string, uz: string, price: number, note?: { ru: string; uz: string }): MenuItem => ({ id, name: { ru, uz }, price, note, example: true })

export default defineLead({
  slug: 'petrovic-xd9v',
  name: 'Petrovic',
  niche: 'restaurant',
  district: { ru: 'Ташкент · Яшнабад', uz: 'Toshkent · Yashnobod' },
  where: { ru: 'у Паркентского базара', uz: 'Parkent bozori yonidagi' },
  kind: { ru: 'Ресторан', uz: 'restoran' },
  address: { ru: 'Ташкент, Яшнабадский район, 1-я ул. Мавлоно Риёзи, 47', uz: 'Toshkent, Yashnobod tumani, 1-Mavlono Riyoziy koʻchasi, 47' },
  landmark: { ru: 'Ориентир — Паркентский базар, остановка «Шастри»', uz: 'Moʻljal — Parkent bozori, «Shastri» bekati' },
  phones: ['+998 98 188 05 88'],
  telegram: '+998 98 188 05 88',
  mapsUrl: mapsUrlFor('petrovic-xd9v'),
  hours: { ru: '12:00–23:00', uz: '12:00–23:00' },
  facts: [],
  hook: 'столик можно забронировать только по телефону',
  direction: 'retro-gastronom',
  directionWhy:
    'retro-gastronom — пивная с колбасками собственного производства и меню из советской классики (заливное, форшмак, «шуба», раки): кирпичная стена, неоновая вывеска с мерцанием, неоновая кружка, меню на наборном табло. Бронь — на «салфетке» со схемой зала. Lobster + Podkova.',
  langs: ['ru'],
  map: { kind: 'street', street: { ru: '1-я Мавлоно Риёзи', uz: '1-Mavlono Riyoziy' }, house: '47' },
  contactStatus: 'not-contacted',
  channel: 'telegram',
  messageLang: 'ru',
  signaturePitch: {
    ru: 'Гость выбирает зал, сколько их и время — и на схеме загораются подходящие столы',
    uz: 'Mehmon zalni, necha kishi va vaqtni tanlaydi — sxemada mos stollar yonadi',
  },
  pitchText: {
    ru: 'Здравствуйте! Сделал концепт сайта для Petrovic: {link}. Гость выбирает зал, сколько их и время — и на схеме загораются подходящие столы, бронь без звонка. Посмотрите с телефона; если заинтересует — напишите.',
  },
  restaurant: {
    zones: [
      {
        id: 'hall',
        name: { ru: 'Зал', uz: 'Zal' },
        tables: [
          { id: 'h1', seats: 2, x: 16, y: 34, shape: 'round' },
          { id: 'h2', seats: 4, x: 46, y: 34, shape: 'round' },
          { id: 'h3', seats: 6, x: 80, y: 36, shape: 'round' },
          { id: 'h4', seats: 4, x: 22, y: 76, shape: 'round' },
          { id: 'h5', seats: 8, x: 64, y: 76, shape: 'rect' },
        ],
      },
      {
        id: 'booths',
        name: { ru: 'Кабинки', uz: 'Kabinalar' },
        tables: [
          { id: 'b1', seats: 4, x: 46, y: 30, shape: 'booth' },
          { id: 'b2', seats: 6, x: 46, y: 58, shape: 'booth' },
          { id: 'b3', seats: 4, x: 46, y: 86, shape: 'booth' },
        ],
      },
      {
        id: 'terrace',
        name: { ru: 'Терраса', uz: 'Terrasa' },
        seasonal: true,
        tables: [
          { id: 't1', seats: 2, x: 12, y: 62, shape: 'round' },
          { id: 't2', seats: 4, x: 34, y: 62, shape: 'rect' },
          { id: 't3', seats: 6, x: 60, y: 62, shape: 'rect' },
          { id: 't4', seats: 4, x: 86, y: 62, shape: 'round' },
        ],
      },
    ],
    guests: [2, 4, 6, 8],
    menu: [
      {
        id: 'zakuski',
        name: { ru: 'Холодные закуски', uz: 'Sovuq gazaklar' },
        items: [dish('zalivnoe', 'Заливное', 'Zalivnoye', 45_000), dish('forshmak', 'Форшмак', 'Forshmak', 38_000), dish('shuba', 'Селёдка под шубой', 'Seledka «shuba» ostida', 42_000)],
      },
      {
        id: 'k-pivu',
        name: { ru: 'К пиву', uz: 'Pivoga' },
        items: [
          dish('raki', 'Раки', 'Qisqichbaqa', 220_000, { ru: 'за килограмм', uz: 'bir kilogramm uchun' }),
          dish('kolbaski', 'Колбаски свои', 'Oʻz kolbasalari', 55_000, { ru: 'большие и маленькие, острые и нежные', uz: 'katta va kichik, achchiq va yumshoq' }),
          dish('grenki', 'Гренки с чесноком', 'Sarimsoqli grenki', 22_000),
        ],
      },
      {
        id: 'pivo',
        name: { ru: 'Пиво', uz: 'Pivo' },
        items: [dish('svetloe', 'Светлое, 0,5 л', 'Och, 0,5 l', 28_000), dish('temnoe', 'Тёмное, 0,5 л', 'Toʻq, 0,5 l', 32_000)],
      },
    ],
    schedule: { days: [0, 1, 2, 3, 4, 5, 6], open: '12:00', close: '23:00', real: true },
    features: [
      { ru: 'Летняя терраса', uz: 'Yozgi terrasa' },
      { ru: 'Детское меню', uz: 'Bolalar menyusi' },
      { ru: 'Живая музыка', uz: 'Jonli musiqa' },
    ],
  },
  sources: [
    { what: 'Petrovic: Telegram @PetrovicRestaurant, 12:00–23:00, детское меню, еда навынос, летняя терраса', url: 'https://www.afisha.uz/uz/places/petrovic', checked: '2026-10-14, по выдаче веб-поиска' },
    { what: 'PETROVIC ресторан, ООО «PETROVICH TIME», Яшнабадский район, ул. М. Риёзи, 47; ориентир — Паркентский базар, остановка «Шастри»', url: 'https://www.yellowpages.uz/teg/restorany/tashkent', checked: '2026-10-14, по выдаче веб-поиска' },
    { what: 'Пиво и колбаски собственного производства «большие и маленькие, классические и оригинальные, острые и нежные»; европейская кухня, живая музыка', url: 'https://www.goldenpages.uz/en/company/?Id=77695', checked: '2026-10-14, по выдаче веб-поиска' },
    { what: 'Адрес 1-я ул. Мавлоно Риёзи, 47 (статья о блинах на Масленицу 2025)', url: 'https://uz.kursiv.media/2025-02-24/gde-v-tashkente-poest-bliny-na-masleniczu/', checked: '2026-10-14, по выдаче веб-поиска' },
    { what: 'Мавляна Риёзи, 45; Telegram +998 98 188 05 88; в канале — заливное, форшмак, селёдка под шубой, раки; бронь только по телефону', checked: 'таблица заказчика, 10.2026' },
  ],
  unverified: [
    'Номер дома: в таблице заказчика 45, в Yellow Pages и Kursiv — 47. На сайте — 47.',
    'Telegram: в таблице — номер +998 98 188 05 88, на Afisha — @PetrovicRestaurant (возможно, канал). На сайте и для отправки — номер из таблицы.',
    'Instagram «petrovic» упомянут на Afisha — точный адрес не проверен, на сайт не вынесен.',
    'Дни работы не указаны — на сайте только часы 12:00–23:00; терраса помечена «работает летом — уточняйте».',
    'Раскладка зала, названия зон, столы и все цены — пример; блюда — из канала (по таблице заказчика).',
  ],
  notes: [
    'Показать: «Бронь стола — по схеме» — выбрать зал, гостей, день и время; подходящие столы загораются на «салфетке», выбор уходит в заявку. Меню — на наборном табло.',
    'Хук для разговора: столик можно забронировать только по телефону — схема и заявка в Telegram администратору снимают звонки.',
    'Если ответят — спросить: реальная схема зала и сколько столов, цены из меню, как сейчас принимают брони, работает ли терраса зимой.',
  ],
})

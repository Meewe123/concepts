import { defineLead } from '@/core/define'
import { dentalConcerns } from '@/niches/dental/content'
import { mapsUrlFor } from './maps'

export default defineLead({
  slug: 'chilanzar-dental-g52b',
  name: 'Chilonzor Dental Servis',
  niche: 'dental',
  district: { ru: 'Ташкент · Чиланзар', uz: 'Toshkent · Chilonzor' },
  where: { ru: 'на Чиланзаре', uz: 'Chilonzordagi' },
  kind: { ru: 'Стоматология', uz: 'stomatologiya' },
  address: { ru: 'Ташкент, Чиланзарский район, ул. Мукими, 12', uz: 'Toshkent, Chilonzor tumani, Muqimiy koʻchasi, 12' },
  phones: ['+998 71 278 44 00', '+998 71 278 37 10'],
  mapsUrl: mapsUrlFor('chilanzar-dental-g52b'),
  hours: { ru: 'Пн–Пт 09:00–17:00', uz: 'Du–Ju 09:00–17:00' },
  facts: [],
  hook: 'на chds.uz есть список услуг, но нет ни цен, ни записи',
  direction: 'tashkent-mosaic',
  directionWhy:
    'tashkent-mosaic — клиника района Чиланзар, чьё лицо — мозаичные панно на фасадах: смальта кобальта и шафрана, солнце с лучами, узкие прописные Oswald, как буквы на вывесках. Ночной сценарий из плана снят: три справочника дают Пн–Пт 09:00–17:00, поэтому вместо «24/7» — честная строка «Сейчас открыто / закрыто» по времени Ташкента.',
  langs: ['ru', 'uz'],
  map: { kind: 'street', street: { ru: 'Мукими', uz: 'Muqimiy' }, house: '12' },
  contactStatus: 'not-contacted',
  channel: 'facebook',
  messageLang: 'ru',
  signaturePitch: {
    ru: 'На первом экране — «Сейчас открыто · до 17:00»: строка сама меняется по времени Ташкента и графику клиники',
    uz: 'Birinchi ekranda — «Hozir ochiq · 17:00 gacha»: qator Toshkent vaqti va klinika jadvali boʻyicha oʻzi oʻzgaradi',
  },
  pitchText: {
    ru: 'Здравствуйте! Сделал концепт сайта для Chilonzor Dental Servis: {link}. На первом экране — «Сейчас открыто · до 17:00»: строка сама меняется по времени Ташкента и вашему графику Пн–Пт. Посмотрите с телефона; если заинтересует — напишите.',
    // TODO: проверить носителем
    uz: 'Assalomu alaykum! Chilonzor Dental Servis uchun sayt konseptini tayyorladim: {link}. Birinchi ekranda — «Hozir ochiq · 17:00 gacha»: qator Toshkent vaqti va Du–Ju ish jadvalingiz boʻyicha oʻzi oʻzgaradi. Telefondan koʻring; qiziqtirsa — yozing.',
  },
  dental: {
    concerns: dentalConcerns(),
    kids: true,
    schedule: { days: [1, 2, 3, 4, 5], open: '09:00', close: '17:00' },
  },
  sources: [
    {
      what: 'Официальный сайт: CHILONZOR DENTAL SERVIS; услуги — лечение зубов, хирургия, протезирование, ортодонтия, детская стоматология, рентгенография; цен и записи нет',
      url: 'https://chds.uz/',
      checked: '2026-10-13, по выдаче веб-поиска (из контейнера сайт не открыть)',
    },
    { what: 'График 9:00–17:00, Сб и Вс — выходные; ул. Мукими, 12, Чиланзарский район', url: 'https://klinika.uz/klinika/klinika-chilanzar-dental-servis-tashkent', checked: '2026-10-13, по выдаче веб-поиска' },
    { what: 'Время работы 9.00–17.00', url: 'https://clinics.uz/catalog/medical-centers/chilanzar-dental-servis', checked: '2026-10-13, по выдаче веб-поиска' },
    { what: '«Chilanzar Dental Servis - Vitas», Muqimiy koʻchasi, 12, будни 09:00–17:00', url: 'https://med24.uz/uz/klinika/chilanzar-dental-servis', checked: '2026-10-13, по выдаче веб-поиска' },
    { what: 'Год основания 1991 (на сайт не вынесен)', url: 'https://company.medelement.com/', checked: '2026-10-12, по выдаче веб-поиска' },
    { what: 'Телефоны +998 71 278 44 00 и +998 71 278 37 10, «только Facebook», «24/7»', checked: 'таблица заказчика, 10.2026' },
  ],
  unverified: [
    '«24/7» из таблицы заказчика не подтвердился: klinika.uz, clinics.uz, top.uz и med24 дают Пн–Пт 09:00–17:00 — на сайте этот график с пометкой «по справочникам, уточняйте».',
    'Год основания: medelement — 1991, на chds.uz — «27 лет на рынке»; не сходится — на сайт не вынесено.',
    'В справочниках есть ещё номер +998 71 278 47 79 — на сайт не вынесен.',
    'Apteka.uz даёт другой адрес (Сайрам, 25) и 09:00–18:00 — похоже на ошибку справочника, не используется.',
    'Страница в Facebook — из таблицы заказчика, поиск её не нашёл; Telegram и Instagram не найдены.',
    'На med24 клиника названа «Chilanzar Dental Servis - Vitas» — связь с «Vitas» не проверена.',
    'Все цены, визиты, сроки и рассрочка — пример.',
  ],
  notes: [
    'Показать: строку «Сейчас открыто · до 17:00» (меняется по времени Ташкента) и «Что вас беспокоит?» — плитки, ориентир цены, рассрочка.',
    'Хук для разговора (если спросят, зачем сайт): на chds.uz есть список услуг, но нет ни цен, ни записи.',
    'Куда писать: Telegram и Instagram не найдены; Facebook — по таблице заказчика (ссылку взять из неё), иначе звонок на городской +998 71 278 44 00.',
    'Если ответят — спросить: какие цены можно показать, точный график (суббота?), кто отвечает на заявки с сайта.',
  ],
})

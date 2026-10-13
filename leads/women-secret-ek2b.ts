import { defineLead } from '@/core/define'
import { mapsUrlFor } from './maps'

const ex = true

export default defineLead({
  slug: 'women-secret-ek2b',
  name: 'Women Secret',
  niche: 'beauty',
  district: { ru: 'Ташкент · Юнусабад', uz: 'Toshkent · Yunusobod' },
  where: { ru: 'в Юнусабаде', uz: 'Yunusoboddagi' },
  kind: { ru: 'Спа и уход', uz: 'spa va parvarish saloni' },
  address: { ru: 'Юнусабадский район, тупик ул. Алай Бозори, 59/7', uz: 'Yunusobod tumani, Oloy bozori berk koʻchasi, 59/7' },
  phones: ['+998 55 508 08 81'],
  telegram: '+998555080881',
  mapsUrl: mapsUrlFor('women-secret-ek2b'),
  facts: [],
  hook: 'ни сайта, ни соцсетей в карточке: новому гостю не на что посмотреть перед визитом',
  direction: 'spa-whisper',
  directionWhy:
    'spa-whisper — у салона нет ни сайта, ни соцсетей, и первое впечатление должно быть тихим: дышащая сфера, тауп, крем и мягкое золото, лёгкий курсив Spectral — гость успокаивается ещё до визита.',
  langs: ['ru', 'uz'],
  map: { kind: 'street', street: { ru: 'тупик ул. Алай Бозори', uz: 'Oloy bozori berk koʻchasi' }, house: '59/7' },
  contactStatus: 'not-contacted',
  channel: 'telegram',
  messageLang: 'ru',
  signaturePitch: {
    ru: 'Гостья выбирает ритуал и видит, сколько он длится, сколько стоит и ближайшие свободные часы',
    uz: 'Mehmon marosimni tanlaydi va qancha davom etishi, narxi va eng yaqin boʻsh soatlarni koʻradi',
  },
  pitchText: {
    ru: 'Здравствуйте! Сделал концепт сайта для Women Secret: {link}. Гостья выбирает ритуал — и сразу видит, сколько он длится, цену и свободные часы, а в первом экране дышит спокойная сфера. Посмотрите с телефона; если заинтересует — напишите.',
    // TODO: проверить носителем
    uz: 'Assalomu alaykum! Women Secret uchun sayt konseptini tayyorladim: {link}. Mehmon marosimni tanlaydi — davomiyligi, narxi va boʻsh soatlarni darhol koʻradi, birinchi ekranda esa xotirjam doira nafas oladi. Telefondan koʻring; qiziqtirsa — yozing.',
  },
  beauty: {
    schedule: { days: [0, 1, 2, 3, 4, 5, 6], open: '09:00', close: '21:00', real: false },
    services: [
      { id: 'massage', name: { ru: 'Классический массаж', uz: 'Klassik massaj' }, minutes: 60, price: 250_000, from: true, example: ex },
      { id: 'face-massage', name: { ru: 'Массаж лица', uz: 'Yuz massaji' }, minutes: 45, price: 180_000, from: true, example: ex },
      { id: 'face-care', name: { ru: 'Уход за лицом', uz: 'Yuz parvarishi' }, minutes: 75, price: 350_000, from: true, example: ex },
      { id: 'wrap', name: { ru: 'Обёртывание', uz: 'Oʻrash muolajasi' }, minutes: 60, price: 300_000, from: true, example: ex },
      { id: 'spa-mani', name: { ru: 'Спа-маникюр', uz: 'Spa-manikyur' }, minutes: 90, price: 170_000, from: true, example: ex },
      { id: 'program', name: { ru: 'Спа-программа: массаж и уход', uz: 'Spa-dastur: massaj va parvarish' }, minutes: 150, price: 650_000, from: true, example: ex },
    ],
  },
  sources: [
    { what: 'Юнусабадский район, тупик ул. Алай Бозори, 59/7; телефон +998 55 508 08 81; в карточке нет сайта и соцсетей', checked: 'таблица заказчика, 10.2026' },
    { what: 'Карточка организации', url: 'https://yandex.uz/maps/org/women_secret/75767442657/', checked: 'ссылка от заказчика, 10.2026' },
    { what: 'Салон «Women Secret» в Ташкенте: ежедневно 08:00–22:00 (адрес в выдаче не виден, на сайт не вынесено)', url: 'https://www.goldenpages.uz/company/?Id=119694', checked: '2026-10-13, по выдаче веб-поиска' },
  ],
  unverified: [
    'График: Golden Pages даёт «ежедневно 08:00–22:00», но адрес в выдаче не виден — не уверен, что это тот же салон. На сайте «уточняйте по телефону», окна — демо 09:00–21:00.',
    'Telegram открыт по номеру телефона — если у номера нет аккаунта, ссылка не сработает.',
    'Написание адреса на узбекском («Oloy bozori berk koʻchasi») — проверить носителем.',
    'Все ритуалы, цены и длительности — пример.',
  ],
  notes: [
    'Показать: дышащую сферу в первом экране, выбор «Спа-программа» → кольцо длительности → тихий час → «Вы с нами 17:00 — 19:30».',
    'Хук для разговора: в карточке нет ни сайта, ни соцсетей — новому гостю не на что посмотреть перед визитом.',
    'Если ответят — спросить: список процедур и цены, график, есть ли Instagram или Telegram-канал.',
  ],
})

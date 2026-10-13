import { defineLead } from '@/core/define'
import { mapsUrlFor } from './maps'

const ex = true

export default defineLead({
  slug: 'konfetti-7hgp',
  name: 'Конфетти',
  niche: 'beauty',
  district: { ru: 'Ташкент · Юнусабад', uz: 'Toshkent · Yunusobod' },
  where: { ru: 'в Юнусабаде', uz: 'Yunusoboddagi' },
  address: { ru: 'Ташкент, Юнусабад, 11-й квартал, 52Б', uz: 'Toshkent, Yunusobod, 11-mavze, 52B' },
  phones: ['+998 90 189 83 65'],
  whatsapp: '+998901898365',
  mapsUrl: mapsUrlFor('konfetti-7hgp'),
  facts: [],
  hook: 'на сайте 2019 года обещана скидка за онлайн-бронь, но формы брони там нет',
  direction: 'confetti-pop',
  directionWhy:
    'confetti-pop — само название «Конфетти» подсказывает приём: запись как маленький праздник — конфетти от касания и при выборе окна, услуги-«конфетки», круговая длительность. Молочный фон и сдержанная палитра — «со вкусом, не цирк». Unbounded + Montserrat (Onest в нише уже у Expert Beauty).',
  langs: ['ru', 'uz'],
  map: { kind: 'quarter', area: { ru: 'Юнусабад', uz: 'Yunusobod' }, quarter: { ru: '11-й квартал', uz: '11-mavze' }, number: '52Б' },
  contactStatus: 'read-silent',
  hold: 'у салона уже есть сайт, а Telegram по номеру не работает',
  channel: 'telegram',
  messageLang: 'ru',
  signaturePitch: {
    ru: 'Клиентка выбирает услугу и видит длительность, цену и ближайшие окна, а при выборе окна летит конфетти',
    uz: 'Mijoz xizmatni tanlaydi va davomiylik, narx va eng yaqin vaqtni koʻradi, vaqt tanlanganda konfetti uchadi',
  },
  pitchText: {
    ru: 'Здравствуйте! Сделал вам концепт сайта: {link}. На вашем сайте обещана скидка за онлайн-бронь — здесь бронь наконец есть: выбираешь услугу, видишь цену и свободные окна, жмёшь — и летит конфетти. Посмотрите с телефона; если заинтересует — напишите.',
    // TODO: проверить носителем
    uz: 'Assalomu alaykum! Sizga sayt konseptini tayyorladim: {link}. Saytingizda onlayn bron uchun chegirma vaʼda qilingan — bu yerda bron nihoyat bor: xizmatni tanlaysiz, narx va boʻsh vaqtni koʻrasiz, bosasiz — konfetti uchadi. Telefondan koʻring; qiziqtirsa — yozing.',
  },
  beauty: {
    schedule: { days: [0, 1, 2, 3, 4, 5, 6], open: '10:00', close: '20:00', real: false },
    services: [
      { id: 'mani', name: { ru: 'Маникюр с покрытием', uz: 'Qoplamali manikyur' }, minutes: 90, price: 140_000, from: true, example: ex },
      { id: 'nails', name: { ru: 'Наращивание ногтей', uz: 'Tirnoq oʻstirish' }, minutes: 150, price: 280_000, from: true, example: ex },
      { id: 'pedi', name: { ru: 'Педикюр', uz: 'Pedikyur' }, minutes: 90, price: 190_000, from: true, example: ex },
      { id: 'brows', name: { ru: 'Брови', uz: 'Qosh' }, minutes: 45, price: 90_000, from: true, example: ex },
      { id: 'lashes', name: { ru: 'Ресницы', uz: 'Kipriklar' }, minutes: 120, price: 220_000, from: true, example: ex },
      { id: 'cut', name: { ru: 'Стрижка', uz: 'Soch olish' }, minutes: 60, price: 120_000, from: true, example: ex },
      { id: 'color', name: { ru: 'Окрашивание', uz: 'Soch boʻyash' }, minutes: 180, price: 400_000, from: true, example: ex },
      { id: 'makeup', name: { ru: 'Макияж', uz: 'Makiyaj' }, minutes: 60, price: 200_000, from: true, example: ex },
    ],
  },
  sources: [
    { what: 'Юнусабад, 11-й квартал, 52Б; телефон +998 90 189 83 65 (Telegram и WhatsApp по номеру); сайт 2019 года обещает скидку за онлайн-бронь, формы нет', checked: 'таблица заказчика, 10.2026' },
    { what: 'Карточка организации', url: 'https://yandex.uz/maps/org/konfetti/148395193804/', checked: 'ссылка от заказчика, 10.2026' },
  ],
  unverified: [
    'Веб-поиск 13.10.2026 салон «Конфетти» в Юнусабаде не нашёл — адрес, телефон и данные о сайте 2019 года только из таблицы заказчика.',
    'Размер скидки за онлайн-бронь неизвестен — на сайте стикер «размер уточнить».',
    'Telegram по номеру не работает (проверил заказчик 13.10) — ссылка убрана. WhatsApp по номеру не проверен.',
    'График не найден: на сайте «уточняйте по телефону», окна записи — демо по примерному графику 10:00–20:00.',
    'Все услуги, цены и длительности — пример.',
  ],
  notes: [
    'Показать: коснуться фона в первом экране (конфетти), выбрать «Маникюр с покрытием» → окно → конфетти и кнопка «Записаться: …»; стикер «скидка за онлайн-бронь».',
    'Хук для разговора: на старом сайте обещана скидка за онлайн-бронь, а самой брони нет — здесь она в два касания.',
    'Если ответят — спросить: размер скидки за онлайн-бронь, прайс, график, кто подтверждает записи.',
  ],
})

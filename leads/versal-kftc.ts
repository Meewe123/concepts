import { defineLead } from '@/core/define'
import { mapsUrlFor } from './maps'

export default defineLead({
  slug: 'versal-kftc',
  name: 'Версаль',
  niche: 'banquet',
  district: { ru: 'Шайхантахурский район', uz: 'Shayxontohur tumani' },
  where: { ru: 'на Гульабаде', uz: 'Gulobod massividagi' },
  address: { ru: 'Шайхантахурский район, массив Гульабад, 8А', uz: 'Shayxontohur tumani, Gulobod massivi, 8A' },
  phones: ['+998 99 006 22 44', '+998 99 444 74 47'],
  mapsUrl: mapsUrlFor('versal-kftc'),
  facts: [{ text: { ru: '1651 оценка на Яндекс Картах', uz: 'Yandex Xaritalarda 1651 ta baho' }, source: 'Яндекс Карты', asOf: '2026-10' }],
  hook: 'у «Версаля» 1651 оценка на Яндекс Картах и восемь телефонов, но нет сайта, где видны залы и вместимость',
  // TODO: проверить носителем
  hookUz: '«Versal»ning Yandex Xaritalarda 1651 ta bahosi bor, ammo zallar koʻrinadigan sayt yoʻq',
  messageName: { ru: '«Версаля»', uz: '«Versal»' },
  direction: 'marble-brass',
  langs: ['ru', 'uz'],
  map: {
    kind: 'quarter',
    area: { ru: 'Шайхантахурский район', uz: 'Shayxontohur tumani' },
    quarter: { ru: 'массив Гульабад', uz: 'Gulobod massivi' },
    number: '8А',
  },
  contactStatus: 'not-contacted',
  channel: 'telegram',
  messageLang: 'ru',
  signaturePitch: {
    ru: 'Гость выбирает число гостей — и анфилада залов показывает, какой подойдёт, со столами и ориентиром по стоимости',
    uz: 'Mehmon mehmonlar sonini tanlaydi — zallar qatori qaysi biri mos kelishini stollar va taxminiy narx bilan koʻrsatadi',
  },
  banquet: {
    halls: [
      { id: 'h50', name: { ru: 'Камерный зал', uz: 'Kichik zal' }, capacity: 50, example: true },
      { id: 'h100', name: { ru: 'Средний зал', uz: 'Oʻrta zal' }, capacity: 100, example: true },
      { id: 'h300', name: { ru: 'Большой зал', uz: 'Katta zal' }, capacity: 300, example: true },
    ],
    hallsNote: { ru: 'Вместимость — по отзывам гостей на Яндекс Картах, уточнить.', uz: 'Sigʻim — Yandex Xaritalardagi mehmonlar sharhlariga koʻra, aniqlashtirish kerak.' },
    packages: [
      {
        id: 'klassika',
        name: { ru: 'Классика', uz: 'Klassika' },
        pricePerGuest: 260_000,
        items: [
          { ru: 'закуски и салаты', uz: 'gazaklar va salatlar' },
          { ru: 'горячее и плов', uz: 'issiq taom va osh' },
          { ru: 'фрукты и чай', uz: 'mevalar va choy' },
        ],
        example: true,
      },
      {
        id: 'parad',
        name: { ru: 'Парадный', uz: 'Tantanali' },
        pricePerGuest: 340_000,
        items: [
          { ru: 'всё из «Классики»', uz: '«Klassika»dagi hamma narsa' },
          { ru: 'национальные закуски', uz: 'milliy gazaklar' },
          { ru: 'торт', uz: 'tort' },
        ],
        example: true,
      },
      {
        id: 'grand',
        name: { ru: 'Гранд', uz: 'Grand' },
        pricePerGuest: 430_000,
        items: [
          { ru: 'всё из «Парадного»', uz: '«Tantanali»dagi hamma narsa' },
          { ru: 'горячее на выбор', uz: 'tanlov boʻyicha issiq taom' },
          { ru: 'десертный стол', uz: 'desert stoli' },
        ],
        example: true,
      },
    ],
    defaultGuests: 80,
  },
  notes: [
    'Показать: ползунок гостей — анфилада из трёх проёмов, светится дверь подходящего зала (50 / 100 / 300 — по отзывам, уточнить).',
    'Хук: 1651 оценка и восемь телефонов, но нет сайта — люди не видят залы и вместимость до звонка.',
    'В карточке нет соцсетей — писать в Telegram по номеру; если номер не в Telegram, звонить.',
    'Если ответят — спросить: точная вместимость залов, пакеты, кто отвечает на звонки.',
  ],
})

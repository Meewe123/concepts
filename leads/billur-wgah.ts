import { defineLead } from '@/core/define'
import { mapsUrlFor } from './maps'

export default defineLead({
  slug: 'billur-wgah',
  name: 'Billur',
  niche: 'banquet',
  district: { ru: 'Юнусабадский район', uz: 'Yunusobod tumani' },
  where: { ru: 'в Юнусабаде', uz: 'Yunusoboddagi' },
  address: {
    ru: 'Юнусабадский район, махалля Биллур, 4-й квартал, 77А',
    uz: 'Yunusobod tumani, Billur mahallasi, 4-mavze, 77A',
  },
  phones: ['+998 97 133 55 00'],
  instagram: 'billur_restaurant_',
  telegram: '+998971335500',
  mapsUrl: mapsUrlFor('billur-wgah'),
  rating: { value: 5.0, count: 955, source: 'Яндекс Карты', asOf: '2026-10' },
  facts: [],
  hook: 'в карточке Billur на Яндекс Картах указан billur.com, но этот адрес ведёт на сайт хостинг-компании: гости, которые нажимают на ссылку, к вам не попадают',
  direction: 'crystal-facet',
  langs: ['ru', 'uz'],
  map: {
    kind: 'quarter',
    area: { ru: 'Юнусабад', uz: 'Yunusobod' },
    quarter: { ru: '4-й квартал', uz: '4-mavze' },
    number: '4',
  },
  contactStatus: 'sent',
  statusChangedAt: '2026-10-12',
  channel: 'telegram',
  messageLang: 'ru',
  signaturePitch: {
    ru: 'Гость двигает ползунок «Сколько гостей?» и сразу видит, сколько столов займёт праздник и во что примерно обойдётся вечер',
    uz: 'Mehmonlar sonini tanlasangiz, nechta stol kerakligi va kecha taxminan qanchaga tushishi darhol koʻrinadi',
  },
  banquet: {
    halls: [
      { id: 'katta', name: { ru: 'Большой зал', uz: 'Katta zal' }, capacity: 500, example: true },
      { id: 'kichik', name: { ru: 'Малый зал', uz: 'Kichik zal' }, capacity: 150, example: true },
    ],
    packages: [
      {
        id: 'standart',
        name: { ru: 'Стандарт', uz: 'Standart' },
        pricePerGuest: 250_000,
        items: [
          { ru: 'салаты и холодные закуски', uz: 'salatlar va sovuq gazaklar' },
          { ru: 'горячее и плов', uz: 'issiq taom va osh' },
          { ru: 'фрукты и чай', uz: 'mevalar va choy' },
        ],
        example: true,
      },
      {
        id: 'premium',
        name: { ru: 'Премиум', uz: 'Premium' },
        pricePerGuest: 320_000,
        items: [
          { ru: 'всё из «Стандарта»', uz: '«Standart»dagi hamma narsa' },
          { ru: 'национальные закуски', uz: 'milliy gazaklar' },
          { ru: 'второе горячее блюдо', uz: 'ikkinchi issiq taom' },
          { ru: 'торт', uz: 'tort' },
        ],
        example: true,
      },
      {
        id: 'lyuks',
        name: { ru: 'Люкс', uz: 'Lyuks' },
        pricePerGuest: 400_000,
        items: [
          { ru: 'всё из «Премиума»', uz: '«Premium»dagi hamma narsa' },
          { ru: 'авторская подача горячего', uz: 'issiq taomning mualliflik taqdimoti' },
          { ru: 'сладкий стол', uz: 'shirinliklar stoli' },
          { ru: 'напитки на весь вечер', uz: 'butun kecha uchun ichimliklar' },
        ],
        example: true,
      },
    ],
    defaultGuests: 250,
  },
  notes: [
    'Показать: ползунок «Сколько гостей?» — столы-грани загораются на схеме, ниже ориентир по стоимости.',
    'Хук для разговора: billur.com в карточке Яндекс Карт ведёт на сайт хостинг-компании — гости теряются. Рабочий сайт можно сразу вписать в карточку.',
    'Если ответят — спросить: сколько залов, есть ли пакеты меню, кому писать по поводу сайта и доступа к карточке на картах.',
  ],
})

import { defineLead } from '@/core/define'
import { mapsUrlFor } from './maps'

export default defineLead({
  slug: 'royal-rose-yz34',
  name: 'Royal Rose',
  niche: 'banquet',
  district: { ru: 'Ташкент', uz: 'Toshkent' },
  where: { ru: 'на Исмаилата', uz: 'Ismoilota koʻchasidagi' },
  address: { ru: 'Ташкент, ул. Исмаилата, 39', uz: 'Toshkent, Ismoilota koʻchasi, 39' },
  phones: ['+998 99 745 33 33', '+998 97 145 33 33'],
  instagram: 'royal_rose.uz',
  telegram: 'royal_rose',
  mapsUrl: mapsUrlFor('royal-rose-yz34'),
  facts: [{ text: { ru: '≈ 20 тыс. подписчиков в Instagram', uz: 'Instagramda ≈ 20 ming obunachi' }, source: 'Instagram @royal_rose.uz', asOf: '2026-10' }],
  hook: 'пакеты и цены Royal Rose нигде не опубликованы — гостям приходится спрашивать в директе',
  direction: 'crimson-velvet',
  langs: ['ru', 'uz'],
  map: { kind: 'street', street: { ru: 'ул. Исмаилата', uz: 'Ismoilota koʻchasi' }, house: '39' },
  contactStatus: 'forwarded',
  channel: 'telegram',
  messageLang: 'ru',
  signaturePitch: {
    ru: 'Число гостей задаётся ползунком, и сразу видны пакеты и ориентир по стоимости — то, о чём сейчас спрашивают в директе',
    uz: 'Mijoz mehmonlar sonini tanlaydi va paketlar hamda taxminiy narxni darhol koʻradi — hozir direktda aynan shuni soʻrashadi',
  },
  banquet: {
    halls: [
      { id: 'katta', name: { ru: 'Большой зал', uz: 'Katta zal' }, capacity: 400, example: true },
      { id: 'kichik', name: { ru: 'Малый зал', uz: 'Kichik zal' }, capacity: 150, example: true },
    ],
    packages: [
      {
        id: 'klassik',
        name: { ru: 'Классический', uz: 'Klassik' },
        pricePerGuest: 300_000,
        items: [
          { ru: 'холодные закуски и салаты', uz: 'sovuq gazaklar va salatlar' },
          { ru: 'горячее и плов', uz: 'issiq taom va osh' },
          { ru: 'фрукты и чай', uz: 'mevalar va choy' },
        ],
        example: true,
      },
      {
        id: 'royal',
        name: { ru: 'Королевский', uz: 'Qirollik' },
        pricePerGuest: 380_000,
        items: [
          { ru: 'всё из «Классического»', uz: '«Klassik»dagi hamma narsa' },
          { ru: 'welcome-напитки от бара', uz: 'bardan welcome-ichimliklar' },
          { ru: 'второе горячее', uz: 'ikkinchi issiq taom' },
          { ru: 'торт', uz: 'tort' },
        ],
        example: true,
      },
      {
        id: 'premer',
        name: { ru: 'Премьер', uz: 'Premyer' },
        pricePerGuest: 470_000,
        items: [
          { ru: 'всё из «Королевского»', uz: '«Qirollik»dagi hamma narsa' },
          { ru: 'авторские напитки на весь вечер', uz: 'butun kecha uchun mualliflik ichimliklari' },
          { ru: 'десертный стол', uz: 'desert stoli' },
        ],
        example: true,
      },
    ],
    defaultGuests: 200,
  },
  notes: [
    'Контакт передали в самой Royal Rose — начинать с этого (шаблон forwarded).',
    'Показать: пакеты с ценами (пример) и ползунок гостей — роза раскрывается по мере роста праздника; отдельный блок бара.',
    'Если ответят — спросить: какие пакеты реально есть и можно ли показывать цены, сколько залов, что входит в бар.',
  ],
})

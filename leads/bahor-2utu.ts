import { defineLead } from '@/core/define'
import { mapsUrlFor } from './maps'

export default defineLead({
  slug: 'bahor-2utu',
  name: 'Bahor',
  niche: 'banquet',
  district: { ru: 'Ташкент', uz: 'Toshkent' },
  where: { ru: 'на Истикбол', uz: 'Istiqbol koʻchasidagi' },
  address: { ru: 'Ташкент, ул. Истикбол, 8', uz: 'Toshkent, Istiqbol koʻchasi, 8' },
  phones: ['+998 98 364 75 75', '+998 90 185 35 76'],
  instagram: 'bahor_restaurant_uz',
  whatsapp: '+998 90 185 35 76',
  mapsUrl: mapsUrlFor('bahor-2utu'),
  facts: [{ text: { ru: 'Основан в 1958 году', uz: '1958-yilda tashkil topgan' }, source: 'restaurantbahor.uz', asOf: '2026-10' }],
  hook: 'на restaurantbahor.uz вместо рассказа о зале до сих пор шаблонный текст',
  direction: 'garden-light',
  langs: ['ru', 'uz'],
  map: { kind: 'street', street: { ru: 'ул. Истикбол', uz: 'Istiqbol koʻchasi' }, house: '8' },
  contactStatus: 'sent',
  channel: 'whatsapp',
  messageLang: 'ru',
  signaturePitch: {
    ru: 'Можно посчитать праздник в зале или выездной кейтеринг: число гостей — столы, пакет и ориентир по стоимости',
    uz: 'Zaldagi bayram yoki koʻchma keyteringni hisoblash mumkin: mehmonlar soni — stollar va taxminiy narx',
  },
  banquet: {
    halls: [
      { id: 'asosiy', name: { ru: 'Главный зал', uz: 'Asosiy zal' }, capacity: 500, example: true },
      { id: 'terrasa', name: { ru: 'Летняя терраса', uz: 'Yozgi ayvon' }, capacity: 200, example: true },
    ],
    packages: [
      {
        id: 'bahor',
        name: { ru: 'Весенний', uz: 'Bahoriy' },
        pricePerGuest: 270_000,
        items: [
          { ru: 'закуски и салаты', uz: 'gazaklar va salatlar' },
          { ru: 'горячее и плов', uz: 'issiq taom va osh' },
          { ru: 'фрукты, чай', uz: 'mevalar, choy' },
        ],
        example: true,
      },
      {
        id: 'bayram',
        name: { ru: 'Праздничный', uz: 'Bayram' },
        pricePerGuest: 340_000,
        items: [
          { ru: 'всё из «Весеннего»', uz: '«Bahoriy»dagi hamma narsa' },
          { ru: 'национальные закуски', uz: 'milliy gazaklar' },
          { ru: 'торт', uz: 'tort' },
        ],
        example: true,
      },
      {
        id: 'yubiley',
        name: { ru: 'Юбилейный', uz: 'Yubiley' },
        pricePerGuest: 420_000,
        items: [
          { ru: 'всё из «Праздничного»', uz: '«Bayram»dagi hamma narsa' },
          { ru: 'горячее на выбор', uz: 'tanlov boʻyicha issiq taom' },
          { ru: 'сладкий стол', uz: 'shirinliklar stoli' },
        ],
        example: true,
      },
    ],
    catering: {
      packages: [
        { id: 'furshet', name: { ru: 'Фуршет', uz: 'Furshet' }, pricePerGuest: 180_000, items: [], example: true },
        { id: 'vyezd', name: { ru: 'Банкет на выезде', uz: 'Koʻchma banket' }, pricePerGuest: 310_000, items: [], example: true },
        { id: 'kofe', name: { ru: 'Кофе-брейк', uz: 'Kofe-breyk' }, pricePerGuest: 90_000, items: [], example: true },
      ],
    },
    defaultGuests: 250,
  },
  notes: [
    'Показать: ползунок гостей с переключателем «В зале / Выездной кейтеринг» — ветка распускается по мере роста праздника; «с 1958 года» на первом экране.',
    'Хук для разговора: на restaurantbahor.uz остался шаблонный текст и счётчики по нулям — этот концепт можно поставить на тот же домен.',
    'Если ответят — спросить: актуальные залы и вместимость, форматы кейтеринга, кто ведёт сайт и домен.',
  ],
})

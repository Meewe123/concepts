import { defineLead } from '@/core/define'
import { yandexSearch } from '@/core/format'

export default defineLead({
  slug: 'osiyo-grand-sq4y',
  name: 'Osiyo Grand',
  niche: 'banquet',
  district: { ru: 'Ташкент', uz: 'Toshkent' },
  where: { ru: 'на Лабзаке', uz: 'Labzakdagi' },
  address: { ru: 'Ташкент, ул. Лабзак, 5', uz: 'Toshkent, Labzak koʻchasi, 5' },
  phones: ['+998 98 128 00 09', '+998 97 402 44 44'],
  instagram: 'osiyo_grand',
  telegram: '+998555117111',
  // В таблице нет ссылки на карточку — поиск по адресу. TODO: заменить ссылкой карточки организации.
  mapsUrl: yandexSearch('Osiyo Grand, Ташкент, улица Лабзак, 5'),
  facts: [
    {
      text: { ru: '≈ 93 тыс. подписчиков в Instagram', uz: 'Instagramda ≈ 93 ming obunachi' },
      source: 'Instagram @osiyo_grand',
      asOf: '2026-10',
    },
    {
      text: { ru: '1261 оценка на Яндекс Картах', uz: 'Yandex Xaritalarda 1261 ta baho' },
      source: 'Яндекс Карты',
      asOf: '2026-10',
    },
  ],
  hook: 'у Osiyo Grand 1261 оценка на Яндекс Картах и ≈93 тыс. подписчиков в Instagram, но свободную дату можно узнать только в директе',
  direction: 'suzani-night',
  langs: ['ru', 'uz'],
  map: { kind: 'street', street: { ru: 'ул. Лабзак', uz: 'Labzak koʻchasi' }, house: '5' },
  contactStatus: 'read-silent',
  channel: 'telegram',
  messageLang: 'ru',
  signaturePitch: {
    ru: 'Укажите число гостей — и схема зала сама покажет, сколько нужно столов и какой ориентир по стоимости',
    uz: 'Mehmonlar sonini kiritsangiz, zal sxemasi nechta stol kerakligini va taxminiy narxni oʻzi koʻrsatadi',
  },
  banquet: {
    halls: [
      { id: 'katta', name: { ru: 'Большой зал', uz: 'Katta zal' }, capacity: 800, example: true },
      { id: 'orta', name: { ru: 'Средний зал', uz: 'Oʻrta zal' }, capacity: 350, example: true },
      { id: 'kichik', name: { ru: 'Малый зал', uz: 'Kichik zal' }, capacity: 120, example: true },
    ],
    packages: [
      {
        id: 'klassik',
        name: { ru: 'Классика', uz: 'Klassik' },
        pricePerGuest: 280_000,
        items: [
          { ru: 'холодные закуски и салаты', uz: 'sovuq gazaklar va salatlar' },
          { ru: 'два горячих блюда', uz: 'ikki xil issiq taom' },
          { ru: 'свадебный плов', uz: 'toʻy oshi' },
          { ru: 'фрукты, сладости, чай', uz: 'mevalar, shirinliklar, choy' },
        ],
        example: true,
      },
      {
        id: 'bayram',
        name: { ru: 'Праздничный', uz: 'Bayram' },
        pricePerGuest: 360_000,
        items: [
          { ru: 'всё из «Классики»', uz: '«Klassik»dagi hamma narsa' },
          { ru: 'национальные закуски и самса', uz: 'milliy gazaklar va somsa' },
          { ru: 'три горячих блюда', uz: 'uch xil issiq taom' },
          { ru: 'свадебный торт', uz: 'toʻy torti' },
        ],
        example: true,
      },
      {
        id: 'grand',
        name: { ru: 'Гранд', uz: 'Grand' },
        pricePerGuest: 450_000,
        items: [
          { ru: 'всё из «Праздничного»', uz: '«Bayram»dagi hamma narsa' },
          { ru: 'плов из казана прямо в зале', uz: 'oshni qozondan toʻgʻridan-toʻgʻri zalda tortish' },
          { ru: 'десертный стол', uz: 'desert stoli' },
          { ru: 'напитки на весь вечер', uz: 'butun kecha uchun ichimliklar' },
        ],
        example: true,
      },
    ],
    defaultGuests: 300,
  },
  notes: [
    'Показать: схему зала с ползунком «Сколько гостей?» и меню-карточку пакетов.',
    'Если ответят — спросить: сколько залов и на сколько гостей, есть ли готовые пакеты, как сейчас принимают заявки (директ, телефон), кто ведёт Instagram.',
    'Ссылка «Открыть в Яндекс Картах» — пока поиск по адресу; заменить ссылкой на карточку.',
    'Владелец, по-видимому, Gold Vision Group — в разговоре не упоминать, пока не скажут сами.',
  ],
})

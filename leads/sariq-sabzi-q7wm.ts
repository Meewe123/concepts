import { defineLead } from '@/core/define'
import { yandexSearch } from '@/core/format'
import type { MenuItem } from '@/core/types'

// Витрина студии: бренд вымышленный (поиском не нашёл «Sariq Sabzi» в Ташкенте, 2026-10-14). TODO: проверить носителем — узбекские строки
const dish = (id: string, ru: string, uz: string, price: number, note?: { ru: string; uz: string }): MenuItem => ({ id, name: { ru, uz }, price, note, example: true })

export default defineLead({
  slug: 'sariq-sabzi-q7wm',
  name: 'Sariq Sabzi',
  showcase: true,
  niche: 'restaurant',
  district: { ru: 'Ташкент · Юнусабад', uz: 'Toshkent · Yunusobod' },
  where: { ru: 'в Юнусабаде', uz: 'Yunusoboddagi' },
  kind: { ru: 'Плов-центр', uz: 'osh markazi' },
  address: { ru: 'Ташкент, Юнусабадский район', uz: 'Toshkent, Yunusobod tumani' },
  phones: ['+998 00 000 00 00'],
  mapsUrl: yandexSearch('Ташкент, Юнусабадский район'),
  hours: { ru: '10:00–17:00', uz: '10:00–17:00' },
  facts: [],
  hook: 'витрина студии',
  direction: 'qozon',
  directionWhy: 'qozon — казан в разрезе на огне: уровень плова опускается к вечеру, пар, топчаны во дворе под виноградником, ляганы в меню. Fira Sans Extra Condensed + Alegreya Sans.',
  langs: ['ru', 'uz'],
  map: { kind: 'street', street: { ru: 'Юнусабад', uz: 'Yunusobod' }, house: '—' },
  contactStatus: 'not-contacted',
  channel: 'telegram',
  messageLang: 'ru',
  signaturePitch: {
    ru: 'Сколько плова осталось в казане — видно на сайте; топчан бронируется в два касания',
    uz: 'Qozonda qancha osh qolgani saytda koʻrinadi; soʻri ikki bosishda band qilinadi',
  },
  restaurant: {
    zones: [
      {
        id: 'zal',
        name: { ru: 'Зал', uz: 'Zal' },
        tables: [
          { id: 'z1', seats: 2, x: 18, y: 36, shape: 'round' },
          { id: 'z2', seats: 4, x: 50, y: 36, shape: 'round' },
          { id: 'z3', seats: 4, x: 82, y: 36, shape: 'round' },
          { id: 'z4', seats: 6, x: 30, y: 76, shape: 'rect' },
          { id: 'z5', seats: 8, x: 74, y: 76, shape: 'rect' },
        ],
      },
      {
        id: 'sori',
        name: { ru: 'Топчаны', uz: 'Soʻrilar' },
        tables: [
          { id: 's1', seats: 4, x: 50, y: 20, shape: 'booth' },
          { id: 's2', seats: 6, x: 50, y: 44, shape: 'booth' },
          { id: 's3', seats: 8, x: 50, y: 68, shape: 'booth' },
          { id: 's4', seats: 10, x: 50, y: 90, shape: 'booth' },
        ],
      },
      {
        id: 'hovli',
        name: { ru: 'Двор', uz: 'Hovli' },
        note: { ru: 'под виноградником', uz: 'tok ostida' },
        seasonal: true,
        tables: [
          { id: 'h1', seats: 4, x: 22, y: 62, shape: 'round' },
          { id: 'h2', seats: 6, x: 54, y: 62, shape: 'rect' },
          { id: 'h3', seats: 2, x: 84, y: 62, shape: 'round' },
        ],
      },
    ],
    guests: [2, 4, 6, 10],
    menu: [
      {
        id: 'plov',
        name: { ru: 'Плов', uz: 'Osh' },
        items: [
          dish('toshkent', 'Ташкентский', 'Toshkent oshi', 55_000, { ru: 'с казы и перепелиным яйцом', uz: 'qazi va bedana tuxumi bilan' }),
          dish('samarqand', 'Самаркандский', 'Samarqand oshi', 58_000, { ru: 'мясо и рис слоями — не перемешивают', uz: 'goʻsht va guruch qatlam-qatlam — aralashtirilmaydi' }),
          dish('toy', 'Свадебный', 'Toʻy oshi', 50_000, { ru: 'с нутом и изюмом', uz: 'noʻxat va mayiz bilan' }),
        ],
      },
      {
        id: 'yonida',
        name: { ru: 'К плову', uz: 'Osh yoniga' },
        items: [
          dish('achichuk', 'Ачичук', 'Achchiq-chuchuk', 12_000, { ru: 'помидор, лук, острый перец', uz: 'pomidor, piyoz, achchiq qalampir' }),
          dish('qazi', 'Казы, порция', 'Qazi, porsiya', 38_000),
          dish('non', 'Лепёшка из тандыра', 'Tandir non', 6_000),
        ],
      },
      {
        id: 'choy',
        name: { ru: 'Чай', uz: 'Choy' },
        items: [dish('kok', 'Зелёный, чайник', 'Koʻk choy, choynak', 8_000), dish('qora', 'Чёрный, чайник', 'Qora choy, choynak', 8_000), dish('kompot', 'Компот, кувшин', 'Kompot, koʻza', 18_000)],
      },
    ],
    schedule: { days: [0, 1, 2, 3, 4, 5, 6], open: '10:00', close: '17:00', real: false },
    features: [
      { ru: 'Плов с 11:00 — пока не кончится', uz: 'Osh 11:00 dan — tugaguncha' },
      { ru: 'Топчаны во дворе', uz: 'Hovlida soʻrilar' },
    ],
    pot: { dish: { ru: 'Плов', uz: 'Osh' }, from: '11:00', until: '16:00' },
  },
  unverified: ['Витрина студии: бренд, меню, цены, часы и адрес придуманы.'],
})

import { defineLead } from '@/core/define'
import { yandexSearch } from '@/core/format'
import { dentalConcerns } from '@/niches/dental/content'

// Витрина студии: бренд вымышленный (поиском не нашёл стоматологию «Chinni» в Ташкенте, 2026-10-14). TODO: проверить носителем — узбекские строки
export default defineLead({
  slug: 'chinni-r8tk',
  name: 'Chinni',
  showcase: true,
  niche: 'dental',
  district: { ru: 'Ташкент · Яккасарай', uz: 'Toshkent · Yakkasaroy' },
  where: { ru: 'в Яккасарае', uz: 'Yakkasaroydagi' },
  kind: { ru: 'Стоматология', uz: 'stomatologiya' },
  address: { ru: 'Ташкент, Яккасарайский район', uz: 'Toshkent, Yakkasaroy tumani' },
  phones: ['+998 00 000 00 00'],
  mapsUrl: yandexSearch('Ташкент, Яккасарайский район'),
  hours: { ru: 'Пн–Сб 09:00–20:00', uz: 'Du–Sha 09:00–20:00' },
  facts: [],
  hook: 'витрина студии',
  direction: 'chinni',
  directionWhy: 'chinni — фарфор: резец с глазурью и бликом, веер шкалы оттенков (нажал образец — зуб меняет цвет, без JS), кобальтовые волосяные линии. Noto Serif Display + Mulish.',
  langs: ['ru', 'uz'],
  map: { kind: 'street', street: { ru: 'Яккасарай', uz: 'Yakkasaroy' }, house: '—' },
  contactStatus: 'not-contacted',
  channel: 'telegram',
  messageLang: 'ru',
  signaturePitch: {
    ru: 'Пациент выбирает, что беспокоит, и сразу видит ориентир цены, визиты и срок',
    uz: 'Bemor nima bezovta qilayotganini tanlaydi va taxminiy narx, tashriflar va muddatni darhol koʻradi',
  },
  dental: {
    concerns: dentalConcerns({
      whitening: { note: { ru: 'Сначала — профессиональная чистка.', uz: 'Avval — professional tozalash.' } },
    }),
    schedule: { days: [1, 2, 3, 4, 5, 6], open: '09:00', close: '20:00' },
  },
  unverified: ['Витрина студии: бренд, цены, часы и адрес придуманы.'],
})

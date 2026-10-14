import { defineLead } from '@/core/define'
import { yandexSearch } from '@/core/format'
import type { BeautyService } from '@/core/types'

// Витрина студии: бренд вымышленный (поиском не нашёл барбершоп «Ustara»/«Устара» в Ташкенте, 2026-10-14). TODO: проверить носителем — узбекские строки
const svc = (id: string, ru: string, uz: string, minutes: number, price: number, note?: { ru: string; uz: string }): BeautyService => ({ id, name: { ru, uz }, minutes, price, note, example: true })

export default defineLead({
  slug: 'ustara-m4hx',
  name: 'Ustara',
  showcase: true,
  niche: 'beauty',
  district: { ru: 'Ташкент · Мирабад', uz: 'Toshkent · Mirobod' },
  where: { ru: 'в Мирабаде', uz: 'Miroboddagi' },
  kind: { ru: 'Барбершоп', uz: 'barbershop' },
  address: { ru: 'Ташкент, Мирабадский район', uz: 'Toshkent, Mirobod tumani' },
  phones: ['+998 00 000 00 00'],
  mapsUrl: yandexSearch('Ташкент, Мирабадский район'),
  hours: { ru: 'Ежедневно 10:00–22:00', uz: 'Har kuni 10:00–22:00' },
  facts: [],
  hook: 'витрина студии',
  direction: 'ustara',
  directionWhy: 'ustara — опасная бритва раскрывается, название «разрезано» лезвием, полосы барбер-шеста; запись: мастер → услуга → окно; ритуал бритья по шагам. Playfair 2 (узкое, острые засечки) + Inter.',
  langs: ['ru', 'uz'],
  map: { kind: 'street', street: { ru: 'Мирабад', uz: 'Mirobod' }, house: '—' },
  contactStatus: 'not-contacted',
  channel: 'telegram',
  messageLang: 'ru',
  signaturePitch: {
    ru: 'Клиент выбирает мастера и услугу — и сразу видит цену, время и свободные окна',
    uz: 'Mijoz usta va xizmatni tanlaydi — narx, vaqt va boʻsh oynalarni darhol koʻradi',
  },
  beauty: {
    services: [
      svc('haircut', 'Мужская стрижка', 'Erkaklar soch turmagi', 45, 150_000),
      svc('combo', 'Стрижка и борода', 'Soch va soqol', 75, 230_000),
      svc('shave', 'Королевское бритьё', 'Qirollik usulida soqol olish', 45, 160_000, { ru: 'опасной бритвой, горячее полотенце', uz: 'ustara bilan, issiq sochiq' }),
      svc('beard', 'Оформление бороды', 'Soqolni shakllantirish', 30, 100_000),
      svc('kids', 'Детская стрижка', 'Bolalar soch turmagi', 30, 100_000, { ru: 'до 12 лет', uz: '12 yoshgacha' }),
      svc('gray', 'Камуфляж седины', 'Oq sochlarni boʻyash', 30, 120_000),
    ],
    schedule: { days: [0, 1, 2, 3, 4, 5, 6], open: '10:00', close: '22:00', real: false },
    variants: {
      label: { ru: 'Мастер', uz: 'Usta' },
      items: [
        { id: 'aziz', name: { ru: 'Азиз · барбер', uz: 'Aziz · barber' }, k: 1, t: 1 },
        { id: 'temur', name: { ru: 'Темур · топ-барбер', uz: 'Temur · top-barber' }, k: 1.3, t: 1 },
        { id: 'sherzod', name: { ru: 'Шерзод · арт-директор', uz: 'Sherzod · art-direktor' }, k: 1.6, t: 1 },
      ],
    },
  },
  unverified: ['Витрина студии: бренд, мастера, услуги, цены, часы и адрес придуманы.'],
})

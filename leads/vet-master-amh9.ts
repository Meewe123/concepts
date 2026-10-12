import { defineLead } from '@/core/define'
import { mapsUrlFor } from './maps'

export default defineLead({
  slug: 'vet-master-amh9',
  name: 'Vet Master',
  niche: 'vet',
  district: { ru: 'Ташкент', uz: 'Toshkent' },
  where: { ru: 'на Катартале', uz: 'Qatortoldagi' },
  kind: { ru: 'Круглосуточная ветклиника', uz: 'kecha-kunduz ishlaydigan veterinariya klinikasi' },
  address: { ru: 'Ташкент, ул. Катартал', uz: 'Toshkent, Qatortol koʻchasi' },
  phones: ['+998 94 372 95 02', '+998 77 002 04 02'],
  instagram: 'vet_master_24.7',
  telegram: 'Vetmaster7',
  mapsUrl: mapsUrlFor('vet-master-amh9'),
  is24h: true,
  facts: [{ text: { ru: 'Работает круглосуточно', uz: 'Kecha-kunduz ishlaydi' }, source: 'Яндекс Карты', asOf: '2026-10' }],
  hook: 'Vet Master работает круглосуточно, а ночью хозяину больного питомца нужнее всего сайт с телефоном и адресом',
  direction: 'night-vet',
  langs: ['ru'],
  map: { kind: 'street', street: { ru: 'ул. Катартал', uz: 'Qatortol koʻchasi' }, house: '' },
  contactStatus: 'sent',
  statusChangedAt: '2026-10-12',
  channel: 'telegram',
  messageLang: 'ru',
  signaturePitch: {
    ru: 'Ночью первым делом видно, что клиника открыта, сколько сейчас времени и куда звонить — в один тап',
    uz: 'Tunda birinchi navbatda klinika ochiqligi, hozir soat necha ekani va qayerga qoʻngʻiroq qilish — bir bosishda koʻrinadi',
  },
  vet: {
    defaultPet: 'cat',
    services: [
      { id: 'priem', name: { ru: 'Приём днём', uz: 'Kunduzgi qabul' }, price: 100_000, example: true },
      { id: 'noch', name: { ru: 'Приём ночью', uz: 'Tungi qabul' }, price: 150_000, example: true },
      { id: 'vyezd', name: { ru: 'Выезд на дом', uz: 'Uyga chiqish' }, price: 250_000, from: true, example: true },
      { id: 'kompleks', name: { ru: 'Комплексная прививка', uz: 'Kompleks emlash' }, price: 150_000, from: true, example: true },
      { id: 'kapelnica', name: { ru: 'Капельница', uz: 'Tomchi dori' }, price: 120_000, from: true, example: true },
      { id: 'uzi', name: { ru: 'УЗИ', uz: 'UTT' }, price: 160_000, example: true },
      { id: 'steril', name: { ru: 'Стерилизация', uz: 'Sterilizatsiya' }, price: 650_000, from: true, example: true },
    ],
  },
  notes: [
    'Показать: первый экран ночью — «Мы открыты ночью», живые часы Ташкента и звонок в один тап; дальше календарь прививок.',
    'Хук для разговора: работают круглосуточно, а сайта нет — ночью человек ищет клинику в Google и попадает к тем, у кого сайт есть.',
    'Если ответят — спросить: есть ли выезд на дом, сколько стоит ночной приём, кто дежурит в Telegram.',
  ],
})

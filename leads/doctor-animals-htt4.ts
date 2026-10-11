import { defineLead } from '@/core/define'
import { mapsUrlFor } from './maps'

export default defineLead({
  slug: 'doctor-animals-htt4',
  name: 'Doctor & Animals',
  niche: 'vet',
  district: { ru: 'Мирзо-Улугбекский район', uz: 'Mirzo Ulugʻbek tumani' },
  where: { ru: 'на Ялангаче', uz: 'Yalangʻochdagi' },
  kind: { ru: 'Ветклиника и аптека', uz: 'veterinariya klinikasi va dorixona' },
  address: {
    ru: 'Мирзо-Улугбекский район, массив Ялангач, 27А',
    uz: 'Mirzo Ulugʻbek tumani, Yalangʻoch massivi, 27A',
  },
  phones: ['+998 71 263 30 70', '+998 98 126 78 40'],
  instagram: 'doctor_animals',
  mapsUrl: mapsUrlFor('doctor-animals-htt4'),
  facts: [
    {
      text: { ru: 'Больше 700 оценок на Яндекс Картах', uz: 'Yandex Xaritalarda 700 dan ortiq baho' },
      source: 'Яндекс Карты',
      asOf: '2026-10',
    },
  ],
  hook: 'у Doctor & Animals больше 700 оценок на Яндекс Картах, а записаться можно только по телефону',
  direction: 'playful-geometry',
  langs: ['ru'],
  map: {
    kind: 'quarter',
    area: { ru: 'Мирзо-Улугбекский район', uz: 'Mirzo Ulugʻbek tumani' },
    quarter: { ru: 'массив Ялангач', uz: 'Yalangʻoch massivi' },
    number: '27А',
  },
  contactStatus: 'read-silent',
  channel: 'instagram',
  messageLang: 'ru',
  signaturePitch: {
    ru: 'Владелец выбирает кошку или собаку и возраст — и сразу видит график прививок с датами и кнопку записи',
    uz: 'Egasi mushuk yoki itni va yoshini tanlaydi — va sanalari bilan emlash jadvalini hamda yozilish tugmasini darhol koʻradi',
  },
  vet: {
    defaultPet: 'cat',
    pharmacy: true,
    services: [
      { id: 'priem', name: { ru: 'Приём и осмотр', uz: 'Qabul va koʻrik' }, price: 100_000, example: true },
      { id: 'kompleks', name: { ru: 'Комплексная прививка', uz: 'Kompleks emlash' }, price: 150_000, from: true, example: true },
      { id: 'beshenstvo', name: { ru: 'Прививка от бешенства', uz: 'Quturishga qarshi emlash' }, price: 80_000, example: true },
      { id: 'kastr-kot', name: { ru: 'Кастрация кота', uz: 'Mushukni axtalash' }, price: 400_000, from: true, example: true },
      { id: 'steril-koshka', name: { ru: 'Стерилизация кошки', uz: 'Mushukni sterilizatsiya qilish' }, price: 600_000, from: true, example: true },
      { id: 'steril-sobaka', name: { ru: 'Стерилизация собаки', uz: 'Itni sterilizatsiya qilish' }, price: 900_000, from: true, example: true },
      { id: 'uzi', name: { ru: 'УЗИ брюшной полости', uz: 'Qorin boʻshligʻi UTT' }, price: 150_000, example: true },
      { id: 'krov', name: { ru: 'Общий анализ крови', uz: 'Umumiy qon tahlili' }, price: 120_000, example: true },
    ],
  },
  notes: [
    'Показать: календарь прививок — переключатель «Кошка / Собака» и ползунок возраста, питомец «растёт» и перестраивается из фигур.',
    'Хук для разговора: больше 700 оценок, а запись только по телефону — онлайн-запись снимет часть звонков.',
    'Если ответят — спросить: какие услуги и цены показать, кто ведёт Instagram, есть ли аптека с наличием лекарств, нужен ли Telegram-бот для записи.',
  ],
})

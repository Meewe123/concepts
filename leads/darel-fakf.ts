import { defineLead } from '@/core/define'
import { mapsUrlFor } from './maps'

export default defineLead({
  slug: 'darel-fakf',
  name: 'Darel',
  niche: 'vet',
  district: { ru: 'Яшнабадский район', uz: 'Yashnobod tumani' },
  where: { ru: 'в Яшнабаде', uz: 'Yashnoboddagi' },
  address: { ru: 'Яшнабадский район, ул. Насаф, 1/1', uz: 'Yashnobod tumani, Nasaf koʻchasi, 1/1' },
  phones: ['+998 71 268 18 85', '+998 90 929 22 89'],
  instagram: 'darel_uz',
  mapsUrl: mapsUrlFor('darel-fakf'),
  facts: [],
  hook: 'в отзывах о Darel пишут, что не всегда удаётся дозвониться — онлайн-запись снимет часть звонков',
  direction: 'warm-paper',
  langs: ['ru'],
  map: { kind: 'street', street: { ru: 'ул. Насаф', uz: 'Nasaf koʻchasi' }, house: '1/1' },
  contactStatus: 'sent',
  channel: 'instagram',
  messageLang: 'ru',
  signaturePitch: {
    ru: 'Хозяин выбирает кошку или собаку и возраст, видит график прививок с датами и записывается без звонка',
    uz: 'Egasi mushuk yoki itni va yoshini tanlaydi, sanalari bilan emlash jadvalini koʻradi va qoʻngʻiroqsiz yoziladi',
  },
  vet: {
    defaultPet: 'dog',
    services: [
      { id: 'priem', name: { ru: 'Приём и осмотр', uz: 'Qabul va koʻrik' }, price: 90_000, example: true },
      { id: 'kompleks', name: { ru: 'Комплексная прививка', uz: 'Kompleks emlash' }, price: 140_000, from: true, example: true },
      { id: 'beshenstvo', name: { ru: 'Прививка от бешенства', uz: 'Quturishga qarshi emlash' }, price: 70_000, example: true },
      { id: 'chip', name: { ru: 'Чипирование', uz: 'Chip oʻrnatish' }, price: 180_000, example: true },
      { id: 'steril-koshka', name: { ru: 'Стерилизация кошки', uz: 'Mushukni sterilizatsiya qilish' }, price: 550_000, from: true, example: true },
      { id: 'steril-sobaka', name: { ru: 'Стерилизация собаки', uz: 'Itni sterilizatsiya qilish' }, price: 850_000, from: true, example: true },
      { id: 'uzi', name: { ru: 'УЗИ', uz: 'UTT' }, price: 140_000, example: true },
      { id: 'krov', name: { ru: 'Анализ крови', uz: 'Qon tahlili' }, price: 110_000, example: true },
    ],
  },
  notes: [
    'Показать: календарь прививок — питомцы нарисованы линией и «перерисовываются» при переключении; запись без звонка.',
    'Хук для разговора: в отзывах жалуются, что не дозвониться — заявки с сайта приходят администратору в Telegram, линия разгружается.',
    'Если ответят — спросить: сколько звонков в день, кто принимает запись, какие услуги и цены показать.',
  ],
})

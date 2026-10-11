import { defineLead } from '@/core/define'
import { mapsUrlFor } from './maps'

export default defineLead({
  slug: 'zoocenter-nm5u',
  name: 'Зооцентр',
  messageName: { ru: 'Зооцентра', uz: 'Zootsentr' },
  niche: 'vet',
  district: { ru: 'Ташкент', uz: 'Toshkent' },
  // TODO: проверить носителем узбекское написание улицы Сарыкуль
  where: { ru: 'на улице Сарыкуль', uz: 'Sariqoʻl koʻchasidagi' },
  kind: { ru: 'Ветклиника и зоомагазин', uz: 'veterinariya klinikasi va zoodoʻkon' },
  address: { ru: 'Ташкент, ул. Сарыкуль, 9', uz: 'Toshkent, Sariqoʻl koʻchasi, 9' },
  phones: ['+998 71 283 81 08', '+998 97 430 89 44'],
  instagram: 'zoocenter.vet',
  mapsUrl: mapsUrlFor('zoocenter-nm5u'),
  facts: [],
  hook: 'у Зооцентра в карточке на Яндекс Картах шесть телефонов, но нет сайта и онлайн-записи',
  direction: 'market-fresh',
  langs: ['ru'],
  map: { kind: 'street', street: { ru: 'ул. Сарыкуль', uz: 'Sariqoʻl koʻchasi' }, house: '9' },
  contactStatus: 'not-contacted',
  channel: 'instagram',
  messageLang: 'ru',
  signaturePitch: {
    ru: 'Хозяин выбирает питомца и возраст и видит график прививок, а рядом — что купить к прививке в вашем магазине',
    uz: 'Egasi hayvonini va yoshini tanlaydi, emlash jadvalini va uning yonida doʻkoningizdan emlashga nima olish kerakligini koʻradi',
  },
  vet: {
    defaultPet: 'dog',
    shop: true,
    services: [
      { id: 'priem', name: { ru: 'Приём и осмотр', uz: 'Qabul va koʻrik' }, price: 100_000, example: true },
      { id: 'kompleks', name: { ru: 'Комплексная прививка', uz: 'Kompleks emlash' }, price: 160_000, from: true, example: true },
      { id: 'beshenstvo', name: { ru: 'Прививка от бешенства', uz: 'Quturishga qarshi emlash' }, price: 80_000, example: true },
      { id: 'steril', name: { ru: 'Стерилизация', uz: 'Sterilizatsiya' }, price: 600_000, from: true, example: true },
      { id: 'uzi', name: { ru: 'УЗИ', uz: 'UTT' }, price: 150_000, example: true },
      { id: 'krov', name: { ru: 'Анализы', uz: 'Tahlillar' }, price: 120_000, from: true, example: true },
    ],
    shopItems: [
      { id: 'blohi', name: { ru: 'Капли от блох и клещей', uz: 'Burga va kanaga qarshi tomchilar' }, price: 60_000, from: true, example: true },
      { id: 'glisty', name: { ru: 'Таблетки от глистов', uz: 'Gijjaga qarshi tabletkalar' }, price: 35_000, from: true, example: true },
      { id: 'perenoska', name: { ru: 'Переноска', uz: 'Tashuvchi quti' }, price: 180_000, from: true, example: true },
      { id: 'lakomstvo', name: { ru: 'Лакомство после прививки', uz: 'Emlashdan keyin shirinlik' }, price: 25_000, from: true, example: true },
      { id: 'korm', name: { ru: 'Корм для щенков и котят', uz: 'Kuchuk va mushukchalar uchun yem' }, price: 120_000, from: true, example: true },
    ],
  },
  notes: [
    'Показать: календарь прививок и блок «К прививке пригодится» — товары магазина ценниками рядом с графиком.',
    'Хук для разговора: шесть телефонов в карточке, но нет сайта и онлайн-записи — заявки с сайта приходят в одно место.',
    'Если ответят — спросить: какие товары и цены показать, нужна ли витрина магазина, кто принимает звонки.',
  ],
})

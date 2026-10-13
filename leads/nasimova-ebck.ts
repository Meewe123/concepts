import { defineLead } from '@/core/define'
import { dentalConcerns } from '@/niches/dental/content'
import { mapsUrlFor } from './maps'

export default defineLead({
  slug: 'nasimova-ebck',
  name: 'Nasimov Dentistry',
  niche: 'dental',
  district: { ru: 'Ташкент · два филиала', uz: 'Toshkent · ikki filial' },
  where: { ru: 'в Ташкенте', uz: 'Toshkentdagi' },
  kind: { ru: 'Стоматология и ортодонтия', uz: 'stomatologiya va ortodontiya' },
  address: { ru: 'Ташкент, ул. Фирдавсий, 21А', uz: 'Toshkent, Firdavsiy koʻchasi, 21A' },
  phones: ['+998 97 158 11 11'],
  instagram: 'nasimov.dentistry',
  mapsUrl: mapsUrlFor('nasimova-ebck'),
  facts: [],
  hook: 'два филиала и около 12 тысяч подписчиков, а сайта нет — цену брекетов и рассрочку приходится спрашивать в директе',
  direction: 'editorial-smile',
  directionWhy:
    'editorial-smile — главное у клиники ортодонтия (при ней с 2018 года работает Nasimov World): ряд капсул стоит вкривь и выстраивается в линию — «Ровно.» без фото зубов. Журнальный Spectral с Onest и коралл на кремовом отличают её от «бланка» Denta и «семьи» Iroda.',
  langs: ['ru', 'uz'],
  map: { kind: 'street', street: { ru: 'ул. Фирдавсий', uz: 'Firdavsiy koʻchasi' }, house: '21А' },
  contactStatus: 'unread',
  channel: 'instagram',
  messageLang: 'ru',
  signaturePitch: {
    ru: 'Пациент нажимает «Брекеты» и до визита видит ориентир цены, срок и платёж в месяц при рассрочке на 6 или 12 месяцев',
    uz: 'Bemor «Breketlar»ni bosadi va tashrifgacha taxminiy narx, muddat va 6 yoki 12 oylik toʻlovni koʻradi',
  },
  pitchText: {
    ru: 'Дополню своё сообщение выше — сделал концепт сайта Nasimov Dentistry: {link}. Нажмите «Брекеты»: человек ещё до визита видит ориентир цены, срок лечения и платёж в месяц при рассрочке на 6 или 12 месяцев. Посмотрите с телефона; если заинтересует — напишите.',
    // TODO: проверить носителем
    uz: 'Yuqoridagi xabarimga qoʻshimcha — Nasimov Dentistry uchun sayt konseptini tayyorladim: {link}. «Breketlar»ni bosing: odam tashrifdan oldin taxminiy narx, davolanish muddati va 6 yoki 12 oylik boʻlib toʻlashda oylik toʻlovni koʻradi. Telefondan koʻring; qiziqtirsa — yozing.',
  },
  dental: {
    concerns: dentalConcerns({
      braces: {
        note: {
          ru: 'Цена зависит от системы брекетов и сложности случая — точную назовёт ортодонт после осмотра.',
          uz: 'Narx breket tizimi va holatning murakkabligiga bogʻliq — aniq narxni ortodont koʻrikdan soʻng aytadi.',
        },
      },
    }),
    branches: [
      { id: 'firdavsiy', name: { ru: 'Фирдавсий', uz: 'Firdavsiy' }, address: { ru: 'Ташкент, ул. Фирдавсий, 21А', uz: 'Toshkent, Firdavsiy koʻchasi, 21A' } },
      { id: 'nest-one', name: { ru: 'Nest One', uz: 'Nest One' }, address: { ru: 'Ташкент, Tashkent City, комплекс Nest One', uz: 'Toshkent, Tashkent City, Nest One majmuasi' } },
    ],
  },
  sources: [
    {
      what: 'NASIMOV WORLD основана в 2018 году на базе Nasimov Dentistry: инструменты, материалы и системы для ортодонтов Узбекистана; адрес Firdavsiy 21A',
      url: 'https://ohi-s.com/company/nasimov-world/',
      checked: '2026-10-13, по выдаче веб-поиска',
    },
    { what: 'NASIMOV WORLD — организатор семинаров для стоматологов', url: 'https://ohi-s.com/seminar/176676/', checked: '2026-10-13, по выдаче веб-поиска' },
    { what: 'Nest One — башня на 4-м лоте Tashkent City', url: 'https://en.wikipedia.org/wiki/Nest_One', checked: '2026-10-13, по выдаче веб-поиска' },
    {
      what: 'Ул. Фирдавсий, 21А + филиал в Nest One, телефон +998 97 158 11 11, Instagram @nasimov.dentistry (≈12 тыс.), сайта нет',
      checked: 'таблица заказчика, 10.2026',
    },
  ],
  unverified: [
    'Филиал в Nest One и телефон +998 97 158 11 11 — из таблицы заказчика; веб-поиск их не подтвердил и не опроверг. Этаж и вход в Nest One неизвестны — на сайте только «комплекс Nest One».',
    'Ул. Фирдавсий, 21А подтверждена только для NASIMOV WORLD (ohi-s.com), не для самой клиники.',
    'На ohi-s.com указан другой телефон NASIMOV WORLD: +998 99 879 54 80 — на сайт не вынесен.',
    'Врач-ортодонт по фамилии Насимова в поиске не найден — имён врачей на сайте нет.',
    'График работы не найден — на сайте «уточняйте по телефону».',
    'Все цены, визиты, сроки и рассрочка — пример.',
  ],
  notes: [
    'Показать: «Брекеты» в списке «Что вас беспокоит?» — срок, визиты и платёж в месяц на 6/12; в записи выбор филиала.',
    'Хук для разговора (если спросят, зачем сайт): два филиала и ~12 тыс. подписчиков, а цену брекетов и рассрочку спрашивают в директе.',
    'Если ответят — спросить: какие системы брекетов и цены можно показать, этаж в Nest One, график филиалов, есть ли рассрочка.',
  ],
})

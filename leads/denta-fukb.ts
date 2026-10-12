import { defineLead } from '@/core/define'
import { dentalConcerns } from '@/niches/dental/content'
import { mapsUrlFor } from './maps'

export default defineLead({
  slug: 'denta-fukb',
  name: 'Denta',
  niche: 'dental',
  district: { ru: 'Ташкент · м. Минор', uz: 'Toshkent · Minor metrosi' },
  where: { ru: 'напротив метро Минор', uz: 'Minor metrosi qarshisidagi' },
  address: { ru: 'Ташкент, массив Киёт, 51', uz: 'Toshkent, Qiyot massivi, 51' },
  landmark: { ru: 'Напротив метро Минор, за остановкой, на первой линии', uz: 'Minor metrosi qarshisida, bekat orqasida, birinchi qatorda' },
  phones: ['+998 90 024 04 20'],
  instagram: 'denta_stomatologiya',
  mapsUrl: mapsUrlFor('denta-fukb'),
  hours: { ru: 'До 20:00 · дни работы уточняйте по телефону', uz: '20:00 gacha · ish kunlarini telefon orqali aniqlang' },
  facts: [],
  hook: 'около 25 тысяч подписчиков, а цены вроде чистки за 300 000 сум видны только в карточке на картах',
  direction: 'clinical-silk',
  directionWhy: 'clinical-silk — клиника у метро Минор с ценами в карточке: точная «бланковая» сетка и цифры Plex Mono делают цены главным, а белый с ледяным голубым читается как чистый кабинет.',
  langs: ['ru', 'uz'],
  map: {
    kind: 'quarter',
    area: { ru: 'м. Минор', uz: 'Minor metrosi' },
    quarter: { ru: 'массив Киёт', uz: 'Qiyot massivi' },
    number: '51',
  },
  contactStatus: 'read-silent',
  channel: 'instagram',
  messageLang: 'ru',
  signaturePitch: {
    ru: 'Пациент выбирает, что беспокоит, и сразу видит ориентир цены, число визитов и срок, а у брекетов и имплантов — платёж в месяц',
    uz: 'Bemor nima bezovta qilayotganini tanlaydi va taxminiy narx, tashriflar soni va muddatni darhol koʻradi',
  },
  pitchText: {
    ru: 'Дополню своё сообщение выше — сделал концепт сайта Denta: {link}. Нажмите «Чистка и гигиена» — там ваша цена из карточки на картах, 300 000 сум. Посмотрите с телефона; если заинтересует — напишите.',
    // TODO: проверить носителем
    uz: 'Yuqoridagi xabarimga qoʻshimcha — Denta uchun sayt konseptini tayyorladim: {link}. «Tozalash va gigiyena»ni bosing — Yandex Xaritalardagi narxingiz, 300 000 soʻm, shu yerda turibdi. Telefondan koʻring; qiziqtirsa — yozing.',
  },
  dental: {
    concerns: dentalConcerns({
      hygiene: {
        price: { from: 300_000, to: 300_000 },
        note: {
          ru: 'Профессиональная чистка — 300 000 сум по карточке клиники на Яндекс Картах. Уточняйте у администратора.',
          uz: 'Professional tozalash — klinikaning Yandex Xaritalardagi sahifasiga koʻra 300 000 soʻm. Administratordan aniqlang.',
        },
      },
      braces: {
        note: {
          ru: 'В карточке клиники — скидка 50% на установку брекетов. Условия уточняйте.',
          uz: 'Klinika sahifasida — breket qoʻyishga 50% chegirma. Shartlarini aniqlang.',
        },
      },
    }),
    promos: [
      {
        big: { ru: '300 000 сум', uz: '300 000 soʻm' },
        text: { ru: 'Профессиональная чистка', uz: 'Professional tozalash' },
        source: 'Яндекс Карты',
        asOf: '2026-10',
      },
      {
        big: { ru: '−50%', uz: '−50%' },
        text: { ru: 'На установку брекетов', uz: 'Breket qoʻyishga chegirma' },
        source: 'Яндекс Карты',
        asOf: '2026-10',
      },
    ],
  },
  sources: [
    {
      what: 'Адрес «Qiyot massivi, 51», ориентир «напротив метро Минор, за остановкой, на первой линии», телефон +998 90 024 04 20, «открыто до 20:00»',
      url: 'https://yandex.com/maps/org/denta/5867957547/',
      checked: '2026-10-12, по выдаче веб-поиска (саму карточку из контейнера не открыть)',
    },
    {
      what: 'График Пн–Пт 09:00–20:00, Сб–Вс выходной; адрес указан как пр. Амира Темура у м. Минор — карточка 2024 года, расходится с Яндексом, на сайт не вынесено',
      url: 'https://www.goldenpages.uz/company/?Id=42760',
      checked: '2026-10-12, по выдаче веб-поиска',
    },
    { what: 'Instagram @denta_stomatologiya (≈25 тыс.), чистка 300 000 сум и скидка 50% на брекеты в карточке', checked: 'таблица заказчика, 10.2026' },
  ],
  unverified: [
    'Дни работы: Яндекс показывает «до 20:00», Golden Pages (2024) — Пн–Пт 09:00–20:00. На сайте — «до 20:00 · дни уточняйте».',
    'Чистка 300 000 сум и скидка 50% на установку брекетов — из таблицы заказчика, мной не перепроверено (на сайте с пометкой «уточнить»).',
    'Telegram клиники не найден — кнопки Telegram на сайте нет.',
    'Все вилки цен, число визитов и сроки, кроме цены чистки, — пример.',
  ],
  notes: [
    'Показать: «Что вас беспокоит?» → «Чистка и гигиена» (их цена 300 000 сум) и «Брекеты» с рассрочкой на 12 мес. — ссылка с выбором: …/c/denta-fukb#braces-12.',
    'Хук для разговора: цены уже есть в карточке на картах — на сайте они рядом с кнопкой записи.',
    'Если ответят — спросить: какие цены можно показать, есть ли рассрочка и на каких условиях, кто принимает заявки.',
  ],
})

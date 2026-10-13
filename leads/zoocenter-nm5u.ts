import { defineLead } from '@/core/define'
import type { L10n, ShopItem } from '@/core/types'
import { mapsUrlFor } from './maps'

const item = (id: string, ru: string, uz: string, price: number, size?: L10n): ShopItem => ({ id, name: { ru, uz }, price, from: true, size, example: true })
// TODO: проверить носителем — узбекские названия товаров
const PEST = {
  dropsName: { ru: 'Капли на холку', uz: 'Yelkaga tomchilar' },
  tabletName: { ru: 'Жевательная таблетка', uz: 'Chaynaladigan tabletka' },
  collarName: { ru: 'Ошейник', uz: 'Boʻyinbogʻ' },
  dropsNote: { ru: 'От блох и клещей. Как часто — по инструкции.', uz: 'Burga va kanaga qarshi. Qanchalik tez-tez — yoʻriqnoma boʻyicha.' },
  tabletNote: { ru: 'От блох и клещей. Срок защиты — на упаковке.', uz: 'Burga va kanaga qarshi. Himoya muddati — qadoqda.' },
  collarNote: { ru: 'От блох и клещей. Сколько носить — на упаковке.', uz: 'Burga va kanaga qarshi. Qancha taqish — qadoqda.' },
}

export default defineLead({
  slug: 'zoocenter-nm5u',
  name: 'Зооцентр',
  messageName: { ru: 'Зооцентра', uz: 'Zootsentr' },
  niche: 'petshop',
  district: { ru: 'Ташкент', uz: 'Toshkent' },
  // TODO: проверить носителем узбекское написание улицы Сарыкуль
  where: { ru: 'на Сарыкульской', uz: 'Sariqoʻl koʻchasidagi' },
  kind: { ru: 'Зоомагазин при ветклинике', uz: 'veterinariya klinikasi qoshidagi zoodoʻkon' },
  address: { ru: 'Ташкент, Сарыкульская улица, 9', uz: 'Toshkent, Sariqoʻl koʻchasi, 9' },
  phones: ['+998 71 283 81 08', '+998 97 430 89 44'],
  instagram: 'zoocenter.vet',
  mapsUrl: mapsUrlFor('zoocenter-nm5u'),
  hours: { ru: 'Пн–Сб 10:00–20:00, Вс 11:00–16:00', uz: 'Du–Sh 10:00–20:00, Ya 11:00–16:00' },
  facts: [],
  hook: 'у Зооцентра в карточке на Яндекс Картах шесть телефонов, но нет сайта, где видно товары и цены',
  direction: 'zoo-scales',
  directionWhy:
    'zoo-scales — это ветшоп, а не клиника: главное — подобрать средство и купить. Метафора — напольные весы: стрелка и питомец на площадке следуют за ползунком веса, средства от блох — жёлтые ценники на рейке. Comfortaa + Fira Sans, аптечный зелёный и жёлтый ценник; прежний market-fresh с календарём прививок снят.',
  langs: ['ru', 'uz'],
  map: { kind: 'street', street: { ru: 'Сарыкульская', uz: 'Sariqoʻl' }, house: '9' },
  contactStatus: 'not-contacted',
  channel: 'instagram',
  messageLang: 'ru',
  signaturePitch: {
    ru: 'Покупатель выбирает собаку или кошку, сдвигает вес — и сразу видит средства от блох и клещей для своей весовой группы и цену',
    uz: 'Xaridor it yoki mushukni tanlaydi, vaznni suradi — va oʻz vazn guruhi uchun burga va kanaga qarshi vositalarni narxi bilan koʻradi',
  },
  pitchText: {
    ru: 'Здравствуйте! Сделал концепт сайта для Зооцентра: {link}. Покупатель выбирает собаку или кошку, сдвигает вес — и сразу видит средства от блох и клещей для своей весовой группы и цену. Посмотрите с телефона; если заинтересует — напишите.',
    // TODO: проверить носителем
    uz: 'Assalomu alaykum! Zootsentr uchun sayt konseptini tayyorladim: {link}. Xaridor it yoki mushukni tanlaydi, vaznni suradi — va oʻz vazn guruhi uchun burga va kanaga qarshi vositalarni narxi bilan darhol koʻradi. Telefondan koʻring; qiziqtirsa — yozing.',
  },
  petshop: {
    vet: true,
    delivery: true,
    parasites: {
      dog: {
        bands: [4, 10, 20, 40, 60],
        start: 12,
        forms: [
          { id: 'drops', name: PEST.dropsName, note: PEST.dropsNote, prices: [45_000, 55_000, 65_000, 80_000, 95_000], example: true },
          { id: 'tablet', name: PEST.tabletName, note: PEST.tabletNote, prices: [120_000, 140_000, 170_000, 210_000, 250_000], example: true },
          { id: 'collar', name: PEST.collarName, note: PEST.collarNote, prices: [90_000, 95_000, 110_000, 125_000, 140_000], example: true },
        ],
      },
      cat: {
        bands: [2, 4, 8, 12],
        start: 4.5,
        forms: [
          { id: 'drops', name: PEST.dropsName, note: PEST.dropsNote, prices: [38_000, 42_000, 52_000, 60_000], example: true },
          { id: 'tablet', name: PEST.tabletName, note: PEST.tabletNote, prices: [85_000, 95_000, 115_000, 130_000], example: true },
          { id: 'collar', name: PEST.collarName, note: PEST.collarNote, prices: [80_000, 80_000, 85_000, 85_000], example: true },
        ],
      },
    },
    catalog: [
      {
        id: 'korm',
        name: { ru: 'Корм', uz: 'Yem' },
        items: [
          item('korm-dog', 'Сухой корм для собак', 'Itlar uchun quruq yem', 120_000, { ru: '3 кг', uz: '3 kg' }),
          item('korm-cat', 'Сухой корм для кошек', 'Mushuklar uchun quruq yem', 75_000, { ru: '1,5 кг', uz: '1,5 kg' }),
          item('korm-wet', 'Влажный корм, пауч', 'Hoʻl yem, pauch', 9_000, { ru: '85 г', uz: '85 g' }),
          item('korm-baby', 'Корм для щенков и котят', 'Kuchuk va mushukchalar uchun yem', 60_000, { ru: '1 кг', uz: '1 kg' }),
        ],
      },
      {
        id: 'tualet',
        name: { ru: 'Лоток и наполнители', uz: 'Lotok va toʻldirgichlar' },
        items: [
          item('nap-clump', 'Комкующийся наполнитель', 'Kesaklanadigan toʻldirgich', 55_000, { ru: '5 л', uz: '5 l' }),
          item('nap-wood', 'Древесный наполнитель', 'Yogʻoch toʻldirgich', 40_000, { ru: '10 л', uz: '10 l' }),
          item('lotok', 'Лоток с высоким бортиком', 'Baland chetli lotok', 70_000),
        ],
      },
      {
        id: 'lakomstva',
        name: { ru: 'Лакомства', uz: 'Shirinliklar' },
        items: [
          item('lak-sticks', 'Жевательные палочки', 'Chaynaladigan tayoqchalar', 25_000, { ru: '10 шт.', uz: '10 dona' }),
          item('lak-cat', 'Лакомство для кошек', 'Mushuklar uchun shirinlik', 18_000, { ru: '60 г', uz: '60 g' }),
          item('lak-bone', 'Косточка из жил', 'Paydan suyakcha', 15_000),
        ],
      },
      {
        id: 'dom',
        name: { ru: 'Дом и прогулка', uz: 'Uy va sayr' },
        items: [
          item('perenoska', 'Переноска', 'Tashuvchi quti', 180_000),
          item('shleyka', 'Шлейка с поводком', 'Shleyka va tasma', 95_000),
          item('miska', 'Миска нескользящая', 'Sirpanmaydigan idish', 35_000),
          item('kogtetochka', 'Когтеточка', 'Tirnoq qayragich', 85_000),
        ],
      },
    ],
  },
  sources: [
    { what: 'Zoocenter — ветеринарная клиника, Сарыкульская улица, 9', url: 'https://2gis.uz/tashkent/firm/70000001037031039', checked: '2026-10-13, по выдаче веб-поиска' },
    { what: '«Зооцентр-Саракулька» в выдаче 2ГИС «Зоотовары с доставкой» — магазин зоотоваров с доставкой', url: 'https://2gis.uz/tashkent/search/Зоотовары%20с%20доставкой', checked: '2026-10-13, по выдаче веб-поиска' },
    { what: 'Карточка «Зооцентр» в Яндекс Картах — рубрика «зоомагазин», отзывы о приёме у ветеринара', url: 'https://yandex.uz/maps/org/zootsentr/10373306834/', checked: '2026-10-13, по выдаче веб-поиска' },
    { what: 'График: пн–сб 10:00–20:00, вс 11:00–16:00', url: 'https://veterinarnye-kliniki.com/vetkliniki-tashkent-vetkliniki-tashkent-2/zootsentr-sarakulka-tashkent', checked: '2026-10-13, по выдаче веб-поиска' },
    { what: 'Отзыв: «работает с десяти утра», в интернете часто указано с девяти', url: 'https://irecommend.ru/content/zootsentr-na-sarakulskoi-obektivnyi-otzyv-pro-odnu-iz-samykh-populyarnykh-klinik-v-gorode-pr', checked: '2026-10-13, по выдаче веб-поиска' },
    { what: 'Телефоны +998 71 283 81 08 и +998 97 430 89 44, Instagram @zoocenter.vet, «шесть телефонов в карточке»; «это ветшоп»', checked: 'таблица и слова заказчика, 10.2026' },
  ],
  unverified: [
    'График (Пн–Сб 10:00–20:00, Вс 11:00–16:00) — из одного справочника; на сайте с пометкой «по справочнику, уточняйте».',
    'По выдаче поиска в карточке Яндекса на Сарыкульской указан ещё +998 99 789 11 99; номер +998 97 430 89 44 есть и у Зооцентра в Сергели (вероятно, сеть) — на сайте номера из таблицы заказчика.',
    'Instagram @zoocenter.vet — из таблицы заказчика, поиском не найден.',
    'Условия доставки неизвестны — на сайте «Доставка — уточняйте».',
    'Ассортимент, весовые группы и все цены — пример, без брендов; реальный прайс и линейки средств — у магазина.',
  ],
  notes: [
    'Показать: «От блох и клещей — по весу» — выбрать собаку или кошку и сдвинуть вес; стрелка весов наверху и питомец на площадке двигаются вместе с ползунком, ценники качаются при смене весовой группы. «Отложить» — ценник летит в пакет.',
    'Хук для разговора: шесть телефонов в карточке, но нет сайта, где видно товары и цены; заказ «отложить к приходу» приходит продавцу в Telegram.',
    'Если ответят — спросить: какие средства и бренды держат (линейки по весу), реальные цены, есть ли доставка и на каких условиях, кто ведёт Instagram.',
  ],
})

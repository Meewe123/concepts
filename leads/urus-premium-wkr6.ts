import { defineLead } from '@/core/define'
import { mapsUrlFor } from './maps'

export default defineLead({
  slug: 'urus-premium-wkr6',
  name: 'Urus Premium',
  niche: 'auto',
  district: { ru: 'Ташкент · Юнусабад', uz: 'Toshkent · Yunusobod' },
  where: { ru: 'в Юнусабаде', uz: 'Yunusoboddagi' },
  kind: { ru: 'Автомойка', uz: 'avtomoyka' },
  // TODO: проверить носителем узбекское написание улицы
  address: { ru: 'Ташкент, Юнусабадский район, ул. Ниёзбек йули, 29-5', uz: 'Toshkent, Yunusobod tumani, Niyozbek yoʻli, 29-5' },
  phones: ['+998 99 850 50 00'],
  instagram: 'urus_uzb',
  mapsUrl: mapsUrlFor('urus-premium-wkr6'),
  facts: [],
  hook: 'в часы пик к вам приходится ждать; если видно загрузку и можно записаться на время, очередь рассасывается',
  direction: 'showroom-chrome',
  directionWhy:
    'showroom-chrome — «премиум» в названии и очередь в часы пик: тёмный шоурум, хромированное URUS и сцена мойки (арка проходит — кузов становится глянцевым). Сигнатура — «готово к…» с учётом очереди и тихие часы. Exo 2 курсивом + Onest; Tektur уже у Brookland, Unbounded — у нескольких направлений.',
  langs: ['ru', 'uz'],
  map: { kind: 'street', street: { ru: 'Ниёзбек йули', uz: 'Niyozbek yoʻli' }, house: '29-5' },
  contactStatus: 'not-contacted',
  channel: 'instagram',
  messageLang: 'ru',
  signaturePitch: {
    ru: 'Клиент выбирает машину и услуги — и сразу видит цену и к какому времени машина будет готова с учётом очереди',
    uz: 'Mijoz mashina va xizmatlarni tanlaydi — narxni va navbatni hisobga olib mashina qachon tayyor boʻlishini darhol koʻradi',
  },
  pitchText: {
    ru: 'Здравствуйте! Сделал концепт сайта для Urus Premium: {link}. Клиент выбирает машину и услуги — и сразу видит цену и к какому времени машина будет готова с учётом очереди. Посмотрите с телефона; если заинтересует — напишите.',
    // TODO: проверить носителем
    uz: 'Assalomu alaykum! Urus Premium uchun sayt konseptini tayyorladim: {link}. Mijoz mashina va xizmatlarni tanlaydi — narxni va navbatni hisobga olib mashina qachon tayyor boʻlishini darhol koʻradi. Telefondan koʻring; qiziqtirsa — yozing.',
  },
  auto: {
    classes: [
      { id: 'sedan', name: { ru: 'Седан', uz: 'Sedan' }, k: 1, t: 1 },
      { id: 'crossover', name: { ru: 'Кроссовер', uz: 'Krossover' }, k: 1.2, t: 1.15 },
      { id: 'suv', name: { ru: 'Внедорожник', uz: 'Yoʻltanlamas' }, k: 1.4, t: 1.3 },
      { id: 'minivan', name: { ru: 'Минивэн', uz: 'Miniven' }, k: 1.5, t: 1.35 },
    ],
    services: [
      { id: 'wash', name: { ru: 'Бесконтактная мойка', uz: 'Kontaktsiz yuvish' }, price: 60_000, minutes: 30, example: true },
      { id: 'interior', name: { ru: 'Химчистка салона', uz: 'Salonni kimyoviy tozalash' }, price: 350_000, minutes: 180, example: true },
      { id: 'engine', name: { ru: 'Мойка двигателя', uz: 'Dvigatelni yuvish' }, price: 80_000, minutes: 30, example: true },
      { id: 'polish', name: { ru: 'Полировка кузова', uz: 'Kuzovni sayqallash' }, price: 600_000, minutes: 240, example: true },
    ],
    // 08:00–22:00, час за часом: утро и обед тише, пик после 18:00 (пример)
    load: [0.2, 0.35, 0.3, 0.25, 0.4, 0.5, 0.45, 0.35, 0.4, 0.6, 0.85, 0.95, 0.8, 0.5],
    schedule: { days: [0, 1, 2, 3, 4, 5, 6], open: '08:00', close: '22:00', real: false },
    maxWait: 60,
    lounge: true,
  },
  sources: [
    {
      what: 'Urus premium — автомойка, Ниёзбек Йули, Юнусабадский район; бесконтактная мойка, химчистка салона, мойка двигателя, полировка кузова; зона ожидания и кафе; «2 филиала»',
      url: 'https://2gis.uz/tashkent/search/Urus%20premium',
      checked: '2026-10-13, по выдаче веб-поиска',
    },
    { what: 'Urus Premium в Яндекс Картах (Карасу-6, Мирзо-Улугбекский район): до 22:00, +998 50 221 22 22, 4,4 по 51 оценке', url: 'https://yandex.com/web-maps/org/urus_premium/94848038542/', checked: '2026-10-13, по выдаче веб-поиска' },
    { what: 'Ниёзбек йули, 29-5; +998 99 850 50 00; Instagram @urus_uzb; «в часы пик долгое ожидание, есть отдельное демо очереди»', checked: 'таблица заказчика, 10.2026' },
  ],
  unverified: [
    'Номер дома: в таблице заказчика 29-5, в 2ГИС — 31. На сайте — 29-5 (карточка из таблицы).',
    'Второй филиал (Карасу-6, +998 50 221 22 22, до 22:00) — из выдачи Яндекса; связь с Ниёзбек йули не проверена, на сайт не вынесен.',
    'Часы работы на Ниёзбек йули не найдены — на сайте «уточняйте»; окна записи считаются по примерному графику 08:00–22:00.',
    'Instagram @urus_uzb — из таблицы заказчика (найден через Google), поиском не подтверждён.',
    'Все цены, время услуг, множители классов и загрузка по часам — пример.',
  ],
  notes: [
    'Показать: «Цена и время — до приезда» — выбрать класс и услуги: цена, время, полоса программы мойки и «если приехать сейчас — готово к…» с учётом очереди; ниже — загрузка по часам и тихие часы.',
    'Когда заказчик даст ссылку на отдельное демо очереди — поставить её на кнопку рядом со строкой «Сейчас: … в очереди».',
    'Если ответят — спросить: реальный прайс по классам, график, сколько постов, кто принимает записи.',
  ],
})

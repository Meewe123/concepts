import { defineLead } from '@/core/define'
import { dentalConcerns } from '@/niches/dental/content'
import { mapsUrlFor } from './maps'

export default defineLead({
  slug: 'iroda-vxww',
  name: 'Iroda',
  niche: 'dental',
  district: { ru: 'Ташкент · Юнусабад', uz: 'Toshkent · Yunusobod' },
  where: { ru: 'в Юнусабаде', uz: 'Yunusoboddagi' },
  kind: { ru: 'Семейная стоматология', uz: 'oilaviy stomatologiya' },
  address: { ru: 'Ташкент, Юнусабад, 8-й квартал, 2А', uz: 'Toshkent, Yunusobod, 8-mavze, 2A' },
  phones: ['+998 95 145 05 02', '+998 71 231 05 02'],
  instagram: 'iroda_stom',
  telegram: 'irodastom',
  mapsUrl: mapsUrlFor('iroda-vxww'),
  facts: [],
  hook: 'ссылка www из карточки на картах открывается с ошибкой HTTPS — браузер пугает пациентов предупреждением',
  direction: 'family-warm',
  directionWhy:
    'family-warm — в названии «oilaviy» (семейная), и детский приём указан в каталоге: тёплый песок, мягкий зелёный и округлый Nunito говорят с родителями, а не с «клиникой». Literata + Ysabeau из библиотеки уже у Darel, поэтому здесь один Nunito.',
  langs: ['ru', 'uz'],
  map: {
    kind: 'quarter',
    area: { ru: 'Юнусабад', uz: 'Yunusobod' },
    quarter: { ru: '8-й квартал', uz: '8-mavze' },
    number: '2А',
  },
  contactStatus: 'not-contacted',
  channel: 'telegram',
  messageLang: 'ru',
  signaturePitch: {
    ru: 'Пациент выбирает, что беспокоит, и видит ориентир цены, а при записи отмечает, кого ведёт: себя, ребёнка или всю семью',
    uz: 'Bemor nima bezovta qilayotganini tanlaydi va taxminiy narxni koʻradi, yozilishda esa kimni olib kelishini belgilaydi',
  },
  pitchText: {
    ru: 'Здравствуйте! Сделал концепт сайта для семейной стоматологии Iroda: {link}. Пациент выбирает, что беспокоит, и сразу видит ориентир цены, а при записи отмечает, кого ведёт: себя, ребёнка или всю семью. Посмотрите с телефона; если заинтересует — напишите.',
    // TODO: проверить носителем
    uz: 'Assalomu alaykum! Iroda oilaviy stomatologiyasi uchun sayt konseptini tayyorladim: {link}. Bemor nima bezovta qilayotganini tanlaydi va taxminiy narxni darhol koʻradi, yozilishda esa kimni olib kelishini belgilaydi: oʻzini, farzandini yoki butun oilani. Telefondan koʻring; qiziqtirsa — yozing.',
  },
  dental: { concerns: dentalConcerns(), kids: true },
  sources: [
    { what: 'Название «Iroda oilaviy stomatologiya» (семейная стоматология)', url: 'https://yandex.uz/maps/org/iroda_oilaviy_stomatologiya/235489300996/', checked: 'ссылка от заказчика, 10.2026' },
    {
      what: 'Юнусабад, 8-й квартал, дом 2А; в услугах — детская стоматология, ортодонтия, импланты',
      url: 'https://www.goldenpages.uz/en/company/?Id=88094',
      checked: '2026-10-12, по выдаче веб-поиска',
    },
    { what: 'Сайт iroda-stom.uz, e-mail iroda-stom@mail.ru, ООО «Ulkan Baraka»', url: 'https://www.yellowpages.uz/uz/korxona/iroda-oilaviy-stomatologiya', checked: '2026-10-12, по выдаче веб-поиска' },
    { what: 'Рейтинг 4,1 и 79 отзывов, адрес «8-mavze, 2a1» (на сайт не вынесено)', url: 'https://med24.uz/uz/klinika/iroda', checked: '2026-10-12, по выдаче веб-поиска' },
    { what: 'Телефоны +998 95 145 05 02 и +998 71 231 05 02, Instagram @iroda_stom, Telegram @irodastom, ошибка HTTPS по www', checked: 'таблица заказчика, 10.2026' },
  ],
  unverified: [
    'Телефоны, Telegram @irodastom и Instagram @iroda_stom — из таблицы заказчика; поиск их не подтвердил и не опроверг.',
    'Ошибка HTTPS по ссылке www — из таблицы заказчика, из контейнера не открыть.',
    'Номер дома: каталоги дают «2А», Med24 — «2a1».',
    'График работы не найден — на сайте «уточняйте по телефону».',
    'Все цены, визиты и сроки — пример.',
  ],
  notes: [
    'Показать: «Что вас беспокоит?» и блок «Для всей семьи» — выбор «Ребёнка» или «Всю семью» сразу попадает в форму записи.',
    'Хук для разговора (если спросят, зачем сайт): ссылка www из карточки открывается с ошибкой HTTPS — браузер показывает пациенту предупреждение.',
    'Если ответят — спросить: какие цены можно показать, есть ли детский врач и в какие дни, кто отвечает в Telegram.',
  ],
})

import { typo } from '@/core/text'
import type { L10n, Lead, Locale } from '@/core/types'

/**
 * Тексты ниши banquet. Всё, что касается конкретного зала (вместимость, цены, состав меню),
 * лежит в конфиге лида с example: true. TODO: проверить носителем — узбекские строки.
 */
export const copy = {
  kind: { ru: 'Банкетный зал', uz: 'Toʻyxona' },
  checkDate: { ru: 'Проверить дату', uz: 'Sanani tekshirish' },
  eventTypes: [
    { ru: 'Свадьба', uz: 'Toʻy' },
    { ru: 'Никох', uz: 'Nikoh' },
    { ru: 'Сунъат-той', uz: 'Sunnat toʻyi' },
    { ru: 'Юбилей', uz: 'Yubiley' },
    { ru: 'Корпоратив', uz: 'Korporativ' },
    { ru: 'Другое', uz: 'Boshqa' },
  ],
  planner: {
    title: { ru: 'Сколько гостей?', uz: 'Necha mehmon?' },
    lead: {
      ru: 'Двигайте ползунок: схема покажет столы по 10 человек, подходящий зал и ориентир по стоимости.',
      uz: 'Slayderni suring: sxema 10 kishilik stollarni, mos zalni va taxminiy narxni koʻrsatadi.',
    },
    perTable: { ru: 'по 10 человек', uz: '10 kishidan' },
    fits: { ru: 'Подходит', uz: 'Mos keladi' },
    package: { ru: 'Пакет меню', uz: 'Menyu paketi' },
    estimate: { ru: 'Ориентир по стоимости', uz: 'Taxminiy narx' },
    note: {
      ru: 'Залы и цены — пример. Точный расчёт — после встречи в зале.',
      uz: 'Zallar va narxlar — namuna. Aniq hisob — zaldagi uchrashuvdan keyin.',
    },
    stage: { ru: 'сцена', uz: 'sahna' },
    floor: { ru: 'танцпол', uz: 'raqs maydoni' },
    legend: { ru: 'стол на 10 гостей', uz: '10 kishilik stol' },
    sliderLabel: { ru: 'Сколько гостей', uz: 'Mehmonlar soni' },
  },
  halls: {
    title: { ru: 'Залы', uz: 'Zallar' },
    lead: {
      ru: 'Большая свадьба и семейный вечер — у каждого праздника свой зал.',
      uz: 'Katta toʻy ham, oilaviy kecha ham — har bir bayramga oʻz zali.',
    },
  },
  packages: {
    title: { ru: 'Пакеты меню', uz: 'Menyu paketlari' },
    lead: { ru: 'Цена — за одного гостя.', uz: 'Narx — bir mehmon uchun.' },
    perGuest: { ru: 'за гостя', uz: 'mehmon uchun' },
  },
  includes: {
    title: { ru: 'Что добавить к вечеру', uz: 'Kechaga nima qoʻshish mumkin' },
    lead: {
      ru: 'Всё, что обычно ищут по отдельности, — в одном месте. Состав и цены уточняются при бронировании.',
      uz: 'Odatda alohida izlanadigan hamma narsa — bir joyda. Tarkib va narxlar band qilishda aniqlashtiriladi.',
    },
    items: [
      {
        icon: 'flower',
        title: { ru: 'Оформление зала', uz: 'Zal bezagi' },
        text: { ru: 'Цветы, свет, президиум для молодых', uz: 'Gullar, yoritish, kelin-kuyov uchun prezidium' },
      },
      {
        icon: 'music',
        title: { ru: 'Звук и свет', uz: 'Ovoz va yorugʻlik' },
        text: { ru: 'Сцена, ди-джей, свет для первого танца', uz: 'Sahna, DJ, birinchi raqs uchun yorugʻlik' },
      },
      {
        icon: 'mic',
        title: { ru: 'Ведущий и музыканты', uz: 'Boshlovchi va musiqachilar' },
        text: {
          ru: 'Ведущий на двух языках, живая музыка, карнай-сурнай на встрече гостей',
          uz: 'Ikki tilda boshlovchi, jonli musiqa, mehmonlarni kutib olishda karnay-surnay',
        },
      },
      {
        icon: 'camera',
        title: { ru: 'Фото и видео', uz: 'Foto va video' },
        text: { ru: 'Съёмка дня и короткий клип к концу вечера', uz: 'Kun davomida suratga olish va kecha oxirida qisqa klip' },
      },
    ],
  },
  steps: {
    title: { ru: 'Как забронировать', uz: 'Qanday band qilish mumkin' },
    items: [
      {
        title: { ru: 'Заявка', uz: 'Ariza' },
        text: {
          ru: 'Оставляете дату и число гостей — администратор проверяет, свободен ли зал.',
          uz: 'Sana va mehmonlar sonini qoldirasiz — administrator zal boʻshligini tekshiradi.',
        },
      },
      {
        title: { ru: 'Встреча в зале', uz: 'Zalda uchrashuv' },
        text: {
          ru: 'Смотрите зал вживую, выбираете меню и оформление.',
          uz: 'Zalni oʻz koʻzingiz bilan koʻrasiz, menyu va bezakni tanlaysiz.',
        },
      },
      {
        title: { ru: 'Предоплата', uz: 'Oldindan toʻlov' },
        text: {
          ru: 'Дата закрепляется за вами — никто другой её не займёт.',
          uz: 'Sana siz uchun band qilinadi — uni boshqa hech kim egallamaydi.',
        },
      },
      {
        title: { ru: 'За неделю до праздника', uz: 'Bayramdan bir hafta oldin' },
        text: { ru: 'Уточняем число гостей и рассадку.', uz: 'Mehmonlar soni va joylashuvni aniqlashtiramiz.' },
      },
    ],
  },
  faq: {
    title: { ru: 'Частые вопросы', uz: 'Koʻp beriladigan savollar' },
    items: [
      {
        q: { ru: 'Можно посмотреть зал до бронирования?', uz: 'Band qilishdan oldin zalni koʻrsa boʻladimi?' },
        a: {
          ru: 'Да. Позвоните или оставьте заявку — договоримся о времени и покажем зал.',
          uz: 'Ha. Qoʻngʻiroq qiling yoki ariza qoldiring — vaqtni kelishib, zalni koʻrsatamiz.',
        },
      },
      {
        q: { ru: 'Сколько стоит банкет на одного гостя?', uz: 'Banket bir mehmon uchun qancha turadi?' },
        a: {
          ru: 'Зависит от пакета меню и дня недели. Ориентир — в разделе с пакетами, точную сумму назовём на встрече.',
          uz: 'Menyu paketi va hafta kuniga bogʻliq. Taxminiy narx — paketlar boʻlimida, aniq summani uchrashuvda aytamiz.',
        },
      },
      {
        q: {
          ru: 'Можно принести свои фрукты, торт или напитки?',
          uz: 'Oʻzimiz meva, tort yoki ichimlik olib kelsak boʻladimi?',
        },
        a: {
          ru: 'Правила обсуждаем при бронировании: расскажем, что можно принести и есть ли за это сбор.',
          uz: 'Qoidalarni band qilishda kelishamiz: nima olib kelish mumkinligini va buning uchun haq olinishini aytamiz.',
        },
      },
      {
        q: { ru: 'Нужна ли предоплата?', uz: 'Oldindan toʻlov kerakmi?' },
        a: {
          ru: 'Да, дату закрепляет предоплата. Сумма и условия возврата — в договоре.',
          uz: 'Ha, sanani oldindan toʻlov band qiladi. Summa va qaytarish shartlari — shartnomada.',
        },
      },
      {
        q: { ru: 'Проводите никох и сунъат-той?', uz: 'Nikoh va sunnat toʻyini oʻtkazasizmi?' },
        a: {
          ru: 'Да, кроме свадеб — никох, сунъат-той, юбилеи и корпоративы. Зал подберём по числу гостей.',
          uz: 'Ha, toʻydan tashqari — nikoh, sunnat toʻyi, yubiley va korporativlar. Zalni mehmonlar soniga qarab tanlaymiz.',
        },
      },
    ],
  },
  location: {
    title: { ru: 'Как добраться', uz: 'Qanday borish mumkin' },
    parking: { ru: 'Парковка у зала', uz: 'Zal yonida avtoturargoh' },
  },
  booking: {
    lead: {
      ru: 'Оставьте дату и число гостей — администратор перезвонит и скажет, свободен ли зал.',
      uz: 'Sana va mehmonlar sonini qoldiring — administrator qayta qoʻngʻiroq qilib, zal boʻshligini aytadi.',
    },
  },
} as const satisfies Record<string, unknown>

export type IncludeIcon = (typeof copy.includes.items)[number]['icon']

/** «до 600 гостей» / «600 mehmongacha» */
export function capacityLabel(n: number): L10n {
  return { ru: `до ${n} гостей`, uz: `${n} mehmongacha` }
}

/** «Банкетный зал на Лабзаке» / «Labzakdagi toʻyxona» */
export function kindLine(lead: Lead, locale: Locale): string {
  return locale === 'ru' ? typo(`Банкетный зал ${lead.where.ru}`, 'ru') : `${lead.where.uz} toʻyxona`
}

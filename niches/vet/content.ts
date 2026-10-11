import { typo } from '@/core/text'
import type { Lead, Locale } from '@/core/types'

/** Тексты ниши vet. Цены и услуги — в конфиге лида (example: true). TODO: проверить носителем — узбекские строки. */
export const copy = {
  book: { ru: 'Записаться на приём', uz: 'Qabulga yozilish' },
  bookVaccine: { ru: 'Записаться на прививку', uz: 'Emlashga yozilish' },
  pets: {
    cat: { ru: 'Кошка', uz: 'Mushuk' },
    dog: { ru: 'Собака', uz: 'It' },
    other: { ru: 'Другой питомец', uz: 'Boshqa hayvon' },
  },
  calendar: {
    title: { ru: 'Календарь прививок', uz: 'Emlash taqvimi' },
    lead: {
      ru: 'Выберите, кто у вас и сколько ему, — покажем ориентировочный график прививок с датами.',
      uz: 'Kim borligini va yoshini tanlang — sanalari bilan taxminiy emlash jadvalini koʻrsatamiz.',
    },
    who: { ru: 'Кто у вас', uz: 'Sizda kim bor' },
    age: { ru: 'Возраст', uz: 'Yoshi' },
    ageMin: { ru: '1 месяц', uz: '1 oylik' },
    ageMax: { ru: '1 год+', uz: '1 yosh+' },
    note: { ru: 'Ориентир, схему назначает врач.', uz: 'Taxminiy jadval, sxemani shifokor belgilaydi.' },
  },
  services: {
    title: { ru: 'Услуги и цены', uz: 'Xizmatlar va narxlar' },
    lead: { ru: 'Цены — ориентир. Точная стоимость — после осмотра.', uz: 'Narxlar taxminiy. Aniq narx — koʻrikdan keyin.' },
    from: { ru: 'от', uz: 'dan' },
  },
  urgent: {
    title: { ru: 'Срочно нужна помощь?', uz: 'Shoshilinch yordam kerakmi?' },
    text: {
      ru: 'Позвоните заранее — врач будет готов к вашему приезду.',
      uz: 'Oldindan qoʻngʻiroq qiling — shifokor kelishingizga tayyor boʻladi.',
    },
    allDay: { ru: 'Круглосуточно', uz: 'Kecha-kunduz' },
    allDayText: {
      ru: 'Работаем круглосуточно, без выходных. Позвоните по дороге — врач встретит.',
      uz: 'Kecha-kunduz, dam olish kunlarisiz ishlaymiz. Yoʻlda qoʻngʻiroq qiling — shifokor kutib oladi.',
    },
  },
  prep: {
    title: { ru: 'Как подготовить питомца к визиту', uz: 'Uy hayvonini tashrifga qanday tayyorlash kerak' },
    items: [
      {
        ru: 'Возьмите ветпаспорт — в нём отмечены прошлые прививки.',
        uz: 'Veterinariya pasportini oling — unda oldingi emlashlar qayd etilgan.',
      },
      {
        ru: 'Кошку везите в переноске, собаку — на поводке.',
        uz: 'Mushukni maxsus qutida, itni esa bogʻichda olib keling.',
      },
      {
        ru: 'Перед УЗИ и анализами не кормите 8–12 часов — уточните при записи.',
        uz: 'UTT va tahlillardan oldin 8–12 soat ovqat bermang — yozilishda aniqlang.',
      },
      {
        ru: 'Запишите, что беспокоит и когда началось, — так приём пройдёт быстрее.',
        uz: 'Nima bezovta qilayotgani va qachon boshlanganini yozib qoʻying — qabul tezroq oʻtadi.',
      },
    ],
  },
  faq: {
    title: { ru: 'Частые вопросы', uz: 'Koʻp beriladigan savollar' },
    items: [
      {
        q: { ru: 'Нужно ли записываться заранее?', uz: 'Oldindan yozilish kerakmi?' },
        a: {
          ru: 'Лучше записаться — тогда не придётся ждать. В срочных случаях звоните сразу.',
          uz: 'Yozilgan maʼqul — shunda kutib oʻtirmaysiz. Shoshilinch holatda darhol qoʻngʻiroq qiling.',
        },
      },
      {
        q: { ru: 'С какого возраста делают первую прививку?', uz: 'Birinchi emlash qaysi yoshda qilinadi?' },
        a: {
          ru: 'Обычно с 8 недель. Точную схему врач назначит после осмотра.',
          uz: 'Odatda 8 haftalikdan. Aniq sxemani shifokor koʻrikdan keyin belgilaydi.',
        },
      },
      {
        q: { ru: 'Что взять с собой на прививку?', uz: 'Emlashga nima olib kelish kerak?' },
        a: {
          ru: 'Ветпаспорт, если он уже есть. Питомец должен быть здоров, а за 10–14 дней — обработан от глистов.',
          uz: 'Pasport, agar bor boʻlsa. Hayvon sogʻlom boʻlishi va 10–14 kun oldin gijjaga qarshi ishlov olgan boʻlishi kerak.',
        },
      },
      {
        q: { ru: 'Делаете стерилизацию?', uz: 'Sterilizatsiya qilasizmi?' },
        a: {
          ru: 'Да, кошек и собак. Перед операцией — осмотр и, если нужно, анализы.',
          uz: 'Ha, mushuk va itlarni. Operatsiyadan oldin — koʻrik va kerak boʻlsa tahlillar.',
        },
      },
    ],
  },
  location: {
    title: { ru: 'Как нас найти', uz: 'Bizni qanday topish mumkin' },
  },
  booking: {
    lead: {
      ru: 'Оставьте телефон — администратор перезвонит и подберёт время.',
      uz: 'Telefon raqamingizni qoldiring — administrator qayta qoʻngʻiroq qilib, vaqt tanlab beradi.',
    },
    pet: { ru: 'Кто у вас', uz: 'Sizda kim bor' },
    service: { ru: 'Что нужно', uz: 'Nima kerak' },
    date: { ru: 'Удобный день', uz: 'Qulay kun' },
    required: { ru: 'Заполните имя и телефон', uz: 'Ism va telefon raqamini kiriting' },
    services: [
      { ru: 'Приём', uz: 'Qabul' },
      { ru: 'Прививка', uz: 'Emlash' },
      { ru: 'УЗИ', uz: 'UTT' },
      { ru: 'Анализы', uz: 'Tahlillar' },
      { ru: 'Стерилизация', uz: 'Sterilizatsiya' },
    ],
  },
} as const

/** «Ветклиника на Ялангаче» / «Yalangʻochdagi veterinariya klinikasi» */
export function kindLine(lead: Lead, locale: Locale): string {
  const kind = lead.kind ?? { ru: 'Ветклиника', uz: 'veterinariya klinikasi' }
  return locale === 'ru' ? typo(`${kind.ru} ${lead.where.ru}`, 'ru') : `${lead.where.uz} ${kind.uz}`
}

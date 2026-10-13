import { typo } from '@/core/text'
import type { Lead, Locale, Pet } from '@/core/types'

/** Тексты ниши petshop (ветшоп: зоотовары + ветаптека). Товары и цены — в конфиге лида (example: true). TODO: проверить носителем — узбекские строки. */
export const copy = {
  reserve: { ru: 'Отложить', uz: 'Ajratib qoʻyish' },
  reserved: { ru: 'Отложено', uz: 'Ajratildi' },
  toOrder: { ru: 'Оформить', uz: 'Rasmiylashtirish' },
  scale: {
    title: { ru: 'От блох и клещей — по весу', uz: 'Burga va kanaga qarshi — vaznga qarab' },
    lead: {
      ru: 'Выберите, кто у вас, и сдвиньте вес: покажем средства, подходящие по весу, как на упаковках, и цену.',
      uz: 'Kim borligini tanlang va vaznni suring: qadoqdagidek vaznga mos vositalar va narxini koʻrsatamiz.',
    },
    who: { ru: 'Кто у вас', uz: 'Kim bor' },
    weight: { ru: 'Вес питомца', uz: 'Hayvon vazni' },
    group: { ru: 'Весовая группа', uz: 'Vazn guruhi' },
    upTo: { ru: 'до {n} кг', uz: '{n} kg gacha' },
    range: { ru: '{a}–{b} кг', uz: '{a}–{b} kg' },
    caution: {
      ru: 'Подбор по весу — как на упаковках. Средство подтвердит ветеринар или продавец; для щенков, котят, беременных и пожилых животных — сначала консультация.',
      uz: 'Vaznga qarab tanlash — qadoqlardagidek. Vositani veterinar yoki sotuvchi tasdiqlaydi; kuchukcha, mushukcha, boʻgʻoz va keksa hayvonlar uchun — avval maslahat.',
    },
  },
  pets: {
    dog: { ru: 'Собака', uz: 'It' },
    cat: { ru: 'Кошка', uz: 'Mushuk' },
  } satisfies Record<Pet, { ru: string; uz: string }>,
  forPet: {
    dog: { ru: 'для собак', uz: 'itlar uchun' },
    cat: { ru: 'для кошек', uz: 'mushuklar uchun' },
  } satisfies Record<Pet, { ru: string; uz: string }>,
  catalog: {
    title: { ru: 'Витрина', uz: 'Vitrina' },
    lead: { ru: 'Цены — пример: на рабочем сайте здесь будет ваш прайс.', uz: 'Narxlar — namuna: ishlaydigan saytda bu yerda sizning narxlaringiz boʻladi.' },
  },
  order: {
    title: { ru: 'Отложенное', uz: 'Ajratilganlar' },
    lead: {
      ru: 'Оставьте телефон — соберём заказ и перезвоним. Заберёте в магазине или договоримся о доставке.',
      uz: 'Telefon raqamingizni qoldiring — buyurtmani yigʻib, qoʻngʻiroq qilamiz. Doʻkondan olasiz yoki yetkazib berishni kelishamiz.',
    },
    empty: { ru: 'Пока ничего не отложено — нажмите «Отложить» на ценнике.', uz: 'Hozircha hech narsa ajratilmagan — narx yorligʻidagi «Ajratib qoʻyish»ni bosing.' },
    total: { ru: 'Итого', uz: 'Jami' },
    remove: { ru: 'Убрать', uz: 'Olib tashlash' },
    pickup: { ru: 'Как забрать', uz: 'Qanday olasiz' },
    pickupOptions: [
      { ru: 'Заберу в магазине', uz: 'Doʻkondan olaman' },
      { ru: 'Нужна доставка', uz: 'Yetkazib berish kerak' },
    ],
    items: { ru: 'Отложенные товары', uz: 'Ajratilgan mahsulotlar' },
    required: { ru: 'Заполните имя и телефон', uz: 'Ism va telefon raqamini kiriting' },
    demo: { ru: 'Демо: заказ никуда не уходит — на рабочем сайте он сразу придёт продавцу в Telegram.', uz: 'Demo: buyurtma hech qayerga yuborilmaydi — ishlaydigan saytda u darhol sotuvchiga Telegramda keladi.' },
  },
  hours: { ru: 'Часы работы', uz: 'Ish vaqti' },
  hoursUnknown: { ru: 'Уточняйте по телефону', uz: 'Telefon orqali aniqlang' },
}

export const kgText = (n: number) => String(n).replace('.', ',')

/** Номер весовой группы: первая, чья верхняя граница не меньше веса. */
export function bandOf(bands: number[], w: number): number {
  const i = bands.findIndex((b) => w <= b)
  return i < 0 ? bands.length - 1 : i
}

export function bandLabel(bands: number[], i: number, locale: Locale): string {
  const k = copy.scale
  return i === 0 ? k.upTo[locale].replace('{n}', kgText(bands[0]!)) : k.range[locale].replace('{a}', kgText(bands[i - 1]!)).replace('{b}', kgText(bands[i]!))
}

export function kindLine(lead: Lead, locale: Locale): string {
  const kind = lead.kind ?? { ru: 'Зоомагазин', uz: 'zoodoʻkon' }
  return locale === 'ru' ? typo(`${kind.ru} ${lead.where.ru}`, 'ru') : `${lead.where.uz} ${kind.uz}`
}

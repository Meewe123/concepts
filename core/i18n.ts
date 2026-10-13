import type { L10n } from './types'

/** Общие подписи интерфейса. TODO: проверить носителем — узбекские строки. */
export const ui = {
  call: { ru: 'Позвонить', uz: 'Qoʻngʻiroq qilish' },
  telegram: { ru: 'Написать в Telegram', uz: 'Telegramda yozish' },
  whatsapp: { ru: 'Написать в WhatsApp', uz: 'WhatsAppda yozish' },
  instagram: { ru: 'Instagram', uz: 'Instagram' },
  openMaps: { ru: 'Открыть в Яндекс Картах', uz: 'Yandex Xaritalarda ochish' },
  example: { ru: 'пример', uz: 'namuna' },
  photosHere: { ru: 'здесь будут ваши фото', uz: 'bu yerda sizning suratlaringiz boʻladi' },
  mapNote: { ru: 'Схема условная. Точный маршрут — в Яндекс Картах.', uz: 'Sxema shartli. Aniq yoʻnalish — Yandex Xaritalarda.' },
  ratingSource: { ru: 'по данным Яндекс Карт', uz: 'Yandex Xaritalar maʼlumotiga koʻra' },
  ratingCount: { ru: 'оценок', uz: 'ta baho' },
  langSwitch: { ru: 'Oʻzbekcha', uz: 'Русский' },
  langSwitchLabel: { ru: 'Сайт на узбекском', uz: 'Saytning rus tilidagi versiyasi' },
  contacts: { ru: 'Контакты', uz: 'Aloqa' },
  address: { ru: 'Адрес', uz: 'Manzil' },
  phones: { ru: 'Телефоны', uz: 'Telefonlar' },
  // форма
  formName: { ru: 'Как вас зовут', uz: 'Ismingiz' },
  formPhone: { ru: 'Телефон', uz: 'Telefon raqamingiz' },
  formDate: { ru: 'Дата праздника', uz: 'Bayram sanasi' },
  formGuests: { ru: 'Сколько гостей', uz: 'Mehmonlar soni' },
  formEvent: { ru: 'Какой праздник', uz: 'Qanday bayram' },
  formSubmit: { ru: 'Отправить заявку', uz: 'Ariza yuborish' },
  formSent: { ru: 'Заявка отправлена', uz: 'Ariza yuborildi' },
  formSentNote: {
    ru: 'Это демо: данные никуда не ушли. На рабочем сайте заявка сразу придёт администратору в Telegram.',
    uz: 'Bu demo: maʼlumotlar hech qayerga yuborilmadi. Ishlaydigan saytda ariza darhol administratorga Telegramda keladi.',
  },
  formAgain: { ru: 'Заполнить ещё раз', uz: 'Qaytadan toʻldirish' },
  formRequired: { ru: 'Заполните имя, телефон и дату', uz: 'Ism, telefon va sanani kiriting' },
} satisfies Record<string, L10n>

/** Плашка внизу каждого концепта. */
export function plaque(name: string | L10n): L10n {
  const n = typeof name === 'string' ? { ru: name, uz: name } : name
  return {
    ru: `Демо-концепт для ${n.ru}. Не официальный сайт. Цены и данные примерные.`,
    uz: `${n.uz} uchun demo-konsept. Rasmiy sayt emas. Narxlar va maʼlumotlar taxminiy.`,
  }
}

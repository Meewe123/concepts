import { defineLead } from '@/core/define'
import { mapsUrlFor } from './maps'

const ex = true

export default defineLead({
  slug: 'expert-beauty-f8cb',
  name: 'Expert Beauty',
  niche: 'beauty',
  district: { ru: 'Ташкент', uz: 'Toshkent' },
  where: { ru: 'в Ташкенте — два адреса', uz: 'Toshkentdagi — ikki manzil' },
  address: { ru: 'Ташкент, ул. Абдуллы Каххара, 24', uz: 'Toshkent, Abdulla Qahhor koʻchasi, 24' },
  phones: ['+998 99 177 72 72'],
  instagram: 'expertbeauty_uz',
  mapsUrl: mapsUrlFor('expert-beauty-f8cb'),
  facts: [],
  hook: 'около 21 тысячи подписчиков и два филиала, но записаться можно только через директ или звонок',
  direction: 'glossy-editorial',
  directionWhy:
    'glossy-editorial — салон с сильным Instagram (~21 тыс.) и двумя адресами: сайт как глянцевый журнал — обложка с мастхедом, меню услуг как «Содержание», окна записи как анонсы; Cormorant с курсивом целыми строками и золотые линии в 1 px.',
  langs: ['ru', 'uz'],
  map: { kind: 'street', street: { ru: 'ул. Абдуллы Каххара', uz: 'Abdulla Qahhor koʻchasi' }, house: '24' },
  contactStatus: 'sent',
  statusChangedAt: '2026-10-13',
  channel: 'instagram',
  messageLang: 'ru',
  signaturePitch: {
    ru: 'Клиентка выбирает услугу и филиал и сразу видит длительность, цену и ближайшие свободные окна',
    uz: 'Mijoz xizmat va filialni tanlaydi va davomiylik, narx va eng yaqin boʻsh vaqtni darhol koʻradi',
  },
  pitchText: {
    ru: 'Здравствуйте! Сделал вам концепт сайта — в виде глянцевого журнала: {link}. Меню услуг там как «Содержание»: выбираешь окрашивание и филиал — и сразу видно, сколько длится, сколько стоит и ближайшие окна. Посмотрите с телефона; если заинтересует — напишите.',
    // TODO: проверить носителем
    uz: 'Assalomu alaykum! Sizga glyanets jurnal uslubida sayt konseptini tayyorladim: {link}. Xizmatlar «Mundarija» koʻrinishida: boʻyash va filialni tanlaysiz — davomiyligi, narxi va eng yaqin boʻsh vaqt darhol koʻrinadi. Telefondan koʻring; qiziqtirsa — yozing.',
  },
  beauty: {
    branches: [
      { id: 'kahhar', name: { ru: 'Абдуллы Каххара', uz: 'Abdulla Qahhor' }, address: { ru: 'ул. Абдуллы Каххара, 24', uz: 'Abdulla Qahhor koʻchasi, 24' } },
      { id: 'yunusabad', name: { ru: 'Юнусабад', uz: 'Yunusobod' }, address: { ru: 'Юнусабад, 10-й квартал, 1А', uz: 'Yunusobod, 10-mavze, 1A' } },
    ],
    schedule: { days: [0, 1, 2, 3, 4, 5, 6], open: '09:00', close: '21:00', real: false },
    services: [
      { id: 'cut', group: { ru: 'Волосы', uz: 'Soch' }, name: { ru: 'Женская стрижка', uz: 'Ayollar soch turmagi' }, minutes: 60, price: 150_000, from: true, example: ex },
      { id: 'color', group: { ru: 'Волосы', uz: 'Soch' }, name: { ru: 'Окрашивание в один тон', uz: 'Bir tusda boʻyash' }, minutes: 150, price: 450_000, from: true, example: ex },
      { id: 'airtouch', group: { ru: 'Волосы', uz: 'Soch' }, name: { ru: 'Сложное окрашивание', uz: 'Murakkab boʻyash' }, minutes: 270, price: 950_000, from: true, example: ex },
      { id: 'styling', group: { ru: 'Волосы', uz: 'Soch' }, name: { ru: 'Укладка', uz: 'Soch turmaklash' }, minutes: 45, price: 120_000, from: true, example: ex },
      { id: 'mani', group: { ru: 'Ногти', uz: 'Tirnoqlar' }, name: { ru: 'Маникюр с покрытием', uz: 'Qoplamali manikyur' }, minutes: 90, price: 160_000, from: true, example: ex },
      { id: 'pedi', group: { ru: 'Ногти', uz: 'Tirnoqlar' }, name: { ru: 'Педикюр с покрытием', uz: 'Qoplamali pedikyur' }, minutes: 105, price: 230_000, from: true, example: ex },
      { id: 'brows', group: { ru: 'Брови и ресницы', uz: 'Qosh va kipriklar' }, name: { ru: 'Брови: форма и окрашивание', uz: 'Qosh: shakl va boʻyash' }, minutes: 45, price: 110_000, from: true, example: ex },
      { id: 'lashes', group: { ru: 'Брови и ресницы', uz: 'Qosh va kipriklar' }, name: { ru: 'Ламинирование ресниц', uz: 'Kipriklarni laminatsiya qilish' }, minutes: 60, price: 220_000, from: true, example: ex },
      { id: 'makeup', group: { ru: 'Макияж', uz: 'Makiyaj' }, name: { ru: 'Вечерний макияж', uz: 'Kechki makiyaj' }, minutes: 60, price: 280_000, from: true, example: ex },
    ],
  },
  sources: [
    { what: 'Два филиала (ул. Абдуллы Каххара, 24; Юнусабад, 10-й квартал, 1А), телефон +998 99 177 72 72, Instagram @expertbeauty_uz (≈21 тыс.)', checked: 'таблица заказчика, 10.2026' },
    { what: 'Карточка организации', url: 'https://yandex.uz/maps/org/expert_beauty/88153477870/', checked: 'ссылка от заказчика, 10.2026' },
  ],
  unverified: [
    'Ни адреса, ни телефон, ни Instagram веб-поиск 13.10.2026 не нашёл (выдача — другие салоны: Express Beauty, Expert Aesthetic Clinic). Всё — из таблицы заказчика.',
    'Ссылка «Открыть в Яндекс Картах» у первого филиала — карточка организации от заказчика; у второго — поиск по адресу.',
    'График не найден: на сайте «уточняйте по телефону», окна записи — демо по примерному графику 09:00–21:00.',
    'Все услуги, цены и длительности — пример.',
  ],
  notes: [
    'Показать: «Содержание» → «Окрашивание в один тон» → переключить филиал → выбрать окно → кнопка «Записаться: …».',
    'Хук для разговора: два филиала и сильный Instagram, а записаться можно только через директ — на сайте запись за минуту с выбором филиала.',
    'Если ответят — спросить: актуальный прайс по услугам, график каждого филиала, кто подтверждает записи.',
  ],
})

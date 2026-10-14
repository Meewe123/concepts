export type Locale = 'ru' | 'uz'

/**
 * Текст на двух языках. Узбекский — латиница: oʻ и gʻ через U+02BB, тутук ʼ — U+02BC.
 * TODO: проверить носителем — все узбекские тексты.
 */
export type L10n = { ru: string; uz: string }

export type NicheId =
  | 'banquet'
  | 'dental'
  | 'vet'
  | 'petshop'
  | 'beauty'
  | 'education'
  | 'auto'
  | 'restaurant'
  | 'wellness'
  | 'fitness'
  | 'services'

export type ContactStatus = 'not-contacted' | 'sent' | 'unread' | 'read-silent' | 'forwarded' | 'replied' | 'declined'

export type Channel = 'telegram' | 'instagram' | 'whatsapp' | 'facebook'

/** Публичный проверенный факт: всегда с источником и месяцем. */
export interface Fact {
  text: L10n
  source: string
  asOf: string
}

export interface Rating {
  value: number
  count: number
  source: string
  /** '2026-10' */
  asOf: string
}

/** Условная SVG-схема места: улица с номером дома или квартал. */
export type MapScheme =
  | { kind: 'street'; street: L10n; house: string }
  | { kind: 'quarter'; area: L10n; quarter: L10n; number: string }

export interface BanquetHall {
  id: string
  name: L10n
  capacity: number
  example: boolean
}

export interface BanquetPackage {
  id: string
  name: L10n
  pricePerGuest: number
  items: L10n[]
  example: boolean
}

export interface BanquetData {
  halls: BanquetHall[]
  packages: BanquetPackage[]
  /** Выездной кейтеринг: свои пакеты, переключатель в планировщике */
  catering?: { packages: BanquetPackage[] }
  /** Пометка к залам, если вместимость взята из отзывов: «по отзывам, уточнить» */
  hallsNote?: L10n
  /** Сколько гостей стоит на ползунке при открытии. */
  defaultGuests: number
}

/** Строка прайса. Неизвестные цены — example: true. */
export interface PriceItem {
  id: string
  name: L10n
  price: number
  /** «от 150 000 сум» */
  from?: boolean
  note?: L10n
  example: boolean
}

export type Pet = 'cat' | 'dog'

export interface VetData {
  services: PriceItem[]
  /** При клинике есть аптека */
  pharmacy?: boolean
  /** При клинике есть зоомагазин */
  shop?: boolean
  /** Товары магазина к прививке — пример, для направления с ценниками */
  shopItems?: PriceItem[]
  defaultPet: Pet
}

export type StudyFormat = 'offline' | 'online'

export interface Course {
  id: string
  name: L10n
  /** 'A2–B1' */
  levels: string
  duration: L10n
  pricePerMonth: number
  note?: L10n
  example: boolean
}

export interface StudyGroup {
  id: string
  /** Уровень по шкале CEFR, к которому ведёт тест: A1, A2, B1, B2, C1 */
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1'
  course: L10n
  days: L10n
  time: string
  format: StudyFormat
  example: boolean
}

export interface Teacher {
  initials: string
  role: L10n
  example: boolean
}

export interface EducationData {
  courses: Course[]
  groups: StudyGroup[]
  teachers: Teacher[]
  formats: StudyFormat[]
  /** Показывать ориентир по IELTS в результате теста */
  ielts?: boolean
}

/** Шесть вариантов «Что вас беспокоит?» — порядок фиксирован. */
export const DENTAL_CONCERNS = ['pain', 'filling', 'hygiene', 'whitening', 'braces', 'implant'] as const
export type DentalConcernId = (typeof DENTAL_CONCERNS)[number]

export interface DentalConcern {
  id: DentalConcernId
  /** Вилка цены, сум. У «болит зуб» цены нет — только запись на осмотр. */
  price?: { from: number; to: number }
  /** «1 визит», «раз в 4–6 недель» */
  visits?: L10n
  /** «за один визит», «12–24 месяца» */
  duration?: L10n
  /** Рассрочка 6 / 12 мес: сумма / месяцы, без процентов */
  installment?: boolean
  /** Для наглядной шкалы: типичное число визитов и срок в месяцах (0 — за один день). Пример. */
  plan?: { visits: number; months: number }
  /** Строка к результату: цена или акция из карточки клиники («уточнить») */
  note?: L10n
  example: boolean
}

export interface DentalData {
  concerns: DentalConcern[]
  /** Цены и акции из публичной карточки — источник в notes.md, на сайте с пометкой «уточнить» */
  promos?: { big: L10n; text: L10n; source: string; asOf: string }[]
  /** Публично указан детский приём */
  kids?: boolean
  branches?: { id: string; name: L10n; address: L10n }[]
  /** График из справочников — для строки «Сейчас открыто · до 17:00» (время Ташкента) */
  schedule?: { days: number[]; open: string; close: string }
}

/** Товар витрины — цена «пример», пока нет прайса магазина */
export interface ShopItem {
  id: string
  name: L10n
  /** «3 кг», «5 л» */
  size?: L10n
  price: number
  from?: boolean
  pet?: Pet
  example: boolean
}

/** Форма средства от блох и клещей: цена по весовым группам (столько же, сколько групп) */
export interface ParasiteForm {
  id: string
  name: L10n
  note: L10n
  prices: number[]
  example: boolean
}

export interface PetshopData {
  /** Подбор средства по весу, как на упаковках: верхние границы групп, кг (последняя = максимум шкалы) */
  parasites: Record<Pet, { bands: number[]; forms: ParasiteForm[]; start: number }>
  catalog: { id: string; name: L10n; items: ShopItem[] }[]
  /** Доставка — из публичной карточки */
  delivery?: boolean
  /** При магазине принимает ветеринар */
  vet?: boolean
}

/** Класс машины: множители цены и времени */
export interface AutoClass {
  id: string
  name: L10n
  k: number
  t: number
}

export interface AutoService {
  id: string
  name: L10n
  /** Цена и минуты — для базового класса (седан) */
  price: number
  minutes: number
  example: boolean
}

export interface AutoData {
  classes: AutoClass[]
  services: AutoService[]
  /** Загрузка по часам работы (0…1), час за часом от open — пример для демо-графика и «очереди сейчас» */
  load: number[]
  schedule: BeautySchedule
  /** Ожидание при полной загрузке, минуты (демо) */
  maxWait: number
  /** Зона ожидания / кафе — из карточки */
  lounge?: boolean
}

/** Стол на схеме зала: координаты в процентах от зоны (0…100) */
export interface RestaurantTable {
  id: string
  seats: number
  x: number
  y: number
  shape: 'round' | 'rect' | 'booth'
}

export interface RestaurantZone {
  id: string
  name: L10n
  note?: L10n
  /** Работает в сезон (летняя терраса) */
  seasonal?: boolean
  tables: RestaurantTable[]
}

export interface MenuItem {
  id: string
  name: L10n
  price: number
  note?: L10n
  example: boolean
}

export interface RestaurantData {
  zones: RestaurantZone[]
  menu: { id: string; name: L10n; items: MenuItem[] }[]
  /** Варианты числа гостей в брони */
  guests: number[]
  schedule: BeautySchedule
  /** Особенности из карточек: терраса, детское меню, живая музыка… */
  features?: L10n[]
  /** Блюдо «пока не кончится» (плов): с какого часа подают и примерно до какого — уровень в казане по времени */
  pot?: { dish: L10n; from: string; until: string }
}

export interface Practice {
  id: string
  name: L10n
  about: L10n
  /** Фильтр расписания: yoga / sound / meditation … */
  kind: string
  minutes: number
  price: number
  /** Вход по донации (как в их анонсах) */
  donation?: boolean
  /** Ответы квиза, которым подходит практика */
  tags: string[]
  example: boolean
}

export interface WellnessData {
  practices: Practice[]
  /** Расписание недели — пример: день (0 — вс), время, практика */
  week: { day: number; time: string; practice: string }[]
  /** Три вопроса «Подобрать практику»; id ответов — теги практик; вопрос с id 'when' фильтрует время занятия */
  quiz: { id: string; q: L10n; options: { id: string; label: L10n }[] }[]
  kinds: { id: string; name: L10n }[]
  /** Пространство: кафе, коворкинг — из профиля */
  space?: { title: L10n; text: L10n }[]
}

export interface FitnessClub {
  id: string
  /** Название станции на схеме: «Мирабад», «Минор» */
  name: L10n
  address?: L10n
  landmark?: L10n
}

export interface FitnessData {
  clubs: FitnessClub[]
  /** Цель → абонемент */
  goals: { id: string; name: L10n; plan: string }[]
  plans: { id: string; name: L10n; price: number; note: L10n; example: boolean }[]
  /** Групповые занятия — пример: клуб, день (0 — вс), время, название */
  classes: { club: string; day: number; time: string; name: L10n }[]
}

export interface BeautyService {
  id: string
  name: L10n
  /** Группа в меню: «Волосы», «Ногти» */
  group?: L10n
  /** Длительность, минуты (для авто — у базового класса) */
  minutes: number
  /** Цена, сум (для авто — у базового класса) */
  price: number
  /** «от …» */
  from?: boolean
  note?: L10n
  example: boolean
}

export interface BeautySchedule {
  /** Рабочие дни: 0 — воскресенье … 6 — суббота */
  days: number[]
  /** '10:00' */
  open: string
  /** '20:00'; если раньше open — закрытие после полуночи ('02:00') */
  close: string
  /** true — график из публичного источника; false — пример для демо-окон */
  real: boolean
}

/** Вариант, меняющий цену и время: класс авто и т. п. */
export interface BeautyVariant {
  id: string
  name: L10n
  /** Множитель цены */
  k: number
  /** Множитель времени */
  t: number
}

export interface BeautyData {
  services: BeautyService[]
  schedule: BeautySchedule
  branches?: { id: string; name: L10n; address: L10n }[]
  variants?: { label: L10n; items: BeautyVariant[] }
}

export interface Lead {
  slug: string
  name: string
  /**
   * Витрина студии: вымышленный бренд для страницы `/`. Не лид — в пульт и в рассылку не попадает.
   * Телефон-заглушка +998 00 000 00 00 (кода оператора 00 нет), Telegram и Instagram не указываются.
   */
  showcase?: boolean
  niche: NicheId
  district: L10n
  /** Окончание фразы «Банкетный зал …»: «на Лабзаке» / «Labzakdagi». */
  where: L10n
  /** Своё название вида заведения вместо нишевого: «Школа английского» / «ingliz tili akademiyasi» */
  kind?: L10n
  address: L10n
  /** Ориентир из карточки: «напротив метро Минор» */
  landmark?: L10n
  /** '+998 98 128 00 09' */
  phones: string[]
  instagram?: string
  /** username без @ или номер '+998…' */
  telegram?: string
  whatsapp?: string
  /** Реальная ссылка на Яндекс Карты: карточка организации или поиск по адресу. */
  mapsUrl: string
  rating?: Rating
  facts: Fact[]
  /** Хук для сообщения — одна фраза про них. */
  hook: string
  /** Название в сообщении, если его нужно склонять: «сайт «Версаля»» */
  messageName?: L10n
  /** Хук на узбекском — нужен, если сообщение на узбекском начинается с хука. TODO: проверить носителем. */
  hookUz?: string
  direction: string
  langs: Locale[]
  map: MapScheme
  contactStatus: ContactStatus
  /** '2026-10-09' — когда сменился статус */
  statusChangedAt?: string
  /** Пока не писать — и почему («уже есть хороший сайт»). */
  hold?: string
  channel: Channel
  messageLang: Locale
  /** Одна фраза про сигнатурный интерактив — для сообщений read-silent и sent. */
  signaturePitch: L10n
  banquet?: BanquetData
  vet?: VetData
  petshop?: PetshopData
  auto?: AutoData
  restaurant?: RestaurantData
  wellness?: WellnessData
  fitness?: FitnessData
  education?: EducationData
  dental?: DentalData
  beauty?: BeautyData
  /**
   * Свой текст сообщения вместо шаблона по статусу; {link} — ссылка на концепт.
   * Те же проверки: до 350 знаков, одна ссылка, без эмодзи.
   */
  pitchText?: Partial<L10n>
  /** Работает круглосуточно (публичный факт из карточки) */
  is24h?: boolean
  /** Часы работы из карточки, если известны */
  hours?: L10n
  /** Заметки для pitch/<slug>/notes.md: что показать, о чём спросить. */
  notes?: string[]
  /** Почему выбрано это направление — одна строка в notes.md */
  directionWhy?: string
  /** Источники публичных фактов для notes.md: что, ссылка, когда проверено */
  sources?: { what: string; url?: string; checked: string }[]
  /** Чего проверить не удалось — в notes.md, на сайт не выносится */
  unverified?: string[]
}

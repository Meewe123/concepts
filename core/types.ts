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

export interface Lead {
  slug: string
  name: string
  niche: NicheId
  district: L10n
  /** Окончание фразы «Банкетный зал …»: «на Лабзаке» / «Labzakdagi». */
  where: L10n
  /** Своё название вида заведения вместо нишевого: «Школа английского» / «ingliz tili akademiyasi» */
  kind?: L10n
  address: L10n
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
  /** Хук на узбекском — нужен, если сообщение на узбекском начинается с хука. TODO: проверить носителем. */
  hookUz?: string
  direction: string
  langs: Locale[]
  map: MapScheme
  contactStatus: ContactStatus
  /** '2026-10-09' — когда сменился статус */
  statusChangedAt?: string
  channel: Channel
  messageLang: Locale
  /** Одна фраза про сигнатурный интерактив — для сообщений read-silent и sent. */
  signaturePitch: L10n
  banquet?: BanquetData
  vet?: VetData
  education?: EducationData
  /** Работает круглосуточно (публичный факт из карточки) */
  is24h?: boolean
  /** Часы работы из карточки, если известны */
  hours?: L10n
  /** Заметки для pitch/<slug>/notes.md: что показать, о чём спросить. */
  notes?: string[]
}

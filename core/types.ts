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

export interface Lead {
  slug: string
  name: string
  niche: NicheId
  district: L10n
  /** Окончание фразы «Банкетный зал …»: «на Лабзаке» / «Labzakdagi». */
  where: L10n
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
  /** Заметки для pitch/<slug>/notes.md: что показать, о чём спросить. */
  notes?: string[]
}

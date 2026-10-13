import type { BeautySchedule, Locale } from '@/core/types'

/**
 * Демо-окна записи: от текущего времени Ташкента по графику лида.
 * Нерабочие дни и время после закрытия пропускаются, часть окон «занята» —
 * псевдослучайно, но одинаково при каждом открытии в тот же день.
 */
export interface Slot {
  /** 'YYYY-MM-DD' */
  date: string
  /** 'HH:MM' */
  time: string
  /** 0 — сегодня, 1 — завтра … */
  dayOffset: number
  weekday: number
  day: number
  month: number
}

const STEP = 30
const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h! * 60 + m!
}
const pad = (n: number) => String(n).padStart(2, '0')

/** Текущие дата и время в Ташкенте (UTC+5, без перехода на летнее время). */
export function tashkentNow(): Date {
  const now = new Date()
  return new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 5 * 3600000)
}

function hash(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return (h >>> 0) / 4294967296
}

export function freeSlots(now: Date, schedule: BeautySchedule, minutes: number, seed: string, count = 4, perDay = 2): Slot[] {
  const open = toMin(schedule.open)
  let close = toMin(schedule.close)
  if (close <= open) close += 24 * 60
  const nowMin = now.getHours() * 60 + now.getMinutes()
  const out: Slot[] = []
  for (let d = 0; d < 14 && out.length < count; d++) {
    const day = new Date(now.getFullYear(), now.getMonth(), now.getDate() + d)
    if (!schedule.days.includes(day.getDay())) continue
    let taken = 0
    // на сегодня — не раньше чем через час, по сетке в 30 минут
    const from = d === 0 ? Math.max(open, Math.ceil((nowMin + 60) / STEP) * STEP) : open
    for (let t = from; t + minutes <= close && taken < perDay && out.length < count; t += STEP) {
      const date = `${day.getFullYear()}-${pad(day.getMonth() + 1)}-${pad(day.getDate())}`
      const hm = `${pad(Math.floor(t / 60) % 24)}:${pad(t % 60)}`
      if (hash(`${seed}|${date}|${hm}`) < 0.55) continue // «занято»
      // после полуночи — это уже следующий календарный день
      const real = t >= 24 * 60 ? new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1) : day
      out.push({
        date: `${real.getFullYear()}-${pad(real.getMonth() + 1)}-${pad(real.getDate())}`,
        time: hm,
        dayOffset: d + (t >= 24 * 60 ? 1 : 0),
        weekday: real.getDay(),
        day: real.getDate(),
        month: real.getMonth(),
      })
      taken++
      t += STEP // окна не подряд
    }
  }
  return out
}

const WD: Record<Locale, string[]> = {
  ru: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
  uz: ['yak', 'dush', 'sesh', 'chor', 'pay', 'jum', 'shan'],
}
const MON: Record<Locale, string[]> = {
  ru: ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
  uz: ['yan', 'fev', 'mar', 'apr', 'may', 'iyn', 'iyl', 'avg', 'sen', 'okt', 'noy', 'dek'],
}

/** «Сегодня» / «Завтра» / «чт, 16 окт» */
export function dayLabel(s: Slot, locale: Locale, today: string, tomorrow: string): string {
  if (s.dayOffset === 0) return today
  if (s.dayOffset === 1) return tomorrow
  return `${WD[locale][s.weekday]}, ${s.day} ${MON[locale][s.month]}`
}

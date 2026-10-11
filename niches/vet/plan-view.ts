import type { Locale } from '@/core/types'
import type { PlanRow } from './vaccines'

// Классы строки графика: одни и те же для серверной разметки и островка.
export const ROW = {
  li: 'vax-row grid grid-cols-[7rem_1fr] gap-x-4 border-t border-line py-3.5',
  when: 'vax-when row-span-2 text-sm leading-snug text-ink-2',
  date: 'vax-date mt-0.5 block',
  title: 'vax-title font-semibold leading-snug',
  note: 'vax-note text-sm leading-snug text-ink-2',
}

const MONTHS_RU = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
const MONTHS_UZ = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr']

/** «≈ 12 ноября» / «≈ 12-noyabr» — дата считается в браузере, от сегодняшнего дня. */
export function approxDate(inWeeks: number, locale: Locale, today = new Date()): string {
  const d = new Date(today.getTime() + inWeeks * 7 * 86400000)
  return locale === 'ru' ? `≈ ${d.getDate()} ${MONTHS_RU[d.getMonth()]}` : `≈ ${d.getDate()}-${MONTHS_UZ[d.getMonth()]}`
}

/** Строка графика как DOM — для островка. */
export function rowElement(row: PlanRow, locale: Locale): HTMLLIElement {
  const li = document.createElement('li')
  li.className = ROW.li
  li.dataset.state = row.state
  const when = document.createElement('p')
  when.className = ROW.when
  when.textContent = row.when
  if (row.inWeeks !== undefined && row.inWeeks > 1) {
    const date = document.createElement('span')
    date.className = ROW.date
    date.textContent = approxDate(row.inWeeks, locale)
    when.append(date)
  }
  const title = document.createElement('p')
  title.className = ROW.title
  title.textContent = row.title
  li.append(when, title)
  if (row.note) {
    const note = document.createElement('p')
    note.className = ROW.note
    note.textContent = row.note
    li.append(note)
  }
  return li
}

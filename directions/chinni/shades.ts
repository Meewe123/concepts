/**
 * Образцы шкалы оттенков (как VITA classical) — приблизительные цвета на экране.
 * Общие для разметки веера и CSS: выбранный образец задаёт --shade зубу на первом экране.
 */
export const SHADES = [
  { id: 'BL2', c: '#f7f4ec' },
  { id: 'B1', c: '#f3e9d1' },
  { id: 'A1', c: '#efe2c4' },
  { id: 'B2', c: '#e9d9b2' },
  { id: 'A2', c: '#e8d4a9' },
  { id: 'C1', c: '#e0d5bd' },
  { id: 'A3', c: '#e1c697' },
  { id: 'D2', c: '#dccbae' },
] as const

export const DEFAULT_SHADE = 'A1'

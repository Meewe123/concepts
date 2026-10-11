import * as fontkit from 'fontkit'

/**
 * Проверка глифов: кириллица, узбекские ʻ (U+02BB) и ʼ (U+02BC), «ёлочки», длинное тире,
 * неразрывный пробел и №. Любой новый шрифт — сначала сюда:
 *   npm run check-fonts                 — вся библиотека
 *   npm run check-fonts -- "Font Name"  — один шрифт
 */
const LIBRARY = [
  'Unbounded',
  'Tektur',
  'Literata',
  'Spectral',
  'Playfair Display',
  'Cormorant Garamond',
  'IBM Plex Sans',
  'IBM Plex Mono',
  'Onest',
  'Commissioner',
  'Ysabeau Office',
  'Source Code Pro',
]

const REQUIRED: [string, number][] = [
  ...'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя'.split('').map((c) => [c, c.codePointAt(0)!] as [string, number]),
  ['ʻ U+02BB', 0x02bb],
  ['ʼ U+02BC', 0x02bc],
  ['«', 0x00ab],
  ['»', 0x00bb],
  ['— U+2014', 0x2014],
  ['NBSP U+00A0', 0x00a0],
  ['№', 0x2116],
]

// С таким user-agent Google Fonts отдаёт woff2 по всем подмножествам (latin, latin-ext, cyrillic…)
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

async function check(family: string): Promise<string[]> {
  const res = await fetch(`https://fonts.googleapis.com/css2?family=${encodeURIComponent(family).replace(/%20/g, '+')}`, {
    headers: { 'user-agent': UA },
  })
  if (!res.ok) return [`не найден в Google Fonts (${res.status})`]
  const cssText = await res.text()
  const urls = [...cssText.matchAll(/url\((https:[^)]+\.woff2)\)/g)].map((m) => m[1]!)
  const fonts = await Promise.all(
    urls.map(async (u) => fontkit.create(Buffer.from(await (await fetch(u)).arrayBuffer())) as fontkit.Font),
  )
  return REQUIRED.filter(([, cp]) => !fonts.some((f) => f.hasGlyphForCodePoint(cp))).map(([name]) => name)
}

const families = process.argv.slice(2).length ? process.argv.slice(2) : LIBRARY
let failed = 0
for (const family of families) {
  const missing = await check(family)
  if (missing.length) {
    failed++
    console.log(`✗ ${family}: нет ${missing.join(', ')}`)
  } else console.log(`✓ ${family}`)
}
process.exit(failed ? 1 : 0)

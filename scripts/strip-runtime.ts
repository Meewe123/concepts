import fs from 'node:fs'
import path from 'node:path'

/**
 * После next build: на страницах остаётся только наш JS — островки, счётчик, данные островков.
 * Рантайм Next и React (~140 КБ) не нужен: страницы полностью статичные, интерактив — в островках.
 * Всё, что мы хотим оставить, помечено атрибутом data-concept.
 * Заодно — предзагрузка шрифта главного заголовка (data-hero-font у обёртки концепта).
 */
const OUT = 'out'

function htmlFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name)
    return e.isDirectory() ? htmlFiles(p) : e.name.endsWith('.html') ? [p] : []
  })
}

function heroFontPreload(html: string): string | null {
  const m = html.match(/data-hero-font="([^"|]+)\|(\d+)\|(\w+)"/)
  if (!m) return null
  const [, family, weight, style] = m
  const faces = html.match(/@font-face\{[^}]*\}/g) ?? []
  const face = faces.find(
    (f) =>
      new RegExp(`font-family:\\s*"?${family!.replace(/ /g, '\\s')}"?;`).test(f) &&
      f.includes(`font-style:${style}`) &&
      f.includes(`font-weight:${weight}`) &&
      /unicode-range:U\+(\?\?|0-FF|0000-00FF)/i.test(f),
  )
  const url = face?.match(/url\(([^)]+\.woff2)\)/)?.[1]
  return url ? `<link rel="preload" href="${url}" as="font" type="font/woff2" crossorigin=""/>` : null
}

let stripped = 0
for (const file of htmlFiles(OUT)) {
  const before = fs.readFileSync(file, 'utf8')
  let html = before.replace(/<script\b(?![^>]*\bdata-concept\b)[^>]*>[\s\S]*?<\/script>/g, '')
  html = html.replace(/<link rel="preload" as="script"[^>]*\/?>/g, '')
  const preload = heroFontPreload(html)
  if (preload && !html.includes(preload)) html = html.replace(/<head>/, `<head>${preload}`)
  if (html !== before) {
    fs.writeFileSync(file, html)
    stripped++
  }
  if (/_next\/static\/chunks\/[^"]+\.js/.test(html)) throw new Error(`${file}: остался скрипт Next`)
}
console.log(`✓ strip-runtime: ${stripped} страниц без рантайма Next`)

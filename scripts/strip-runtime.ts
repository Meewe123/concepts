import fs from 'node:fs'
import path from 'node:path'

/**
 * После next build: на страницах остаётся только наш JS — островки, счётчик, данные островков.
 * Рантайм Next и React (~140 КБ) не нужен: страницы полностью статичные, интерактив — в островках.
 * Всё, что мы хотим оставить, помечено атрибутом data-concept.
 * Заодно — предзагрузка шрифта главного заголовка (data-hero-font у обёртки концепта)
 * и встраивание островка прямо в страницу.
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
  // какое подмножество нужно заголовку: кириллица («Зооцентр») или латиница («Billur»)
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.replace(/<[^>]+>/g, '') ?? ''
  const range = /[А-Яа-яЁё]/.test(h1) ? /unicode-range:U\+(301,)?U?\+?400-45F/i : /unicode-range:U\+(\?\?|0-FF|0000-00FF)/i
  const faces = html.match(/@font-face\{[^}]*\}/g) ?? []
  const face = faces.find(
    (f) =>
      new RegExp(`font-family:\\s*"?${family!.replace(/ /g, '\\s')}"?;`).test(f) &&
      f.includes(`font-style:${style}`) &&
      new RegExp(`font-weight:(${weight}|\\d+ \\d+)`).test(f) &&
      range.test(f),
  )
  const url = face?.match(/url\(([^)]+\.woff2)\)/)?.[1]
  return url ? `<link rel="preload" href="${url}" as="font" type="font/woff2" crossorigin=""/>` : null
}

/** Убираем @font-face чужих направлений: CSS общий, а странице нужны только её шрифты. */
function keepOwnFonts(html: string): string {
  const m = html.match(/data-fonts="([^"]+)"/)
  if (!m) return html
  const own = new Set(m[1]!.split('|'))
  return html.replace(/@font-face\{[^}]*\}/g, (face) => {
    const family = face.match(/font-family:\s*"?([^";]+)"?;/)?.[1]?.trim()
    if (!family) return face
    return own.has(family.replace(/ Fallback$/, '')) ? face : ''
  })
}

/** Предзагрузка шрифтов, чьих @font-face на странице не осталось (Onest на чужих концептах), только отнимает канал у первого экрана. */
function dropOrphanFontPreloads(html: string): string {
  const used = new Set((html.match(/@font-face\{[^}]*\}/g) ?? []).flatMap((f) => [...f.matchAll(/url\(([^)]+)\)/g)].map((m) => m[1])))
  return html.replace(/<link rel="preload" href="([^"]+)" as="font"[^>]*\/?>/g, (link, href: string) => (used.has(href) ? link : ''))
}

/** Островок — в саму страницу: без лишнего запроса, весь JS страницы инлайн (планка качества: ≤ ~150 КБ без шрифтов). */
function inlineIslands(html: string): string {
  return html.replace(/<script type="module" src="\/islands\/([a-z-]+)\.js" data-concept=""><\/script>/g, (_, name: string) => {
    const js = fs.readFileSync(path.join(OUT, 'islands', `${name}.js`), 'utf8').trim()
    if (/<\/script/i.test(js)) throw new Error(`islands/${name}.js: внутри есть </script — встроить нельзя`)
    return `<script type="module" data-concept="">${js}</script>`
  })
}

let stripped = 0
for (const file of htmlFiles(OUT)) {
  const before = fs.readFileSync(file, 'utf8')
  let html = before.replace(/<script\b(?![^>]*\bdata-concept\b)[^>]*>[\s\S]*?<\/script>/g, '')
  html = html.replace(/<link rel="preload" as="script"[^>]*\/?>/g, '')
  html = dropOrphanFontPreloads(keepOwnFonts(html))
  html = inlineIslands(html)
  const preload = heroFontPreload(html)
  if (preload && !html.includes(preload)) html = html.replace(/<head>/, `<head>${preload}`)
  if (html !== before) {
    fs.writeFileSync(file, html)
    stripped++
  }
  if (/_next\/static\/chunks\/[^"]+\.js/.test(html)) throw new Error(`${file}: остался скрипт Next`)
}
console.log(`✓ strip-runtime: ${stripped} страниц без рантайма Next`)

import fs from 'node:fs'
import path from 'node:path'
import type { NicheId } from '@/core/types'
import { leads } from '@/leads'
import { launch } from './lib/browser'
import { shoot } from './shoot'

/**
 * Все концепты одной ниши рядом: первый экран на телефоне и десктоп.
 * Если два похожи — переделываем более слабый.
 *   npm run contact-sheet -- banquet
 */
const niche = (process.argv[2] ?? 'banquet') as NicheId
const list = leads.filter((l) => l.niche === niche)
if (!list.length) throw new Error(`В нише ${niche} нет лидов`)

const missing = list.filter((l) => !fs.existsSync(path.join('review', l.slug, 'hero.png'))).map((l) => l.slug)
if (missing.length) await shoot(missing, 'review')

const img = (file: string) => `data:image/png;base64,${fs.readFileSync(file).toString('base64')}`
const cards = list
  .map(
    (l) => `<figure>
  <div class="row"><img class="phone" src="${img(path.join('review', l.slug, 'hero.png'))}"><img class="desk" src="${img(path.join('review', l.slug, 'desktop.png'))}"></div>
  <figcaption><b>${l.name}</b> · ${l.direction}</figcaption>
</figure>`,
  )
  .join('\n')

const html = `<!doctype html><meta charset="utf-8"><style>
body{margin:0;padding:40px;background:#e9e9e6;font:16px system-ui;color:#222}
h1{margin:0 0 28px;font-size:22px}
.grid{display:grid;gap:40px}
.row{display:flex;gap:20px;align-items:flex-start}
.phone{width:300px;border-radius:18px;box-shadow:0 2px 12px rgba(0,0,0,.15)}
.desk{width:720px;border-radius:8px;box-shadow:0 2px 12px rgba(0,0,0,.15)}
figure{margin:0}figcaption{margin-top:12px}
</style><h1>${niche}: ${list.length} концепт(а)</h1><div class="grid">${cards}</div>`

const browser = await launch()
const page = await browser.newPage({ viewport: { width: 1120, height: 800 } })
await page.setContent(html, { waitUntil: 'load' })
const out = path.join('review', `${niche}-contact-sheet.png`)
await page.screenshot({ path: out, fullPage: true })
await browser.close()
console.log(`✓ ${out}`)

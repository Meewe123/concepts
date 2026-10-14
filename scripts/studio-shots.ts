import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { getLead } from '@/leads'
import { studio } from '@/studio/content'
import { launch, settle } from './lib/browser'
import { serveOut } from './lib/serve'

/**
 * Скриншоты витрин для страницы студии: телефон 390×1300 (×1.5), время Ташкента — 12:40 (казан полный).
 * public/studio/<slug>.<lang>.avif и .webp. Нужна публичная сборка (npm run build) и python3 с Pillow.
 *   npm run studio-shots
 */
const OUT = 'public/studio'
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'studio-'))
fs.mkdirSync(OUT, { recursive: true })

const server = await serveOut()
const browser = await launch()
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 1300 }, deviceScaleFactor: 1.5, isMobile: true, hasTouch: true })
  const page = await ctx.newPage()
  await page.clock.setFixedTime(new Date('2026-10-14T12:40:00+05:00'))
  for (const { slug } of studio.showcases.items) {
    for (const lang of getLead(slug).langs) {
      await page.goto(`${server.url}/c/${slug}${lang === 'ru' ? '' : `/${lang}`}?me=1`, { waitUntil: 'networkidle' })
      await settle(page)
      await page.waitForTimeout(400)
      const png = path.join(tmp, `${slug}.${lang}.png`)
      await page.screenshot({ path: png })
      for (const [ext, q] of [
        ['avif', 55],
        ['webp', 72],
      ] as const) {
        const file = path.join(OUT, `${slug}.${lang}.${ext}`)
        execFileSync('python3', ['-c', 'import sys; from PIL import Image; Image.open(sys.argv[1]).convert("RGB").save(sys.argv[2], quality=int(sys.argv[3]))', png, file, String(q)])
        console.log(`✓ ${file} — ${Math.round(fs.statSync(file).size / 1024)} КБ`)
      }
    }
  }
} finally {
  await browser.close()
  await server.close()
  fs.rmSync(tmp, { recursive: true, force: true })
}

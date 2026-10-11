import fs from 'node:fs'
import path from 'node:path'
import type { Locale } from '@/core/types'
import { getLead, leads } from '@/leads'
import { DESKTOP, launch, PHONE, settle } from './lib/browser'
import { serveOut } from './lib/serve'

const LOCALE: Record<Locale, string> = { ru: 'ru-RU', uz: 'uz-UZ' }

/**
 * Скриншоты концепта из готовой сборки out/:
 *   hero.png — первый экран 390×844, full.png — вся страница на телефоне, desktop.png — 1440×900.
 * npm run shoot -- <slug>|--all [--out review|pitch] [--lang uz]
 */
export async function shoot(slugs: string[], outRoot: string, locale: Locale = 'ru'): Promise<void> {
  const server = await serveOut()
  const browser = await launch()
  try {
    for (const slug of slugs) {
      const lead = getLead(slug)
      const url = `${server.url}/c/${slug}${locale === 'ru' ? '' : `/${locale}`}?me=1`
      const dir = path.join(outRoot, slug)
      fs.mkdirSync(dir, { recursive: true })
      const suffix = locale === 'ru' ? '' : `.${locale}`

      const phone = await browser.newContext({ viewport: PHONE, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: LOCALE[locale], timezoneId: 'Asia/Tashkent' })
      const page = await phone.newPage()
      await page.goto(url, { waitUntil: 'networkidle' })
      await settle(page)
      await page.screenshot({ path: path.join(dir, `hero${suffix}.png`) })
      // Нижняя панель прилипает к краю окна; на склеенном снимке всей страницы она бы висела посреди
      await page.addStyleTag({ content: '.sticky-bar{display:none!important}' })
      await page.screenshot({ path: path.join(dir, `full${suffix}.png`), fullPage: true })
      await phone.close()

      const desk = await browser.newContext({ viewport: DESKTOP, deviceScaleFactor: 1, locale: LOCALE[locale], timezoneId: 'Asia/Tashkent' })
      const dpage = await desk.newPage()
      await dpage.goto(url, { waitUntil: 'networkidle' })
      await settle(dpage)
      await dpage.screenshot({ path: path.join(dir, `desktop${suffix}.png`) })
      await desk.close()
      console.log(`✓ ${lead.name} (${locale}) → ${dir}`)
    }
  } finally {
    await browser.close()
    await server.close()
  }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.filename)
if (isMain) {
  const args = process.argv.slice(2)
  const all = args.includes('--all')
  const out = args.includes('--out') ? args[args.indexOf('--out') + 1]! : 'review'
  const lang = (args.includes('--lang') ? args[args.indexOf('--lang') + 1] : 'ru') as Locale
  const slugs = all ? leads.map((l) => l.slug) : args.filter((a) => !a.startsWith('--') && a !== out && a !== lang)
  if (!fs.existsSync('out')) throw new Error('Нет out/ — сначала npm run build')
  await shoot(slugs, out, lang)
}

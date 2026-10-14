import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { getLead, leads } from '@/leads'
import { launch, settle } from './lib/browser'
import { serveOut } from './lib/serve'

/**
 * Превью ссылки 1200×630: служебная страница /og/<slug>/<lang> → public/og/<slug>.png (и .uz.png).
 * Служебные страницы есть только в сборке инструментов (CONCEPTS_TOOLS=1), поэтому сначала она,
 * а публичную сборку нужно запустить заново после рендера.
 *   npm run og -- <slug>|--all|--studio
 */
export async function renderOg(slugs: string[], studioToo = false): Promise<void> {
  execSync('npm run build', { stdio: 'inherit', env: { ...process.env, CONCEPTS_TOOLS: '1' } })
  const server = await serveOut()
  const browser = await launch()
  try {
    fs.mkdirSync('public/og', { recursive: true })
    const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
    const page = await ctx.newPage()
    // Страница студии: /og-studio/<lang> → public/og/studio.png и studio.uz.png
    if (studioToo) {
      for (const lang of ['ru', 'uz'] as const) {
        await page.goto(`${server.url}/og-studio/${lang}?me=1`, { waitUntil: 'networkidle' })
        await settle(page)
        const file = path.join('public/og', lang === 'ru' ? 'studio.png' : `studio.${lang}.png`)
        await page.locator('#og').screenshot({ path: file })
        console.log(`✓ ${file}`)
      }
    }
    for (const slug of slugs) {
      const lead = getLead(slug)
      for (const lang of lead.langs) {
        await page.goto(`${server.url}/og/${slug}/${lang}?me=1`, { waitUntil: 'networkidle' })
        await settle(page)
        const file = path.join('public/og', lang === 'ru' ? `${slug}.png` : `${slug}.${lang}.png`)
        await page.locator('#og').screenshot({ path: file })
        console.log(`✓ ${file}`)
      }
    }
  } finally {
    await browser.close()
    await server.close()
  }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.filename)
if (isMain) {
  const args = process.argv.slice(2)
  const slugs = args.includes('--all') ? leads.map((l) => l.slug) : args.filter((a) => !a.startsWith('--'))
  await renderOg(slugs, args.includes('--studio') || args.includes('--all'))
  console.log('Готово. Теперь npm run build — чтобы картинки попали в публичную сборку.')
}

import fs from 'node:fs'
import { chromium, type Browser, type Page } from 'playwright'

/** Chromium из контейнера (/opt/pw-browsers) или из PLAYWRIGHT_CHROMIUM; иначе — встроенный Playwright. */
export async function launch(): Promise<Browser> {
  const candidates = [process.env.PLAYWRIGHT_CHROMIUM, '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'].filter(Boolean) as string[]
  const executablePath = candidates.find((p) => fs.existsSync(p))
  return chromium.launch(executablePath ? { executablePath } : {})
}

/** Ждём шрифты и разовые анимации появления (кроме анимаций по скроллу). */
export async function settle(page: Page): Promise<void> {
  await page.evaluate(async () => {
    await document.fonts.ready
    const once = document
      .getAnimations()
      .filter((a) => a.timeline === document.timeline && a.effect?.getTiming().iterations !== Infinity)
    await Promise.all(once.map((a) => a.finished.catch(() => undefined)))
  })
  await page.waitForTimeout(150)
}

export const PHONE = { width: 390, height: 844 }
export const DESKTOP = { width: 1440, height: 900 }

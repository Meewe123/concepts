import type { CSSProperties } from 'react'
import type { Locale } from '@/core/types'
import { STUDIO_NAME } from '@/site.config'
import { studio } from '@/studio/content'
import { Mark } from '@/studio/StudioPage'
import { css } from '@/studio/style'

// Превью ссылки на страницу студии 1200×630 — для scripts/og.ts --studio. В публичную сборку не попадает (*.dev.tsx).
type Props = { params: Promise<{ lang: Locale }> }

export const dynamicParams = false

export function generateStaticParams() {
  return [{ lang: 'ru' }, { lang: 'uz' }]
}

export default async function StudioOg({ params }: Props) {
  const { lang } = await params
  const ru = lang === 'ru'
  return (
    <div className="st" data-fonts="Onest">
      <style dangerouslySetInnerHTML={{ __html: css + OG_CSS }} />
      <div id="og" className="st-og">
        <div className="st-og-text">
          <p className="st-og-logo">
            <Mark />
            {STUDIO_NAME}
          </p>
          <p className="st-og-h">
            {studio.title[lang].split(' ').flatMap((w, i) => [
              i > 0 ? ' ' : '',
              <span key={i} className="whitespace-nowrap">
                {w}
              </span>,
            ])}
          </p>
          <p className="st-og-sub">{ru ? 'Русский и узбекский · рабочий сайт за 7 дней · концепт бесплатно' : 'Rus va oʻzbek tillari · sayt 7 kunda · konsept bepul'}</p>
        </div>
        <div className="st-og-phones">
          {studio.showcases.items.map((it, i) => (
            <span key={it.slug} className="st-phone" style={{ '--i': i } as CSSProperties}>
              <span className="st-screen">
                <img src={`/studio/${it.slug}.${lang}.webp`} alt="" />
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const OG_CSS = `
.st-og { position: relative; width: 1200px; height: 630px; overflow: hidden; background: radial-gradient(70% 80% at 85% 10%, #ffffff, transparent 70%), var(--paper); }
.st-og-text { position: absolute; top: 64px; left: 72px; width: 540px; }
.st-og-logo { display: flex; align-items: center; gap: 14px; font-size: 34px; font-weight: 760; letter-spacing: -0.02em; }
.st-og-logo .st-mark { width: 44px; height: 44px; }
.st-og-h { margin-top: 44px; font-size: 54px; font-weight: 770; line-height: 1.04; letter-spacing: -0.04em; }
.st-og-sub { margin-top: 30px; font-size: 25px; line-height: 1.35; color: var(--ink-2); }
.st-og-phones { position: absolute; top: 70px; right: 40px; width: 520px; height: 640px; }
.st-og-phones .st-phone { position: absolute; top: calc(var(--i) * 36px); left: calc(var(--i) * 150px); width: 230px; transform: rotate(calc((var(--i) - 1) * 6deg)); }
.st-og-phones .st-screen img { animation: none; }
`

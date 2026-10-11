import type { ReactNode } from 'react'
import type { Locale } from '@/core/types'
import type { Direction } from '@/directions/types'

/**
 * Обёртка концепта: шрифты и CSS только своего направления, язык страницы.
 * Корневой layout общий и объявляет lang="ru"; для узбекской версии язык выставляется
 * на обёртке и, до отрисовки, на <html>.
 */
export function ConceptShell({ dir, locale, children }: { dir: Direction; locale: Locale; children: ReactNode }) {
  return (
    <div
      className={`concept ${dir.fontClass}`}
      data-direction={dir.id}
      data-hero-font={`${dir.heroFont.family}|${dir.heroFont.weight}|${dir.heroFont.style}`}
      data-fonts={dir.fontFamilies.join('|')}
      lang={locale}
    >
      <style dangerouslySetInnerHTML={{ __html: dir.css }} />
      {locale !== 'ru' && <script data-concept="" dangerouslySetInnerHTML={{ __html: `document.documentElement.lang='${locale}'` }} />}
      {children}
    </div>
  )
}

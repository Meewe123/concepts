import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import type { Locale } from '@/core/types'
import { studioMeta } from './content'

/** Метаданные страницы студии; превью — public/og/studio.png (и .uz.png), их рендерит npm run og -- --studio. */
export function studioMetadata(locale: Locale): Metadata {
  const { title, description } = studioMeta(locale)
  const og = locale === 'ru' ? '/og/studio.png' : '/og/studio.uz.png'
  const images = fs.existsSync(path.join(process.cwd(), 'public', og)) ? [{ url: og, width: 1200, height: 630, alt: title }] : undefined
  const url = locale === 'ru' ? '/' : '/uz'
  return {
    title,
    description,
    alternates: { canonical: url, languages: { ru: '/', uz: '/uz' } },
    openGraph: { type: 'website', siteName: 'Yetti kun', title, description, url, locale: locale === 'ru' ? 'ru_RU' : 'uz_UZ', images },
    twitter: { card: 'summary_large_image', title, description, images: images?.map((i) => i.url) },
  }
}

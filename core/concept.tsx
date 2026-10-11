import fs from 'node:fs'
import path from 'node:path'
import type { Metadata, Viewport } from 'next'
import { getDirection } from '@/directions'
import { getNiche } from '@/niches'
import { ConceptShell } from './components/ConceptShell'
import { conceptPath, ogImagePath } from './paths'
import type { Lead, Locale } from './types'

export function conceptMetadata(lead: Lead, locale: Locale): Metadata {
  const { title, description } = getNiche(lead.niche).meta(lead, locale)
  const og = ogImagePath(lead, locale)
  const hasOg = fs.existsSync(path.join(process.cwd(), 'public', og))
  const images = hasOg ? [{ url: og, width: 1200, height: 630, alt: title }] : undefined
  return {
    title,
    description,
    alternates: {
      canonical: conceptPath(lead, locale),
      languages: Object.fromEntries(lead.langs.map((l) => [l, conceptPath(lead, l)])),
    },
    openGraph: {
      type: 'website',
      siteName: locale === 'ru' ? 'Концепт сайта' : 'Sayt konsepti',
      title,
      description,
      url: conceptPath(lead, locale),
      locale: locale === 'ru' ? 'ru_RU' : 'uz_UZ',
      images,
    },
    twitter: { card: 'summary_large_image', title, description, images: images?.map((i) => i.url) },
  }
}

export function conceptViewport(lead: Lead): Viewport {
  return { themeColor: getDirection(lead.direction).themeColor }
}

export function ConceptPage({ lead, locale }: { lead: Lead; locale: Locale }) {
  const dir = getDirection(lead.direction)
  const { Page } = getNiche(lead.niche)
  return (
    <ConceptShell dir={dir} locale={locale}>
      <Page lead={lead} locale={locale} dir={dir} />
    </ConceptShell>
  )
}

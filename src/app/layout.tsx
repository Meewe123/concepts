import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Analytics } from '@/core/analytics'
import { onest } from '@/core/fonts'
import { SITE_URL } from '@/site.config'
import './globals.css'

export const metadata: Metadata = {
  ...(SITE_URL ? { metadataBase: new URL(SITE_URL) } : {}),
  title: 'Сайты для бизнеса в Ташкенте',
  robots: { index: false, follow: false, nocache: true },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={onest.variable}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

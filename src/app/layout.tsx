import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Onest } from 'next/font/google'
import { Analytics } from '@/core/analytics'
import { SITE_URL } from '@/site.config'
import './globals.css'

const onest = Onest({ subsets: ['latin', 'cyrillic'], weight: ['400', '600'], variable: '--font-onest' })

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

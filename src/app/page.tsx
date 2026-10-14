import type { Viewport } from 'next'
import { StudioPage } from '@/studio/StudioPage'
import { studioMetadata } from '@/studio/meta'

// Страница студии — визитка из профиля Telegram. Реальных компаний здесь нет, только витрины.
export const metadata = studioMetadata('ru')
export const viewport: Viewport = { themeColor: '#f4f2ec' }

export default function Home() {
  return <StudioPage locale="ru" />
}

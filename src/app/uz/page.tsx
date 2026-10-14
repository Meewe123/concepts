import type { Viewport } from 'next'
import { StudioPage } from '@/studio/StudioPage'
import { studioMetadata } from '@/studio/meta'

export const metadata = studioMetadata('uz')
export const viewport: Viewport = { themeColor: '#f4f2ec' }

export default function HomeUz() {
  return <StudioPage locale="uz" />
}

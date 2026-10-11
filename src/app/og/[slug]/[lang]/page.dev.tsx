import { ConceptShell } from '@/core/components/ConceptShell'
import type { Locale } from '@/core/types'
import { getDirection } from '@/directions'
import { getLead, leads } from '@/leads'

// Служебная страница 1200×630 для scripts/og.ts. В публичную сборку не попадает (*.dev.tsx).
type Props = { params: Promise<{ slug: string; lang: Locale }> }

export const dynamicParams = false

export function generateStaticParams() {
  return leads.flatMap((l) => l.langs.map((lang) => ({ slug: l.slug, lang })))
}

export default async function OgPage({ params }: Props) {
  const { slug, lang } = await params
  const lead = getLead(slug)
  const dir = getDirection(lead.direction)
  return (
    <ConceptShell dir={dir} locale={lang}>
      <div id="og" className="h-[630px] w-[1200px]">
        <dir.Og lead={lead} locale={lang} />
      </div>
    </ConceptShell>
  )
}

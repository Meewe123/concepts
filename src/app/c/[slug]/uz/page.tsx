import { ConceptPage, conceptMetadata, conceptViewport } from '@/core/concept'
import { getLead, leads } from '@/leads'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return leads.filter((l) => l.langs.includes('uz')).map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: Props) {
  return conceptMetadata(getLead((await params).slug), 'uz')
}

export async function generateViewport({ params }: Props) {
  return conceptViewport(getLead((await params).slug))
}

export default async function Page({ params }: Props) {
  return <ConceptPage lead={getLead((await params).slug)} locale="uz" />
}

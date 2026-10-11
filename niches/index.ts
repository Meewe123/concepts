import type { FC } from 'react'
import type { Lead, Locale, NicheId } from '@/core/types'
import type { Direction } from '@/directions/types'
import { BanquetPage } from './banquet/BanquetPage'
import { banquetMeta } from './banquet/meta'

export interface NicheModule {
  Page: FC<{ lead: Lead; locale: Locale; dir: Direction }>
  meta: (lead: Lead, locale: Locale) => { title: string; description: string }
}

const niches: Partial<Record<NicheId, NicheModule>> = {
  banquet: { Page: BanquetPage, meta: banquetMeta },
}

export function getNiche(id: NicheId): NicheModule {
  const n = niches[id]
  if (!n) throw new Error(`Ниша ${id} ещё не сделана`)
  return n
}

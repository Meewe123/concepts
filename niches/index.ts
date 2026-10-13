import type { FC } from 'react'
import type { Lead, Locale, NicheId } from '@/core/types'
import type { Direction } from '@/directions/types'
import { AutoPage } from './auto/AutoPage'
import { autoMeta } from './auto/meta'
import { BanquetPage } from './banquet/BanquetPage'
import { banquetMeta } from './banquet/meta'
import { BeautyPage } from './beauty/BeautyPage'
import { beautyMeta } from './beauty/meta'
import { DentalPage } from './dental/DentalPage'
import { dentalMeta } from './dental/meta'
import { EducationPage } from './education/EducationPage'
import { educationMeta } from './education/meta'
import { petshopMeta } from './petshop/meta'
import { PetshopPage } from './petshop/PetshopPage'
import { vetMeta } from './vet/meta'
import { VetPage } from './vet/VetPage'

export interface NicheModule {
  Page: FC<{ lead: Lead; locale: Locale; dir: Direction }>
  meta: (lead: Lead, locale: Locale) => { title: string; description: string }
}

const niches: Partial<Record<NicheId, NicheModule>> = {
  banquet: { Page: BanquetPage, meta: banquetMeta },
  vet: { Page: VetPage, meta: vetMeta },
  petshop: { Page: PetshopPage, meta: petshopMeta },
  education: { Page: EducationPage, meta: educationMeta },
  dental: { Page: DentalPage, meta: dentalMeta },
  beauty: { Page: BeautyPage, meta: beautyMeta },
  auto: { Page: AutoPage, meta: autoMeta },
}

export function getNiche(id: NicheId): NicheModule {
  const n = niches[id]
  if (!n) throw new Error(`Ниша ${id} ещё не сделана`)
  return n
}

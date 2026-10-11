import type { SchemeSkin } from '@/niches/banquet/skin'
import { scheme as crystalFacet } from './crystal-facet/scheme'
import { scheme as suzaniNight } from './suzani-night/scheme'

/**
 * Схемы зала по направлениям. Отдельно от directions/index.ts: этот модуль попадает в островок,
 * поэтому здесь нет next/font и серверных компонентов.
 */
export const schemes: Record<string, SchemeSkin> = {
  'suzani-night': suzaniNight,
  'crystal-facet': crystalFacet,
}

import { crystalFacet } from './crystal-facet'
import { suzaniNight } from './suzani-night'
import type { Direction } from './types'

export const directions: Record<string, Direction> = {
  [suzaniNight.id]: suzaniNight,
  [crystalFacet.id]: crystalFacet,
}

export function getDirection(id: string): Direction {
  const d = directions[id]
  if (!d) throw new Error(`Нет направления «${id}»`)
  return d
}

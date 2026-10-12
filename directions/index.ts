import { britishTextbook } from './british-textbook'
import { campusBold } from './campus-bold'
import { clinicalSilk } from './clinical-silk'
import { crimsonVelvet } from './crimson-velvet'
import { crystalFacet } from './crystal-facet'
import { familyWarm } from './family-warm'
import { gardenLight } from './garden-light'
import { marbleBrass } from './marble-brass'
import { marketFresh } from './market-fresh'
import { nightVet } from './night-vet'
import { playfulGeometry } from './playful-geometry'
import { suzaniNight } from './suzani-night'
import type { Direction } from './types'
import { warmPaper } from './warm-paper'

export const directions: Record<string, Direction> = {
  [suzaniNight.id]: suzaniNight,
  [crystalFacet.id]: crystalFacet,
  [playfulGeometry.id]: playfulGeometry,
  [britishTextbook.id]: britishTextbook,
  [warmPaper.id]: warmPaper,
  [marketFresh.id]: marketFresh,
  [nightVet.id]: nightVet,
  [campusBold.id]: campusBold,
  [crimsonVelvet.id]: crimsonVelvet,
  [gardenLight.id]: gardenLight,
  [marbleBrass.id]: marbleBrass,
  [clinicalSilk.id]: clinicalSilk,
  [familyWarm.id]: familyWarm,
}

export function getDirection(id: string): Direction {
  const d = directions[id]
  if (!d) throw new Error(`Нет направления «${id}»`)
  return d
}

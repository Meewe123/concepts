import { britishTextbook } from './british-textbook'
import { campusBold } from './campus-bold'
import { chinni } from './chinni'
import { clinicalSilk } from './clinical-silk'
import { confettiPop } from './confetti-pop'
import { crimsonVelvet } from './crimson-velvet'
import { crystalFacet } from './crystal-facet'
import { editorialSmile } from './editorial-smile'
import { familyWarm } from './family-warm'
import { gardenLight } from './garden-light'
import { ironGrid } from './iron-grid'
import { glossyEditorial } from './glossy-editorial'
import { marbleBrass } from './marble-brass'
import { marketFresh } from './market-fresh'
import { nightVet } from './night-vet'
import { playfulGeometry } from './playful-geometry'
import { qozon } from './qozon'
import { ustara } from './ustara'
import { retroGastronom } from './retro-gastronom'
import { showroomChrome } from './showroom-chrome'
import { soundSilence } from './sound-silence'
import { spaWhisper } from './spa-whisper'
import { suzaniNight } from './suzani-night'
import { tashkentMosaic } from './tashkent-mosaic'
import type { Direction } from './types'
import { warmPaper } from './warm-paper'
import { workshopConcrete } from './workshop-concrete'
import { zooScales } from './zoo-scales'

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
  [glossyEditorial.id]: glossyEditorial,
  [confettiPop.id]: confettiPop,
  [spaWhisper.id]: spaWhisper,
  [workshopConcrete.id]: workshopConcrete,
  [editorialSmile.id]: editorialSmile,
  [tashkentMosaic.id]: tashkentMosaic,
  [zooScales.id]: zooScales,
  [qozon.id]: qozon,
  [ustara.id]: ustara,
  [chinni.id]: chinni,
  [showroomChrome.id]: showroomChrome,
  [retroGastronom.id]: retroGastronom,
  [soundSilence.id]: soundSilence,
  [ironGrid.id]: ironGrid,
}

export function getDirection(id: string): Direction {
  const d = directions[id]
  if (!d) throw new Error(`Нет направления «${id}»`)
  return d
}

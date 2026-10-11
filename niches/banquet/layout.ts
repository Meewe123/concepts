import { r1 } from '@/core/random'

export interface HallLayout {
  width: number
  height: number
  stageBottom: number
  floor: { x: number; y: number; w: number; h: number }
  /** Столы в порядке заполнения: ближние к сцене — первыми. */
  tables: { x: number; y: number; r: number }[]
}

const W = 360
const PAD = 22
const STAGE = 48

/**
 * Раскладка круглых столов по 10 человек: шахматный порядок рядов,
 * танцпол перед сценой, заполнение от сцены к дальним рядам.
 */
export function layoutHall(capacity: number): HallLayout {
  const count = Math.ceil(capacity / 10)
  const cols = count <= 16 ? 4 : count <= 42 ? 6 : 8
  const s = (W - PAD * 2) / cols
  const rowStep = s * 0.9
  const r = s * 0.32
  const top = PAD + STAGE + 16
  const floorRows = cols === 8 ? 3 : 2
  const floorHalf = cols === 4 ? s * 0.75 : s * 1.1

  const spots: { x: number; y: number }[] = []
  let row = 0
  while (spots.length < count) {
    const odd = row % 2 === 1
    const n = odd ? cols - 1 : cols
    for (let c = 0; c < n && spots.length < count; c++) {
      const x = PAD + s / 2 + (odd ? s / 2 : 0) + c * s
      const y = top + s / 2 + row * rowStep
      if (row < floorRows && Math.abs(x - W / 2) < floorHalf) continue
      spots.push({ x, y })
    }
    row++
  }

  const cx = W / 2
  const tables = spots
    .map((p) => ({ ...p, d: Math.hypot(p.x - cx, (p.y - PAD) * 0.8) }))
    .sort((a, b) => a.d - b.d)
    .map((p) => ({ x: r1(p.x), y: r1(p.y), r: r1(r) }))

  return {
    width: W,
    height: r1(top + (row - 1) * rowStep + s + PAD),
    stageBottom: PAD + STAGE,
    floor: { x: r1(cx - floorHalf + 4), y: r1(top + 4), w: r1(floorHalf * 2 - 8), h: r1(floorRows * rowStep - 8) },
    tables,
  }
}

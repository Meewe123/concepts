/** Детерминированный генератор: одна и та же строка — одна и та же фактура при каждой сборке. */
export function seeded(seed: string | number): () => number {
  let h = typeof seed === 'number' ? seed >>> 0 : 2166136261
  if (typeof seed === 'string') {
    for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619)
  }
  return () => {
    h = (h + 0x6d2b79f5) >>> 0
    let t = h
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Округление координат SVG: короче разметка, стабильнее снимки. */
export const r1 = (n: number) => Math.round(n * 10) / 10

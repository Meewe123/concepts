import fs from 'node:fs'
import { build } from 'esbuild'

/**
 * Островки — единственный JS на страницах концептов. Собираются до next build в public/islands/,
 * чтобы попасть в out/ как обычная статика (и работать в next dev).
 */
const entries = {
  banquet: 'niches/banquet/island.ts',
  vet: 'niches/vet/island.ts',
  education: 'niches/education/island.ts',
  dental: 'niches/dental/island.ts',
  beauty: 'niches/beauty/island.ts',
  petshop: 'niches/petshop/island.ts',
  auto: 'niches/auto/island.ts',
  restaurant: 'niches/restaurant/island.ts',
  wellness: 'niches/wellness/island.ts',
}

const result = await build({
  entryPoints: entries,
  bundle: true,
  minify: true,
  format: 'esm',
  target: ['chrome111', 'edge111', 'firefox111', 'safari16.4'],
  outdir: 'public/islands',
  metafile: true,
  logLevel: 'warning',
})

for (const [file, info] of Object.entries(result.metafile.outputs)) {
  console.log(`✓ ${file} — ${(info.bytes / 1024).toFixed(1)} КБ`)
}
for (const name of Object.keys(entries)) {
  if (!fs.existsSync(`public/islands/${name}.js`)) throw new Error(`Островок ${name} не собрался`)
}

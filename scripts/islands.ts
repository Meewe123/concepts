import fs from 'node:fs'
import { build } from 'esbuild'

/**
 * Островки — единственный JS на страницах концептов. Собираются до next build в public/islands/,
 * чтобы попасть в out/ как обычная статика (и работать в next dev).
 */
const entries = { banquet: 'niches/banquet/island.ts' }

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
if (!fs.existsSync('public/islands/banquet.js')) throw new Error('Островок не собрался')

import type { NextConfig } from 'next'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'

export default function config(phase: string): NextConfig {
  // Служебные страницы (*.dev.tsx: /internal, /og/[slug]) существуют только в dev
  // и в режиме инструментов; в публичную сборку out/ они не попадают.
  const tools = phase === PHASE_DEVELOPMENT_SERVER || process.env.CONCEPTS_TOOLS === '1'

  return {
    output: 'export',
    pageExtensions: tools ? ['dev.tsx', 'tsx', 'ts'] : ['tsx', 'ts'],
    images: { unoptimized: true },
    // CSS прямо в <head>: на 4G это минус один блокирующий запрос до первой отрисовки
    experimental: { inlineCss: true },
    devIndicators: false,
  }
}

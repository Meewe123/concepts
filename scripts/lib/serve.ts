import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import zlib from 'node:zlib'

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
}

/**
 * Статический сервер для out/ с теми же правилами, что у воркера:
 * /c/x → out/c/x.html, /dir/ → out/dir/index.html, иначе 404.html с кодом 404.
 */
export function serveOut(dir = 'out', port = 0): Promise<{ url: string; close: () => Promise<void> }> {
  const root = path.resolve(dir)
  const server = http.createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname)
    const candidates = [pathname, `${pathname}.html`, path.join(pathname, 'index.html')]
    for (const c of candidates) {
      const file = path.join(root, c)
      if (file.startsWith(root) && fs.existsSync(file) && fs.statSync(file).isFile()) {
        const type = TYPES[path.extname(file)] ?? 'application/octet-stream'
        const headers: Record<string, string> = { 'content-type': type }
        if (pathname.startsWith('/_next/static/')) headers['cache-control'] = 'public, max-age=31536000, immutable'
        // Как у Cloudflare: текст сжимается brotli, иначе замеры скорости врут в худшую сторону
        const compressible = /text|javascript|json|svg/.test(type)
        if (compressible && /\bbr\b/.test(String(req.headers['accept-encoding'] ?? ''))) {
          headers['content-encoding'] = 'br'
          res.writeHead(200, headers)
          fs.createReadStream(file).pipe(zlib.createBrotliCompress()).pipe(res)
        } else {
          res.writeHead(200, headers)
          fs.createReadStream(file).pipe(res)
        }
        return
      }
    }
    res.writeHead(404, { 'content-type': TYPES['.html']! })
    fs.createReadStream(path.join(root, '404.html')).pipe(res)
  })
  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => {
      const addr = server.address()
      const p = typeof addr === 'object' && addr ? addr.port : port
      resolve({ url: `http://127.0.0.1:${p}`, close: () => new Promise((r) => server.close(() => r())) })
    })
  })
}

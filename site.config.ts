/**
 * Публичный адрес сайта — воркер `concepts` на workers.dev:
 *   https://concepts.<поддомен>.workers.dev
 * Поддомен аккаунта виден в панели Cloudflare: Workers & Pages → concepts → Settings → Domains & Routes.
 * Если позже появится свой домен, его можно задать переменной окружения SITE_URL при сборке.
 */
export const WORKERS_SUBDOMAIN = '' // TODO: поддомен аккаунта Cloudflare

export const SITE_URL: string =
  process.env.SITE_URL ?? (WORKERS_SUBDOMAIN ? `https://concepts.${WORKERS_SUBDOMAIN}.workers.dev` : '')

/** Абсолютная ссылка для сообщений, link.txt и og:image. Без адреса сайта такие ссылки собирать нельзя. */
export function absoluteUrl(path: string): string {
  if (!SITE_URL) {
    throw new Error('Не задан адрес сайта: впишите WORKERS_SUBDOMAIN в site.config.ts или задайте SITE_URL')
  }
  return new URL(path, SITE_URL).toString()
}

/**
 * Токен сайта в Cloudflare Web Analytics (публичный: он всё равно виден в коде страницы).
 * Пока пустой, счётчик не подключается.
 */
export const CF_BEACON_TOKEN = '' // TODO: токен из Web Analytics для concepts.<поддомен>.workers.dev

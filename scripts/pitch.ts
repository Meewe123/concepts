import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { conceptPath } from '@/core/paths'
import type { Lead, Locale } from '@/core/types'
import { getLead, leads } from '@/leads'
import { formatPhone, instagramHref, telegramHref, whatsappHref } from '@/core/format'
import { absoluteUrl } from '@/site.config'
import { renderOg } from './og'
import { shoot } from './shoot'

/**
 * Набор для отправки pitch/<slug>/: hero.png, full.png, desktop.png, og.png, link.txt,
 * message-ru.txt, message-uz.txt, notes.md.
 *   npm run pitch -- <slug> [<slug>…] | --all  [--no-og]
 */

const MAX = 350
const FORBIDDEN = [
  'мы делаем сайты',
  'уникальное предложение',
  'добро пожаловать',
  'команда профессионалов',
  'индивидуальный подход',
  'высокое качество по доступным ценам',
  'наша миссия',
  'lorem',
]

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const low = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)
const dot = (s: string) => s.replace(/[.\s]+$/, '')

/** Куда отправлять: Telegram, если есть; иначе Instagram, WhatsApp; иначе — что известно. */
export function sendTo(lead: Lead): string {
  const out: string[] = []
  if (lead.telegram) out.push(`Telegram: ${telegramHref(lead.telegram)}`)
  if (lead.instagram) out.push(`Instagram: ${instagramHref(lead.instagram)}`)
  if (lead.whatsapp) out.push(`WhatsApp: ${whatsappHref(lead.whatsapp)}`)
  if (!lead.telegram) out.unshift('Telegram не найден')
  if (!lead.telegram && !lead.instagram && !lead.whatsapp) out.push(`${lead.channel === 'facebook' ? 'Facebook — ссылка из таблицы заказчика; ' : ''}звонок: ${formatPhone(lead.phones[0]!)}`)
  return out.join(' · ')
}

export function linkFor(lead: Lead, locale: Locale): string {
  return absoluteUrl(conceptPath(lead, locale))
}

/** Текст сообщения под contactStatus лида. null — писать не нужно (ответили или отказались). */
export function message(lead: Lead, locale: Locale): string | null {
  const link = linkFor(lead, locale)
  // свой текст лида — вместо шаблона (заказчик пишет короче и живее шаблонов)
  const own = lead.pitchText?.[locale]
  if (own) return own.replace('{link}', link)
  const pitch = dot(lead.signaturePitch[locale])
  const hook = locale === 'ru' ? lead.hook : lead.hookUz
  const needHook = () => {
    if (!hook) throw new Error(`${lead.slug}: для статуса ${lead.contactStatus} на ${locale} нужен хук (hook / hookUz)`)
    return cap(dot(hook))
  }
  const ru = locale === 'ru'
  const name = lead.messageName?.[locale] ?? lead.name
  switch (lead.contactStatus) {
    case 'not-contacted':
      return ru
        ? `Здравствуйте! ${needHook()}. Набросал, как мог бы выглядеть сайт ${name}: ${link} — это концепт, удобнее смотреть с телефона. Если понравится, доведу до рабочего сайта с вашими фото и ценами за неделю.`
        : `Assalomu alaykum! ${needHook()}. ${name} sayti qanday boʻlishi mumkinligini chizib koʻrdim: ${link} — bu konsept, telefonda koʻrish qulayroq. Yoqsa, bir haftada suratlaringiz va narxlaringiz bilan ishlaydigan saytga aylantiraman.`
    case 'unread':
      return ru
        ? `Здравствуйте! ${needHook()}. Набросал концепт сайта ${name}: ${link} — удобнее смотреть с телефона.`
        : `Assalomu alaykum! ${needHook()}. ${name} uchun sayt konseptini chizdim: ${link} — telefonda koʻrish qulayroq.`
    case 'forwarded':
      return ru
        ? `Добрый день! Ваш контакт мне дали в ${lead.name}. Сделал концепт сайта: ${link} — ${low(pitch)}. Если интересно, доведу до рабочего сайта за неделю.`
        : `Assalomu alaykum! Kontaktingizni ${lead.name}da berishdi. Sayt konseptini tayyorladim: ${link}. ${pitch}. Qiziq boʻlsa, bir haftada ishlaydigan saytga aylantiraman.`
    case 'read-silent':
    case 'sent':
      return ru
        ? `Добрый день! Чтобы не объяснять на словах — сделал концепт сайта ${name}: ${link}. ${pitch}. Если интересно, доведу до рабочего сайта за неделю.`
        : // TODO: проверить носителем — вступление «Soʻz bilan tushuntirgandan koʻra koʻrsatish osonroq»
          `Assalomu alaykum! Soʻz bilan tushuntirgandan koʻra koʻrsatish osonroq — ${name} uchun sayt konseptini tayyorladim: ${link}. ${pitch}. Qiziq boʻlsa, bir haftada ishlaydigan saytga aylantiraman.`
    default:
      return null
  }
}

/** Правила сообщений: до 350 знаков, без эмодзи, без «!!», без запрещённых фраз, ссылка ровно одна. */
export function lintMessage(text: string, link: string, locale: Locale, name: string): string[] {
  const errors: string[] = []
  const length = [...text].length
  if (length > MAX) errors.push(`${length} знаков — больше ${MAX}`)
  if (/\p{Extended_Pictographic}/u.test(text)) errors.push('эмодзи')
  if (/!\s*!/.test(text)) errors.push('восклицательные знаки подряд')
  for (const f of FORBIDDEN) if (text.toLowerCase().includes(f)) errors.push(`запрещённая фраза «${f}»`)
  if (text.split(link).length !== 2) errors.push('ссылка должна встречаться ровно один раз')
  // в узбекском тексте апостроф вместо ʻ/ʼ — ошибка; название компании не трогаем (Mr. Gordon’s)
  if (locale === 'uz' && /['‘’`]/.test(text.split(name).join(''))) errors.push('апостроф вместо ʻ/ʼ')
  return errors
}

function notes(lead: Lead): string {
  const links = lead.langs.map((l) => `- ${l.toUpperCase()}: ${linkFor(lead, l)}`).join('\n')
  const first = lead.langs.includes(lead.messageLang) ? lead.messageLang : 'ru'
  return `# ${lead.name} — что отправить

${links}

${lead.hold ? `- **Пока не писать:** ${lead.hold}.\n` : ''}- Статус: **${lead.contactStatus}**${lead.statusChangedAt ? ` (с ${lead.statusChangedAt})` : ''}, канал: **${lead.channel}**, первым отправлять: **message-${first}.txt**
- Куда писать: ${sendTo(lead)}
- Свои просмотры — открывать со ссылкой \`?me=1\`, тогда счётчик их не учтёт.

${lead.directionWhy ? `- Направление: ${lead.directionWhy}\n` : ''}
## Хук

${cap(dot(lead.hook))}.

## Что показать и о чём спросить

${(lead.notes ?? []).map((n) => `- ${n}`).join('\n')}

## Факты на странице (публичные)

${[...lead.facts.map((f) => `- ${f.text.ru} — ${f.source}, ${f.asOf}`), ...(lead.rating ? [`- Рейтинг ${lead.rating.value} и ${lead.rating.count} оценок — ${lead.rating.source}, ${lead.rating.asOf}`] : [])].join('\n') || '- нет'}

Всё остальное на странице (цены, услуги, сроки, залы, меню) — пример и помечено.
${
  lead.sources?.length
    ? `
## Источники

${lead.sources.map((x) => `- ${x.what}${x.url ? ` — ${x.url}` : ''} (${x.checked})`).join('\n')}
`
    : ''
}${
  lead.unverified?.length
    ? `
## Не проверено

${lead.unverified.map((x) => `- ${x}`).join('\n')}
`
    : ''
}
## Проверить руками перед отправкой

- Превью ссылки в Telegram: вставить ссылку в «Избранное». Если картинка старая — @WebpageBot, отправить ему ссылку.
- Открыть ссылку из Telegram и из Instagram на телефоне: первый экран, главный интерактив, кнопки «Позвонить» и «Открыть в Яндекс Картах».
- Узбекский текст сообщения и страницы — показать носителю (TODO: проверить носителем).
`
}

export async function pitch(slugs: string[], withOg = true): Promise<void> {
  const list = slugs.map(getLead)
  // Сначала тексты: если сообщение не проходит правила, картинки собирать незачем
  const texts = list.map((lead) => {
    const out: Partial<Record<Locale, string>> = {}
    for (const locale of ['ru', 'uz'] as const) {
      if (!lead.langs.includes(locale)) continue
      const text = message(lead, locale)
      if (text === null) continue
      const errors = lintMessage(text, linkFor(lead, locale), locale, lead.name)
      if (errors.length) throw new Error(`${lead.slug} message-${locale}: ${errors.join('; ')}\n${text}`)
      out[locale] = text
    }
    return out
  })

  if (withOg) await renderOg(slugs)
  execSync('npm run build', { stdio: 'inherit' })
  await shoot(slugs, 'pitch')

  list.forEach((lead, i) => {
    const dir = path.join('pitch', lead.slug)
    fs.mkdirSync(dir, { recursive: true })
    for (const l of lead.langs) {
      const og = path.join('public/og', l === 'ru' ? `${lead.slug}.png` : `${lead.slug}.${l}.png`)
      if (fs.existsSync(og)) fs.copyFileSync(og, path.join(dir, l === 'ru' ? 'og.png' : `og.${l}.png`))
    }
    fs.writeFileSync(path.join(dir, 'link.txt'), lead.langs.map((l) => linkFor(lead, l)).join('\n') + '\n')
    for (const [locale, text] of Object.entries(texts[i]!)) {
      fs.writeFileSync(path.join(dir, `message-${locale}.txt`), text + '\n')
      console.log(`\n— ${lead.name}, message-${locale}.txt (${[...text].length} знаков) → ${sendTo(lead)}:\n${text}`)
    }
    fs.writeFileSync(path.join(dir, 'notes.md'), notes(lead))
  })
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.filename)
if (isMain) {
  const args = process.argv.slice(2)
  const slugs = args.includes('--all') ? leads.map((l) => l.slug) : args.filter((a) => !a.startsWith('--'))
  if (!slugs.length) throw new Error('Укажите slug или --all')
  await pitch(slugs, !args.includes('--no-og'))
}

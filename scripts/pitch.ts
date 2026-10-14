import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import type { Lead, Locale } from '@/core/types'
import { getLead, leads } from '@/leads'
import { cap, dot, lintMessage, linkFor, message, sendTo } from '@/core/messages'
import { renderOg } from './og'
import { shoot } from './shoot'

/**
 * Набор для отправки pitch/<slug>/: hero.png, full.png, desktop.png, og.png, link.txt,
 * message-ru.txt, message-uz.txt, notes.md.
 *   npm run pitch -- <slug> [<slug>…] | --all  [--no-og]
 */

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
  for (const l of list) if (l.showcase) throw new Error(`${l.slug} — витрина студии, сообщений для неё нет`)
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
  const slugs = args.includes('--all') ? leads.filter((l) => !l.showcase).map((l) => l.slug) : args.filter((a) => !a.startsWith('--'))
  if (!slugs.length) throw new Error('Укажите slug или --all')
  await pitch(slugs, !args.includes('--no-og'))
}

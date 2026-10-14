import type { Metadata } from 'next'
import { lintMessage, linkFor, message } from '@/core/messages'
import { conceptPath, ogImagePath } from '@/core/paths'
import { formatPhone, instagramHref, telegramHref, telHref, whatsappHref } from '@/core/format'
import type { Channel, ContactStatus, Lead, Locale, NicheId } from '@/core/types'
import { leads } from '@/leads'
import { InternalClient } from './client.dev'

/**
 * Пульт: все лиды, кому писать сегодня, тексты сообщений и каналы.
 * Только `npm run dev` (*.dev.tsx) — в публичную сборку не попадает.
 * Статусы меняются фразой в чате («Billur: прочитали») — правится leads/<slug>.ts.
 */
export const metadata: Metadata = { title: 'Пульт' }

const NICHE: Record<NicheId, string> = {
  banquet: 'Банкетный зал',
  dental: 'Стоматология',
  vet: 'Ветклиника',
  petshop: 'Зоомагазин',
  beauty: 'Салон красоты',
  education: 'Учебный центр',
  auto: 'Автомойка',
  restaurant: 'Ресторан',
  wellness: 'Практики',
  fitness: 'Фитнес',
  services: 'Услуги',
}

const STATUS: Record<ContactStatus, string> = {
  'read-silent': 'прочитали, молчат',
  forwarded: 'переслали контакт',
  unread: 'не прочитали',
  'not-contacted': 'не писали',
  sent: 'отправлено',
  replied: 'ответили',
  declined: 'отказ',
}

/** Кому писать сегодня — в этом порядке. */
const TODAY: ContactStatus[] = ['read-silent', 'forwarded', 'unread', 'not-contacted']

const TODO: Partial<Record<ContactStatus, string>> = {
  'read-silent': 'дожать: концепт вместо слов',
  forwarded: 'написать тому, кому переслали',
  unread: 'дополнить сообщение выше',
  'not-contacted': 'первое сообщение',
}

const CHANNEL: Record<Channel, string> = { telegram: 'Telegram', instagram: 'Instagram', whatsapp: 'WhatsApp', facebook: 'Facebook' }

type Group = 'today' | 'wait' | 'pause' | 'done'

function groupOf(lead: Lead): Group {
  if (lead.contactStatus === 'replied' || lead.contactStatus === 'declined') return 'done'
  if (lead.hold) return 'pause'
  if (lead.contactStatus === 'sent') return 'wait'
  return 'today'
}

const GROUP_ORDER: Group[] = ['today', 'pause', 'wait', 'done']

function rank(lead: Lead): number[] {
  const t = TODAY.indexOf(lead.contactStatus)
  // внутри статуса — кто дольше ждёт, тот выше
  const since = lead.statusChangedAt ? Date.parse(lead.statusChangedAt) : 0
  return [GROUP_ORDER.indexOf(groupOf(lead)), t === -1 ? 9 : t, since]
}

function byRank(a: Lead, b: Lead): number {
  const x = rank(a)
  const y = rank(b)
  for (let i = 0; i < x.length; i++) if (x[i] !== y[i]) return x[i]! - y[i]!
  return a.name.localeCompare(b.name)
}

/** «вчера», «3 дн. назад» — по ташкентской дате; dev-страница рендерится на каждый запрос. */
function ago(date: string): string {
  const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Tashkent' })
  const d = Math.round((Date.parse(today) - Date.parse(date)) / 864e5)
  return d <= 0 ? 'сегодня' : d === 1 ? 'вчера' : `${d} дн. назад`
}

function firstLang(lead: Lead): Locale {
  return lead.langs.includes(lead.messageLang) ? lead.messageLang : 'ru'
}

function Contacts({ lead }: { lead: Lead }) {
  const links: { channel: Channel | 'tel'; label: string; href: string }[] = []
  if (lead.telegram) links.push({ channel: 'telegram', label: 'Telegram', href: telegramHref(lead.telegram) })
  if (lead.instagram) links.push({ channel: 'instagram', label: 'Instagram', href: instagramHref(lead.instagram) })
  if (lead.whatsapp) links.push({ channel: 'whatsapp', label: 'WhatsApp', href: whatsappHref(lead.whatsapp) })
  const phone = lead.phones[0]
  return (
    <>
      {links.map((l) => (
        <a key={l.channel} href={l.href} target="_blank" rel="noopener" className={`in-btn ${l.channel === lead.channel ? 'in-btn-main' : ''}`}>
          {l.label}
        </a>
      ))}
      {phone && (
        <a href={telHref(phone)} className="in-btn">
          {formatPhone(phone)}
        </a>
      )}
      {lead.channel === 'facebook' && <span className="in-note">Facebook — ссылка в таблице заказчика</span>}
    </>
  )
}

function Row({ lead, n }: { lead: Lead; n: number }) {
  const group = groupOf(lead)
  const first = firstLang(lead)
  const langs = [first, ...lead.langs.filter((l) => l !== first)]
  const texts = langs.flatMap((l) => {
    const text = message(lead, l)
    return text === null ? [] : [{ l, text, errors: lintMessage(text, linkFor(lead, l), l, lead.name) }]
  })
  // Отправленным текст не показываем: pitchText у них — уже ушедшее сообщение
  const showText = group === 'today' || group === 'pause'
  return (
    <li className="in-row" data-group={group}>
      <a href={conceptPath(lead, first)} target="_blank" rel="noopener" className="in-thumb" aria-label={`Открыть концепт ${lead.name}`}>
        <img src={ogImagePath(lead, first)} alt="" width={240} height={126} loading="lazy" decoding="async" />
      </a>
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          {group === 'today' && <span className="in-n">{n}</span>}
          <h2 className="text-lg font-semibold leading-tight">{lead.name}</h2>
          <span className="in-muted text-sm">
            {NICHE[lead.niche]} · {lead.direction} · {lead.district.ru}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
          <span className="in-status" data-status={lead.contactStatus}>
            {STATUS[lead.contactStatus]}
            {lead.statusChangedAt && <span className="in-since">{ago(lead.statusChangedAt)}</span>}
          </span>
          <span className="in-muted">канал: {CHANNEL[lead.channel]}</span>
          {group === 'today' && TODO[lead.contactStatus] && <span className="in-todo">→ {TODO[lead.contactStatus]}</span>}
        </div>
        {lead.hold && <p className="in-hold">Пока не писать: {lead.hold}</p>}

        <div className="mt-3 flex flex-wrap gap-2">
          {showText &&
            texts.map(({ l, errors }, i) => (
              <button key={l} type="button" className={`in-btn ${i === 0 ? 'in-btn-copy' : ''}`} data-copy={`m-${lead.slug}-${l}`} data-bad={errors.length ? '' : undefined}>
                Скопировать сообщение{texts.length > 1 ? ` ${l.toUpperCase()}` : ''}
              </button>
            ))}
          <Contacts lead={lead} />
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {langs.map((l) => (
            <a key={l} href={conceptPath(lead, l)} target="_blank" rel="noopener" className="in-btn in-btn-quiet">
              Открыть концепт{lead.langs.length > 1 ? ` ${l.toUpperCase()}` : ''}
            </a>
          ))}
          <a href={`${linkFor(lead, first)}?me=1`} target="_blank" rel="noopener" className="in-btn in-btn-quiet" title="Прод; ?me=1 — счётчик не учтёт просмотр">
            прод
          </a>
        </div>

        {showText && texts.length > 0 && (
          <details className="in-details" open={group === 'today' && n <= 3}>
            <summary>Текст сообщения</summary>
            {texts.map(({ l, text, errors }) => (
              <div key={l} className="mt-3">
                <p className="in-muted text-xs">
                  {l.toUpperCase()} · {[...text].length} знаков{l === first ? ' · отправлять первым' : ''}
                </p>
                <p id={`m-${lead.slug}-${l}`} className="in-text">
                  {text}
                </p>
                {errors.length > 0 && <p className="in-err">Не проходит правила: {errors.join('; ')}</p>}
              </div>
            ))}
            <p className="in-muted mt-3 text-xs">Хук: {lead.hook}</p>
          </details>
        )}
        {group === 'wait' && <p className="in-muted mt-2 text-sm">Ждём ответа. Прочитали или ответили — напишите в чат «{lead.name}: прочитали», подготовлю следующее сообщение.</p>}
      </div>
    </li>
  )
}

const css = `
.in{--bg:#f3f1ec;--card:#fff;--ink:#1b1a17;--ink-2:#5c5850;--line:#e2ddd3;--accent:#1f4fd1;--accent-ink:#fff;
  min-height:100dvh;background:var(--bg);color:var(--ink);font-family:var(--font-onest),system-ui,sans-serif;font-variant-numeric:tabular-nums}
.in-muted{color:var(--ink-2)}
.in-tabs{display:flex;flex-wrap:wrap;gap:.5rem}
.in-tab{display:inline-flex;align-items:center;gap:.4rem;min-height:2.5rem;padding:0 1rem;border-radius:999px;background:var(--card);box-shadow:inset 0 0 0 1px var(--line);cursor:pointer;font-weight:500;transition:background-color .15s,box-shadow .15s}
.in-tab:hover{box-shadow:inset 0 0 0 1px var(--ink-2)}
.in-tab b{font-weight:600;color:var(--ink-2)}
.in-tabs input:checked+.in-tab{background:var(--ink);color:var(--bg);box-shadow:none}
.in-tabs input:checked+.in-tab b{color:inherit}
.in-tabs input:focus-visible+.in-tab{outline:2px solid var(--accent);outline-offset:2px}
.in-list{display:grid;gap:.75rem;margin-top:1.25rem}
.in-row{display:grid;grid-template-columns:minmax(0,1fr);gap:1rem;padding:1rem;border-radius:14px;background:var(--card);box-shadow:0 0 0 1px var(--line)}
@media (min-width:768px){.in-row{grid-template-columns:240px minmax(0,1fr);padding:1.25rem}}
.in-thumb{display:block;align-self:start;border-radius:10px;overflow:hidden;box-shadow:0 0 0 1px var(--line);transition:transform .2s}
.in-thumb:hover{transform:translateY(-2px)}
.in-thumb img{display:block;width:100%;height:auto;aspect-ratio:1200/630;object-fit:cover;background:var(--bg)}
.in-n{display:inline-grid;place-items:center;min-width:1.6rem;height:1.6rem;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-size:.8rem;font-weight:600}
.in-status{display:inline-flex;align-items:center;gap:.4rem;padding:.15rem .6rem;border-radius:999px;background:var(--bg);font-weight:500}
.in-status::before{content:'';width:.5rem;height:.5rem;border-radius:999px;background:var(--dot,#8a857b)}
.in-status[data-status=read-silent]{--dot:#d97706}
.in-status[data-status=forwarded]{--dot:#7c3aed}
.in-status[data-status=unread]{--dot:#2563eb}
.in-status[data-status=not-contacted]{--dot:#16a34a}
.in-status[data-status=replied]{--dot:#0f766e}
.in-status[data-status=declined]{--dot:#b91c1c}
.in-since::before{content:'· '}
.in-since{color:var(--ink-2);font-weight:400}
.in-todo{font-weight:600}
.in-hold{margin-top:.6rem;padding:.5rem .75rem;border-radius:8px;background:#fdf1dc;color:#6b4300;font-size:.9rem}
.in-btn{display:inline-flex;align-items:center;min-height:2.5rem;padding:0 .9rem;border-radius:10px;background:var(--card);box-shadow:inset 0 0 0 1px var(--line);color:var(--ink);font-size:.9rem;font-weight:500;text-decoration:none;cursor:pointer;transition:box-shadow .15s,background-color .15s,transform .15s}
.in-btn:hover{box-shadow:inset 0 0 0 1px var(--ink-2)}
.in-btn:active{transform:scale(.98)}
.in-btn:focus-visible,.in-thumb:focus-visible,.in-details summary:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.in-btn-main{box-shadow:inset 0 0 0 2px var(--accent);color:var(--accent);font-weight:600}
.in-btn-copy{background:var(--accent);color:var(--accent-ink);box-shadow:none}
.in-btn-copy:hover{background:#173ea6;box-shadow:none}
.in-btn-quiet{color:var(--ink-2)}
.in-btn[data-bad]{box-shadow:inset 0 0 0 2px #b91c1c}
.in-btn[data-done]{background:#15803d;color:#fff;box-shadow:none}
.in-note{align-self:center;font-size:.85rem;color:var(--ink-2)}
.in-details{margin-top:.9rem;border-top:1px solid var(--line);padding-top:.6rem}
.in-details summary{cursor:pointer;font-size:.9rem;font-weight:500;color:var(--ink-2);width:fit-content}
.in-text{margin-top:.25rem;padding:.75rem .9rem;border-radius:10px;background:var(--bg);font-size:.95rem;line-height:1.5;white-space:pre-wrap;overflow-wrap:anywhere}
.in-err{margin-top:.4rem;color:#b91c1c;font-size:.85rem;font-weight:500}
.in-empty{display:none;padding:2rem 1rem;text-align:center;color:var(--ink-2)}
${GROUP_ORDER.map((g) => `.in:has(#f-${g}:checked) .in-row:not([data-group=${g}]){display:none}.in:has(#f-${g}:checked) .in-empty[data-for=${g}]{display:block}`).join('\n')}
@media (prefers-reduced-motion:reduce){.in *{transition:none!important}}
`

const TABS: { id: Group | 'all'; label: string }[] = [
  { id: 'today', label: 'Кому писать сегодня' },
  { id: 'pause', label: 'Пока не писать' },
  { id: 'wait', label: 'Ждём ответа' },
  { id: 'done', label: 'Ответили / отказ' },
  { id: 'all', label: 'Все' },
]

export default function InternalPage() {
  const list = leads.filter((l) => !l.showcase).sort(byRank)
  const count = (g: Group | 'all') => (g === 'all' ? list.length : list.filter((l) => groupOf(l) === g).length)
  let n = 0
  return (
    <main className="in px-4 pb-16 pt-6 sm:px-8">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="in-muted text-sm">только npm run dev</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">Пульт</h1>
          </div>
          <p className="in-muted max-w-sm text-sm">
            Статус меняется фразой в чате: «Billur: прочитали» — обновлю <code>leads/*.ts</code>.
          </p>
        </header>

        <fieldset className="mt-6">
          <legend className="sr-only">Фильтр</legend>
          <div className="in-tabs">
            {TABS.map((t) => (
              <label key={t.id}>
                <input type="radio" name="f" id={`f-${t.id}`} value={t.id} defaultChecked={t.id === 'today'} className="sr-only" />
                <span className="in-tab">
                  {t.label} <b>{count(t.id)}</b>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        {count('today') > 0 && (
          <p className="in-muted mt-3 text-sm">Порядок: сначала «прочитали, молчат», потом «переслали контакт», «не прочитали», «не писали»; внутри — кто дольше ждёт.</p>
        )}

        <ol className="in-list">
          {list.map((lead) => {
            if (groupOf(lead) === 'today') n++
            return <Row key={lead.slug} lead={lead} n={n} />
          })}
        </ol>
        {GROUP_ORDER.filter((g) => count(g) === 0).map((g) => (
          <p key={g} className="in-empty" data-for={g}>
            Пусто.
          </p>
        ))}
      </div>
      <InternalClient />
    </main>
  )
}

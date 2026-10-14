import { ArrowRight, Check, Send } from 'lucide-react'
import type { CSSProperties } from 'react'
import { groupDigits, telegramHref } from '@/core/format'
import { conceptPath } from '@/core/paths'
import { tx } from '@/core/text'
import type { Locale } from '@/core/types'
import { getLead } from '@/leads'
import { CONTACT_TG, STUDIO_NAME } from '@/site.config'
import { studio } from './content'
import { css } from './style'

const v = (o: Record<string, string | number>) => o as CSSProperties

/** Знак студии: кольцо из семи дней, последний — акцентом. */
export function Mark({ className = '' }: { className?: string }) {
  const r = 15
  const seg = (2 * Math.PI) / 7
  return (
    <svg viewBox="-20 -20 40 40" className={`st-mark ${className}`} aria-hidden>
      {Array.from({ length: 7 }, (_, i) => {
        const a0 = -Math.PI / 2 + i * seg + 0.12
        const a1 = a0 + seg - 0.24
        const p = (a: number) => `${(Math.cos(a) * r).toFixed(2)} ${(Math.sin(a) * r).toFixed(2)}`
        return <path key={i} d={`M${p(a0)} A${r} ${r} 0 0 1 ${p(a1)}`} className={i === 6 ? 'st-mark-on' : ''} style={v({ '--i': i })} />
      })}
    </svg>
  )
}

function TgButton({ locale, big = false }: { locale: Locale; big?: boolean }) {
  if (!CONTACT_TG) return <span className={`st-btn st-btn-off ${big ? 'st-btn-big' : ''}`}>{tx(studio.tgSoon, locale)}</span>
  return (
    <a href={telegramHref(CONTACT_TG)} target="_blank" rel="noopener" className={`st-btn ${big ? 'st-btn-big' : ''}`}>
      <Send aria-hidden className="size-5" strokeWidth={2} />
      {tx(studio.ctaTg, locale)}
    </a>
  )
}

function Week({ locale }: { locale: Locale }) {
  const w = studio.week
  return (
    <div className="st-week">
      <p className="st-week-label">{tx(w.label, locale)}</p>
      <ol className="st-days" aria-hidden>
        {w.days[locale].map((d, i) => (
          <li key={d} style={v({ '--i': i })}>
            <span>{d}</span>
            <i>
              <em>{i + 1}</em>
            </i>
            {i === 6 && (
              <b className="st-done">
                <Check className="size-4" strokeWidth={3} />
              </b>
            )}
          </li>
        ))}
      </ol>
      <ul className="st-plan">
        {w.steps.map((s, i) => (
          <li key={s.day.ru} style={v({ '--i': i })}>
            <b>{tx(s.day, locale)}</b>
            <span>{tx(s.text, locale)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Showcases({ locale }: { locale: Locale }) {
  const s = studio.showcases
  return (
    <section id="kontsepty" className="st-sec st-dark">
      <div className="st-wrap">
        <h2 className="st-h2">{tx(s.title, locale)}</h2>
        <p className="st-p st-lead-2">{tx(s.lead, locale)}</p>
        <ul className="st-cards">
          {s.items.map((it, i) => {
            const lead = getLead(it.slug)
            const href = conceptPath(lead, locale)
            return (
              <li key={it.slug} className="st-card" style={v({ '--i': i })}>
                <span className="st-phone" aria-hidden>
                  <span className="st-screen">
                    <picture>
                      <source type="image/avif" srcSet={`/studio/${it.slug}.${locale}.avif`} />
                      <img src={`/studio/${it.slug}.${locale}.webp`} alt="" width={585} height={1950} loading="lazy" decoding="async" />
                    </picture>
                  </span>
                </span>
                <div className="st-card-body">
                  <p className="st-card-meta">
                    <span className="st-badge">{tx(s.badge, locale)}</span>
                    {tx(it.niche, locale)}
                  </p>
                  <h3 className="st-card-t">{lead.name}</h3>
                  <p className="st-card-p">{tx(it.text, locale)}</p>
                  <a href={href} className="st-open">
                    {tx(s.open, locale)}
                    <ArrowRight aria-hidden className="size-4" strokeWidth={2} />
                  </a>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export function StudioPage({ locale }: { locale: Locale }) {
  const ru = locale === 'ru'
  const year = new Date().getFullYear()
  return (
    <div className="st" lang={locale} data-fonts="Onest" data-hero-font="Onest|760|normal">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {!ru && <script data-concept="" dangerouslySetInnerHTML={{ __html: `document.documentElement.lang='${locale}'` }} />}
      <header className="st-hero">
        <div className="st-top">
          <a href={ru ? '/' : '/uz'} className="st-logo">
            <Mark />
            {STUDIO_NAME}
          </a>
          <a href={ru ? '/uz' : '/'} className="st-lang" lang={ru ? 'uz' : 'ru'}>
            {ru ? 'Oʻzbekcha' : 'Русский'}
          </a>
        </div>
        <div className="st-hero-grid">
          <div>
            <p className="st-tag">{tx(studio.tag, locale)}</p>
            <h1 className="st-h1">
              {tx(studio.title, locale)
                .split(' ')
                .flatMap((w, i) => [
                  i > 0 ? ' ' : '',
                  <span key={i} style={v({ '--i': i })}>
                    {w.includes('Telegram') ? (
                      <>
                        {w.slice(0, w.indexOf('Telegram'))}
                        <b className="st-blue">{w.slice(w.indexOf('Telegram'))}</b>
                      </>
                    ) : (
                      w
                    )}
                  </span>,
                ])}
            </h1>
            <p className="st-lead">{tx(studio.lead, locale)}</p>
            <div className="st-cta">
              <TgButton locale={locale} />
              <a href="#kontsepty" className="st-btn st-btn-ghost">
                {tx(studio.ctaSee, locale)}
              </a>
            </div>
          </div>
          <Week locale={locale} />
        </div>
      </header>

      <main>
        <section className="st-sec st-why">
          <div className="st-wrap st-why-grid">
            <div>
              <h2 className="st-h2">{tx(studio.why.title, locale)}</h2>
              <p className="st-p mt-5">{tx(studio.why.text, locale)}</p>
            </div>
            <ul className="st-facts">
              {studio.why.facts.map((f) => (
                <li key={f.big.ru}>
                  <b>{tx(f.big, locale)}</b>
                  <span>{tx(f.small, locale)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Showcases locale={locale} />

        <section className="st-sec">
          <div className="st-wrap">
            <h2 className="st-h2">{tx(studio.how.title, locale)}</h2>
            <ol className="st-how">
              {studio.how.steps.map((s, i) => (
                <li key={s.title.ru} style={v({ '--i': i })}>
                  <span className="st-how-n">{i + 1}</span>
                  <h3 className="st-h3">{tx(s.title, locale)}</h3>
                  <p className="st-p">{tx(s.text, locale)}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="st-sec st-sec-2">
          <div className="st-wrap">
            <h2 className="st-h2">{tx(studio.prices.title, locale)}</h2>
            <ul className="st-prices">
              {studio.prices.items.map((p) => (
                <li key={p.name.ru}>
                  <div className="st-price-head">
                    <h3 className="st-h3">{tx(p.name, locale)}</h3>
                    <span className="st-ex">{tx(studio.prices.tag, locale)}</span>
                  </div>
                  <p className="st-price">
                    {ru ? (
                      <>
                        <small>{studio.prices.from.ru}</small> {groupDigits(p.price)} <small>сум{p.per ? ` ${p.per.ru}` : ''}</small>
                      </>
                    ) : (
                      <>
                        {groupDigits(p.price)} <small>soʻm{studio.prices.from.uz}{p.per ? `, ${p.per.uz}` : ''}</small>
                      </>
                    )}
                  </p>
                  <p className="st-p">{tx(p.note, locale)}</p>
                </li>
              ))}
            </ul>
            <p className="st-p mt-6">{tx(studio.prices.foot, locale)}</p>
          </div>
        </section>

        <section className="st-sec">
          <div className="st-wrap st-faq-grid">
            <h2 className="st-h2">{tx(studio.faq.title, locale)}</h2>
            <div className="st-faq">
              {studio.faq.items.map((f) => (
                <details key={f.q.ru}>
                  <summary>
                    {tx(f.q, locale)}
                    <span aria-hidden className="st-plus" />
                  </summary>
                  <p className="st-p">{tx(f.a, locale)}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="kontakt" className="st-sec st-contact">
          <div className="st-wrap">
            <Mark className="st-contact-mark" />
            <h2 className="st-h2">{tx(studio.contact.title, locale)}</h2>
            <p className="st-p st-contact-p">{tx(studio.contact.text, locale)}</p>
            <TgButton locale={locale} big />
            {CONTACT_TG && <p className="st-handle">{CONTACT_TG.startsWith('+') ? CONTACT_TG : `@${CONTACT_TG.replace(/^@/, '')}`}</p>}
          </div>
        </section>
      </main>

      <footer className="st-foot">
        <div className="st-wrap">
          <p>
            © {year} {STUDIO_NAME} · {ru ? 'Ташкент' : 'Toshkent'}
          </p>
          <p className="st-foot-note">{tx(studio.foot, locale)}</p>
        </div>
      </footer>
    </div>
  )
}

import { Bone, Bug, Package, Phone, Pill, ShoppingBag } from 'lucide-react'
import type { CSSProperties } from 'react'
import { ExampleTag } from '@/core/components/ExampleTag'
import { Section } from '@/core/components/Section'
import { commissioner } from '@/core/fonts'
import { formatSum, telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { copy, kindLine } from '@/niches/vet/content'
import type { VetHeroProps, VetSectionProps, VetSkin } from '@/niches/vet/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { css } from './style'

const STROKE = 2

/** Силуэт питомца на мятном круге и ярлык «привит» на ошейнике. */
function FlatPet({ className = '', tag }: { className?: string; tag?: string }) {
  return (
    <svg viewBox="0 0 320 320" className={`mf-pet ${className}`} aria-hidden>
      <circle cx={160} cy={170} r={140} className="mf-bg" />
      <g className="mf-cat">
        <path className="mf-line" d="M214 268 C268 262 274 196 244 186" strokeWidth={16} />
        <ellipse cx={160} cy={232} rx={64} ry={60} className="mf-fill" />
        <circle cx={160} cy={136} r={52} className="mf-fill" />
        <polygon points="112,118 118,60 152,96" className="mf-fill" />
        <polygon points="208,118 202,60 168,96" className="mf-fill" />
        <ellipse cx={142} cy={134} rx={6} ry={9} fill="#ffffff" />
        <ellipse cx={178} cy={134} rx={6} ry={9} fill="#ffffff" />
        <polygon points="153,152 167,152 160,161" fill="#ffffff" />
      </g>
      <g className="mf-dog">
        <path className="mf-line" d="M222 256 C262 248 270 214 258 196" strokeWidth={16} />
        <ellipse cx={160} cy={236} rx={74} ry={58} className="mf-fill" />
        <circle cx={160} cy={136} r={56} className="mf-fill" />
        <ellipse cx={104} cy={140} rx={20} ry={44} transform="rotate(14 104 140)" className="mf-fill" />
        <ellipse cx={216} cy={140} rx={20} ry={44} transform="rotate(-14 216 140)" className="mf-fill" />
        <ellipse cx={160} cy={168} rx={30} ry={22} fill="#0f6a3c" />
        <circle cx={140} cy={128} r={7} fill="#ffffff" />
        <circle cx={180} cy={128} r={7} fill="#ffffff" />
        <ellipse cx={160} cy={160} rx={10} ry={7} fill="#ffffff" />
      </g>
      {tag && (
        <g transform="translate(176 196) rotate(-12)">
          <line x1={0} y1={-6} x2={-10} y2={-22} stroke="#13241a" strokeWidth={2} />
          <path d="M0 0 h70 a6 6 0 0 1 6 6 v22 a6 6 0 0 1 -6 6 h-70 l-12 -17 z" fill="#ff7a1a" />
          <circle cx={4} cy={17} r={3.5} fill="#dcf3e4" />
          <text x={40} y={23} textAnchor="middle" fontSize={15} fontWeight={800} fill="#13241a" className="font-body">
            {tag}
          </text>
        </g>
      )}
    </svg>
  )
}

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mb-10 max-w-3xl sm:mb-12">
      <h2 className="font-display text-[2.2rem] leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-5xl">{title}</h2>
      {tag && <div className="mt-3">{tag}</div>}
      {lead && <p className="mt-3 max-w-xl text-lg text-ink-2">{lead}</p>}
    </div>
  )
}

function PhotoArt({ label, className = '' }: PhotoArtProps) {
  return (
    <div className={`relative grid place-items-center overflow-hidden rounded-2xl bg-[var(--mint)] ${className}`}>
      <ShoppingBag aria-hidden className="size-16 text-[var(--green)]" strokeWidth={1.5} />
      <p className="absolute bottom-4 left-4 rounded-lg bg-surface px-3 py-1.5 text-sm">{label}</p>
    </div>
  )
}

function Hero({ lead, locale, langSwitch }: VetHeroProps) {
  const tags = [
    { href: '#uslugi', label: locale === 'ru' ? 'Приём' : 'Qabul', cls: '', r: '-6deg', d: 0.2 },
    { href: '#privivki', label: locale === 'ru' ? 'Прививки' : 'Emlash', cls: 'mf-tag-green', r: '4deg', d: 0.35 },
    { href: '#magazin', label: locale === 'ru' ? 'Зоомагазин' : 'Zoodoʻkon', cls: 'mf-tag-white', r: '-3deg', d: 0.5 },
  ]
  return (
    <header className="relative isolate flex min-h-[100svh] flex-col overflow-hidden px-5 pt-3 pb-8 sm:px-10">
      <div className="flex items-center justify-between text-sm font-semibold text-ink-2">
        <span>{locale === 'ru' ? 'Клиника + магазин' : 'Klinika + doʻkon'}</span>
        {langSwitch}
      </div>
      <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-[minmax(0,1fr)] content-center gap-6 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div data-pet="dog" className="relative mx-auto w-full max-w-[19rem] md:order-2 md:max-w-md">
          <FlatPet className="block h-auto w-full" tag={locale === 'ru' ? 'привит' : 'emlangan'} />
          <ul className="absolute -top-1 -left-2 grid gap-3 md:-left-10">
            {tags.map((t) => (
              <li key={t.href} className="mf-swing" style={{ '--r': t.r, '--d': `${t.d}s` } as CSSProperties}>
                <a href={t.href} className={`mf-tag ${t.cls} min-h-11 text-[0.95rem]`}>
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:order-1">
          <h1 className="font-display text-[clamp(3.2rem,16vw,7rem)] leading-[0.92] font-extrabold tracking-[-0.045em]">{lead.name}</h1>
          <p className="mt-4 text-lg font-semibold">{kindLine(lead, locale)}</p>
          <p className="mt-2 max-w-md text-ink-2">
            {locale === 'ru'
              ? 'Привиться, показать питомца врачу и тут же купить всё нужное — в одном месте. Запись онлайн: не нужно перебирать номера телефонов.'
              : 'Emlash, shifokorga koʻrsatish va kerakli narsalarni darhol sotib olish — bir joyda. Onlayn yozilish.'}
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#data" className="btn flex-1 sm:flex-none sm:px-8">
              {tx(copy.book, locale)}
            </a>
            <a href={telHref(lead.phones[0]!)} className="btn btn-ghost btn-icon" aria-label={ui.call[locale]}>
              <Phone aria-hidden className="size-5" strokeWidth={STROKE} />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

/** Прайс ценниками. */
function Services({ lead, locale }: VetSectionProps) {
  return (
    <Section id="uslugi" alt>
      <Heading title={tx(copy.services.title, locale)} lead={tx(copy.services.lead, locale)} tag={<ExampleTag locale={locale} />} />
      <ul className="grid gap-3 sm:grid-cols-2">
        {lead.vet!.services.map((s, i) => (
          <li key={s.id} className="flex items-center justify-between gap-4 rounded-xl bg-surface p-4">
            <span className="font-semibold">{tx(s.name, locale)}</span>
            <span className={`mf-tag ${i % 3 === 1 ? 'mf-tag-green' : ''}`}>
              {s.from && locale === 'ru' ? 'от ' : ''}
              {formatSum(s.price, locale)}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  )
}

const SHOP_ICONS = [Bug, Pill, Package, Bone, ShoppingBag]

/** «К прививке пригодится» — товары магазина при клинике (пример). */
function Shop({ lead, locale }: VetSectionProps) {
  const items = lead.vet!.shopItems ?? []
  return (
    <Section id="magazin">
      <Heading
        title={locale === 'ru' ? 'К прививке пригодится' : 'Emlashga kerak boʻladi'}
        lead={locale === 'ru' ? 'Всё это есть в магазине при клинике — купите сразу после приёма.' : 'Bularning barchasi klinika qoshidagi doʻkonda bor — qabuldan keyin darhol xarid qiling.'}
        tag={<ExampleTag locale={locale} />}
      />
      <ul className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5">
        {items.map((it, i) => {
          const Icon = SHOP_ICONS[i % SHOP_ICONS.length]!
          return (
            <li key={it.id} className="grid w-[62%] shrink-0 snap-start content-start gap-4 rounded-2xl bg-[var(--mint)] p-5 sm:w-auto">
              <Icon aria-hidden className="size-8 text-[var(--green)]" strokeWidth={1.6} />
              <p className="font-semibold leading-snug">{tx(it.name, locale)}</p>
              <span className="mf-tag justify-self-start">
                {it.from && locale === 'ru' ? 'от ' : ''}
                {formatSum(it.price, locale)}
              </span>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}

const vet: VetSkin = {
  Hero,
  order: ['calendar', 'shop', 'services', 'prep', 'urgent', 'faq', 'location', 'booking'],
  PetArt: ({ className }) => <FlatPet className={className} />,
  Services,
  Shop,
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  return (
    <div className="relative h-[630px] w-[1200px] overflow-hidden bg-bg">
      <div data-pet="dog" className="absolute top-[60px] right-[60px] h-[520px] w-[520px]">
        <FlatPet className="h-full w-full" tag={locale === 'ru' ? 'привит' : 'emlangan'} />
      </div>
      <div className="absolute inset-y-0 left-[84px] flex w-[620px] flex-col justify-center">
        <p className="font-display text-[150px] leading-[0.9] font-extrabold tracking-[-0.045em]">{lead.name}</p>
        <p className="mt-8 text-[38px] leading-tight font-semibold">{kindLine(lead, locale)}</p>
        <p className="mt-8 flex gap-3">
          <span className="mf-tag text-[26px]">{locale === 'ru' ? 'Приём' : 'Qabul'}</span>
          <span className="mf-tag mf-tag-green text-[26px]">{locale === 'ru' ? 'Прививки' : 'Emlash'}</span>
          <span className="mf-tag mf-tag-white text-[26px]">{locale === 'ru' ? 'Зоомагазин' : 'Zoodoʻkon'}</span>
        </p>
        <p className="mt-8 text-[24px] text-ink-2">{locale === 'ru' ? 'Концепт сайта — календарь прививок и запись' : 'Sayt konsepti — emlash taqvimi va yozilish'}</p>
      </div>
    </div>
  )
}

export const marketFresh: Direction = {
  id: 'market-fresh',
  fontClass: commissioner.variable,
  css,
  iconStroke: STROKE,
  themeColor: '#ffffff',
  fontFamilies: ['Commissioner'],
  heroFont: { family: 'Commissioner', weight: 800, style: 'normal' },
  Heading,
  PhotoArt,
  Og,
  vet,
}

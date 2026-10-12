import { Phone } from 'lucide-react'
import { spectral, ysabeau } from '@/core/fonts'
import { telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { tx, typo } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { copy, kindLine } from '@/niches/banquet/content'
import type { BanquetHeroProps, BanquetSkin } from '@/niches/banquet/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { Branch } from './branch'
import { css } from './style'

const STROKE = 1.5

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mb-10 grid max-w-3xl grid-cols-[auto_1fr] items-start gap-x-4 sm:mb-14">
      <Branch still flowers={false} leaves={4} className="row-span-3 mt-1 h-14 w-12" />
      <h2 className="font-display text-[2.4rem] leading-[1.05] font-light italic sm:text-6xl">{title}</h2>
      {tag && <div className="mt-3">{tag}</div>}
      {lead && <p className="mt-3 max-w-xl text-lg text-ink-2">{lead}</p>}
    </div>
  )
}

function PhotoArt({ seed, label, className = '' }: PhotoArtProps) {
  return (
    <div className={`relative overflow-hidden rounded-[6px] border border-line bg-surface ${className}`}>
      <Branch still leaves={7 + (seed % 3)} className="absolute -right-6 -bottom-4 h-[90%] w-auto opacity-70" />
      <p className="absolute top-4 left-4 font-display text-lg italic">{label}</p>
    </div>
  )
}

function Hero({ lead, locale, langSwitch }: BanquetHeroProps) {
  const since = lead.facts.find((f) => /19\d\d/.test(f.text.ru))
  return (
    <header className="relative isolate flex min-h-[100svh] flex-col overflow-hidden px-5 pt-3 pb-8 sm:px-10">
      <Branch className="pointer-events-none absolute -top-6 -right-16 -z-10 h-[62svh] w-auto max-w-none opacity-90 md:right-8 md:h-[85svh]" />
      <div className="flex items-center justify-between text-sm text-ink-2">
        <span>{locale === 'ru' ? 'Банкетный зал и кейтеринг' : 'Toʻyxona va keytering'}</span>
        {langSwitch}
      </div>
      <div className="mx-auto w-full max-w-6xl flex-1 content-end pt-[34svh] md:grid md:content-center md:pt-0">
        {since && (
          <p className="gl-copper font-display text-xl italic">
            {locale === 'ru' ? 'с 1958 года' : '1958-yildan beri'}
          </p>
        )}
        <h1 className="mt-1 font-display text-[clamp(4.8rem,26vw,10rem)] leading-[0.88] font-light italic tracking-[-0.02em]">{lead.name}</h1>
        <p className="mt-4 text-lg">{kindLine(lead, locale)}</p>
        <p className="mt-2 max-w-md text-ink-2">
          {typo(
            locale === 'ru'
              ? 'Свадьба в нашем зале или кейтеринг на вашей площадке — посчитайте оба варианта за минуту.'
              : 'Zalimizdagi toʻy yoki sizning joyingizda keytering — ikkala variantni bir daqiqada hisoblang.',
            locale,
          )}
        </p>
        <div className="mt-7 flex gap-3">
          <a href="#data" className="btn flex-1 sm:flex-none sm:px-8">
            {tx(copy.checkDate, locale)}
          </a>
          <a href={telHref(lead.phones[0]!)} className="btn btn-ghost btn-icon" aria-label={ui.call[locale]}>
            <Phone aria-hidden className="size-5" strokeWidth={STROKE} />
          </a>
        </div>
      </div>
    </header>
  )
}

const banquet: BanquetSkin = {
  Hero,
  order: ['planner', 'halls', 'packages', 'includes', 'steps', 'faq', 'location', 'booking'],
  PlannerArt: () => <Branch flowers={false} leaves={10} className="mx-auto mb-3 h-24 w-auto" />,
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  return (
    <div className="relative h-[630px] w-[1200px] overflow-hidden bg-bg">
      <Branch still className="absolute -top-10 right-10 h-[700px] w-auto" />
      <div className="absolute inset-y-0 left-[90px] flex w-[640px] flex-col justify-center">
        <p className="gl-copper font-display text-[40px] italic">{locale === 'ru' ? 'с 1958 года' : '1958-yildan beri'}</p>
        <p className="font-display text-[210px] leading-[0.88] font-light italic tracking-[-0.02em]">{lead.name}</p>
        <p className="mt-8 text-[38px]">{kindLine(lead, locale)}</p>
        <p className="mt-6 max-w-[500px] text-[26px] text-ink-2">
          {locale === 'ru' ? 'Концепт сайта — зал или кейтеринг, ориентир за минуту' : 'Sayt konsepti — zal yoki keytering, bir daqiqada hisob'}
        </p>
      </div>
    </div>
  )
}

export const gardenLight: Direction = {
  id: 'garden-light',
  fontClass: `${spectral.variable} ${ysabeau.variable}`,
  css,
  iconStroke: STROKE,
  themeColor: '#f4ecdb',
  fontFamilies: ['Spectral', 'Ysabeau Office'],
  heroFont: { family: 'Spectral', weight: 300, style: 'italic' },
  Heading,
  PhotoArt,
  Og,
  banquet,
}

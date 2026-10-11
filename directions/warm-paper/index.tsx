import { Phone } from 'lucide-react'
import type { CSSProperties } from 'react'
import { literata, ysabeau } from '@/core/fonts'
import { telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { tx, typo } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { copy, kindLine } from '@/niches/vet/content'
import type { VetHeroProps, VetSkin } from '@/niches/vet/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { Heart, LineCat, LineDog, LinePet, Squiggle } from './pets'
import { css } from './style'

const STROKE = 1.6

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mb-10 max-w-3xl sm:mb-14">
      <h2 className="font-display text-[2.2rem] leading-[1.1] font-semibold sm:text-5xl">{title}</h2>
      <Squiggle className="mt-3 h-3 w-28" />
      {tag && <div className="mt-3">{tag}</div>}
      {lead && <p className="mt-3 max-w-xl text-lg text-ink-2">{lead}</p>}
    </div>
  )
}

function PhotoArt({ label, className = '' }: PhotoArtProps) {
  return (
    <div className={`relative overflow-hidden rounded-md border border-line bg-surface ${className}`}>
      <svg viewBox="0 0 400 300" className="wp-hero-pets absolute inset-0 m-auto h-3/4 w-3/4 opacity-40" aria-hidden fill="none">
        <g transform="translate(40 30)">
          <LineCat />
        </g>
        <g transform="translate(190 24)">
          <LineDog />
        </g>
      </svg>
      <p className="absolute bottom-4 left-4 font-display italic">{label}</p>
    </div>
  )
}

function Hero({ lead, locale, langSwitch }: VetHeroProps) {
  return (
    <header className="relative isolate flex min-h-[100svh] flex-col overflow-hidden px-5 pt-3 pb-8 sm:px-10">
      <div className="flex items-center justify-between text-sm text-ink-2">
        <span className="font-display italic">{locale === 'ru' ? 'Ветклиника' : 'Veterinariya klinikasi'}</span>
        {langSwitch}
      </div>
      <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-[minmax(0,1fr)] content-center gap-4 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-10">
        <svg viewBox="0 0 400 290" className="wp-hero-pets mx-auto h-auto max-h-[38svh] w-full max-w-md md:order-2 md:max-h-none" aria-hidden fill="none">
          <g transform="translate(16 30)">
            <LineCat delay={0.1} />
          </g>
          <g transform="translate(190 22)">
            <LineDog delay={0.5} />
          </g>
          <g className="wp-pop" style={{ '--d': '1.7s' } as CSSProperties}>
            <Heart x={196} y={20} s={0.9} />
          </g>
          <path d="M10 278 C120 270 280 284 390 274" pathLength={1} className="wp-draw" style={{ '--d': '1.2s' } as CSSProperties} />
        </svg>
        <div className="md:order-1">
          <h1 className="font-display text-[clamp(4.5rem,24vw,9rem)] leading-[0.9] font-semibold tracking-[-0.03em] italic">{lead.name}</h1>
          <p className="mt-5 text-xl">{kindLine(lead, locale)}</p>
          <p className="mt-2 max-w-md text-ink-2">
            {locale === 'ru'
              ? 'Записаться можно прямо здесь, в любое время — не дожидаясь, пока освободится линия.'
              : 'Shu yerning oʻzida, istalgan vaqtda yozilish mumkin — liniya boʻshashini kutmasdan.'}
          </p>
          <div className="mt-7 flex gap-3">
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

const vet: VetSkin = {
  Hero,
  order: ['calendar', 'services', 'prep', 'urgent', 'faq', 'location', 'booking'],
  PetArt: ({ className }) => <LinePet className={className} />,
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  return (
    <div className="relative h-[630px] w-[1200px] overflow-hidden bg-bg">
      <svg viewBox="0 0 400 290" className="wp-hero-pets absolute top-[90px] right-[30px] h-[470px] w-[650px]" aria-hidden fill="none">
        <g className="wp-still" transform="translate(16 30)">
          <LineCat />
        </g>
        <g transform="translate(190 22)">
          <LineDog />
        </g>
        <Heart x={196} y={20} s={0.9} />
        <path d="M10 278 C120 270 280 284 390 274" />
      </svg>
      <div className="absolute inset-y-0 left-[84px] flex w-[470px] flex-col justify-center">
        <p className="font-display text-[190px] leading-[0.9] font-semibold tracking-[-0.03em] italic">{lead.name}</p>
        <Squiggle className="mt-6 h-5 w-48" />
        <p className="mt-8 text-[40px] leading-tight">{kindLine(lead, locale)}</p>
        <p className="mt-6 text-[26px] text-ink-2">
          {typo(locale === 'ru' ? 'Концепт сайта — календарь прививок и запись' : 'Sayt konsepti — emlash taqvimi va yozilish', locale)}
        </p>
      </div>
    </div>
  )
}

export const warmPaper: Direction = {
  id: 'warm-paper',
  fontClass: `${literata.variable} ${ysabeau.variable}`,
  css,
  iconStroke: STROKE,
  themeColor: '#f5eedf',
  fontFamilies: ['Literata', 'Ysabeau Office'],
  heroFont: { family: 'Literata', weight: 600, style: 'italic' },
  Heading,
  PhotoArt,
  Og,
  vet,
}

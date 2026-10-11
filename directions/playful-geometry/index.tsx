import { Phone, Star } from 'lucide-react'
import type { CSSProperties } from 'react'
import { onest, unbounded } from '@/core/fonts'
import { telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { seeded } from '@/core/random'
import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import { copy, kindLine } from '@/niches/vet/content'
import type { VetHeroProps, VetSkin } from '@/niches/vet/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { GeoPet, ShapesMark } from './pets'
import { css } from './style'

const STROKE = 2

/** «Doctor & Animals» → амперсанд на жёлтом круге. */
function Title({ name }: { name: string }) {
  const parts = name.split(' & ')
  if (parts.length !== 2) return <>{name}</>
  return (
    <>
      {parts[0]}{' '}
      <span className="relative inline-block">
        <span aria-hidden className="absolute top-1/2 left-1/2 -z-10 size-[1.1em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--yellow)]" />
        &amp;
      </span>
      <br />
      {parts[1]}
    </>
  )
}

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mb-10 max-w-3xl sm:mb-14">
      <ShapesMark className="mb-4" />
      <h2 className="font-display text-[2rem] leading-[1.08] font-extrabold tracking-[-0.035em] sm:text-5xl">{title}</h2>
      {tag && <div className="mt-4">{tag}</div>}
      {lead && <p className="mt-4 max-w-xl text-lg text-ink-2">{lead}</p>}
    </div>
  )
}

/** Заглушка фото: сетка простых фигур. */
function PhotoArt({ seed, label, className = '' }: PhotoArtProps) {
  const rand = seeded(`pg-${seed}`)
  const cells = Array.from({ length: 12 }, (_, i) => ({ i, kind: Math.floor(rand() * 3), fill: rand() > 0.5 }))
  return (
    <div className={`relative overflow-hidden rounded-[24px] bg-[var(--yellow)] ${className}`}>
      <svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        {cells.map(({ i, kind, fill }) => {
          const x = (i % 3) * 100 + 50
          const y = Math.floor(i / 3) * 100 + 50
          const cls = fill ? 'pg-fill-ink' : 'pg-fill-white'
          if (kind === 0) return <circle key={i} cx={x} cy={y} r={34} className={cls} />
          if (kind === 1) return <polygon key={i} points={`${x - 36},${y + 32} ${x},${y - 34} ${x + 36},${y + 32}`} className={cls} />
          return <rect key={i} x={x - 32} y={y - 32} width={64} height={64} rx={10} className={cls} />
        })}
      </svg>
      <p className="absolute bottom-4 left-4 rounded-full bg-surface px-3 py-1.5 text-sm">{label}</p>
    </div>
  )
}

function Hero({ lead, locale, langSwitch }: VetHeroProps) {
  const fact = lead.facts[0]
  const d = (s: number) => ({ '--d': `${s}s` }) as CSSProperties
  return (
    <header className="relative isolate flex min-h-[100svh] flex-col overflow-hidden px-5 pt-3 pb-8 sm:px-10">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <ShapesMark />
        </span>
        {langSwitch}
      </div>
      <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-[minmax(0,1fr)] content-center items-center gap-2 md:grid-cols-[1fr_1fr] md:gap-10">
        <div className="pg-hero-pets relative mx-auto grid h-[min(40svh,22rem)] w-full max-w-md grid-cols-[0.8fr_1fr] items-end md:order-2 md:h-[30rem]">
          <svg viewBox="0 0 400 400" className="absolute inset-x-[6%] bottom-0 -z-10 h-auto w-[88%]" aria-hidden>
            <circle cx={200} cy={240} r={170} className="pg-sun" />
          </svg>
          <div data-pet="cat" className="pg-bounce" style={d(0.1)}>
            <GeoPet sun={false} className="block h-auto w-full" />
          </div>
          <div data-pet="dog" className="pg-bounce -ml-[18%]" style={d(0.25)}>
            <GeoPet sun={false} className="block h-auto w-full" />
          </div>
        </div>
        <div className="md:order-1">
          <h1 className="font-display text-[clamp(2.6rem,12.5vw,5.6rem)] leading-[0.98] font-extrabold tracking-[-0.045em]">
            <Title name={lead.name} />
          </h1>
          <p className="mt-4 text-lg font-semibold">{kindLine(lead, locale)}</p>
          <p className="mt-2 max-w-md text-ink-2">
            {locale === 'ru'
              ? 'Прививки, приём и анализы для кошек и собак, аптека при клинике. Записаться можно прямо здесь, без звонка.'
              : 'Mushuk va itlar uchun emlash, qabul va tahlillar, klinika qoshida dorixona. Shu yerning oʻzida, qoʻngʻiroqsiz yozilish mumkin.'}
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#data" className="btn flex-1 sm:flex-none sm:px-8">
              {tx(copy.book, locale)}
            </a>
            <a href={telHref(lead.phones[0]!)} className="btn btn-ghost btn-icon" aria-label={ui.call[locale]}>
              <Phone aria-hidden className="size-5" strokeWidth={STROKE} />
            </a>
          </div>
          {fact && (
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-ink px-3 py-1 text-sm font-semibold">
              <Star aria-hidden className="size-4 fill-[var(--yellow)]" strokeWidth={STROKE} />
              {tx(fact.text, locale)}
            </p>
          )}
        </div>
      </div>
    </header>
  )
}

const vet: VetSkin = {
  Hero,
  order: ['calendar', 'services', 'urgent', 'prep', 'faq', 'location', 'booking'],
  PetArt: ({ className }) => <GeoPet className={className} />,
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  return (
    <div className="relative isolate h-[630px] w-[1200px] overflow-hidden bg-bg">
      <svg viewBox="0 0 400 400" className="absolute top-[40px] right-[-60px] h-[640px] w-[640px]" aria-hidden>
        <circle cx={200} cy={210} r={180} className="pg-sun" />
      </svg>
      <div data-pet="cat" className="absolute right-[250px] bottom-[-10px] h-[380px] w-[380px]">
        <GeoPet sun={false} className="h-full w-full" />
      </div>
      <div data-pet="dog" className="absolute right-[20px] bottom-[-10px] h-[460px] w-[460px]">
        <GeoPet sun={false} className="h-full w-full" />
      </div>
      <div className="absolute inset-y-0 left-[80px] flex w-[560px] flex-col justify-center">
        <ShapesMark className="mb-8 h-[30px] w-[90px]" />
        <p className="font-display text-[96px] leading-[0.98] font-extrabold tracking-[-0.045em]">
          <Title name={lead.name} />
        </p>
        <p className="mt-8 text-[36px] leading-tight font-semibold">{kindLine(lead, locale)}</p>
        <p className="mt-8 text-[26px] text-ink-2">
          {locale === 'ru' ? 'Концепт сайта — календарь прививок и запись' : 'Sayt konsepti — emlash taqvimi va yozilish'}
        </p>
      </div>
    </div>
  )
}

export const playfulGeometry: Direction = {
  id: 'playful-geometry',
  fontClass: `${unbounded.variable} ${onest.variable}`,
  css,
  iconStroke: STROKE,
  themeColor: '#fffdf6',
  fontFamilies: ['Unbounded', 'Onest'],
  heroFont: { family: 'Unbounded', weight: 800, style: 'normal' },
  Heading,
  PhotoArt,
  Og,
  vet,
}

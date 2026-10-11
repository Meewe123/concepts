import { Coffee, GlassWater, Phone, Wine } from 'lucide-react'
import { ExampleTag } from '@/core/components/ExampleTag'
import { Section } from '@/core/components/Section'
import { commissioner, playfair } from '@/core/fonts'
import { formatSum, telHref } from '@/core/format'
import { ui } from '@/core/i18n'
import { tx } from '@/core/text'
import type { L10n, Lead, Locale } from '@/core/types'
import { capacityLabel, copy, kindLine } from '@/niches/banquet/content'
import type { BanquetHeroProps, BanquetSkin, SectionProps } from '@/niches/banquet/skin'
import type { Direction, HeadingProps, PhotoArtProps } from '../types'
import { Curtain, Rose } from './rose'
import { css } from './style'

const STROKE = 1.4

/** «Royal Rose» → «Rose» курсивом цвета шампань. */
function Title({ name }: { name: string }) {
  const [first, ...rest] = name.split(' ')
  return (
    <>
      {first}
      {rest.length > 0 && (
        <>
          {' '}
          <em className="text-[var(--champagne)]">{rest.join(' ')}</em>
        </>
      )}
    </>
  )
}

function Heading({ title, lead, tag }: HeadingProps) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
      <Rose still stem={false} className="mx-auto mb-3 h-9 w-auto" />
      <h2 className="font-display text-[2.5rem] leading-[1.05] italic sm:text-6xl">{title}</h2>
      {tag && <div className="mt-4">{tag}</div>}
      {lead && <p className="mt-4 text-lg text-ink-2">{lead}</p>}
    </div>
  )
}

function PhotoArt({ label, className = '' }: PhotoArtProps) {
  return (
    <div className={`cv-stage relative grid place-items-center overflow-hidden rounded-t-[999px] ${className}`}>
      <Rose still className="h-1/2 w-1/2 opacity-60" />
      <p className="absolute inset-x-0 bottom-5 text-center text-sm text-ink-2">{label}</p>
    </div>
  )
}

function Hero({ lead, locale, langSwitch }: BanquetHeroProps) {
  return (
    <header className="relative isolate flex min-h-[100svh] flex-col overflow-hidden px-5 pt-10 pb-8 sm:px-10">
      <Curtain />
      <div className="flex items-center justify-between text-sm text-ink-2">
        <span>{locale === 'ru' ? 'Банкетный зал и бар' : 'Toʻyxona va bar'}</span>
        {langSwitch}
      </div>
      <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-[minmax(0,1fr)] content-center justify-items-center gap-2 text-center md:grid-cols-[1fr_1fr] md:justify-items-start md:text-left">
        <Rose className="h-[min(34svh,18rem)] w-auto md:order-2 md:h-[30rem] md:justify-self-center" />
        <div className="md:order-1">
          <h1 className="font-display text-[clamp(3.5rem,17vw,7.5rem)] leading-[0.95] font-semibold">
            <Title name={lead.name} />
          </h1>
          <p className="mt-4 text-lg">{kindLine(lead, locale)}</p>
          <p className="mx-auto mt-2 max-w-sm text-ink-2 md:mx-0">
            {locale === 'ru'
              ? 'Пакеты и цены — открыто, до звонка: выберите число гостей и посмотрите ориентир.'
              : 'Paketlar va narxlar — ochiq, qoʻngʻiroqsiz: mehmonlar sonini tanlang va taxminiy narxni koʻring.'}
          </p>
          <div className="mt-7 flex justify-center gap-3 md:justify-start">
            <a href="#data" className="btn min-w-[13rem]">
              {tx(copy.checkDate, locale)}
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

function Halls({ lead, locale }: SectionProps) {
  return (
    <Section id="zaly" alt>
      <Heading title={tx(copy.halls.title, locale)} lead={tx(copy.halls.lead, locale)} tag={<ExampleTag locale={locale} />} />
      <ul className="grid gap-6 sm:grid-cols-2">
        {lead.banquet!.halls.map((h) => (
          <li key={h.id} className="cv-stage grid min-h-56 content-end gap-2 overflow-hidden rounded-t-[2rem] p-6 pt-12">
            <p className="text-sm text-ink-2">{ui.photosHere[locale]}</p>
            <h3 className="font-display text-3xl italic">{tx(h.name, locale)}</h3>
            <p className="text-[var(--champagne)]">{tx(capacityLabel(h.capacity), locale)}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function Packages({ lead, locale }: SectionProps) {
  return (
    <Section id="menu">
      <Heading title={tx(copy.packages.title, locale)} lead={tx(copy.packages.lead, locale)} tag={<ExampleTag locale={locale} />} />
      <ul className="grid gap-4 md:grid-cols-3">
        {lead.banquet!.packages.map((p) => (
          <li key={p.id} className="grid content-start gap-4 rounded-2xl border border-[var(--champagne)] p-6">
            <h3 className="font-display text-3xl italic">{tx(p.name, locale)}</h3>
            <p>
              <span className="font-display text-3xl text-[var(--champagne)]">{formatSum(p.pricePerGuest, locale)}</span>
              <span className="ml-2 text-sm text-ink-2">{tx(copy.packages.perGuest, locale)}</span>
            </p>
            <ul className="grid gap-2 text-ink-2">
              {p.items.map((it) => (
                <li key={it.ru} className="flex gap-2">
                  <span aria-hidden className="text-[var(--champagne)]">
                    ❦
                  </span>
                  {tx(it, locale)}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  )
}

const BAR: { icon: typeof Wine; title: L10n; text: L10n }[] = [
  {
    icon: GlassWater,
    title: { ru: 'Встреча гостей', uz: 'Mehmonlarni kutib olish' },
    text: { ru: 'Welcome-напитки, пока гости собираются', uz: 'Mehmonlar yigʻilayotganda welcome-ichimliklar' },
  },
  {
    icon: Wine,
    title: { ru: 'Авторские напитки', uz: 'Mualliflik ichimliklari' },
    text: { ru: 'Лимонады и коктейльная карта на весь вечер', uz: 'Butun kecha uchun limonadlar va kokteyl kartasi' },
  },
  {
    icon: Coffee,
    title: { ru: 'Кофе и десерты', uz: 'Qahva va desertlar' },
    text: { ru: 'Для тех, кто остаётся до последнего танца', uz: 'Soʻnggi raqsgacha qoladiganlar uchun' },
  },
]

function Bar({ locale }: SectionProps) {
  return (
    <Section id="bar" alt>
      <Heading
        title={locale === 'ru' ? 'Бар' : 'Bar'}
        lead={locale === 'ru' ? 'Не только банкет: бар при зале работает на ваш праздник.' : 'Faqat banket emas: zal qoshidagi bar bayramingiz uchun ishlaydi.'}
        tag={<ExampleTag locale={locale} />}
      />
      <ul className="grid gap-8 sm:grid-cols-3">
        {BAR.map((b) => (
          <li key={b.title.ru} className="text-center">
            <b.icon aria-hidden className="mx-auto size-8 text-[var(--champagne)]" strokeWidth={STROKE} />
            <h3 className="mt-3 font-display text-2xl italic">{tx(b.title, locale)}</h3>
            <p className="mt-1 text-ink-2">{tx(b.text, locale)}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

const banquet: BanquetSkin = {
  Hero,
  order: ['planner', 'packages', 'halls', 'bar', 'includes', 'steps', 'faq', 'location', 'booking'],
  Halls,
  Packages,
  Bar,
  PlannerArt: () => <Rose stem={false} className="mx-auto mb-4 h-24 w-auto" />,
}

function Og({ lead, locale }: { lead: Lead; locale: Locale }) {
  return (
    <div className="relative isolate h-[630px] w-[1200px] overflow-hidden bg-bg">
      <Curtain still />
      <Rose still className="absolute top-[40px] right-[150px] h-[560px] w-[373px]" />
      <div className="absolute inset-y-0 left-[120px] flex w-[620px] flex-col justify-center">
        <p className="font-display text-[130px] leading-[0.95] font-semibold">
          <Title name={lead.name} />
        </p>
        <p className="mt-8 text-[38px]">{kindLine(lead, locale)}</p>
        <p className="mt-8 text-[26px] text-[var(--champagne)]">
          {locale === 'ru' ? 'Концепт сайта — пакеты, цены и проверка даты' : 'Sayt konsepti — paketlar, narxlar va sanani tekshirish'}
        </p>
      </div>
    </div>
  )
}

export const crimsonVelvet: Direction = {
  id: 'crimson-velvet',
  fontClass: `${playfair.variable} ${commissioner.variable}`,
  css,
  iconStroke: STROKE,
  themeColor: '#45101c',
  fontFamilies: ['Playfair Display', 'Commissioner'],
  heroFont: { family: 'Playfair Display', weight: 600, style: 'normal' },
  Heading,
  PhotoArt,
  Og,
  banquet,
}

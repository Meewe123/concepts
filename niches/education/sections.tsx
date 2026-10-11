import { DemoForm } from '@/core/components/DemoForm'
import { ExampleTag } from '@/core/components/ExampleTag'
import { Faq } from '@/core/components/Faq'
import { formLabels } from '@/core/components/formLabels'
import { LocationSection } from '@/core/components/LocationSection'
import { Section } from '@/core/components/Section'
import { StickyBar } from '@/core/components/StickyBar'
import { formatSum } from '@/core/format'
import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import type { Direction } from '@/directions/types'
import { copy, LEVELS } from './content'
import { LevelTest } from './LevelTest'

export interface EducationPageSectionProps {
  lead: Lead
  locale: Locale
  dir: Direction
}

function edu(lead: Lead) {
  if (!lead.education) throw new Error(`lead ${lead.slug}: нет данных education`)
  return lead.education
}

export function TestSection({ lead, locale, dir }: EducationPageSectionProps) {
  return (
    <Section id="test">
      <dir.Heading title={tx(copy.test.title, locale)} lead={tx(copy.test.lead, locale)} />
      <LevelTest lead={lead} locale={locale} />
    </Section>
  )
}

export function DefaultCourses({ lead, locale, dir }: EducationPageSectionProps) {
  return (
    <Section id="kursy" alt>
      <dir.Heading title={tx(copy.courses.title, locale)} lead={tx(copy.courses.lead, locale)} tag={<ExampleTag locale={locale} />} />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {edu(lead).courses.map((c) => (
          <li key={c.id} className="grid content-start gap-3 border border-line bg-surface p-6">
            <p className="text-sm text-ink-2">
              {c.levels} · {tx(c.duration, locale)}
            </p>
            <h3 className="font-display text-2xl leading-tight">{tx(c.name, locale)}</h3>
            {c.note && <p className="text-ink-2">{tx(c.note, locale)}</p>}
            <p className="mt-2">
              <span className="text-xl font-semibold">{formatSum(c.pricePerMonth, locale)}</span>{' '}
              <span className="text-sm text-ink-2">{tx(copy.courses.perMonth, locale)}</span>
            </p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function DefaultSchedule({ lead, locale, dir }: EducationPageSectionProps) {
  return (
    <Section id="raspisanie">
      <dir.Heading title={tx(copy.schedule.title, locale)} tag={<ExampleTag locale={locale} />} />
      <ul className="border-t border-line">
        {edu(lead).groups.map((g) => (
          <li key={g.id} className="grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-4 border-b border-line py-4">
            <span className="font-display text-xl">{g.level}</span>
            <span>
              {tx(g.course, locale)}
              <span className="block text-sm text-ink-2">{tx(g.days, locale)}</span>
            </span>
            <span className="text-right">
              <span className="font-semibold tabular-nums">{g.time}</span>
              <span className="block text-sm text-ink-2">{tx(copy.formats[g.format].title, locale)}</span>
            </span>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function Teachers({ lead, locale, dir }: EducationPageSectionProps) {
  const skin = dir.education!
  return (
    <Section id="uchitelya" alt>
      <dir.Heading title={tx(copy.teachers.title, locale)} tag={<ExampleTag locale={locale} />} />
      <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {edu(lead).teachers.map((t, i) => (
          <li key={t.initials} className="grid gap-3">
            <skin.Monogram initials={t.initials} seed={i} />
            <p className="text-sm text-ink-2">{tx(t.role, locale)}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function Formats({ lead, locale, dir }: EducationPageSectionProps) {
  const formats = edu(lead).formats
  return (
    <Section id="format">
      <dir.Heading title={tx(copy.formats.title, locale)} />
      <ul className={`grid gap-4 ${formats.length > 1 ? 'sm:grid-cols-2' : ''}`}>
        {formats.map((f) => (
          <li key={f} className="border-t-2 border-ink pt-4">
            <h3 className="font-display text-2xl">{tx(copy.formats[f].title, locale)}</h3>
            <p className="mt-2 text-ink-2">{tx(copy.formats[f].text, locale)}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function FaqSection({ locale, dir }: EducationPageSectionProps) {
  return (
    <Section id="savollar" alt>
      <dir.Heading title={tx(copy.faq.title, locale)} tag={<ExampleTag locale={locale} />} />
      <Faq items={[...copy.faq.items]} locale={locale} stroke={dir.iconStroke} />
    </Section>
  )
}

export function Location({ lead, locale, dir }: EducationPageSectionProps) {
  return <LocationSection lead={lead} locale={locale} dir={dir} title={tx(copy.location.title, locale)} />
}

export function Booking({ lead, locale, dir }: EducationPageSectionProps) {
  const b = copy.booking
  return (
    <Section id="data" alt>
      <div className="grid md:grid-cols-[1fr_1.4fr] md:gap-10">
        <dir.Heading title={tx(copy.trialShort, locale)} lead={tx(b.lead, locale)} />
        <DemoForm
          stroke={dir.iconStroke}
          choices={[
            { name: 'level', label: tx(b.level, locale), options: [tx(b.unknown, locale), ...LEVELS.map((l) => l.code)] },
            { name: 'format', label: tx(b.format, locale), options: edu(lead).formats.map((f) => tx(copy.formats[f].title, locale)) },
          ]}
          labels={formLabels(locale, tx(b.required, locale))}
        />
      </div>
    </Section>
  )
}

export function EducationStickyBar({ lead, locale, dir }: EducationPageSectionProps) {
  return <StickyBar label={tx(copy.trialShort, locale)} phone={lead.phones[0]!} locale={locale} stroke={dir.iconStroke} />
}

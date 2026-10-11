import type { FC } from 'react'
import { Footer } from '@/core/components/Footer'
import { LangSwitch } from '@/core/components/LangSwitch'
import type { Lead, Locale } from '@/core/types'
import type { Direction } from '@/directions/types'
import {
  Booking,
  DefaultCourses,
  DefaultSchedule,
  EducationStickyBar,
  FaqSection,
  Formats,
  Location,
  Teachers,
  TestSection,
  type EducationPageSectionProps,
} from './sections'
import type { EducationSectionId } from './skin'

export function EducationPage({ lead, locale, dir }: { lead: Lead; locale: Locale; dir: Direction }) {
  const skin = dir.education
  if (!skin) throw new Error(`Направление ${dir.id} не умеет нишу education`)

  const wrap = (C: FC<{ lead: Lead; locale: Locale }>): FC<EducationPageSectionProps> => {
    const Wrapped = (p: EducationPageSectionProps) => <C lead={p.lead} locale={p.locale} />
    return Wrapped
  }
  const sections: Record<EducationSectionId, FC<EducationPageSectionProps>> = {
    test: TestSection,
    courses: skin.Courses ? wrap(skin.Courses) : DefaultCourses,
    schedule: skin.Schedule ? wrap(skin.Schedule) : DefaultSchedule,
    teachers: Teachers,
    formats: Formats,
    faq: FaqSection,
    location: Location,
    booking: Booking,
  }

  return (
    <>
      <skin.Hero lead={lead} locale={locale} langSwitch={<LangSwitch lead={lead} locale={locale} />} />
      <div className="relative">
        {skin.order.map((id, i) => {
          const S = sections[id]
          return (
            <div key={id}>
              {i > 0 && dir.Divider && <dir.Divider />}
              <S lead={lead} locale={locale} dir={dir} />
            </div>
          )
        })}
        <EducationStickyBar lead={lead} locale={locale} dir={dir} />
      </div>
      <Footer lead={lead} locale={locale} stroke={dir.iconStroke} />
      {/* Островок: тест уровня и демо-форма. Единственный JS страницы, кроме счётчика. */}
      <script type="module" src="/islands/education.js" data-concept="" />
    </>
  )
}

import { ui } from '@/core/i18n'
import { tx } from '@/core/text'
import type { Lead, Locale, StudyGroup } from '@/core/types'
import { copy, LEVELS, QUESTIONS } from './content'

export interface LevelTestConfig {
  locale: Locale
  answers: number[]
  levels: typeof LEVELS
  ielts: boolean
  groups: { level: StudyGroup['level']; text: string }[]
  formats: { offline: string; online: string }
  labels: { group: string; noGroup: string; score: string }
}

/**
 * Сигнатура ниши education: 5 вопросов → уровень, подходящая группа → пробный урок.
 * Островок niches/education/island.ts считает результат и размечает ответы (data-mark), направление их оформляет.
 */
export function LevelTest({ lead, locale }: { lead: Lead; locale: Locale }) {
  const edu = lead.education!
  const t = copy.test
  const config: LevelTestConfig = {
    locale,
    answers: QUESTIONS.map((q) => q.answer),
    levels: LEVELS,
    ielts: Boolean(edu.ielts),
    groups: edu.groups.map((g) => ({
      level: g.level,
      text: `${tx(g.course, locale)} · ${tx(g.days, locale)}, ${g.time} · ${tx(copy.formats[g.format].title, locale).toLowerCase()}`,
    })),
    formats: { offline: tx(copy.formats.offline.title, locale), online: tx(copy.formats.online.title, locale) },
    labels: { group: tx(t.group, locale), noGroup: tx(t.noGroup, locale), score: tx(t.score, locale) },
  }
  return (
    <div data-leveltest="" className="lt grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-start md:gap-14">
      <script type="application/json" data-concept="" dangerouslySetInnerHTML={{ __html: JSON.stringify(config) }} />
      <ol className="lt-questions grid gap-4">
        {QUESTIONS.map((q, i) => (
          <li key={q.text} className="lt-q" data-q={i}>
            <fieldset>
              <legend className="lt-text">
                <span className="lt-num">{i + 1}</span>
                <span lang="en">{q.text}</span>
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {q.options.map((o, j) => (
                  <label key={o} className="lt-opt" data-opt={j}>
                    <input type="radio" name={`lt-${i}`} value={j} className="sr-only" />
                    <span className="chip" lang="en">
                      {o}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>
      <div className="lt-side grid content-start gap-4 md:sticky md:top-6">
        <p className="lt-pick text-ink-2">{tx(t.pick, locale)}</p>
        <p role="alert" className="text-sm font-semibold" data-o="hint" hidden>
          {tx(t.hint, locale)}
        </p>
        <button type="button" className="btn w-full" data-check="">
          {tx(t.check, locale)}
        </button>
        <div className="lt-result grid gap-3" data-result="" hidden tabIndex={-1}>
          <p className="flex flex-wrap items-center gap-3 text-sm text-ink-2">
            {tx(t.resultLabel, locale)}
            <span className="ex-tag">{ui.example[locale]}</span>
          </p>
          <p className="lt-level font-display" data-o="level" />
          <p className="lt-level-name" data-o="levelName" />
          <p className="text-sm text-ink-2" data-o="score" />
          <p className="lt-ielts" data-o="ielts" hidden />
          <p className="lt-group" data-o="group" />
          <a href="#data" className="btn w-full" data-o="cta">
            {tx(copy.trial, locale)}
          </a>
          <button type="button" className="btn btn-ghost w-full" data-reset="">
            {tx(t.reset, locale)}
          </button>
        </div>
        <p className="text-sm text-ink-2">{tx(t.note, locale)}</p>
      </div>
    </div>
  )
}

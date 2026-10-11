import { ui } from '@/core/i18n'
import { tx } from '@/core/text'
import type { Lead, Locale } from '@/core/types'
import type { Direction } from '@/directions/types'
import { copy } from './content'
import { ROW } from './plan-view'
import { ageLabel, MAX_AGE, vaccinePlan } from './vaccines'

export interface VaccineConfig {
  locale: Locale
  petLabels: { cat: string; dog: string }
  vaccineService: string
}

const DEFAULT_MONTHS = 2

/**
 * Сигнатура ниши vet: кошка или собака + возраст → ориентировочный график прививок.
 * Разметка — начальное состояние; островок niches/vet/island.ts пересчитывает график и подставляет даты.
 */
export function VaccineCalendar({ lead, locale, dir }: { lead: Lead; locale: Locale; dir: Direction }) {
  const skin = dir.vet!
  const pet = lead.vet!.defaultPet
  const rows = vaccinePlan(pet, DEFAULT_MONTHS, locale)
  const c = copy.calendar
  const config: VaccineConfig = {
    locale,
    petLabels: { cat: tx(copy.pets.cat, locale), dog: tx(copy.pets.dog, locale) },
    vaccineService: tx(copy.booking.services[1], locale),
  }
  return (
    <div
      data-vaccines=""
      data-pet={pet}
      style={{ ['--grow' as string]: DEFAULT_MONTHS / MAX_AGE }}
      className="vax grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-start md:gap-14">
      <script type="application/json" data-concept="" dangerouslySetInnerHTML={{ __html: JSON.stringify(config) }} />
      <div className="vax-art mx-auto w-full max-w-[17rem] md:sticky md:top-6 md:max-w-none">
        <skin.PetArt className="block h-auto w-full" />
      </div>
      <div className="grid content-start gap-6">
        <fieldset>
          <legend className="mb-3 text-sm text-ink-2">{tx(c.who, locale)}</legend>
          <div className="flex gap-2">
            {(['cat', 'dog'] as const).map((p) => (
              <label key={p}>
                <input type="radio" name="vax-pet" value={p} className="sr-only" defaultChecked={p === pet} />
                <span className="chip min-w-28 justify-center">{tx(copy.pets[p], locale)}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div>
          <p className="flex items-baseline justify-between gap-3">
            <span className="text-sm text-ink-2">{tx(c.age, locale)}</span>
            <output className="vax-age font-display" data-o="age">
              {ageLabel(DEFAULT_MONTHS, locale)}
            </output>
          </p>
          <input
            type="range"
            className="range"
            data-i="age"
            min={1}
            max={MAX_AGE}
            step={1}
            defaultValue={DEFAULT_MONTHS}
            aria-label={tx(c.age, locale)}
            aria-valuetext={ageLabel(DEFAULT_MONTHS, locale)}
            style={{ ['--p' as string]: `${((DEFAULT_MONTHS - 1) / (MAX_AGE - 1)) * 100}%` }}
          />
          <div className="flex justify-between text-xs text-ink-2">
            <span>{tx(c.ageMin, locale)}</span>
            <span>{tx(c.ageMax, locale)}</span>
          </div>
        </div>
        <ol data-o="plan" className="vax-plan border-b border-line" aria-live="polite">
          {rows.map((r) => (
            <li key={r.title + r.when} className={ROW.li} data-state={r.state}>
              <p className={ROW.when}>
                {r.when}
                {r.inWeeks !== undefined && r.inWeeks > 1 && <span className={ROW.date} data-weeks={r.inWeeks} />}
              </p>
              <p className={ROW.title}>{r.title}</p>
              {r.note && <p className={ROW.note}>{r.note}</p>}
            </li>
          ))}
        </ol>
        <p className="flex flex-wrap items-center gap-3 text-sm text-ink-2">
          <span className="ex-tag">{ui.example[locale]}</span>
          {tx(c.note, locale)}
        </p>
        <a href="#data" className="btn w-full sm:w-auto sm:justify-self-start" data-o="cta">
          {tx(copy.bookVaccine, locale)}
        </a>
      </div>
    </div>
  )
}

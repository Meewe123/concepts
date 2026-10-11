import type { CSSProperties } from 'react'
import { formatSum, groupDigits } from '@/core/format'
import { countWord } from '@/core/text'
import { schemes } from '@/directions/schemes'
import { HallScheme } from './HallScheme'
import { GUESTS_RU, TABLES_RU, plannerState, type PlannerConfig } from './planner-shared'

export interface PlannerLabels {
  sliderLabel: string
  perTable: string
  fits: string
  package: string
  estimate: string
  note: string
  example: string
  legend: string
  stage: string
  floor: string
}

/**
 * Сигнатура ниши banquet: «Сколько гостей?» → столы на схеме, подходящий зал, ориентир по стоимости.
 * Здесь — готовая разметка в начальном состоянии. Оживляет её островок island.ts (несколько КБ, без React):
 * он меняет --filled у схемы, подписи и видимость схем залов.
 */
export function HallPlanner({ config, direction, labels }: { config: PlannerConfig; direction: string; labels: PlannerLabels }) {
  const skin = schemes[direction]
  if (!skin) throw new Error(`Нет схемы зала для направления ${direction}`)
  const { locale, packages } = config
  const s = plannerState(config, config.defaultGuests, packages[Math.min(1, packages.length - 1)]!.id)

  return (
    <div
      data-planner=""
      className="planner grid gap-6 [grid-template-areas:'top'_'scheme'_'rest'] md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:grid-rows-[auto_1fr] md:gap-x-14 md:[grid-template-areas:'scheme_top'_'scheme_rest']"
    >
      <script type="application/json" data-concept="" dangerouslySetInnerHTML={{ __html: JSON.stringify(config) }} />
      <div className="grid gap-4 [grid-area:top]">
        <div className="flex items-end justify-between gap-4" aria-live="polite">
          <p className="planner-readout leading-none">
            <span className="planner-num font-display" data-o="guests">
              {groupDigits(s.guests)}
            </span>
            <span className="mt-2 block text-ink-2" data-o="guestsWord">
              {countWord(s.guests, locale, GUESTS_RU, 'mehmon')}
            </span>
          </p>
          <p className="text-right leading-tight">
            <span className="planner-num-sm font-display" data-o="tables">
              {s.tables}
            </span>{' '}
            <span data-o="tablesWord">{countWord(s.tables, locale, TABLES_RU, 'stol')}</span>
            <span className="block text-sm text-ink-2">{labels.perTable}</span>
          </p>
        </div>
        <div>
          <input
            type="range"
            className="range"
            data-i="range"
            min={10}
            max={s.max}
            step={10}
            defaultValue={s.guests}
            aria-label={labels.sliderLabel}
            aria-valuetext={s.valueText}
            style={{ '--p': `${s.progress}%` } as CSSProperties}
          />
          <div className="flex justify-between text-xs text-ink-2">
            <span>10</span>
            <span>{groupDigits(s.max)}</span>
          </div>
        </div>
      </div>

      <div className="planner-stage self-start [grid-area:scheme] md:sticky md:top-6" data-o="stage" style={{ '--filled': s.tables } as CSSProperties}>
        <p className="mb-3 flex items-baseline justify-between gap-3 text-sm text-ink-2">
          <span className="text-ink" data-o="hallName">
            {s.hall.name}
          </span>
          <span data-o="tablesOf">{s.tablesOf}</span>
        </p>
        {s.sorted.map((h) => (
          <div key={h.id} data-scheme={h.id} hidden={h.id !== s.hall.id}>
            <HallScheme capacity={h.capacity} skin={skin} label={`${h.name}: ${h.capacityLabel}`} stage={labels.stage} floor={labels.floor} />
          </div>
        ))}
        <p className="mt-3 flex items-center gap-2 text-sm text-ink-2">
          <svg viewBox="0 0 24 24" className="hall-scheme size-6" aria-hidden style={{ '--filled': 1 } as CSSProperties}>
            {skin.Defs && (
              <defs>
                <skin.Defs />
              </defs>
            )}
            <g className="t" style={{ '--i': 0 } as CSSProperties}>
              <skin.Table x={12} y={12} r={9} />
            </g>
          </svg>
          {labels.legend}
        </p>
      </div>

      <div className="grid content-start gap-6 [grid-area:rest]">
        <div className="grid gap-1" role="group" aria-label={labels.fits}>
          {s.sorted.map((h) => (
            <button
              key={h.id}
              type="button"
              data-hall={h.id}
              aria-pressed={h.id === s.hall.id}
              className="planner-hall flex min-h-12 items-center justify-between gap-3 border-b border-line text-left"
            >
              <span>
                {h.name}
                <span className="planner-fits ml-2 text-sm" data-fits="" hidden={h.id !== s.hall.id}>
                  · {labels.fits}
                </span>
              </span>
              <span className="text-sm text-ink-2">{h.capacityLabel}</span>
            </button>
          ))}
        </div>

        <fieldset>
          <legend className="mb-3 text-sm text-ink-2">{labels.package}</legend>
          <div className="flex flex-wrap gap-2">
            {packages.map((p) => (
              <label key={p.id}>
                <input type="radio" name="planner-package" value={p.id} className="sr-only" defaultChecked={p.id === s.pkg.id} />
                <span className="chip">{p.name}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="planner-estimate grid gap-2 border-t border-line pt-5" aria-live="polite">
          <p className="flex flex-wrap items-center gap-3 text-sm text-ink-2">
            {labels.estimate}
            <span className="ex-tag ex-tag-lg text-ink">{labels.example}</span>
          </p>
          <p className="planner-sum font-display leading-none" data-o="sum">
            ≈ {formatSum(s.total, locale)}
          </p>
          <p className="text-sm text-ink-2" data-o="calc">
            {s.calc}
          </p>
        </div>

        <a href="#data" className="btn w-full" data-o="cta">
          {s.cta}
        </a>
        <p className="text-sm text-ink-2">{labels.note}</p>
      </div>
    </div>
  )
}

/** family-warm: тёплый песок, мягкий зелёный, абрикос. Округлые формы, семейная интонация. */
export const css = /* css */ `
.concept[data-direction='family-warm'] {
  --c-bg: #f7f0e5;
  --c-bg-2: #efe5d4;
  --c-surface: #fffaf3;
  --c-ink: #2b2822;
  --c-ink-2: #5d574b;
  --c-accent: #3d6b50;
  --c-accent-ink: #ffffff;
  --c-line: rgba(43, 40, 34, 0.14);
  --c-focus: #3d6b50;
  --c-field: #fffaf3;
  --apricot: #f1b68e;
  --sage: #d3e3d2;
  --f-display: var(--font-nunito), system-ui, sans-serif;
  --f-body: var(--font-nunito), system-ui, sans-serif;
  --radius-btn: 999px;
  --radius-chip: 999px;
  --radius-field: 14px;
  font-size: 1.04rem;
}
[data-direction='family-warm'] .btn { font-weight: 800; letter-spacing: 0; }
[data-direction='family-warm'] .btn-ghost { box-shadow: inset 0 0 0 1.5px var(--c-ink); }
[data-direction='family-warm'] .chip { font-weight: 700; }
[data-direction='family-warm'] input:checked + .chip { background: var(--c-accent); border-color: var(--c-accent); color: #fff; }
[data-direction='family-warm'] .ex-tag { font-weight: 700; }

/* Семья из камешков: появляются по очереди */
.fw-pebble { transform-box: fill-box; transform-origin: center bottom; animation: fw-pop 0.6s cubic-bezier(0.3, 1.4, 0.5, 1) both; animation-delay: var(--d, 0s); }
@keyframes fw-pop { from { transform: scale(0.6); opacity: 0; } }

/* «Что вас беспокоит?» — круглые плитки */
[data-direction='family-warm'] .dc { display: grid; gap: 1.25rem; }
[data-direction='family-warm'] .dc-options { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.75rem; }
@media (min-width: 768px) { [data-direction='family-warm'] .dc-options { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; } }
[data-direction='family-warm'] .dc-card { flex-direction: column; align-items: flex-start; justify-content: space-between; gap: 0.9rem; min-height: 7.5rem; padding: 1rem; border-radius: 1.5rem; background: var(--c-surface); box-shadow: inset 0 0 0 1.5px var(--c-line); }
[data-direction='family-warm'] .dc-label { font-size: 1.1rem; font-weight: 800; line-height: 1.2; }
[data-direction='family-warm'] .fw-icon { display: grid; place-items: center; width: 2.75rem; height: 2.75rem; border-radius: 999px; background: var(--sage); color: var(--c-accent); transition: background-color 0.2s ease, color 0.2s ease; }
[data-direction='family-warm'] .dc-opt input:checked + .dc-card { background: var(--c-accent); color: #fff; box-shadow: none; }
[data-direction='family-warm'] .dc-opt input:checked + .dc-card .fw-icon { background: rgba(255, 255, 255, 0.18); color: #fff; }
@media (hover: hover) { [data-direction='family-warm'] .dc-opt:hover .dc-card { box-shadow: inset 0 0 0 1.5px var(--c-accent); } }
[data-direction='family-warm'] .dc-results { border-radius: 1.75rem; background: var(--c-surface); padding: 1.5rem; }
@media (min-width: 768px) { [data-direction='family-warm'] .dc-results { padding: 2.25rem; } }
[data-direction='family-warm'] .dc-empty { color: var(--c-ink-2); font-weight: 600; }
[data-direction='family-warm'] .dc-panel { gap: 1rem; }
@media (min-width: 900px) {
  [data-direction='family-warm'] .dc-panel:not(.dc-pain) { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); column-gap: 3rem; align-items: start; }
  [data-direction='family-warm'] .dc-panel > :not(.dc-plan) { grid-column: 1; }
  [data-direction='family-warm'] .dc-plan { grid-column: 2; grid-row: 1 / span 6; }
}
[data-direction='family-warm'] .dc-head { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
[data-direction='family-warm'] .dc-head-label { font-weight: 800; color: var(--c-ink-2); }
[data-direction='family-warm'] .dc-price { font-size: clamp(2rem, 8.6vw, 3rem); font-weight: 900; line-height: 1.05; letter-spacing: -0.02em; }
[data-direction='family-warm'] .dc-note { color: var(--c-ink-2); }
[data-direction='family-warm'] .dc-facts { display: flex; flex-wrap: wrap; gap: 0.5rem; }
[data-direction='family-warm'] .dc-facts div { display: flex; gap: 0.4rem; padding: 0.55rem 1rem; border-radius: 999px; background: var(--c-bg-2); }
[data-direction='family-warm'] .dc-facts dt { color: var(--c-ink-2); }
[data-direction='family-warm'] .dc-facts dt::after { content: ':'; }
[data-direction='family-warm'] .dc-facts dd { font-weight: 800; }
[data-direction='family-warm'] .dc-plan { display: grid; gap: 0.75rem; padding: 1.25rem; border-radius: 1.25rem; background: var(--sage); }
[data-direction='family-warm'] .dc-monthly { font-size: 1.5rem; font-weight: 900; }
[data-direction='family-warm'] .dc-per { font-size: 1rem; font-weight: 600; color: var(--c-ink-2); }
[data-direction='family-warm'] .dc-small { font-size: 0.95rem; color: var(--c-ink-2); }
[data-direction='family-warm'] .dc-calm { font-size: 1.4rem; font-weight: 800; line-height: 1.35; max-width: 26ch; }
[data-direction='family-warm'] .dc-cta { justify-self: stretch; }
@media (min-width: 640px) { [data-direction='family-warm'] .dc-cta { justify-self: start; } }

/* Первый визит — номера в абрикосовых кружках на пунктирной дорожке */
.fw-steps { display: grid; gap: 1.5rem; }
.fw-steps li { position: relative; display: grid; grid-template-columns: 3rem minmax(0, 1fr); gap: 1rem; }
.fw-steps li:not(:last-child)::before { content: ''; position: absolute; left: 1.5rem; top: 3.25rem; bottom: -1.25rem; border-left: 2px dashed var(--c-line); }
.fw-dot { display: grid; place-items: center; width: 3rem; height: 3rem; border-radius: 999px; background: var(--apricot); font-weight: 900; font-size: 1.2rem; }
@media (min-width: 900px) {
  .fw-steps { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
  .fw-steps li { padding: 1.5rem; border-radius: 1.5rem; background: var(--c-surface); }
  .fw-steps li::before { display: none; }
}

/* Семейный блок */
.fw-family { border-radius: 2rem; background: var(--c-accent); color: #fff; }
.fw-family .btn { background: #fff; color: var(--c-ink); }
@media (hover: hover) { .concept .fw-family .btn:hover { background: var(--sage); } }

@media (prefers-reduced-motion: reduce) { .fw-pebble { animation: none; } }
`

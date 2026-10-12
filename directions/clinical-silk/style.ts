/** clinical-silk: белый, ледяной голубой, графит. Точная сетка, цифры как в медицинском бланке. */
export const css = /* css */ `
.concept[data-direction='clinical-silk'] {
  --c-bg: #ffffff;
  --c-bg-2: #f1f6fa;
  --c-surface: #ffffff;
  --c-ink: #1b2229;
  --c-ink-2: #4c5864;
  --c-accent: #1b2229;
  --c-accent-ink: #ffffff;
  --c-line: #d5e0e8;
  --c-focus: #2a6c99;
  --c-field: #ffffff;
  --ice: #dceaf4;
  --ice-ink: #2a6c99;
  --f-display: var(--font-plex-sans), system-ui, sans-serif;
  --f-body: var(--font-plex-sans), system-ui, sans-serif;
  --f-mono: var(--font-plex-mono), ui-monospace, monospace;
  --radius-btn: 2px;
  --radius-chip: 2px;
  --radius-field: 2px;
}
.cs-mono { font-family: var(--f-mono); font-feature-settings: 'zero' 1; }
.cs-ice { color: var(--ice-ink); }
.cs-rule { background-image: linear-gradient(var(--c-line) 1px, transparent 1px); background-size: 100% 2.5rem; }
[data-direction='clinical-silk'] .btn { font-weight: 500; letter-spacing: 0.01em; }
[data-direction='clinical-silk'] .ex-tag { color: var(--ice-ink); border-color: var(--ice-ink); font-family: var(--f-mono); }
[data-direction='clinical-silk'] input:checked + .chip { background: var(--c-ink); border-color: var(--c-ink); color: #fff; }

/* Зубная формула в первом экране: клетки «бланка» по очереди подсвечиваются */
.cs-formula { display: grid; grid-template-columns: repeat(16, minmax(0, 1fr)); border-top: 1px solid var(--c-line); border-left: 1px solid var(--c-line); }
.cs-formula span { display: grid; place-items: center; aspect-ratio: 1 / 1.25; border-right: 1px solid var(--c-line); border-bottom: 1px solid var(--c-line); font-family: var(--f-mono); font-size: clamp(0.62rem, 2.6vw, 0.85rem); color: var(--c-ink-2); }
.cs-formula span:nth-child(8n) { border-right-color: var(--c-ink); }
.cs-formula .cs-mid { border-bottom-color: var(--c-ink); }
.cs-formula span { animation: cs-cell 1.1s ease-in-out both; animation-delay: calc(var(--i) * 0.045s + 0.4s); }
@keyframes cs-cell { 0%, 100% { background: transparent; } 35% { background: var(--ice); } }

/* «Что вас беспокоит?» — строки бланка */
[data-direction='clinical-silk'] .dc { display: grid; gap: 2rem; }
@media (min-width: 900px) { [data-direction='clinical-silk'] .dc { grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); align-items: start; gap: 3.5rem; } }
[data-direction='clinical-silk'] .dc-options { border-top: 1px solid var(--c-ink); }
[data-direction='clinical-silk'] .dc-card { min-height: 3.75rem; padding: 0 0.25rem 0 0.75rem; border-bottom: 1px solid var(--c-line); border-left: 3px solid transparent; }
[data-direction='clinical-silk'] .dc-label { flex: 1; font-size: 1.15rem; font-weight: 500; }
[data-direction='clinical-silk'] .cs-num { font-family: var(--f-mono); font-size: 0.85rem; color: var(--ice-ink); width: 1.75rem; }
[data-direction='clinical-silk'] .cs-box { width: 1.25rem; height: 1.25rem; border: 1.5px solid var(--c-ink-2); display: grid; place-items: center; transition: background-color 0.2s ease, border-color 0.2s ease; }
[data-direction='clinical-silk'] .cs-box svg { opacity: 0; transition: opacity 0.15s ease; }
[data-direction='clinical-silk'] .dc-opt input:checked + .dc-card { background: var(--c-bg-2); border-left-color: var(--c-ink); }
[data-direction='clinical-silk'] .dc-opt input:checked + .dc-card .cs-box { background: var(--c-ink); border-color: var(--c-ink); }
[data-direction='clinical-silk'] .dc-opt input:checked + .dc-card .cs-box svg { opacity: 1; }
@media (hover: hover) { [data-direction='clinical-silk'] .dc-opt:hover .dc-card { background: var(--c-bg-2); } }
[data-direction='clinical-silk'] .dc-results { border: 1px solid var(--c-ink); padding: 1.25rem; background: #fff; }
@media (min-width: 900px) { [data-direction='clinical-silk'] .dc-results { position: sticky; top: 1.5rem; padding: 2rem; } }
[data-direction='clinical-silk'] .dc-empty { font-family: var(--f-mono); font-size: 0.9rem; color: var(--c-ink-2); line-height: 1.6; }
[data-direction='clinical-silk'] .dc-panel { gap: 1rem; }
[data-direction='clinical-silk'] .dc-head { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
[data-direction='clinical-silk'] .dc-head-label { font-family: var(--f-mono); font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--c-ink-2); }
[data-direction='clinical-silk'] .dc-price { font-size: clamp(1.75rem, 7.4vw, 2.6rem); font-weight: 600; letter-spacing: -0.02em; line-height: 1.1; }
[data-direction='clinical-silk'] .dc-note { font-size: 0.95rem; color: var(--ice-ink); }
[data-direction='clinical-silk'] .dc-facts { border-top: 1px solid var(--c-line); }
[data-direction='clinical-silk'] .dc-facts div { display: flex; align-items: baseline; gap: 0.75rem; padding: 0.7rem 0; border-bottom: 1px solid var(--c-line); }
[data-direction='clinical-silk'] .dc-facts dt { font-family: var(--f-mono); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--c-ink-2); }
[data-direction='clinical-silk'] .dc-facts div::after { content: ''; order: 1; flex: 1; border-bottom: 1px dotted var(--c-line); }
[data-direction='clinical-silk'] .dc-facts dd { order: 2; font-weight: 500; text-align: right; }
[data-direction='clinical-silk'] .dc-plan { display: grid; gap: 0.6rem; padding: 1rem; background: var(--c-bg-2); }
[data-direction='clinical-silk'] .dc-monthly { font-size: 1.35rem; font-weight: 600; }
[data-direction='clinical-silk'] .dc-per { font-size: 1rem; font-weight: 400; color: var(--c-ink-2); }
[data-direction='clinical-silk'] .dc-small { font-size: 0.9rem; color: var(--c-ink-2); }
[data-direction='clinical-silk'] .dc-calm { font-size: 1.35rem; line-height: 1.4; max-width: 28ch; }
[data-direction='clinical-silk'] .dc-cta { justify-self: stretch; }
@media (min-width: 640px) { [data-direction='clinical-silk'] .dc-cta { justify-self: start; } }

/* Протокол первого визита */
.cs-steps { counter-reset: s; border-top: 1px solid var(--c-ink); }
.cs-steps li { display: grid; grid-template-columns: 4.5rem minmax(0, 1fr); gap: 1rem; padding: 1.25rem 0; border-bottom: 1px solid var(--c-line); }
@media (min-width: 900px) {
  .cs-steps { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border-top: 0; }
  .cs-steps li { grid-template-columns: 1fr; border-top: 1px solid var(--c-ink); border-bottom: 0; padding-right: 1.5rem; }
}

@media (prefers-reduced-motion: reduce) { .cs-formula span { animation: none; } }
`

/** marble-brass: тёплый мрамор (генеративная фактура), латунь, графит. Дворцовая симметрия, анфилада залов. */
const MARBLE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='640' height='640'><filter id='m' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='.0032 .0105' numOctaves='5' seed='11' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .42  0 0 0 0 .39  0 0 0 0 .35  1 0 0 0 0'/><feComponentTransfer><feFuncA type='table' tableValues='0 0 0 0 .05 .32 .05 0 0 0 0'/></feComponentTransfer></filter><rect width='100%' height='100%' filter='url(%23m)'/></svg>\")"

export const css = /* css */ `
.concept[data-direction='marble-brass'] {
  --c-bg: #eee8de;
  --c-bg-2: #e4dbcc;
  --c-surface: #f8f4ed;
  --c-ink: #22201e;
  --c-ink-2: #58534b;
  --c-accent: #22201e;
  --c-accent-ink: #f1e3c4;
  --c-line: rgba(34, 32, 30, 0.16);
  --c-focus: #8a6a33;
  --c-field: #f8f4ed;
  --brass: #a5803f;
  --brass-ink: #74571f;
  --f-display: var(--font-literata), Georgia, serif;
  --f-body: var(--font-commissioner), system-ui, sans-serif;
  --radius-btn: 0;
  --radius-chip: 0;
  --radius-field: 0;
}
.mb-marble { background-color: var(--c-bg); background-image: ${MARBLE}; }
[data-direction='marble-brass'] .btn { letter-spacing: 0.06em; box-shadow: inset 0 0 0 1px var(--c-ink), inset 0 0 0 3px var(--c-accent), inset 0 0 0 4px var(--brass); }
[data-direction='marble-brass'] .btn-ghost { box-shadow: inset 0 0 0 1px var(--brass); }
[data-direction='marble-brass'] input:checked + .chip { background: var(--c-ink); border-color: var(--c-ink); color: var(--c-accent-ink); }
[data-direction='marble-brass'] .font-display { font-variant-numeric: lining-nums; }
.mb-brass { color: var(--brass-ink); }
.mb-rule { height: 5px; border-top: 1px solid var(--brass); border-bottom: 1px solid var(--brass); }
.mb-art { stroke: var(--brass); fill: none; stroke-linecap: round; }
.mb-rise { opacity: 0; transform: translateY(10px); animation: mb-rise 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) forwards; animation-delay: var(--d, 0.2s); }
@keyframes mb-rise { to { opacity: 1; transform: none; } }

/* Анфилада: дверь выбранного зала светится латунью */
.mb-door { fill: rgba(34, 32, 30, 0.05); stroke: var(--brass); stroke-width: 1.4; transition: fill 0.4s ease; }
.mb-door-label { fill: var(--c-ink-2); font-family: var(--f-body); font-size: 11px; transition: fill 0.4s ease; }

/* Схема зала */
.mb-scheme { stroke: var(--brass); fill: none; }
.mb-scheme-text { fill: var(--c-ink-2); font-family: var(--f-body); }
[data-direction='marble-brass'] .hall-scheme .t-off { fill: none; stroke: var(--brass); stroke-width: 1; }
[data-direction='marble-brass'] .hall-scheme .t-on { fill: var(--c-ink); stroke: var(--brass); stroke-width: 1.5; }
[data-direction='marble-brass'] .hall-scheme .t-dot { fill: var(--brass); opacity: var(--on); }

[data-direction='marble-brass'] .planner-num { font-size: clamp(4.5rem, 20vw, 7rem); }
[data-direction='marble-brass'] .planner-num-sm { font-size: 2.25rem; }
[data-direction='marble-brass'] .planner-sum { font-size: clamp(2rem, 8.5vw, 3rem); font-weight: 600; }
[data-direction='marble-brass'] .planner-fits { color: var(--brass-ink); }
[data-direction='marble-brass'] .planner-hall[aria-pressed='false'] { color: var(--c-ink-2); }

@media (prefers-reduced-motion: reduce) {
  .mb-rise { animation: none; opacity: 1; transform: none; }
}
`

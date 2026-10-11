/** warm-paper: кремовая бумага, лес, терракота-сигнал. Питомцы нарисованы линией. */
const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .32  0 0 0 0 .25  0 0 0 0 .14  0 0 0 .1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"

export const css = /* css */ `
.concept[data-direction='warm-paper'] {
  --c-bg: #f5eedf;
  --c-bg-2: #ede3cf;
  --c-surface: #fbf7ee;
  --c-ink: #22302a;
  --c-ink-2: #585746;
  --c-accent: #1f4d3a;
  --c-accent-ink: #f8f2e5;
  --c-line: rgba(34, 48, 42, 0.18);
  --c-focus: #c4532d;
  --c-field: #fbf7ee;
  --forest: #1f4d3a;
  --terracotta: #b8492a;
  --f-display: var(--font-literata), Georgia, serif;
  --f-body: var(--font-ysabeau), system-ui, sans-serif;
  --radius-btn: 999px;
  --radius-chip: 999px;
  --radius-field: 10px;
  background-image: ${NOISE};
}
[data-direction='warm-paper'] .bg-bg-2 { background-image: ${NOISE}; }
[data-direction='warm-paper'] { font-size: 1.0625rem; }
[data-direction='warm-paper'] .btn { font-weight: 700; letter-spacing: 0.01em; }
[data-direction='warm-paper'] input:checked + .chip { background: var(--forest); border-color: var(--forest); color: var(--c-accent-ink); }

.wp-pet, .wp-hero-pets { stroke: var(--forest); stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; }
.wp-dot { fill: var(--forest); stroke: none; }
.wp-heart { fill: var(--terracotta); stroke: none; }
.wp-squiggle { stroke: var(--terracotta); stroke-width: 2.4; stroke-linecap: round; }
.wp-draw { stroke-dasharray: 1.02; stroke-dashoffset: 1.02; animation: wp-draw 1.1s cubic-bezier(0.5, 0, 0.3, 1) forwards; animation-delay: var(--d, 0s); }
@keyframes wp-draw { to { stroke-dashoffset: 0; } }
.wp-pop { opacity: 0; animation: wp-pop 0.6s ease forwards; animation-delay: var(--d, 1.6s); transform-box: fill-box; transform-origin: center; }
@keyframes wp-pop { from { opacity: 0; transform: scale(0.4); } to { opacity: 1; transform: none; } }

/* Календарь: какой питомец виден. Смена display перезапускает «рисование» */
[data-pet='cat'] .wp-pet .wp-dog, [data-pet='dog'] .wp-pet .wp-cat { display: none; }

/* Карточка графика: как бумажная карточка с линовкой */
[data-direction='warm-paper'] .vax-plan {
  background: var(--c-surface);
  padding: 0.25rem 1.25rem;
  border: 1px solid var(--c-line);
  border-radius: 6px;
  box-shadow: 0 14px 28px -20px rgba(34, 48, 42, 0.5);
  transform: rotate(-0.6deg);
}
[data-direction='warm-paper'] .vax-row:first-child { border-top-color: transparent; }
[data-direction='warm-paper'] .vax-when { font-family: var(--f-display); font-style: italic; }
[data-direction='warm-paper'] .vax-row[data-state='next'] .vax-title { color: var(--terracotta); text-decoration: underline wavy var(--terracotta) 1.5px; text-underline-offset: 5px; }
[data-direction='warm-paper'] .vax-row[data-state='past'] { opacity: 0.75; }
[data-direction='warm-paper'] .vax-age { font-size: 1.6rem; font-style: italic; }

@media (prefers-reduced-motion: reduce) {
  .wp-draw { animation: none; stroke-dashoffset: 0; }
  .wp-pop { animation: none; opacity: 1; }
}
`

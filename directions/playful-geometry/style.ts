/** playful-geometry: солнечный жёлтый, чернила, белый. Питомцы собраны из простых фигур. */
export const css = /* css */ `
.concept[data-direction='playful-geometry'] {
  --c-bg: #fffdf6;
  --c-bg-2: #fff1bd;
  --c-surface: #ffffff;
  --c-ink: #17161c;
  --c-ink-2: #545160;
  --c-accent: #17161c;
  --c-accent-ink: #ffd23f;
  --c-line: rgba(23, 22, 28, 0.16);
  --c-focus: #17161c;
  --c-field: #ffffff;
  --yellow: #ffd23f;
  --f-display: var(--font-unbounded), system-ui, sans-serif;
  --f-body: var(--font-onest), system-ui, sans-serif;
  --radius-btn: 999px;
  --radius-chip: 999px;
  --radius-field: 14px;
}
[data-direction='playful-geometry'] .btn { font-weight: 700; }
[data-direction='playful-geometry'] .btn-ghost { box-shadow: inset 0 0 0 2px var(--c-ink); }
[data-direction='playful-geometry'] .chip { border-width: 2px; border-color: var(--c-ink); font-weight: 600; }
[data-direction='playful-geometry'] input:checked + .chip { background: var(--yellow); color: var(--c-ink); border-color: var(--c-ink); }
[data-direction='playful-geometry'] .range::-webkit-slider-thumb { background: var(--yellow); border: 3px solid var(--c-ink); box-shadow: none; width: 30px; height: 30px; margin-top: -13px; }
[data-direction='playful-geometry'] .range::-moz-range-thumb { background: var(--yellow); border: 3px solid var(--c-ink); box-shadow: none; }

/* Питомец из фигур */
.pg-sun { fill: var(--yellow); }
.pg-ink { stroke: var(--c-ink); stroke-width: 4; stroke-linejoin: round; }
.pg-ink-line { stroke: var(--c-ink); fill: none; stroke-linecap: round; stroke-linejoin: round; }
.pg-fill-yellow { fill: var(--yellow); }
.pg-fill-white { fill: #ffffff; }
.pg-fill-ink { fill: var(--c-ink); }
.pg-pet .pg-cat, .pg-pet .pg-dog, .pg-pet .pg-head {
  transform-box: fill-box;
  transform-origin: center;
  transition: opacity 0.3s ease, transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
}
[data-pet='cat'] .pg-pet .pg-dog, [data-pet='dog'] .pg-pet .pg-cat { opacity: 0; transform: scale(0.2); }
[data-pet='cat'] .pg-pet .pg-head { transform: scale(0.88); }
.pg-body-wrap { transform-box: view-box; transform-origin: 200px 392px; transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1); }
.vax .pg-body-wrap { transform: scale(calc(0.7 + var(--grow, 0.15) * 0.3)); }

/* Первый экран: два питомца выглядывают из-за круга */
.pg-hero-pets .pg-pet { overflow: visible; }
.pg-bounce { animation: pg-bounce 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) both; animation-delay: var(--d, 0s); transform-origin: 50% 100%; }
@keyframes pg-bounce { from { transform: translateY(18%) scale(0.85); opacity: 0; } to { transform: none; opacity: 1; } }

[data-direction='playful-geometry'] .font-display { font-weight: 800; letter-spacing: -0.03em; }

/* Календарь прививок */
[data-direction='playful-geometry'] .vax-row[data-state='next'] {
  background: var(--yellow);
  border-radius: 18px;
  border-top-color: transparent;
  padding-inline: 0.9rem;
  margin-inline: -0.9rem;
}
[data-direction='playful-geometry'] .vax-row[data-state='next'] + .vax-row { border-top-color: transparent; }
[data-direction='playful-geometry'] .vax-row[data-state='next'] .vax-when,
[data-direction='playful-geometry'] .vax-row[data-state='next'] .vax-note { color: var(--c-ink); }
[data-direction='playful-geometry'] .vax-row[data-state='past'] .vax-title { color: var(--c-ink-2); }
[data-direction='playful-geometry'] .vax-age { font-size: 1.5rem; font-weight: 800; letter-spacing: -0.03em; }
[data-direction='playful-geometry'] .vax-date { color: var(--c-ink); font-weight: 600; }

@media (prefers-reduced-motion: reduce) {
  .pg-bounce { animation: none; }
}
`

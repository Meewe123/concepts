/** suzani-night: глубокий изумруд, слоновая кость, тонкое золото. Орнамент рисуется линией. */
export const css = /* css */ `
.concept[data-direction='suzani-night'] {
  --c-bg: #0b2620;
  --c-bg-2: #0e2d26;
  --c-surface: #12362e;
  --c-ink: #f3ead7;
  --c-ink-2: #bfc8b6;
  --c-accent: #d4b06a;
  --c-accent-ink: #0b2620;
  --c-line: rgba(212, 176, 106, 0.3);
  --c-focus: #f3ead7;
  --c-field: rgba(243, 234, 215, 0.04);
  --gold: #d4b06a;
  --f-display: var(--font-cormorant), 'Times New Roman', serif;
  --f-body: var(--font-onest), system-ui, sans-serif;
  --radius-btn: 2px;
  --radius-chip: 2px;
  --radius-field: 2px;
  --radius-thumb: 2px;
}

[data-direction='suzani-night'] .font-display { font-variant-numeric: lining-nums tabular-nums; }
[data-direction='suzani-night'] .btn {
  box-shadow: inset 0 0 0 3px var(--c-accent), inset 0 0 0 4px rgba(11, 38, 32, 0.55);
}
[data-direction='suzani-night'] .btn-ghost {
  box-shadow: inset 0 0 0 1px var(--c-line);
  color: var(--c-ink);
}
[data-direction='suzani-night'] .chip { border-color: var(--c-line); }
[data-direction='suzani-night'] input:checked + .chip,
[data-direction='suzani-night'] .chip[aria-pressed='true'] {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--c-bg);
}

/* Розетка: золото рисуется линией, прорезь — цветом фона */
.sz-rosette { stroke: var(--gold); }
.sz-rosette .sz-cut { stroke: var(--c-bg); }
.sz-rosette .sz-dot { fill: var(--gold); }
.sz-draw {
  stroke-dasharray: 1.05;
  stroke-dashoffset: 1.05;
  animation: sz-draw 2.2s cubic-bezier(0.55, 0.1, 0.25, 1) forwards;
  animation-delay: calc(var(--d, 0s) + 0.15s);
}
.sz-still .sz-draw { animation: none; stroke-dashoffset: 0; }
@keyframes sz-draw { to { stroke-dashoffset: 0; } }

.sz-glow {
  background:
    radial-gradient(closest-side, rgba(212, 176, 106, 0.16), transparent 70%),
    radial-gradient(closest-side, rgba(25, 80, 66, 0.9), transparent);
}

.sz-rise { opacity: 0; transform: translateY(12px); animation: sz-rise 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) forwards; animation-delay: var(--d, 0.9s); }
@keyframes sz-rise { to { opacity: 1; transform: none; } }

.sz-title em { font-style: italic; color: var(--gold); }

/* Арка — рамка фото и залов */
.sz-arch { border-radius: 999px 999px 2px 2px; }
.sz-arch-line { border-radius: 999px 999px 0 0; border: 1px solid var(--c-line); }

/* Схема зала */
.sz-scheme-line { stroke: var(--gold); fill: none; }
.sz-scheme-text { fill: var(--c-ink-2); font-family: var(--f-body); }
[data-direction='suzani-night'] .hall-scheme .t-off { fill: none; stroke: var(--gold); stroke-width: 1; }
[data-direction='suzani-night'] .hall-scheme .t-on { fill: var(--c-ink); stroke: var(--gold); stroke-width: 1; }
[data-direction='suzani-night'] .hall-scheme .t-core { fill: var(--gold); opacity: var(--on); transition: opacity .3s ease; }

[data-direction='suzani-night'] .planner-num { font-size: clamp(4.5rem, 20vw, 7rem); font-weight: 400; }
[data-direction='suzani-night'] .planner-num-sm { font-size: 2.25rem; font-weight: 400; }
[data-direction='suzani-night'] .planner-sum { font-size: clamp(2.25rem, 9vw, 3.25rem); font-weight: 400; color: var(--gold); }
[data-direction='suzani-night'] .planner-fits { color: var(--gold); }
[data-direction='suzani-night'] .planner-hall[aria-pressed='true'] { color: var(--c-ink); }
[data-direction='suzani-night'] .planner-hall[aria-pressed='false'] { color: var(--c-ink-2); }

/* Меню как карточка ресторана: точечные отточия до цены */
.sz-leader { flex: 1; border-bottom: 1px dotted var(--c-line); transform: translateY(-0.35em); min-width: 0.75rem; }

@media (prefers-reduced-motion: reduce) {
  .sz-draw { animation: none; stroke-dashoffset: 0; }
  .sz-rise { animation: none; opacity: 1; transform: none; }
}
`

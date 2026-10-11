/** crimson-velvet: бордовый бархат, шампань, кремовый. Занавес открывает сцену, роза — тонкими линиями. */
export const css = /* css */ `
.concept[data-direction='crimson-velvet'] {
  --c-bg: #45101c;
  --c-bg-2: #3a0d17;
  --c-surface: #521525;
  --c-ink: #f6ecdf;
  --c-ink-2: #dcc4b6;
  --c-accent: #e8cf9f;
  --c-accent-ink: #3a0d17;
  --c-line: rgba(232, 207, 159, 0.28);
  --c-focus: #f6ecdf;
  --c-field: rgba(246, 236, 223, 0.05);
  --champagne: #e8cf9f;
  --f-display: var(--font-playfair), Georgia, serif;
  --f-body: var(--font-commissioner), system-ui, sans-serif;
  --radius-btn: 999px;
  --radius-chip: 999px;
  --radius-field: 8px;
}
[data-direction='crimson-velvet'] .btn { font-weight: 600; letter-spacing: 0.02em; }
[data-direction='crimson-velvet'] .btn-ghost { box-shadow: inset 0 0 0 1px var(--champagne); }
[data-direction='crimson-velvet'] input:checked + .chip { background: var(--champagne); border-color: var(--champagne); color: var(--c-accent-ink); }
[data-direction='crimson-velvet'] .font-display { font-variant-numeric: lining-nums; }

.cv-rose { stroke: var(--champagne); stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; }
.cv-draw { stroke-dasharray: 1.02; stroke-dashoffset: 1.02; animation: cv-draw 1.4s cubic-bezier(0.5, 0, 0.25, 1) forwards; animation-delay: calc(var(--d, 0s) + 0.9s); }
@keyframes cv-draw { to { stroke-dashoffset: 0; } }
.cv-still .cv-draw { animation: none; stroke-dashoffset: 0; }
.cv-petal { opacity: clamp(0.1, calc(var(--ratio, 1) * 12 - var(--k)), 1); transition: opacity 0.35s ease; }

/* Занавес */
.cv-curtain { position: absolute; inset: 0; z-index: 20; pointer-events: none; overflow: hidden; }
.cv-drape {
  position: absolute; top: 0; bottom: 0; width: 52%;
  background:
    linear-gradient(90deg, rgba(0, 0, 0, 0.35), transparent 30%, rgba(255, 255, 255, 0.06) 50%, transparent 70%, rgba(0, 0, 0, 0.3)),
    repeating-linear-gradient(90deg, #5e1526 0 16px, #3b0a15 16px 30px, #6e1c2e 30px 40px, #4a0f1c 40px 52px);
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
}
.cv-drape-l { left: 0; transform-origin: left center; animation: cv-open-l 1.6s cubic-bezier(0.65, 0, 0.35, 1) 0.15s forwards; }
.cv-drape-r { right: 0; transform-origin: right center; animation: cv-open-r 1.6s cubic-bezier(0.65, 0, 0.35, 1) 0.15s forwards; }
@keyframes cv-open-l { to { transform: translateX(-91%); } }
@keyframes cv-open-r { to { transform: translateX(91%); } }
.cv-still .cv-drape-l { animation: none; transform: translateX(-91%); }
.cv-still .cv-drape-r { animation: none; transform: translateX(91%); }
.cv-valance { position: absolute; top: 0; left: 0; width: 100%; height: 34px; fill: #5e1526; filter: drop-shadow(0 6px 6px rgba(0, 0, 0, 0.35)); }

/* Залы — сцена с ламбрекеном */
.cv-stage { position: relative; background: radial-gradient(ellipse at 50% 0%, #6a1c2e, var(--c-surface) 70%); }
.cv-stage::before {
  content: ''; position: absolute; inset: 0 0 auto; height: 22px;
  background: radial-gradient(circle at 12px -4px, transparent 13px, #5e1526 14px) 0 0 / 24px 22px repeat-x;
}

/* Схема зала */
.cv-scheme { stroke: var(--champagne); fill: none; }
.cv-scheme-text { fill: var(--c-ink-2); font-family: var(--f-body); }
[data-direction='crimson-velvet'] .hall-scheme .t-off { fill: none; stroke: var(--champagne); stroke-width: 1; }
[data-direction='crimson-velvet'] .hall-scheme .t-on { fill: var(--c-ink); stroke: var(--champagne); stroke-width: 1; }
[data-direction='crimson-velvet'] .hall-scheme .t-spiral { fill: none; stroke: #9b2f45; stroke-width: 1.2; opacity: var(--on); }

[data-direction='crimson-velvet'] .planner-num { font-size: clamp(4.5rem, 20vw, 7rem); font-style: italic; }
[data-direction='crimson-velvet'] .planner-num-sm { font-size: 2.25rem; font-style: italic; }
[data-direction='crimson-velvet'] .planner-sum { font-size: clamp(2rem, 8.5vw, 3rem); color: var(--champagne); }
[data-direction='crimson-velvet'] .planner-fits { color: var(--champagne); }
[data-direction='crimson-velvet'] .planner-hall[aria-pressed='false'] { color: var(--c-ink-2); }

@media (prefers-reduced-motion: reduce) {
  .cv-draw { animation: none; stroke-dashoffset: 0; }
  .cv-drape-l { animation: none; transform: translateX(-91%); }
  .cv-drape-r { animation: none; transform: translateX(91%); }
}
`

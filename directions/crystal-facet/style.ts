/** crystal-facet: ледяной белый, хрустальный голубой, графит; радужная дисперсия — только акцентом. */
export const css = /* css */ `
@property --bf-spread { syntax: '<angle>'; inherits: true; initial-value: 3.2deg; }

.concept[data-direction='crystal-facet'] {
  --c-bg: #f2f5f8;
  --c-bg-2: #e6edf3;
  --c-surface: #ffffff;
  --c-ink: #121820;
  --c-ink-2: #4a5764;
  --c-accent: #121820;
  --c-accent-ink: #ffffff;
  --c-line: rgba(18, 24, 32, 0.14);
  --c-focus: #2f5f86;
  --c-field: #ffffff;
  --crystal-deep: #2f5f86;
  --spectrum: linear-gradient(90deg, #ff5a5f, #ff9f43, #f2c94c, #3ccf8e, #2fb4ea, #6d7cf0);
  --f-display: var(--font-unbounded), system-ui, sans-serif;
  --f-body: var(--font-onest), system-ui, sans-serif;
  --radius-btn: 0;
  --radius-chip: 0;
  --radius-field: 0;
  --radius-thumb: 2px;
}

/* Кнопка — срезанные углы, как грань, и спектральная кромка снизу */
[data-direction='crystal-facet'] .btn {
  clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
  background-color: var(--c-accent);
  background-image: var(--spectrum);
  background-size: 100% 3px;
  background-position: bottom;
  background-repeat: no-repeat;
}
[data-direction='crystal-facet'] .btn-ghost {
  clip-path: none;
  background: transparent;
  box-shadow: inset 0 0 0 1px rgba(18, 24, 32, 0.28);
}
[data-direction='crystal-facet'] .range::-webkit-slider-thumb { transform: rotate(45deg); border-radius: 2px; }
[data-direction='crystal-facet'] .range::-moz-range-thumb { transform: rotate(45deg); border-radius: 2px; }

.bf-bar { background: var(--spectrum); }
.bf-cut { clip-path: polygon(14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px), 0 14px); }
.bf-card-hl::before { content: ''; position: absolute; inset: 0 0 auto; height: 4px; background: var(--spectrum); }

/* Подвеска-кристалл: луч входит, преломляется и раскладывается в спектр */
.bf-art .bf-edge { stroke: rgba(18, 24, 32, 0.5); stroke-width: 0.8; fill: none; }
.bf-art .bf-ray { stroke: var(--c-ink); stroke-width: 1.3; fill: none; }
.bf-art .bf-inner { stroke: #ffffff; stroke-width: 2; fill: none; opacity: 0.9; }
.bf-spec { --bf-spread: 3.2deg; }
.bf-spec line {
  stroke-width: 2.2;
  stroke-linecap: round;
  transform-box: view-box;
  transform-origin: var(--ox) var(--oy);
  transform: rotate(calc(var(--a0) + var(--k) * var(--bf-spread)));
}
.bf-draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: bf-draw 0.9s cubic-bezier(0.6, 0.1, 0.3, 1) forwards; animation-delay: var(--d, 0s); }
@keyframes bf-draw { to { stroke-dashoffset: 0; } }
.bf-fade { opacity: 0; animation: bf-fade 1s ease forwards; animation-delay: var(--d, 0s); }
@keyframes bf-fade { to { opacity: 1; } }
.bf-still .bf-draw { animation: none; stroke-dashoffset: 0; }
.bf-still .bf-fade { animation: none; opacity: 1; }
.bf-spark { transform-box: fill-box; transform-origin: center; animation: bf-spark 2.4s ease-in-out 1.6s both; }
@keyframes bf-spark { 0%, 100% { opacity: 0.2; transform: scale(0.6); } 40% { opacity: 1; transform: scale(1.15); } }

@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: scroll()) {
    .bf-art:not(.bf-still) .bf-spec {
      animation: bf-spread linear both;
      animation-timeline: scroll(root);
      animation-range: 0 75vh;
    }
    @keyframes bf-spread { from { --bf-spread: 1.4deg; } to { --bf-spread: 6deg; } }
  }
}

/* Схема зала: столы — шестигранники, занятые ловят свет */
.bf-scheme-line { stroke: rgba(18, 24, 32, 0.4); fill: none; }
.bf-scheme-text { fill: var(--c-ink-2); font-family: var(--f-body); }
[data-direction='crystal-facet'] .hall-scheme .t-off { fill: none; stroke: rgba(18, 24, 32, 0.35); stroke-width: 1; }
[data-direction='crystal-facet'] .hall-scheme .t-on { stroke-width: 1.4; }

[data-direction='crystal-facet'] .planner-num { font-size: clamp(4rem, 19vw, 6.5rem); font-weight: 800; letter-spacing: -0.05em; }
[data-direction='crystal-facet'] .planner-num-sm { font-size: 2rem; font-weight: 800; letter-spacing: -0.04em; }
[data-direction='crystal-facet'] .planner-sum { font-size: clamp(1.75rem, 7.5vw, 2.6rem); font-weight: 800; letter-spacing: -0.04em; }
[data-direction='crystal-facet'] .planner-fits { color: var(--crystal-deep); }
[data-direction='crystal-facet'] .planner-hall[aria-pressed='true'] { font-weight: 600; }
[data-direction='crystal-facet'] .planner-hall[aria-pressed='false'] { color: var(--c-ink-2); }

@media (prefers-reduced-motion: reduce) {
  .bf-draw { animation: none; stroke-dashoffset: 0; }
  .bf-fade { animation: none; opacity: 1; }
  .bf-spark { animation: none; opacity: 1; }
}
`

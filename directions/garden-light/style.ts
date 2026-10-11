/** garden-light: оливковый, песок, медь. Ботанические линии, план зала как план сада. */
export const css = /* css */ `
.concept[data-direction='garden-light'] {
  --c-bg: #f4ecdb;
  --c-bg-2: #ebe1c9;
  --c-surface: #faf5ea;
  --c-ink: #2b2a1e;
  --c-ink-2: #5b5741;
  --c-accent: #4d5a2c;
  --c-accent-ink: #faf5ea;
  --c-line: rgba(43, 42, 30, 0.18);
  --c-focus: #a85f33;
  --c-field: #faf5ea;
  --olive: #4d5a2c;
  --copper: #a85f33;
  --copper-ink: #8f4f29;
  --f-display: var(--font-spectral), Georgia, serif;
  --f-body: var(--font-ysabeau), system-ui, sans-serif;
  --radius-btn: 6px;
  --radius-chip: 6px;
  --radius-field: 6px;
  font-size: 1.0625rem;
}
[data-direction='garden-light'] .btn { font-weight: 700; }
[data-direction='garden-light'] input:checked + .chip { background: var(--olive); border-color: var(--olive); color: var(--c-accent-ink); }
[data-direction='garden-light'] .font-display { font-variant-numeric: lining-nums; }

.gl-branch { stroke: var(--olive); stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
.gl-draw { stroke-dasharray: 1.02; stroke-dashoffset: 1.02; animation: gl-draw 1.3s cubic-bezier(0.5, 0, 0.3, 1) forwards; animation-delay: var(--d, 0s); }
@keyframes gl-draw { to { stroke-dashoffset: 0; } }
.gl-still .gl-draw { animation: none; stroke-dashoffset: 0; }
.gl-leaf { opacity: clamp(0.08, calc(var(--ratio, 1) * 10 - var(--k)), 1); transition: opacity 0.4s ease; }
.gl-bloom { fill: var(--copper); stroke: none; opacity: 0; animation: gl-bloom 0.6s ease forwards; animation-delay: var(--d, 1.4s); transform-box: fill-box; transform-origin: center; }
.gl-still .gl-bloom { animation: none; opacity: 1; }
@keyframes gl-bloom { from { opacity: 0; transform: scale(0); } to { opacity: 1; transform: none; } }
.gl-copper { color: var(--copper-ink); }

/* Схема зала — план сада */
.gl-scheme { stroke: var(--olive); fill: none; }
.gl-scheme-text { fill: var(--c-ink-2); font-family: var(--f-body); }
[data-direction='garden-light'] .hall-scheme .t-off { fill: none; stroke: var(--olive); stroke-width: 1; stroke-dasharray: 2 2.5; }
[data-direction='garden-light'] .hall-scheme .t-on { fill: #c9cfa2; stroke: var(--olive); stroke-width: 1; }
[data-direction='garden-light'] .hall-scheme .t-bud { fill: var(--copper); opacity: var(--on); transition: opacity 0.3s ease; }

[data-direction='garden-light'] .planner-num { font-size: clamp(4.5rem, 20vw, 7rem); font-weight: 300; font-style: italic; }
[data-direction='garden-light'] .planner-num-sm { font-size: 2.25rem; font-style: italic; }
[data-direction='garden-light'] .planner-sum { font-size: clamp(2rem, 8.5vw, 3rem); color: var(--olive); font-weight: 600; }
[data-direction='garden-light'] .planner-fits { color: var(--copper-ink); }
[data-direction='garden-light'] .planner-hall[aria-pressed='false'] { color: var(--c-ink-2); }
[data-direction='garden-light'] .planner-catering { background: var(--c-surface); font-family: var(--f-display); font-style: italic; font-size: 1.35rem; }

@media (prefers-reduced-motion: reduce) {
  .gl-draw { animation: none; stroke-dashoffset: 0; }
  .gl-bloom { animation: none; opacity: 1; }
}
`

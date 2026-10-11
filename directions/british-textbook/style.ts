/** british-textbook: тёмно-синий, сигнальный красный, горчица, тетрадная бумага. Красная ручка проверяет тест. */
export const css = /* css */ `
.concept[data-direction='british-textbook'] {
  --c-bg: #fbf8ef;
  --c-bg-2: #ffffff;
  --c-surface: #ffffff;
  --c-ink: #17233f;
  --c-ink-2: #4a5470;
  --c-accent: #17233f;
  --c-accent-ink: #ffffff;
  --c-line: rgba(23, 35, 63, 0.16);
  --c-focus: #c8233a;
  --c-field: #ffffff;
  --red: #c8233a;
  --mustard: #e4ac2f;
  --rule: #d4ddeb;
  --margin: #eeb0b8;
  --f-display: var(--font-spectral), Georgia, serif;
  --f-body: var(--font-commissioner), system-ui, sans-serif;
  --radius-btn: 3px;
  --radius-chip: 999px;
  --radius-field: 3px;
}
[data-direction='british-textbook'] .btn { box-shadow: 0 2px 0 var(--red); }
[data-direction='british-textbook'] .btn-ghost { box-shadow: inset 0 0 0 1.5px var(--c-ink); }
[data-direction='british-textbook'] input:checked + .chip { background: var(--c-ink); color: #fff; }

/* Тетрадный лист: линейка и красное поле */
.bt-paper {
  background:
    linear-gradient(to right, transparent 27px, var(--margin) 27px, var(--margin) 29px, transparent 29px),
    repeating-linear-gradient(to bottom, transparent 0 31px, var(--rule) 31px 32px),
    var(--c-bg);
}
.bt-red { color: var(--red); }
.bt-underline path { stroke: var(--red); fill: none; stroke-width: 3; stroke-linecap: round; }
.bt-draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: bt-draw 0.7s ease-out forwards; animation-delay: var(--d, 0.5s); }
@keyframes bt-draw { to { stroke-dashoffset: 0; } }

/* Стикер */
.bt-note { background: var(--mustard); color: var(--c-ink); box-shadow: 0 10px 22px -12px rgba(23, 35, 63, 0.45); transform: rotate(-3deg); }

/* Тест уровня: проверка красной ручкой */
[data-direction='british-textbook'] .lt-q { padding: 1rem 0 1.1rem 2.75rem; position: relative; border-bottom: 1px solid var(--rule); }
[data-direction='british-textbook'] .lt-text { font-family: var(--f-display); font-size: 1.3rem; line-height: 1.35; }
[data-direction='british-textbook'] .lt-num { position: absolute; left: 0; top: 1.05rem; width: 1.9rem; height: 1.9rem; display: grid; place-items: center; border-radius: 50%; border: 1.5px solid var(--c-ink); font-size: 0.95rem; font-family: var(--f-body); }
[data-direction='british-textbook'] .lt-q[data-mark='right'] .lt-num { border-color: var(--red); color: var(--red); }
[data-direction='british-textbook'] .lt-q[data-mark] .lt-num::after { position: absolute; right: -0.9rem; top: -0.7rem; font-size: 1.4rem; color: var(--red); font-family: var(--f-display); font-style: italic; }
[data-direction='british-textbook'] .lt-q[data-mark='right'] .lt-num::after { content: '✓'; }
[data-direction='british-textbook'] .lt-q[data-mark='wrong'] .lt-num::after { content: '✗'; }
[data-direction='british-textbook'] .lt-opt[data-picked='true'][data-correct='false'] .chip { text-decoration: line-through 2px var(--red); color: var(--c-ink-2); background: transparent; }
[data-direction='british-textbook'] .lt-opt[data-correct='true'] .chip { border-color: var(--red); box-shadow: 0 0 0 2px var(--red); color: var(--c-ink); background: transparent; }
[data-direction='british-textbook'] [data-done] input + .chip { pointer-events: none; }

/* Результат — штамп */
[data-direction='british-textbook'] .lt-level {
  justify-self: start;
  font-size: 4.5rem;
  line-height: 1;
  font-weight: 600;
  color: var(--red);
  padding: 0.25rem 1.25rem 0.4rem;
  border: 4px double var(--red);
  border-radius: 6px;
  transform: rotate(-6deg);
  animation: bt-stamp 0.45s cubic-bezier(0.2, 1.6, 0.4, 1) both;
}
[data-direction='british-textbook'] .lt-level-name { font-family: var(--f-display); font-style: italic; font-size: 1.4rem; }
[data-direction='british-textbook'] .lt-ielts { color: var(--red); font-weight: 600; }
@keyframes bt-stamp { from { transform: rotate(-6deg) scale(1.6); opacity: 0; } to { transform: rotate(-6deg) scale(1); opacity: 1; } }

@media (prefers-reduced-motion: reduce) {
  .bt-draw { animation: none; stroke-dashoffset: 0; }
  [data-direction='british-textbook'] .lt-level { animation: none; }
}
`

/** campus-bold: смелые цветные блоки, чёрный текст. Расписание и результат теста — как табло вылетов. */
export const css = /* css */ `
.concept[data-direction='campus-bold'] {
  --c-bg: #ffffff;
  --c-bg-2: #f2f1ec;
  --c-surface: #ffffff;
  --c-ink: #0d0d0d;
  --c-ink-2: #4a4a4a;
  --c-accent: #0d0d0d;
  --c-accent-ink: #ffffff;
  --c-line: rgba(13, 13, 13, 0.16);
  --c-focus: #2b4bff;
  --c-field: #ffffff;
  --red: #ff4b2b;
  --blue: #2b4bff;
  --mint: #2ed3a0;
  --lemon: #ffe14a;
  --board: #121212;
  --f-display: var(--font-unbounded), system-ui, sans-serif;
  --f-body: var(--font-commissioner), system-ui, sans-serif;
  --radius-btn: 0;
  --radius-chip: 0;
  --radius-field: 0;
}
[data-direction='campus-bold'] .btn { font-weight: 700; }
[data-direction='campus-bold'] .chip { border: 2px solid var(--c-ink); font-weight: 600; }
[data-direction='campus-bold'] input:checked + .chip { background: var(--lemon); color: var(--c-ink); border-color: var(--c-ink); }

/* Цветные плитки уровней */
.cb-tile { display: grid; place-items: center; font-family: var(--f-display); font-weight: 800; letter-spacing: -0.03em; }
.cb-pop { animation: cb-pop 0.5s cubic-bezier(0.3, 1.5, 0.5, 1) both; animation-delay: var(--d, 0s); }
@keyframes cb-pop { from { transform: scale(0.6); opacity: 0; } to { transform: none; opacity: 1; } }

/* Табло */
.cb-board { background: var(--board); color: var(--lemon); font-family: var(--f-display); }
.cb-board-row { display: grid; border-bottom: 1px solid rgba(255, 225, 74, 0.14); }
.cb-flap { display: inline-block; background: #1d1d1d; padding: 0.1em 0.35em; border-radius: 2px; box-shadow: inset 0 -0.5em 0 rgba(0, 0, 0, 0.18); }

/* Тест: вопросы — карточки, результат — табло */
[data-direction='campus-bold'] .lt-q { border: 2px solid var(--c-ink); padding: 1rem 1.1rem 1.2rem; background: var(--c-surface); }
[data-direction='campus-bold'] .lt-q:nth-child(5n+1) { box-shadow: 6px 6px 0 var(--lemon); }
[data-direction='campus-bold'] .lt-q:nth-child(5n+2) { box-shadow: 6px 6px 0 var(--mint); }
[data-direction='campus-bold'] .lt-q:nth-child(5n+3) { box-shadow: 6px 6px 0 var(--red); }
[data-direction='campus-bold'] .lt-q:nth-child(5n+4) { box-shadow: 6px 6px 0 var(--blue); }
[data-direction='campus-bold'] .lt-q:nth-child(5n+5) { box-shadow: 6px 6px 0 var(--lemon); }
[data-direction='campus-bold'] .lt-text { font-size: 1.15rem; font-weight: 600; line-height: 1.35; }
[data-direction='campus-bold'] .lt-num { font-family: var(--f-display); font-weight: 800; margin-right: 0.6rem; }
[data-direction='campus-bold'] .lt-q[data-mark='right'] { box-shadow: 6px 6px 0 var(--mint); }
[data-direction='campus-bold'] .lt-q[data-mark='wrong'] { box-shadow: 6px 6px 0 var(--red); }
[data-direction='campus-bold'] .lt-opt[data-correct='true'] .chip { background: var(--mint); }
[data-direction='campus-bold'] .lt-opt[data-picked='true'][data-correct='false'] .chip { background: var(--red); color: #fff; text-decoration: line-through; }
[data-direction='campus-bold'] [data-done] input + .chip { pointer-events: none; }
[data-direction='campus-bold'] .lt-result { background: var(--board); color: #fff; padding: 1.25rem; }
[data-direction='campus-bold'] .lt-result .text-ink-2 { color: #bdbdbd; }
[data-direction='campus-bold'] .lt-result .ex-tag { color: var(--lemon); }
[data-direction='campus-bold'] .lt-level, [data-direction='campus-bold'] .lt-level-name, [data-direction='campus-bold'] .lt-ielts, [data-direction='campus-bold'] .lt-group {
  font-family: var(--f-display);
  color: var(--lemon);
  background: #1d1d1d;
  padding: 0.35rem 0.6rem;
  transform-origin: 50% 0;
  animation: cb-flip 0.55s cubic-bezier(0.3, 1.3, 0.5, 1) both;
}
[data-direction='campus-bold'] .lt-level { font-size: 4rem; line-height: 1; font-weight: 800; justify-self: start; animation-delay: 0.05s; }
[data-direction='campus-bold'] .lt-level-name { font-size: 1rem; animation-delay: 0.2s; }
[data-direction='campus-bold'] .lt-ielts { font-size: 1rem; animation-delay: 0.35s; }
[data-direction='campus-bold'] .lt-group { font-size: 0.9rem; line-height: 1.4; animation-delay: 0.5s; }
[data-direction='campus-bold'] .lt-result .btn:not(.btn-ghost) { background: var(--lemon); color: var(--c-ink); }
[data-direction='campus-bold'] .lt-result .btn-ghost { color: #fff; box-shadow: inset 0 0 0 2px #fff; }
@keyframes cb-flip { from { transform: rotateX(-90deg); opacity: 0.3; } to { transform: none; opacity: 1; } }

@media (prefers-reduced-motion: reduce) {
  .cb-pop, [data-direction='campus-bold'] .lt-level, [data-direction='campus-bold'] .lt-level-name,
  [data-direction='campus-bold'] .lt-ielts, [data-direction='campus-bold'] .lt-group { animation: none; }
}
`

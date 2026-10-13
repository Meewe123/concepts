/**
 * spa-whisper: тауп, крем, мягкое золото. Медленные «дыхательные» анимации, шёпот вместо крика.
 * Women Secret: дышащая сфера в первом экране, кольцо длительности ритуала, «тихие часы», пауза для дыхания.
 */
export const css = /* css */ `
.concept[data-direction='spa-whisper'] {
  --c-bg: #f4eee5;
  --c-bg-2: #e9dfd2;
  --c-surface: #fbf8f3;
  --c-ink: #3a3029;
  --c-ink-2: #6a5e53;
  --c-accent: #5c4f45;
  --c-accent-ink: #f4eee5;
  --c-line: rgba(58, 48, 41, 0.16);
  --c-focus: #8f7442;
  --c-field: #fbf8f3;
  --taupe: #64574a;
  --cream-2: #e8e0d5;
  --taupe-2: #857565;
  --cream: #f4eee5;
  --gold: #c2a46b;
  --f-display: var(--font-spectral-light), Georgia, serif;
  --f-body: var(--font-commissioner), system-ui, sans-serif;
  --radius-btn: 999px;
  --radius-chip: 999px;
  --radius-field: 999px;
}
[data-direction='spa-whisper'] .btn { font-weight: 400; letter-spacing: 0.06em; }
[data-direction='spa-whisper'] .ex-tag { color: var(--c-ink-2); }
[data-direction='spa-whisper'] input:checked + .chip { background: var(--c-accent); border-color: var(--c-accent); color: var(--cream); }
.sw-wrap { max-width: 72rem; margin: 0 auto; }
.sw-caps { font-size: 0.72rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--c-ink-2); }
.sw-h2 { font-family: var(--f-display); font-weight: 200; font-style: italic; font-size: clamp(2.4rem, 11vw, 5rem); line-height: 1.02; letter-spacing: -0.01em; }
.sw-h2-sm { font-size: clamp(1.9rem, 8vw, 3.4rem); }
.sw-lead { max-width: 40ch; font-size: 1.1rem; line-height: 1.6; color: var(--c-ink-2); }
.sw-small { font-size: 0.85rem; color: var(--c-ink-2); }

/* ---------- Дышащая сфера ---------- */
.sw-orb { position: relative; display: grid; place-items: center; aspect-ratio: 1; }
.sw-orb-core { position: absolute; inset: 14%; border-radius: 50%; background: radial-gradient(circle at 38% 34%, #fbf6ee 0%, #efe4d4 55%, #e2d3bf 100%); box-shadow: 0 40px 80px -40px rgba(40, 30, 22, 0.55); animation: sw-breathe 8s ease-in-out infinite; }
.sw-orb-ring { position: absolute; inset: 14%; border-radius: 50%; border: 1px solid var(--gold); opacity: 0; animation: sw-ripple 8s ease-out infinite; }
.sw-r2 { animation-delay: 2.6s; }
.sw-r3 { animation-delay: 5.2s; }
.sw-orb-content { position: relative; display: grid; justify-items: center; text-align: center; }
@keyframes sw-breathe { 0%, 100% { transform: scale(0.94); } 50% { transform: scale(1.04); } }
@keyframes sw-ripple { 0% { transform: scale(0.95); opacity: 0; } 15% { opacity: 0.7; } 100% { transform: scale(1.38); opacity: 0; } }
.sw-still .sw-orb-core, .sw-still .sw-orb-ring { animation: none; }
.sw-still .sw-r1 { opacity: 0.5; transform: scale(1.12); }
.sw-still .sw-r2 { opacity: 0.3; transform: scale(1.26); }
.sw-breath { position: relative; height: 1.2em; margin-top: 0.6rem; font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--c-ink-2); }
.sw-breath span { position: absolute; left: 50%; transform: translateX(-50%); white-space: nowrap; animation: sw-in 8s ease-in-out infinite; }
.sw-breath span + span { animation-name: sw-out; }
@keyframes sw-in { 0%, 45% { opacity: 1; } 50%, 95% { opacity: 0; } 100% { opacity: 1; } }
@keyframes sw-out { 0%, 45% { opacity: 0; } 50%, 95% { opacity: 1; } 100% { opacity: 0; } }

/* ---------- Первый экран ---------- */
.sw-hero { position: relative; overflow: hidden; padding: 0 1rem 2.5rem; background: var(--taupe); color: var(--cream); }
.sw-top { max-width: 72rem; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; min-height: 3.25rem; font-size: 0.8rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--cream-2); }
.sw-lang a { padding: 0 1rem; border-radius: 999px; border: 1px solid rgba(244, 238, 229, 0.5); letter-spacing: 0.06em; text-transform: none; text-decoration: none; color: var(--cream); }
.sw-hero-body { max-width: 72rem; margin: 0 auto; display: grid; justify-items: center; text-align: center; }
.sw-orb-hero { width: min(88vw, 26rem); margin-top: 0.25rem; }
.sw-name { display: grid; font-family: var(--f-display); font-weight: 200; font-style: italic; font-size: clamp(3rem, 15vw, 5.5rem); line-height: 0.92; color: var(--c-ink); }
.sw-name span:last-child { padding-left: 0.8em; }
.sw-kind { margin-top: 0.6rem; font-size: 0.78rem; letter-spacing: 0.24em; text-transform: uppercase; color: var(--cream-2); }
.sw-whisper { margin-top: 0.9rem; max-width: 26ch; font-family: var(--f-display); font-style: italic; font-weight: 300; font-size: 1.45rem; line-height: 1.35; }
.sw-cta { display: grid; gap: 0.7rem; width: 100%; margin-top: 1.6rem; }
@media (min-width: 640px) { .sw-cta { display: flex; justify-content: center; } }
.sw-btn-cream { background: var(--cream); color: var(--c-ink); }
.sw-btn-line { background: transparent; color: var(--cream); box-shadow: inset 0 0 0 1px rgba(244, 238, 229, 0.55); }
@media (hover: hover) { .concept .sw-btn-cream:hover { background: #fff; } .concept .sw-btn-line:hover { background: rgba(244, 238, 229, 0.08); } }
.sw-hero :focus-visible, .sw-sec-dark :focus-visible { outline-color: var(--cream); }
@media (min-width: 900px) { .sw-hero { padding: 0 2rem 5rem; } .sw-orb-hero { width: 30rem; } }

/* ---------- Секции ---------- */
.sw-sec { padding: 4.5rem 1rem 5rem; }
.sw-sec-2 { background: var(--c-bg-2); }
.sw-sec-dark { background: var(--taupe); color: var(--cream); }
.sw-sec-dark .sw-lead { color: var(--cream-2); }
@media (min-width: 900px) { .sw-sec { padding: 7rem 2rem; } }

/* ---------- Ритуалы ---------- */
.sw-booker { display: grid; gap: 1.75rem; }
@media (min-width: 900px) { .sw-booker { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 4rem; align-items: start; } .sw-card { position: sticky; top: 1.5rem; } }
.sw-list { display: grid; border-top: 1px solid var(--c-line); }
.sw-item { display: grid; gap: 0.25rem; padding: 1.05rem 0.5rem; border-bottom: 1px solid var(--c-line); cursor: pointer; transition: background-color 0.6s ease, padding 0.6s ease; }
.sw-item-name { font-family: var(--f-display); font-weight: 300; font-size: 1.65rem; line-height: 1.15; }
.sw-item-meta { display: inline-flex; align-items: center; gap: 0.55rem; font-size: 0.85rem; color: var(--c-ink-2); }
.sw-item-arc { width: 1rem; height: 1rem; border-radius: 50%; background: conic-gradient(var(--gold) calc(var(--m) * 2deg), rgba(58, 48, 41, 0.12) 0); }
@media (hover: hover) { .sw-item:hover { background: rgba(233, 223, 210, 0.6); } }
.sw-item:has(input:checked) { background: var(--c-bg-2); padding-left: 1.1rem; box-shadow: inset 2px 0 0 var(--gold); }
.sw-item:has(input:checked) .sw-item-name { font-style: italic; }
.sw-item:has(input:focus-visible) { outline: 2px solid var(--c-focus); outline-offset: -2px; }

.sw-card { padding: 1.6rem 1.3rem; border-radius: 2rem; background: var(--c-surface); box-shadow: 0 30px 60px -45px rgba(40, 30, 22, 0.6); }
@media (min-width: 900px) { .sw-card { padding: 2.5rem; } }
.sw-empty { min-height: 8rem; display: grid; place-items: center; text-align: center; font-family: var(--f-display); font-style: italic; font-size: 1.3rem; color: var(--c-ink-2); }
[data-booker]:not([data-state='empty']) .sw-empty { display: none; }
[data-booker][data-state='empty'] .sw-card-body { display: none; }
.sw-card-body { display: grid; gap: 1.1rem; animation: sw-fade 0.9s ease both; }
@keyframes sw-fade { from { opacity: 0; } }
.sw-card-title { font-family: var(--f-display); font-weight: 200; font-style: italic; font-size: clamp(2.2rem, 10vw, 3.4rem); line-height: 1; }
.sw-ring-row { display: grid; grid-template-columns: 7.5rem 1fr; gap: 1.25rem; align-items: center; }
.sw-ring svg { display: block; width: 100%; transform: rotate(-90deg); }
.sw-ring-bg { fill: none; stroke: var(--c-bg-2); stroke-width: 6; }
.sw-ring-fg { fill: none; stroke: var(--gold); stroke-width: 6; stroke-linecap: round; stroke-dasharray: min(var(--minutes, 0), 180) 180; transition: stroke-dasharray 1.8s cubic-bezier(0.4, 0, 0.2, 1); }
.sw-stat { font-family: var(--f-display); font-weight: 300; font-size: 1.6rem; line-height: 1.1; }
.sw-slots { display: grid; gap: 0.45rem; }
.sw-slot { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; min-height: 3.25rem; padding: 0.6rem 1.25rem; border-radius: 999px; background: var(--c-bg); cursor: pointer; transition: background-color 0.5s ease, color 0.5s ease; animation: sw-fade 0.9s ease both; animation-delay: calc(var(--i) * 0.12s); }
.sw-slot-day { font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--c-ink-2); }
.sw-slot-time { font-family: var(--f-display); font-size: 1.6rem; font-weight: 300; }
@media (hover: hover) { .sw-slot:hover { background: var(--c-bg-2); } }
.sw-slot:has(input:checked) { background: var(--c-accent); color: var(--cream); }
.sw-slot:has(input:checked) .sw-slot-day { color: rgba(244, 238, 229, 0.75); }
.sw-slot:has(input:focus-visible) { outline: 2px solid var(--c-focus); outline-offset: 2px; }
.sw-until { display: none; font-family: var(--f-display); font-style: italic; font-size: 1.25rem; }
.sw-until b { font-weight: 300; font-style: normal; letter-spacing: 0.04em; }
[data-booker][data-state='slot'] .sw-until { display: block; animation: sw-fade 0.9s ease both; }
.sw-card [aria-disabled='true'] { opacity: 0.5; }

/* ---------- Пауза для дыхания ---------- */
.sw-breathe { display: grid; gap: 2rem; justify-items: center; text-align: center; }
@media (min-width: 900px) { .sw-breathe { grid-template-columns: auto 1fr; justify-items: start; text-align: left; gap: 5rem; align-items: center; } }
.sw-orb-small { width: min(70vw, 18rem); }
.sw-breath-big { font-size: 0.9rem; color: var(--c-ink); }

/* ---------- Адрес ---------- */
.sw-place { display: grid; gap: 1.5rem; margin-top: 2rem; }
@media (min-width: 768px) { .sw-place { grid-template-columns: 1fr 1fr; } }
.sw-place-v { margin-top: 0.4rem; font-family: var(--f-display); font-style: italic; font-size: 1.4rem; }
.sw-place-tel { display: block; margin-top: 0.4rem; font-family: var(--f-display); font-weight: 300; font-size: clamp(1.9rem, 8.5vw, 2.8rem); text-decoration: none; }

/* ---------- Запись ---------- */
.sw-booking { display: grid; gap: 0.5rem; }
@media (min-width: 900px) { .sw-booking { grid-template-columns: 1fr 1.3fr; gap: 4rem; align-items: start; } }
.sw-form { padding: 1.5rem 1.2rem; border-radius: 2rem; background: var(--c-surface); }
@media (min-width: 900px) { .sw-form { padding: 2.5rem; } }

/* ---------- OG ---------- */
.sw-og .sw-whisper { max-width: none; }

@media (prefers-reduced-motion: reduce) {
  .sw-orb-core, .sw-orb-ring, .sw-breath span, .sw-card-body, .sw-slot { animation: none; }
  .sw-breath span + span { display: none; }
  .sw-ring-fg { transition: none; }
}
`

/**
 * sound-silence: песок, шалфей, шафран; много воздуха. EB Garamond (курсив) + Raleway.
 * Артха: поющая чаша, от которой медленно расходятся круги звука; квиз «Подобрать практику» —
 * круги расходятся от выбранного ответа; неделя с фильтром, «После практики» на шалфее.
 */
export const css = /* css */ `
.concept[data-direction='sound-silence'] {
  --c-bg: #efe6d6;
  --c-bg-2: #e6dac5;
  --c-surface: #f7f1e6;
  --c-ink: #2b2a22;
  --c-ink-2: #5d5a4c;
  --c-accent: #4f6149;
  --c-accent-ink: #f7f1e6;
  --c-line: #d3c6ae;
  --c-focus: #4f6149;
  --c-field: #f7f1e6;
  --sage: #4f6149;
  --sage-2: #6c7f64;
  --sage-soft: #a9b79f;
  --saffron: #d9902b;
  --f-display: var(--font-eb-garamond), Georgia, serif;
  --f-body: var(--font-raleway), system-ui, sans-serif;
  --radius-btn: 999px;
  --radius-chip: 999px;
  --radius-field: 1rem;
  --slow: cubic-bezier(0.25, 0.1, 0.25, 1);
  font-variant-numeric: lining-nums;
}
[data-direction='sound-silence'] .btn { font-weight: 600; letter-spacing: 0.02em; }
[data-direction='sound-silence'] input:checked + .chip { background: var(--sage); border-color: var(--sage); color: var(--c-accent-ink); }
.ss-wrap { max-width: 68rem; margin: 0 auto; }
.ss-h2 { font-family: var(--f-display); font-style: italic; font-weight: 400; font-size: clamp(2.5rem, 10vw, 4.6rem); line-height: 1.02; letter-spacing: -0.01em; color: var(--sage); }
.ss-lead { max-width: 34rem; font-size: 1.08rem; line-height: 1.7; color: var(--c-ink-2); }
.ss-label { font-size: 0.74rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--c-ink-2); }
.ss-small { font-size: 0.88rem; color: var(--c-ink-2); }

/* ---------- Чаша и круги ---------- */
.ss-bowl { display: block; width: 100%; height: auto; overflow: visible; }
.ss-ring { fill: none; stroke: var(--saffron); stroke-width: 1.2; transform-box: fill-box; transform-origin: center; opacity: 0; animation: ss-ring 8s var(--slow) infinite; animation-delay: calc(var(--i) * 2s); }
@keyframes ss-ring { 0% { transform: scale(0.45); opacity: 0; } 12% { opacity: 0.75; } 100% { transform: scale(1.35); opacity: 0; } }
.ss-shadow { fill: rgba(43, 42, 34, 0.12); }
.ss-bowl-body { fill: var(--sage); }
.ss-bowl-rim { fill: var(--sage-2); stroke: var(--saffron); stroke-width: 2.5; }
.ss-bowl-in { fill: #3e4d39; }
.ss-stick { stroke: #8a6a44; stroke-width: 9; stroke-linecap: round; transform-box: fill-box; transform-origin: 100% 0%; animation: ss-strike 8s ease-in-out infinite; }
@keyframes ss-strike { 0%, 100% { transform: rotate(0); } 4% { transform: rotate(-9deg); } 8% { transform: rotate(0); } }
.ss-still .ss-ring { animation: none; opacity: 0.35; }
.ss-still .ss-ring:nth-child(2) { transform: scale(0.8); }
.ss-still .ss-ring:nth-child(3) { transform: scale(1.1); opacity: 0.2; }
.ss-still .ss-ring:nth-child(1) { transform: scale(0.55); }
.ss-still .ss-stick { animation: none; }

/* ---------- Первый экран: по центру, тишина ---------- */
.ss-hero { position: relative; padding: 0 1rem 3.5rem; overflow: hidden; background: radial-gradient(80% 55% at 50% 30%, #f6eedf 0%, var(--c-bg) 70%); }
.ss-top { max-width: 68rem; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; min-height: 3.25rem; font-size: 0.85rem; color: var(--c-ink-2); }
.ss-lang a { padding: 0 0.95rem; border-radius: 999px; box-shadow: inset 0 0 0 1px var(--c-line); text-decoration: none; font-weight: 600; color: var(--c-ink); }
.ss-hero-in { max-width: 44rem; margin: 0 auto; text-align: center; }
.ss-hero-bowl { width: min(80%, 22rem); margin: 0.5rem auto -1.5rem; }
.ss-kicker { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: var(--c-ink-2); }
.ss-name { margin-top: 0.4rem; font-family: var(--f-display); font-style: italic; font-weight: 400; font-size: clamp(5rem, 28vw, 11rem); line-height: 0.9; letter-spacing: -0.02em; color: var(--sage); animation: ss-breathe-in 2.4s var(--slow) both; }
@keyframes ss-breathe-in { from { letter-spacing: 0.12em; transform: translateY(0.08em); } }
.ss-sub { margin-top: 0.9rem; font-size: 0.95rem; letter-spacing: 0.08em; color: var(--c-ink-2); }
.ss-statement { max-width: 30rem; margin: 1.6rem auto 0; font-family: var(--f-display); font-size: clamp(1.35rem, 5.6vw, 1.7rem); line-height: 1.4; }
.ss-cta { display: grid; gap: 0.75rem; margin-top: 1.8rem; }
@media (min-width: 640px) { .ss-cta { display: flex; justify-content: center; } }
@media (min-width: 900px) { .ss-hero { padding: 0 2rem 6rem; } .ss-hero-bowl { width: 24rem; } }

/* ---------- Секции ---------- */
.ss-sec { padding: 5rem 1rem 5.5rem; background: var(--c-bg); }
.ss-sec-2 { background: var(--c-bg-2); }
.ss-sec-sage { background: var(--sage); color: var(--c-accent-ink); }
.ss-sec-sage .ss-h2 { color: var(--c-accent-ink); }
.ss-sec-sage :focus-visible { outline-color: var(--c-accent-ink); }
@media (min-width: 900px) { .ss-sec { padding: 8rem 2rem; } }

/* ---------- Квиз ---------- */
.ss-quiz { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2.5rem; }
@media (min-width: 900px) { .ss-quiz { grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr); gap: 4rem; align-items: start; } .ss-result { position: sticky; top: 1.5rem; } }
.ss-qs { display: grid; gap: 2.2rem; }
.ss-q { min-width: 0; }
.ss-q-t { display: flex; align-items: baseline; gap: 0.8rem; margin-bottom: 1rem; font-family: var(--f-display); font-size: 1.6rem; line-height: 1.2; }
.ss-q-n { flex: none; display: inline-grid; place-items: center; width: 2rem; height: 2rem; border-radius: 50%; box-shadow: inset 0 0 0 1px var(--saffron); font-family: var(--f-body); font-size: 0.85rem; font-weight: 600; color: var(--c-ink); transform: translateY(-0.2rem); }
.ss-opts { display: flex; flex-wrap: wrap; gap: 0.6rem; }
.ss-opt { position: relative; display: inline-flex; align-items: center; min-height: 3.1rem; padding: 0 1.3rem; border-radius: 999px; box-shadow: inset 0 0 0 1px var(--c-line); background: var(--c-surface); font-size: 1rem; cursor: pointer; transition: background-color 0.4s var(--slow), color 0.4s var(--slow), box-shadow 0.4s var(--slow); }
.ss-opt::before, .ss-opt::after { content: ''; position: absolute; inset: 0; border-radius: inherit; box-shadow: 0 0 0 1px var(--saffron); opacity: 0; pointer-events: none; }
.ss-opts input:checked + .ss-opt { background: var(--sage); color: var(--c-accent-ink); box-shadow: none; }
.ss-opts input:checked + .ss-opt::before { animation: ss-ripple 1.6s var(--slow) both; }
.ss-opts input:checked + .ss-opt::after { animation: ss-ripple 1.6s var(--slow) 0.35s both; }
@keyframes ss-ripple { 0% { opacity: 0.9; transform: scale(1); } 100% { opacity: 0; transform: scale(1.45, 1.9); } }
.ss-opts input:focus-visible + .ss-opt { outline: 2px solid var(--sage); outline-offset: 3px; }
.ss-opts label:active .ss-opt { transform: scale(0.98); }
@media (hover: hover) { .ss-opts label:hover .ss-opt { box-shadow: inset 0 0 0 1px var(--sage); } }

.ss-result { display: grid; gap: 1rem; padding: 1.6rem 1.4rem 1.6rem; border-radius: 1.6rem; background: var(--c-surface); box-shadow: inset 0 0 0 1px var(--c-line); }
.ss-dots { display: flex; gap: 0.5rem; }
.ss-dots i { width: 0.7rem; height: 0.7rem; border-radius: 50%; box-shadow: inset 0 0 0 1.5px var(--saffron); transition: background-color 0.4s var(--slow); }
[data-quiz][data-answered='1'] .ss-dots i:nth-child(-n + 1),
[data-quiz][data-answered='2'] .ss-dots i:nth-child(-n + 2),
[data-quiz][data-answered='3'] .ss-dots i { background: var(--saffron); }
.ss-res-hint { font-family: var(--f-display); font-style: italic; font-size: 1.5rem; line-height: 1.35; color: var(--c-ink-2); }
.ss-res-done, [data-quiz][data-state='done'] .ss-res-empty { display: none; }
[data-quiz][data-state='done'] .ss-res-done { display: grid; gap: 0.6rem; animation: ss-appear 0.9s var(--slow) both; }
@keyframes ss-appear { from { opacity: 0; transform: translateY(10px); } }
.ss-res-name { font-family: var(--f-display); font-style: italic; font-size: clamp(2.4rem, 10vw, 3.4rem); line-height: 1; color: var(--sage); }
.ss-res-about { font-size: 1.02rem; line-height: 1.6; }
.ss-res-meta { font-weight: 600; }
.ss-res-next { font-family: var(--f-display); font-size: 1.6rem; }
[data-quiz][data-state='empty'] .ss-res-cta { display: none; }

/* ---------- Неделя ---------- */
.ss-filter { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.6rem; min-width: 0; }
.ss-days { display: grid; gap: 0.75rem; }
.ss-day { padding: 1rem 1.1rem; border-radius: 1.2rem; background: var(--c-surface); box-shadow: inset 0 0 0 1px var(--c-line); }
.ss-day-t { display: flex; align-items: center; justify-content: space-between; font-family: var(--f-display); font-size: 1.3rem; }
.ss-today { display: none; font-family: var(--f-body); font-size: 0.72rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: var(--c-ink); background: var(--saffron); padding: 0.15rem 0.55rem; border-radius: 999px; }
.ss-day[data-today] { box-shadow: inset 0 0 0 2px var(--saffron); }
.ss-day[data-today] .ss-today { display: inline-block; }
.ss-day ul { display: grid; gap: 0.2rem; margin-top: 0.6rem; }
.ss-class { display: grid; grid-template-columns: 3.4rem minmax(0, 1fr) auto; gap: 0.6rem; align-items: baseline; padding: 0.45rem 0; border-top: 1px solid var(--c-line); animation: ss-appear 0.5s var(--slow) both; }
.ss-class-time { font-weight: 600; }
.ss-class-meta { font-size: 0.85rem; color: var(--c-ink-2); }
@media (min-width: 1000px) {
  .ss-days { grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 0.5rem; }
  .ss-day { padding: 0.9rem 0.8rem; }
  .ss-day-t { flex-direction: column; align-items: flex-start; gap: 0.3rem; font-size: 1.15rem; }
  .ss-class { grid-template-columns: 1fr; gap: 0.1rem; }
}

/* ---------- После практики ---------- */
.ss-space { display: grid; gap: 1rem; }
@media (min-width: 768px) { .ss-space { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem; } }
.ss-space li { display: grid; align-content: start; gap: 0.6rem; padding: 1.5rem 1.4rem; border-radius: 1.4rem; box-shadow: inset 0 0 0 1px rgba(247, 241, 230, 0.3); line-height: 1.6; }
.ss-space-ico { width: 2rem; height: 2rem; color: #f2c47c; }
.ss-space-t { font-family: var(--f-display); font-style: italic; font-size: 1.7rem; line-height: 1.1; font-weight: 400; }
@supports (animation-timeline: view()) {
  .ss-space li { animation: ss-float linear both; animation-timeline: view(); animation-range: entry 0% entry 70%; }
}
@keyframes ss-float { from { transform: translateY(24px); } }

/* ---------- Запись и адрес ---------- */
.ss-booking { display: grid; gap: 1rem; }
@media (min-width: 900px) { .ss-booking { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 4rem; align-items: start; } }
.ss-form { padding: 1.4rem 1.15rem 1.6rem; border-radius: 1.6rem; background: var(--c-surface); box-shadow: inset 0 0 0 1px var(--c-line); }
@media (min-width: 900px) { .ss-form { padding: 2.2rem; } }
.ss-where { display: grid; gap: 2.5rem; }
@media (min-width: 900px) { .ss-where { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 4rem; align-items: end; } }
.ss-street { margin-top: 0.5rem; font-family: var(--f-display); font-style: italic; font-size: clamp(2.4rem, 10vw, 4rem); line-height: 1.05; color: var(--sage); }
.ss-facts > div { display: grid; gap: 0.4rem; padding: 1.1rem 0; border-top: 1px solid var(--c-line); }
.ss-tel { display: inline-flex; align-items: center; min-height: 2.75rem; font-family: var(--f-display); font-size: clamp(1.6rem, 7vw, 2.1rem); color: var(--c-ink); text-decoration: none; transition: color 0.3s ease; }
.ss-social { display: flex; flex-wrap: wrap; gap: 0.75rem; padding-top: 1.1rem; border-top: 1px solid var(--c-line); }
@media (hover: hover) { .concept .ss-tel:hover { color: var(--sage); } }

/* ---------- OG ---------- */
.ss-og { padding: 0; }
.ss-og .ss-name { animation: none; }

@media (prefers-reduced-motion: reduce) {
  .ss-ring, .ss-stick, .ss-name, .ss-opts input:checked + .ss-opt::before, .ss-opts input:checked + .ss-opt::after,
  [data-quiz][data-state='done'] .ss-res-done, .ss-class, .ss-space li { animation: none; }
  .ss-ring { opacity: 0.3; }
  .ss-opt, .ss-dots i { transition: none; }
}
`

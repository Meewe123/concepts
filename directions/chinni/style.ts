import { DEFAULT_SHADE, SHADES } from './shades'

/**
 * chinni: фарфор — белая глазурь, кобальтовые волосяные линии, мягкие тени.
 * Noto Serif Display (тонкий, контрастный) + Mulish. Основной — фарфоровый белый и сине-чёрный, акцент — кобальт.
 * Chinni: резец парит, по глазури скользит блик, ободок «рисуется» кобальтом; веер шкалы оттенков красит зуб (:has, без JS).
 */
const COBALT = '#1f43a8'
const shade = (id: string) => SHADES.find((s) => s.id === id)!.c

export const css = /* css */ `
.concept[data-direction='chinni'] {
  --c-bg: #fbfaf7;
  --c-bg-2: #f1efe9;
  --c-surface: #ffffff;
  --c-ink: #1b2233;
  --c-ink-2: #545d70;
  --c-accent: ${COBALT};
  --c-accent-ink: #ffffff;
  --c-line: #e2dfd7;
  --c-focus: ${COBALT};
  --c-field: #ffffff;
  --cobalt: ${COBALT};
  --f-display: var(--font-noto-serif-display), Georgia, serif;
  --f-body: var(--font-mulish), system-ui, sans-serif;
  --radius-btn: 999px;
  --radius-chip: 999px;
  --radius-field: 0.8rem;
}
[data-direction='chinni'] .btn { font-weight: 700; letter-spacing: 0.01em; }
[data-direction='chinni'] .btn:not(.btn-ghost) { box-shadow: 0 10px 24px -12px rgba(31, 67, 168, 0.55); }
.ch-wrap { max-width: 72rem; margin: 0 auto; }
.ch-h2 { font-family: var(--f-display); font-weight: 400; font-size: clamp(2.4rem, 10vw, 4.4rem); line-height: 1.04; letter-spacing: -0.02em; text-wrap: balance; }
.ch-lead { max-width: 36rem; font-size: 1.08rem; line-height: 1.6; color: var(--c-ink-2); }
.ch-eyebrow, .ch-kicker { margin-bottom: 0.9rem; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--cobalt); }
.ch-small { font-size: 0.9rem; color: var(--c-ink-2); }

/* ---------- Первый экран ---------- */
.ch-hero { --shade: ${shade(DEFAULT_SHADE)}; position: relative; padding: 0 1rem 3.5rem; overflow: hidden; background: radial-gradient(70% 50% at 70% 38%, #ffffff, transparent 70%), var(--c-bg); }
${SHADES.map((s) => `.ch-hero:has(input[value='${s.id}']:checked) { --shade: ${s.c}; }`).join('\n')}
.ch-top { max-width: 72rem; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; min-height: 3.25rem; font-size: 0.9rem; color: var(--c-ink-2); }
.ch-lang a { padding: 0 1rem; border-radius: 999px; box-shadow: inset 0 0 0 1px var(--c-line); background: #fff; text-decoration: none; font-weight: 700; color: var(--c-ink); }
.ch-hero-grid { max-width: 72rem; margin: 0 auto; display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.5rem; padding-top: 2rem; }
.ch-kicker { margin-bottom: 0.4rem; }
.ch-name { font-family: var(--f-display); font-weight: 300; font-size: clamp(5.4rem, 31vw, 12rem); line-height: 0.92; letter-spacing: -0.035em; }
.ch-name-dot { color: var(--cobalt); }
.ch-tagline { margin-top: 0.6rem; max-width: 22rem; font-family: var(--f-display); font-size: 1.35rem; line-height: 1.3; color: var(--c-ink-2); }
.ch-stage { display: grid; justify-items: center; }
.ch-statement { max-width: 32rem; font-size: 1.1rem; line-height: 1.6; }
.ch-cta { display: grid; gap: 0.7rem; margin-top: 1.5rem; }
@media (min-width: 640px) { .ch-cta { display: flex; flex-wrap: wrap; } }
@media (min-width: 960px) {
  .ch-hero { padding: 0 2rem 5rem; }
  .ch-hero-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr); grid-template-areas: 'sign stage' 'copy stage'; column-gap: 4rem; row-gap: 2rem; padding-top: 3.5rem; align-items: start; }
  .ch-sign { grid-area: sign; }
  .ch-stage { grid-area: stage; }
  .ch-tooth { max-width: 22rem; }
  .ch-fan { transform: scale(1.15); transform-origin: 50% 100%; margin-top: 1.4rem; }
  .ch-shade-now { margin-top: 1.6rem; }
  .ch-hero-copy { grid-area: copy; }
}

/* Резец */
.ch-tooth { display: block; width: 100%; max-width: 17rem; height: auto; overflow: visible; }
.ch-s0 { stop-color: #ffffff; }
.ch-s1 { stop-color: var(--shade); transition: stop-color 0.5s ease; }
.ch-s2 { stop-color: color-mix(in oklab, var(--shade) 70%, #8b7a58); transition: stop-color 0.5s ease; }
.ch-outline { fill: none; stroke: rgba(27, 34, 51, 0.1); stroke-width: 1.2; }
.ch-shine { fill: rgba(255, 255, 255, 0.85); filter: blur(7px); animation: ch-shine 6s ease-in-out infinite alternate; }
@keyframes ch-shine { from { transform: translateX(-8px); } to { transform: translateX(30px); } }
.ch-groove { fill: none; stroke: rgba(139, 122, 88, 0.22); stroke-width: 2.4; stroke-linecap: round; }
.ch-float { animation: ch-float 5s ease-in-out infinite; }
@keyframes ch-float { 50% { transform: translateY(-8px); } }
.ch-shadow { fill: rgba(27, 34, 51, 0.12); filter: blur(4px); transform-box: fill-box; transform-origin: center; animation: ch-shadow 5s ease-in-out infinite; }
@keyframes ch-shadow { 50% { transform: scaleX(0.84); } }
.ch-ring { fill: none; stroke: var(--cobalt); stroke-width: 1.2; stroke-dasharray: 1; stroke-dashoffset: 1; animation: ch-draw 1.8s cubic-bezier(0.6, 0, 0.2, 1) 0.3s forwards; }
@keyframes ch-draw { to { stroke-dashoffset: 0; } }
.ch-dot { fill: var(--cobalt); transform-box: fill-box; transform-origin: center; animation: ch-dot 0.4s ease both; animation-delay: calc(1.3s + var(--i) * 0.04s); }
@keyframes ch-dot { from { transform: scale(0); } }
.ch-still .ch-ring { animation: none; stroke-dashoffset: 0; }
.ch-still .ch-dot, .ch-still .ch-float, .ch-still .ch-shine, .ch-still .ch-shadow { animation: none; }

/* Веер шкалы оттенков */
.ch-fan { position: relative; width: 100%; max-width: 20rem; height: 9.6rem; margin-top: 0.4rem; }
.ch-fan::after { content: ''; position: absolute; left: 50%; bottom: -0.45rem; width: 1.1rem; height: 1.1rem; margin-left: -0.55rem; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #ffffff, #b9bfca); box-shadow: 0 1px 3px rgba(27, 34, 51, 0.3); }
.ch-tab { position: absolute; left: 50%; bottom: 0; width: 2.2rem; height: 9rem; margin-left: -1.1rem; transform-origin: 50% 100%; transform: rotate(calc((var(--i) - (var(--n) - 1) / 2) * 15deg)); pointer-events: none; animation: ch-fan 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) 0.4s both; }
@keyframes ch-fan { from { transform: rotate(0deg); } }
.ch-tab-tooth { display: block; width: 2.2rem; height: 3rem; pointer-events: auto; cursor: pointer; margin: 0 auto; border-radius: 46% 46% 40% 40% / 34% 34% 62% 62%; background: radial-gradient(circle at 38% 30%, #ffffff 0, var(--c) 55%, color-mix(in oklab, var(--c) 75%, #7d6b4c) 100%); box-shadow: 0 3px 6px rgba(27, 34, 51, 0.14), inset 0 -7px 9px rgba(183, 200, 224, 0.55); transition: transform 0.3s cubic-bezier(0.3, 1.4, 0.5, 1); }
.ch-tab-stem { display: grid; place-items: start center; padding-top: 0.35rem; width: 1.15rem; height: 5.85rem; margin: 0.15rem auto 0; border-radius: 0.35rem 0.35rem 0.2rem 0.2rem; background: linear-gradient(90deg, #d4d9e1, #f6f7f9 45%, #c5cad3); writing-mode: vertical-rl; font-size: 0.62rem; font-weight: 800; letter-spacing: 0.06em; color: #343d52; transition: background-color 0.2s ease, color 0.2s ease; }
.ch-tab:has(input:checked) .ch-tab-tooth { transform: translateY(-0.8rem); }
.ch-tab:has(input:checked) .ch-tab-stem { background: var(--cobalt); color: #ffffff; }
.ch-tab:has(input:focus-visible) .ch-tab-tooth { outline: 2px solid var(--cobalt); outline-offset: 3px; }
@media (hover: hover) { .ch-tab:hover .ch-tab-tooth { transform: translateY(-0.4rem); } .ch-tab:has(input:checked):hover .ch-tab-tooth { transform: translateY(-0.8rem); } }
.ch-shade-now { margin-top: 0.9rem; font-size: 0.95rem; color: var(--c-ink-2); text-align: center; }
.ch-shade-now b { display: none; font-family: var(--f-display); font-size: 1.25rem; font-weight: 500; color: var(--cobalt); }
${SHADES.map((s) => `.ch-hero:has(input[value='${s.id}']:checked) .ch-shade-now b[data-s='${s.id}'] { display: inline; }`).join('\n')}
.ch-now { display: inline-flex; align-items: center; gap: 0.55rem; min-height: 1.6em; margin-top: 1.2rem; font-size: 0.95rem; font-weight: 700; }
.ch-now i { width: 0.55rem; height: 0.55rem; border-radius: 50%; background: var(--cobalt); animation: ch-pulse 1.8s ease-in-out infinite; }
.ch-now[data-state='closed'] i { background: var(--c-ink-2); animation: none; }
@keyframes ch-pulse { 50% { transform: scale(0.55); } }

/* ---------- Секции ---------- */
.ch-sec { padding: 4.5rem 1rem 5rem; background: var(--c-bg); }
.ch-sec-2 { background: var(--c-bg-2); }
@media (min-width: 960px) { .ch-sec { padding: 7rem 2rem; } }

/* ---------- Что вас беспокоит ---------- */
[data-direction='chinni'] .dc { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.5rem; }
@media (min-width: 900px) { [data-direction='chinni'] .dc { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 2.5rem; align-items: start; } [data-direction='chinni'] .dc-results { position: sticky; top: 1.5rem; } }
[data-direction='chinni'] .dc-options { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.6rem; min-width: 0; }
[data-direction='chinni'] .dc-card { flex-direction: column; align-items: flex-start; gap: 0.7rem; height: 100%; min-height: 6.6rem; padding: 1rem 1rem 1.1rem; border-radius: 1.2rem; background: #ffffff; box-shadow: inset 0 0 0 1px var(--c-line), 0 10px 24px -18px rgba(27, 34, 51, 0.35); }
.ch-mark { width: 2.1rem; height: 2.1rem; fill: none; stroke: var(--cobalt); stroke-width: 1.15; stroke-linecap: round; stroke-linejoin: round; transition: stroke 0.2s ease; }
.ch-mark-fill { fill: var(--cobalt); stroke: none; transition: fill 0.2s ease; }
[data-direction='chinni'] .dc-label { font-weight: 700; font-size: 1rem; line-height: 1.25; }
[data-direction='chinni'] .dc-opt input:checked + .dc-card { background: var(--cobalt); color: #ffffff; box-shadow: 0 16px 30px -16px rgba(31, 67, 168, 0.7); }
[data-direction='chinni'] .dc-opt input:checked + .dc-card .ch-mark { stroke: #ffffff; }
[data-direction='chinni'] .dc-opt input:checked + .dc-card .ch-mark-fill { fill: #ffffff; }
@media (hover: hover) { [data-direction='chinni'] .dc-opt:hover .dc-card { box-shadow: inset 0 0 0 1px var(--cobalt), 0 10px 24px -18px rgba(27, 34, 51, 0.35); } [data-direction='chinni'] .dc-opt:hover input:checked + .dc-card { box-shadow: 0 16px 30px -16px rgba(31, 67, 168, 0.7); } }
[data-direction='chinni'] .dc-results { position: relative; min-width: 0; padding: 1.6rem 1.35rem 1.7rem; border-radius: 1.6rem; background: #ffffff; box-shadow: inset 0 0 0 1px var(--c-line), 0 30px 60px -40px rgba(27, 34, 51, 0.4); }
[data-direction='chinni'] .dc-results::before { content: ''; position: absolute; inset: 0.45rem; border-radius: 1.2rem; border: 1px solid rgba(31, 67, 168, 0.32); pointer-events: none; }
[data-direction='chinni'] .dc-empty { font-family: var(--f-display); font-size: 1.35rem; line-height: 1.35; color: var(--c-ink-2); }
[data-direction='chinni'] .dc-panel { gap: 1rem; }
[data-direction='chinni'] .dc-head { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; }
[data-direction='chinni'] .dc-head-label, [data-direction='chinni'] .dc-facts dt { font-size: 0.74rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--c-ink-2); }
[data-direction='chinni'] .dc-price { font-family: var(--f-display); font-weight: 400; font-size: clamp(2rem, 8.6vw, 2.9rem); line-height: 1.08; letter-spacing: -0.01em; color: var(--cobalt); }
[data-direction='chinni'] .dc-note { color: var(--c-ink-2); }
[data-direction='chinni'] .dc-facts { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; padding: 1rem 0; border-top: 1px solid var(--c-line); border-bottom: 1px solid var(--c-line); }
[data-direction='chinni'] .dc-facts dd { margin-top: 0.25rem; font-family: var(--f-display); font-size: 1.3rem; line-height: 1.2; }
[data-direction='chinni'] .dc-plan { display: grid; gap: 0.6rem; }
[data-direction='chinni'] .dc-monthly { font-family: var(--f-display); font-size: 1.55rem; line-height: 1.2; }
[data-direction='chinni'] .dc-per { font-family: var(--f-body); font-size: 0.9rem; color: var(--c-ink-2); }
[data-direction='chinni'] .dc-small { font-size: 0.88rem; color: var(--c-ink-2); }
[data-direction='chinni'] .dc-calm { font-family: var(--f-display); font-size: 1.5rem; line-height: 1.35; }
[data-direction='chinni'] .dc-actions { display: grid; gap: 0.6rem; }
[data-direction='chinni'] .dc-cta { justify-self: start; text-align: center; }

/* ---------- Первый визит ---------- */
.ch-visit { display: grid; gap: 1rem; }
@media (min-width: 960px) { .ch-visit { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 4rem; align-items: start; } }
.ch-steps li { display: grid; grid-template-columns: 3.4rem minmax(0, 1fr); gap: 1rem; padding: 1.3rem 0; border-top: 1px solid var(--c-line); }
.ch-steps li:last-child { border-bottom: 1px solid var(--c-line); }
.ch-roman { font-family: var(--f-display); font-size: 2.1rem; font-weight: 300; line-height: 1; color: var(--cobalt); }
.ch-step-t { font-size: 1.1rem; font-weight: 800; }
.ch-steps p { margin-top: 0.3rem; line-height: 1.55; color: var(--c-ink-2); }
@supports (animation-timeline: view()) {
  .ch-steps li { animation: ch-rise linear both; animation-timeline: view(); animation-range: entry 0% entry 60%; }
}
@keyframes ch-rise { from { transform: translateY(24px); } }

/* ---------- Запись и адрес ---------- */
.ch-booking, .ch-where { display: grid; gap: 1.5rem; }
@media (min-width: 960px) { .ch-booking { grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr); gap: 4rem; align-items: start; } .ch-where { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 4rem; align-items: end; } }
.ch-form { padding: 1.5rem 1.2rem 1.7rem; border-radius: 1.6rem; background: #ffffff; box-shadow: inset 0 0 0 1px var(--c-line), 0 30px 60px -40px rgba(27, 34, 51, 0.35); }
@media (min-width: 960px) { .ch-form { padding: 2.2rem; } }
.ch-address { font-family: var(--f-display); font-weight: 400; font-size: clamp(2rem, 8.5vw, 3.4rem); line-height: 1.08; letter-spacing: -0.01em; }
.ch-facts > div { display: grid; gap: 0.3rem; padding: 1rem 0; border-top: 1px solid var(--c-line); }
.ch-facts dt { font-size: 0.74rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--c-ink-2); }
.ch-facts dd { font-size: 1.08rem; }
.ch-facts .ch-now { display: flex; margin-top: 0.4rem; }
.ch-tel { display: inline-flex; align-items: center; min-height: 2.75rem; font-family: var(--f-display); font-size: clamp(1.7rem, 7vw, 2.2rem); color: var(--c-ink); text-decoration: none; transition: color 0.2s ease; }
@media (hover: hover) { .concept .ch-tel:hover { color: var(--cobalt); } }

/* ---------- OG ---------- */
.ch-og { padding: 0; }

@media (prefers-reduced-motion: reduce) {
  .ch-float, .ch-shine, .ch-shadow, .ch-dot, .ch-tab, .ch-now i, .ch-steps li { animation: none; }
  .ch-ring { animation: none; stroke-dashoffset: 0; }
  .ch-tab-tooth, .ch-s1, .ch-s2 { transition: none; }
}
`

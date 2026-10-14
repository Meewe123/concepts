/**
 * retro-gastronom: ночная пивная — кирпичная стена, неон, наборное табло. Lobster (вывеска) + Podkova (текст).
 * Petrovic: вывеска зажигается с мерцанием, неоновая кружка «наливается» трубками; бронь — на салфетке со схемой зала,
 * подходящие столы загораются неоном; меню — белые буквы в пазах войлока.
 */
const BRICK =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='44'%3E%3Cpath d='M0 1h88M0 23h88M44 1v22M22 23v22M66 23v22' fill='none' stroke='%23000' stroke-opacity='.38' stroke-width='2'/%3E%3C/svg%3E\")"

export const css = /* css */ `
.concept[data-direction='retro-gastronom'] {
  --c-bg: #16110f;
  --c-bg-2: #1e1714;
  --c-surface: #241b17;
  --c-ink: #f4ead8;
  --c-ink-2: #c4b4a0;
  --c-accent: #ff5a3c;
  --c-accent-ink: #16110f;
  --c-line: #3a2e28;
  --c-focus: #ff8a6f;
  --c-field: #1e1714;
  --neon: #ff5a3c;
  --neon-hi: #ffe3da;
  --cream: #f4ead8;
  --napkin-ink: #2a1f1a;
  --felt: #0f0c0b;
  --f-display: var(--font-lobster), cursive;
  --f-body: var(--font-podkova), Georgia, serif;
  --radius-btn: 999px;
  --radius-chip: 999px;
  --radius-field: 0.5rem;
  color-scheme: dark;
}
[data-direction='retro-gastronom'] .btn { font-weight: 700; }
[data-direction='retro-gastronom'] input:checked + .chip { background: var(--neon); border-color: var(--neon); color: var(--c-accent-ink); box-shadow: 0 0 14px rgba(255, 90, 60, 0.55); }
.rg-wrap { max-width: 72rem; margin: 0 auto; }
.rg-h2 { font-family: var(--f-display); font-size: clamp(2.6rem, 11vw, 4.8rem); line-height: 1.05; font-weight: 400; color: var(--neon-hi); text-shadow: 0 0 6px var(--neon), 0 0 22px rgba(255, 90, 60, 0.6); }
.rg-h3 { font-family: var(--f-display); font-size: clamp(2rem, 8vw, 3rem); line-height: 1.1; font-weight: 400; color: var(--neon-hi); text-shadow: 0 0 6px var(--neon); }
.rg-lead { max-width: 36rem; font-size: 1.1rem; line-height: 1.55; color: var(--c-ink-2); }
.rg-label { font-size: 0.8rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--c-ink-2); }
.rg-small { font-size: 0.92rem; color: var(--c-ink-2); }

/* ---------- Первый экран: кирпич и неон ---------- */
.rg-hero { position: relative; padding: 0 1rem 3rem; overflow: hidden; background-color: #1a1310; background-image: radial-gradient(70% 45% at 50% 28%, rgba(255, 90, 60, 0.2), transparent 72%), ${BRICK}; }
.rg-top { max-width: 72rem; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; min-height: 3.25rem; font-size: 0.9rem; color: var(--c-ink-2); }
.rg-lang a { padding: 0 0.9rem; border-radius: 999px; box-shadow: inset 0 0 0 1px var(--c-line); text-decoration: none; font-weight: 700; color: var(--c-ink); background: rgba(22, 17, 15, 0.7); }
.rg-hero-grid { max-width: 72rem; margin: 0 auto; display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.5rem; padding-top: 2rem; }
.rg-kicker { font-size: 0.85rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--c-ink-2); }
.rg-neon { margin-top: 0.6rem; font-family: var(--f-display); font-weight: 400; font-size: clamp(4.4rem, 24vw, 10.5rem); line-height: 1; color: var(--neon-hi); text-shadow: 0 0 2px #fff, 0 0 8px var(--neon), 0 0 24px var(--neon), 0 0 52px #ff3a1a; transform: rotate(-4deg); transform-origin: left center; animation: rg-on 1.9s steps(1) 0.2s both; }
@keyframes rg-on { 0% { opacity: 0.12; text-shadow: none; } 8% { opacity: 1; } 12% { opacity: 0.2; text-shadow: none; } 20% { opacity: 1; } 24% { opacity: 0.35; } 34%, 100% { opacity: 1; } }
.rg-flick { animation: rg-flick 7s steps(1) 3s infinite; }
@keyframes rg-flick { 0%, 90%, 100% { opacity: 1; } 91% { opacity: 0.3; } 92% { opacity: 1; } 95% { opacity: 0.45; } 96% { opacity: 1; } }
.rg-tube-line { margin-top: 0.6rem; font-size: clamp(1.15rem, 5vw, 1.6rem); font-weight: 600; letter-spacing: 0.06em; color: #ffd27a; text-shadow: 0 0 6px rgba(255, 180, 60, 0.85), 0 0 18px rgba(255, 150, 40, 0.5); animation: rg-on 1.9s steps(1) 0.9s both; }
.rg-hero-mug { width: 8.5rem; justify-self: end; margin-top: -1rem; }
.rg-statement { max-width: 34rem; font-size: 1.15rem; line-height: 1.55; }
.rg-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1.25rem; }
.rg-chips li { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.85rem; border-radius: 999px; background: rgba(22, 17, 15, 0.75); box-shadow: inset 0 0 0 1px var(--c-line); font-size: 0.92rem; font-weight: 600; }
.rg-cta { display: grid; gap: 0.75rem; margin-top: 1.5rem; }
[data-direction='retro-gastronom'] .rg-hero .btn:not(.btn-ghost) { box-shadow: 0 0 20px rgba(255, 90, 60, 0.45); }
[data-direction='retro-gastronom'] .btn-ghost { background: rgba(22, 17, 15, 0.7); }
@media (min-width: 640px) { .rg-cta { display: flex; flex-wrap: wrap; } }
@media (min-width: 900px) {
  .rg-hero { padding: 0 2rem 5rem; }
  .rg-hero-grid { grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.6fr); grid-template-areas: 'sign mug' 'copy mug'; column-gap: 3rem; align-items: end; padding-top: 3.5rem; }
  .rg-hero-grid > :first-child { grid-area: sign; }
  .rg-hero-mug { grid-area: mug; width: 100%; max-width: 16rem; align-self: center; justify-self: center; margin: 0; }
  .rg-hero-copy { grid-area: copy; }
}

/* Неоновая кружка */
.rg-mug { display: block; height: auto; overflow: visible; filter: drop-shadow(0 0 3px var(--neon)) drop-shadow(0 0 12px rgba(255, 90, 60, 0.7)); }
.rg-tube { fill: none; stroke: var(--neon-hi); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 1; stroke-dashoffset: 0; animation: rg-draw 0.8s ease-out both; animation-delay: calc(0.6s + var(--i) * 0.45s); }
.rg-foam { stroke: #ffd27a; }
@keyframes rg-draw { from { stroke-dashoffset: 1; } }
.rg-bubble { fill: none; stroke: var(--neon-hi); stroke-width: 1.6; transform-box: fill-box; animation: rg-bubble 2.6s ease-in infinite; animation-delay: calc(2s + var(--i) * 0.5s); opacity: 0; }
@keyframes rg-bubble { 0% { transform: translateY(0); opacity: 0; } 15% { opacity: 1; } 100% { transform: translateY(-80px); opacity: 0; } }
.rg-still .rg-tube, .rg-still .rg-bubble { animation: none; }
.rg-still .rg-bubble { opacity: 0.8; }

/* ---------- Секции ---------- */
.rg-sec { padding: 4.5rem 1rem 5rem; background: var(--c-bg); }
.rg-sec-2 { background: var(--c-bg-2); }
@media (min-width: 900px) { .rg-sec { padding: 7rem 2rem; } }

/* ---------- Бронь: салфетка со схемой ---------- */
.rg-bron { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2rem; }
@media (min-width: 900px) { .rg-bron { grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr); gap: 3rem; align-items: start; } .rg-napkin { position: sticky; top: 1.5rem; } }
.rg-napkin { position: relative; padding: 1rem 1rem 1.2rem; border-radius: 0.4rem; background: var(--cream); color: var(--napkin-ink); transform: rotate(-1.2deg); box-shadow: 0 24px 50px -24px rgba(0, 0, 0, 0.9); background-image: repeating-linear-gradient(0deg, transparent 0 15px, rgba(42, 31, 26, 0.05) 15px 16px), repeating-linear-gradient(90deg, transparent 0 15px, rgba(42, 31, 26, 0.05) 15px 16px); }
.rg-plan { display: block; width: 100%; height: auto; }
.rg-zone-r { fill: transparent; stroke: var(--napkin-ink); stroke-width: 1.4; stroke-dasharray: 0; transition: fill 0.3s ease, stroke 0.3s ease; }
.rg-zone-season .rg-zone-r { stroke-dasharray: 5 4; }
.rg-zone[data-on] .rg-zone-r { fill: rgba(255, 90, 60, 0.1); stroke: #c23a1e; stroke-width: 2.2; }
.rg-zone-t { font-family: var(--f-display); font-size: 15px; fill: var(--napkin-ink); }
.rg-zone[data-on] .rg-zone-t { fill: #b0341a; }
.rg-table { opacity: 0.4; transition: opacity 0.3s ease; }
.rg-zone[data-on] .rg-table { opacity: 0.85; }
.rg-top-t { fill: var(--cream); stroke: var(--napkin-ink); stroke-width: 1.4; transition: fill 0.25s ease; }
.rg-chair { fill: var(--napkin-ink); opacity: 0.55; }
.rg-bench { fill: none; stroke: var(--napkin-ink); stroke-width: 4; stroke-linecap: round; opacity: 0.6; }
.rg-seats { font-family: var(--f-body); font-size: 10px; font-weight: 700; fill: var(--napkin-ink); }
.rg-table[data-fit] { opacity: 1; }
.rg-table[data-fit] .rg-top-t { fill: var(--neon); stroke: #b0341a; filter: drop-shadow(0 0 4px rgba(255, 90, 60, 0.8)); }
.rg-table[data-fit] .rg-chair { fill: #b0341a; opacity: 1; }
.rg-table[data-fit] .rg-seats { fill: #fff; }
.rg-table[data-fit] { animation: rg-pop 0.4s cubic-bezier(0.3, 1.5, 0.5, 1); transform-box: fill-box; transform-origin: center; }
@keyframes rg-pop { from { transform: scale(0.8); } }
.rg-door { stroke: #b0341a; stroke-width: 3; stroke-linecap: round; }
.rg-door-t { font-size: 10px; font-weight: 700; fill: #b0341a; letter-spacing: 0.1em; }
.rg-fit { margin-top: 0.5rem; font-size: 1rem; font-weight: 600; }
.rg-fit b { font-family: var(--f-display); font-size: 1.5rem; color: #b0341a; }
.rg-season { display: none; margin-top: 0.4rem; padding: 0.5rem 0.75rem; border-radius: 0.4rem; background: rgba(176, 52, 26, 0.12); font-size: 0.92rem; font-weight: 600; }
[data-bron][data-season='off'] .rg-season { display: block; }
.rg-nofit { display: none; margin-top: 0.4rem; padding: 0.5rem 0.75rem; border-radius: 0.4rem; background: var(--napkin-ink); color: var(--cream); font-size: 0.92rem; font-weight: 600; }
[data-bron][data-fit='0'] .rg-nofit { display: block; }
.rg-napkin-note { margin-top: 0.5rem; font-size: 0.82rem; color: #5a4a40; }
.rg-controls { display: grid; gap: 1.4rem; }
/* fieldset по умолчанию растягивается по содержимому — лента дней раздвигала колонку */
.rg-group { min-width: 0; }
.rg-group legend { margin-bottom: 0.6rem; }
.rg-chips-row { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.rg-num { min-width: 3.2rem; justify-content: center; font-weight: 700; }
.rg-days { display: flex; gap: 0.5rem; margin: 0 -1rem; padding: 0 1rem 0.25rem; overflow-x: auto; scrollbar-width: none; }
.rg-days::-webkit-scrollbar { display: none; }
.rg-day .chip { white-space: nowrap; }
.rg-times { display: grid; grid-template-columns: repeat(auto-fill, minmax(4.6rem, 1fr)); gap: 0.45rem; }
.rg-time .chip { width: 100%; justify-content: center; padding: 0 0.5rem; font-weight: 600; }
.rg-day, .rg-time { animation: rg-in 0.3s ease both; animation-delay: calc(var(--i) * 0.02s); }
@keyframes rg-in { from { opacity: 0; transform: translateY(4px); } }
.rg-day input:focus-visible + .chip, .rg-time input:focus-visible + .chip { outline: 2px solid var(--c-focus); outline-offset: 2px; }
.rg-summary { font-size: 1.1rem; font-weight: 600; color: var(--neon-hi); min-height: 1.6em; }
.rg-cta-book[aria-disabled='true'] { background: var(--c-surface); color: var(--c-ink); box-shadow: inset 0 0 0 1px var(--c-line); }

/* ---------- Табло ---------- */
.rg-board { position: relative; padding: 1.6rem 1.1rem 1.4rem; border-radius: 0.6rem; border: 10px solid #3b2a20; background-color: var(--felt); background-image: repeating-linear-gradient(180deg, transparent 0 calc(2.2rem - 2px), rgba(255, 255, 255, 0.06) calc(2.2rem - 2px) 2.2rem); box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.9), 0 30px 60px -30px rgba(0, 0, 0, 0.9); color: #f2efe8; }
.rg-board-screw { position: absolute; top: 0.6rem; width: 0.55rem; height: 0.55rem; border-radius: 50%; background: #8a7a6a; box-shadow: inset 0 0 0 1px #4a3e34; }
.rg-s1 { left: 0.6rem; } .rg-s2 { right: 0.6rem; }
.rg-board-cat + .rg-board-cat { margin-top: 2.2rem; }
.rg-board-h { font-family: var(--f-display); font-size: 1.7rem; line-height: 2.2rem; font-weight: 400; color: var(--neon-hi); text-shadow: 0 0 6px var(--neon); }
.rg-board ul { display: grid; }
.rg-board li { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; min-height: 2.2rem; padding: 0.3rem 0; text-transform: uppercase; letter-spacing: 0.07em; font-weight: 600; font-size: 1rem; line-height: 1.6rem; }
.rg-board-name small { display: block; text-transform: none; letter-spacing: 0; font-weight: 400; font-size: 0.85rem; line-height: 1.3; color: #bdb4a6; }
.rg-board-price { font-variant-numeric: tabular-nums; white-space: nowrap; }
.rg-board-foot { margin-top: 1.6rem; font-size: 0.82rem; letter-spacing: 0.12em; text-transform: uppercase; color: #bdb4a6; }
@media (min-width: 900px) { .rg-board { padding: 2.4rem 2.6rem; column-count: 2; column-gap: 4rem; } .rg-board-cat { break-inside: avoid; } }
@supports (animation-timeline: view()) {
  .rg-board li { animation: rg-letter linear both; animation-timeline: view(); animation-range: entry 0% entry 60%; }
}
@keyframes rg-letter { from { transform: translateY(-6px); letter-spacing: 0.22em; } }

/* ---------- Заявка и адрес ---------- */
.rg-booking { display: grid; gap: 1.5rem; padding-bottom: 4rem; margin-bottom: 4rem; border-bottom: 1px solid var(--c-line); }
@media (min-width: 900px) { .rg-booking { grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr); gap: 4rem; align-items: start; } }
.rg-form { padding: 1.4rem 1.15rem 1.6rem; border-radius: 0.9rem; background: var(--c-surface); box-shadow: inset 0 0 0 1px var(--c-line); }
@media (min-width: 900px) { .rg-form { padding: 2.2rem; } }
.rg-where { display: grid; gap: 2.5rem; }
@media (min-width: 900px) { .rg-where { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 4rem; align-items: end; } }
.rg-street { margin-top: 0.5rem; font-family: var(--f-display); font-size: clamp(2.4rem, 10vw, 4.2rem); line-height: 1.05; font-weight: 400; color: var(--neon-hi); text-shadow: 0 0 6px var(--neon); }
.rg-landmark { margin-top: 0.75rem; padding-left: 0.8rem; border-left: 3px solid var(--neon); font-weight: 600; }
.rg-facts > div { display: grid; gap: 0.4rem; padding: 1.1rem 0; border-top: 1px solid var(--c-line); }
.rg-social { display: flex; flex-wrap: wrap; gap: 0.75rem; padding-top: 1.1rem; border-top: 1px solid var(--c-line); }
.rg-facts dd { font-size: 1.1rem; }
.rg-tel { display: inline-flex; align-items: center; min-height: 2.75rem; font-size: clamp(1.5rem, 6.6vw, 2rem); font-weight: 700; color: var(--c-ink); text-decoration: none; transition: color 0.2s ease; }
@media (hover: hover) { .concept .rg-tel:hover { color: var(--neon); } }
.concept[data-direction='retro-gastronom'] .sticky-bar { background: rgba(22, 17, 15, 0.94); }

/* ---------- OG ---------- */
.rg-og { padding: 0; }
.rg-og .rg-neon, .rg-og .rg-tube-line { animation: none; }

@media (prefers-reduced-motion: reduce) {
  .rg-neon, .rg-flick, .rg-tube-line, .rg-tube, .rg-bubble, .rg-table[data-fit], .rg-day, .rg-time, .rg-board li { animation: none; }
  .rg-bubble { opacity: 0.8; }
  .rg-zone-r, .rg-table, .rg-top-t { transition: none; }
}
`

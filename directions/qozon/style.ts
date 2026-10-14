/**
 * qozon: плов-центр — чугунный казан на огне, рис с жёлтой морковью, топчаны во дворе.
 * Fira Sans Extra Condensed (вывеска) + Alegreya Sans (текст). Основной — уголь и рисовый крем, акцент — жёлтая морковь.
 * Sariq Sabzi: уровень плова в казане опускается к вечеру (островок ставит --level), пар и пламя живут сами;
 * ляганы в меню поворачиваются при прокрутке.
 */
export const css = /* css */ `
.concept[data-direction='qozon'] {
  --c-bg: #f6eedd;
  --c-bg-2: #efe3c9;
  --c-surface: #fffaf0;
  --c-ink: #1c1714;
  --c-ink-2: #5a4c40;
  --c-accent: #f0b323;
  --c-accent-ink: #1c1714;
  --c-line: #d6c4a2;
  --c-focus: #1c1714;
  --c-field: #fffaf0;
  --char: #1c1714;
  --iron: #0d0a08;
  --rice: #f6eedd;
  --carrot: #f0b323;
  --carrot-2: #d9861a;
  --meat: #5e3a26;
  --f-display: var(--font-fira-xc), 'Arial Narrow', sans-serif;
  --f-body: var(--font-alegreya-sans), system-ui, sans-serif;
  --radius-btn: 0.6rem;
  --radius-chip: 0.6rem;
  --radius-field: 0.5rem;
}
.qz-dark {
  --c-bg: #1c1714;
  --c-bg-2: #231d19;
  --c-surface: #2a231e;
  --c-ink: #f6eedd;
  --c-ink-2: #c8b79c;
  --c-line: #463a31;
  --c-focus: #f0b323;
  --c-field: #231d19;
  background: var(--c-bg);
  color: var(--c-ink);
  color-scheme: dark;
}
[data-direction='qozon'] { font-size: 1.0625rem; }
[data-direction='qozon'] .btn { font-weight: 700; font-size: 1.05rem; letter-spacing: 0.01em; }
[data-direction='qozon'] .btn:not(.btn-ghost) { box-shadow: 0 3px 0 0 var(--carrot-2); }
[data-direction='qozon'] .btn:not(.btn-ghost):active { box-shadow: 0 1px 0 0 var(--carrot-2); transform: translateY(2px); }
[data-direction='qozon'] .btn-ghost { box-shadow: inset 0 0 0 2px var(--c-ink); }
[data-direction='qozon'] input:checked + .chip { background: var(--carrot); color: var(--char); border-color: var(--c-ink); box-shadow: inset 0 0 0 1px var(--c-ink); font-weight: 700; }
[data-direction='qozon'] .chip { font-weight: 500; border-width: 1.5px; }
.qz-wrap { max-width: 72rem; margin: 0 auto; }
.qz-h2 { font-family: var(--f-display); font-weight: 900; font-size: clamp(2.7rem, 12vw, 5.2rem); line-height: 0.92; text-transform: uppercase; letter-spacing: -0.005em; text-wrap: balance; }
.qz-dark .qz-h2 { color: var(--carrot); }
.qz-lead { max-width: 36rem; font-size: 1.15rem; line-height: 1.5; color: var(--c-ink-2); }
.qz-label { font-family: var(--f-display); font-size: 0.95rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--c-ink-2); }
.qz-small { font-size: 0.95rem; color: var(--c-ink-2); }

/* ---------- Первый экран ---------- */
.qz-hero { position: relative; padding: 0 1rem 3.5rem; overflow: hidden; background-image: radial-gradient(60% 40% at 78% 62%, rgba(240, 179, 35, 0.16), transparent 70%), radial-gradient(90% 60% at 20% 0%, #2a211b, transparent 70%); }
.qz-top { max-width: 72rem; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; min-height: 3.25rem; font-size: 0.95rem; color: var(--c-ink-2); }
.qz-lang a { padding: 0 0.9rem; border-radius: 0.5rem; box-shadow: inset 0 0 0 1.5px var(--c-line); text-decoration: none; font-weight: 700; color: var(--c-ink); }
.qz-hero-grid { max-width: 72rem; margin: 0 auto; display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.75rem; padding-top: 1.5rem; }
.qz-kicker { font-family: var(--f-display); font-size: 1rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--c-ink-2); }
.qz-word { margin-top: 0.5rem; font-family: var(--f-display); font-weight: 900; font-size: clamp(5.6rem, 33vw, 12.5rem); line-height: 0.8; text-transform: uppercase; letter-spacing: -0.01em; color: var(--carrot); }
.qz-line { display: block; overflow: hidden; padding-bottom: 0.04em; }
.qz-line > span { display: inline-block; animation: qz-rise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both; animation-delay: 0.1s; }
.qz-line + .qz-line > span { animation-delay: 0.24s; color: var(--rice); }
@keyframes qz-rise { from { transform: translateY(105%); } }
.qz-meaning { margin-top: 0.9rem; font-size: 1.05rem; color: var(--c-ink-2); }
.qz-statement { max-width: 34rem; font-size: 1.2rem; line-height: 1.5; }
.qz-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1.25rem; }
.qz-chips li { display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.45rem 0.85rem; border-radius: 0.5rem; background: #2a231e; box-shadow: inset 0 0 0 1px var(--c-line); font-weight: 700; font-size: 0.98rem; }
.qz-cta { display: grid; gap: 0.75rem; margin-top: 1.6rem; }
@media (min-width: 640px) { .qz-cta { display: flex; flex-wrap: wrap; } }
@media (min-width: 960px) {
  .qz-hero { padding: 0 2rem 5rem; }
  .qz-hero-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); grid-template-areas: 'sign pot' 'copy pot'; column-gap: 3rem; row-gap: 2rem; padding-top: 3rem; align-items: start; }
  .qz-sign { grid-area: sign; }
  .qz-pot { grid-area: pot; align-self: center; }
  .qz-hero-copy { grid-area: copy; }
}

/* Казан */
.qz-pot { display: grid; justify-items: center; gap: 0.6rem; }
.qz-kazan { display: block; width: 100%; max-width: 27rem; height: auto; overflow: visible; }
.qz-iron { fill: var(--iron); }
.qz-cavity { fill: #2b221c; }
.qz-rim { stroke: #2f2721; stroke-width: 18; stroke-linecap: round; }
.qz-ear { fill: none; stroke: var(--iron); stroke-width: 9; stroke-linecap: round; }
.qz-shine { fill: none; stroke: rgba(246, 238, 221, 0.09); stroke-width: 7; stroke-linecap: round; }
.qz-kapgir { stroke: #8f7f6a; stroke-width: 7; stroke-linecap: round; }
.qz-fill { transform: translateY(calc((1 - var(--level, 1)) * 112px)); transition: transform 1.6s cubic-bezier(0.3, 0.7, 0.2, 1); }
.qz-zirvak { fill: #9a4f18; }
.qz-meat { fill: var(--meat); }
.qz-rice { fill: #d9a650; }
.qz-grain { fill: #f8e2a8; }
.qz-grain-2 { fill: #fff4d6; }
.qz-carrot { fill: var(--carrot); }
.qz-carrot-2 { fill: #e0701c; }
.qz-garlic circle { fill: #f3ead6; stroke: #bfae91; stroke-width: 1.5; }
.qz-garlic path { fill: none; stroke: #bfae91; stroke-width: 1.5; }
.qz-fire { filter: drop-shadow(0 0 10px rgba(240, 179, 35, 0.55)); transition: opacity 0.6s ease; }
.qz-flame { fill: var(--carrot); transform-box: fill-box; transform-origin: 50% 100%; animation: qz-flick 0.9s ease-in-out infinite alternate; animation-delay: calc(var(--i) * -0.23s); }
.qz-flame-2 { fill: var(--carrot-2); animation-duration: 0.7s; }
@keyframes qz-flick { from { transform: scaleY(0.8) skewX(-5deg); } to { transform: scaleY(1.1) skewX(5deg); } }
.qz-log { fill: #3b2a1e; }
.qz-steam { filter: blur(3px); }
.qz-wisp { fill: none; stroke: rgba(246, 238, 221, 0.42); stroke-width: 13; stroke-linecap: round; transform-box: fill-box; transform-origin: 50% 100%; animation: qz-steam 3.6s ease-in-out infinite; animation-delay: calc(var(--i) * -1.2s); }
@keyframes qz-steam { 0% { transform: translateY(16px) scaleY(0.7); opacity: 0; } 30% { opacity: 1; } 100% { transform: translateY(-28px) scaleY(1.15); opacity: 0; } }
[data-pot='out'] .qz-steam { opacity: 0.3; }
[data-pot='out'] .qz-fire { opacity: 0.45; }
.qz-status { display: flex; align-items: baseline; gap: 0.6rem; max-width: 27rem; min-height: 2.9em; font-size: 1.1rem; font-weight: 700; line-height: 1.35; }
.qz-status i { flex: none; width: 0.65rem; height: 0.65rem; border-radius: 50%; background: var(--carrot); transform: translateY(-0.05em); animation: qz-pulse 1.6s ease-in-out infinite; }
[data-pot='out'] .qz-status i { background: var(--c-ink-2); animation: none; }
@keyframes qz-pulse { 50% { transform: translateY(-0.05em) scale(0.6); } }
.qz-status-note { max-width: 27rem; font-size: 0.92rem; color: var(--c-ink-2); }

/* ---------- Секции ---------- */
.qz-sec { padding: 4.5rem 1rem 5rem; background: var(--c-bg); color: var(--c-ink); }
@media (min-width: 960px) { .qz-sec { padding: 7rem 2rem; } }

/* ---------- Бронь: двор сверху ---------- */
.qz-bron { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2rem; }
@media (min-width: 960px) { .qz-bron { grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); gap: 3rem; align-items: start; } .qz-yard { position: sticky; top: 1.5rem; } }
.qz-yard { padding: 1rem 1rem 1.2rem; border-radius: 1rem; background: var(--char); color: var(--rice); box-shadow: 0 30px 50px -30px rgba(28, 23, 20, 0.6); }
.qz-plan { display: block; width: 100%; height: auto; }
.qz-zone-r { fill: rgba(246, 238, 221, 0.03); stroke: #5a4c40; stroke-width: 1.5; transition: fill 0.3s ease, stroke 0.3s ease; }
.qz-zone[data-on] .qz-zone-r { fill: rgba(240, 179, 35, 0.08); stroke: var(--carrot); stroke-width: 2.4; }
.qz-zone-vine { opacity: 0.6; pointer-events: none; }
.qz-vine-l { stroke: rgba(246, 238, 221, 0.12); stroke-width: 2; }
.qz-zone-t { font-family: var(--f-display); font-weight: 700; font-size: 15px; letter-spacing: 0.06em; text-transform: uppercase; fill: var(--rice); }
.qz-zone-note { font-family: var(--f-body); font-weight: 500; font-size: 12px; letter-spacing: 0; text-transform: none; fill: #c8b79c; }
.qz-zone[data-on] .qz-zone-t { fill: var(--carrot); }
.qz-table { opacity: 0.35; transition: opacity 0.3s ease; }
.qz-zone[data-on] .qz-table { opacity: 0.8; }
.qz-top-t { fill: #3a302a; stroke: #8f7f6a; stroke-width: 1.4; transition: fill 0.25s ease; }
.qz-chair { fill: #8f7f6a; }
.qz-sori { fill: #3a2e25; stroke: #8f7f6a; stroke-width: 1.4; }
.qz-kurpa { fill: none; stroke: #6e5a48; stroke-width: 3; stroke-dasharray: 6 3; }
.qz-seats { font-family: var(--f-display); font-size: 12px; font-weight: 700; fill: var(--rice); }
.qz-table[data-fit] { opacity: 1; animation: qz-pop 0.45s cubic-bezier(0.3, 1.5, 0.5, 1); transform-box: fill-box; transform-origin: center; }
.qz-table[data-fit] .qz-top-t, .qz-table[data-fit] .qz-chair { fill: var(--carrot); stroke: var(--carrot); }
.qz-table[data-fit] .qz-sori { stroke: var(--carrot); stroke-width: 2.2; }
.qz-table[data-fit] .qz-kurpa { stroke: var(--carrot-2); }
.qz-table[data-fit] .qz-seats { fill: var(--char); }
@keyframes qz-pop { from { transform: scale(0.82); } }
.qz-door { stroke: var(--carrot); stroke-width: 4; stroke-linecap: round; }
.qz-fit { margin-top: 0.6rem; font-size: 1.05rem; font-weight: 700; }
.qz-fit b { font-family: var(--f-display); font-size: 1.7rem; color: var(--carrot); }
.qz-season, .qz-nofit { display: none; margin-top: 0.5rem; padding: 0.55rem 0.8rem; border-radius: 0.5rem; background: #2f2620; font-size: 0.95rem; font-weight: 500; }
[data-bron][data-season='off'] .qz-season { display: block; }
[data-bron][data-fit='0'] .qz-nofit { display: block; }
.qz-controls { display: grid; gap: 1.4rem; }
.qz-group { min-width: 0; }
.qz-group legend { margin-bottom: 0.6rem; }
.qz-chips-row { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.qz-num { min-width: 3.4rem; justify-content: center; font-family: var(--f-display); font-size: 1.2rem; }
.qz-days { display: flex; gap: 0.5rem; margin: 0 -1rem; padding: 0 1rem 0.25rem; overflow-x: auto; scrollbar-width: none; }
.qz-days::-webkit-scrollbar { display: none; }
.qz-day .chip { white-space: nowrap; }
.qz-times { display: grid; grid-template-columns: repeat(auto-fill, minmax(4.6rem, 1fr)); gap: 0.45rem; }
.qz-time .chip { width: 100%; justify-content: center; padding: 0 0.5rem; font-weight: 700; }
.qz-day, .qz-time { animation: qz-in 0.3s ease both; animation-delay: calc(var(--i) * 0.02s); }
@keyframes qz-in { from { transform: translateY(5px); } }
.qz-summary { min-height: 1.6em; font-family: var(--f-display); font-size: 1.35rem; font-weight: 700; letter-spacing: 0.02em; }
.qz-cta-book[aria-disabled='true'] { background: var(--c-surface); color: var(--c-ink); box-shadow: inset 0 0 0 1.5px var(--c-line) !important; }

/* ---------- Меню: ляганы ---------- */
.qz-lagans { display: grid; gap: 1.75rem; }
.qz-dish { display: grid; grid-template-columns: 8rem minmax(0, 1fr); grid-template-rows: auto auto 1fr; column-gap: 1.1rem; align-items: start; }
.qz-dish .qz-lagan { grid-row: 1 / 4; }
.qz-lagan { display: block; width: 100%; height: auto; filter: drop-shadow(0 18px 22px rgba(0, 0, 0, 0.45)); transition: transform 0.5s cubic-bezier(0.3, 1.4, 0.5, 1); }
.qz-dish-t { font-family: var(--f-display); font-size: clamp(1.6rem, 7.4vw, 2.1rem); line-height: 1; font-weight: 900; text-transform: uppercase; color: var(--carrot); }
.qz-dish-n { margin-top: 0.35rem; color: var(--c-ink-2); line-height: 1.4; }
.qz-price { font-family: var(--f-display); font-size: 1.6rem; font-weight: 700; white-space: nowrap; }
.qz-dish .qz-price { margin-top: 0.4rem; }
.qz-price small { font-size: 0.6em; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--c-ink-2); }
@media (min-width: 760px) {
  .qz-lagans { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2.5rem; }
  .qz-dish { grid-template-columns: minmax(0, 1fr); grid-template-rows: none; text-align: center; justify-items: center; }
  .qz-dish .qz-lagan { grid-row: auto; max-width: 15rem; margin-bottom: 1.2rem; }
}
@media (hover: hover) { .qz-dish:hover .qz-lagan { transform: scale(1.05) rotate(8deg); } }
.qz-plate { fill: #f3ead6; }
.qz-plate-ring { fill: none; stroke: #d6c4a2; stroke-width: 2; }
.qz-plate-dash { fill: var(--carrot-2); }
.qz-mound { fill: #d9a650; }
.qz-qazi { fill: var(--meat); }
.qz-qazi-fat { fill: #f3ead6; }
.qz-egg { fill: #fffaf0; stroke: #e2d2b0; stroke-width: 1; }
.qz-yolk { fill: var(--carrot); }
.qz-nut { fill: #e8c98a; stroke: #c49d5c; stroke-width: 1; }
.qz-raisin { fill: #3b2416; }
.qz-list { display: grid; gap: 2.5rem; margin-top: 3.5rem; padding-top: 2.5rem; border-top: 1.5px solid var(--c-line); }
@media (min-width: 760px) { .qz-list { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 4rem; } }
.qz-list-h { font-family: var(--f-display); font-size: 1.6rem; font-weight: 900; text-transform: uppercase; color: var(--carrot); }
.qz-list ul { display: grid; gap: 0.9rem; margin-top: 1rem; }
.qz-list li { display: flex; align-items: baseline; gap: 0.6rem; }
.qz-list li i { flex: 1; min-width: 1rem; border-bottom: 2px dotted var(--c-line); transform: translateY(-0.3em); }
.qz-list-name { font-size: 1.15rem; font-weight: 700; }
.qz-list-name small { display: block; font-size: 0.92rem; font-weight: 400; color: var(--c-ink-2); }
.qz-list .qz-price { font-size: 1.3rem; }
@supports (animation-timeline: view()) {
  .qz-lagan { animation: qz-spin linear both; animation-timeline: view(); animation-range: entry 0% exit 100%; }
}
@keyframes qz-spin { from { transform: rotate(-50deg); } to { transform: rotate(50deg); } }

/* ---------- Заявка и адрес ---------- */
.qz-booking { display: grid; gap: 1.5rem; padding-bottom: 4rem; margin-bottom: 4rem; border-bottom: 1.5px solid var(--c-line); }
@media (min-width: 960px) { .qz-booking { grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr); gap: 4rem; align-items: start; } }
.qz-form { padding: 1.4rem 1.15rem 1.6rem; border-radius: 1rem; background: var(--c-surface); box-shadow: inset 0 0 0 2px var(--char), 0 6px 0 0 var(--char); }
@media (min-width: 960px) { .qz-form { padding: 2.2rem; } }
.qz-where { display: grid; gap: 2.5rem; }
@media (min-width: 960px) { .qz-where { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 4rem; align-items: end; } }
.qz-street { margin-top: 0.5rem; font-family: var(--f-display); font-size: clamp(2.2rem, 9.5vw, 3.8rem); line-height: 0.95; font-weight: 900; text-transform: uppercase; }
.qz-facts > div { display: grid; gap: 0.35rem; padding: 1rem 0; border-top: 1.5px solid var(--c-line); }
.qz-facts dd { font-size: 1.15rem; font-weight: 500; }
.qz-tel { display: inline-flex; align-items: center; gap: 0.5rem; min-height: 2.75rem; font-family: var(--f-display); font-size: clamp(1.6rem, 7vw, 2.1rem); font-weight: 700; color: var(--c-ink); text-decoration: none; transition: color 0.2s ease; }
@media (hover: hover) { .concept .qz-tel:hover { color: var(--carrot-2); } }
.concept[data-direction='qozon'] .sticky-bar { border-top: 2px solid var(--char); }

/* ---------- OG ---------- */
.qz-og { padding: 0; }
.qz-og .qz-line > span { animation: none; }
.qz-still .qz-flame, .qz-still .qz-wisp { animation: none; }
.qz-still .qz-wisp { opacity: 0.7; }

@media (prefers-reduced-motion: reduce) {
  .qz-line > span, .qz-flame, .qz-wisp, .qz-status i, .qz-table[data-fit], .qz-day, .qz-time, .qz-lagan { animation: none; }
  .qz-wisp { opacity: 0.6; }
  .qz-fill, .qz-lagan, .qz-zone-r, .qz-table, .qz-top-t { transition: none; }
}
`

/**
 * showroom-chrome: тёмный шоурум, графит и лаймовый акцент; Exo 2 курсивом (шильдики) + Onest.
 * Urus Premium: арка мойки проходит над пыльной машиной — за ней кузов глянцевый, по нему пробегает блик;
 * калькулятор с «программой мойки» полосой, «готово к…», загрузка по часам и окна без очереди.
 */
export const css = /* css */ `
.concept[data-direction='showroom-chrome'] {
  --c-bg: #0c0f13;
  --c-bg-2: #12161c;
  --c-surface: #171c23;
  --c-ink: #eef2f5;
  --c-ink-2: #9aa5b1;
  --c-accent: #c6ff3d;
  --c-accent-ink: #0c0f13;
  --c-line: #2a313b;
  --c-focus: #c6ff3d;
  --c-field: #12161c;
  --lime: #c6ff3d;
  --lime-2: #d9ff7a;
  --steel: #2b313a;
  --steel-2: #48515d;
  --chrome: #dfe6ee;
  --f-display: var(--font-exo2), system-ui, sans-serif;
  --f-body: var(--font-onest), system-ui, sans-serif;
  --radius-btn: 0.4rem;
  --radius-chip: 0.4rem;
  --radius-field: 0.4rem;
  --out: cubic-bezier(0.2, 0.8, 0.2, 1);
  color-scheme: dark;
}
[data-direction='showroom-chrome'] .btn { font-weight: 700; letter-spacing: 0.02em; }
[data-direction='showroom-chrome'] input:checked + .chip { background: var(--lime); border-color: var(--lime); color: var(--c-accent-ink); }
.sc-wrap { max-width: 72rem; margin: 0 auto; }
.sc-h2 { font-family: var(--f-display); font-style: italic; font-weight: 800; font-size: clamp(2.2rem, 9.5vw, 4.4rem); line-height: 1; letter-spacing: -0.01em; text-transform: uppercase; }
.sc-lead { max-width: 36rem; font-size: 1.08rem; line-height: 1.55; color: var(--c-ink-2); }
.sc-label { font-size: 0.76rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--c-ink-2); }
.sc-small { font-size: 0.88rem; line-height: 1.5; color: var(--c-ink-2); }

/* ---------- Первый экран ---------- */
.sc-hero { position: relative; padding: 0 1rem 3rem; overflow: hidden; background: radial-gradient(120% 70% at 50% 62%, #1d2430 0%, var(--c-bg) 62%); }
.sc-top { max-width: 72rem; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; min-height: 3.25rem; font-size: 0.85rem; color: var(--c-ink-2); }
.sc-lang a { padding: 0 0.9rem; border-radius: 0.4rem; box-shadow: inset 0 0 0 1px var(--c-line); text-decoration: none; font-weight: 600; color: var(--c-ink); }
.sc-hero-in { max-width: 72rem; margin: 0 auto; padding-top: 1.5rem; }
.sc-kicker { font-size: 0.8rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--lime); }
.sc-name { margin-top: 0.4rem; font-family: var(--f-display); font-style: italic; font-weight: 800; font-size: clamp(5rem, 30vw, 13rem); line-height: 0.82; letter-spacing: -0.03em; text-transform: uppercase; }
.sc-name > span { display: block; }
.sc-chrome { padding-right: 0.08em; background: linear-gradient(100deg, #8a96a5 0%, #f4f7fa 22%, #6c7786 38%, #eef2f5 52%, #8a96a5 70%, #ffffff 84%, #7c8796 100%) 0 0 / 220% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: sc-shine 6s ease-in-out 1.2s infinite; }
@keyframes sc-shine { 0%, 55% { background-position: 0 0; } 85%, 100% { background-position: 100% 0; } }
.sc-name-2 { margin-top: 0.5rem; font-size: 0.24em; font-weight: 600; letter-spacing: 0.55em; color: var(--lime); }
.sc-stage { margin: 0.5rem -1rem 0; }
.sc-hero-row { display: grid; gap: 1.5rem; }
.sc-statement { max-width: 34rem; font-size: 1.12rem; line-height: 1.55; color: var(--c-ink-2); }
.sc-cta { display: grid; gap: 0.75rem; margin-top: 1.25rem; }
@media (min-width: 640px) { .sc-cta { display: flex; flex-wrap: wrap; } }
@media (min-width: 900px) {
  .sc-hero { padding: 0 2rem 4.5rem; }
  .sc-stage { margin: -3.5rem 0 0 18%; }
  .sc-hero-row { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: start; gap: 4rem; }
}

/* Машина и мойка */
.sc-wash { display: block; width: 100%; height: auto; overflow: hidden; }
.sc-floor { fill: var(--steel); }
.sc-dust-body { fill: #5a6068; }
.sc-dust-glass { fill: #3d434b; }
.sc-dirt { fill: #7b705f; opacity: 0.45; }
.sc-shoulder { fill: none; stroke: var(--chrome); stroke-width: 2; opacity: 0.55; }
.sc-headlight { fill: var(--lime); }
.sc-pillar { fill: #0b0d10; }
.sc-door { fill: none; stroke: #0b0d10; stroke-width: 1.5; }
.sc-handle { fill: var(--steel-2); }
.sc-tire { fill: #07090b; }
.sc-rim { fill: var(--steel); stroke: var(--steel-2); stroke-width: 2; }
.sc-spokes { fill: none; stroke: var(--steel-2); stroke-width: 4; stroke-linecap: round; }
.sc-hub { fill: var(--lime); }
.sc-reflection { opacity: 0.22; }
.sc-glint { animation: sc-glint 7s ease-in-out 3.6s infinite; }
@keyframes sc-glint { 0% { transform: skewX(-20deg) translateX(0); } 30%, 100% { transform: skewX(-20deg) translateX(900px); } }
.sc-arch-beam, .sc-arch-post { fill: var(--steel-2); stroke: var(--lime); stroke-width: 1.5; }
.sc-brush { fill: var(--lime); opacity: 0.85; }
.sc-drop { fill: #bfe3ff; transform-box: fill-box; animation: sc-drop 0.7s ease-in calc(var(--i) * 0.11s) 5 both; }
@keyframes sc-drop { from { transform: translateY(0); opacity: 1; } to { transform: translateY(150px); opacity: 0; } }

/* Очередь сейчас */
.sc-qnow { display: inline-flex; flex-wrap: wrap; align-items: center; gap: 0.35rem 0.6rem; padding: 0.6rem 0.9rem; border-radius: 0.5rem; background: var(--c-surface); box-shadow: inset 0 0 0 1px var(--c-line); font-size: 0.95rem; }
.sc-qnow > i { flex: none; width: 0.6rem; height: 0.6rem; border-radius: 50%; background: var(--c-ink-2); }
.sc-qnow[data-state='open'] > i { background: var(--lime); box-shadow: 0 0 0 0 rgba(198, 255, 61, 0.6); animation: sc-ping 1.8s ease-out infinite; }
@keyframes sc-ping { to { box-shadow: 0 0 0 10px rgba(198, 255, 61, 0); } }
.sc-qnow b { color: var(--lime); font-weight: 700; }
.sc-q-closed, .sc-qnow[data-state='closed'] .sc-q-open { display: none; }
.sc-qnow[data-state='closed'] .sc-q-closed { display: inline; }
.sc-q-demo { padding: 0 0.4rem; border: 1px dashed var(--c-ink-2); border-radius: 999px; font-size: 0.72rem; color: var(--c-ink-2); }

/* ---------- Секции ---------- */
.sc-sec { padding: 4.5rem 1rem 5rem; background: var(--c-bg); }
.sc-sec-2 { background: var(--c-bg-2); }
@media (min-width: 900px) { .sc-sec { padding: 7rem 2rem; } }

/* ---------- Калькулятор ---------- */
.sc-calc { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2rem; }
@media (min-width: 900px) { .sc-calc { grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); gap: 3rem; align-items: start; } .sc-result { position: sticky; top: 1.5rem; } }
.sc-pick { display: grid; gap: 2rem; }
.sc-classes { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.6rem; }
.sc-classes legend, .sc-svcs legend { margin-bottom: 0.75rem; }
.sc-class { display: grid; gap: 0.3rem; padding: 0.9rem 0.9rem 1rem; border-radius: 0.6rem; background: var(--c-surface); box-shadow: inset 0 0 0 1px var(--c-line); cursor: pointer; transition: box-shadow 0.2s ease, background-color 0.2s ease, transform 0.2s ease; }
.sc-class-ico { width: 4.6rem; height: auto; }
.sc-class-body { fill: var(--steel-2); transition: fill 0.25s ease; }
.sc-class-wheel { fill: #07090b; stroke: var(--steel-2); stroke-width: 1.5; }
.sc-class-name { font-weight: 600; font-size: 1.02rem; }
.sc-class small { font-size: 0.82rem; color: var(--c-ink-2); }
.sc-classes input:checked + .sc-class { box-shadow: inset 0 0 0 2px var(--lime); background: #1b2316; }
.sc-classes input:checked + .sc-class .sc-class-body { fill: var(--lime); }
.sc-classes input:checked + .sc-class .sc-class-ico { animation: sc-drive 0.5s var(--out); }
@keyframes sc-drive { from { transform: translateX(-12px); } }
.sc-svcs { display: grid; gap: 0.6rem; }
.sc-svc { position: relative; display: grid; grid-template-columns: 2.6rem minmax(0, 1fr) 1.6rem; grid-template-rows: auto auto; column-gap: 0.8rem; align-items: center; min-height: 4.2rem; padding: 0.75rem 0.9rem; border-radius: 0.6rem; background: var(--c-surface); box-shadow: inset 0 0 0 1px var(--c-line); cursor: pointer; transition: box-shadow 0.2s ease, background-color 0.2s ease, transform 0.2s ease; }
.sc-svc-ico { grid-row: span 2; width: 2.6rem; height: 2.6rem; padding: 0.55rem; border-radius: 0.5rem; background: var(--steel); color: var(--c-ink); }
.sc-svc-name { font-weight: 600; }
.sc-svc small { grid-column: 2; font-size: 0.85rem; color: var(--c-ink-2); }
.sc-check { grid-column: 3; grid-row: 1 / span 2; width: 1.4rem; height: 1.4rem; border-radius: 0.3rem; box-shadow: inset 0 0 0 2px var(--steel-2); }
.sc-svcs input:checked + .sc-svc { box-shadow: inset 0 0 0 2px var(--lime); }
.sc-svcs input:checked + .sc-svc .sc-svc-ico { background: var(--lime); color: var(--c-accent-ink); }
.sc-svcs input:checked + .sc-svc .sc-check { background: var(--lime) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230c0f13' stroke-width='3.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12.5l4.5 4.5L19 7.5'/%3E%3C/svg%3E") center / 80% no-repeat; box-shadow: none; animation: sc-tick 0.3s var(--out); }
@keyframes sc-tick { from { transform: scale(0.5); } }
.sc-classes input:focus-visible + .sc-class, .sc-svcs input:focus-visible + .sc-svc { outline: 2px solid var(--lime); outline-offset: 3px; }
.sc-classes label:active .sc-class, .sc-svcs label:active .sc-svc { transform: scale(0.98); }
@media (hover: hover) { .sc-classes label:hover .sc-class, .sc-svcs label:hover .sc-svc { box-shadow: inset 0 0 0 1px var(--lime); } }

.sc-result { display: grid; gap: 1rem; padding: 1.4rem 1.2rem 1.5rem; border-radius: 0.9rem; background: linear-gradient(160deg, #1a212b, #10141a); box-shadow: inset 0 0 0 1px var(--c-line), 0 30px 60px -30px rgba(0, 0, 0, 0.8); }
.sc-price { font-family: var(--f-display); font-style: italic; font-weight: 800; font-size: clamp(2.6rem, 12vw, 3.8rem); line-height: 1; color: var(--lime); }
.sc-time { font-size: 1.1rem; }
.sc-time b { font-family: var(--f-display); font-style: italic; font-size: 1.5rem; }
.sc-timeline { display: flex; gap: 3px; height: 0.7rem; border-radius: 0.35rem; overflow: hidden; background: var(--steel); }
.sc-timeline i { display: block; min-width: 6px; transform-origin: left; animation: sc-seg 0.45s var(--out) both; animation-delay: calc(var(--i) * 0.08s); }
.sc-timeline i[data-svc='wash'] { background: #8fd3ff; }
.sc-timeline i[data-svc='interior'] { background: var(--lime); }
.sc-timeline i[data-svc='engine'] { background: #e9eef3; }
.sc-timeline i[data-svc='polish'] { background: var(--lime-2); }
@keyframes sc-seg { from { transform: scaleX(0); } }
.sc-ready { font-size: 1.05rem; font-weight: 600; }
.sc-calc[data-empty='true'] .sc-ready { color: var(--c-ink-2); }
.sc-slots-box { display: grid; gap: 0.6rem; padding-top: 1rem; border-top: 1px solid var(--c-line); }
.sc-slots { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.5rem; }
.sc-slot { display: grid; gap: 0.1rem; padding: 0.6rem 0.75rem; border-radius: 0.5rem; box-shadow: inset 0 0 0 1px var(--steel-2); cursor: pointer; animation: sc-in 0.35s var(--out) both; animation-delay: calc(var(--i) * 0.05s); transition: background-color 0.2s ease, box-shadow 0.2s ease; }
@keyframes sc-in { from { opacity: 0; transform: translateY(6px); } }
.sc-slot-day { font-size: 0.82rem; color: var(--c-ink-2); }
.sc-slot-time { font-family: var(--f-display); font-style: italic; font-weight: 700; font-size: 1.3rem; }
.sc-slot:has(input:checked) { background: var(--lime); box-shadow: none; color: var(--c-accent-ink); }
.sc-slot:has(input:checked) .sc-slot-day { color: var(--c-accent-ink); }
.sc-slot:has(input:focus-visible) { outline: 2px solid var(--lime); outline-offset: 2px; }
@media (hover: hover) { .sc-slot:hover { box-shadow: inset 0 0 0 1px var(--lime); } }
.sc-cta-book[aria-disabled='true'] { background: var(--steel); color: var(--c-ink); }

/* ---------- Загрузка по часам ---------- */
.sc-q { display: grid; gap: 1.5rem; }
.sc-qnow-big { justify-self: start; font-size: 1.05rem; }
.sc-chart { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); gap: 4px; align-items: end; height: 12rem; padding-bottom: 1.6rem; }
.sc-bar { position: relative; display: flex; flex-direction: column; justify-content: flex-end; height: 100%; }
.sc-bar i { display: block; height: calc(var(--l) * 100%); min-height: 6%; border-radius: 0.3rem 0.3rem 0 0; background: var(--steel-2); transform-origin: bottom; }
.sc-bar b { position: absolute; left: 50%; bottom: -1.5rem; transform: translateX(-50%); font-size: 0.72rem; font-weight: 600; color: var(--c-ink-2); }
.sc-bar-quiet i { background: transparent; box-shadow: inset 0 0 0 1.5px var(--lime); }
.sc-bar[data-now] i { background: var(--lime); animation: sc-now 1.6s ease-in-out infinite alternate; }
.sc-bar[data-now] b { color: var(--lime); }
@keyframes sc-now { to { filter: brightness(1.25); } }
.sc-quiet { font-size: 1.1rem; }
.sc-quiet .sc-label { margin-right: 0.5rem; }
@supports (animation-timeline: view()) {
  .sc-bar i { animation: sc-grow linear both; animation-timeline: view(); animation-range: entry 0% entry 70%; }
  .sc-bar[data-now] i { animation: sc-now 1.6s ease-in-out infinite alternate; }
}
@keyframes sc-grow { from { transform: scaleY(0.05); } }

/* ---------- Запись и адрес ---------- */
.sc-booking { display: grid; gap: 2rem; }
@media (min-width: 900px) { .sc-booking { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 4rem; align-items: start; } }
.sc-lounge { display: flex; align-items: center; gap: 0.8rem; padding: 1rem 1.1rem; border-radius: 0.6rem; background: var(--c-surface); color: var(--c-ink); font-weight: 600; }
.sc-lounge svg { color: var(--lime); flex: none; }
.sc-form { padding: 1.4rem 1.15rem 1.6rem; border-radius: 0.9rem; background: var(--c-surface); box-shadow: inset 0 0 0 1px var(--c-line); }
@media (min-width: 900px) { .sc-form { padding: 2.2rem; } }
.sc-where { display: grid; gap: 2.5rem; }
@media (min-width: 900px) { .sc-where { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 4rem; align-items: end; } }
.sc-street { margin-top: 0.5rem; font-family: var(--f-display); font-style: italic; font-weight: 800; font-size: clamp(2.2rem, 10vw, 4.4rem); line-height: 1; text-transform: uppercase; }
.sc-facts > div { display: grid; gap: 0.4rem; padding: 1.1rem 0; border-top: 1px solid var(--c-line); }
.sc-facts dd { font-size: 1.08rem; }
.sc-tel { display: inline-flex; align-items: center; min-height: 2.75rem; font-family: var(--f-display); font-style: italic; font-weight: 700; font-size: clamp(1.6rem, 7vw, 2.2rem); color: var(--c-ink); text-decoration: none; transition: color 0.2s ease; }
.sc-link { display: inline-flex; align-items: center; min-height: 2.75rem; color: var(--lime); font-weight: 600; text-decoration: underline; text-underline-offset: 4px; }
@media (hover: hover) { .concept .sc-tel:hover { color: var(--lime); } }
.concept[data-direction='showroom-chrome'] .sticky-bar { background: rgba(12, 15, 19, 0.92); backdrop-filter: blur(8px); }

/* ---------- OG ---------- */
.sc-og { padding: 0; }
.sc-og .sc-chrome { animation: none; }
.sc-og-t { font-size: 30px; line-height: 1.35; color: var(--c-ink); }

@media (prefers-reduced-motion: reduce) {
  .sc-chrome, .sc-glint, .sc-drop, .sc-qnow[data-state='open'] > i, .sc-classes input:checked + .sc-class .sc-class-ico,
  .sc-svcs input:checked + .sc-svc .sc-check, .sc-timeline i, .sc-slot, .sc-bar i, .sc-bar[data-now] i { animation: none; }
  .sc-dusty, .sc-arch { display: none; }
  .sc-gloss { clip-path: none; }
  .sc-class, .sc-svc, .sc-slot { transition: none; }
}
`

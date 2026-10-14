/**
 * iron-grid: графит, белый, сигнальный красный; одна гарнитура Roboto Flex — от сверхузкой до широкой.
 * Buka Fit: «BUKA FIT» сжимается как пружина (ось ширины), клубы — своя линия метро: нажатая станция загорается,
 * поезд едет к ней; абонементы — «блины» штанги.
 */
export const css = /* css */ `
.concept[data-direction='iron-grid'] {
  --c-bg: #121315;
  --c-bg-2: #1a1c1f;
  --c-surface: #202327;
  --c-ink: #f2f3f5;
  --c-ink-2: #a7adb5;
  --c-accent: #e0221b;
  --c-accent-ink: #ffffff;
  --c-line: #30343a;
  --c-focus: #ff5a52;
  --c-field: #1a1c1f;
  --red: #e0221b;
  --red-hi: #ff5a52;
  --f-display: var(--font-roboto-flex), system-ui, sans-serif;
  --f-body: var(--font-roboto-flex), system-ui, sans-serif;
  --radius-btn: 0.3rem;
  --radius-chip: 0.3rem;
  --radius-field: 0.3rem;
  --snap: cubic-bezier(0.2, 0.9, 0.1, 1);
  color-scheme: dark;
}
[data-direction='iron-grid'] .btn { font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; font-variation-settings: 'wdth' 90; }
[data-direction='iron-grid'] input:checked + .chip { background: var(--red); border-color: var(--red); color: #fff; }
.ig-wrap { max-width: 72rem; margin: 0 auto; }
.ig-h2 { font-family: var(--f-display); font-weight: 900; font-variation-settings: 'wdth' 35; font-size: clamp(3rem, 15vw, 6.4rem); line-height: 0.92; text-transform: uppercase; letter-spacing: -0.01em; }
.ig-lead { max-width: 36rem; font-size: 1.08rem; line-height: 1.55; color: var(--c-ink-2); }
.ig-label { font-size: 0.76rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--c-ink-2); }
.ig-small { font-size: 0.9rem; color: var(--c-ink-2); }

/* ---------- Первый экран ---------- */
.ig-hero { position: relative; padding: 0 1rem 3rem; overflow: hidden; background-color: var(--c-bg); background-image: linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px); background-size: 2.5rem 2.5rem; }
.ig-top { max-width: 72rem; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; min-height: 3.25rem; font-size: 0.85rem; color: var(--c-ink-2); }
.ig-lang a { padding: 0 0.9rem; border-radius: 0.3rem; box-shadow: inset 0 0 0 1px var(--c-line); text-decoration: none; font-weight: 700; color: var(--c-ink); }
.ig-hero-in { max-width: 72rem; margin: 0 auto; padding-top: 1.25rem; }
.ig-kicker { font-size: 0.82rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--red-hi); }
.ig-name { margin-top: 0.3rem; font-family: var(--f-display); font-weight: 900; font-variation-settings: 'wdth' 25; font-size: clamp(5.5rem, 33vw, 16rem); line-height: 0.8; text-transform: uppercase; letter-spacing: -0.01em; animation: ig-squeeze 1.3s var(--snap) 0.1s both; }
.ig-name > span { display: block; }
.ig-name-2 { color: var(--red); }
@keyframes ig-squeeze { from { font-variation-settings: 'wdth' 151; font-weight: 200; } }
.ig-statement { max-width: 32rem; margin-top: 1.5rem; font-size: 1.12rem; line-height: 1.55; color: var(--c-ink-2); }
.ig-cta { display: grid; gap: 0.75rem; margin-top: 1.5rem; }
@media (min-width: 640px) { .ig-cta { display: flex; flex-wrap: wrap; } }
@media (min-width: 900px) { .ig-hero { padding: 0 2rem 5rem; } .ig-name > span { display: inline; } .ig-name-2 { margin-left: 0.15em; } }

/* Мини-линия */
.ig-mini { --n: 4; position: relative; display: grid; grid-template-columns: repeat(var(--n), minmax(0, 1fr)); margin-top: 1.5rem; padding-top: 1.1rem; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--c-ink-2); }
.ig-mini-track { position: absolute; top: 0.45rem; left: calc(50% / var(--n)); right: calc(50% / var(--n)); height: 4px; border-radius: 2px; background: var(--red); transform-origin: left; animation: ig-draw 0.9s var(--snap) 0.9s both; }
@keyframes ig-draw { from { transform: scaleX(0); } }
.ig-mini-train { position: absolute; top: -4px; left: 0; width: 1.6rem; height: 12px; border-radius: 6px; background: #fff; box-shadow: 0 0 12px rgba(255, 90, 82, 0.9); animation: ig-run 5s ease-in-out 2s infinite alternate; }
@keyframes ig-run { to { left: calc(100% - 1.6rem); } }
.ig-mini-st { position: relative; display: grid; justify-items: center; gap: 0.35rem; text-align: center; }
.ig-mini-st b { position: absolute; top: -0.95rem; width: 0.9rem; height: 0.9rem; border-radius: 50%; background: var(--c-bg); box-shadow: inset 0 0 0 3px #fff; animation: ig-pop 0.4s var(--snap) both; animation-delay: calc(1.2s + var(--i) * 0.12s); }
@keyframes ig-pop { from { transform: scale(0); } }

/* ---------- Секции ---------- */
.ig-sec { padding: 4.5rem 1rem 5rem; background: var(--c-bg); }
.ig-sec-2 { background: var(--c-bg-2); }
@media (min-width: 900px) { .ig-sec { padding: 7rem 2rem; } }

/* ---------- Линия клубов ---------- */
.ig-pick { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2.5rem; }
@media (min-width: 900px) { .ig-pick { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 3.5rem; align-items: start; } }
.ig-line { --n: 4; min-width: 0; }
.ig-line legend { margin-bottom: 1rem; }
.ig-stations { position: relative; display: grid; grid-template-rows: repeat(var(--n), minmax(5.5rem, auto)); }
/* трек — от центра первой станции до центра последней; поезд едет по нему на --pos (0…1) */
.ig-track { position: absolute; left: 0.95rem; top: calc(50% / var(--n)); bottom: calc(50% / var(--n)); width: 6px; margin-left: -3px; border-radius: 3px; background: var(--c-line); }
.ig-train { position: absolute; left: -5px; top: calc(var(--pos) * 100% - 1.1rem); width: 16px; height: 2.2rem; border-radius: 8px; background: var(--red); box-shadow: 0 0 18px rgba(255, 90, 82, 0.8); transition: top 0.7s var(--snap); }
.ig-station { position: relative; display: grid; grid-template-columns: 2rem minmax(0, 1fr); column-gap: 1rem; align-content: center; cursor: pointer; padding: 0.5rem 0; }
.ig-dot { grid-row: span 2; align-self: center; z-index: 1; position: relative; width: 1.9rem; height: 1.9rem; border-radius: 50%; background: var(--c-bg); box-shadow: inset 0 0 0 4px var(--c-ink-2); transition: box-shadow 0.3s ease, transform 0.3s var(--snap); }
.ig-st-name { font-weight: 900; font-variation-settings: 'wdth' 40; font-size: clamp(1.9rem, 8vw, 2.6rem); line-height: 1; text-transform: uppercase; color: var(--c-ink-2); transition: color 0.3s ease; }
.ig-st-addr { font-size: 0.9rem; color: var(--c-ink-2); }
.ig-station input:checked ~ .ig-dot { box-shadow: inset 0 0 0 4px #fff, 0 0 0 6px rgba(224, 34, 27, 0.35), 0 0 22px rgba(255, 90, 82, 0.8); background: var(--red); transform: scale(1.12); }
.ig-station input:checked ~ .ig-st-name { color: #fff; }
.ig-station input:focus-visible ~ .ig-dot { outline: 2px solid var(--c-focus); outline-offset: 4px; }
@media (hover: hover) { .ig-station:hover .ig-st-name { color: var(--c-ink); } }
@media (min-width: 900px) { .ig-stations { grid-template-rows: repeat(var(--n), minmax(6.5rem, auto)); } }

.ig-side { display: grid; gap: 1.4rem; }
.ig-group { min-width: 0; }
.ig-group legend { margin-bottom: 0.6rem; }
.ig-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.ig-chips .chip { font-weight: 700; }
.ig-result { display: grid; gap: 1rem; padding: 1.4rem 1.2rem 1.5rem; border-radius: 0.6rem; background: var(--c-surface); box-shadow: inset 0 0 0 1px var(--c-line), inset 4px 0 0 var(--red); }
.ig-res-club { font-weight: 900; font-variation-settings: 'wdth' 40; font-size: clamp(2.4rem, 11vw, 3.4rem); line-height: 0.95; text-transform: uppercase; }
.ig-res-addr { margin-top: 0.3rem; color: var(--c-ink-2); }
.ig-res-more { display: none; gap: 1rem; }
[data-fit][data-ready='true'] .ig-res-more { display: grid; animation: ig-in 0.4s var(--snap) both; }
[data-fit][data-ready='true'] .ig-res-hint { display: none; }
@keyframes ig-in { from { opacity: 0; transform: translateY(8px); } }
.ig-res-row { display: grid; gap: 0.3rem; padding-top: 0.9rem; border-top: 1px solid var(--c-line); }
.ig-res-plan { font-size: 1.25rem; font-weight: 700; }
.ig-res-plan b { color: var(--red-hi); }
.ig-res-note, .ig-res-hint { color: var(--c-ink-2); }
.ig-res-next { font-size: 1.15rem; font-weight: 600; }

/* ---------- Абонементы: блины ---------- */
.ig-plans { display: grid; gap: 1rem; }
@media (min-width: 768px) { .ig-plans { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem; } }
.ig-plan { position: relative; display: grid; gap: 0.5rem; padding: 1.5rem 1.3rem 1.6rem; border-radius: 0.6rem; background: var(--c-surface); box-shadow: inset 0 0 0 1px var(--c-line); overflow: hidden; }
.ig-plate { position: absolute; right: -1.6rem; top: -1.6rem; width: calc(5rem + var(--i) * 1.6rem); aspect-ratio: 1; border-radius: 50%; background: #2a2e33; box-shadow: inset 0 0 0 0.6rem #33373d; }
.ig-plate i { position: absolute; inset: 36%; border-radius: 50%; background: var(--c-surface); }
.ig-plan-t { position: relative; font-weight: 900; font-variation-settings: 'wdth' 40; font-size: 1.9rem; line-height: 1; text-transform: uppercase; }
.ig-plan-p { position: relative; font-weight: 900; font-variation-settings: 'wdth' 60; font-size: 1.9rem; color: var(--red-hi); }
.ig-plan-n { position: relative; color: var(--c-ink-2); }
@supports (animation-timeline: view()) {
  .ig-plate { animation: ig-spin linear both; animation-timeline: view(); animation-range: entry 0% cover 60%; }
}
@keyframes ig-spin { from { transform: rotate(-120deg) translateX(30%); } }

/* ---------- Запись и клубы ---------- */
.ig-booking { display: grid; gap: 1rem; }
@media (min-width: 900px) { .ig-booking { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 4rem; align-items: start; } }
.ig-form { padding: 1.4rem 1.15rem 1.6rem; border-radius: 0.6rem; background: var(--c-surface); box-shadow: inset 0 0 0 1px var(--c-line); }
@media (min-width: 900px) { .ig-form { padding: 2.2rem; } }
.ig-clubs { display: grid; gap: 0; border-top: 2px solid var(--c-ink); }
@media (min-width: 768px) { .ig-clubs { grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 3rem; } }
.ig-clubs li { display: grid; gap: 0.4rem; padding: 1.4rem 0; border-bottom: 1px solid var(--c-line); }
.ig-clubs-n { font-weight: 800; color: var(--red-hi); }
.ig-clubs-t { font-weight: 900; font-variation-settings: 'wdth' 40; font-size: clamp(2rem, 9vw, 2.8rem); line-height: 1; text-transform: uppercase; }
.ig-link { display: inline-flex; align-items: center; gap: 0.4rem; min-height: 2.75rem; color: var(--c-ink); font-weight: 600; text-decoration: underline; text-underline-offset: 4px; }
.ig-contacts { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem 1.5rem; margin-top: 2rem; }
.ig-tel { display: inline-flex; align-items: center; min-height: 2.75rem; font-weight: 900; font-variation-settings: 'wdth' 50; font-size: clamp(1.6rem, 7vw, 2.2rem); color: var(--c-ink); text-decoration: none; transition: color 0.2s ease; }
@media (hover: hover) { .concept .ig-tel:hover, .concept .ig-link:hover { color: var(--red-hi); } }

/* ---------- OG ---------- */
.ig-og { padding: 0; }
.ig-og .ig-name, .ig-og .ig-mini-track, .ig-og .ig-mini-train, .ig-og .ig-mini-st b { animation: none; }
.ig-og .ig-name > span { display: inline; }
.ig-og .ig-mini { font-size: 18px; max-width: 760px; }

@media (prefers-reduced-motion: reduce) {
  .ig-name, .ig-mini-track, .ig-mini-train, .ig-mini-st b, .ig-plate, [data-fit][data-ready='true'] .ig-res-more { animation: none; }
  .ig-train, .ig-dot, .ig-st-name { transition: none; }
}
`

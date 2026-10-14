/**
 * ustara: барбершоп — опасная бритва, острые засечки, бордо барбер-шеста.
 * Playfair Display (контрастные волосяные засечки — как лезвие) + Inter. Углы прямые.
 * Ustara: название «разрезано» росчерком лезвия, бритва раскрывается, по стали бежит блик, полосы шеста бегут внизу.
 */
const OX = '#8e1b1f'
const BONE = '#f1ede4'
const INK = '#141211'

export const css = /* css */ `
.concept[data-direction='ustara'] {
  --c-bg: ${BONE};
  --c-bg-2: #e7e1d5;
  --c-surface: #fbf9f4;
  --c-ink: ${INK};
  --c-ink-2: #575049;
  --c-accent: ${OX};
  --c-accent-ink: #fbf9f4;
  --c-line: #d3cbbd;
  --c-focus: ${OX};
  --c-field: #fbf9f4;
  --ox: ${OX};
  --ox-hi: #e0605a;
  --bone: ${BONE};
  --ink: ${INK};
  --f-display: var(--font-playfair), Georgia, serif;
  --f-body: var(--font-inter), system-ui, sans-serif;
  --radius-btn: 0;
  --radius-chip: 0;
  --radius-field: 0;
}
.us-red {
  --c-bg: ${OX};
  --c-ink: #fbf6ee;
  --c-ink-2: #f1d6cf;
  --c-line: rgba(251, 246, 238, 0.4);
  --c-accent: #fbf6ee;
  --c-accent-ink: ${OX};
  --c-focus: #fbf6ee;
  background: var(--c-bg);
  color: var(--c-ink);
  color-scheme: dark;
}
.us-ink {
  --c-bg: ${INK};
  --c-bg-2: #1e1b19;
  --c-ink: ${BONE};
  --c-ink-2: #b9b2a6;
  --c-line: #34302b;
  --c-focus: var(--ox-hi);
  color-scheme: dark;
}
[data-direction='ustara'] .btn { font-weight: 600; letter-spacing: 0.01em; }
.us-red .btn-ghost { box-shadow: inset 0 0 0 1.5px rgba(251, 246, 238, 0.65); }
.us-wrap { max-width: 72rem; margin: 0 auto; }
.us-h2 { font-family: var(--f-display); font-weight: 700; font-size: clamp(2.5rem, 10.5vw, 4.8rem); line-height: 0.98; letter-spacing: -0.015em; text-wrap: balance; }
.us-lead { max-width: 36rem; font-size: 1.08rem; line-height: 1.6; color: var(--c-ink-2); }
.us-eyebrow { margin-bottom: 0.9rem; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--c-accent); }
.us-ink .us-eyebrow, .us-red-t { color: var(--ox-hi); }
.us-label { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: var(--c-ink-2); }
.us-small { font-size: 0.88rem; color: var(--c-ink-2); }

/* ---------- Первый экран ---------- */
.us-hero { position: relative; overflow: hidden; }
.us-top { max-width: 72rem; margin: 0 auto; padding: 0 1rem; display: flex; align-items: center; justify-content: space-between; min-height: 3.25rem; font-size: 0.88rem; color: var(--c-ink-2); }
.us-lang a { padding: 0 0.9rem; box-shadow: inset 0 0 0 1.5px var(--c-line); text-decoration: none; font-weight: 600; color: var(--c-ink); }
.us-hero-in { max-width: 72rem; margin: 0 auto; padding: 2rem 1rem 3rem; display: grid; grid-template-columns: minmax(0, 1fr); }
.us-kicker { font-size: 0.8rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--c-ink-2); }
.us-h1 { margin-top: 0.6rem; font-family: var(--f-display); font-weight: 800; font-size: clamp(4.4rem, 22.5vw, 14rem); line-height: 0.84; letter-spacing: -0.025em; text-transform: uppercase; }
.us-word { position: relative; display: inline-grid; }
.us-sl { grid-area: 1 / 1; }
.us-sl-a { clip-path: polygon(-5% -5%, 105% -5%, 105% 46%, -5% 60%); animation: us-a 0.7s cubic-bezier(0.2, 0.9, 0.2, 1) 1.55s both; }
.us-sl-b { clip-path: polygon(-5% 60%, 105% 46%, 105% 105%, -5% 105%); animation: us-b 0.7s cubic-bezier(0.2, 0.9, 0.2, 1) 1.55s both; }
@keyframes us-a { to { transform: translate(-0.035em, -0.012em); } }
@keyframes us-b { to { transform: translate(0.035em, 0.012em); } }
.us-cut { position: absolute; left: -3%; right: -3%; top: 53%; height: 3px; background: #fbf6ee; transform-origin: 0 50%; transform: rotate(-2.4deg) scaleX(0); animation: us-cut 0.45s cubic-bezier(0.7, 0, 0.3, 1) 1.15s forwards, us-cut-off 0.35s ease 1.75s forwards; }
@keyframes us-cut { to { transform: rotate(-2.4deg) scaleX(1); } }
@keyframes us-cut-off { to { opacity: 0; } }
.us-hero-razor { width: 100%; max-width: 38rem; margin-top: 1.4rem; }
.us-statement { max-width: 32rem; margin-top: 1.4rem; font-size: 1.15rem; line-height: 1.55; }
.us-cta { display: grid; gap: 0.7rem; margin-top: 1.6rem; }
.us-hours { margin-top: 1rem; font-size: 0.9rem; color: var(--c-ink-2); }
@media (min-width: 640px) { .us-cta { display: flex; flex-wrap: wrap; } }
@media (min-width: 960px) {
  .us-top, .us-hero-in { padding-left: 2rem; padding-right: 2rem; }
  .us-hero-in { grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr); grid-template-areas: 'kicker kicker' 'word word' 'razor copy'; column-gap: 3rem; padding-top: 3rem; padding-bottom: 4rem; }
  .us-kicker { grid-area: kicker; }
  .us-h1 { grid-area: word; }
  .us-hero-razor { grid-area: razor; align-self: center; }
  .us-hero-copy { grid-area: copy; }
}

/* Бритва */
.us-razor { display: block; height: auto; overflow: visible; }
.us-shadow { fill: rgba(0, 0, 0, 0.28); filter: blur(5px); }
.us-handle { fill: ${INK}; }
.us-handle-hi { fill: none; stroke: rgba(255, 255, 255, 0.14); stroke-width: 3; stroke-linecap: round; }
.us-pin { fill: #c9a35b; stroke: #7a5d27; stroke-width: 1.2; }
.us-steel { stroke: #6f7275; stroke-width: 1; }
.us-spine { stroke: rgba(255, 255, 255, 0.75); stroke-width: 2; }
.us-edge { stroke: #fff; stroke-width: 1.6; }
.us-jimps { stroke: #6f7275; stroke-width: 1.6; }
.us-grind { fill: none; stroke: rgba(255, 255, 255, 0.55); stroke-width: 1.4; }
.us-gleam { fill: rgba(255, 255, 255, 0.8); animation: us-gleam 4.5s ease-in-out 2.2s infinite; }
@keyframes us-gleam { 0% { transform: translateX(380px) skewX(-24deg); } 45%, 100% { transform: translateX(1000px) skewX(-24deg); } }
.us-blade { transform-box: view-box; transform-origin: 330px 92px; animation: us-open 1.1s cubic-bezier(0.65, 0, 0.25, 1) 0.2s both; }
@keyframes us-open { from { transform: rotate(-176deg); } }
.us-still .us-blade, .us-still .us-gleam { animation: none; }

/* Лента барбер-шеста */
.us-pole { position: relative; height: 14px; overflow: hidden; }
.us-pole i { position: absolute; inset: 0 -68px 0 0; background: repeating-linear-gradient(-45deg, ${BONE} 0 14px, ${OX} 14px 24px, ${BONE} 24px 38px, ${INK} 38px 48px); animation: us-pole 1.8s linear infinite; }
@keyframes us-pole { to { transform: translateX(-67.88px); } }

/* ---------- Секции ---------- */
.us-sec { padding: 4.5rem 1rem 5rem; background: var(--c-bg); color: var(--c-ink); }
.us-sec-2 { background: var(--c-bg-2); }
@media (min-width: 960px) { .us-sec { padding: 7rem 2rem; } }

/* ---------- Запись: мастер → услуга → окно ---------- */
.us-booker { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2.4rem; }
@media (min-width: 960px) {
  .us-booker { grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr); grid-template-areas: 'masters ticket' 'services ticket'; column-gap: 3.5rem; row-gap: 2.4rem; align-items: start; }
  .us-masters { grid-area: masters; }
  .us-services { grid-area: services; }
  .us-ticket { grid-area: ticket; position: sticky; top: 1.5rem; }
}
.us-step { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 1rem; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; }
.us-step span { display: inline-grid; place-items: center; width: 1.75rem; height: 1.75rem; box-shadow: inset 0 0 0 1.5px currentColor; font-family: var(--f-display); font-size: 1rem; font-weight: 700; letter-spacing: 0; }
.us-masters, .us-services { min-width: 0; }
.us-masters-row { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.5rem; }
.us-master { display: block; cursor: pointer; }
.us-master-card { display: grid; align-content: start; gap: 0.2rem; height: 100%; padding: 0.85rem 0.7rem 0.9rem; background: var(--c-surface); box-shadow: inset 0 0 0 1px var(--c-line); transition: box-shadow 0.2s ease, transform 0.2s ease; }
.us-mono { display: grid; place-items: center; width: 2.7rem; height: 2.7rem; margin-bottom: 0.4rem; border-radius: 50%; background: var(--c-bg-2); font-family: var(--f-display); font-size: 1.5rem; font-weight: 700; transition: background-color 0.2s ease, color 0.2s ease; }
.us-master-name { font-weight: 700; font-size: 1rem; }
.us-master-role { font-size: 0.78rem; line-height: 1.3; color: var(--c-ink-2); }
.us-master-price { margin-top: 0.45rem; font-size: 0.74rem; line-height: 1.3; color: var(--c-ink-2); }
.us-master-price b { display: block; font-size: 0.9rem; color: var(--c-ink); white-space: nowrap; }
.us-master input:checked + .us-master-card { box-shadow: inset 0 0 0 2px var(--ox); }
.us-master input:checked + .us-master-card .us-mono { background: var(--ox); color: #fbf9f4; }
.us-master input:focus-visible + .us-master-card { outline: 2px solid var(--c-focus); outline-offset: 2px; }
@media (hover: hover) { .us-master:hover .us-master-card { transform: translateY(-2px); } }
.us-services > label:first-of-type { border-top: 2px solid var(--c-ink); }
.us-svc { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; padding: 1rem 0.15rem; border-bottom: 1px solid var(--c-line); cursor: pointer; transition: background-color 0.25s ease, color 0.25s ease, padding 0.25s ease; }
.us-svc-name { font-family: var(--f-display); font-size: 1.4rem; font-weight: 600; line-height: 1.15; }
.us-svc-name small { display: block; margin-top: 0.2rem; font-family: var(--f-body); font-size: 0.84rem; font-weight: 400; color: var(--c-ink-2); }
.us-svc-meta { display: grid; justify-items: end; gap: 0.1rem; font-size: 0.82rem; color: var(--c-ink-2); white-space: nowrap; }
.us-svc-meta b { font-size: 0.98rem; font-weight: 700; color: var(--c-ink); }
.us-svc:has(input:checked) { padding-left: 0.9rem; padding-right: 0.9rem; background: var(--ink); color: var(--bone); }
.us-svc:has(input:checked) small, .us-svc:has(input:checked) .us-svc-meta { color: #c9c1b4; }
.us-svc:has(input:checked) .us-svc-meta b { color: var(--bone); }
.us-svc:has(input:focus-visible) { outline: 2px solid var(--c-focus); outline-offset: 2px; }
@media (hover: hover) { .us-svc:hover { background: var(--c-bg-2); } .us-svc:has(input:checked):hover { background: var(--ink); } }
.us-ticket { padding: 1.4rem 1.2rem 1.6rem; background: var(--c-surface); box-shadow: inset 0 4px 0 var(--ox), inset 0 0 0 1.5px var(--c-ink); }
.us-empty { font-family: var(--f-display); font-size: 1.35rem; line-height: 1.3; color: var(--c-ink-2); }
.us-ticket-body { display: none; gap: 1rem; }
[data-booker]:not([data-state='empty']) .us-empty { display: none; }
[data-booker]:not([data-state='empty']) .us-ticket-body { display: grid; }
.us-ticket-title { font-family: var(--f-display); font-size: 2rem; font-weight: 700; line-height: 1.05; }
.us-stats { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; padding: 0.9rem 0; border-top: 1px solid var(--c-line); border-bottom: 1px solid var(--c-line); }
.us-stats dt { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: var(--c-ink-2); }
.us-stats dd { margin-top: 0.25rem; font-family: var(--f-display); font-size: 1.5rem; font-weight: 700; white-space: nowrap; }
.us-len { height: 5px; background: var(--c-bg-2); overflow: hidden; }
.us-len span { display: block; height: 100%; background: var(--ox); transform-origin: 0 50%; transform: scaleX(calc(min(var(--minutes, 0), 120) / 120)); transition: transform 0.6s cubic-bezier(0.3, 0.8, 0.2, 1); }
.us-slots { display: grid; grid-template-columns: repeat(auto-fill, minmax(5.3rem, 1fr)); gap: 0.4rem; }
.us-slot { display: grid; justify-items: center; gap: 0.05rem; padding: 0.5rem 0.3rem; box-shadow: inset 0 0 0 1px var(--c-line); cursor: pointer; animation: us-in 0.35s ease both; animation-delay: calc(var(--i) * 0.025s); transition: background-color 0.2s ease, color 0.2s ease; }
@keyframes us-in { from { transform: translateY(6px); } }
.us-slot-day { font-size: 0.72rem; color: var(--c-ink-2); }
.us-slot-time { font-size: 1.05rem; font-weight: 700; }
.us-slot:has(input:checked) { background: var(--ox); box-shadow: none; color: #fbf9f4; }
.us-slot:has(input:checked) .us-slot-day { color: #f1d6cf; }
.us-slot:has(input:focus-visible) { outline: 2px solid var(--c-focus); outline-offset: 2px; }
@media (hover: hover) { .us-slot:hover { box-shadow: inset 0 0 0 1.5px var(--c-ink); } }
.us-until { display: none; font-weight: 600; }
.us-until b { font-family: var(--f-display); font-size: 1.2rem; }
[data-booker][data-state='slot'] .us-until { display: block; }
.us-ticket a[aria-disabled='true'] { background: var(--c-bg-2); color: var(--c-ink); }

/* ---------- Ритуал бритья ---------- */
.us-ritual { display: grid; gap: 2rem; margin-top: 2.6rem; }
@media (min-width: 760px) { .us-ritual { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2.5rem; } }
@media (min-width: 1100px) { .us-ritual { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
.us-ritual li { display: grid; gap: 0.6rem; padding-top: 1.2rem; border-top: 1px solid var(--c-line); }
.us-ritual-n { font-family: var(--f-display); font-size: 3.4rem; font-weight: 700; line-height: 0.9; color: var(--ox-hi); }
.us-ritual-i { width: 3.6rem; height: 3.6rem; }
.us-ritual-i path { fill: none; stroke: var(--c-ink); stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
.us-ritual-t { font-family: var(--f-display); font-size: 1.6rem; font-weight: 600; line-height: 1.1; }
.us-ritual p { color: var(--c-ink-2); line-height: 1.55; }
@supports (animation-timeline: view()) {
  .us-ritual li { animation: us-rise linear both; animation-timeline: view(); animation-range: entry 0% entry 70%; }
}
@keyframes us-rise { from { transform: translateY(40px); } }

/* ---------- Заявка ---------- */
.us-booking { display: grid; gap: 2.5rem; }
@media (min-width: 960px) { .us-booking { grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr); gap: 4rem; align-items: start; } }
.us-form { padding: 1.4rem 1.15rem 1.6rem; background: var(--c-surface); box-shadow: inset 0 0 0 1.5px var(--c-ink), 8px 8px 0 var(--ox); }
@media (min-width: 960px) { .us-form { padding: 2.2rem; } }
.us-facts { margin-top: 2rem; }
.us-facts > div { display: grid; gap: 0.3rem; padding: 0.9rem 0; border-top: 1px solid var(--c-line); }
.us-facts dt { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: var(--c-ink-2); }
.us-facts dd { font-size: 1.05rem; }
.us-tel { display: inline-flex; align-items: center; min-height: 2.75rem; font-family: var(--f-display); font-size: clamp(1.6rem, 7vw, 2.1rem); font-weight: 700; color: var(--c-ink); text-decoration: none; transition: color 0.2s ease; }
@media (hover: hover) { .concept .us-tel:hover { color: var(--ox); } }
.concept[data-direction='ustara'] .sticky-bar { border-top: 2px solid var(--ink); }

/* ---------- OG ---------- */
.us-og .us-sl, .us-og .us-cut, .us-og .us-pole i { animation: none; }
.us-og .us-sl-a { transform: translate(-0.035em, -0.012em); }
.us-og .us-sl-b { transform: translate(0.035em, 0.012em); }
.us-og .us-cut { display: none; }

@media (prefers-reduced-motion: reduce) {
  .us-blade, .us-gleam, .us-pole i, .us-slot, .us-ritual li, .us-cut { animation: none; }
  .us-cut { display: none; }
  .us-sl-a { animation: none; transform: translate(-0.035em, -0.012em); }
  .us-sl-b { animation: none; transform: translate(0.035em, 0.012em); }
  .us-len span, .us-svc, .us-master-card { transition: none; }
}
`

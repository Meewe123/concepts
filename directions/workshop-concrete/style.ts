/**
 * workshop-concrete: бетон, оранжевый «safety», чёрный. Технический чертёж авто, размерные линии.
 * Brookland: машина рисуется линией в первом экране; в калькуляторе чертёж меняется под класс авто.
 */
const CONCRETE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' seed='4'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .06 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

export const css = /* css */ `
.concept[data-direction='workshop-concrete'] {
  --c-bg: #e3e1dc;
  --c-bg-2: #d6d3cc;
  --c-surface: #f1efea;
  --c-ink: #141516;
  --c-ink-2: #4c4d4f;
  --c-accent: #141516;
  --c-accent-ink: #f1efea;
  --c-line: rgba(20, 21, 22, 0.2);
  --c-focus: #e2560b;
  --c-field: #f1efea;
  --orange: #ff6a13;
  --orange-ink: #b34405;
  --wc-dark: #18191a;
  --wc-ink: #eeece7;
  --wc-ink-2: #a9a8a3;
  --f-display: var(--font-tektur), system-ui, sans-serif;
  --f-body: var(--font-source-code), ui-monospace, monospace;
  --radius-btn: 2px;
  --radius-chip: 2px;
  --radius-field: 2px;
  font-size: 0.95rem;
}
[data-direction='workshop-concrete'] .btn { font-family: var(--f-display); font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; }
[data-direction='workshop-concrete'] .btn:not(.btn-ghost) { background: var(--orange); color: var(--c-ink); }
@media (hover: hover) { .concept[data-direction='workshop-concrete'] .btn:not(.btn-ghost):hover { background: #ff8a45; } }
[data-direction='workshop-concrete'] input:checked + .chip { background: var(--c-ink); border-color: var(--c-ink); color: var(--orange); }
[data-direction='workshop-concrete'] .ex-tag { font-family: var(--f-body); }
.wc-wrap { max-width: 72rem; margin: 0 auto; }
.wc-mono { font-family: var(--f-body); }
.wc-orange { color: var(--orange); }
.wc-label { font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--c-ink-2); }
.wc-eyebrow { margin-bottom: 0.8rem; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--orange-ink); }
.wc-eyebrow::before { content: '// '; }
.wc-h2 { font-family: var(--f-display); font-weight: 800; font-size: clamp(2.1rem, 9.5vw, 4.4rem); line-height: 1; letter-spacing: -0.02em; text-transform: uppercase; }
.wc-small { font-size: 0.82rem; color: var(--c-ink-2); }
.wc-grid { background-color: var(--c-surface); background-image: linear-gradient(rgba(20, 21, 22, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 21, 22, 0.07) 1px, transparent 1px); background-size: 16px 16px; }

/* ---------- Чертёж ---------- */
.wc-car { display: block; width: 100%; height: auto; overflow: visible; }
.wc-line { fill: none; stroke: var(--c-ink); stroke-width: 2; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
.wc-thin { stroke-width: 1.2; }
.wc-ground { stroke: var(--c-ink); stroke-width: 1; stroke-dasharray: 6 4; }
.wc-dim { stroke: var(--orange-ink); stroke-width: 1; }
.wc-arrow { fill: var(--orange-ink); }
.wc-dim-t { font-family: var(--f-body); font-size: 11px; fill: var(--orange-ink); }
.wc-lead { fill: none; stroke: var(--c-ink-2); stroke-width: 0.8; }
.wc-call { font-family: var(--f-body); font-size: 10.5px; fill: var(--c-ink); text-transform: uppercase; letter-spacing: 0.06em; }
.wc-car:not(.wc-still) .wc-line { stroke-dasharray: 1; stroke-dashoffset: 1; animation: wc-draw 1.8s cubic-bezier(0.5, 0, 0.2, 1) 0.2s forwards; }
.wc-car:not(.wc-still) .wc-callouts { opacity: 0; animation: wc-fade 0.6s ease 1.8s forwards; }
@keyframes wc-draw { to { stroke-dashoffset: 0; } }
@keyframes wc-fade { to { opacity: 1; } }
.wc-sheet { position: relative; padding: 2.4rem 1.3rem 1.4rem; border: 1px solid var(--c-ink); }
.wc-sheet-tag { position: absolute; top: 0; left: 0; padding: 0.3rem 0.6rem; background: var(--c-ink); color: var(--orange); font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; }

/* ---------- Первый экран ---------- */
.wc-hero { position: relative; overflow: hidden; padding: 0 1rem 3.25rem; background: var(--wc-dark) ${CONCRETE}; color: var(--wc-ink); }
.wc-top { max-width: 72rem; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; min-height: 3rem; font-size: 0.8rem; color: var(--wc-ink-2); border-bottom: 1px solid rgba(238, 236, 231, 0.14); }
.wc-lang a { padding: 0 0.85rem; background: var(--orange); color: var(--c-ink); text-decoration: none; font-weight: 600; }
.wc-hero-grid { max-width: 72rem; margin: 0 auto; display: grid; gap: 1.5rem; padding-top: 1.75rem; }
.wc-name { margin-top: 0.4rem; font-family: var(--f-display); font-weight: 800; font-size: clamp(3rem, 15vw, 8rem); line-height: 0.9; letter-spacing: -0.02em; text-transform: uppercase; }
.wc-hours { display: inline-block; margin-top: 0.9rem; padding: 0.35rem 0.7rem; border: 1px solid var(--orange); color: var(--orange); font-family: var(--f-body); font-size: 0.85rem; letter-spacing: 0.06em; }
.wc-hero .wc-sheet { color: var(--c-ink); }
.wc-cta { display: grid; gap: 0.7rem; }
.wc-hero .btn-ghost { color: var(--wc-ink); box-shadow: inset 0 0 0 1px rgba(238, 236, 231, 0.45); }
@media (hover: hover) { .concept .wc-hero .btn-ghost:hover { background: rgba(238, 236, 231, 0.08); } }
.wc-hero :focus-visible, .wc-sec-dark :focus-visible { outline-color: var(--orange); }
.wc-hazard { height: 1.1rem; background: repeating-linear-gradient(-45deg, var(--orange) 0 14px, var(--c-ink) 14px 28px); position: absolute; left: 0; right: 0; bottom: 0; }
@media (min-width: 900px) {
  .wc-hero { padding: 0 2rem 5rem; }
  .wc-hero-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr); grid-template-areas: 'copy sheet' 'cta sheet'; align-items: end; column-gap: 3.5rem; padding-top: 4rem; }
  .wc-hero-grid > :first-child { grid-area: copy; }
  .wc-hero-grid > .wc-sheet { grid-area: sheet; }
  .wc-cta { grid-area: cta; display: flex; align-self: start; }
  .wc-cta .btn { white-space: nowrap; }
  .wc-name { font-size: clamp(3rem, 6.4vw, 6rem); }
}

/* ---------- Секции ---------- */
.wc-sec { padding: 4.5rem 1rem 5rem; background: var(--c-bg) ${CONCRETE}; }
.wc-sec-dark { background: var(--wc-dark) ${CONCRETE}; color: var(--wc-ink); }
.wc-sec-dark .wc-eyebrow { color: var(--orange); }
.wc-sec-dark .wc-label { color: var(--wc-ink-2); }
@media (min-width: 900px) { .wc-sec { padding: 7rem 2rem; } }

/* ---------- Калькулятор ---------- */
.wc-booker { display: grid; gap: 1.25rem; }
@media (min-width: 900px) { .wc-booker { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); grid-template-areas: 'classes ticket' 'sheet ticket' 'orders ticket'; column-gap: 3rem; align-items: start; } .wc-classes { grid-area: classes; } .wc-sheet-calc { grid-area: sheet; } .wc-orders { grid-area: orders; } .wc-ticket { grid-area: ticket; position: sticky; top: 1.5rem; } }
.wc-classes { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border: 1px solid var(--c-ink); }
.wc-classes legend { margin-bottom: 0.5rem; }
.wc-classes span { display: grid; place-items: center; min-height: 3rem; padding: 0 0.25rem; font-family: var(--f-display); font-size: 0.78rem; font-weight: 600; text-align: center; text-transform: uppercase; cursor: pointer; transition: background-color 0.2s ease, color 0.2s ease; }
.wc-classes label + label span { border-left: 1px solid var(--c-ink); }
.wc-classes input:checked + span { background: var(--c-ink); color: var(--orange); }
.wc-classes input:focus-visible + span { outline: 2px solid var(--c-focus); outline-offset: -4px; }
@media (hover: hover) { .wc-classes label:hover span { background: rgba(20, 21, 22, 0.08); } .wc-classes input:checked + span { background: var(--c-ink); } }
.wc-sheet-calc { padding-top: 1.6rem; }
.wc-booker .wc-car g[data-cls] { opacity: 0; transform: translateX(-10px); transition: opacity 0.35s ease, transform 0.35s ease; }
.wc-booker:has(input[name='bk-variant'][value='sedan']:checked) .wc-car g[data-cls='sedan'],
.wc-booker:has(input[name='bk-variant'][value='crossover']:checked) .wc-car g[data-cls='crossover'],
.wc-booker:has(input[name='bk-variant'][value='suv']:checked) .wc-car g[data-cls='suv'],
.wc-booker:has(input[name='bk-variant'][value='minivan']:checked) .wc-car g[data-cls='minivan'] { opacity: 1; transform: none; }
.wc-orders { display: grid; border-top: 2px solid var(--c-ink); }
.wc-order { display: grid; grid-template-columns: 3.4rem minmax(0, 1fr); column-gap: 0.6rem; padding: 0.85rem 0.6rem 0.85rem 0; border-bottom: 1px solid var(--c-line); cursor: pointer; transition: background-color 0.2s ease, box-shadow 0.2s ease; }
.wc-order-code { grid-row: span 2; padding-left: 0.6rem; font-family: var(--f-body); font-size: 0.78rem; color: var(--orange-ink); }
.wc-order-name { font-family: var(--f-display); font-size: 1.15rem; font-weight: 600; line-height: 1.15; }
.wc-order-meta { font-size: 0.8rem; color: var(--c-ink-2); }
@media (hover: hover) { .wc-order:hover { background: rgba(20, 21, 22, 0.05); } }
.wc-order:has(input:checked) { background: var(--c-ink); color: var(--wc-ink); box-shadow: inset 4px 0 0 var(--orange); }
.wc-order:has(input:checked) .wc-order-code { color: var(--orange); }
.wc-order:has(input:checked) .wc-order-meta { color: var(--wc-ink-2); }
.wc-order:has(input:focus-visible) { outline: 2px solid var(--c-focus); outline-offset: -2px; }

.wc-ticket { padding: 1.4rem 1.2rem; border: 2px solid var(--c-ink); background: var(--c-surface); box-shadow: 8px 8px 0 var(--c-ink); }
@media (min-width: 900px) { .wc-ticket { padding: 2rem; } }
.wc-empty { min-height: 8rem; display: grid; place-items: center; text-align: center; color: var(--c-ink-2); }
[data-booker]:not([data-state='empty']) .wc-empty { display: none; }
[data-booker][data-state='empty'] .wc-ticket-body { display: none; }
.wc-ticket-body { display: grid; gap: 1rem; animation: wc-in 0.25s ease both; }
@keyframes wc-in { from { opacity: 0; transform: translateY(6px); } }
.wc-ticket-title { font-family: var(--f-display); font-weight: 800; font-size: clamp(1.6rem, 7vw, 2.4rem); line-height: 1.02; text-transform: uppercase; }
.wc-stats { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid var(--c-ink); }
.wc-stats div { display: grid; gap: 0.3rem; padding: 0.8rem; }
.wc-stats div + div { border-left: 1px solid var(--c-ink); }
.wc-stats dd { font-family: var(--f-display); font-size: 1.35rem; font-weight: 700; line-height: 1.1; }
.wc-gauge { height: 0.6rem; background: repeating-linear-gradient(90deg, rgba(20, 21, 22, 0.15) 0 1px, transparent 1px calc(100% / 16)); border: 1px solid var(--c-ink); }
.wc-gauge span { display: block; height: 100%; width: calc(min(var(--minutes, 0), 480) / 480 * 100%); background: var(--orange); transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
.wc-slots { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
.wc-slot { display: grid; gap: 0.1rem; padding: 0.6rem 0.75rem; border: 1px solid var(--c-ink); cursor: pointer; animation: wc-in 0.25s ease both; animation-delay: calc(var(--i) * 0.05s); transition: background-color 0.2s ease, color 0.2s ease; }
.wc-slot-day { font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--c-ink-2); }
.wc-slot-time { font-family: var(--f-display); font-size: 1.5rem; font-weight: 700; }
@media (hover: hover) { .wc-slot:hover { background: rgba(255, 106, 19, 0.12); } }
.wc-slot:has(input:checked) { background: var(--c-ink); color: var(--orange); }
.wc-slot:has(input:checked) .wc-slot-day { color: var(--wc-ink-2); }
.wc-slot:has(input:focus-visible) { outline: 2px solid var(--c-focus); outline-offset: 2px; }
.wc-until { display: none; font-family: var(--f-body); font-size: 0.95rem; }
.wc-until b { font-family: var(--f-display); font-size: 1.2rem; }
[data-booker][data-state='slot'] .wc-until { display: block; }
.wc-ticket [aria-disabled='true'] { opacity: 0.55; }

/* ---------- Пока ждёте ---------- */
.wc-lounge { display: grid; gap: 1px; margin-top: 2rem; background: rgba(238, 236, 231, 0.18); border: 1px solid rgba(238, 236, 231, 0.18); }
@media (min-width: 768px) { .wc-lounge { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
.wc-lounge li { display: grid; gap: 0.6rem; padding: 1.4rem 1.2rem; background: var(--wc-dark); }
.wc-lounge-t { font-family: var(--f-display); font-size: 1.4rem; font-weight: 700; text-transform: uppercase; }
.wc-small-d { font-size: 0.78rem; color: var(--wc-ink-2); }

/* ---------- Адрес ---------- */
.wc-spec { display: grid; border-top: 2px solid var(--c-ink); }
.wc-spec > div { display: grid; gap: 0.3rem; padding: 1rem 0; border-bottom: 1px solid var(--c-line); }
@media (min-width: 768px) { .wc-spec > div { grid-template-columns: 12rem 1fr; } }
.wc-spec dd { font-family: var(--f-display); font-size: 1.2rem; font-weight: 600; }

/* ---------- Запись ---------- */
.wc-booking { display: grid; gap: 2rem; }
@media (min-width: 900px) { .wc-booking { grid-template-columns: 1fr 1.3fr; gap: 4rem; align-items: start; } }
.wc-form { padding: 1.4rem 1.2rem; background: var(--c-surface); color: var(--c-ink); border: 2px solid var(--orange); }
@media (min-width: 900px) { .wc-form { padding: 2.2rem; } }
.wc-form :focus-visible { outline-color: var(--c-focus); }

/* ---------- OG ---------- */
.wc-og .wc-sheet { color: var(--c-ink); }

@media (prefers-reduced-motion: reduce) {
  .wc-car:not(.wc-still) .wc-line { animation: none; stroke-dashoffset: 0; }
  .wc-car:not(.wc-still) .wc-callouts { animation: none; opacity: 1; }
  .wc-ticket-body, .wc-slot { animation: none; }
}
`

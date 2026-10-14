/**
 * Страница студии: бумага, чернила и один акцент — синий. Один шрифт — Onest (он уже в корневом layout).
 * Движение: заголовок поднимается по словам, неделя заполняется день за днём, скриншоты концептов
 * едут внутри телефонов при прокрутке (только transform).
 */
export const css = /* css */ `
.st {
  --paper: #f4f2ec;
  --paper-2: #eae7de;
  --ink: #14130f;
  --ink-2: #57544c;
  --line: #d9d5ca;
  --blue: #2f5bff;
  --blue-2: #1f46e0;
  --blue-hi: #93a9ff;
  min-height: 100dvh;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-onest), system-ui, sans-serif;
  font-variant-numeric: tabular-nums;
  overflow-x: clip;
  -webkit-tap-highlight-color: transparent;
}
.st :focus-visible { outline: 2px solid var(--blue); outline-offset: 3px; }
.st-wrap { max-width: 72rem; margin: 0 auto; }
.st-blue { color: var(--blue); font-weight: inherit; }

/* ---------- Шапка и первый экран ---------- */
.st-hero { padding: 0 1rem 3.5rem; background: radial-gradient(80% 60% at 85% 0%, #ffffff, transparent 70%); }
.st-top { max-width: 72rem; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 1rem; min-height: 3.75rem; }
.st-logo { display: inline-flex; align-items: center; gap: 0.6rem; min-height: 2.75rem; font-size: 1.12rem; font-weight: 750; letter-spacing: -0.02em; color: inherit; text-decoration: none; }
.st-mark { width: 1.7rem; height: 1.7rem; flex: none; }
.st-mark path { fill: none; stroke: var(--ink); stroke-width: 4.6; stroke-linecap: round; }
.st-mark .st-mark-on { stroke: var(--blue); }
.st-hero .st-mark path { animation: st-seg 0.35s ease both; animation-delay: calc(var(--i) * 0.07s); }
@keyframes st-seg { from { stroke: var(--line); } }
.st-lang { display: inline-flex; align-items: center; min-height: 2.75rem; padding: 0 1.1rem; border-radius: 999px; box-shadow: inset 0 0 0 1px var(--line); background: #fff; color: inherit; font-size: 0.92rem; font-weight: 650; text-decoration: none; transition: box-shadow 0.2s ease; }
.st-hero-grid { max-width: 72rem; margin: 0 auto; display: grid; grid-template-columns: minmax(0, 1fr); gap: 2.5rem; padding-top: 2.2rem; }
.st-tag { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.88rem; font-weight: 600; color: var(--ink-2); }
.st-tag::before { content: ''; width: 0.5rem; height: 0.5rem; border-radius: 50%; background: var(--blue); }
.st-h1 { margin-top: 1rem; font-size: clamp(2.3rem, 10.2vw, 5.1rem); font-weight: 760; line-height: 1.02; letter-spacing: -0.038em; text-wrap: balance; }
.st-h1 span { display: inline-block; animation: st-word 0.75s cubic-bezier(0.2, 0.8, 0.2, 1) both; animation-delay: calc(var(--i) * 45ms); }
@keyframes st-word { from { transform: translateY(0.4em); } }
.st-lead { margin-top: 1.25rem; max-width: 34rem; font-size: 1.15rem; line-height: 1.55; color: var(--ink-2); }
.st-cta { display: grid; gap: 0.7rem; margin-top: 1.9rem; }
@media (min-width: 640px) { .st-cta { display: flex; flex-wrap: wrap; } }
.st-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.55rem; min-height: 3.4rem; padding: 0 1.6rem; border-radius: 999px; background: var(--blue); color: #fff; font-size: 1.05rem; font-weight: 650; text-decoration: none; box-shadow: 0 12px 26px -14px rgba(47, 91, 255, 0.8); transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease; }
.st-btn:active { transform: scale(0.98); }
.st-btn-ghost { background: transparent; color: var(--ink); box-shadow: inset 0 0 0 1.5px var(--ink); }
.st-btn-off { background: var(--paper-2); color: var(--ink-2); box-shadow: inset 0 0 0 1px var(--line); cursor: default; }
.st-btn-big { min-height: 3.9rem; padding: 0 2.1rem; font-size: 1.15rem; }
@media (hover: hover) {
  .st-btn:not(.st-btn-ghost):not(.st-btn-off):hover { background: var(--blue-2); }
  .st-btn-ghost:hover { background: rgba(20, 19, 15, 0.06); }
  .st-lang:hover { box-shadow: inset 0 0 0 1px var(--ink); }
}

/* Неделя до запуска */
.st-week { align-self: start; padding: 1.4rem 1.2rem 1.5rem; border-radius: 1.6rem; background: #fff; box-shadow: inset 0 0 0 1px var(--line), 0 30px 60px -40px rgba(20, 19, 15, 0.4); }
.st-week-label { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-2); }
.st-days { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 0.35rem; margin-top: 1rem; }
.st-days li { position: relative; display: grid; justify-items: center; gap: 0.4rem; }
.st-days span { font-size: 0.74rem; font-weight: 650; text-transform: uppercase; color: var(--ink-2); }
.st-days i { position: relative; display: grid; place-items: center; width: 100%; height: 2.7rem; border-radius: 0.7rem; background: var(--paper-2); overflow: hidden; }
.st-days em { position: relative; z-index: 1; font-style: normal; font-size: 0.98rem; font-weight: 720; }
.st-days li:last-child em { display: none; }
.st-days i::after { content: ''; position: absolute; inset: 0; background: #d9e1ff; transform-origin: 0 50%; transform: scaleX(0); animation: st-fill 0.42s ease-out forwards; animation-delay: calc(0.6s + var(--i) * 0.26s); }
.st-days li:last-child i::after { background: var(--blue); }
@keyframes st-fill { to { transform: scaleX(1); } }
.st-done { position: absolute; bottom: 0.6rem; left: 50%; display: grid; place-items: center; width: 1.5rem; height: 1.5rem; margin-left: -0.75rem; border-radius: 50%; background: #fff; color: var(--blue); transform: scale(0); animation: st-pop 0.45s cubic-bezier(0.3, 1.6, 0.5, 1) forwards; animation-delay: 2.5s; }
@keyframes st-pop { to { transform: scale(1); } }
.st-plan { display: grid; gap: 0.75rem; margin-top: 1.3rem; padding-top: 1.1rem; border-top: 1px solid var(--line); }
.st-plan li { display: grid; grid-template-columns: 5rem minmax(0, 1fr); gap: 0.6rem; font-size: 0.96rem; line-height: 1.4; animation: st-slide 0.5s ease both; animation-delay: calc(0.7s + var(--i) * 0.45s); }
.st-plan b { font-weight: 700; }
.st-plan li:last-child b { color: var(--blue); }
.st-plan span { color: var(--ink-2); }
@keyframes st-slide { from { transform: translateX(-10px); } }
@media (min-width: 960px) {
  .st-hero { padding: 0 2rem 5.5rem; }
  .st-hero-grid { grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.7fr); gap: 4rem; align-items: end; padding-top: 4.5rem; }
}

/* ---------- Секции ---------- */
.st-sec { padding: 4.5rem 1rem; }
.st-sec-2 { background: var(--paper-2); }
@media (min-width: 960px) { .st-sec { padding: 6.5rem 2rem; } }
.st-h2 { max-width: 22ch; font-size: clamp(2rem, 8.2vw, 3.6rem); font-weight: 760; line-height: 1.05; letter-spacing: -0.034em; text-wrap: balance; }
.st-h3 { font-size: 1.3rem; font-weight: 720; line-height: 1.2; letter-spacing: -0.015em; }
.st-p { max-width: 40rem; font-size: 1.05rem; line-height: 1.6; color: var(--ink-2); }

/* Почему пришла ссылка */
.st-why-grid { display: grid; gap: 2.5rem; }
@media (min-width: 960px) { .st-why-grid { grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.7fr); gap: 5rem; align-items: end; } }
.st-facts li { display: grid; gap: 0.25rem; padding: 1.1rem 0; border-top: 1px solid var(--line); }
.st-facts b { font-size: clamp(2.1rem, 9vw, 2.9rem); font-weight: 780; line-height: 1; letter-spacing: -0.04em; }
.st-facts li:first-child b { color: var(--blue); }
.st-facts span { color: var(--ink-2); }

/* Концепты */
.st-dark { background: var(--ink); color: var(--paper); }
.st-dark .st-p { color: #bdb8ac; }
.st-lead-2 { margin-top: 1rem; }
.st-cards { display: grid; grid-auto-flow: column; grid-auto-columns: 78%; gap: 1rem; margin: 2.5rem -1rem 0; padding: 0 1rem 1rem; overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding: 0 1rem; scrollbar-width: none; }
.st-cards::-webkit-scrollbar { display: none; }
@media (min-width: 820px) { .st-cards { grid-auto-flow: row; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.75rem; margin: 3rem 0 0; padding: 0; overflow: visible; } }
.st-card { position: relative; display: grid; align-content: start; gap: 1.3rem; scroll-snap-align: start; }
.st-phone { position: relative; display: block; aspect-ratio: 390 / 760; padding: 0.55rem; border-radius: 2.4rem; background: linear-gradient(150deg, #3b3934, #0d0c0b 60%); box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.85), inset 0 0 0 1px rgba(255, 255, 255, 0.14); transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1); }
.st-phone::before { content: ''; position: absolute; z-index: 2; top: 1rem; left: 50%; width: 26%; height: 1.05rem; margin-left: -13%; border-radius: 999px; background: #0d0c0b; }
.st-screen { display: block; height: 100%; border-radius: 1.9rem; overflow: hidden; background: #26241f; }
.st-screen img { display: block; width: 100%; height: auto; }
@supports (animation-timeline: view()) {
  .st-screen img { animation: st-pan linear both; animation-timeline: view(); animation-range: cover 15% cover 85%; }
}
@keyframes st-pan { to { transform: translateY(-38%); } }
.st-card-meta { display: flex; align-items: center; gap: 0.6rem; font-size: 0.92rem; color: #bdb8ac; }
.st-badge { padding: 0.12rem 0.6rem; border: 1px dashed currentColor; border-radius: 999px; font-size: 0.75rem; font-weight: 650; color: var(--paper); }
.st-card-t { margin-top: 0.45rem; font-size: 1.85rem; font-weight: 760; letter-spacing: -0.03em; line-height: 1.1; }
.st-card-p { margin-top: 0.45rem; line-height: 1.5; color: #cfcabe; }
.st-open { display: inline-flex; align-items: center; gap: 0.4rem; min-height: 2.75rem; margin-top: 0.6rem; font-weight: 650; color: var(--blue-hi); text-decoration: none; }
.st-open::after { content: ''; position: absolute; inset: 0; border-radius: 2.4rem; }
.st-open svg { transition: transform 0.2s ease; }
@media (hover: hover) {
  .st-card:hover .st-phone { transform: translateY(-6px) rotate(-1.2deg); }
  .st-card:hover .st-open { text-decoration: underline; text-underline-offset: 4px; }
  .st-card:hover .st-open svg { transform: translateX(4px); }
}

/* Как я работаю */
.st-how { display: grid; gap: 2.2rem; margin-top: 2.6rem; }
@media (min-width: 820px) { .st-how { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2rem; } }
.st-how li { display: grid; align-content: start; gap: 0.6rem; padding-top: 1.2rem; border-top: 2px solid var(--ink); }
.st-how-n { font-size: 4.6rem; font-weight: 800; line-height: 0.85; letter-spacing: -0.06em; color: var(--blue); }
@supports (animation-timeline: view()) {
  .st-how li { animation: st-up linear both; animation-timeline: view(); animation-range: entry 0% entry 60%; }
}
@keyframes st-up { from { transform: translateY(30px); } }

/* Цены */
.st-prices { display: grid; gap: 1rem; margin-top: 2.5rem; }
@media (min-width: 820px) { .st-prices { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
.st-prices li { display: grid; align-content: start; gap: 0.8rem; padding: 1.5rem 1.3rem 1.6rem; border-radius: 1.4rem; background: #fff; box-shadow: inset 0 0 0 1px var(--line); }
.st-price-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
.st-ex { flex: none; padding: 0.1rem 0.55rem; border: 1px dashed var(--ink-2); border-radius: 999px; font-size: 0.74rem; font-weight: 600; color: var(--ink-2); }
.st-price { font-size: clamp(1.9rem, 8vw, 2.4rem); font-weight: 780; line-height: 1.05; letter-spacing: -0.035em; }
.st-price small { font-size: 0.48em; font-weight: 650; letter-spacing: 0; color: var(--ink-2); }

/* Вопросы */
.st-faq-grid { display: grid; gap: 2rem; }
@media (min-width: 960px) { .st-faq-grid { grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: 4rem; } }
.st-faq details { border-top: 1px solid var(--line); }
.st-faq details:last-child { border-bottom: 1px solid var(--line); }
.st-faq summary { display: flex; align-items: center; justify-content: space-between; gap: 1rem; min-height: 3.6rem; padding: 0.9rem 0; font-size: 1.15rem; font-weight: 650; list-style: none; cursor: pointer; }
.st-faq summary::-webkit-details-marker { display: none; }
.st-faq details p { padding-bottom: 1.3rem; }
.st-plus { position: relative; flex: none; width: 1.1rem; height: 1.1rem; transition: transform 0.25s ease; }
.st-plus::before, .st-plus::after { content: ''; position: absolute; left: 0; right: 0; top: 50%; height: 2px; margin-top: -1px; background: var(--blue); }
.st-plus::after { transform: rotate(90deg); }
.st-faq details[open] .st-plus { transform: rotate(45deg); }

/* Контакт */
.st-contact { background: var(--blue); color: #fff; text-align: center; }
.st-contact .st-wrap { display: grid; justify-items: center; gap: 1.2rem; }
.st-contact .st-h2 { max-width: none; }
.st-contact .st-p { color: rgba(255, 255, 255, 0.92); }
.st-contact-mark { width: 4rem; height: 4rem; }
.st-contact .st-mark path { stroke: rgba(255, 255, 255, 0.45); }
.st-contact .st-mark .st-mark-on { stroke: #fff; }
.st-contact .st-btn { margin-top: 0.6rem; background: #fff; color: var(--ink); box-shadow: 0 18px 34px -18px rgba(0, 0, 0, 0.55); }
.st-contact .st-btn-off { background: transparent; color: #fff; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5); }
@media (hover: hover) { .st-contact .st-btn:not(.st-btn-off):hover { background: #e9edff; } }
.st-handle { font-weight: 650; color: rgba(255, 255, 255, 0.92); }

/* Подвал */
.st-foot { padding: 2.5rem 1rem 3rem; font-size: 0.92rem; color: var(--ink-2); }
.st-foot-note { margin-top: 0.5rem; max-width: 42rem; }
@media (min-width: 960px) { .st-foot { padding: 3rem 2rem; } }

@media (prefers-reduced-motion: reduce) {
  .st-h1 span, .st-hero .st-mark path, .st-plan li, .st-screen img, .st-how li { animation: none; }
  .st-days i::after { animation: none; transform: scaleX(1); }
  .st-done { animation: none; transform: scale(1); }
  .st-phone, .st-btn, .st-plus { transition: none; }
}
`

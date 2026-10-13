/**
 * tashkent-mosaic: смальта чиланзарских фасадов — кобальт, шафран, штукатурка. Узкие прописные Oswald, текст Inter Tight.
 * Chilonzor Dental Servis: панно с ромбическим медальоном раскрывается из центра, вывеска клиники выезжает поверх;
 * подбор — плитки смальты, рамки — шахматка из плиток, «Сейчас открыто» — по времени Ташкента.
 */
export const css = /* css */ `
.concept[data-direction='tashkent-mosaic'] {
  --c-bg: #f3eee4;
  --c-bg-2: #e8e0d0;
  --c-surface: #fbf8f2;
  --c-ink: #0f1d3a;
  --c-ink-2: #4a5470;
  --c-accent: #1f4fa0;
  --c-accent-ink: #fbf8f2;
  --c-line: #cfc5b3;
  --c-focus: #1f4fa0;
  --c-field: #fbf8f2;
  --cobalt: #1f4fa0;
  --deep: #13306b;
  --sky: #8fb0e3;
  --saffron: #f2a93b;
  --saffron-2: #f7c46f;
  --plaster: #f3eee4;
  --grout: #ddd4c3;
  --on-blue-2: #c9d7f0;
  --f-display: var(--font-oswald), 'Arial Narrow', sans-serif;
  --f-body: var(--font-inter-tight), system-ui, sans-serif;
  --radius-btn: 3px;
  --radius-chip: 3px;
  --radius-field: 3px;
  --spring: cubic-bezier(0.3, 1.5, 0.5, 1);
  --out: cubic-bezier(0.2, 0.8, 0.2, 1);
}
[data-direction='tashkent-mosaic'] .btn { font-weight: 600; }
[data-direction='tashkent-mosaic'] input:checked + .chip { background: var(--cobalt); border-color: var(--cobalt); color: var(--c-surface); }
.tm-wrap { max-width: 72rem; margin: 0 auto; }
.tm-h2 { font-family: var(--f-display); font-size: clamp(2.4rem, 11vw, 4.6rem); line-height: 1; font-weight: 600; text-transform: uppercase; letter-spacing: -0.005em; color: var(--cobalt); }
.tm-lead { max-width: 36rem; font-size: 1.08rem; line-height: 1.55; color: var(--c-ink-2); }
.tm-label { font-size: 0.74rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--c-ink-2); }
.tm-small { font-size: 0.9rem; line-height: 1.5; color: var(--c-ink-2); }

/* Цвета смальты: в SVG — заливка, в span — фон */
.tm-t0 { fill: var(--cobalt); background: var(--cobalt); }
.tm-t1 { fill: var(--deep); background: var(--deep); }
.tm-t2 { fill: var(--sky); background: var(--sky); }
.tm-t3 { fill: var(--saffron); background: var(--saffron); }
.tm-t4 { fill: var(--c-surface); background: var(--c-surface); }

/* ---------- Панно ---------- */
.tm-mosaic { display: block; width: 100%; height: auto; }
.tm-grout { fill: var(--grout); }
.tm-a0 { --a: -2.5deg; } .tm-a1 { --a: -1deg; } .tm-a2 { --a: 1deg; } .tm-a3 { --a: 2.5deg; }
.tm-g0 { --gd: 2s; } .tm-g1 { --gd: 3.6s; } .tm-g2 { --gd: 5.2s; } .tm-g3 { --gd: 6.8s; }
.tm-mosaic rect[class*='tm-a'] { transform-box: fill-box; transform-origin: center; transform: rotate(var(--a)); animation: tm-tile 0.6s var(--spring) var(--d, 0s) both; }
.tm-mosaic rect.tm-glint { animation: tm-tile 0.6s var(--spring) var(--d, 0s) both, tm-glint 7s ease-in-out var(--gd) infinite; }
@keyframes tm-tile { from { transform: rotate(calc(var(--a) + 90deg)) scale(0); } }
@keyframes tm-glint { 0%, 86%, 100% { opacity: 1; } 92% { opacity: 0.45; } }
.tm-still rect[class*='tm-a'], .tm-still rect.tm-glint { animation: none; }

/* ---------- Первый экран ---------- */
.tm-hero { background: var(--plaster); padding: 0 1rem 2.75rem; overflow: hidden; }
.tm-top { max-width: 72rem; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; min-height: 3.25rem; font-size: 0.85rem; color: var(--c-ink-2); }
.tm-lang a { padding: 0 0.9rem; border-radius: 3px; background: var(--c-surface); box-shadow: inset 0 0 0 1px var(--c-line); text-decoration: none; font-weight: 600; color: var(--c-ink); }
/* minmax(0, 1fr): пока Oswald не загрузился, широкий запасной шрифт не должен раздвигать колонку (и панно по высоте) */
.tm-hero-grid { max-width: 72rem; margin: 0 auto; display: grid; grid-template-columns: minmax(0, 1fr); }
.tm-panel { margin: 0 -1rem; background: var(--grout); line-height: 0; }
.tm-hero-copy { position: relative; }
.tm-sign { position: relative; z-index: 1; margin: -3.4rem 1.25rem 0 0; padding: 1rem 1.1rem 1.15rem; background: var(--plaster); border-top: 6px solid var(--saffron); animation: tm-sign 0.8s var(--out) 0.55s both; }
@keyframes tm-sign { from { transform: translateY(1.75rem); } }
.tm-kicker { font-size: 0.76rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--c-ink-2); }
.tm-name { margin-top: 0.5rem; font-family: var(--f-display); font-weight: 700; font-size: clamp(3.2rem, 16vw, 7rem); line-height: 0.9; text-transform: uppercase; letter-spacing: 0; color: var(--cobalt); }
.tm-name > span { display: block; }
.tm-name-2 { margin-top: 0.4rem; font-weight: 400; font-size: 0.36em; line-height: 1; letter-spacing: 0.3em; color: var(--c-ink); }
.tm-statement { margin-top: 1.4rem; max-width: 32rem; font-size: 1.14rem; line-height: 1.5; }
.tm-statement b { font-weight: 600; background: linear-gradient(transparent 60%, var(--saffron-2) 60%); }
.tm-now { display: inline-flex; align-items: center; gap: 0.65rem; margin-top: 1.25rem; padding: 0.55rem 0.95rem; border: 1px solid var(--c-line); background: var(--c-surface); font-size: 0.95rem; font-weight: 600; line-height: 1.3; }
/* островок меняет текст на 1–2 строки — место под две строки заранее, чтобы кнопки не прыгали */
.tm-now span { display: flex; align-items: center; min-height: 2.6em; }
@media (min-width: 640px) { .tm-now span { min-height: 0; } }
.tm-now i { flex: none; width: 0.62rem; height: 0.62rem; background: var(--c-ink-2); }
.tm-now[data-state='open'] i { background: var(--saffron); animation: tm-pulse 1.8s ease-in-out infinite; }
@keyframes tm-pulse { 50% { transform: rotate(45deg) scale(1.35); } }
.tm-cta { display: grid; gap: 0.75rem; margin-top: 1.5rem; }
.tm-btn-saffron { background: var(--saffron); color: var(--c-ink); }
@media (hover: hover) {
  .concept .tm-btn-saffron:hover { background: var(--saffron-2); }
}
@media (min-width: 640px) { .tm-cta { display: flex; flex-wrap: wrap; } }
@media (min-width: 900px) {
  .tm-hero { padding: 0 2rem 5rem; }
  .tm-hero-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1.08fr); grid-template-areas: 'copy panel'; column-gap: 0; align-items: center; padding-top: 2.5rem; }
  .tm-panel { grid-area: panel; margin: 0; box-shadow: 0 0 0 10px var(--c-surface), 0 0 0 11px var(--c-line); }
  .tm-hero-copy { grid-area: copy; padding-right: 3rem; }
  .tm-sign { margin: 0 -6rem 0 0; padding: 1.4rem 1.6rem 1.5rem; box-shadow: 0 18px 30px -22px rgba(15, 29, 58, 0.45); }
}

/* ---------- Секции ---------- */
.tm-sec { padding: 4.5rem 1rem 5rem; background: var(--plaster); }
.tm-sec-2 { background: var(--c-bg-2); }
/* Синие секции начинаются полосой плиток, как цоколь панно */
.tm-sec-cobalt, .tm-sec-deep {
  padding-top: calc(4.5rem + 18px); color: var(--plaster);
  background:
    repeating-linear-gradient(90deg, var(--saffron) 0 16px, var(--plaster) 16px 18px, var(--deep) 18px 34px, var(--plaster) 34px 36px) 0 0 / 100% 18px no-repeat,
    var(--bg-blue);
}
.tm-sec-cobalt { --bg-blue: var(--cobalt); }
.tm-sec-deep { --bg-blue: var(--deep); }
.tm-sec-cobalt .tm-h2, .tm-sec-deep .tm-h2 { color: var(--plaster); }
.tm-sec-cobalt .tm-label, .tm-sec-deep .tm-lead { color: var(--on-blue-2); }
.tm-sec-cobalt :focus-visible, .tm-sec-deep :focus-visible { outline-color: var(--saffron); }
@media (min-width: 900px) {
  .tm-sec { padding: 7rem 2rem; }
  .tm-sec-cobalt, .tm-sec-deep { padding-top: calc(7rem + 18px); }
}

/* ---------- «Что вас беспокоит?» ---------- */
.tm-pick { display: grid; gap: 2rem; }
@media (min-width: 900px) { .tm-pick { grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); gap: 3rem; align-items: start; } }
.tm-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; padding: 6px; background: var(--grout); }
.tm-opt { position: relative; flex-direction: column; align-items: flex-start; justify-content: space-between; gap: 1rem; min-height: 9rem; padding: 0.9rem 0.9rem 1rem; background: var(--c-surface); color: var(--c-ink); transition: transform 0.25s var(--out), background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease; }
.tm-mini { position: absolute; top: 0.85rem; right: 0.85rem; display: grid; grid-template-columns: repeat(3, 0.6rem); gap: 2px; }
.tm-mini i { display: block; width: 0.6rem; height: 0.6rem; }
.tm-mini .tm-t4 { box-shadow: inset 0 0 0 1px var(--c-line); }
.tm-opt-n { font-family: var(--f-display); font-size: 1.05rem; font-weight: 500; color: var(--cobalt); }
.tm-opt-label { font-size: 1.12rem; line-height: 1.2; font-weight: 600; }
@media (hover: hover) {
  .tm-grid .dc-opt:hover .tm-opt { transform: translateY(-3px); box-shadow: 0 3px 0 var(--deep); }
}
.tm-grid .dc-opt input:checked + .tm-opt { background: var(--cobalt); color: var(--c-surface); }
.tm-grid .dc-opt input:checked + .tm-opt .tm-opt-n { color: var(--c-surface); }
.tm-grid .dc-opt input:checked + .tm-opt .tm-mini i { animation: tm-flip 0.5s var(--out) both; animation-delay: calc(var(--k) * 0.04s); }
.tm-grid .dc-opt input:checked + .tm-opt .tm-mini .tm-t4 { box-shadow: none; }
@keyframes tm-flip { from { transform: rotateY(180deg) scale(0.6); } }
@media (min-width: 900px) { .tm-opt { min-height: 10.5rem; padding: 1.1rem; } .tm-opt-label { font-size: 1.25rem; } }

.tm-results { position: relative; }
@media (min-width: 900px) { .tm-results { position: sticky; top: 1.5rem; } }
.tm-empty { display: grid; place-items: center; gap: 1.1rem; min-height: 15rem; padding: 1.75rem 1.5rem; border: 2px dashed var(--grout); font-size: 1.02rem; line-height: 1.5; color: var(--c-ink-2); text-align: center; }
.tm-empty-art { max-width: 15rem; }

/* Табличка в рамке-шахматке из плиток */
.tm-plaque { padding: 10px; background: repeating-conic-gradient(var(--cobalt) 0 25%, var(--deep) 0 50%) 0 0 / 20px 20px; }
.tm-plaque-in { display: grid; gap: 1.1rem; padding: 1.4rem 1.2rem 1.6rem; background: var(--c-surface); }
.dc .tm-plaque { animation: tm-plaque 0.45s var(--spring) both; }
@keyframes tm-plaque { from { transform: scale(0.95) rotate(-1.2deg); } }
@media (min-width: 900px) { .tm-plaque-in { padding: 2rem 2rem 2.2rem; } }
.tm-plaque-title { font-family: var(--f-display); font-size: 1.3rem; font-weight: 500; line-height: 1.15; text-transform: uppercase; letter-spacing: 0.02em; }
.tm-plaque-title span { color: var(--cobalt); }
.tm-price { font-family: var(--f-display); font-weight: 600; font-size: clamp(2.3rem, 10.5vw, 3.4rem); line-height: 1; color: var(--cobalt); }
.tm-note { padding: 0.75rem 0.9rem; border-left: 4px solid var(--saffron); background: var(--plaster); font-size: 0.97rem; line-height: 1.45; }
.tm-facts-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; padding-top: 0.9rem; border-top: 1px solid var(--c-line); }
.tm-facts-2 dt { font-size: 0.74rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--c-ink-2); }
.tm-facts-2 dd { margin-top: 0.3rem; font-size: 1.05rem; font-weight: 600; }
.tm-calm { max-width: 28ch; font-size: 1.3rem; line-height: 1.45; }
.tm-plan { display: grid; gap: 0.8rem; padding: 1rem; background: var(--plaster); }
.tm-plan .chip { background: var(--c-surface); }
.tm-mtiles { display: flex; flex-wrap: wrap; gap: 3px; margin-bottom: 0.5rem; }
.tm-mtiles i { display: block; width: 0.9rem; height: 0.9rem; animation: tm-drop 0.4s var(--spring) both; animation-delay: calc(var(--i) * 0.04s); }
@keyframes tm-drop { from { transform: translateY(-10px) rotate(40deg) scale(0.4); } }
.tm-monthly { font-family: var(--f-display); font-weight: 600; font-size: 1.9rem; line-height: 1.1; color: var(--cobalt); }
.tm-monthly .dc-per { margin-top: 0.15rem; font-family: var(--f-body); font-size: 0.9rem; font-weight: 400; color: var(--c-ink-2); }

/* ---------- Адрес и часы ---------- */
.tm-where { display: grid; gap: 2.5rem; }
@media (min-width: 900px) { .tm-where { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 4rem; align-items: end; } }
.tm-street { margin-top: 0.6rem; font-family: var(--f-display); font-weight: 700; font-size: clamp(3.4rem, 17vw, 7.5rem); line-height: 0.9; text-transform: uppercase; }
.tm-where-p { margin-top: 0.9rem; font-size: 1.05rem; line-height: 1.5; color: var(--on-blue-2); }
.tm-where-facts > div { display: grid; gap: 0.6rem; padding: 1.25rem 0; border-top: 1px solid rgba(243, 238, 228, 0.28); }
.tm-now-dark { margin-top: 0; border-color: transparent; background: var(--deep); color: var(--plaster); }
.tm-now-dark i { background: var(--on-blue-2); }
.tm-tel { display: inline-flex; align-items: center; min-height: 2.9rem; font-family: var(--f-display); font-weight: 600; font-size: clamp(2rem, 9vw, 2.8rem); color: var(--plaster); text-decoration: none; transition: color 0.2s ease; }
@media (hover: hover) { .concept .tm-tel:hover { color: var(--saffron-2); } }

/* ---------- Всё в одном здании ---------- */
.tm-services { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; padding: 6px; background: var(--grout); }
@media (min-width: 768px) { .tm-services { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
.tm-svc { display: flex; flex-direction: column; justify-content: space-between; gap: 1.5rem; min-height: 9.5rem; padding: 1rem; }
.tm-svc-n { font-family: var(--f-display); font-size: 1rem; font-weight: 500; }
.tm-svc-t { font-family: var(--f-display); font-weight: 600; font-size: clamp(1.25rem, 5.6vw, 1.9rem); line-height: 1.05; text-transform: uppercase; overflow-wrap: anywhere; }
.tm-svc-0, .tm-svc-5 { background: var(--cobalt); color: var(--c-surface); }
.tm-svc-1 { background: var(--saffron); color: var(--c-ink); }
.tm-svc-2 { background: var(--c-surface); color: var(--cobalt); }
.tm-svc-3 { background: var(--deep); color: var(--c-surface); }
.tm-svc-4 { background: var(--sky); color: var(--c-ink); }
@media (min-width: 900px) { .tm-svc { min-height: 12rem; padding: 1.4rem; } }

/* ---------- Первый визит ---------- */
.tm-steps { display: grid; gap: 1.75rem; }
.tm-steps li { display: grid; grid-template-columns: 3.4rem minmax(0, 1fr); column-gap: 1rem; }
.tm-step-n { grid-row: span 2; display: grid; place-items: center; width: 3.4rem; height: 3.4rem; font-family: var(--f-display); font-size: 1.9rem; font-weight: 600; color: var(--c-surface); }
.tm-step-n.tm-t3 { color: var(--c-ink); }
.tm-step-t { font-family: var(--f-display); font-size: 1.4rem; line-height: 1.15; font-weight: 500; text-transform: uppercase; }
.tm-step-p { margin-top: 0.35rem; line-height: 1.5; color: var(--c-ink-2); }
@media (min-width: 900px) {
  .tm-steps { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 2rem; }
  .tm-steps li { grid-template-columns: 1fr; }
  .tm-step-n { grid-row: auto; margin-bottom: 1.25rem; width: 4.5rem; height: 4.5rem; font-size: 2.6rem; }
}

/* ---------- Запись ---------- */
.tm-booking { display: grid; gap: 2rem; }
@media (min-width: 900px) { .tm-booking { grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr); gap: 4rem; align-items: start; } }
.tm-form { background: repeating-conic-gradient(var(--saffron) 0 25%, var(--plaster) 0 50%) 0 0 / 20px 20px; color: var(--c-ink); }
.tm-form .tm-plaque-in { padding: 1.4rem 1.15rem 1.6rem; }
@media (min-width: 900px) { .tm-form .tm-plaque-in { padding: 2.2rem; } }
.tm-sec-deep .tm-form :focus-visible { outline-color: var(--cobalt); }

/* Прокрутка: плитки «садятся» в раствор, заголовки выезжают — только transform */
@supports (animation-timeline: view()) {
  .tm-h2, .tm-street { animation: tm-slide linear both; animation-timeline: view(); animation-range: entry 0% entry 75%; }
  .tm-svc, .tm-step-n { animation: tm-set linear both; animation-timeline: view(); animation-range: entry 10% entry 80%; }
}
@keyframes tm-slide { from { transform: translateX(-0.2em); } }
@keyframes tm-set { from { transform: rotate(-7deg) scale(0.86); } }

/* ---------- OG ---------- */
.tm-og { padding: 0; }
.tm-og .tm-sign { animation: none; }
.tm-og-art { width: 100%; height: 100%; }
.tm-og-addr { margin-top: 28px; font-size: 24px; font-weight: 600; color: var(--c-ink-2); }

@media (prefers-reduced-motion: reduce) {
  .tm-mosaic rect[class*='tm-a'], .tm-mosaic rect.tm-glint, .tm-sign, .tm-now[data-state='open'] i, .dc .tm-plaque,
  .tm-grid .dc-opt input:checked + .tm-opt .tm-mini i, .tm-mtiles i, .tm-h2, .tm-street, .tm-svc, .tm-step-n { animation: none; }
  .tm-opt { transition: none; }
}
`

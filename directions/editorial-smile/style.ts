/**
 * editorial-smile: кремовая бумага, чернильный, коралл. Журнальная вёрстка на Spectral.
 * Nasimov: ряд капсул стоит вкривь и выстраивается в линию, по нему проходит дуга с замками — «Ровно.» без фото зубов.
 */
export const css = /* css */ `
.concept[data-direction='editorial-smile'] {
  --c-bg: #f7f0e6;
  --c-bg-2: #efe5d6;
  --c-surface: #fffaf3;
  --c-ink: #1d1a2b;
  --c-ink-2: #57526a;
  --c-accent: #1d1a2b;
  --c-accent-ink: #f7f0e6;
  --c-line: #d6c8b4;
  --c-focus: #1d1a2b;
  --c-field: #fffaf3;
  --cream: #f7f0e6;
  --cream-2: #a9a2b8;
  --paper: #fffaf3;
  --paper-2: #efe5d6;
  --ink: #1d1a2b;
  --coral: #ff6a4d;
  --coral-2: #ff8b73;
  --coral-ink: #b5391f;
  --f-display: var(--font-spectral), Georgia, serif;
  --f-body: var(--font-onest), system-ui, sans-serif;
  --radius-btn: 999px;
  --radius-chip: 999px;
  --radius-field: 0.6rem;
  --ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);
  --ease-spring: cubic-bezier(0.3, 1.45, 0.5, 1);
}
[data-direction='editorial-smile'] .btn { font-weight: 500; letter-spacing: 0; }
[data-direction='editorial-smile'] .ex-tag { font-family: var(--f-body); }
.es-wrap { max-width: 72rem; margin: 0 auto; }
.es-h2 { font-family: var(--f-display); font-size: clamp(2.3rem, 10vw, 4.6rem); line-height: 1; font-weight: 400; letter-spacing: -0.03em; }
.es-lead { max-width: 36rem; font-size: 1.1rem; line-height: 1.55; color: var(--c-ink-2); }
.es-label { font-size: 0.74rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--c-ink-2); }
.es-small { font-size: 0.9rem; line-height: 1.5; color: var(--c-ink-2); }

/* ---------- Первый экран ---------- */
.es-hero { position: relative; background: var(--cream); padding: 0 1rem; overflow: hidden; }
.es-top { max-width: 72rem; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; min-height: 3.25rem; border-bottom: 1px solid var(--ink); font-size: 0.85rem; color: var(--c-ink-2); }
.es-lang a { padding: 0 0.9rem; border-radius: 999px; box-shadow: inset 0 0 0 1px var(--ink); text-decoration: none; font-weight: 500; color: var(--ink); }
.es-hero-grid { max-width: 72rem; margin: 0 auto; display: grid; grid-template-columns: minmax(0, 1fr); gap: 0.5rem; grid-template-areas: 'name' 'art' 'text'; padding: 1.5rem 0 2.25rem; }
.es-hero-grid > :nth-child(1) { grid-area: name; }
.es-hero-grid > :nth-child(3) { grid-area: text; }
.es-kicker { display: flex; align-items: center; gap: 0.6rem; font-size: 0.8rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--coral-ink); }
.es-kicker::before { content: ''; width: 0.55rem; height: 1.1rem; border-radius: 1rem; border: 1.5px solid currentColor; transform: rotate(-14deg); animation: es-straighten 0.6s var(--ease-spring) 0.8s both; }
@keyframes es-straighten { to { transform: none; } }
.es-name { margin-top: 0.7rem; font-family: var(--f-display); font-weight: 600; font-size: clamp(4.2rem, 21vw, 9rem); line-height: 0.86; letter-spacing: -0.045em; }
.es-name > span:first-child { display: block; animation: es-tighten 1.1s var(--ease-out) both; }
@keyframes es-tighten { from { letter-spacing: 0.06em; transform: translateY(0.12em); } }
.es-name-2 { display: flex; align-items: center; gap: 0.9rem; margin-top: 0.9rem; font-family: var(--f-body); font-size: 0.95rem; font-weight: 500; line-height: 1; letter-spacing: 0.42em; text-transform: uppercase; }
.es-name-2::after { content: ''; flex: 1; height: 1.5px; background: var(--ink); transform-origin: left; animation: es-line 0.9s var(--ease-out) 0.3s both; }
@keyframes es-line { from { transform: scaleX(0); } }

.es-art { grid-area: art; position: relative; display: grid; place-items: center; aspect-ratio: 3 / 2; max-height: 27rem; }
.es-art::before { content: ''; position: absolute; top: 3%; left: 50%; height: 94%; aspect-ratio: 1; translate: -50% 0; border-radius: 50%; background: var(--coral); animation: es-disc 0.9s var(--ease-out) 0.05s both; }
@keyframes es-disc { from { transform: scale(0.35); opacity: 0; } }
.es-art .es-align { position: relative; width: 104%; max-width: 34rem; }
.es-rovno { position: absolute; right: 0.25rem; bottom: -0.35rem; font-family: var(--f-display); font-style: italic; font-weight: 300; font-size: clamp(3rem, 15vw, 6.2rem); line-height: 1; letter-spacing: -0.03em; color: var(--ink); animation: es-rise 0.7s var(--ease-out) 1.45s both; }
.es-rovno::after { content: ''; position: absolute; left: 0.1em; right: 0.05em; bottom: 0.08em; height: 2px; background: var(--ink); transform-origin: left; animation: es-line 0.5s var(--ease-out) 1.85s both; }
@keyframes es-rise { from { opacity: 0; transform: translateY(0.3em); } }

/* Капсулы: стоят вкривь → выстраиваются; дуга прорисовывается; замки встают по одному */
.es-align { display: block; height: auto; overflow: visible; }
.es-cap { fill: var(--paper); stroke: var(--ink); stroke-width: 1.6; transform-box: fill-box; transform-origin: center; animation: es-cap 0.9s var(--ease-spring) both; animation-delay: calc(0.35s + var(--i) * 0.06s); }
@keyframes es-cap { from { transform: translateY(var(--y)) rotate(var(--r)); } }
.es-wire { fill: none; stroke: var(--ink); stroke-width: 2.4; stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 0; animation: es-draw 0.8s cubic-bezier(0.6, 0, 0.3, 1) 1.05s both; }
@keyframes es-draw { from { stroke-dashoffset: 1; } }
.es-bracket { fill: var(--ink); transform-box: fill-box; transform-origin: center; animation: es-pop 0.35s var(--ease-spring) both; animation-delay: calc(1.15s + var(--i) * 0.05s); }
@keyframes es-pop { from { transform: scale(0); } }
.es-still .es-cap, .es-still .es-wire, .es-still .es-bracket { animation: none; }
/* В пустом подборе ряд «дышит»: вкривь — ровно — вкривь */
.es-empty .es-cap { animation: es-wobble 3.2s ease-in-out infinite alternate; animation-delay: calc(var(--i) * 0.08s); }
@keyframes es-wobble { 0%, 25% { transform: translateY(var(--y)) rotate(var(--r)); } 75%, 100% { transform: none; } }

.es-statement { max-width: 30rem; font-family: var(--f-display); font-weight: 300; font-size: clamp(1.45rem, 6vw, 1.9rem); line-height: 1.25; letter-spacing: -0.01em; }
.es-statement em { font-style: italic; font-weight: 400; color: var(--coral-ink); }
.es-cta { display: grid; gap: 0.75rem; margin-top: 1.6rem; }
.es-branches { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; margin-top: 1.4rem; font-size: 0.95rem; }
.es-branches b { font-family: var(--f-display); font-style: italic; font-weight: 400; color: var(--coral-ink); margin-right: 0.2rem; }

@media (min-width: 640px) { .es-cta { display: flex; flex-wrap: wrap; } }
@media (min-width: 900px) {
  .es-hero { padding: 0 2rem; }
  .es-hero-grid { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); grid-template-areas: 'name art' 'text art'; column-gap: 4rem; row-gap: 2.5rem; align-items: end; padding: 4rem 0 4.5rem; }
  .es-art { aspect-ratio: 1; align-self: center; }
  .es-art .es-align { width: 118%; }
}

/* Бегущая строка */
.es-marquee { margin: 0 -1rem; border-top: 1px solid var(--ink); border-bottom: 1px solid var(--ink); overflow: hidden; background: var(--paper); }
.es-marquee-track { display: flex; width: max-content; animation: es-marquee 36s linear infinite; }
.es-marquee-track > span { display: flex; }
.es-marquee-track > span > span { display: flex; align-items: center; padding: 0.55rem 0; font-family: var(--f-display); font-size: clamp(1.8rem, 7vw, 3rem); line-height: 1; font-weight: 300; white-space: nowrap; }
.es-marquee i { font-style: italic; color: var(--coral-ink); }
.es-marquee b { display: inline-block; width: 0.42em; height: 0.9em; margin: 0 0.6em; border-radius: 1em; border: 1.5px solid var(--ink); transform: rotate(var(--r, 0deg)); }
.es-marquee b + i + b { background: var(--coral); border-color: var(--coral); }
@keyframes es-marquee { to { transform: translateX(-50%); } }
@media (min-width: 900px) { .es-marquee { margin: 0 -2rem; } }

/* ---------- Секции ---------- */
.es-sec { padding: 4.5rem 1rem 5rem; background: var(--cream); }
.es-sec-2 { background: var(--paper-2); }
.es-sec-ink { background: var(--ink); color: var(--cream); }
.es-sec-coral { background: var(--coral); color: var(--ink); }
@media (min-width: 900px) { .es-sec { padding: 7rem 2rem; } }
.es-sec-ink .es-lead { color: var(--cream-2); }
.es-sec-coral .es-lead { color: var(--ink); }
.es-sec-ink :focus-visible { outline-color: var(--coral); }

/* ---------- «Что вас беспокоит?» — журнальное оглавление ---------- */
.es-pick { display: grid; gap: 2rem; }
@media (min-width: 900px) { .es-pick { grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); gap: 3.5rem; align-items: start; } }
.es-list { border-top: 1.5px solid var(--ink); }
.es-opt { position: relative; gap: 1rem; min-height: 4.5rem; padding: 0.9rem 0.6rem 0.9rem 0.35rem; border-bottom: 1px solid var(--c-line); overflow: hidden; }
.es-opt::before { content: ''; position: absolute; inset: 0; background: var(--ink); transform: scaleX(0); transform-origin: left; transition: transform 0.5s cubic-bezier(0.7, 0, 0.2, 1); }
.es-opt::after { content: '→'; position: relative; font-family: var(--f-display); font-size: 1.4rem; line-height: 1; transition: transform 0.3s var(--ease-out); }
.es-opt > * { position: relative; }
.es-opt-n { width: 1.9rem; flex: none; font-family: var(--f-display); font-style: italic; font-size: 1.15rem; color: var(--coral-ink); transition: color 0.3s ease; }
.es-opt-label { flex: 1; font-family: var(--f-display); font-size: 1.55rem; line-height: 1.1; font-weight: 400; letter-spacing: -0.01em; transition: transform 0.4s var(--ease-out); }
.es-opt-tag { padding: 0.2rem 0.55rem; border-radius: 999px; background: var(--coral); color: var(--ink); font-size: 0.68rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
@media (hover: hover) {
  .es-list .dc-opt:hover .es-opt-label { transform: translateX(0.4rem); }
  .es-list .dc-opt:hover .es-opt::after { transform: translateX(0.3rem); }
}
.es-list .dc-opt input:checked + .es-opt { color: var(--cream); }
.es-list .dc-opt input:checked + .es-opt::before { transform: scaleX(1); }
.es-list .dc-opt input:checked + .es-opt .es-opt-n { color: var(--coral); }
.es-list .dc-opt input:checked + .es-opt .es-opt-label { transform: translateX(0.4rem); }
.es-list .dc-opt input:checked + .es-opt::after { transform: rotate(90deg); }
@media (min-width: 900px) { .es-opt { min-height: 5.25rem; } .es-opt-label { font-size: 1.9rem; } }

.es-results { position: relative; }
@media (min-width: 900px) { .es-results { position: sticky; top: 1.5rem; } }
.es-empty { display: grid; place-items: center; gap: 1.2rem; min-height: 15rem; padding: 2rem 1.5rem; border: 1px dashed var(--c-ink-2); font-family: var(--f-display); font-style: italic; font-size: 1.3rem; line-height: 1.35; color: var(--c-ink-2); text-align: center; }

/* Карточка результата: чернильная, со смещённой коралловой тенью */
.es-card { position: relative; gap: 1.1rem; margin-right: 0.6rem; padding: 1.5rem 1.25rem 1.6rem; background: var(--ink); color: var(--cream); box-shadow: 0.6rem 0.6rem 0 var(--coral); }
.dc .es-card { animation: es-card 0.45s var(--ease-out) both; }
@keyframes es-card { from { transform: translate(0.6rem, 0.6rem); box-shadow: 0 0 0 var(--coral); } }
@media (min-width: 900px) { .es-card { padding: 2.2rem 2.2rem 2.4rem; margin-right: 0.9rem; box-shadow: 0.9rem 0.9rem 0 var(--coral); } }
.es-card-n { font-family: var(--f-display); font-style: italic; font-weight: 300; font-size: 3.4rem; line-height: 0.8; color: var(--coral); }
.es-card-title { font-family: var(--f-display); font-size: 1.9rem; line-height: 1.05; letter-spacing: -0.01em; }
.es-card-price { font-family: var(--f-display); font-weight: 600; font-size: clamp(2.2rem, 10vw, 3.4rem); line-height: 1; letter-spacing: -0.035em; }
.es-card-note { padding-left: 0.9rem; border-left: 2px solid var(--coral); font-size: 0.98rem; line-height: 1.45; color: var(--cream-2); }
.es-card-facts { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; padding-top: 0.9rem; border-top: 1px solid rgba(247, 240, 230, 0.18); }
.es-card-facts dt { font-size: 0.74rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--cream-2); }
.es-card-facts dd { margin-top: 0.3rem; font-size: 1.05rem; }
.es-card .ex-tag { color: var(--coral); }
.es-card .es-label, .es-card .es-small { color: var(--cream-2); }
.es-calm { max-width: 26ch; font-family: var(--f-display); font-weight: 300; font-size: 1.5rem; line-height: 1.35; }
.es-plan { display: grid; gap: 0.8rem; padding: 1rem; border: 1px solid rgba(247, 240, 230, 0.18); }
.es-card .chip { border-color: rgba(247, 240, 230, 0.35); color: var(--cream); }
.es-card input:checked + .chip { background: var(--coral); border-color: var(--coral); color: var(--ink); }
.es-card input:focus-visible + .chip, .es-card :focus-visible { outline-color: var(--coral); }
.es-monthly { font-family: var(--f-display); font-weight: 600; font-size: 1.85rem; line-height: 1.1; letter-spacing: -0.02em; color: var(--coral); }
.es-monthly .dc-per { margin-top: 0.15rem; font-family: var(--f-body); font-size: 0.9rem; font-weight: 400; letter-spacing: 0; color: var(--cream-2); }
/* Месяцы рассрочки — капсулы, которые встают ровно по одной */
.es-mcaps { display: flex; align-items: center; gap: 4px; height: 2rem; margin-bottom: 0.4rem; }
.es-mcaps i { width: 0.7rem; height: 1.6rem; border-radius: 1rem; border: 1.5px solid var(--coral); background: var(--coral); animation: es-mcap 0.5s var(--ease-spring) both; animation-delay: calc(0.1s + var(--i) * 0.05s); }
@keyframes es-mcap { from { transform: rotate(var(--r)) translateY(3px); background: transparent; } }
.es-card .btn:not(.btn-ghost) { background: var(--coral); color: var(--ink); }
.es-on-dark { color: var(--cream); box-shadow: inset 0 0 0 1px rgba(247, 240, 230, 0.45); }
@media (hover: hover) {
  .concept .es-card .btn:not(.btn-ghost):hover { background: var(--coral-2); }
  .concept .es-on-dark:hover { background: rgba(247, 240, 230, 0.1); }
  .concept .es-card .chip:hover { border-color: var(--cream); }
}

/* ---------- Ортодонтия: чернильный разворот ---------- */
.es-ortho { display: grid; gap: 1.25rem; }
.es-big-num span { display: inline-block; }
.es-big-num { font-family: var(--f-display); font-style: italic; font-weight: 300; font-size: clamp(7rem, 40vw, 17rem); line-height: 0.8; letter-spacing: -0.05em; color: var(--coral); }
@media (min-width: 900px) { .es-ortho { grid-template-columns: auto minmax(0, 1fr); column-gap: 4rem; align-items: end; } }

/* ---------- Первый визит: шаги-замки на одной дуге ---------- */
.es-steps { position: relative; display: grid; }
.es-steps::before { content: ''; position: absolute; left: 1.05rem; top: 0.5rem; bottom: 2.5rem; width: 2px; background: var(--ink); transform-origin: top; }
.es-steps li { position: relative; display: grid; grid-template-columns: 2.2rem minmax(0, 1fr); column-gap: 1.1rem; padding-bottom: 2.2rem; }
.es-step-n { grid-row: span 2; display: grid; place-items: center; width: 2.2rem; height: 2.2rem; border: 2px solid var(--ink); border-radius: 0.45rem; background: var(--paper); font-family: var(--f-display); font-weight: 600; font-size: 1.05rem; }
.es-steps li:first-child .es-step-n { background: var(--coral); }
.es-step-t { font-family: var(--f-display); font-size: 1.5rem; line-height: 1.15; font-weight: 400; }
.es-step-p { margin-top: 0.4rem; line-height: 1.5; color: var(--c-ink-2); }
@media (min-width: 900px) {
  .es-steps { grid-template-columns: repeat(4, minmax(0, 1fr)); column-gap: 2rem; }
  .es-steps::before { left: 0; right: 0; top: 1.05rem; bottom: auto; width: auto; height: 2px; transform-origin: left; }
  .es-steps li { grid-template-columns: 1fr; padding-bottom: 0; }
  .es-step-n { grid-row: auto; margin-bottom: 1.25rem; }
}

/* ---------- Запись: коралловый разворот ---------- */
.es-booking { display: grid; gap: 2rem; }
@media (min-width: 900px) { .es-booking { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 4rem; align-items: start; } }
.es-form { margin-right: 0.5rem; padding: 1.4rem 1.15rem 1.6rem; background: var(--paper); border: 1.5px solid var(--ink); box-shadow: 0.5rem 0.5rem 0 var(--ink); }
@media (min-width: 900px) { .es-form { padding: 2.4rem; box-shadow: 0.8rem 0.8rem 0 var(--ink); } }
.es-sec-coral .es-cap { fill: var(--coral-2); }

/* ---------- Адреса ---------- */
.es-addr { display: grid; border-top: 1.5px solid var(--ink); }
.es-addr li { display: grid; gap: 0.5rem; padding: 1.6rem 0; border-bottom: 1px solid var(--c-line); }
.es-addr-n { font-family: var(--f-display); font-style: italic; font-size: 1.15rem; color: var(--coral-ink); }
.es-addr-t { font-family: var(--f-display); font-size: clamp(2.1rem, 9vw, 3.2rem); line-height: 1; font-weight: 400; letter-spacing: -0.02em; }
.es-addr p { font-size: 1.05rem; line-height: 1.45; color: var(--c-ink-2); }
.es-link { display: inline-flex; align-items: center; gap: 0.45rem; min-height: 2.75rem; font-weight: 500; color: var(--ink); text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 4px; transition: color 0.2s ease; }
@media (min-width: 768px) { .es-addr { grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 3rem; } }
.es-contact-row { display: grid; gap: 1.5rem; margin-top: 2.5rem; }
@media (min-width: 768px) { .es-contact-row { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
.es-contact-v { margin-top: 0.35rem; font-size: 1.1rem; line-height: 1.4; }
.es-contact-tel { display: inline-flex; align-items: center; min-height: 2.75rem; font-family: var(--f-display); font-weight: 600; font-size: clamp(1.8rem, 8vw, 2.5rem); letter-spacing: -0.02em; color: var(--ink); text-decoration: none; transition: color 0.2s ease; }
@media (hover: hover) { .concept .es-link:hover, .concept .es-contact-tel:hover { color: var(--coral-ink); } }

/* При прокрутке заголовки «выравниваются», цифры года встают ровно — только transform, без прозрачности */
@supports (animation-timeline: view()) {
  .es-h2, .es-addr-t { transform-origin: 0 100%; animation: es-level linear both; animation-timeline: view(); animation-range: entry 0% entry 80%; }
  .es-big-num span[aria-hidden] { animation: es-digit linear both; animation-timeline: view(); animation-range: entry 20% cover 45%; }
  .es-steps::before { animation: es-grow linear both; animation-timeline: view(); animation-range: entry 20% cover 55%; }
  .es-step-n { animation: es-snap linear both; animation-timeline: view(); animation-range: entry 30% entry 90%; }
}
@keyframes es-level { from { transform: translateX(-0.2em) rotate(-2deg); } }
@keyframes es-digit { from { transform: translateY(var(--y)) rotate(var(--r)); } }
@keyframes es-grow { from { transform: scale(0); } }
@keyframes es-snap { from { transform: rotate(-24deg) scale(0.6); } }

/* ---------- OG ---------- */
.es-og { background: var(--cream); }
.es-og .es-art { aspect-ratio: auto; max-height: none; }
.es-og .es-art::before, .es-og .es-rovno { animation: none; }
.es-og .es-art .es-align { width: 108%; }
.es-og .es-rovno::after, .es-og .es-name > span:first-child, .es-og .es-name-2::after { animation: none; }

@media (prefers-reduced-motion: reduce) {
  .es-kicker::before, .es-name > span:first-child, .es-name-2::after, .es-art::before, .es-rovno, .es-rovno::after,
  .es-cap, .es-wire, .es-bracket, .es-empty .es-cap, .es-marquee-track, .dc .es-card, .es-mcaps i,
  .es-h2, .es-addr-t, .es-big-num span, .es-steps::before, .es-step-n { animation: none; }
  .es-kicker::before { transform: none; }
  .es-opt::before, .es-opt-label, .es-opt::after { transition: none; }
}
`

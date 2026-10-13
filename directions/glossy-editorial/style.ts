/**
 * glossy-editorial: слоновая кость, эспрессо, пудра, золотые линии в 1 px.
 * Expert Beauty: сайт как глянцевый журнал — обложка, «Содержание» вместо меню услуг, купон записи.
 */
export const css = /* css */ `
.concept[data-direction='glossy-editorial'] {
  --c-bg: #f6f1e8;
  --c-bg-2: #f1e3db;
  --c-surface: #fbf8f2;
  --c-ink: #2b1d16;
  --c-ink-2: #6b5a50;
  --c-accent: #2b1d16;
  --c-accent-ink: #f6f1e8;
  --c-line: rgba(176, 141, 87, 0.55);
  --c-focus: #8a6a3b;
  --c-field: #fbf8f2;
  --gold: #b08d57;
  --gold-ink: #7a5a2e;
  --powder: #ead2c8;
  --f-display: var(--font-cormorant-ed), Georgia, serif;
  --f-body: var(--font-onest), system-ui, sans-serif;
  --radius-btn: 0;
  --radius-chip: 999px;
  --radius-field: 0;
}
[data-direction='glossy-editorial'] .btn { font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; font-size: 0.85rem; }
[data-direction='glossy-editorial'] .ex-tag { color: var(--gold-ink); border-color: var(--gold); }
[data-direction='glossy-editorial'] .field input { border-width: 0 0 1px; background: transparent; }
[data-direction='glossy-editorial'] input:checked + .chip { background: var(--c-ink); border-color: var(--c-ink); color: var(--c-bg); }
.ge-wrap { max-width: 72rem; margin: 0 auto; }
.ge-slot-time, .ge-stats dd, .ge-big-tel, .ge-row-p { font-variant-numeric: lining-nums tabular-nums; }
.ge-caps { font-family: var(--f-body); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; }
.ge-h2 { font-family: var(--f-display); font-size: clamp(2.8rem, 13vw, 5.6rem); line-height: 0.95; font-weight: 500; letter-spacing: -0.01em; }
.ge-h2 em { font-style: italic; font-weight: 300; }
.ge-lead { max-width: 40ch; font-family: var(--f-display); font-style: italic; font-size: 1.35rem; line-height: 1.3; color: var(--c-ink-2); }
.ge-small { font-size: 0.85rem; color: var(--c-ink-2); }
.ge-link { display: inline-flex; align-items: center; gap: 0.5rem; min-height: 2.75rem; border-bottom: 1px solid var(--gold); font-size: 0.8rem; letter-spacing: 0.16em; text-transform: uppercase; text-decoration: none; }
.ge-btn { width: 100%; }
@media (min-width: 640px) { .ge-btn { width: auto; padding: 0 2.6rem; } }

/* ---------- Обложка ---------- */
.ge-cover { position: relative; padding: 0 1rem 1.5rem; background: var(--c-bg); overflow: hidden; }
.ge-strip { max-width: 72rem; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; min-height: 2.75rem; border-bottom: 1px solid var(--gold); font-size: 0.68rem; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; }
.ge-lang a { letter-spacing: 0.08em; text-transform: none; font-size: 0.85rem; }
.ge-mast { max-width: 72rem; margin: 0 auto; display: grid; justify-items: center; padding: 0.4rem 0 0.7rem; border-bottom: 1px solid var(--gold); }
.ge-mast-1 { font-family: var(--f-display); font-weight: 600; font-size: clamp(5.6rem, 27.5vw, 13rem); line-height: 0.82; letter-spacing: -0.02em; text-transform: uppercase; }
.ge-mast-2 { margin-top: 0.35rem; font-family: var(--f-body); font-size: clamp(0.85rem, 3.4vw, 1.3rem); font-weight: 500; letter-spacing: 0.9em; padding-left: 0.9em; text-transform: uppercase; }
.ge-cover-body { position: relative; max-width: 72rem; margin: 0 auto; min-height: 19rem; padding-top: 1.1rem; }
.ge-arch { overflow: hidden; border-radius: 999px 999px 0 0; background: var(--powder); }
.ge-arch-cover { position: absolute; top: 1.1rem; right: 0; width: 52%; height: 18rem; }
.ge-waves { display: block; width: 100%; height: 100%; }
.ge-waves path { fill: none; stroke: var(--gold); stroke-width: 1; vector-effect: non-scaling-stroke; stroke-dasharray: 1; stroke-dashoffset: 1; animation: ge-draw 2.4s cubic-bezier(0.4, 0.1, 0.2, 1) both; animation-delay: calc(0.3s + var(--i) * 0.09s); }
.ge-still path { animation: none; stroke-dashoffset: 0; }
.ge-sun { fill: #f6f1e8; opacity: 0.7; }
@keyframes ge-draw { to { stroke-dashoffset: 0; } }
.ge-lines { position: relative; z-index: 1; display: grid; gap: 1.1rem; width: 58%; padding-top: 0.4rem; }
.ge-lines li { display: grid; gap: 0.2rem; }
.ge-lines em { font-family: var(--f-display); font-style: italic; font-size: 1.2rem; line-height: 1.15; }
.ge-line-big em { display: block; font-family: var(--f-display); font-style: italic; font-size: clamp(2rem, 9.6vw, 3.6rem); font-weight: 300; line-height: 0.98; }
.ge-line-big span { font-family: var(--f-display); font-size: 1.25rem; font-style: italic; }
.ge-line-og em { font-size: 76px; }
.ge-line-og span { font-size: 34px; }
.ge-line-link { display: grid; gap: 0.2rem; text-decoration: none; }
.ge-line-link em { text-decoration: underline; text-decoration-color: var(--gold); text-underline-offset: 4px; text-decoration-thickness: 1px; }
.ge-kind { max-width: 72rem; margin: 1.2rem auto 0; font-size: 0.95rem; color: var(--c-ink-2); }
.ge-cover-foot { max-width: 72rem; margin: 1rem auto 0; display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 0.9rem 1rem; }
.ge-cover-foot .ge-btn { grid-column: 1 / -1; }
.ge-tel { display: inline-flex; align-items: center; gap: 0.5rem; min-height: 2.75rem; font-size: 1rem; letter-spacing: 0.04em; text-decoration: none; }
.ge-barcode { fill: var(--c-ink); font-family: var(--f-body); }
.ge-barcode-cover { width: 4.6rem; }
@media (min-width: 900px) {
  .ge-cover { padding: 0 2rem 3rem; }
  .ge-cover-body { min-height: 26rem; }
  .ge-arch-cover { width: 34%; height: 26rem; right: 6%; }
  .ge-lines { width: 55%; gap: 1.6rem; padding-top: 2rem; }
  .ge-cover-foot { grid-template-columns: auto auto 1fr; }
  .ge-cover-foot .ge-btn { grid-column: auto; }
  .ge-barcode-cover { justify-self: end; width: 6rem; }
}

/* ---------- Секции ---------- */
.ge-sec { padding: 4.5rem 1rem 5rem; border-top: 1px solid var(--gold); }
.ge-sec-powder { background: var(--c-bg-2); }
@media (min-width: 900px) { .ge-sec { padding: 7rem 2rem; } }

/* ---------- Содержание ---------- */
.ge-toc-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem; padding-bottom: 0.9rem; border-bottom: 1px solid var(--gold); margin-bottom: 1.2rem; }
.ge-toc-head .ge-caps { padding-bottom: 0.6rem; text-align: right; color: var(--gold-ink); }
.ge-booker { display: grid; gap: 1.5rem; margin-top: 2rem; }
@media (min-width: 900px) { .ge-booker { grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); grid-template-areas: 'branches spread' 'toc spread'; column-gap: 4rem; align-items: start; } .ge-branches { grid-area: branches; } .ge-toc { grid-area: toc; } .ge-spread { grid-area: spread; position: sticky; top: 1.5rem; } }
.ge-branches { display: flex; border: 1px solid var(--gold); }
.ge-branches label { flex: 1; }
.ge-branches span { display: grid; place-items: center; min-height: 3rem; padding: 0 0.75rem; font-family: var(--f-display); font-style: italic; font-size: 1.15rem; text-align: center; cursor: pointer; transition: background-color 0.2s ease, color 0.2s ease; }
.ge-branches label + label span { border-left: 1px solid var(--gold); }
.ge-branches input:checked + span { background: var(--c-ink); color: var(--c-bg); }
.ge-branches input:focus-visible + span { outline: 2px solid var(--c-focus); outline-offset: -4px; }
.ge-group + .ge-group { margin-top: 1.6rem; }
.ge-group-name { padding-bottom: 0.4rem; color: var(--gold-ink); }
.ge-row { display: grid; grid-template-columns: 2.2rem minmax(0, 1fr); align-items: baseline; column-gap: 0.4rem; padding: 0.75rem 0.4rem; border-top: 1px solid rgba(176, 141, 87, 0.35); cursor: pointer; transition: background-color 0.2s ease, padding 0.2s ease; }
.ge-row:last-child { border-bottom: 1px solid rgba(176, 141, 87, 0.35); }
.ge-row-p { grid-row: span 2; font-family: var(--f-display); font-style: italic; font-size: 1.05rem; color: var(--gold-ink); }
.ge-row-name { font-family: var(--f-display); font-size: 1.6rem; line-height: 1.1; font-weight: 500; }
.ge-row-meta { margin-top: 0.15rem; font-size: 0.82rem; color: var(--c-ink-2); }
@media (hover: hover) { .ge-row:hover { background: rgba(234, 210, 200, 0.45); } }
.ge-row:has(input:checked) { background: var(--powder); padding-left: 0.9rem; }
.ge-row:has(input:checked) .ge-row-name { font-style: italic; }
.ge-row:has(input:focus-visible) { outline: 2px solid var(--c-focus); outline-offset: -2px; }

/* Разворот визита */
.ge-spread { position: relative; border: 1px solid var(--gold); background: var(--c-surface); padding: 1.4rem 1.2rem 1.6rem; }
.ge-spread::before { content: ''; position: absolute; inset: 0.4rem; border: 1px solid rgba(176, 141, 87, 0.35); pointer-events: none; }
@media (min-width: 900px) { .ge-spread { padding: 2.2rem; } }
.ge-empty { font-family: var(--f-display); font-size: 1.4rem; line-height: 1.3; color: var(--c-ink-2); }
[data-booker]:not([data-state='empty']) .ge-empty { display: none; }
[data-booker][data-state='empty'] .ge-spread-body { display: none; }
.ge-spread-body { position: relative; display: grid; gap: 1rem; animation: ge-in 0.35s ease both; }
@keyframes ge-in { from { opacity: 0; transform: translateY(8px); } }
.ge-spread-title { font-family: var(--f-display); font-style: italic; font-weight: 300; font-size: clamp(2.2rem, 10vw, 3.4rem); line-height: 1; }
.ge-stats { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid var(--gold); border-bottom: 1px solid var(--gold); }
.ge-stats div { display: grid; gap: 0.3rem; padding: 0.9rem 0; }
.ge-stats div + div { padding-left: 1rem; border-left: 1px solid var(--gold); }
.ge-stats dd { font-family: var(--f-display); font-size: 1.75rem; line-height: 1.05; font-weight: 500; }
.ge-slots-title { margin-top: 0.4rem; color: var(--gold-ink); }
.ge-slots { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
.ge-slot { display: grid; gap: 0.1rem; padding: 0.7rem 0.8rem; border: 1px solid var(--gold); cursor: pointer; animation: ge-in 0.3s ease both; animation-delay: calc(var(--i) * 0.06s); transition: background-color 0.2s ease, color 0.2s ease; }
.ge-slot-day { font-size: 0.68rem; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; }
.ge-slot-time { font-family: var(--f-display); font-size: 2rem; line-height: 1; font-weight: 500; }
@media (hover: hover) { .ge-slot:hover { background: rgba(234, 210, 200, 0.5); } }
.ge-slot:has(input:checked) { background: var(--c-ink); color: var(--c-bg); border-color: var(--c-ink); }
.ge-slot:has(input:focus-visible) { outline: 2px solid var(--c-focus); outline-offset: 2px; }
.ge-spread [aria-disabled='true'] { opacity: 0.5; }

/* ---------- Адреса ---------- */
.ge-guide { display: grid; gap: 0; border-top: 1px solid var(--gold); }
.ge-guide li { display: grid; gap: 0.5rem; padding: 1.6rem 0; border-bottom: 1px solid var(--gold); }
@media (min-width: 768px) { .ge-guide { grid-template-columns: 1fr 1fr; } .ge-guide li { padding-right: 2rem; } .ge-guide li + li { padding-left: 2rem; border-left: 1px solid var(--gold); } }
.ge-guide-n { font-family: var(--f-display); font-style: italic; font-size: 1.3rem; color: var(--gold-ink); }
.ge-guide-name { font-family: var(--f-display); font-size: clamp(2.2rem, 9vw, 3.2rem); line-height: 1; font-weight: 300; }
.ge-hours { margin-top: 2.5rem; }
.ge-hours p:not(.ge-caps) { margin-top: 0.4rem; font-family: var(--f-display); font-size: 1.4rem; font-style: italic; }
.ge-big-tel { display: block; margin-top: 0.3rem; font-family: var(--f-display); font-size: clamp(2rem, 9vw, 3rem); line-height: 1.1; text-decoration: none; }

/* ---------- Купон ---------- */
.ge-coupon { position: relative; display: grid; gap: 2rem; padding: 2rem 1.2rem; border: 1.5px dashed var(--gold); background: var(--c-surface); }
@media (min-width: 900px) { .ge-coupon { grid-template-columns: 1fr 1.3fr; gap: 4rem; padding: 3rem; } }
.ge-scissors { position: absolute; top: -0.85rem; left: 1.5rem; padding: 0 0.4rem; background: var(--c-bg); color: var(--gold-ink); line-height: 0; }

/* ---------- OG ---------- */
.ge-og .ge-mast { justify-items: start; border: 0; }

@media (prefers-reduced-motion: reduce) {
  .ge-waves path { animation: none; stroke-dashoffset: 0; }
  .ge-spread-body, .ge-slot { animation: none; }
}
`

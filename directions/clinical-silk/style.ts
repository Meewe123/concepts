/**
 * clinical-silk: белый, ледяной голубой, графит. Точная сетка, цифры как в медицинском бланке.
 * Denta: чек цен печатается из щели в первом экране; подбор — в тёмном «кабинете» с белыми талонами.
 */
export const css = /* css */ `
.concept[data-direction='clinical-silk'] {
  --c-bg: #ffffff;
  --c-bg-2: #e4eff7;
  --c-surface: #ffffff;
  --c-ink: #12171c;
  --c-ink-2: #4a5662;
  --c-accent: #12171c;
  --c-accent-ink: #ffffff;
  --c-line: #d3dfe8;
  --c-focus: #2a6c99;
  --c-field: #ffffff;
  --ice: #e4eff7;
  --ice-2: #bcd6e9;
  --blue: #2a6c99;
  --night: #11161b;
  --night-2: #1a2128;
  --night-ink: #eef4f8;
  --night-ink-2: #a3b3c1;
  --f-display: var(--font-plex-sans), system-ui, sans-serif;
  --f-body: var(--font-plex-sans), system-ui, sans-serif;
  --f-mono: var(--font-plex-mono), ui-monospace, monospace;
  --radius-btn: 3px;
  --radius-chip: 3px;
  --radius-field: 3px;
}
[data-direction='clinical-silk'] .btn { font-weight: 500; }
[data-direction='clinical-silk'] .ex-tag { color: var(--blue); border-color: currentColor; font-family: var(--f-mono); opacity: 1; }
[data-direction='clinical-silk'] input:checked + .chip { background: var(--c-ink); border-color: var(--c-ink); color: #fff; }
.ds-mono { font-family: var(--f-mono); }
.ds-mono-label { font-family: var(--f-mono); font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--c-ink-2); }
.ds-wrap { max-width: 72rem; margin: 0 auto; }
.ds-h2 { font-size: clamp(2.2rem, 9vw, 4.4rem); line-height: 1.02; font-weight: 600; letter-spacing: -0.035em; }
.ds-h2-sm { font-size: clamp(1.9rem, 7.5vw, 3.4rem); }
.ds-eyebrow { display: inline-flex; align-items: center; gap: 0.6rem; margin-bottom: 1.1rem; font-family: var(--f-mono); font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ice-2); }
.ds-eyebrow::before { content: ''; width: 1.6rem; height: 1px; background: currentColor; }
.ds-eyebrow-dark { color: var(--blue); }
.ds-small { font-size: 0.9rem; color: var(--c-ink-2); }

/* ---------- Первый экран: чек из принтера ---------- */
.ds-hero { background: var(--ice); padding: 0 1rem 2rem; overflow: hidden; }
.ds-top { max-width: 72rem; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; min-height: 3rem; font-size: 0.85rem; color: var(--c-ink-2); }
.ds-lang a { padding: 0 0.85rem; border-radius: 3px; background: #fff; text-decoration: none; font-weight: 500; color: var(--c-ink); }
.ds-hero-grid { max-width: 72rem; margin: 0 auto; display: grid; gap: 1.25rem; grid-template-areas: 'slip' 'cta' 'copy'; padding-top: 0.75rem; }
.ds-hero-copy { grid-area: copy; padding-top: 1rem; }
.ds-printer-stage { grid-area: slip; position: relative; }
.ds-hero-cta { grid-area: cta; display: grid; gap: 0.75rem; }
.ds-kicker { font-size: clamp(2.6rem, 11vw, 5.6rem); line-height: 0.98; font-weight: 600; letter-spacing: -0.045em; }
.ds-kicker-2 { color: var(--blue); }
@media (min-width: 900px) {
  .ds-hero { padding: 0 2rem 4rem; }
  .ds-hero-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 30rem); grid-template-areas: 'copy slip' 'cta slip'; column-gap: 5rem; align-items: end; padding-top: 3rem; }
  .ds-hero-copy { align-self: end; }
  .ds-hero-cta { display: flex; align-self: start; }
}

/* Аппарат: графитовая планка со щелью */
.ds-printer { position: relative; z-index: 2; height: 1.4rem; border-radius: 0.7rem; background: var(--night); box-shadow: 0 10px 18px -10px rgba(17, 22, 27, 0.6); }
.ds-printer span { position: absolute; left: 0.9rem; right: 0.9rem; bottom: 0.35rem; height: 0.18rem; border-radius: 2px; background: #000; box-shadow: 0 1px 0 rgba(255, 255, 255, 0.12); }
.ds-feed { position: relative; margin: -0.55rem 0.7rem 0; padding: 0 0 1.75rem; overflow: hidden; }
.ds-slip-shadow { filter: drop-shadow(0 18px 22px rgba(17, 22, 27, 0.16)) drop-shadow(0 2px 2px rgba(17, 22, 27, 0.06)); animation: ds-print 1.5s cubic-bezier(0.25, 0.85, 0.3, 1) 0.15s both; }
@keyframes ds-print { from { transform: translateY(-101%); } }
.ds-slip {
  --z: 7px;
  position: relative; background: #fff; padding: 1.3rem 1.15rem 1.9rem;
  -webkit-mask: conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / calc(2 * var(--z)) 100%;
  mask: conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / calc(2 * var(--z)) 100%;
  background-image: repeating-linear-gradient(transparent 0 calc(1.6rem - 1px), rgba(42, 108, 153, 0.07) calc(1.6rem - 1px) 1.6rem);
}
.ds-slip-head { display: flex; justify-content: space-between; padding-bottom: 0.6rem; border-bottom: 1px dashed var(--ice-2); font-family: var(--f-mono); font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--c-ink-2); }
.ds-name { margin-top: 0.55rem; font-size: clamp(4.6rem, 25vw, 7.5rem); line-height: 0.88; font-weight: 600; letter-spacing: -0.06em; }
.ds-claim { margin-top: 0.4rem; font-size: 1.05rem; line-height: 1.3; }
.ds-slip-lines { margin-top: 1rem; padding-top: 0.6rem; border-top: 1px solid var(--c-ink); display: grid; gap: 0.15rem; }
.ds-slip-line { display: grid; grid-template-columns: minmax(0, auto) minmax(0.75rem, 1fr) auto; align-items: end; gap: 0.4rem; padding: 0.3rem 0; font-family: var(--f-mono); font-size: 0.8rem; line-height: 1.35; color: var(--c-ink); text-decoration: none; }
.ds-dots { border-bottom: 1.5px dotted var(--ice-2); transform: translateY(-0.3rem); }
.ds-slip-val { font-weight: 500; font-size: 0.9rem; white-space: nowrap; }
a.ds-slip-line .ds-slip-val { color: var(--blue); text-decoration: underline; text-underline-offset: 3px; }
.ds-slip-foot { margin-top: 0.8rem; max-width: 62%; font-family: var(--f-mono); font-size: 0.68rem; letter-spacing: 0.04em; color: var(--c-ink-2); }

/* Печать */
.ds-stamp { stroke: var(--blue); color: var(--blue); }
.ds-stamp-text { fill: var(--blue); font-family: var(--f-mono); text-transform: uppercase; }
.ds-stamp-hero { position: absolute; right: -0.3rem; bottom: -0.1rem; width: 5.8rem; transform: rotate(-14deg); opacity: 0.85; mix-blend-mode: multiply; animation: ds-stamp 0.45s cubic-bezier(0.3, 1.5, 0.5, 1) 1.55s both; }
@keyframes ds-stamp { from { transform: rotate(-14deg) scale(1.6); opacity: 0; } }
@media (min-width: 900px) { .ds-stamp-hero { width: 8.5rem; right: -1rem; } }

/* ---------- Тёмные и светлые секции ---------- */
.ds-dark { background: var(--night); color: var(--night-ink); padding: 4.5rem 1rem 5rem; }
.ds-light { background: #fff; padding: 4.5rem 1rem 5rem; }
.ds-ice { background: var(--ice); padding: 4.5rem 1rem 5rem; }
@media (min-width: 900px) { .ds-dark, .ds-light, .ds-ice { padding: 7rem 2rem; } }
.ds-dark .ds-h2 { color: #fff; }

/* ---------- «Что вас беспокоит?» ---------- */
.ds-pick { display: grid; gap: 1.5rem; margin-top: 2.5rem; }
@media (min-width: 900px) { .ds-pick { grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); gap: 3rem; align-items: start; } }
.ds-tiles { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.6rem; }
.ds-tile { position: relative; flex-direction: column; align-items: flex-start; justify-content: space-between; gap: 1rem; min-height: 8.25rem; padding: 0.85rem 0.9rem 1rem; border: 1px solid rgba(238, 244, 248, 0.14); background: var(--night-2); color: var(--night-ink); }
.ds-tile-n { font-family: var(--f-mono); font-size: 0.75rem; letter-spacing: 0.08em; color: var(--night-ink-2); }
.ds-tile-ico { position: absolute; top: 0.8rem; right: 0.8rem; width: 2.3rem; height: 2.3rem; color: var(--ice-2); transition: color 0.2s ease, transform 0.25s ease; }
.ds-tile-label { font-size: 1.12rem; line-height: 1.2; font-weight: 500; }
@media (hover: hover) { .ds-tiles .dc-opt:hover .ds-tile { border-color: var(--ice-2); } .ds-tiles .dc-opt:hover .ds-tile-ico { transform: translateY(-2px); } }
.ds-tiles .dc-opt input:checked + .ds-tile { background: var(--ice); border-color: var(--ice); color: var(--c-ink); }
.ds-tiles .dc-opt input:checked + .ds-tile .ds-tile-n { color: var(--blue); }
.ds-tiles .dc-opt input:checked + .ds-tile .ds-tile-ico { color: var(--c-ink); }
@media (min-width: 900px) { .ds-tile { min-height: 9.5rem; } }

.ds-results { position: relative; }
@media (min-width: 900px) { .ds-results { position: sticky; top: 1.5rem; } }
.ds-empty { display: grid; place-items: center; min-height: 12rem; padding: 1.5rem; border: 1px dashed rgba(238, 244, 248, 0.3); font-family: var(--f-mono); font-size: 0.88rem; line-height: 1.6; color: var(--night-ink-2); text-align: center; }
.ds-ticket {
  --z: 7px;
  gap: 1rem; padding: 1.3rem 1.15rem 2.2rem; background: #fff; color: var(--c-ink);
  -webkit-mask: conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / calc(2 * var(--z)) 100%;
  mask: conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / calc(2 * var(--z)) 100%;
}
.dc .ds-ticket { animation: ds-ticket 0.3s cubic-bezier(0.25, 0.85, 0.3, 1) both; }
@keyframes ds-ticket { from { transform: translateY(14px); opacity: 0; } }
@media (min-width: 900px) { .ds-ticket { padding: 2rem 2rem 2.8rem; } }
.ds-ticket-head { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding-bottom: 0.7rem; border-bottom: 1px dashed var(--ice-2); font-family: var(--f-mono); font-size: 0.72rem; letter-spacing: 0.12em; color: var(--c-ink-2); }
.ds-ticket-title { font-family: var(--f-mono); font-size: 0.85rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--blue); }
.ds-price { margin-top: -0.6rem; font-size: clamp(2.1rem, 9.5vw, 3.2rem); line-height: 1.02; font-weight: 600; letter-spacing: -0.035em; }
.ds-note { padding: 0.75rem 0.9rem; background: var(--ice); font-size: 0.95rem; line-height: 1.4; }
.ds-calm { font-size: 1.45rem; line-height: 1.35; max-width: 24ch; }

/* Шкала визитов */
.ds-tl { display: grid; gap: 0.5rem; padding: 0.9rem 0 0.2rem; border-top: 1px solid var(--c-ink); }
.ds-tl-track { position: relative; height: 1.5rem; margin: 0.4rem 0.45rem 0; }
.ds-tl-track::before { content: ''; position: absolute; left: 0; right: 0; top: 50%; height: 2px; background: var(--ice-2); }
.ds-tl-short::before { display: none; }
.ds-tl-tick { position: absolute; top: 50%; width: 1px; height: 0.55rem; margin-top: -0.275rem; background: var(--ice-2); }
.ds-tl-short .ds-tl-tick { display: none; }
.ds-tl-dot { position: absolute; top: 50%; width: 0.62rem; height: 0.62rem; margin: -0.31rem 0 0 -0.31rem; border-radius: 50%; background: var(--c-ink); box-shadow: 0 0 0 2px #fff; animation: ds-dot 0.3s ease both; animation-delay: calc(var(--i) * 0.035s + 0.15s); }
.ds-tl-short .ds-tl-dot { position: relative; display: inline-block; top: auto; margin: 0.3rem 0.5rem 0 0; left: auto !important; }
@keyframes ds-dot { from { transform: scale(0); } }
.ds-tl-scale { display: flex; justify-content: space-between; font-family: var(--f-mono); font-size: 0.7rem; color: var(--c-ink-2); }
.ds-tl-cap { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.25rem 1rem; font-family: var(--f-mono); font-size: 0.85rem; }
.ds-tl-cap span:last-child { font-weight: 500; }

/* Рассрочка */
.ds-plan { display: grid; gap: 0.75rem; padding: 1rem; background: var(--ice); }
.ds-plan .chip { background: #fff; }
.ds-bars { display: flex; gap: 3px; height: 1.6rem; margin: 0.15rem 0 0.6rem; }
.ds-bars i { flex: 1; background: var(--c-ink); transform-origin: bottom; animation: ds-bar 0.35s ease both; animation-delay: calc(var(--i) * 0.03s); }
@keyframes ds-bar { from { transform: scaleY(0); } }
.ds-monthly { font-size: 1.45rem; font-weight: 600; letter-spacing: -0.02em; }
.ds-monthly .dc-per { font-size: 0.9rem; font-weight: 400; color: var(--c-ink-2); }

/* ---------- Первый визит ---------- */
.ds-steps { display: grid; gap: 0; border-top: 1px solid var(--c-ink); }
.ds-steps li { display: grid; grid-template-columns: 5.2rem minmax(0, 1fr); gap: 1rem; padding: 1.6rem 0; border-bottom: 1px solid var(--c-line); }
.ds-step-n { font-family: var(--f-mono); font-size: 3.6rem; line-height: 0.85; font-weight: 500; color: transparent; -webkit-text-stroke: 1.2px var(--blue); }
@media (min-width: 900px) {
  .ds-steps { grid-template-columns: repeat(4, minmax(0, 1fr)); border-top: 0; gap: 1.5rem; }
  .ds-steps li { grid-template-columns: 1fr; border-top: 1px solid var(--c-ink); border-bottom: 0; padding-top: 1.5rem; }
  .ds-step-n { font-size: 5.5rem; margin-bottom: 1rem; }
}

/* ---------- Купоны ---------- */
.ds-coupons { display: grid; gap: 1rem; }
@media (min-width: 768px) { .ds-coupons { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.5rem; } }
.ds-coupon {
  position: relative; display: grid; gap: 0.4rem; padding: 1.6rem 1.5rem 1.4rem; background: #fff;
  -webkit-mask: radial-gradient(circle 0.8rem at 0 62%, #0000 98%, #000) left / 51% 100% no-repeat, radial-gradient(circle 0.8rem at 100% 62%, #0000 98%, #000) right / 51% 100% no-repeat;
  mask: radial-gradient(circle 0.8rem at 0 62%, #0000 98%, #000) left / 51% 100% no-repeat, radial-gradient(circle 0.8rem at 100% 62%, #0000 98%, #000) right / 51% 100% no-repeat;
}
.ds-coupon-n { font-family: var(--f-mono); font-size: 0.75rem; color: var(--blue); letter-spacing: 0.1em; }
.ds-coupon-big { font-size: clamp(2.6rem, 12.5vw, 4.6rem); line-height: 1; font-weight: 600; letter-spacing: -0.045em; white-space: nowrap; }
.ds-coupon-text { font-size: 1.2rem; padding-bottom: 1rem; border-bottom: 1.5px dashed var(--ice-2); }
.ds-coupon-src { padding-top: 0.6rem; font-family: var(--f-mono); font-size: 0.78rem; color: var(--c-ink-2); }

/* ---------- Как добраться ---------- */
.ds-metro { display: block; width: 100%; max-width: 30rem; height: auto; margin: 2rem 0 1.25rem; }
.ds-metro-line { stroke: var(--ice-2); stroke-width: 6; stroke-linecap: round; fill: none; }
.ds-metro-st { fill: var(--night); stroke: var(--night-ink); stroke-width: 2.5; }
.ds-metro-m { fill: var(--night-ink); font-family: var(--f-body); }
.ds-metro-label { fill: var(--night-ink-2); font-family: var(--f-mono); }
.ds-metro-path { fill: none; stroke: var(--night-ink-2); stroke-width: 1.5; stroke-dasharray: 3 4; }
.ds-metro-pin { fill: var(--ice); }
.ds-metro-pin-t { fill: var(--c-ink); font-family: var(--f-body); }
.ds-facts { display: grid; margin-top: 2rem; border-top: 1px solid rgba(238, 244, 248, 0.2); }
.ds-facts > div { display: grid; gap: 0.35rem; padding: 1rem 0; border-bottom: 1px solid rgba(238, 244, 248, 0.12); }
@media (min-width: 768px) { .ds-facts > div { grid-template-columns: 12rem 1fr; } }
.ds-dark .ds-mono-label { color: var(--night-ink-2); }
.ds-facts dd { font-size: 1.1rem; }
.ds-btn-ice { background: var(--ice); color: var(--c-ink); }
.ds-btn-line { background: transparent; color: var(--night-ink); box-shadow: inset 0 0 0 1px rgba(238, 244, 248, 0.4); }
@media (hover: hover) { .concept .ds-btn-ice:hover { background: #fff; } .concept .ds-btn-line:hover { background: rgba(238, 244, 248, 0.08); } }
.ds-dark :focus-visible { outline-color: var(--ice-2); }

/* ---------- Запись ---------- */
.ds-form-slip { padding: 1.4rem 1.15rem 1.6rem; border: 1px solid var(--c-ink); background: #fff; }
@media (min-width: 900px) { .ds-form-slip { padding: 2.2rem; } }

/* ---------- OG ---------- */
.ds-og { background: var(--ice); }
.ds-feed-still .ds-slip-shadow { animation: none; }
.ds-slip-og { padding: 26px 26px 150px; }
.ds-slip-og .ds-slip-head { font-size: 15px; }
.ds-slip-og .ds-name { font-size: 140px; }
.ds-slip-og .ds-slip-line { font-size: 19px; padding: 8px 0; }
.ds-slip-og .ds-slip-val { font-size: 21px; }
.ds-stamp-og { position: absolute; right: 1.5rem; bottom: 2.2rem; width: 9rem; transform: rotate(-14deg); opacity: 0.85; mix-blend-mode: multiply; }

@media (prefers-reduced-motion: reduce) {
  .ds-slip-shadow, .ds-stamp-hero, .dc .ds-ticket, .ds-tl-dot, .ds-bars i { animation: none; }
}
`

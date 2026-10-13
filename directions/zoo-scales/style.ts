/**
 * zoo-scales: аптечный зелёный и жёлтый ценник на тёплой бумаге; округлый Comfortaa, текст Fira Sans.
 * Зооцентр: в первом экране — напольные весы с питомцем; стрелка и питомец следуют за ползунком подбора,
 * средства от блох — жёлтые ценники на рейке, витрина — полки с ценниками на нитках, отложенное — крафтовый пакет.
 */
export const css = /* css */ `
.concept[data-direction='zoo-scales'] {
  --c-bg: #f6f3ea;
  --c-bg-2: #ece6d6;
  --c-surface: #fffdf7;
  --c-ink: #102a24;
  --c-ink-2: #4d5e58;
  --c-accent: #0d6b55;
  --c-accent-ink: #fffdf7;
  --c-accent-2: #ffd23f;
  --c-line: #d4cbb6;
  --c-focus: #0d6b55;
  --c-field: #fffdf7;
  --green: #0d6b55;
  --deep: #0a4f40;
  --soft: #cfe6dc;
  --soft-2: #9fcfbd;
  --tag: #ffd23f;
  --tag-2: #ffe27a;
  --paper: #fffdf7;
  --kraft: #e9d9b8;
  --f-display: var(--font-comfortaa), system-ui, sans-serif;
  --f-body: var(--font-fira-sans), system-ui, sans-serif;
  --radius-btn: 999px;
  --radius-chip: 999px;
  --radius-field: 0.8rem;
  --spring: cubic-bezier(0.3, 1.5, 0.5, 1);
}
[data-direction='zoo-scales'] .btn { font-weight: 600; }
.zs-wrap { max-width: 72rem; margin: 0 auto; }
.zs-h2 { font-family: var(--f-display); font-size: clamp(2.1rem, 9vw, 3.9rem); line-height: 1.05; font-weight: 700; letter-spacing: -0.02em; color: var(--green); }
.zs-lead { max-width: 36rem; font-size: 1.08rem; line-height: 1.55; color: var(--c-ink-2); }
.zs-label { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--c-ink-2); }
.zs-small { font-size: 0.9rem; line-height: 1.5; color: var(--c-ink-2); }

/* Заливки рисунков */
.zs-f-main { fill: var(--green); }
.zs-f-deep { fill: var(--deep); }
.zs-f-paper { fill: var(--paper); }
.zs-f-ink { fill: var(--c-ink); }
.zs-f-tag { fill: var(--tag); }
.zs-s-main { fill: none; stroke: var(--green); stroke-width: 6; stroke-linecap: round; }
.zs-s-ink { fill: none; stroke: var(--c-ink); stroke-width: 1.2; stroke-linecap: round; }
.zs-blink { transform-box: fill-box; transform-origin: center; animation: zs-blink 5.5s ease-in-out infinite; }
@keyframes zs-blink { 0%, 93%, 100% { transform: none; } 96% { transform: scaleY(0.1); } }

/* ---------- Весы ---------- */
.zs-scales { display: block; width: 100%; height: auto; overflow: visible; }
.zs-rim { fill: var(--green); }
.zs-face { fill: var(--paper); }
.zs-band { fill: none; stroke-width: 9; }
.zs-band-0 { stroke: var(--soft); }
.zs-band-1 { stroke: var(--soft-2); }
:root[data-ps-band='0'] .zs-band:nth-of-type(1), :root[data-ps-band='1'] .zs-band:nth-of-type(2), :root[data-ps-band='2'] .zs-band:nth-of-type(3),
:root[data-ps-band='3'] .zs-band:nth-of-type(4), :root[data-ps-band='4'] .zs-band:nth-of-type(5), :root[data-ps-band='5'] .zs-band:nth-of-type(6) { stroke: var(--tag); }
.zs-band { transition: stroke 0.3s ease; }
.zs-tick { stroke: var(--c-ink); stroke-width: 1; }
.zs-tick-major { stroke-width: 2.2; }
.zs-tick-t { font-family: var(--f-display); font-size: 11px; font-weight: 700; fill: var(--c-ink); }
.zs-dial-kg { font-family: var(--f-display); font-size: 15px; font-weight: 700; fill: var(--green); }
.zs-ticks-cat, .zs-only-cat { display: none; }
:root[data-ps-pet='cat'] .zs-ticks-cat, :root[data-ps-pet='cat'] .zs-only-cat { display: inline; }
:root[data-ps-pet='cat'] .zs-ticks-dog, :root[data-ps-pet='cat'] .zs-only-dog { display: none; }
.zs-needle { transform-box: view-box; transform-origin: 150px 112px; transform: rotate(calc(-130deg + var(--ps-w, var(--w0)) * 260deg)); transition: transform 0.7s var(--spring); animation: zs-needle 1.5s cubic-bezier(0.3, 1.35, 0.5, 1) 0.35s backwards; }
@keyframes zs-needle { from { transform: rotate(-130deg); } }
.zs-needle-p { filter: drop-shadow(0 1px 0 rgba(16, 42, 36, 0.35)); }
.zs-on-scale { transform-box: view-box; transform-origin: 220px 272px; transform: scale(calc(0.72 + var(--ps-w, var(--w0)) * 0.5)); transition: transform 0.6s var(--spring); animation: zs-hop 0.7s var(--spring) 0.2s backwards; }
@keyframes zs-hop { from { transform: translateY(-60px) scale(0.8); } }
.zs-hang { transform-box: view-box; transform-origin: 66px 172px; animation: zs-sway 3.4s ease-in-out infinite alternate; }
@keyframes zs-sway { from { transform: rotate(6deg); } to { transform: rotate(-6deg); } }
.zs-string { fill: none; stroke: var(--c-ink); stroke-width: 1.4; }
.zs-hang-t { font-family: var(--f-body); font-size: 9px; font-weight: 600; fill: var(--c-ink); }
.zs-hang-p { font-family: var(--f-display); font-size: 12.5px; font-weight: 700; fill: var(--c-ink); }
.zs-still .zs-needle, .zs-still .zs-on-scale, .zs-still .zs-hang { animation: none; }

/* ---------- Первый экран ---------- */
.zs-hero { position: relative; background: var(--c-bg); padding: 0 1rem 2.75rem; overflow: hidden; }
.zs-top { max-width: 72rem; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; min-height: 3.25rem; font-size: 0.88rem; color: var(--c-ink-2); }
.zs-lang a { padding: 0 1rem; border-radius: 999px; background: var(--paper); box-shadow: inset 0 0 0 1px var(--c-line); text-decoration: none; font-weight: 600; color: var(--c-ink); }
.zs-hero-grid { max-width: 72rem; margin: 0 auto; display: grid; grid-template-columns: minmax(0, 1fr); grid-template-areas: 'head' 'art' 'copy'; gap: 1rem; padding-top: 0.75rem; }
.zs-hero-grid > :nth-child(1) { grid-area: head; }
.zs-hero-grid > :nth-child(3) { grid-area: copy; }
.zs-kicker { min-height: 2.5em; font-size: 0.8rem; line-height: 1.25; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--green); }
@media (min-width: 900px) { .zs-kicker { min-height: 0; } }
.zs-name { margin-top: 0.4rem; font-family: var(--f-display); font-weight: 700; font-size: clamp(3.3rem, 16.5vw, 7.4rem); line-height: 0.95; letter-spacing: -0.035em; color: var(--green); }
.zs-art { grid-area: art; position: relative; width: 100%; max-width: 21rem; margin: 0 auto; }
.zs-art::before { content: ''; position: absolute; left: 4%; right: 4%; top: 2%; aspect-ratio: 1; border-radius: 50%; background: var(--soft); animation: zs-pop 0.8s var(--spring) both; }
@keyframes zs-pop { from { transform: scale(0.5); } }
.zs-art .zs-scales { position: relative; }
.zs-statement { max-width: 32rem; font-size: 1.15rem; line-height: 1.55; }
.zs-statement b { font-weight: 600; background: var(--tag); padding: 0 0.25em; border-radius: 0.25em; -webkit-box-decoration-break: clone; box-decoration-break: clone; }
.zs-cta { display: grid; gap: 0.75rem; margin-top: 1.5rem; }
.zs-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1.25rem; }
.zs-chips li { display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.45rem 0.85rem; border-radius: 999px; background: var(--paper); box-shadow: inset 0 0 0 1px var(--c-line); font-size: 0.92rem; font-weight: 600; color: var(--green); }
@media (min-width: 640px) { .zs-cta { display: flex; flex-wrap: wrap; } }
@media (min-width: 900px) {
  .zs-hero { padding: 0 2rem 4.5rem; }
  .zs-hero-grid { grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); grid-template-areas: 'head art' 'copy art'; column-gap: 4rem; row-gap: 1.5rem; align-items: end; padding-top: 2.5rem; }
  .zs-hero-grid > :nth-child(3) { align-self: start; }
  .zs-art { max-width: 32rem; align-self: center; }
}

/* ---------- Секции ---------- */
.zs-sec { padding: 4.5rem 1rem 5rem; background: var(--c-bg); }
.zs-sec-2 { background: var(--c-bg-2); }
.zs-sec-green { background: var(--green); color: var(--paper); }
.zs-sec-green .zs-h2 { color: var(--paper); }
.zs-sec-green .zs-lead { color: #d7ece3; }
.zs-sec-green :focus-visible { outline-color: var(--tag); }
@media (min-width: 900px) { .zs-sec { padding: 7rem 2rem; } }

/* ---------- Подбор по весу ---------- */
/* minmax(0, 1fr): лента ценников прокручивается внутри и не раздвигает колонку */
.zs-scale { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2rem; }
@media (min-width: 900px) {
  .zs-scale { grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr); grid-template-areas: 'controls rail' 'controls caution'; column-gap: 3rem; align-items: start; }
  .zs-controls { grid-area: controls; position: sticky; top: 1.5rem; }
  .zs-rail { grid-area: rail; }
  .zs-caution { grid-area: caution; }
}
.zs-controls { display: grid; gap: 1.5rem; padding: 1.25rem 1.25rem 1.6rem; border-radius: 1.5rem; background: var(--paper); box-shadow: inset 0 0 0 1px var(--c-line); }
.zs-pets { display: flex; flex-wrap: wrap; gap: 0.6rem; }
.zs-pets legend { margin-bottom: 0.6rem; }
.zs-pet-btn { display: inline-flex; align-items: center; gap: 0.6rem; min-height: 3.5rem; padding: 0.35rem 1.3rem 0.35rem 0.4rem; border-radius: 999px; box-shadow: inset 0 0 0 2px var(--c-line); font-size: 1.05rem; font-weight: 600; cursor: pointer; transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease; }
.zs-pet-ico { width: 2.75rem; height: 2.75rem; padding: 0.2rem; border-radius: 50%; background: var(--c-bg-2); }
.zs-pets input:checked + .zs-pet-btn { background: var(--green); color: var(--paper); box-shadow: none; }
.zs-pets input:checked + .zs-pet-btn .zs-pet-ico { background: var(--paper); animation: zs-wiggle 0.5s var(--spring); }
@keyframes zs-wiggle { 30% { transform: rotate(-12deg) scale(1.1); } 60% { transform: rotate(8deg); } }
.zs-pets input:focus-visible + .zs-pet-btn { outline: 2px solid var(--green); outline-offset: 3px; }
.zs-pets label:active .zs-pet-btn { transform: scale(0.97); }
@media (hover: hover) { .zs-pets label:hover .zs-pet-btn { box-shadow: inset 0 0 0 2px var(--green); } }
.zs-readout { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 0.5rem 1rem; }
.zs-kg { font-family: var(--f-display); font-size: 1.4rem; font-weight: 700; }
.zs-kg b { font-size: clamp(3.4rem, 15vw, 4.6rem); line-height: 1; letter-spacing: -0.03em; color: var(--green); }
.zs-band-chip { padding: 0.45rem 0.95rem; border-radius: 999px; background: var(--tag); font-size: 1rem; }
.zs-band-chip .zs-label { color: var(--c-ink); }
.zs-band-chip b { font-weight: 700; white-space: nowrap; }

/* Линейка весов: цветные группы, активная — жёлтая; ползунок-гиря поверх */
.zs-ruler { position: relative; height: 4.6rem; }
.zs-ruler-bands { position: absolute; left: 1rem; right: 1rem; top: 2rem; height: 1.2rem; }
.zs-seg { position: absolute; top: 0; bottom: 0; background: var(--soft); transition: background-color 0.25s ease; }
.zs-seg-1 { background: var(--soft-2); }
.zs-seg:first-child { border-radius: 0.6rem 0 0 0.6rem; }
.zs-seg:last-child { border-radius: 0 0.6rem 0.6rem 0; }
.zs-seg i { position: absolute; right: 0; top: -1.55rem; transform: translateX(50%); font-style: normal; font-size: 0.78rem; font-weight: 600; color: var(--c-ink-2); }
.ps[data-band='0'] .zs-seg:nth-child(1), .ps[data-band='1'] .zs-seg:nth-child(2), .ps[data-band='2'] .zs-seg:nth-child(3),
.ps[data-band='3'] .zs-seg:nth-child(4), .ps[data-band='4'] .zs-seg:nth-child(5), .ps[data-band='5'] .zs-seg:nth-child(6) { background: var(--tag); }
.zs-ruler .ps-range { position: absolute; left: 0; right: 0; top: 1.4rem; width: 100%; height: 2.4rem; margin: 0; background: transparent; -webkit-appearance: none; appearance: none; cursor: pointer; touch-action: pan-y; }
.ps-range::-webkit-slider-runnable-track { height: 2.4rem; background: transparent; }
.ps-range::-moz-range-track { height: 2.4rem; background: transparent; }
.ps-range::-webkit-slider-thumb { -webkit-appearance: none; width: 2rem; height: 2.4rem; border-radius: 0.5rem 0.5rem 0.9rem 0.9rem; background: var(--green); border: 3px solid var(--paper); box-shadow: 0 4px 10px rgba(16, 42, 36, 0.3); }
.ps-range::-moz-range-thumb { width: 2rem; height: 2.4rem; border-radius: 0.5rem 0.5rem 0.9rem 0.9rem; background: var(--green); border: 3px solid var(--paper); box-shadow: 0 4px 10px rgba(16, 42, 36, 0.3); }
.ps-range:focus-visible { outline: 2px solid var(--green); outline-offset: 4px; border-radius: 0.6rem; }

/* Рейка с ценниками */
.zs-rail { position: relative; }
.zs-tags { position: relative; display: flex; gap: 1rem; margin: 0 -1rem; padding: 1.9rem 1rem 1rem; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; background: linear-gradient(var(--deep), var(--deep)) 0 0.5rem / 100% 4px no-repeat local; }
.zs-tags::-webkit-scrollbar { display: none; }
.zs-tag, .zs-ptag { position: relative; isolation: isolate; display: flex; flex-direction: column; gap: 0.5rem; scroll-snap-align: center; transform-origin: 50% -1.4rem; }
.zs-tag::before, .zs-ptag::before { content: ''; position: absolute; left: 50%; top: -1.4rem; width: 1.5px; height: 2.25rem; background: var(--c-ink); }
.zs-tag::after, .zs-ptag::after { content: ''; position: absolute; inset: 0; z-index: -1; border-radius: 0.5rem; clip-path: polygon(22% 0, 78% 0, 100% 9%, 100% 100%, 0 100%, 0 9%); }
.zs-tag { flex: 0 0 76%; padding: 2.2rem 1.15rem 1.15rem; }
.zs-tag::after { background: var(--tag); }
.zs-tag-hole { position: absolute; top: 0.6rem; left: 50%; width: 0.8rem; height: 0.8rem; margin-left: -0.4rem; border-radius: 50%; background: var(--c-bg); box-shadow: inset 0 0 0 2px rgba(16, 42, 36, 0.25); }
.zs-tag-name { font-family: var(--f-display); font-size: 1.2rem; font-weight: 700; line-height: 1.2; }
.zs-tag-for { font-size: 0.95rem; }
.zs-tag-for b { white-space: nowrap; }
.zs-tag-note { font-size: 0.9rem; line-height: 1.4; }
.zs-tag-price { margin-top: auto; padding-top: 0.4rem; font-family: var(--f-display); font-size: 1.75rem; font-weight: 700; letter-spacing: -0.02em; }
.ps[data-swing] .zs-tag { animation: zs-tagswing 1.1s ease-out both; animation-delay: calc(var(--i) * 0.07s); }
@keyframes zs-tagswing { 20% { transform: rotate(7deg); } 45% { transform: rotate(-5deg); } 70% { transform: rotate(2.5deg); } 100% { transform: none; } }
@media (min-width: 640px) { .zs-tag { flex-basis: 46%; } }
@media (min-width: 900px) {
  .zs-tags { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); margin: 0; padding: 1.9rem 0 0; overflow: visible; }
  .zs-tag { min-height: 21rem; }
}
.zs-caution { max-width: 40rem; padding-left: 0.9rem; border-left: 3px solid var(--tag); font-size: 0.92rem; line-height: 1.5; color: var(--c-ink-2); }

/* «Отложить» */
.zs-add { display: inline-flex; align-items: center; gap: 0.35rem; min-height: 2.75rem; padding: 0 1rem; border-radius: 999px; background: var(--c-ink); color: var(--tag); font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease; }
.zs-add[data-added] { background: var(--green); color: var(--paper); }
.zs-add:active { transform: scale(0.96); }
@media (hover: hover) { .concept .zs-add:hover { background: var(--deep); color: var(--paper); } }

/* ---------- Витрина: полки ---------- */
.zs-shelf + .zs-shelf { margin-top: 2.5rem; }
.zs-shelf-t { font-family: var(--f-display); font-size: 1.35rem; font-weight: 700; }
.zs-shelf-rail { display: flex; gap: 1rem; margin: 0 -1rem; padding: 1.9rem 1rem 1.25rem; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; background: linear-gradient(var(--deep), var(--deep)) 0 0.5rem / 100% 4px no-repeat local; }
.zs-shelf-rail::-webkit-scrollbar { display: none; }
.zs-ptag { flex: 0 0 64%; max-width: 16rem; min-height: 13rem; padding: 2.1rem 1rem 1rem; gap: 0.35rem; filter: drop-shadow(0 6px 10px rgba(16, 42, 36, 0.1)); scroll-snap-align: start; }
.zs-ptag::after { background: var(--paper); }
.zs-ptag:nth-child(3n + 2)::after { background: #f2fbf7; }
.zs-ptag-name { font-size: 1.02rem; font-weight: 600; line-height: 1.3; }
.zs-ptag-size { font-size: 0.9rem; color: var(--c-ink-2); }
.zs-ptag-price { margin-top: 0.3rem; font-family: var(--f-display); font-size: 1.45rem; font-weight: 700; letter-spacing: -0.02em; color: var(--green); }
.zs-ptag:active { animation: zs-tagswing 1s ease-out; }
@media (hover: hover) { .zs-ptag:hover { animation: zs-tagswing 1s ease-out; } }
@media (min-width: 900px) {
  .zs-shelf-rail { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); margin: 0; padding: 1.9rem 0 0.5rem; overflow: visible; }
  .zs-ptag { max-width: none; }
}

/* ---------- Ветврач ---------- */
.zs-clinic { display: grid; gap: 1.5rem; align-items: center; }
.zs-clinic-art { width: 8.5rem; }
.zs-sec-green .zs-f-main { fill: var(--paper); }
.zs-sec-green .zs-f-deep { fill: var(--soft-2); }
.zs-sec-green .zs-s-main { stroke: var(--paper); }
.zs-btn-tag { background: var(--tag); color: var(--c-ink); }
@media (hover: hover) { .concept .zs-btn-tag:hover { background: var(--tag-2); } }
@media (min-width: 900px) { .zs-clinic { grid-template-columns: 13rem minmax(0, 1fr); gap: 3rem; } .zs-clinic-art { width: 12rem; } }

/* ---------- Отложенное: крафтовый пакет ---------- */
.zs-order { display: grid; gap: 2.5rem; }
@media (min-width: 900px) { .zs-order { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 4rem; align-items: start; } }
.zs-bag { position: relative; margin-top: 3.8rem; padding: 2.2rem 1.2rem 1.4rem; border-radius: 0.3rem 0.3rem 1.1rem 1.1rem; background: var(--kraft); }
.zs-bag::before { content: ''; position: absolute; left: 0; right: 0; top: -9px; height: 10px; background: var(--kraft); -webkit-mask: conic-gradient(from 135deg at top, #0000, #000 1deg 89deg, #0000 90deg) 50% / 18px 100%; mask: conic-gradient(from 135deg at top, #0000, #000 1deg 89deg, #0000 90deg) 50% / 18px 100%; }
.zs-bag-handle { position: absolute; left: 50%; top: -3.2rem; width: 6.5rem; height: 3.4rem; margin-left: -3.25rem; border: 6px solid #c9b38a; border-bottom: 0; border-radius: 3.4rem 3.4rem 0 0; }
.zs-bag-count { position: absolute; top: 0.8rem; right: 0.9rem; }
.zs-bag .ps-count { display: inline-grid; place-items: center; min-width: 2.2rem; height: 2.2rem; padding: 0 0.5rem; border-radius: 999px; background: var(--green); color: var(--paper); font-family: var(--f-display); font-weight: 700; }
.ps-cart-empty { max-width: 24rem; padding-right: 2.5rem; font-size: 1rem; line-height: 1.5; }
.ps-cart-list { display: grid; }
.ps-cart-item { display: grid; grid-template-columns: minmax(0, 1fr) auto auto; gap: 0.5rem; align-items: center; padding: 0.45rem 0; border-bottom: 1px dashed rgba(16, 42, 36, 0.3); animation: zs-in 0.3s ease both; }
.ps-cart-item:first-child { padding-right: 2.5rem; }
@keyframes zs-in { from { opacity: 0; transform: translateY(-6px); } }
.ps-cart-name { font-size: 0.95rem; line-height: 1.35; }
.ps-cart-price { font-weight: 600; white-space: nowrap; }
.ps-cart-remove { display: grid; place-items: center; width: 2.75rem; height: 2.75rem; border-radius: 50%; color: var(--c-ink); cursor: pointer; transition: background-color 0.2s ease; }
@media (hover: hover) { .ps-cart-remove:hover { background: rgba(16, 42, 36, 0.1); } }
.ps-cart-total { display: flex; justify-content: space-between; gap: 1rem; margin-top: 0.9rem; font-family: var(--f-display); font-size: 1.3rem; font-weight: 700; }
.zs-form { padding: 1.4rem 1.15rem 1.6rem; border-radius: 1.5rem; background: var(--paper); box-shadow: inset 0 0 0 1px var(--c-line); }
@media (min-width: 900px) { .zs-form { padding: 2.2rem; } }
.sticky-bar .ps-count { font-weight: 700; }

/* ---------- Адрес ---------- */
.zs-where { display: grid; gap: 2.5rem; }
@media (min-width: 900px) { .zs-where { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 4rem; align-items: end; } }
.zs-street { margin-top: 0.5rem; font-family: var(--f-display); font-size: clamp(2.5rem, 11.5vw, 5rem); line-height: 1; font-weight: 700; letter-spacing: -0.03em; color: var(--green); }
.zs-where-facts > div { display: grid; gap: 0.4rem; padding: 1.1rem 0; border-top: 1px solid var(--c-line); }
.zs-where-facts dd { font-size: 1.08rem; }
.zs-tel { display: inline-flex; align-items: center; min-height: 2.75rem; font-family: var(--f-display); font-size: clamp(1.45rem, 6.6vw, 2rem); font-weight: 700; color: var(--c-ink); text-decoration: none; transition: color 0.2s ease; }
.zs-link { display: inline-flex; align-items: center; min-height: 2.75rem; color: var(--green); font-weight: 600; text-decoration: underline; text-underline-offset: 4px; }
@media (hover: hover) { .concept .zs-tel:hover { color: var(--green); } }

/* ---------- OG ---------- */
.zs-og { padding: 0; }
.zs-og .zs-art::before { animation: none; }

@media (prefers-reduced-motion: reduce) {
  .zs-blink, .zs-needle, .zs-on-scale, .zs-hang, .zs-art::before, .ps[data-swing] .zs-tag, .zs-ptag:hover, .zs-ptag:active,
  .zs-pets input:checked + .zs-pet-btn .zs-pet-ico, .ps-cart-item { animation: none; }
  .zs-needle, .zs-on-scale, .zs-seg, .zs-pet-btn, .zs-add { transition: none; }
}
`

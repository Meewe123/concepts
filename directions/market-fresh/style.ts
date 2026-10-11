/** market-fresh: свежий зелёный, оранжевый ценник, белый. Клиника и магазин: цены — ценниками-стикерами. */
export const css = /* css */ `
.concept[data-direction='market-fresh'] {
  --c-bg: #ffffff;
  --c-bg-2: #eef8f1;
  --c-surface: #ffffff;
  --c-ink: #13241a;
  --c-ink-2: #4b5c51;
  --c-accent: #13804a;
  --c-accent-ink: #ffffff;
  --c-line: rgba(19, 36, 26, 0.14);
  --c-focus: #13804a;
  --c-field: #ffffff;
  --green: #13804a;
  --mint: #dcf3e4;
  --orange: #ff7a1a;
  --f-display: var(--font-commissioner), system-ui, sans-serif;
  --f-body: var(--font-commissioner), system-ui, sans-serif;
  --radius-btn: 12px;
  --radius-chip: 10px;
  --radius-field: 10px;
}
[data-direction='market-fresh'] .btn { font-weight: 700; }
[data-direction='market-fresh'] input:checked + .chip { background: var(--green); border-color: var(--green); color: #fff; }

/* Ценник: срезанный угол и дырочка под нитку */
.mf-tag {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.8rem 0.4rem 1.6rem;
  background: var(--orange);
  color: var(--c-ink);
  font-weight: 800;
  white-space: nowrap;
  clip-path: polygon(0.8rem 0, 100% 0, 100% 100%, 0.8rem 100%, 0 50%);
  border-radius: 0 6px 6px 0;
}
.mf-tag::before {
  content: '';
  position: absolute;
  left: 0.7rem;
  top: 50%;
  width: 0.42rem;
  height: 0.42rem;
  margin-top: -0.21rem;
  border-radius: 50%;
  background: var(--c-bg);
}
.mf-tag-green { background: var(--green); color: #fff; }
.mf-tag-white { background: #fff; box-shadow: inset 0 0 0 2px var(--c-ink); }
.mf-swing { transform-origin: 50% -2.5rem; animation: mf-swing 2.2s cubic-bezier(0.3, 1.4, 0.5, 1) both; animation-delay: var(--d, 0s); }
@keyframes mf-swing { 0% { transform: rotate(var(--r0, 18deg)); opacity: 0; } 15% { opacity: 1; } 100% { transform: rotate(var(--r, 0deg)); opacity: 1; } }

/* Питомец-силуэт */
.mf-pet .mf-bg { fill: var(--mint); }
.mf-pet .mf-fill { fill: var(--green); }
.mf-pet .mf-line { stroke: var(--green); fill: none; stroke-linecap: round; }
[data-pet='cat'] .mf-pet .mf-dog, [data-pet='dog'] .mf-pet .mf-cat { opacity: 0; }
.mf-pet .mf-cat, .mf-pet .mf-dog { transition: opacity 0.35s ease; }

/* Календарь как чек */
[data-direction='market-fresh'] .vax-row { border-top-style: dashed; }
[data-direction='market-fresh'] .vax-row[data-state='next'] .vax-when { color: var(--green); font-weight: 700; }
[data-direction='market-fresh'] .vax-row[data-state='next'] .vax-title { color: var(--green); }
[data-direction='market-fresh'] .vax-age { font-size: 1.6rem; font-weight: 800; }

@media (prefers-reduced-motion: reduce) {
  .mf-swing { animation: none; transform: rotate(var(--r, 0deg)); }
}
`

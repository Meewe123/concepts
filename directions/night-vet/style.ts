/** night-vet: тёмный графит, янтарный свет. «Мы открыты ночью» — свет в окне. */
export const css = /* css */ `
.concept[data-direction='night-vet'] {
  --c-bg: #111316;
  --c-bg-2: #16191d;
  --c-surface: #1c2025;
  --c-ink: #f2ece1;
  --c-ink-2: #aaa59a;
  --c-accent: #ffb547;
  --c-accent-ink: #111316;
  --c-line: rgba(242, 236, 225, 0.14);
  --c-focus: #ffb547;
  --c-field: #16191d;
  --amber: #ffb547;
  --f-display: var(--font-tektur), system-ui, sans-serif;
  --f-body: var(--font-source-code), ui-monospace, monospace;
  --radius-btn: 4px;
  --radius-chip: 4px;
  --radius-field: 4px;
  font-size: 0.95rem;
}
[data-direction='night-vet'] .btn { font-family: var(--f-display); font-weight: 600; letter-spacing: 0.02em; }
[data-direction='night-vet'] .btn:not(.btn-ghost) { box-shadow: 0 0 28px -6px rgba(255, 181, 71, 0.6); }
[data-direction='night-vet'] input:checked + .chip { background: var(--amber); border-color: var(--amber); color: var(--c-bg); }
.nv-amber { color: var(--amber); }
.nv-glow-text { text-shadow: 0 0 18px rgba(255, 181, 71, 0.55); }

/* Ночной дом и окно */
.nv-house { fill: #1a1e23; }
.nv-win { fill: #22272e; }
.nv-lit { fill: #ffbf5e; }
.nv-sil { fill: #3a2408; }
.nv-sign { fill: var(--amber); font-family: var(--f-display); }
.nv-flicker { animation: nv-flicker 3.2s linear 0.6s both; }
@keyframes nv-flicker { 0% { opacity: 0.15; } 6% { opacity: 1; } 8% { opacity: 0.3; } 12% { opacity: 1; } 60% { opacity: 1; } 62% { opacity: 0.6; } 64%, 100% { opacity: 1; } }
.nv-halo { animation: nv-breathe 5s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: center; }
@keyframes nv-breathe { from { opacity: 0.75; } to { opacity: 1; } }
[data-pet='cat'] .nv-window .nv-dog, [data-pet='dog'] .nv-window .nv-cat { opacity: 0; }
.nv-window .nv-cat, .nv-window .nv-dog { transition: opacity 0.4s ease; }

/* Календарь как журнал дежурной смены */
[data-direction='night-vet'] .vax-when { color: var(--amber); }
[data-direction='night-vet'] .vax-row[data-state='next'] { border-left: 3px solid var(--amber); padding-left: 0.75rem; }
[data-direction='night-vet'] .vax-row[data-state='past'] .vax-title { color: var(--c-ink-2); }
[data-direction='night-vet'] .vax-age { font-size: 1.6rem; color: var(--amber); }

@media (prefers-reduced-motion: reduce) {
  .nv-flicker, .nv-halo { animation: none; }
}
`

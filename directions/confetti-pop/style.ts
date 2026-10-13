/**
 * confetti-pop: молочный фон, конфетти разных цветов (со вкусом, не цирк), чернильный текст.
 * Конфетти: услуги — цветные «конфетки», длительность — круговая диаграмма, выбор окна — взрыв конфетти.
 */
export const css = /* css */ `
@property --cf-a { syntax: '<angle>'; inherits: true; initial-value: 0deg; }
.concept[data-direction='confetti-pop'] {
  --c-bg: #fbf6ee;
  --c-bg-2: #f4ece0;
  --c-surface: #ffffff;
  --c-ink: #241f33;
  --c-ink-2: #5d566b;
  --c-accent: #241f33;
  --c-accent-ink: #ffffff;
  --c-line: rgba(36, 31, 51, 0.14);
  --c-focus: #e2493f;
  --c-field: #ffffff;
  --cf-coral: #ff6b5b;
  --cf-sun: #ffc23d;
  --cf-mint: #3cc9b0;
  --cf-lilac: #8b7bf2;
  --cf-pink: #ff8fb8;
  --cf-leaf: #4caf6a;
  --f-display: var(--font-unbounded), system-ui, sans-serif;
  --f-body: var(--font-montserrat), system-ui, sans-serif;
  --radius-btn: 999px;
  --radius-chip: 999px;
  --radius-field: 14px;
}
[data-direction='confetti-pop'] .btn { font-family: var(--f-display); font-weight: 600; font-size: 0.95rem; }
[data-direction='confetti-pop'] .btn-ghost { box-shadow: inset 0 0 0 2px var(--c-ink); background: var(--c-bg); }
[data-direction='confetti-pop'] .btn { white-space: nowrap; }
[data-direction='confetti-pop'] .chip { font-weight: 600; background: #fff; }
[data-direction='confetti-pop'] input:checked + .chip { background: var(--c-ink); border-color: var(--c-ink); color: #fff; }
[data-direction='confetti-pop'] .ex-tag { font-weight: 600; }
.cf-wrap { max-width: 72rem; margin: 0 auto; }
.cf-h2 { font-family: var(--f-display); font-size: clamp(2rem, 9vw, 4rem); line-height: 1.02; font-weight: 800; letter-spacing: -0.04em; }
.cf-label { font-family: var(--f-display); font-size: 0.72rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--c-ink-2); }
.cf-small { font-size: 0.85rem; color: var(--c-ink-2); }

/* Конфетти-кусочки */
.cf-pieces { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.cf-piece { position: absolute; transform: rotate(var(--rot)); animation: cf-float var(--dur) ease-in-out var(--del) infinite alternate; }
@keyframes cf-float { to { transform: rotate(calc(var(--rot) + 40deg)) translateY(-8px); } }
.cf-still .cf-piece { animation: none; }

/* ---------- Первый экран ---------- */
.cf-hero { position: relative; isolation: isolate; overflow: hidden; padding: 0 1rem 2.25rem; background: var(--c-bg); touch-action: manipulation; }
.cf-hero-pieces { z-index: -1; }
.cf-top { position: relative; max-width: 72rem; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; min-height: 3.25rem; font-weight: 600; font-size: 0.88rem; }
.cf-lang a { padding: 0 1rem; border-radius: 999px; background: var(--c-ink); color: #fff; text-decoration: none; font-weight: 600; }
.cf-hero-body { position: relative; max-width: 72rem; margin: 0 auto; padding-top: 2.5rem; }
.cf-kicker { display: inline-block; padding: 0.35rem 0.9rem; border-radius: 999px; background: #fff; font-weight: 600; font-size: 0.9rem; box-shadow: 0 6px 18px -12px rgba(36, 31, 51, 0.5); }
.cf-name { margin-top: 1rem; white-space: nowrap; font-family: var(--f-display); font-weight: 800; font-size: clamp(2.6rem, 12.6vw, 9.5rem); line-height: 0.95; letter-spacing: -0.06em; }
.cf-name span { display: inline-block; animation: cf-drop 0.7s cubic-bezier(0.3, 1.6, 0.5, 1) both; animation-delay: calc(0.05s * var(--i)); }
@keyframes cf-drop { from { transform: translateY(-0.5em) rotate(-8deg); opacity: 0; } }
.cf-promise { margin-top: 1.2rem; max-width: 26ch; font-size: 1.25rem; line-height: 1.4; font-weight: 500; }
.cf-promise mark { background: linear-gradient(transparent 55%, var(--cf-sun) 55%, var(--cf-sun) 92%, transparent 92%); color: inherit; padding: 0 0.1em; }
.cf-cta { display: grid; gap: 0.7rem; margin-top: 1.75rem; }
@media (min-width: 640px) { .cf-cta { display: flex; } }
.cf-tap { margin-top: 1.1rem; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.04em; color: var(--c-ink-2); }
@media (min-width: 900px) { .cf-hero { padding: 0 2rem 5rem; } .cf-hero-body { padding-top: 5rem; } .cf-promise { font-size: 1.5rem; } }

/* ---------- Секции ---------- */
.cf-sec { padding: 4rem 1rem 4.5rem; }
.cf-sec-2 { background: var(--c-bg-2); }
@media (min-width: 900px) { .cf-sec { padding: 6.5rem 2rem; } }

/* ---------- Подбор ---------- */
.cf-booker { display: grid; gap: 1.5rem; }
@media (min-width: 900px) { .cf-booker { grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); gap: 3rem; align-items: start; } .cf-ticket { position: sticky; top: 1.5rem; } }
.cf-candies { display: flex; flex-wrap: wrap; gap: 0.55rem; }
.cf-candy { display: inline-flex; align-items: center; gap: 0.55rem; min-height: 3.25rem; padding: 0.45rem 1.05rem 0.45rem 0.6rem; border-radius: 999px; background: #fff; box-shadow: inset 0 0 0 2px var(--c-line); cursor: pointer; transition: background-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s cubic-bezier(0.3, 1.6, 0.5, 1); }
.cf-candy-dot { width: 1.6rem; height: 1.6rem; border-radius: 999px; background: var(--c); flex: none; transition: transform 0.25s cubic-bezier(0.3, 1.6, 0.5, 1); }
.cf-candy-name { font-weight: 700; line-height: 1.15; }
.cf-candy-meta { font-size: 0.78rem; font-weight: 600; color: var(--c-ink-2); white-space: nowrap; }
@media (hover: hover) { .cf-candy:hover { box-shadow: inset 0 0 0 2px var(--c); } .cf-candy:hover .cf-candy-dot { transform: scale(1.12) rotate(20deg); } }
.cf-candy:active { transform: scale(0.97); }
.cf-candy:has(input:checked) { background: var(--c); box-shadow: 0 10px 22px -14px var(--c); transform: rotate(-1.5deg); }
.cf-candy:has(input:checked) .cf-candy-dot { background: #fff; transform: scale(0.7); }
.cf-candy:has(input:checked) .cf-candy-meta { color: var(--c-ink); }
.cf-candy:has(input:focus-visible) { outline: 2px solid var(--c-focus); outline-offset: 3px; }

/* Билет визита */
.cf-ticket {
  position: relative; padding: 1.5rem 1.25rem 1.6rem; border-radius: 1.75rem; background: #fff; box-shadow: 0 24px 48px -32px rgba(36, 31, 51, 0.55);
  -webkit-mask: radial-gradient(circle 0.9rem at 0 9.5rem, #0000 98%, #000) left / 51% 100% no-repeat, radial-gradient(circle 0.9rem at 100% 9.5rem, #0000 98%, #000) right / 51% 100% no-repeat;
  mask: radial-gradient(circle 0.9rem at 0 9.5rem, #0000 98%, #000) left / 51% 100% no-repeat, radial-gradient(circle 0.9rem at 100% 9.5rem, #0000 98%, #000) right / 51% 100% no-repeat;
}
@media (min-width: 900px) { .cf-ticket { padding: 2.25rem; } }
.cf-empty { min-height: 9rem; display: grid; place-items: center; text-align: center; font-weight: 600; color: var(--c-ink-2); }
[data-booker]:not([data-state='empty']) .cf-empty { display: none; }
[data-booker][data-state='empty'] .cf-ticket-body { display: none; }
.cf-ticket-body { display: grid; gap: 1rem; animation: cf-in 0.35s cubic-bezier(0.3, 1.4, 0.5, 1) both; }
@keyframes cf-in { from { opacity: 0; transform: translateY(10px) scale(0.98); } }
.cf-ticket-title { font-family: var(--f-display); font-weight: 800; font-size: clamp(1.6rem, 7vw, 2.4rem); line-height: 1.05; letter-spacing: -0.03em; padding-bottom: 1rem; border-bottom: 2px dashed var(--c-line); }
.cf-ticket-stats { display: grid; grid-template-columns: 6.5rem 1fr; gap: 1.1rem; align-items: center; }
.cf-pie { --cf-a: min(calc(var(--minutes, 0) * 2deg), 360deg); position: relative; width: 6.5rem; height: 6.5rem; border-radius: 50%; background: conic-gradient(var(--cf-coral) var(--cf-a), var(--c-bg-2) 0); transition: --cf-a 0.6s cubic-bezier(0.3, 1, 0.4, 1); }
.cf-pie span { position: absolute; inset: 22%; border-radius: 50%; background: #fff; }
.cf-stat { font-family: var(--f-display); font-weight: 700; font-size: 1.35rem; letter-spacing: -0.02em; }
.cf-slots { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
.cf-slot { display: grid; gap: 0.15rem; padding: 0.7rem 0.9rem; border-radius: 1.1rem; background: var(--c-bg); cursor: pointer; animation: cf-in 0.3s ease both; animation-delay: calc(var(--i) * 0.06s); transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s cubic-bezier(0.3, 1.6, 0.5, 1); }
.cf-slot-day { font-size: 0.78rem; font-weight: 700; color: var(--c-ink-2); }
.cf-slot-time { font-family: var(--f-display); font-weight: 700; font-size: 1.45rem; }
@media (hover: hover) { .cf-slot:hover { background: var(--c-bg-2); } }
.cf-slot:has(input:checked) { background: var(--c-ink); color: #fff; transform: rotate(-2deg) scale(1.03); }
.cf-slot:has(input:checked) .cf-slot-day { color: var(--cf-sun); }
.cf-slot:has(input:focus-visible) { outline: 2px solid var(--c-focus); outline-offset: 2px; }
.cf-cta-row { position: relative; display: grid; gap: 0.75rem; margin-top: 0.4rem; }
.cf-cta-row .btn { background: var(--cf-coral); color: var(--c-ink); }
.cf-cta-row .btn[aria-disabled='true'] { background: var(--c-bg-2); color: var(--c-ink-2); }
.cf-sticker { justify-self: start; display: inline-flex; flex-wrap: wrap; align-items: baseline; gap: 0.2rem 0.5rem; padding: 0.45rem 0.9rem; border-radius: 0.6rem; background: var(--cf-sun); font-family: var(--f-display); font-size: 0.78rem; font-weight: 700; transform: rotate(-2deg); box-shadow: 0 8px 16px -12px rgba(36, 31, 51, 0.7); }
.cf-sticker small { font-family: var(--f-body); font-size: 0.72rem; font-weight: 600; }

/* ---------- Приглашение ---------- */
.cf-invite { position: relative; isolation: isolate; overflow: hidden; display: grid; justify-items: start; gap: 0.4rem; padding: 2.25rem 1.4rem; border-radius: 2rem; background: #fff; box-shadow: 0 30px 60px -40px rgba(36, 31, 51, 0.6); }
@media (min-width: 900px) { .cf-invite { padding: 4rem; justify-items: center; text-align: center; } }
.cf-invite-pieces { z-index: -1; opacity: 0.9; }
.cf-invite-addr { margin-top: 0.6rem; font-family: var(--f-display); font-weight: 600; font-size: clamp(1.2rem, 5vw, 1.8rem); line-height: 1.25; max-width: 24ch; }
.cf-invite-tel { margin-top: 0.8rem; font-family: var(--f-display); font-weight: 700; font-size: clamp(1.4rem, 6.5vw, 2.4rem); text-decoration: none; }
.cf-invite-actions { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 1.25rem; }
@media (min-width: 900px) { .cf-invite-actions { justify-content: center; } }

/* ---------- Запись ---------- */
.cf-booking { display: grid; gap: 0.5rem; }
@media (min-width: 900px) { .cf-booking { grid-template-columns: 1fr 1.3fr; gap: 4rem; align-items: start; } }
.cf-form-card { padding: 1.5rem 1.2rem; border-radius: 1.75rem; background: #fff; box-shadow: 0 24px 48px -36px rgba(36, 31, 51, 0.6); }
@media (min-width: 900px) { .cf-form-card { padding: 2.25rem; } }

@media (prefers-reduced-motion: reduce) {
  .cf-piece, .cf-name span, .cf-ticket-body, .cf-slot { animation: none; }
  .cf-pie { transition: none; }
}
`

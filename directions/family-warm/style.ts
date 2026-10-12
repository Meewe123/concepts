/**
 * family-warm: глубокий зелёный, тёплый песок, абрикос. Округлые формы, семейная интонация.
 * Iroda: семья камешков с лицами, волны между блоками, плитки с дружелюбными иконками.
 */
export const css = /* css */ `
.concept[data-direction='family-warm'] {
  --c-bg: #f6efe3;
  --c-bg-2: #efe4d1;
  --c-surface: #fffaf2;
  --c-ink: #2a2620;
  --c-ink-2: #5e574a;
  --c-accent: #2f5e45;
  --c-accent-ink: #fffaf2;
  --c-line: rgba(42, 38, 32, 0.16);
  --c-focus: #2f5e45;
  --c-field: #fffaf2;
  --green: #2f5e45;
  --green-soft: #d6e6d1;
  --apricot: #f2a875;
  --apricot-soft: #fbdcc6;
  --cream: #fffaf2;
  --f-display: var(--font-nunito), system-ui, sans-serif;
  --f-body: var(--font-nunito), system-ui, sans-serif;
  --radius-btn: 999px;
  --radius-chip: 999px;
  --radius-field: 16px;
  font-size: 1.04rem;
}
[data-direction='family-warm'] .btn { font-weight: 800; letter-spacing: 0; }
[data-direction='family-warm'] .btn-ghost { box-shadow: inset 0 0 0 2px var(--c-ink); }
[data-direction='family-warm'] .chip { font-weight: 800; background: var(--cream); }
[data-direction='family-warm'] input:checked + .chip { background: var(--green); border-color: var(--green); color: var(--cream); }
[data-direction='family-warm'] .ex-tag { font-weight: 800; }
.fw-wrap { max-width: 72rem; margin: 0 auto; }
.fw-h2 { font-size: clamp(2.4rem, 11vw, 4.6rem); line-height: 1; font-weight: 900; letter-spacing: -0.035em; }
.fw-pill { display: inline-flex; align-items: center; min-height: 2.2rem; margin-bottom: 1rem; padding: 0 1rem; border-radius: 999px; background: var(--green-soft); color: var(--green); font-weight: 800; font-size: 0.9rem; }
.fw-label { font-size: 0.85rem; font-weight: 800; letter-spacing: 0.02em; color: var(--c-ink-2); }
.fw-small { font-size: 0.95rem; color: var(--c-ink-2); }
.fw-ink { fill: var(--c-ink); stroke: none; }
.fw-f-apricot { fill: var(--apricot); }
.fw-f-green { fill: #a9cba3; }
.fw-f-cream { fill: var(--cream); }

/* Камешки */
.fw-p-big { fill: var(--apricot); }
.fw-p-mid { fill: var(--cream); }
.fw-p-small { fill: #b9d7b2; }
.fw-cheek { fill: #ea8f6a; opacity: 0.35; }
.fw-smile { fill: none; stroke: var(--c-ink); stroke-width: 2.6; stroke-linecap: round; }
.fw-pop { transform-box: fill-box; transform-origin: 50% 100%; animation: fw-pop 0.7s cubic-bezier(0.3, 1.5, 0.5, 1) both; animation-delay: var(--d, 0s); }
@keyframes fw-pop { from { transform: scale(0.4, 0.2); opacity: 0; } }
.fw-eyes { transform-box: fill-box; transform-origin: center; animation: fw-blink 5.5s ease-in-out infinite; }
.fw-pop:nth-child(2) .fw-eyes { animation-delay: 1.3s; }
.fw-pop:nth-child(3) .fw-eyes { animation-delay: 2.1s; }
@keyframes fw-blink { 0%, 92%, 100% { transform: scaleY(1); } 95% { transform: scaleY(0.1); } }

/* Волны */
.fw-wave { display: block; width: 100%; height: 2.6rem; fill: var(--c-bg); }

/* ---------- Первый экран ---------- */
.fw-hero { position: relative; background: var(--green); color: var(--cream); padding: 0 1rem; }
.fw-top { max-width: 72rem; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; min-height: 3.25rem; font-weight: 800; font-size: 0.9rem; color: rgba(255, 250, 242, 0.8); }
.fw-lang a { padding: 0 1rem; border-radius: 999px; background: var(--cream); color: var(--green); text-decoration: none; font-weight: 800; }
.fw-hero-grid { max-width: 72rem; margin: 0 auto; display: grid; gap: 1rem; padding-top: 1.25rem; }
.fw-name { font-size: clamp(5.4rem, 29vw, 11rem); line-height: 0.86; font-weight: 900; letter-spacing: -0.055em; color: var(--cream); }
.fw-claim { margin-top: 0.9rem; font-size: clamp(1.35rem, 5.8vw, 2rem); line-height: 1.15; font-weight: 800; max-width: 18ch; }
.fw-sub { margin-top: 0.6rem; max-width: 34ch; color: rgba(255, 250, 242, 0.82); }
.fw-cta { display: grid; gap: 0.7rem; margin-top: 1.5rem; }
.fw-cta-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(0, 1fr)); gap: 0.7rem; }
.fw-btn-cream { background: var(--cream); color: var(--green); }
.fw-btn-outline { background: transparent; color: var(--cream); box-shadow: inset 0 0 0 2px rgba(255, 250, 242, 0.75); }
@media (hover: hover) {
  .concept .fw-btn-cream:hover { background: var(--apricot-soft); }
  .concept .fw-btn-outline:hover { background: rgba(255, 250, 242, 0.1); }
}
.fw-hero :focus-visible, .fw-green :focus-visible { outline-color: var(--apricot); }
.fw-hero-pebbles { width: min(100%, 22rem); justify-self: end; margin-bottom: -0.4rem; }
.fw-wave-hero { position: relative; margin: 0 -1rem -1px; width: calc(100% + 2rem); }
@media (min-width: 900px) {
  .fw-hero { padding: 0 2rem; }
  .fw-hero-grid { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); align-items: end; padding-top: 3rem; }
  .fw-cta { display: flex; flex-wrap: wrap; align-items: center; }
  .fw-cta-row { display: flex; }
  .fw-hero-pebbles { width: 100%; max-width: 30rem; }
  .fw-wave-hero { margin: 0 -2rem; width: calc(100% + 4rem); }
}

/* ---------- Секции ---------- */
.fw-sec { padding: 3.5rem 1rem 4.5rem; }
.fw-sec-2 { background: var(--c-bg-2); }
.fw-green { background: var(--green); color: var(--cream); padding: 4.5rem 1rem; border-radius: 2.5rem 2.5rem 0 0; }
@media (min-width: 900px) { .fw-sec { padding: 6rem 2rem; } .fw-green { padding: 6rem 2rem; border-radius: 4rem 4rem 0 0; } }

/* ---------- «Что вас беспокоит?» ---------- */
.fw-pick { display: grid; gap: 1.25rem; }
.fw-tiles { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.75rem; }
@media (min-width: 900px) { .fw-pick { grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); gap: 2.5rem; align-items: start; } }
.fw-tile { flex-direction: column; align-items: flex-start; justify-content: space-between; gap: 1rem; min-height: 9.25rem; padding: 1rem; border-radius: 1.75rem; background: var(--cream); box-shadow: 0 1px 0 rgba(42, 38, 32, 0.06), 0 10px 24px -18px rgba(42, 38, 32, 0.4); }
.fw-blob { display: grid; place-items: center; width: 3.6rem; height: 3.6rem; border-radius: 58% 42% 52% 48% / 52% 56% 44% 48%; background: var(--tint); transition: background-color 0.2s ease, transform 0.25s cubic-bezier(0.3, 1.6, 0.5, 1); }
.fw-ico { width: 2.5rem; height: 2.5rem; color: var(--c-ink); }
.fw-tile-label { font-size: 1.15rem; line-height: 1.15; font-weight: 800; }
@media (hover: hover) { .fw-tiles .dc-opt:hover .fw-blob { transform: rotate(-8deg) scale(1.06); } }
.fw-tiles .dc-opt input:checked + .fw-tile { background: var(--green); color: var(--cream); box-shadow: 0 14px 28px -16px rgba(47, 94, 69, 0.8); }
.fw-tiles .dc-opt input:checked + .fw-tile .fw-blob { background: var(--cream); transform: rotate(-8deg) scale(1.08); }

.fw-results { position: relative; }
@media (min-width: 900px) { .fw-results { position: sticky; top: 1.5rem; } }
.fw-empty { display: grid; justify-items: center; gap: 1rem; padding: 1.75rem 1.25rem; border-radius: 2rem; border: 2px dashed var(--c-line); text-align: center; color: var(--c-ink-2); font-weight: 700; }
.fw-card { position: relative; gap: 1rem; padding: 1.5rem 1.25rem; border-radius: 2rem; background: var(--cream); box-shadow: 0 18px 40px -28px rgba(42, 38, 32, 0.6); }
@media (min-width: 900px) { .fw-card { padding: 2.2rem; } }
.fw-card-head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem; }
.fw-chip { display: inline-flex; align-items: center; justify-self: start; min-height: 2.2rem; padding: 0 1rem; border-radius: 999px; background: var(--green-soft); color: var(--green); font-weight: 900; }
.fw-price { margin-top: -0.6rem; font-size: clamp(2.2rem, 10vw, 3.4rem); line-height: 1; font-weight: 900; letter-spacing: -0.03em; }
.fw-note { padding: 0.8rem 1rem; border-radius: 1.1rem; background: var(--apricot-soft); }
.fw-facts { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.75rem; }
.fw-facts > div { display: grid; align-content: start; gap: 0.4rem; padding: 0.9rem 1rem; border-radius: 1.25rem; background: var(--c-bg); }
.fw-fact { font-weight: 800; line-height: 1.25; }
.fw-fact-big { font-size: 1.3rem; font-weight: 900; }
.fw-fact, .fw-fact-big, .ds-tl-cap { text-wrap: balance; }
.fw-vp { display: flex; flex-wrap: wrap; gap: 4px; }
.fw-vp i { width: 0.9rem; height: 0.75rem; border-radius: 58% 42% 52% 48% / 60% 56% 44% 40%; background: var(--apricot); animation: fw-dot 0.3s cubic-bezier(0.3, 1.6, 0.5, 1) both; animation-delay: calc(var(--i) * 0.05s + 0.1s); }
.fw-vp i:nth-child(2n) { background: #a9cba3; }
.fw-vp b { font-size: 0.8rem; font-weight: 900; color: var(--c-ink-2); }
@keyframes fw-dot { from { transform: scale(0); } }
.fw-plan { display: grid; gap: 0.75rem; padding: 1.1rem; border-radius: 1.5rem; background: var(--green-soft); }
.fw-coins { display: flex; flex-wrap: wrap; gap: 5px; margin: 0.2rem 0 0.6rem; }
.fw-coins i { width: 1.15rem; height: 1.15rem; border-radius: 50%; background: var(--apricot); box-shadow: inset 0 0 0 3px #e8935b; animation: fw-coin 0.35s cubic-bezier(0.3, 1.6, 0.5, 1) both; animation-delay: calc(var(--i) * 0.04s); }
@keyframes fw-coin { from { transform: translateY(-8px) scale(0.6); opacity: 0; } }
.fw-monthly { font-size: 1.5rem; font-weight: 900; letter-spacing: -0.01em; }
.fw-monthly .dc-per { font-size: 0.95rem; font-weight: 700; color: var(--c-ink-2); }
.fw-card-pain { background: var(--apricot-soft); padding-top: 2rem; }
.fw-card-pebble { position: absolute; top: -1.6rem; right: 1.4rem; width: 4.5rem; }
.fw-calm { font-size: 1.5rem; line-height: 1.3; font-weight: 900; max-width: 22ch; }

/* ---------- Для всей семьи ---------- */
.fw-family { position: relative; background: var(--apricot); color: var(--c-ink); }
.fw-family .fw-wave { fill: var(--c-bg); }
.fw-wave-top { position: relative; }
.fw-family-grid { display: grid; gap: 2rem; padding: 2.5rem 1rem 3rem; }
@media (min-width: 900px) { .fw-family-grid { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); align-items: center; padding: 4rem 2rem; } }
.fw-family .fw-label { color: var(--c-ink); }
.fw-who { display: grid; grid-template-columns: 5rem 1fr auto; align-items: center; gap: 0.75rem; min-height: 4.5rem; padding: 0.5rem 1.25rem 0.5rem 0.75rem; border-radius: 999px; background: var(--cream); color: var(--c-ink); text-decoration: none; font-weight: 900; font-size: 1.15rem; transition: transform 0.2s ease, box-shadow 0.2s ease; }
.fw-who-av { display: grid; place-items: end center; height: 3.25rem; overflow: hidden; }
.fw-h2-sm { font-size: clamp(1.9rem, 8vw, 3.4rem); }
.fw-who-arrow { font-size: 1.3rem; transition: transform 0.2s ease; }
@media (hover: hover) { .fw-who:hover { box-shadow: 0 12px 24px -16px rgba(42, 38, 32, 0.6); } .fw-who:hover .fw-who-arrow { transform: translateX(4px); } }
.fw-who:active { transform: scale(0.98); }

/* ---------- Первый визит ---------- */
.fw-steps { position: relative; display: grid; gap: 2rem; }
.fw-steps li { position: relative; display: grid; grid-template-columns: 3.5rem minmax(0, 1fr); gap: 1rem; align-items: start; }
.fw-steps li:not(:last-child)::after { content: ''; position: absolute; left: 1.75rem; top: 3.6rem; bottom: -1.9rem; border-left: 3px dotted rgba(47, 94, 69, 0.35); }
.fw-step-n { display: grid; place-items: center; width: 3.5rem; height: 3.1rem; border-radius: 58% 42% 52% 48% / 60% 56% 44% 40%; background: var(--apricot); font-size: 1.4rem; font-weight: 900; }
.fw-steps li:nth-child(2n) .fw-step-n { background: #a9cba3; }
@media (min-width: 900px) {
  .fw-steps { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.25rem; }
  .fw-steps li { grid-template-columns: 1fr; padding: 1.5rem; border-radius: 2rem; background: var(--cream); }
  .fw-steps li::after { display: none; }
}

/* ---------- Запись ---------- */
.fw-booking { display: grid; gap: 1.5rem; }
@media (min-width: 900px) { .fw-booking { grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); gap: 4rem; align-items: start; } }
.fw-form-card { padding: 1.4rem 1.1rem; border-radius: 2rem; background: var(--cream); color: var(--c-ink); }
@media (min-width: 900px) { .fw-form-card { padding: 2.25rem; } }
.fw-form-card :focus-visible { outline-color: var(--green); }

/* ---------- Контакты ---------- */
.fw-contact-grid { display: grid; gap: 0.75rem; margin-top: 2rem; }
@media (min-width: 768px) { .fw-contact-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
.fw-contact-card { display: grid; gap: 0.4rem; padding: 1.25rem; border-radius: 1.75rem; background: var(--cream); }
.fw-phone { font-size: 1.35rem; font-weight: 900; text-decoration: none; }

/* ---------- OG ---------- */
.fw-og { background: var(--green); color: var(--cream); }

@media (prefers-reduced-motion: reduce) {
  .fw-pop, .fw-eyes, .fw-vp i, .fw-coins i { animation: none; }
}
`

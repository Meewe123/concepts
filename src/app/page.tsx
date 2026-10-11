// Временная заглушка. Страница студии — Фаза 4.
export default function Home() {
  return (
    <main className="grid min-h-dvh place-items-end bg-[#f3eee4] px-4 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-10 font-[family-name:var(--font-onest)] text-[#1c1b18] sm:px-12 sm:pb-16">
      <div className="w-full max-w-3xl">
        <p className="text-sm text-[#6b665c]">Ташкент</p>
        <h1 className="mt-4 text-[clamp(2rem,7vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-balance">
          Сайты, онлайн-запись и{' '}Telegram-боты для{' '}бизнеса — на{' '}русском и{' '}узбекском
        </h1>
        <p className="mt-6 max-w-md text-base text-[#4a463f]">Страница студии скоро будет здесь.</p>
      </div>
    </main>
  )
}

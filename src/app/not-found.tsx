import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-[#f3eee4] px-4 font-[family-name:var(--font-onest)] text-[#1c1b18]">
      <div className="max-w-sm">
        <h1 className="text-3xl font-semibold tracking-[-0.02em]">Такой страницы нет</h1>
        <p className="mt-3 text-[#4a463f]">Проверьте ссылку — возможно, в{' '}ней не{' '}хватает символов.</p>
        <Link href="/" className="mt-6 inline-flex min-h-11 items-center underline underline-offset-4">
          На главную
        </Link>
      </div>
    </main>
  )
}

import type { ReactNode } from 'react'

export function Section({
  id,
  children,
  alt = false,
  className = '',
}: {
  id?: string
  children: ReactNode
  /** Альтернативный фон секции */
  alt?: boolean
  className?: string
}) {
  return (
    <section id={id} className={`px-4 py-16 sm:px-8 sm:py-24 ${alt ? 'bg-bg-2' : ''} ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

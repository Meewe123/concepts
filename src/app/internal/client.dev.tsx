'use client'

import { useEffect } from 'react'

/**
 * Поведение пульта после гидрации: копирование текста, фильтр в адресе (#wait),
 * и метка «это мои просмотры» для localhost — счётчик не грузится.
 */
export function InternalClient() {
  useEffect(() => {
    try {
      localStorage.setItem('concepts:me', '1')
    } catch {}

    const radio = document.getElementById(`f-${location.hash.slice(1)}`)
    if (radio instanceof HTMLInputElement && radio.name === 'f') radio.checked = true

    const onChange = (e: Event) => {
      const t = e.target
      if (t instanceof HTMLInputElement && t.name === 'f') history.replaceState(null, '', `#${t.value}`)
    }
    const onClick = (e: MouseEvent) => {
      const b = (e.target as Element).closest<HTMLButtonElement>('[data-copy]')
      const text = b && document.getElementById(b.dataset.copy!)?.textContent
      if (!b || !text) return
      const label = b.textContent
      navigator.clipboard.writeText(text).then(() => {
        b.dataset.done = ''
        b.textContent = 'Скопировано'
        setTimeout(() => {
          delete b.dataset.done
          b.textContent = label
        }, 1600)
      })
    }
    document.addEventListener('change', onChange)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('change', onChange)
      document.removeEventListener('click', onClick)
    }
  }, [])
  return null
}

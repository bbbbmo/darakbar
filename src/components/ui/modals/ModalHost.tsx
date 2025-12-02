'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function ModalHost({ children }: { children: React.ReactNode }) {
  const [target, setTarget] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const el = document.getElementById('modal-root')
    setTarget(el)
  }, [])

  if (!target) return null
  return createPortal(children, target)
}

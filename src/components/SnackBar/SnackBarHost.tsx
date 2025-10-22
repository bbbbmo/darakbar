'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function SnackBarHost({
  children,
}: {
  children: React.ReactNode
}) {
  const [target, setTarget] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const el = document.getElementById('snackbar-root')
    setTarget(el)
  }, [])

  if (!target) return null
  return createPortal(children, target)
}

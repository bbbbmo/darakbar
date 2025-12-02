'use client'

import clsx from 'clsx'

type FormHeaderProps = {
  title: string
  className?: string
}

export default function FormHeader({ title, className }: FormHeaderProps) {
  return (
    <h1 className={clsx('mb-5 text-4xl font-bold text-amber-400', className)}>
      {title}
    </h1>
  )
}

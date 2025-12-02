import React from 'react'

type ExternalLinkProps = {
  href: string | null
  children: React.ReactNode
}

export default function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <a
      href={href || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="cursor-pointer text-amber-400 hover:underline"
    >
      {children}
    </a>
  )
}

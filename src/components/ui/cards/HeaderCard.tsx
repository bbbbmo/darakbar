import { Card } from 'flowbite-react'
import BlurText from '../react-bits/BlurText'
import { basicTheme } from '@/lib/flowbite/basicTheme'

type HeaderCardProps = {
  title: string
  message: string
  children?: React.ReactNode
  className?: string
}

export default function HeaderCard({
  title,
  message,
  children,
  className,
}: HeaderCardProps) {
  return (
    <Card theme={basicTheme.card} className={`py-4 ${className}`}>
      <BlurText
        text={title}
        delay={150}
        animateBy="words"
        direction="top"
        className="mb-8 text-4xl font-bold tracking-tight dark:text-white"
      />
      <p className="text-zinc-500">
        <span>{message}</span>
        {children}
      </p>
    </Card>
  )
}

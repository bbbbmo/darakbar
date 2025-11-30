'use client'

import SubTitleText from '@/components/SubTitleText'
import { Card } from 'flowbite-react'
import { ReactNode } from 'react'

export type UploadCardProps = {
  icon?: ReactNode
  title: string
  description: string
  children: ReactNode
}

export default function UploadCard({
  icon,
  title,
  description,
  children,
}: UploadCardProps) {
  return (
    <Card className="flex flex-col items-center border-neutral-600 bg-neutral-800 py-8">
      <div className="flex w-full justify-center">{icon}</div>
      <SubTitleText
        title={title}
        className="w-full justify-center text-center"
      />
      <p className="flex flex-col gap-2 text-gray-400">
        <span>{description}</span>
      </p>
      <div className="flex w-full justify-center">{children}</div>
    </Card>
  )
}

import { useParseFile } from '@/hooks/useParseFile'
import { Card } from 'flowbite-react'
import Image from 'next/image'

export type NewMenuCardProps = {
  newMenu: any
}

export default function NewMenuCard({ newMenu }: NewMenuCardProps) {
  const { publicUrls } = useParseFile(newMenu.image_path || '')

  return (
    <Card className="bg-secondary">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <h4 className="text-lg font-semibold">{newMenu.name}</h4>
          <span className="text-sm text-zinc-500">{newMenu.type}</span>
        </div>
        <span className="text-lg font-semibold">
          {newMenu.price!.toLocaleString()}원
        </span>
      </div>
      <p>
        <span className="line-clamp-1">{newMenu.description}</span>
      </p>
      <div className="relative w-full">
        <Image
          src={publicUrls}
          alt={newMenu.name || ''}
          className="h-80 w-full object-cover"
        />
      </div>
    </Card>
  )
}

// import { useParseFile } from '@/hooks/useParseFile'
import { Card } from 'flowbite-react'
// import Image from 'next/image'

export type NewMenuCardProps = {
  newMenu: any
}

// TODO: 상세 정보 모달 추가 예정

export default function NewMenuCard({ newMenu }: NewMenuCardProps) {
  // const { publicUrls } = useParseFile(newMenu.image_path)

  return (
    <Card className="bg-secondary">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h4 className="text-lg font-semibold">{newMenu.name}</h4>
          <span className="text-sm text-zinc-500">{newMenu.type}</span>
        </div>
        <span className="text-lg font-semibold text-amber-400">
          {newMenu.price!.toLocaleString()}원
        </span>
      </div>
      {/* <p>
        <span className="line-clamp-1">{newMenu.description}</span>
      </p>
      {publicUrls && (
        <div className="relative h-[400px] w-full">
          <Image
            src={publicUrls}
            alt={newMenu.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-t-lg object-cover"
          />
        </div>
      )} */}
    </Card>
  )
}

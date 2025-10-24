import Image from 'next/image'
import { useBarDetailStore } from '../../_stores/bar-detail.store'
import { useParseFile } from '@/hooks/useParseFile'

// TODO: 이미지 여러개 추가
export default function BarImage() {
  const barDetail = useBarDetailStore((state) => state.barDetail)

  const { publicUrls } = useParseFile(barDetail?.bar_images || [])
  return (
    <div className="relative h-[400px] w-full">
      {publicUrls.length > 0 ? (
        publicUrls.map((url, index) => (
          <Image
            key={index}
            src={url}
            alt={'Bar Image ' + index + 1}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            className="rounded-lg object-cover"
            priority={true}
          />
        ))
      ) : (
        <div className="flex h-full w-full items-center justify-center text-zinc-500">
          이미지 없음
        </div>
      )}
    </div>
  )
}

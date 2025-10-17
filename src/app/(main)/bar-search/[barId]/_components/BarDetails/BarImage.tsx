import Image from 'next/image'
import { useBarDetailStore } from '../../_stores/bar-detail.store'

// TODO: 이미지 여러개 추가
export default function BarImage() {
  const barDetail = useBarDetailStore((state) => state.barDetail)

  return (
    <div className="relative h-[400px] w-full">
      {barDetail?.bar_images && barDetail?.bar_images?.length > 0 ? (
        barDetail?.bar_images?.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={barDetail.name}
            fill
            sizes="100vw"
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

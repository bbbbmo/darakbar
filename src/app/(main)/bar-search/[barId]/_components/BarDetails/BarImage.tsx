import Image from 'next/image'
import { BarDetail } from '@/lib/supabase/api/bar/getBarDetail'

// TODO: 이미지 여러개 추가
export default function BarImage({ barDetail }: { barDetail: BarDetail }) {
  return (
    <div className="relative h-[400px] w-full">
      {barDetail?.bar_images?.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={barDetail.name}
          fill
          sizes="100vw"
          className="rounded-lg object-cover"
          priority={true}
        />
      ))}
    </div>
  )
}

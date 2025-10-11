import Image from 'next/image'
import { Bar } from '@/types/bar/bar.types'

// TODO: 이미지 여러개 추가
export default function BarImage({ bar }: { bar: Bar }) {
  return (
    <div className="relative h-[400px] w-full">
      {bar.bar_images?.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={bar.name}
          fill
          sizes="100vw"
          className="rounded-lg object-cover"
          priority={true}
        />
      ))}
    </div>
  )
}

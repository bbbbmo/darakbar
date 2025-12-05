'use client'

import ImageSkeleton from '@/components/ui/skeletons/ImageSkeleton'
import { useParseFile } from '@/hooks/useParseFile'
import { BarReview } from '@/api/review/getBarReviews'
import Image from 'next/image'

export default function PhotoTab({ reviews }: { reviews: BarReview[] }) {
  const images = reviews
    .filter((review) => review.image_paths && review.image_paths.length > 0)
    .flatMap((review) => review.image_paths)

  const { publicUrls, isLoading } = useParseFile(images as string[])

  return (
    <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
      {publicUrls.map((url, index) =>
        isLoading ? (
          <ImageSkeleton key={index} width={200} height={200} />
        ) : (
          <Image
            key={index}
            src={url}
            alt="Photo"
            width={200}
            height={200}
            className="h-auto w-full cursor-pointer rounded-lg object-cover"
          />
        ),
      )}
    </div>
  )
}

import clsx from 'clsx'
import { useState } from 'react'
import { HiStar } from 'react-icons/hi'

const MAX_STARS = 5

type StarsProps = {
  rating: number
  size?: number
  showRatingChip?: boolean
  active?: boolean
  setRating?: (rating: number) => void
}

export default function Stars({
  rating,
  size,
  showRatingChip,
  active = false,
  setRating,
}: StarsProps) {
  const [localRating, setLocalRating] = useState<number | null>(null)
  const safeRating = Math.max(0, Math.min(MAX_STARS, Math.round(rating)))

  const displayRating = localRating ?? safeRating
  return (
    <div className="flex items-center">
      <div className="flex items-center rtl:space-x-reverse">
        {Array.from({ length: MAX_STARS }).map((_, i) => (
          <HiStar
            key={i}
            onClick={() => active && setRating?.(i + 1)}
            onMouseEnter={() => active && setLocalRating(i + 1)}
            onMouseLeave={() => active && setLocalRating(null)}
            className={clsx(
              i < displayRating
                ? 'text-yellow-300'
                : 'text-gray-200 dark:text-gray-600',
              {
                'cursor-pointer transition-transform duration-200 hover:scale-110':
                  active,
                'cursor-default': !active,
              },
            )}
            size={size}
          ></HiStar>
        ))}
      </div>
      {rating && showRatingChip ? (
        <span className="ms-3 rounded-sm bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
          {rating}
        </span>
      ) : null}
    </div>
  )
}

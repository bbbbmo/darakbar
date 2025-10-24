import { snackBar } from '@/components/Providers/SnackBarProvider'
import { BarReview } from '@/lib/supabase/api/review/getBarReviews'
import { deleteBarReviewLike } from '@/lib/supabase/api/review/likes/deleteBarReviewLike'
import { postBarReviewLike } from '@/lib/supabase/api/review/likes/postBarReviewLike'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { HiOutlineThumbUp } from 'react-icons/hi'
import { produce } from 'immer'
import clsx from 'clsx'
import { UserData } from '@/stores/auth.store'

type ReviewLikeProps = {
  review: BarReview
  userData: UserData | null
}

export default function ReviewLike({ review, userData }: ReviewLikeProps) {
  const queryClient = useQueryClient()

  const isLikedByCurrentUser = review.likes?.some(
    (like) => like.user_id === userData?.id,
  )

  const [isLiked, setIsLiked] = useState<boolean>(isLikedByCurrentUser)

  const { mutate: toggleLike } = useMutation({
    mutationFn: async () => {
      if (!userData?.id) {
        snackBar.showError('실패', '로그인 후 좋아요를 누를 수 있습니다.')
        return
      }
      if (isLiked) {
        // 좋아요 취소
        await deleteBarReviewLike(review.id, userData?.id)
      } else {
        // 좋아요 추가
        await postBarReviewLike(review.id, userData?.id)
      }
      setIsLiked((prev) => !prev)
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['bar-reviews', String(review.bar_id)],
      })

      const previousReviews = queryClient.getQueryData([
        'bar-reviews',
        String(review.bar_id),
      ])

      queryClient.setQueryData(
        ['bar-reviews', String(review.bar_id)],
        (old: { data: BarReview[] }) => {
          return {
            ...old,
            data: produce(old.data, (draft) => {
              const reviewIndex = draft.findIndex((r) => r.id === review.id)
              if (reviewIndex !== -1) {
                isLiked
                  ? draft[reviewIndex].like_count--
                  : draft[reviewIndex].like_count++
              }
            }),
          }
        },
      )

      return { previousReviews }
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(
        ['bar-reviews', String(review.bar_id)],
        context?.previousReviews,
      )
    },
  })
  return (
    <div
      className="flex cursor-pointer items-center gap-1 rounded-md p-2 transition-all duration-200 ease-in-out hover:bg-neutral-500 hover:text-neutral-800"
      onClick={() => toggleLike()}
    >
      <HiOutlineThumbUp
        size={20}
        className={clsx(isLiked ? 'fill-amber-400 text-amber-400' : 'none')}
      />
      {review.like_count || 0}개
    </div>
  )
}

import { snackBar } from '@/app/_providers/SnackBarProvider'
import { BarReview } from '@api/review/getBarReviews'
import { deleteBarReviewLike } from '@api/review/likes/deleteBarReviewLike'
import { postBarReviewLike } from '@api/review/likes/postBarReviewLike'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { HiHeart } from 'react-icons/hi'
import { produce } from 'immer'
import clsx from 'clsx'
import { UserData } from '@/stores/auth.store'
import { barReviewsKeys } from '@/api/queries/reviewKeys'

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

  const optimisticUpdate = (likeCount: 1 | -1) => async () => {
    await queryClient.cancelQueries({
      queryKey: ['bar-reviews', String(review.bar_id)],
    })

    const previousReviews = queryClient.getQueryData(
      barReviewsKeys.all(review.bar_id).queryKey,
    )

    queryClient.setQueryData(
      barReviewsKeys.all(review.bar_id).queryKey,
      (old: { data: BarReview[] }) => {
        return {
          ...old,
          data: produce(old.data, (draft) => {
            const reviewIndex = draft.findIndex((r) => r.id === review.id)
            if (reviewIndex !== -1) {
              draft[reviewIndex].like_count += likeCount
            }
          }),
        }
      },
    )

    return { previousReviews }
  }

  const { mutate: likeMutate } = useMutation({
    mutationFn: async () => {
      await postBarReviewLike(review.id, userData!.id)
    },
    onMutate: optimisticUpdate(1),
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(
        barReviewsKeys.all(review.bar_id).queryKey,
        context?.previousReviews,
      )
    },
    onSuccess: () => {
      setIsLiked(true)
    },
  })

  const { mutate: unlikeMutate } = useMutation({
    mutationFn: async () => {
      await deleteBarReviewLike(review.id, userData!.id)
    },
    onMutate: optimisticUpdate(-1),
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(
        barReviewsKeys.all(review.bar_id).queryKey,
        context?.previousReviews,
      )
    },
    onSuccess: () => {
      setIsLiked(false)
    },
  })

  const handleClick = () => {
    if (!userData?.id) {
      snackBar.showError('실패', '로그인 후 좋아요를 누를 수 있습니다.')
      return
    }
    isLiked ? unlikeMutate() : likeMutate()
  }

  return (
    <div
      className="flex cursor-pointer items-center gap-2 rounded-md p-2 transition-all duration-200 ease-in-out hover:bg-neutral-500 hover:text-neutral-800"
      onClick={handleClick}
    >
      <HiHeart
        size={20}
        className={clsx(
          'hover:animate-pulse',
          isLiked ? 'fill-red-400 text-red-400' : 'none',
        )}
      />
      {review.like_count || 0}개
    </div>
  )
}

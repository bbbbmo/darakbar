import supabase from '../../supabase'
import { PostBarReviewBody } from './postBarReview'

export type patchBarReviewParams = {
  reviewId: number
  userId: string
  body: Omit<PostBarReviewBody, 'rating'>
}

export const patchBarReview = async (params: patchBarReviewParams) => {
  const { data, error } = await supabase.rpc('update_review_with_tags', {
    p_review_id: params.reviewId,
    p_user_id: params.userId,
    p_body: params.body.body,
    p_images: params.body.images,
    p_visit_date: params.body.visitDate,
    p_tag_ids: params.body.tagIds,
  })

  return { data, error }
}

import z from 'zod'
import supabase from '@lib/supabase/supabase'

export const postBarReviewBodySchema = z.object({
  rating: z.number(),
  body: z.string(),
  images: z.array(z.string()).optional(),
  visitDate: z.string(),
  tagIds: z.array(z.number()),
})

export type PostBarReviewBody = z.infer<typeof postBarReviewBodySchema>

export type postBarReviewParams = {
  barId: number
  userId: string
  body: PostBarReviewBody
}

export const postBarReview = async (params: postBarReviewParams) => {
  const { data, error } = await supabase.rpc('create_review_with_tags', {
    p_bar_id: params.barId,
    p_user_id: params.userId,
    p_rating: params.body.rating,
    p_body: params.body.body,
    p_images: params.body.images,
    p_visit_date: params.body.visitDate,
    p_tag_ids: params.body.tagIds,
  })

  return { data, error }
}

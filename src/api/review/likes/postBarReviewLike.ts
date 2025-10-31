import supabase from '@/lib/supabase/supabase'

export const postBarReviewLike = async (reviewId: number, userId: string) => {
  const { data, error } = await supabase
    .from('likes')
    .insert({
      review_id: reviewId,
      user_id: userId,
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

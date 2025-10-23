import supabase from '@/lib/supabase/supabase'

export const deleteBarReviewLike = async (reviewId: number, userId: string) => {
  const { data, error } = await supabase
    .from('likes')
    .delete()
    .eq('review_id', reviewId)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

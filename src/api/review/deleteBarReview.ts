import supabase from '@lib/supabase/supabase'

export const deleteBarReview = async (reviewId: number) => {
  console.log('deleteBarReview', reviewId)
  const { data, error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId)

  if (error) throw error
  return data
}

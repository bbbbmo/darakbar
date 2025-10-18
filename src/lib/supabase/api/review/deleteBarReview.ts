import supabase from '../../supabase'

export const deleteBarReview = async (reviewId: number) => {
  const { data, error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId)
  return { data, error }
}

import supabase from '../../supabase'

export const getBarReviews = async (barId: number) => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('bar_id', barId)
    .order('created_at', { ascending: false })
  return { data, error }
}

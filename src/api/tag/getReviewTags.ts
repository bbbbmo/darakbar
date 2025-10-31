import supabase from '@lib/supabase/supabase'

export const getReviewTags = async () => {
  const { data, error } = await supabase
    .from('tags')
    .select('id, name')
    .eq('category', 'review')
  return { data, error }
}

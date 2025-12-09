import supabase from '@/lib/supabase/supabase'

export const getAllTags = async () => {
  const { data, error } = await supabase
    .from('tags')
    .select('id, category, name')

  if (error) {
    throw error
  }
  return { data }
}

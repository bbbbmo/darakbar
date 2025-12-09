import { Tag } from '@/stores/tag.store'
import supabase from '@lib/supabase/supabase'

export const getPostTags = async (): Promise<{ data: Tag[] }> => {
  const { data, error } = await supabase
    .from('tags')
    .select('id, name')
    .eq('category', 'post')

  if (error) {
    throw error
  }
  return { data }
}

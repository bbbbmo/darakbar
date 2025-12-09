import { Tag } from '@/stores/tag.store'
import supabase from '@lib/supabase/supabase'

export const getAtmosphereTags = async (): Promise<{ data: Tag[] }> => {
  const { data, error } = await supabase
    .from('tags')
    .select('id, name')
    .eq('category', 'atmosphere')

  if (error) {
    throw error
  }
  return { data }
}

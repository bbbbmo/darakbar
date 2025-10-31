import supabase from '../../supabase'

export const getAtmosphereTags = async () => {
  const { data, error } = await supabase
    .from('tags')
    .select('id, name')
    .eq('category', 'atmosphere')
  return { data, error }
}

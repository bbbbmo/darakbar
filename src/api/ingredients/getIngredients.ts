import supabase from '@/lib/supabase/supabase'

/**
 * @description 재료 조회
 * @returns 재료 데이터
 */
export const getIngredients = async (name?: string) => {
  let query = supabase.from('ingredients').select('*')

  if (name) {
    query = query.eq('name', name)
  }

  query = query.order('id', { ascending: true })

  const { data, error } = await query

  if (error) {
    throw error
  }

  return data
}

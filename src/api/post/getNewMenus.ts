import supabase from '@/lib/supabase/supabase'

export type NewMenu = NonNullable<
  Awaited<ReturnType<typeof getNewMenus>>['data']
>[0]

export const getNewMenus = async () => {
  const { data, error } = await supabase.from('new_menus').select('*')

  if (error) {
    throw error
  }

  return { data }
}

import supabase from '@lib/supabase/supabase'

export type AtmosphereTag = Awaited<
  ReturnType<typeof getAtmosphereTags>
>['data'][0]

export const getAtmosphereTags = async () => {
  const { data, error } = await supabase
    .from('tags')
    .select('id, name')
    .eq('category', 'atmosphere')

  if (error) {
    throw error
  }
  return { data }
}

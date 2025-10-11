import { BarCategory } from '@/types/bar/bar.types'
import { AtmosphereTag } from '@/types/tag/tag.types'
import supabase from '@lib/supabase/supabase'

export type getBarsQueryParams = {
  name?: string
  address?: string
  category?: BarCategory
  atmosphere?: AtmosphereTag
}

export const getBars = async (params?: getBarsQueryParams) => {
  let query = supabase.from('bars').select(`
    id, 
    name, 
    rating, 
    address, 
    website_url, 
    instagram_url, 
    description, 
    category, 
    phone_number, 
    bar_images,
    bar_tags(
      tags(
        id,
        name
      )
    ),
    signature_menus(
      id,
      name,
      price
    )
  `)

  if (params?.name) {
    query = query.ilike('name', params.name)
  }
  if (params?.address) {
    query = query.ilike('address', params.address)
  }
  if (params?.category) {
    query = query.contains('category', [params.category])
  }
  if (params?.atmosphere) {
    query = query.in('bar_tags', [params.atmosphere])
  }

  const { data, error } = await query
  return { data, error }
}

export const getBar = async (id: number) => {
  const { data, error } = await supabase
    .from('bars')
    .select('*')
    .eq('id', id)
    .single()
  return { data, error }
}

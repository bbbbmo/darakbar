import { Bar, BarCategory } from '@/types/bar/bar.types'
import { AtmosphereTag } from '@/types/tag/tag.types'
import supabase from '@lib/supabase/supabase'

export type getBarsQueryParams = {
  name?: string
  region?: string
  priceRange?: string
  category?: BarCategory
  atmosphere?: AtmosphereTag
}

export const getBars = async (
  params?: getBarsQueryParams,
): Promise<{ data: Bar[] | null; error: any }> => {
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
    signature_menus(
      id,
      name,
      price
    ),
    business_hours(
      id,
      day_of_week,
      open_time,
      close_time,
      last_order_time,
      is_closed,
      significant
    ),
    bar_tags(
      tags(
        id,
        name
      )
    )
  `)

  console.log(params)
  // if (params?.name) {
  //   query = query.ilike('name', params.name)
  // }
  // if (params?.region) {
  //   query = query.ilike('address', params.region)
  // }
  // if (params?.category) {
  //   query = query.contains('category', [params.category])
  // }
  // if (params?.atmosphere) {
  //   query = query.in('bar_tags', [params.atmosphere])
  // }

  const { data, error } = await query

  if (error) {
    return { data: null, error }
  }

  return { data, error }
}

export const getBar = async (id: number) => {
  const { data, error } = await supabase
    .from('bars')
    .select(
      `
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
      signature_menus(
        id,
        name,
        price
      ),
      business_hours(
        id,
        day_of_week,
        open_time,
        close_time,
        last_order_time,
        is_closed,
        significant
      ),
      bar_tags(
        tags(
          id,
          name
        )
      )
    `,
    )
    .eq('id', id)
    .single()

  return { data, error }
}

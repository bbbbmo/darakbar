import supabase from '@lib/supabase/supabase'

export type BarFilterOption = {
  name?: string
  atmosphere?: number[]
}

export type BarSortOption = 'all' | 'name_asc' | 'rating_asc' | 'rating_desc'

export type getBarsQueryParams = {
  filterOption?: BarFilterOption
  sortOption?: BarSortOption
}

export type Bar = NonNullable<Awaited<ReturnType<typeof getBars>>['data']>[0]

export const getBars = async (params?: getBarsQueryParams) => {
  const { filterOption, sortOption } = params || {}

  let query = supabase.from('bars').select(`
    id, 
    name, 
    rating, 
    address, 
    description, 
    phone_number, 
    image_paths,
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
    bar_tags!inner(
      tag_id,
      tags(
        id,
        name
      )
    )
  `)

  if (filterOption?.name) {
    query = query.ilike('name', `%${filterOption.name}%`)
  }

  if (filterOption?.atmosphere && filterOption.atmosphere.length > 0) {
    query = query.in('bar_tags.tag_id', filterOption.atmosphere)
  }

  if (sortOption && sortOption !== 'all') {
    if (sortOption === 'name_asc') {
      query = query.order('name', { ascending: true })
    } else if (sortOption === 'rating_asc') {
      query = query.order('rating', { ascending: true })
    } else if (sortOption === 'rating_desc') {
      query = query.order('rating', { ascending: false })
    }
  }

  const { data, error } = await query

  if (error) {
    throw error
  }

  return { data }
}

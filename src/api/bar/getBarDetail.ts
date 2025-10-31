import supabase from '../../supabase'

export type BarDetail = Awaited<ReturnType<typeof getBarDetail>>['data']

export const getBarDetail = async (id: number) => {
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
          description,
          image,
          abv,
          price,
          signature_menu_ingredients(
            ingredients(
              id,
              name
            )
          )
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

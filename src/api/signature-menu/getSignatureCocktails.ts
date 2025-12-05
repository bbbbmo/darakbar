import supabase from '@/lib/supabase/supabase'

export type SignatureCocktail = Awaited<
  ReturnType<typeof getSignatureCocktails>
>['data'][0]

export const getSignatureCocktails = async () => {
  const { data, error } = await supabase.from('signature_menus').select(`
    id,
    name,
    description,
    image_path,
    abv,
    price,
    signature_menu_ingredients(
      ingredients(
        id,
        name
      )
    )
  `)

  if (error) {
    throw error
  }

  return { data }
}

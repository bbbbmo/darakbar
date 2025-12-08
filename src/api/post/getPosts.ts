import supabase from '@/lib/supabase/supabase'

export type Post = NonNullable<Awaited<ReturnType<typeof getPosts>>['data']>[0]

export const getPosts = async () => {
  const { data, error } = await supabase.from('posts').select(`
    id,
    title,
    content,
    image_paths,
    like_count,
    event_start_date,
    event_end_date,
    created_at,
    updated_at,
    userinfo(
      id,
      name,
      profile_image_path
    ),
    new_menus(
      id,
      name,
      type,
      description,
      price,
      image_path
    ),
    tags(
      id,
      name
    )
  `)

  if (error) {
    throw error
  }

  return { data }
}

import supabase from '@/lib/supabase/supabase'

export type Post = NonNullable<Awaited<ReturnType<typeof getPosts>>['data']>[0]

export type getPostsQueryParams = {
  postTypeId?: number
}

export const getPosts = async (params?: getPostsQueryParams) => {
  let query = supabase
    .from('posts')
    .select(
      `
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
    tag_id,
    tags(
      id,
      name
    )
  `,
    )
    .order('created_at', { ascending: false })

  if (params?.postTypeId) {
    query = query.eq('tag_id', params.postTypeId)
  }
  const { data, error } = await query

  if (error) {
    throw error
  }

  return { data }
}

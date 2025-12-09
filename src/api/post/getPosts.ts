import supabase from '@/lib/supabase/supabase'

export type Post = NonNullable<Awaited<ReturnType<typeof getPosts>>['data']>[0]

export type getPostsQueryParams = {
  userId?: string
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
    user_id,
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

  if (params?.userId) {
    query = query.eq('user_id', params.userId)
  }
  if (params?.postTypeId) {
    query = query.eq('tag_id', params.postTypeId)
  }
  const { data, error } = await query

  if (error) {
    throw error
  }

  return { data }
}

export const getPost = async (postId: number) => {
  const { data, error } = await supabase
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
    user_id,
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
    .eq('id', postId)
    .single()

  if (error) {
    throw error
  }
  return { data }
}

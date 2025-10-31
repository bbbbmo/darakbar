import supabase from '@lib/supabase/supabase'

export type BarReview = NonNullable<
  Awaited<ReturnType<typeof getBarReviews>>['data']
>[0]

export const getBarReviews = async (barId: number) => {
  const { data, error } = await supabase
    .from('reviews')
    .select(
      `
      id,
      bar_id,
      userinfo(
        id,
        name,
        profile_img_url
      ),
      rating,
      body,
      images,
      review_tags(
        tags(
          id,
          name
        )
      ),
      likes(
        id,
        user_id,
        comment_id,
        review_id
      ),
      like_count,
      comment_count,
      visit_date,
      created_at,
      updated_at
    `,
    )
    .eq('bar_id', barId)
    .order('created_at', { ascending: false })

  return { data, error }
}

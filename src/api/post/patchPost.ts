import { PostForm } from '@/app/(main)/bar-news/_types/form.schemes'
import supabase from '@/lib/supabase/supabase'
import { handleRpcError } from '../handleError'
import { uploadAndUpdatePostImages } from './uploadPostImage'

export const patchPost = async (postId: number, body: PostForm) => {
  const { data, error } = await supabase.rpc('update_post_with_new_menus', {
    p_post_id: postId,
    p_post_type_id: body.postTypeId,
    p_title: body.title,
    p_content: body.content,
    p_event_start_date: body.eventStartDate
      ? body.eventStartDate.toISOString()
      : undefined,
    p_event_end_date: body.eventEndDate
      ? body.eventEndDate.toISOString()
      : undefined,
    p_new_menus:
      body.newMenus?.map((menu) => {
        return {
          p_name: menu.name,
          p_type: menu.type,
          p_description: menu.description,
          p_price: menu.price,
        }
      }) ?? [],
  })

  if (error) {
    throw error
  }

  handleRpcError(data)

  await uploadAndUpdatePostImages(postId, body)

  return true
}

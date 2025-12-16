import { PostForm } from '@/app/(post)/bar-news/_types/form.schemes'
import supabase from '@/lib/supabase/supabase'
import { handleRpcError } from '../handleError'
import { getNewMenuImagePath, getPostImagePath } from '../file/getStoragePath'
import { uploadFiles } from '../file/storage'
import { uploadAndUpdatePostImages } from './uploadPostImage'

export const postPost = async (body: PostForm) => {
  const { data, error } = await supabase.rpc('create_post_with_new_menus', {
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

  const postId =
    data && typeof data === 'object' && 'post_id' in data
      ? (data as { post_id: number }).post_id
      : undefined

  if (!postId) {
    throw new Error('게시글 ID를 가져올 수 없습니다.')
  }

  await uploadAndUpdatePostImages(postId, body)

  return postId
}

import { PostCreateInput } from '@/app/(main)/bar-news/create/_types/post-create-form.schemes'
import supabase from '@/lib/supabase/supabase'
import { handleRpcError } from '../handleError'
import { getNewMenuImagePath, getPostImagePath } from '../file/getStoragePath'
import { uploadFiles } from '../file/storage'

export const postPost = async (body: PostCreateInput) => {
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

const uploadAndUpdatePostImages = async (
  postId: number,
  body: PostCreateInput,
) => {
  try {
    const postImagePath = getPostImagePath(postId)
    const newMenuImagePath = getNewMenuImagePath(postId)

    let postImagePaths: string[] = []
    if (body.postImages && body.postImages.length > 0) {
      const validPostImages = body.postImages.filter(
        (file): file is File => file instanceof File,
      )
      if (validPostImages.length > 0) {
        postImagePaths = await uploadFiles(validPostImages, postImagePath)
      }
    }

    let newMenuImagePaths: string[] = []
    if (body.newMenus && body.newMenus.length > 0) {
      const validNewMenuImages = body.newMenus
        .map((menu) => menu.newMenuImage)
        .filter((file): file is File => file instanceof File)
      if (validNewMenuImages.length > 0) {
        const uploadedPaths = await uploadFiles(
          validNewMenuImages,
          newMenuImagePath,
        )
        newMenuImagePaths.push(...uploadedPaths)
      }
    }

    if (postImagePaths.length > 0) {
      const { error: postUpdateError } = await supabase
        .from('posts')
        .update({ image_paths: postImagePaths })
        .eq('id', postId)

      if (postUpdateError) {
        throw new Error(
          `게시글 이미지 업데이트 실패: ${postUpdateError.message}`,
        )
      }
    }

    if (newMenuImagePaths.length > 0) {
      const { data: newMenus, error: newMenuFetchError } = await supabase
        .from('new_menus')
        .select(`id`)
        .eq('post_id', postId)
        .order('id', { ascending: true })

      if (newMenuFetchError) {
        throw new Error(`신메뉴 조회 실패: ${newMenuFetchError.message}`)
      }

      if (newMenus) {
        const updatePromises = newMenus.map((menu, index) =>
          supabase
            .from('new_menus')
            .update({ image_path: newMenuImagePaths[index] })
            .eq('id', menu.id),
        )

        const updateResults = await Promise.all(updatePromises)
        const updateErrors = updateResults
          .map((result) => result.error)
          .filter((error): error is NonNullable<typeof error> => error !== null)

        if (updateErrors.length > 0) {
          throw new Error(
            `신메뉴 이미지 업데이트 실패: ${updateErrors[0].message}`,
          )
        }
      }
    }
  } catch (error) {
    throw new Error(
      `이미지 업로드 및 업데이트 중 오류 발생: ${
        error instanceof Error ? error.message : '알 수 없는 오류'
      }`,
    )
  }
}

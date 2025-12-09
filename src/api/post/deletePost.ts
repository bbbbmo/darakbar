import supabase from '@/lib/supabase/supabase'
import { deleteFiles } from '../file/storage'

const deletePostImages = async (postId: number) => {
  const imagePathsToDelete: string[] = []

  const { data: post, error: fetchError } = await supabase
    .from('posts')
    .select(
      `
      image_paths,
      new_menus(
        image_path
      )
    `,
    )
    .eq('id', postId)
    .single()

  if (fetchError) {
    throw fetchError
  }

  if (post?.image_paths) {
    imagePathsToDelete.push(...post.image_paths)
  }

  if (post?.new_menus) {
    post.new_menus.forEach((menu) => {
      if (menu.image_path) {
        imagePathsToDelete.push(menu.image_path)
      }
    })
  }
  await deleteFiles(imagePathsToDelete)
}

export const deletePost = async (postId: number) => {
  await deletePostImages(postId)
  const { data, error } = await supabase.from('posts').delete().eq('id', postId)

  if (error) {
    throw error
  }
  return data
}

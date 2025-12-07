import supabase from '@/lib/supabase/supabase'
import { imageFileValidation } from '@/utils/file/imageFileValidation'
import { getPublicUrl, uploadFile } from '../file/storage'
import { getUserProfileImagePath } from '../file/getStoragePath'

/**
 * @description 유저 아바타 URL 가져오기
 * @param userId 유저 아이디
 */
export const getUserAvatarUrl = async (userId: string) => {
  const { data, error } = await supabase
    .from('userinfo')
    .select('profile_image_path')
    .eq('id', userId)
    .single()
  if (error) {
    throw new Error(`유저 프로필 이미지 가져오기 중 에러 발생 ${error.message}`)
  }

  if (!data?.profile_image_path) {
    return null
  }

  const publicUrl = await getPublicUrl(data.profile_image_path)
  return publicUrl
}

/**
 * @description 유저 프로필 이미지 업로드 및 업데이트
 * @param file 업로드할 이미지 파일
 * @param userId 유저 아이디
 * @returns 업로드된 이미지 URL
 */
export const postUserAvatar = async (file: File, userId: string) => {
  try {
    imageFileValidation(file)

    const filePath = getUserProfileImagePath(userId)
    const publicUrl = await uploadFile(file, filePath)

    // 데이터베이스에 프로필 이미지 URL 업데이트
    const { error: updateError } = await supabase
      .from('userinfo')
      .update({
        profile_image_path: publicUrl,
      })
      .eq('id', userId)

    if (updateError) {
      throw new Error(`프로필 이미지 URL 업데이트 실패: ${updateError.message}`)
    }

    return publicUrl
  } catch (error) {
    throw new Error(`프로필 이미지 업로드 에러: ${error}`)
  }
}

/**
 * @description 유저 프로필 이미지 삭제
 * @param userId 유저 아이디
 */
export const deleteUserAvatar = async (userId: string) => {
  try {
    const filePath = `${userId}/profile`
    // Storage에서 기존 이미지 파일들 삭제
    const { data: files, error: listError } = await supabase.storage
      .from('darakbar-storage')
      .list(filePath)

    if (listError) {
      throw new Error(`기존 파일 목록 조회 실패: ${listError.message}`)
    }

    if (files && files.length > 0) {
      const fileNames = files.map((file) => `${userId}/profile/${file.name}`)

      const { error: deleteError } = await supabase.storage
        .from('darakbar-storage')
        .remove(fileNames)

      if (deleteError) {
        throw new Error(`기존 파일 삭제 실패: ${deleteError.message}`)
      }
    }

    // 데이터베이스에서 프로필 이미지 URL 제거
    const { error: updateError } = await supabase
      .from('userinfo')
      .update({
        profile_image_path: null,
      })
      .eq('id', userId)

    if (updateError) {
      console.warn('프로필 이미지 URL 제거 실패:', updateError.message)
    }
  } catch (error) {
    throw new Error(`프로필 이미지 삭제 에러: ${error}`)
  }
}

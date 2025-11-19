import { User } from '@supabase/supabase-js'
import supabase from '@lib/supabase/supabase'

export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) {
    throw new Error(error?.message || '유저 정보를 가져올 수 없습니다.')
  }

  return { user: data.user } // User 객체
}

/**
 * @description 유저 프로필 수정
 * @param newName 새로운 이름
 * @param newEmail 새로운 이메일
 * @param newPassword 새로운 비밀번호
 * @returns 수정된 유저 정보
 */
export const patchUser = async (
  newName?: string | null,
  newEmail?: string | null,
  newPassword?: string | null,
): Promise<User> => {
  const { data, error } = await supabase.auth.updateUser({
    ...(newEmail && { email: newEmail }),
    ...(newPassword && { password: newPassword }),
    ...(newName
      ? {
          data: {
            ...(newName && { name: newName }),
          },
        }
      : {}),
  })
  if (error) {
    throw new Error(`유저 프로필 수정 중 에러 발생 ${error.message}`)
  }
  return data.user
}

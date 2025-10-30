'use client'

import { useForm } from 'react-hook-form'
import { EditProfileFormData } from './EditProfileForm.types'
import { Button } from 'flowbite-react'
import { useState } from 'react'
import EditProfileCard from './EditProfileCard'
import FormPasswordInput from '@components/Forms/FormPasswordInput'
import {
  updateUserProfile,
  uploadUserProfileImage,
} from '@lib/supabase/api/user'
import AppSnackBar from '@/components/SnackBar/SnackBar'
import { AppSnackBarColor } from '@/components/SnackBar/SnackBar.types'
import { useCurrentUser } from '@/hooks/tanstack-query/useCurrentUserQuery'

export default function EditProfileForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { userId } = useCurrentUser()

  console.log(setIsLoading)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditProfileFormData>()

  const patchUserProfile = async ({
    name,
    email,
    password,
    profileImage,
  }: EditProfileFormData) => {
    try {
      setIsLoading(true)
      if (profileImage && userId) {
        await uploadUserProfileImage(profileImage, userId)
      }
      await updateUserProfile(name, email, password)
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(patchUserProfile)}
    >
      <EditProfileCard register={register} watch={watch} errors={errors} />

      <FormPasswordInput
        register={register}
        watch={watch}
        errors={errors}
        required={false}
      />
      <div className="flex justify-end gap-3">
        <Button className="btn-primary">회원 탈퇴</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? '저장 중...' : '저장하기'}
        </Button>
      </div>
      {error && (
        <AppSnackBar
          color={AppSnackBarColor.FAILURE}
          subject="프로필 수정 실패"
          message={error}
          position="bottom"
        />
      )}
    </form>
  )
}

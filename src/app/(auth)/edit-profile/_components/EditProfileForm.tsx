'use client'

import { useForm } from 'react-hook-form'
import type { EditProfileForm } from './EditProfileForm.schemes'
import { EditProfileFormSchema } from './EditProfileForm.schemes'
import {
  Avatar,
  Button,
  Card,
  FileInput,
  HelperText,
  Label,
  TextInput,
} from 'flowbite-react'
import { useState } from 'react'
import { patchUser } from '@/api/user/user'
import { postUserAvatar } from '@/api/user/userAvatar'
import AppSnackBar from '@/components/SnackBar/SnackBar'
import { AppSnackBarColor } from '@/components/SnackBar/SnackBar.types'
import { zodResolver } from '@hookform/resolvers/zod'
import FormItem from '@/components/Forms/FormItem'
import { useAuthStore } from '@/stores/auth.store'

export default function EditProfileForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { userData } = useAuthStore()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditProfileFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: userData?.name || '',
      email: userData?.email || '',
      profileImage: null,
    },
  })

  const changeProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
      register('profileImage').onChange(e)
    }
  }

  const patchUserProfile = async (data: EditProfileForm) => {
    try {
      setIsLoading(true)
      if (data.profileImage && userData?.id) {
        await postUserAvatar(data.profileImage, userData.id)
      }
      await patchUser(data.name, data.email, data.password)
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
      <Card className="bg-secondary shadow-2xl">
        <div className="flex flex-col gap-2">
          <div className="flex gap-6">
            <Label id="profile-image" className="cursor-pointer">
              <Avatar
                img={imagePreview || ''}
                alt="User Profile"
                size="lg"
                rounded
              />
              <FileInput
                id="profile-image"
                className="hidden"
                accept="image/*"
                onChange={changeProfileImage}
              />
            </Label>
            <FormItem label="이름" wrapperClassName="grow">
              <TextInput
                {...register('name')}
                placeholder="이름을 입력해주세요"
              />
              {errors.name && (
                <HelperText className="font-medium">
                  {errors.name.message}
                </HelperText>
              )}
            </FormItem>
          </div>
          <FormItem label="이메일">
            <TextInput
              {...register('email')}
              placeholder="이메일을 입력해주세요"
            />
            {errors.email && (
              <HelperText className="font-medium">
                {errors.email.message}
              </HelperText>
            )}
          </FormItem>
        </div>
      </Card>
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

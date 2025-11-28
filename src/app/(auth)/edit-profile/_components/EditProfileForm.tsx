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
import { useEffect, useState } from 'react'
import { patchUser } from '@/api/user/user'
import { postUserAvatar } from '@/api/user/userAvatar'
import { zodResolver } from '@hookform/resolvers/zod'
import FormItem from '@/components/Forms/FormItem'
import { useAuthStore } from '@/stores/auth.store'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queries } from '@/api/queries'
import { useInvalidateQueries } from '@/hooks/tanstack-query/useInvalidateQueries'
import { snackBar } from '@/app/_providers/SnackBarProvider'

export default function EditProfileForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { userData } = useAuthStore()

  const { data: profileImageUrl } = useQuery({
    ...queries.user.avatar(userData?.id || ''),
    enabled: !!userData?.id, // userId가 있을 때만 쿼리 실행
  })

  const { invalidateQueries } = useInvalidateQueries()

  const { mutate: patchUserMutaition, isPending } = useMutation({
    mutationFn: async (data: EditProfileForm) => {
      if (data.profileImage && userData?.id) {
        await postUserAvatar(data.profileImage, userData?.id || '')
      }
      await patchUser(data.name, data.email)
    },
    onSuccess: () => {
      snackBar.showSuccess(
        '프로필 수정 성공',
        '프로필이 성공적으로 수정되었습니다.',
      )
      invalidateQueries([queries.user.avatar(userData?.id || '').queryKey])
    },
    onError: (error) => {
      snackBar.showError(
        '프로필 수정 실패',
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다.',
      )
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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
      setValue('profileImage', file)
    }
  }

  useEffect(() => {
    if (profileImageUrl) {
      setImagePreview(profileImageUrl)
    }
  }, [profileImageUrl])

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit((data) => {
        console.log('data', data)
        patchUserMutaition(data)
      })}
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
        <Button type="submit" disabled={isPending}>
          {isPending ? '저장 중...' : '저장하기'}
        </Button>
      </div>
    </form>
  )
}

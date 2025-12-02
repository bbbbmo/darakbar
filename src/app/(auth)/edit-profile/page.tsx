import FormHeader from '@/components/ui/forms/FormHeader'
import { Card } from 'flowbite-react'
import EditProfileForm from './_components/EditProfileForm'
import BackButton from '@/components/ui/buttons/BackButton'

// [TODO] 유저 프로필 이미지 기능 추가하기
export default function EditProfile() {
  return (
    <>
      <Card className="bg-primary relative w-lg p-8">
        <BackButton />
        <FormHeader title="프로필 수정" />
        <EditProfileForm />
      </Card>
    </>
  )
}

import { Card } from 'flowbite-react'
import SignForm from './_components/SignInForm'
import FormHeader from '@/components/ui/forms/FormHeader'
import BackButton from '@/components/ui/buttons/BackButton'

export default function SignIn() {
  return (
    <Card className="bg-primary relative w-lg p-8">
      <BackButton />
      <FormHeader title="로그인" />
      <SignForm />
    </Card>
  )
}

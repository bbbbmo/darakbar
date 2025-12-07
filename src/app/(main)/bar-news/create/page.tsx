import { Suspense } from 'react'
import PostCreateForm from './_components/PostCreateForm'
import Loading from '@/app/loading'

export default function BarNewsCreatePage() {
  return (
    <Suspense fallback={<Loading />}>
      <PostCreateForm />
    </Suspense>
  )
}

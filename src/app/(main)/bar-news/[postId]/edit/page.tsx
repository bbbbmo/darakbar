import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import PostEditForm from './_components/PostEditForm'
import { queries } from '@/api/queries'
import { Suspense } from 'react'
import Loading from '@/app/loading'
import PostEditNavBar from './_components/PostEditNavBar'

export default async function BarNewsEditPage({
  params,
}: {
  params: { postId: number }
}) {
  const { postId } = await params
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(queries.post.detail(postId))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Loading />}>
        <PostEditNavBar />
        <div className="mx-[20vw] flex flex-col">
          <PostEditForm />
        </div>
      </Suspense>
    </HydrationBoundary>
  )
}

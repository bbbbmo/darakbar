import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import PostEditForm from './_components/PostEditForm'
import { queries } from '@/api/queries'

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
      <PostEditForm />
    </HydrationBoundary>
  )
}

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { queries } from '@/api/queries'
import PostSearch from './_components/PostSearch'

export default async function BarNewsPage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(queries.tag.posts)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostSearch />
    </HydrationBoundary>
  )
}

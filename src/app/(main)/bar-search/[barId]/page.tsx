import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import BarDetailContent from './_components/BarDetailContent'
import { queries } from '@/api/queries'

export default async function BarDetailPage({
  params,
}: {
  params: { barId: number }
}) {
  const { barId } = await params

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(queries.bar.detail(barId))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BarDetailContent />
    </HydrationBoundary>
  )
}

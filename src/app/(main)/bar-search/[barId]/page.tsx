import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { getBarDetail } from '@/lib/supabase/api/bar/getBarDetail'
import BarDetailContent from './_components/BarDetailContent'

export default async function BarDetailPage({
  params,
}: {
  params: { barId: number }
}) {
  const { barId } = await params

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['bar', barId],
    queryFn: () => getBarDetail(barId),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BarDetailContent barId={barId} />
    </HydrationBoundary>
  )
}

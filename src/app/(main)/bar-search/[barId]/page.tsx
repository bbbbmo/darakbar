import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { getBarDetail } from '@api/bar/getBarDetail'
import BarDetailContent from './_components/BarDetailContent'
import { BarProvider } from './_providers/BarProviders'

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
    <BarProvider barId={barId}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BarDetailContent />
      </HydrationBoundary>
    </BarProvider>
  )
}

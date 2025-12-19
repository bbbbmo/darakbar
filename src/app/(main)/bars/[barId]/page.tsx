import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import BarDetailContent from './_components/BarDetailContent'
import { queries } from '@/api/queries'
import ContentWrapper from '@/components/ui/layout/ContentWrapper'
import SubNavBar from '../../_components/SubNavBar'

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
      <SubNavBar
        title="상세 정보"
        description="바의 상세 정보를 확인할 수 있어요."
        href="/bars"
      />
      <ContentWrapper>
        <BarDetailContent />
      </ContentWrapper>
    </HydrationBoundary>
  )
}

import BarSearchHeader from './_components/BarSearchHeader'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { queries } from '@/api/queries'
import BarSearchFooter from './_components/BarSearchFooter'
import BarSearchBody from './_components/BarSearchBody'

export default async function BarSearch() {
  const queryClient = new QueryClient()

  // 서버에서 데이터 프리페치
  await queryClient.prefetchQuery(queries.bar.all)
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BarSearchHeader />
      <BarSearchBody />
      <BarSearchFooter />
    </HydrationBoundary>
  )
}

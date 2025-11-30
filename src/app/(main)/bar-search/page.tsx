import BarFilter from './_components/BarFilter'
import BarSearchHeader from './_components/BarSearchHeader'
import BarList from './_components/BarList'
import BarMap from './_components/BarMap'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { queries } from '@/api/queries'
import BarSearchFooter from './_components/BarSearchFooter'

export default async function BarSearch() {
  const queryClient = new QueryClient()

  // 서버에서 데이터 프리페치
  await queryClient.prefetchQuery(queries.bar.all)
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BarSearchHeader />
      <BarFilter />
      <BarMap />
      <BarList />
      <BarSearchFooter />
    </HydrationBoundary>
  )
}

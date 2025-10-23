import BarFilter from './_components/BarFilter'
import BarSearchHeader from './_components/BarSearchHeader'
import BarList from './_components/BarList'
import BarMap from './_components/BarMap'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { getBars } from '@/lib/supabase/api/bar/getBars'
import { Suspense } from 'react'
import Loading from '@/app/loading'

export default async function BarSearch() {
  const queryClient = new QueryClient()

  // 서버에서 데이터 프리페치
  await queryClient.prefetchQuery({
    queryKey: ['bars'],
    queryFn: () => getBars(),
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Loading />}>
        <BarSearchHeader />
        <BarFilter />
        <BarMap />
        <BarList />
      </Suspense>
    </HydrationBoundary>
  )
}

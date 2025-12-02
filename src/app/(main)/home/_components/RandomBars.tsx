'use client'

import { queries } from '@/api/queries'
import { useQuery } from '@tanstack/react-query'
import BarCard from '../../_components/BarCard/BarCard'
import { useRouter } from 'next/navigation'

export default function RandomBars() {
  const router = useRouter()
  const { data: bars, isLoading } = useQuery(queries.bar.all)

  const filteredBars =
    bars?.data?.filter((bar) => bar.bar_images).slice(0, 3) || []

  const goToBarDetail = (barId: number) => {
    router.push(`/bar-search/${barId}`)
  }

  return (
    <section className="relative z-10">
      <div className="mb-8 flex flex-col items-center gap-4">
        <h2 className="text-3xl font-bold">칵테일 바 찾기</h2>
        <p className="text-center text-lg text-zinc-500">
          <span>취향에 맞는 바를 찾아볼 수 있어요🍸</span>
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="animate-infinite-scroll-reverse flex w-fit gap-6">
          {[...filteredBars, ...filteredBars].map((bar, index) => (
            <BarCard
              key={`${bar.id}-${index}`}
              className={'h-125 w-100'}
              barInfo={bar}
              loading={isLoading}
              onClick={() => goToBarDetail(bar.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

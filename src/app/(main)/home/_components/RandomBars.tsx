'use client'

import { queries } from '@/api/queries'
import { useQuery } from '@tanstack/react-query'
import BarCard from '@/components/bar/BarCard'
import { useRouter } from 'next/navigation'
import { Button } from 'flowbite-react'

export default function RandomBars() {
  const router = useRouter()
  const { data: bars, isLoading } = useQuery(queries.bar.all())

  const filteredBars =
    bars?.data?.filter((bar) => bar.image_paths).slice(0, 6) || []

  const goToBarSearch = () => {
    router.push('/bar-search')
  }

  const goToBarDetail = (barId: number) => {
    router.push(`/bar-search/${barId}`)
  }

  return (
    <section className="relative z-10">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-3xl font-bold">칵테일 바 찾기</h2>
        <p className="text-center text-lg text-zinc-500">
          <span>취향에 맞는 바를 찾아볼 수 있어요🍸</span>
        </p>
      </div>
      <Button className="mx-auto my-8" color="primary" onClick={goToBarSearch}>
        바 탐색하기
      </Button>
      <div className="relative overflow-hidden">
        <div className="animate-infinite-scroll-reverse flex w-fit gap-8">
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

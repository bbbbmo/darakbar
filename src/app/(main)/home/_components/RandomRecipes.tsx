'use client'

import { Card } from 'flowbite-react'
// import BarCard from '../../_components/BarCard/BarCard'
// import { useQuery } from '@tanstack/react-query'
// import { queries } from '@/api/queries'

export default function RandomRecipes() {
  // const { data: bars, isLoading } = useQuery(queries.bar.all)

  return (
    <Card className="bg-primary w-full">
      {/* <div className="grid w-full grid-cols-3 gap-20">
        {bars?.data?.slice(0, 3).map((bar) => (
          <BarCard key={bar.id} barInfo={bar} loading={isLoading} />
        ))}
      </div> */}
    </Card>
  )
}

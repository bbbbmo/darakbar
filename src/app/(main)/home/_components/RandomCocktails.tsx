'use client'

import { useQuery } from '@tanstack/react-query'
import CocktailCard from '@/components/bar/CocktailCard'
import { queries } from '@/api/queries'

export default function RandomCocktails() {
  const { data: signatureMenus, isLoading } = useQuery({
    ...queries.signatureMenu.all,
  })

  const filteredSignatureMenus =
    signatureMenus?.data.filter((menu) => menu.image_path).slice(0, 6) || []

  return (
    <section className="relative z-10">
      <div className="mb-8 flex flex-col items-center gap-4">
        <h2 className="text-3xl font-bold">시그니처 칵테일</h2>
        <p className="text-center text-lg text-zinc-500">
          <span>각 바를 대표하는 특별한 칵테일을 소개합니다</span>
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="animate-infinite-scroll flex w-fit gap-6">
          {[...filteredSignatureMenus, ...filteredSignatureMenus].map(
            (signatureMenu, index) => {
              return (
                <CocktailCard
                  key={`${signatureMenu.id}-${index}`}
                  menu={signatureMenu}
                  loading={isLoading}
                  className="w-80 flex-shrink-0"
                />
              )
            },
          )}
        </div>
      </div>
    </section>
  )
}

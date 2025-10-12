'use client'

import TitleText from '@/components/TitleText'
import { BarDetail } from '@/lib/supabase/api/bar/getBarDetail'
import { LiaCocktailSolid } from 'react-icons/lia'
import { useState } from 'react'
import SignatureMenuCard from './SignatureMenuCard'
import { Button } from 'flowbite-react'

export default function BarSignatureMenus({
  barDetail,
}: {
  barDetail: BarDetail
}) {
  if (!barDetail) return null

  const [visibleCount, setVisibleCount] = useState(6)

  const totalMenus = barDetail.signature_menus.length
  const visibleMenus = barDetail.signature_menus.slice(0, visibleCount)
  const hasMore = visibleCount < totalMenus

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, totalMenus))
  }

  return (
    <>
      <TitleText
        icon={<LiaCocktailSolid size={40} className="text-amber-400" />}
        title="시그니처 칵테일"
      />
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {visibleMenus.map((menu) => (
          <SignatureMenuCard key={menu.id} menu={menu} />
        ))}
      </div>
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Button onClick={handleLoadMore}>
            더보기 ({totalMenus - visibleCount}개 더)
          </Button>
        </div>
      )}
    </>
  )
}

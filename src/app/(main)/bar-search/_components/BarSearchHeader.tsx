'use client'

import HeaderCard from '@/components/Cards/HeaderCard'
import { Button } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import { HiOutlinePlusSm } from 'react-icons/hi'

export default function PersonalRecipeHeader() {
  const router = useRouter()
  const goToBarRegisterPage = () => {
    router.push('/bar-register')
  }
  return (
    <HeaderCard
      title="칵테일 바 찾기"
      message="취향에 맞는 전국의 칵테일 바를 탐색해보세요"
    >
      <Button
        className="ml-auto flex items-center gap-2 font-bold"
        color="primary"
        size="sm"
        onClick={goToBarRegisterPage}
      >
        <HiOutlinePlusSm size={20} /> 신규 바 등록
      </Button>
    </HeaderCard>
  )
}

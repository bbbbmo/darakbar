'use client'

import HeaderCard from '@/components/Cards/HeaderCard'
import { Button } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import { HiOutlineArrowRight } from 'react-icons/hi'

export default function IntroSection() {
  const router = useRouter()
  const goPersonalRecipePage = () => {
    router.push('/bar-search')
  }
  return (
    <HeaderCard
      title="다락바"
      message="마치 나만의 작은 다락방처럼, 잊혀진 보물과 같은 칵테일 바들이 숨어있는 공간입니다."
    >
      <Button
        className="btn-secondary mt-10 ml-auto w-xs font-bold"
        onClick={goPersonalRecipePage}
      >
        시작하기
        <HiOutlineArrowRight size={20} className="ml-2" />
      </Button>
    </HeaderCard>
  )
}

'use client'

import UploadCard from '@/components/ui/cards/UploadCard'
import { Button } from 'flowbite-react'
import { HiOutlineAnnotation } from 'react-icons/hi'
import { useRouter } from 'next/navigation'

export default function BarSearchFooter() {
  const router = useRouter()

  const goToBarSuggestionPage = () => {
    router.push('/suggestion')
  }

  return (
    <UploadCard
      title="공유하고 싶은 나만의 바가 있나요?"
      description="알고 계신 바 정보를 공유해서 다른 사용자들에게 도움을 주세요"
    >
      <Button
        className="flex items-center gap-2"
        onClick={goToBarSuggestionPage}
      >
        <HiOutlineAnnotation size={20} />바 제안하기
      </Button>
    </UploadCard>
  )
}

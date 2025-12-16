'use client'

import { Button } from 'flowbite-react'
import PostNavBar from '../../_components/PostNavBar'
import { useRouter } from 'next/navigation'
import { useCheckLogin } from '@/hooks/useCheckLogin'

export default function BarNewsNavbar() {
  const router = useRouter()
  const { isLoggedIn } = useCheckLogin()

  const goToBarNewsCreatePage = () => {
    router.push('/bar-news/create')
  }

  return (
    <PostNavBar
      text="바 소식"
      description="바에서 일어나는 최신 소식을 확인해보세요."
    >
      {isLoggedIn && (
        <Button color="primary" onClick={goToBarNewsCreatePage}>
          게시글 작성
        </Button>
      )}
    </PostNavBar>
  )
}

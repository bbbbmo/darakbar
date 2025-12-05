'use client'

import { Button } from 'flowbite-react'
import { useRouter } from 'next/navigation'

export default function PostCreateButton() {
  const router = useRouter()

  const goToBarNewsCreatePage = () => {
    router.push('/bar-news/create')
  }
  return (
    <Button
      color="primary"
      className="mx-auto my-8"
      onClick={goToBarNewsCreatePage}
    >
      게시글 작성
    </Button>
  )
}

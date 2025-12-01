import UploadCard from '@/components/Cards/UploadCard'
import { Button } from 'flowbite-react'
import { HiOutlineMail } from 'react-icons/hi'

export default function LandingFooter() {
  const CONTACT_LINK = 'https://github.com/bbbbmo'

  return (
    <UploadCard
      title="궁금한 점이 있나요?"
      description="서비스 이용 중 불편한 점이나 제안하고 싶은 아이디어가 있다면 연락해주세요"
    >
      <a
        href={CONTACT_LINK}
        target="_blank"
        rel="noreferrer"
        className="inline-block"
      >
        <Button className="flex gap-2">
          <HiOutlineMail size={20} />
          연락하기
        </Button>
      </a>
    </UploadCard>
  )
}

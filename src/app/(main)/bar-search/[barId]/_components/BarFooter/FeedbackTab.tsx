import { Button } from 'flowbite-react'
import { HiOutlineCamera, HiOutlineUpload } from 'react-icons/hi'
import UploadCard from '../../../../../../components/Cards/UploadCard'

export default function FeedbackTab() {
  return (
    <UploadCard
      icon={<HiOutlineCamera size={40} className="text-gray-400" />}
      title="메뉴가 최신이 아닌가요?"
      description="최신 메뉴판을 업로드해서 다른 사용자들에게 도움을 주세요"
      action={
        <Button className="flex w-40 items-center gap-2">
          <HiOutlineUpload size={20} />
          메뉴판 업로드
        </Button>
      }
    />
  )
}

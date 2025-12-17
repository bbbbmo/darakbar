import SubNavBar from '@/app/(main)/_components/SubNavBar'
import { Button } from 'flowbite-react'

export default function PostCreateNavBar() {
  return (
    <SubNavBar
      title="새 게시물 작성"
      description="새로운 게시물을 작성할 수 있습니다."
    >
      <Button type="submit" color="primary">
        게시하기
      </Button>
    </SubNavBar>
  )
}

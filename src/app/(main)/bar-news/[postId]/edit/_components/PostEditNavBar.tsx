import SubNavBar from '@/app/(main)/_components/SubNavBar'
import { Button } from 'flowbite-react'

export default function PostEditNavBar() {
  return (
    <SubNavBar title="게시물 수정" description="게시물을 수정할 수 있습니다.">
      <Button type="submit" color="primary">
        수정하기
      </Button>
    </SubNavBar>
  )
}

import {
  HiOutlineCake,
  HiOutlineSparkles,
  HiOutlineSpeakerphone,
  HiOutlineTrendingUp,
} from 'react-icons/hi'
import { PostType } from '../_types/post-type.types'
import { IconType } from 'react-icons/lib'

export type PostTab = {
  icon: IconType
  title: PostType | '전체'
}

export const postTabs: PostTab[] = [
  { icon: HiOutlineTrendingUp, title: '전체' },
  { icon: HiOutlineCake, title: '신메뉴' },
  { icon: HiOutlineSparkles, title: '이벤트' },
  { icon: HiOutlineSpeakerphone, title: '소식' },
]

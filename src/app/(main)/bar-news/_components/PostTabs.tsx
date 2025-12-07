'use client'

import { TabItem, Tabs, TabsRef } from 'flowbite-react'
import { useRef } from 'react'
import {
  HiOutlineCake,
  HiOutlineSparkles,
  HiOutlineSpeakerphone,
  HiOutlineTrendingUp,
} from 'react-icons/hi'
import { postTypes } from '../_const/post-types.const'

export default function PostTabs() {
  const tabsRef = useRef<TabsRef>(null)

  return (
    <div className="sticky top-18 z-10 opacity-90">
      <Tabs aria-label="Post tabs" ref={tabsRef} variant="fullWidth">
        <TabItem icon={HiOutlineTrendingUp} active title="전체"></TabItem>
        <TabItem icon={HiOutlineSparkles} title={postTypes[0]}></TabItem>
        <TabItem icon={HiOutlineCake} title={postTypes[1]}></TabItem>
        <TabItem icon={HiOutlineSpeakerphone} title={postTypes[2]}></TabItem>
      </Tabs>
    </div>
  )
}

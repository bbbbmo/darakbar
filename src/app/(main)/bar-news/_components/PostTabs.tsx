'use client'

import { TabItem, Tabs, TabsRef } from 'flowbite-react'
import { useRef } from 'react'
import {
  HiOutlineCake,
  HiOutlineSparkles,
  HiOutlineSpeakerphone,
  HiOutlineTrendingUp,
} from 'react-icons/hi'
import { postTabs } from '../_const/post-tabs.const'

export default function PostTabs() {
  const tabsRef = useRef<TabsRef>(null)

  return (
    <div className="sticky top-18 z-10 opacity-90">
      <Tabs aria-label="Post tabs" ref={tabsRef} variant="fullWidth">
        <TabItem icon={HiOutlineTrendingUp} active title="전체"></TabItem>
        <TabItem icon={HiOutlineSparkles} title={postTabs[0]}></TabItem>
        <TabItem icon={HiOutlineCake} title={postTabs[1]}></TabItem>
        <TabItem icon={HiOutlineSpeakerphone} title={postTabs[2]}></TabItem>
      </Tabs>
    </div>
  )
}

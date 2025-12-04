'use client'

import { TabItem, Tabs, TabsRef } from 'flowbite-react'
import { useRef } from 'react'

export default function PostTabs() {
  const tabsRef = useRef<TabsRef>(null)

  return (
    <div className="sticky top-18 z-10 opacity-90">
      <Tabs aria-label="Post tabs" ref={tabsRef} variant="fullWidth">
        <TabItem active title="전체"></TabItem>
        <TabItem title="신메뉴"></TabItem>
        <TabItem title="이벤트"></TabItem>
        <TabItem title="소식"></TabItem>
      </Tabs>
    </div>
  )
}

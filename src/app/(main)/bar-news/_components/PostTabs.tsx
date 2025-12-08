'use client'

import { TabItem, Tabs, TabsRef } from 'flowbite-react'
import { useRef } from 'react'
import { postTabs } from '../_const/post-tabs.const'
import { usePostTabStore } from '../_stores/post-tab.store'

export default function PostTabs() {
  const tabsRef = useRef<TabsRef>(null)
  const { setSelectedPostTab } = usePostTabStore()

  return (
    <div className="sticky top-18 z-10 opacity-90">
      <Tabs
        aria-label="Post tabs"
        ref={tabsRef}
        variant="fullWidth"
        onActiveTabChange={(index) => setSelectedPostTab(postTabs[index].title)}
      >
        {postTabs.map((tab, index) => (
          <TabItem key={index} icon={tab.icon} active title={tab.title} />
        ))}
      </Tabs>
    </div>
  )
}

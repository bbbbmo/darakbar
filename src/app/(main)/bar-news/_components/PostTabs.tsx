'use client'

import { TabItem, Tabs } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { usePostTabStore } from '../_stores/post-tab.store'
import { postTabs } from '../_const/post-tab.const'
import { PostType } from '../_types/post-type.types'
import { useTagStore } from '@/stores/tag.store'

export default function PostTabs() {
  const [activeTabName, setActiveTabName] = useState<PostType | '전체'>(
    postTabs[0].title,
  )
  const postTags = useTagStore((state) => state.postTags)
  const { setSelectedPostTypeId } = usePostTabStore()

  useEffect(() => {
    setSelectedPostTypeId(
      postTags.find((type) => type.name === activeTabName)?.id ?? null,
    )
  }, [activeTabName])

  return (
    <div className="sticky top-18 z-10 opacity-90">
      <Tabs
        aria-label="Post tabs"
        variant="fullWidth"
        onActiveTabChange={(index) => setActiveTabName(postTabs[index].title)}
      >
        {postTabs.map((tab, index) => (
          <TabItem key={index} icon={tab.icon} active title={tab.title} />
        ))}
      </Tabs>
    </div>
  )
}

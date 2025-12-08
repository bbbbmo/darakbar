'use client'

import { TabItem, Tabs, TabsRef } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import { usePostTabStore } from '../_stores/post-tab.store'
import { queries } from '@/api/queries'
import { useQuery } from '@tanstack/react-query'
import { postTabs } from '../_const/post-tab.const'
import { PostType } from '../_types/post-type.types'

export default function PostTabs() {
  const [activeTabName, setActiveTabName] = useState<PostType | '전체'>(
    postTabs[0].title,
  )
  const { data: postTypes } = useQuery(queries.tag.posts)
  const { setSelectedPostTypeId } = usePostTabStore()

  useEffect(() => {
    setSelectedPostTypeId(
      postTypes?.data.find((type) => type.name === activeTabName)?.id ?? null,
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

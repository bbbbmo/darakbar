'use client'

import { Spinner, TabItem, Tabs, TabsRef } from 'flowbite-react'
import { Suspense, useRef } from 'react'
import { basicTheme } from '@/lib/flowbite/themes/basicTheme'
import ReviewTab from './Review/ReviewTab'
import PhotoTab from './Photo/PhotoTab'
import FeedbackTab from './FeedBack/FeedbackTab'

export default function BarFooter() {
  const tabsRef = useRef<TabsRef>(null)

  return (
    <Tabs
      aria-label="Default tabs"
      ref={tabsRef}
      className="border-neutral-600"
      theme={basicTheme.tabs}
      variant="fullWidth"
    >
      <TabItem active title="리뷰">
        <Suspense
          fallback={
            <div className="flex h-96 w-full items-center justify-center bg-zinc-900">
              <Spinner color="warning" aria-label="spinner" size="xl" />
            </div>
          }
        >
          <ReviewTab />
        </Suspense>
      </TabItem>
      <TabItem title="사진">
        <PhotoTab />
      </TabItem>
      <TabItem title="피드백">
        <FeedbackTab />
      </TabItem>
    </Tabs>
  )
}

'use client'

import { TabItem, Tabs, TabsRef } from 'flowbite-react'
import { useRef } from 'react'
import { basicTheme } from '@/lib/flowbite/basicTheme'
import ReviewTab from './Review/ReviewTab'
import PhotoTab from './Photo/PhotoTab'
import FeedbackTab from './FeedBack/FeedbackTab'
import { useQuery } from '@tanstack/react-query'
import { barReviewsKeys } from '@/api/queries/reviewKeys'
import { useParams } from 'next/navigation'

export default function BarFooter() {
  const tabsRef = useRef<TabsRef>(null)
  const { barId } = useParams()
  const { data: reviews } = useQuery(barReviewsKeys.all(Number(barId)))

  return (
    <Tabs
      aria-label="Default tabs"
      ref={tabsRef}
      className="border-neutral-600"
      theme={basicTheme.tabs}
      variant="fullWidth"
    >
      <TabItem active title="리뷰">
        <ReviewTab reviews={reviews?.data || []} />
      </TabItem>
      <TabItem title="사진">
        <PhotoTab reviews={reviews?.data || []} />
      </TabItem>
      <TabItem title="피드백">
        <FeedbackTab />
      </TabItem>
    </Tabs>
  )
}

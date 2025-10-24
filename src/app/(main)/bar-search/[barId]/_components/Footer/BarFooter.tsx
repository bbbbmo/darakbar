'use client'

import { TabItem, Tabs, TabsRef } from 'flowbite-react'
import { useRef } from 'react'
import { basicTheme } from '@/lib/flowbite/themes/basicTheme'
import ReviewTab from './Review/ReviewTab'
import PhotoTab from './Photo/PhotoTab'
import FeedbackTab from './FeedBack/FeedbackTab'
import { useQuery } from '@tanstack/react-query'
import { getBarReviews } from '@/lib/supabase/api/review/getBarReviews'
import { useBar } from '../../_providers/BarProviders'

export default function BarFooter() {
  const tabsRef = useRef<TabsRef>(null)
  const { barId } = useBar()
  const { data: reviews } = useQuery({
    queryKey: ['bar-reviews', barId],
    queryFn: () => getBarReviews(barId),
  })

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

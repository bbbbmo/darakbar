'use client'

import { Suspense } from 'react'
import PostCreateButton from './PostCreateButton'
import PostList from './PostList'
import PostTabs from './PostTabs'
import CardSkeleton from '@/components/ui/skeletons/CardSkeleton'
import { useCheckLogin } from '@/hooks/useCheckLogin'

export default function PostSearch() {
  const { isLoggedIn } = useCheckLogin()
  return (
    <>
      <PostTabs />
      <Suspense
        fallback={
          <div className="flex flex-col gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        }
      >
        <PostList />
      </Suspense>
      {isLoggedIn && <PostCreateButton />}
    </>
  )
}

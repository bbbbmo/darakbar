'use client'

import { useQuery } from '@tanstack/react-query'
import PostCard from './post/PostCard'
import { queries } from '@/api/queries'
import CardSkeleton from '@/components/ui/skeletons/CardSkeleton'
import { usePostTabStore } from '../_stores/post-tab.store'
import { useEffect } from 'react'

export default function PostList() {
  const { selectedPostTab } = usePostTabStore()
  const queryParams =
    selectedPostTab === '전체' ? undefined : { postType: selectedPostTab }

  const { data: posts, isLoading } = useQuery(queries.post.all(queryParams))

  useEffect(() => {
    console.log(queryParams)
  }, [queryParams])

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      {posts?.data.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

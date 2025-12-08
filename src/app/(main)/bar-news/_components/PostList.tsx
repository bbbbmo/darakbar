'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import PostCard from './post/PostCard'
import { queries } from '@/api/queries'
import { usePostTabStore } from '../_stores/post-tab.store'
import { useEffect } from 'react'

export default function PostList() {
  const { selectedPostTypeId } = usePostTabStore()
  const queryParams =
    selectedPostTypeId === null ? undefined : { postTypeId: selectedPostTypeId }

  const { data: posts } = useSuspenseQuery(queries.post.all(queryParams))

  useEffect(() => {
    console.log(queryParams)
  }, [queryParams])

  return (
    <div className="flex flex-col gap-8">
      {posts.data.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

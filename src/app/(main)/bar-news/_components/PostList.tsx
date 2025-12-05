'use client'

import { useQuery } from '@tanstack/react-query'
import PostCard from './post/PostCard'
import { queries } from '@/api/queries'

export default function PostList() {
  const { data: posts } = useQuery(queries.post.all)

  return (
    <div className="flex flex-col gap-8">
      {posts?.data.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

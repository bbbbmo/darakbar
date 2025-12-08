'use client'

import { Card, HR } from 'flowbite-react'
import PostHeader from './PostHeader'
import { Post } from '@/api/post/getPosts'
import PostBody from './PostBody'
import PostFooter from './PostFooter'

export type PostCardProps = {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="border-zinc-600 bg-zinc-800 py-4">
      <PostHeader
        userInfo={post.userinfo}
        createdAt={post.created_at}
        postTag={post.tags}
      />
      <HR className="my-2 bg-zinc-600" />
      <PostBody post={post} />
      <HR className="my-2 bg-zinc-600" />
      <PostFooter likeCount={post.like_count} />
    </Card>
  )
}

'use client'

import { Card, HR } from 'flowbite-react'
import { Post } from './post.mocks'
import SubTitleText from '@/components/ui/text/SubTitleText'
import NewMenuCard from './NewMenuCard'
import PostHeader from './PostHeader'
import EventDate from './EventDate'

export type PostCardProps = {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const showNewMenu =
    post.postTag.name === '신메뉴' && post.newMenu && post.newMenu.length > 0

  return (
    <Card className="border-neutral-600 bg-neutral-800 py-4">
      <PostHeader
        businessUserId={post.businessUserId}
        createdAt={post.createdAt}
        postTag={post.postTag}
      />
      <HR className="my-2 bg-zinc-600" />
      <section className="flex flex-col gap-4">
        <SubTitleText title={post.title} />
        <p className="text-zinc-500">
          <span className="line-clamp-5">{post.content}</span>
        </p>
        <EventDate
          eventStartDate={post.eventStartDate ?? ''}
          eventEndDate={post.eventEndDate ?? ''}
        />
        {showNewMenu &&
          post.newMenu!.map((menu) => (
            <NewMenuCard key={menu.id} menu={menu} />
          ))}
        <img
          src={post.image_paths?.[0]}
          alt={post.title}
          className="h-80 w-full object-cover"
        />
      </section>
    </Card>
  )
}

'use client'

import { Card, HR } from 'flowbite-react'
import SubTitleText from '@/components/ui/text/SubTitleText'
import NewMenuCard from './NewMenuCard'
import PostHeader from './PostHeader'
import EventDate from './EventDate'
import { Post } from '@/api/post/getPosts'
import Image from 'next/image'
import { useParseFile } from '@/hooks/useParseFile'

export type PostCardProps = {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const { publicUrls } = useParseFile(post.image_paths)

  const showNewMenu: boolean = !!(
    post.tags.name === '신메뉴' &&
    post.new_menus &&
    post.new_menus.length > 0
  )

  const showEvent: boolean = !!(post.event_start_date && post.event_end_date)

  return (
    <Card className="border-neutral-600 bg-neutral-800 py-4">
      <PostHeader
        userInfo={post.userinfo}
        createdAt={post.created_at}
        postTag={post.tags}
      />
      <HR className="my-2 bg-zinc-600" />
      <section className="flex flex-col gap-4">
        <SubTitleText title={post.title || ''} />
        <p className="text-zinc-500">
          <span className="line-clamp-5">{post.content}</span>
        </p>
        {showEvent && (
          <EventDate
            eventStartDate={post.event_start_date!}
            eventEndDate={post.event_end_date!}
          />
        )}
        {showNewMenu &&
          post.new_menus.map((menu) => (
            <NewMenuCard key={menu.id} newMenu={menu} />
          ))}
        {publicUrls && (
          <div className="relative h-[400px] w-full">
            <Image
              src={publicUrls[0]}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-t-lg object-cover"
            />
          </div>
        )}
      </section>
    </Card>
  )
}

import SubTitleText from '@/components/ui/text/SubTitleText'
import NewMenuCard from './NewMenuCard'
import Image from 'next/image'
import { useParseFile } from '@/hooks/useParseFile'
import { Post } from '@/api/post/getPosts'
import EventDate from './EventDate'

export type PostBodyProps = {
  post: Post
}

export default function PostBody({ post }: PostBodyProps) {
  const { publicUrls } = useParseFile(post.image_paths)

  const showNewMenu: boolean = !!(
    post.tags.name === '신메뉴' &&
    post.new_menus &&
    post.new_menus.length > 0
  )

  const showEvent: boolean = !!(post.event_start_date && post.event_end_date)

  return (
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
  )
}

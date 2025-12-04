import { mockPosts } from './post/post.mocks'
import PostCard from './post/PostCard'

export default function PostList() {
  const posts = mockPosts

  return (
    <div className="flex flex-col gap-8">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

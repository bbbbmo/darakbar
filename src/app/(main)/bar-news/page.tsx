import PostCreateButton from './_components/PostCreateButton'
import PostList from './_components/PostList'
import PostTabs from './_components/PostTabs'

export default function BarNewsPage() {
  return (
    <>
      <PostTabs />
      <PostList />
      <PostCreateButton />
    </>
  )
}

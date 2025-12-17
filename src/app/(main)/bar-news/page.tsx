import MainNavBar from '../_components/MainNavBar'
import PostSearch from './_components/PostSearch'

export default async function BarNewsPage() {
  return (
    <>
      <MainNavBar />
      <div className="mx-[20vw] flex flex-col">
        <PostSearch />
      </div>
    </>
  )
}

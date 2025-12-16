import BarNewsNavbar from './_components/BarNewsNavbar'
import PostSearch from './_components/PostSearch'

export default async function BarNewsPage() {
  return (
    <>
      <BarNewsNavbar />
      <div className="mx-[20vw] flex flex-col">
        <PostSearch />
      </div>
    </>
  )
}

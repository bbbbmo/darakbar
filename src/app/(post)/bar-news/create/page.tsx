import PostCreateForm from './_components/PostCreateForm'
import PostCreateNavBar from './_components/PostCreateNavBar'

export default function BarNewsCreatePage() {
  return (
    <>
      <PostCreateNavBar />
      <div className="mx-[20vw] flex flex-col">
        <PostCreateForm />
      </div>
    </>
  )
}

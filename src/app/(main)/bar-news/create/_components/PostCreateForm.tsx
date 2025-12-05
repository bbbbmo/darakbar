'use client'

import NewMenuInputs from './NewMenuInputs'
import PostInputs from './PostInputs'

export default function PostCreateForm() {
  return (
    <form className="flex flex-col gap-4">
      <PostInputs />
      <NewMenuInputs />
    </form>
  )
}

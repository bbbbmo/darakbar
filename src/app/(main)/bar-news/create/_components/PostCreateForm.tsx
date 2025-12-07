'use client'

import NewMenuInputs from './NewMenuInputs'
import PostInputs from './PostInputs'
import PostTypeSelect from './PostTypeSelect'

export default function PostCreateForm() {
  return (
    <form className="flex flex-col gap-4">
      <PostTypeSelect />
      <PostInputs />
      <NewMenuInputs />
    </form>
  )
}

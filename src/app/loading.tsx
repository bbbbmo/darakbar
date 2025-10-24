import { Spinner } from 'flowbite-react'

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-900">
      <Spinner color="warning" aria-label="spinner" size="xl" />
    </div>
  )
}

import { ArrowLeftIcon } from '@heroicons/react/24/solid'

type PrevButtonProps = {
  text: string
  onClick: () => void
}

export default function PrevButton({ text, onClick }: PrevButtonProps) {
  return (
    <div className="mr-auto flex gap-2 text-sm">
      <span
        className="flex cursor-pointer items-center gap-1 text-sm hover:text-amber-400"
        onClick={onClick}
      >
        <ArrowLeftIcon className="size-4" />
        {text}
      </span>
    </div>
  )
}

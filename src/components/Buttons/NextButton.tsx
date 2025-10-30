import { ArrowRightIcon } from '@heroicons/react/24/solid'

type NextButtonProps = {
  text: string
  onClick: () => void
}

export default function NextButton({ text, onClick }: NextButtonProps) {
  return (
    <div className="ml-auto flex gap-2 text-sm">
      <span
        className="flex cursor-pointer items-center gap-1 text-sm hover:text-amber-400"
        onClick={onClick}
      >
        {text}
        <ArrowRightIcon className="size-4" />
      </span>
    </div>
  )
}

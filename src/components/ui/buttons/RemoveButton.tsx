import clsx from 'clsx'
import { HiXCircle } from 'react-icons/hi'

type RemoveButtonProps = {
  onClick: () => void
  className?: string
}

export default function RemoveButton({
  onClick,
  className,
}: RemoveButtonProps) {
  return (
    <button className={clsx('cursor-pointer', className)} onClick={onClick}>
      <HiXCircle size={20} className="text-gray-500" />
    </button>
  )
}

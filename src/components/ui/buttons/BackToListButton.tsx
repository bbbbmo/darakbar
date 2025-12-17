import Link from 'next/link'
import { HiOutlineArrowLeft } from 'react-icons/hi'

type BackToListButtonProps = {
  text?: string
  href: string
}

export default function BackToListButton({
  text,
  href,
}: BackToListButtonProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 text-zinc-500 transition-all duration-300 hover:scale-101 hover:text-zinc-600"
    >
      <HiOutlineArrowLeft size={20} />
      {text}
    </Link>
  )
}

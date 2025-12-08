import { HiOutlineHeart } from 'react-icons/hi'

export type PostFooterProps = {
  likeCount: number
}

// TODO: 공유, 좋아요, 댓글 기능 추가

export default function PostFooter({ likeCount }: PostFooterProps) {
  return (
    <section className="flex w-full gap-2">
      <button className="flex items-center gap-2">
        <HiOutlineHeart size={24} />
        <span>{likeCount}</span>
      </button>
    </section>
  )
}

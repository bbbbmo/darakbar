import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi";

export default function BackToListButton() {
  return (
    <Link
      href="/bar-search"
      className="flex items-center gap-3 text-zinc-500 transition-all duration-300 hover:scale-101 hover:text-zinc-600"
    >
      <HiOutlineArrowLeft size={20} />바 목록으로 돌아가기
    </Link>
  );
}

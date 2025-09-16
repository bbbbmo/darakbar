import { mockBars } from "@/mocks/bars.mocks";
import BarImage from "./_components/BarImage";
import BarDescription from "./_components/BarDescription";
import BarBusinessHour from "./_components/BarBusinessHour";
import BarContact from "./_components/BarContact";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi";
import BarSignatureMenus from "./_components/BarSignatureMenus";

export default async function BarDetailPage({
  params,
}: {
  params: { barId: number };
}) {
  const { barId } = await params;
  const bar = mockBars.find((bar) => bar.id === Number(barId));

  console.log(bar);
  if (!bar) return null;

  return (
    <>
      <Link
        href="/bar-search"
        className="flex items-center gap-3 text-zinc-500 transition-all duration-300 hover:scale-101 hover:text-zinc-600"
      >
        <HiOutlineArrowLeft size={20} />바 목록으로 돌아가기
      </Link>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <BarImage bar={bar} />
        </div>
        <div className="flex flex-col gap-8">
          <BarDescription bar={bar} />
          <BarContact bar={bar} />
        </div>
        <div className="lg:col-span-2">
          <BarBusinessHour bar={bar} />
        </div>
        <div className="lg:col-span-2">
          <BarSignatureMenus bar={bar} />
        </div>
        {/* TODO: 풋터 추가 */}
        <footer></footer>
      </div>
    </>
  );
}

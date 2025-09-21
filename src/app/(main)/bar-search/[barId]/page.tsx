import { mockBars } from "@/mocks/bars.mocks";
import BarImage from "./_components/BarImage";
import BarDescription from "./_components/BarDescription";
import BarBusinessHour from "./_components/BarBusinessHour";
import BarContact from "./_components/BarContact";
import BarSignatureMenus from "./_components/BarSignatureMenus";
import BackToListButton from "./_components/BackToListButton";
import BarFooter from "./_components/BarFooter.tsx/BarFooter";

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
      <BackToListButton />
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
      </div>
      <BarFooter />
    </>
  );
}

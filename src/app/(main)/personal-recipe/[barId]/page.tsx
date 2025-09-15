import { mockBars } from "@/mocks/bars.mocks";
import BarImage from "./_components/BarImage";
import BarDescription from "./_components/BarDescription";
import BarBusinessHour from "./_components/BarBusinessHour";
import BarContact from "./_components/BarContact";

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
    <div className="flex flex-col gap-8">
      <BarImage bar={bar} />
      <BarDescription bar={bar} />
      <BarContact bar={bar} />
      <BarBusinessHour bar={bar} />
    </div>
  );
}

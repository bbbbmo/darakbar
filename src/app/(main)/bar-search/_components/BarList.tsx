"use client";

import GridList from "@/components/GridList";
import { mockBars } from "@/mocks/bars.mocks";
import BarCard from "../../_components/BarCard/BarCard";
import { useRouter } from "next/navigation";

export default function BarList() {
  const router = useRouter();

  const goToBarDetail = (barId: number) => {
    router.push(`/bar-search/${barId}`);
  };
  return (
    // 정렬 3개까지
    <GridList items={mockBars}>
      {(bar: any) => (
        <BarCard
          barInfo={bar}
          loading={false}
          onClick={() => goToBarDetail(bar.id)}
        />
      )}
    </GridList>
  );
}

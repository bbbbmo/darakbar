"use client";

import GridList from "@/components/GridList";
import { mockBars } from "@/mocks/bars.mocks";
import BarCard from "../../_components/BarCard/BarCard";

export default function BarList() {
  return (
    // 정렬 3개까지
    <GridList items={mockBars}>
      {(bar: any) => <BarCard barInfo={bar} loading={false} />}
    </GridList>
  );
}

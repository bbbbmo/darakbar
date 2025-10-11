"use client";

import SubTitleText from "@/components/SubTitleText";
import { Bar } from "@/types/bar/bar.types";
import { Card } from "flowbite-react";
import { HiOutlineClock } from "react-icons/hi";

// TODO: 운영 시간 표시 로직 추가
export default function BarBusinessHour({ bar }: { bar: Bar }) {
  const barId = bar.id;

  return (
    <Card>
      <SubTitleText
        icon={<HiOutlineClock size={24} className="text-amber-400" />}
        title="운영 시간"
      />
      <p className="mt-4 flex flex-col gap-2">
        {/* {bar.businessHoursDetail?.significant} */}
      </p>
    </Card>
  );
}

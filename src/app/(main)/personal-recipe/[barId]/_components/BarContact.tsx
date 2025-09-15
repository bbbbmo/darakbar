"use client";

import SubTitleText from "@/components/SubTitleText";
import { BarInfo } from "@/mocks/bars.mocks";
import { Card } from "flowbite-react";
import { BsInstagram } from "react-icons/bs";
import { HiOutlineGlobeAlt, HiOutlinePhone } from "react-icons/hi";

// TODO: 화면 사이즈에 맞게 레이아웃 조절

export default function BarContact({ bar }: { bar: BarInfo }) {
  return (
    <Card>
      <SubTitleText title="연락처 및 정보" />
      <p className="flex flex-col gap-2">
        <span className="flex items-center gap-2">
          <HiOutlinePhone size={16} className="text-zinc-500" />
          {bar.phone_number}
        </span>
        <span className="flex items-center gap-2">
          <HiOutlineGlobeAlt size={16} className="text-zinc-500" />
          <a className="cursor-pointer text-amber-400 hover:underline">
            {bar.website_url}
          </a>
        </span>
        <span className="flex items-center gap-2">
          <BsInstagram size={16} className="text-zinc-500" />
          <a className="cursor-pointer text-amber-400 hover:underline">
            {bar.instagram_url}
          </a>
        </span>
      </p>
    </Card>
  );
}

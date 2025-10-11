"use client";

import CardSkeleton from "@/components/Cards/CardSkeleton";
import Tags from "@/components/Tags";
import { basicTheme } from "@/lib/flowbite/themes/basicTheme";
import { Button, Card } from "flowbite-react";
import { HiClock, HiOutlinePhone } from "react-icons/hi";
import { Bar } from "@/types/bar/bar.types";

type BarCardProps = {
  barInfo: Bar;
  loading: boolean;
  className?: string;
  onClick?: () => void;
};

export default function BarCard({
  barInfo,
  loading,
  className,
  onClick,
}: BarCardProps) {
  return (
    <>
      {loading ? (
        <CardSkeleton />
      ) : (
        <Card
          theme={basicTheme.bar}
          className={`${className}`}
          imgAlt="Bar Image"
          imgSrc={barInfo.barImages?.[0] ?? undefined}
        >
          <section>
            {/* 칵테일 이름 */}
            <header className="text-3xl font-semibold tracking-tight dark:text-white">
              <div className="transition group-hover:text-amber-400">
                {barInfo.name}
              </div>
              <span className="text-sm">{barInfo.address}</span>
            </header>
            <div className="my-4 text-gray-400">
              <p className="flex flex-col gap-2">
                <span className="md:line-clamp-1 lg:line-clamp-2">
                  {barInfo.description || ""}
                </span>
                <Tags tags={barInfo.atmosphere} />
                <span className="flex items-center gap-2 text-sm">
                  <HiClock size={16} />
                  {/* {barInfo.businessHours} */}
                </span>
                <span className="flex items-center gap-2 text-sm">
                  <HiOutlinePhone
                    size={16}
                    className="fill-zinc-800 text-zinc-800"
                  />
                  {barInfo.phoneNumber}
                </span>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">
                시그니처 메뉴 {barInfo.signatureMenus.length}개
              </span>
              <Button
                className="ml-auto"
                theme={basicTheme.button}
                color="primary"
                onClick={onClick}
              >
                자세히 보기
              </Button>
            </div>
          </section>
        </Card>
      )}
    </>
  );
}

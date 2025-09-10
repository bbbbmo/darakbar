"use client";

import CardSkeleton from "@/components/Cards/CardSkeleton";
import { basicTheme } from "@/lib/flowbite/themes/basicTheme";
import { Button, Card } from "flowbite-react";

type BarCardProps = {
  barInfo: any;
  loading: boolean;
  className?: string;
};

export default function BarCard({ barInfo, loading, className }: BarCardProps) {
  return (
    <>
      {loading ? (
        <CardSkeleton />
      ) : (
        <Card
          theme={basicTheme.cocktail}
          className={`${className}`}
          imgAlt="Bar Image"
          imgSrc={barInfo.image_url ?? undefined}
        >
          <section>
            {/* 칵테일 이름 */}
            <h5 className="text-3xl font-semibold tracking-tight dark:text-white">
              {barInfo.name}
            </h5>
            <div>{barInfo.address}</div>
            <div>{barInfo.description}</div>
            <div>{barInfo.tags}</div>
            <div>{barInfo.business_hours}</div>
            <div>{barInfo.phone_number}</div>
            <div>{barInfo.signature_menus}</div>
            <Button>자세히 보기</Button>
          </section>
        </Card>
      )}
    </>
  );
}

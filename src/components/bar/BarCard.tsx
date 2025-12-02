'use client'

import CardSkeleton from '@/components/ui/skeletons/CardSkeleton'
import Tags from '@/components/ui/Tags'
import { basicTheme } from '@/lib/flowbite/basicTheme'
import { Button, Card } from 'flowbite-react'
import { HiClock, HiLocationMarker, HiOutlinePhone } from 'react-icons/hi'
import { Bar } from '@api/bar/getBars'
import { getOpenStatus } from '@/utils/formatBusinessHour'
import { useParseFile } from '@/hooks/useParseFile'
import Image from 'next/image'

type BarCardProps = {
  barInfo: Bar
  loading: boolean
  className?: string
  onClick?: () => void
}

export default function BarCard({
  barInfo,
  loading,
  className,
  onClick,
}: BarCardProps) {
  if (!barInfo) return null

  const { publicUrls } = useParseFile(barInfo.bar_images || [])
  return (
    <>
      {loading ? (
        <CardSkeleton />
      ) : (
        <Card
          theme={basicTheme.bar}
          className={`${className}`}
          renderImage={() =>
            publicUrls && publicUrls.length > 0 ? (
              <div className="relative h-80 w-full">
                <Image
                  src={publicUrls[0]}
                  alt="Bar Image"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-t-lg object-cover"
                />
              </div>
            ) : (
              <div className="relative flex h-80 w-full items-center justify-center rounded-t-lg bg-gray-200">
                <span className="text-gray-500">이미지 없음</span>
              </div>
            )
          }
        >
          <section>
            {/* 칵테일 이름 */}
            <header className="flex flex-col gap-2 text-3xl font-semibold tracking-tight dark:text-white">
              <span className="transition group-hover:text-amber-400">
                {barInfo.name}
              </span>
              <div className="flex items-center gap-1">
                <HiLocationMarker size={16} className="text-gray-400" />
                <span className="text-sm">{barInfo.address || '미제공'}</span>
              </div>
            </header>
            <div className="my-4 text-gray-400">
              <p className="flex flex-col gap-2">
                <span className="md:line-clamp-1 lg:line-clamp-2">
                  {barInfo.description || '미제공'}
                </span>
                <Tags tags={barInfo.bar_tags.map((tag) => tag.tags)} />
                <span className="flex items-center gap-2 text-sm">
                  <HiClock size={16} />
                  {getOpenStatus(barInfo.business_hours)}
                </span>
                <span className="flex items-center gap-2 text-sm">
                  <HiOutlinePhone
                    size={16}
                    className="fill-zinc-800 text-zinc-800"
                  />
                  {barInfo.phone_number || '미제공'}
                </span>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">
                시그니처 메뉴 {barInfo.signature_menus.length}개
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
  )
}

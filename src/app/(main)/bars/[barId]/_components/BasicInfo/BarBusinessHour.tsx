'use client'

import SubTitleText from '@/components/ui/text/SubTitleText'
import { Card } from 'flowbite-react'
import { HiOutlineClock } from 'react-icons/hi'
import {
  formatDayToKorean,
  formatToHHmm,
  sortBusinessHoursByDay,
} from '@utils/formatBusinessHour'
import { useBarDetailStore } from '../../_stores/bar-detail.store'

// TODO: 운영 시간 표시 로직 추가
export default function BarBusinessHour() {
  const barDetail = useBarDetailStore((state) => state.barDetail)
  if (!barDetail) return null

  return (
    <Card>
      <SubTitleText
        icon={<HiOutlineClock size={24} className="text-amber-400" />}
        title="운영 시간"
      />
      <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortBusinessHoursByDay(barDetail.business_hours)?.map((hour) => (
          <div
            key={hour.id}
            className="flex items-center justify-between gap-2 rounded-md bg-zinc-600 p-2"
          >
            <span>{formatDayToKorean(hour.day_of_week)}</span>
            {hour.is_closed ? (
              <span className="text-sm font-semibold text-red-400">휴무</span>
            ) : (
              <span className="text-sm text-zinc-300">{`${formatToHHmm(hour.open_time)} - ${formatToHHmm(hour.close_time)} ${hour.last_order_time ? `(라스트 오더 ${formatToHHmm(hour.last_order_time)})` : ''}`}</span>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}

import { BusinessHourDetail } from '@/types/bar/business-hour.types'
import dayjs from 'dayjs'

export const formatToHHmm = (time: string | null | undefined) => {
  if (!time) return '미제공'
  return time.split(':').slice(0, 2).join(':')
}

export const getOpenStatus = (
  businessHours: Omit<BusinessHourDetail, 'barId'>[],
): string => {
  const now = dayjs()
  const today = now.format('ddd')
  const todayBusinessHour = businessHours.find(
    (hour) => hour.day_of_week === today.toLowerCase(),
  )

  if (!todayBusinessHour) {
    return '정보 없음'
  }

  if (todayBusinessHour.is_closed) {
    return '휴무'
  }
  if (
    todayBusinessHour.open_time &&
    todayBusinessHour.close_time &&
    now.isAfter(dayjs(todayBusinessHour.open_time)) &&
    now.isBefore(dayjs(todayBusinessHour.close_time))
  ) {
    return `영업중 (라스트 오더: ${formatToHHmm(todayBusinessHour.last_order_time)})`
  } else if (
    todayBusinessHour.close_time &&
    now.isAfter(dayjs(todayBusinessHour.close_time))
  ) {
    return `영업종료 (Open: ${formatToHHmm(todayBusinessHour.open_time)})`
  } else {
    console.log(todayBusinessHour.open_time)
    return `영업전 (Open: ${formatToHHmm(todayBusinessHour.open_time)})`
  }
}

import dayjs from 'dayjs'

export const formatToHHmm = (time: string | null | undefined) => {
  if (!time) return '미제공'
  return time.split(':').slice(0, 2).join(':')
}

export const sortBusinessHoursByDay = (businessHours: any[]) => {
  const dayOrder = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
  return businessHours.sort(
    (a, b) => dayOrder.indexOf(a.day_of_week) - dayOrder.indexOf(b.day_of_week),
  )
}

export const formatDayToKorean = (day: string) => {
  switch (day) {
    case 'mon':
      return '월요일'
    case 'tue':
      return '화요일'
    case 'wed':
      return '수요일'
    case 'thu':
      return '목요일'
    case 'fri':
      return '금요일'
    case 'sat':
      return '토요일'
    case 'sun':
      return '일요일'
  }
}

export const getOpenStatus = (businessHours: any[]): string => {
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
    return `영업전 (Open: ${formatToHHmm(todayBusinessHour.open_time)})`
  }
}

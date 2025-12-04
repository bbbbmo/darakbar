import dayjs from 'dayjs'
import { TextInput } from 'flowbite-react'
import { HiCalendar } from 'react-icons/hi'

export type EventDateProps = {
  eventStartDate: string
  eventEndDate: string
}

export default function EventDate({
  eventStartDate,
  eventEndDate,
}: EventDateProps) {
  const startDate = dayjs(eventStartDate).format('YYYY.MM.DD')
  const endDate = dayjs(eventEndDate).format('YYYY.MM.DD')

  const inputValue = `${startDate} ~ ${endDate}`

  return (
    <TextInput
      icon={HiCalendar}
      color="primary"
      placeholder="이벤트 시작일"
      disabled
      value={inputValue}
      className="w-full"
    />
  )
}

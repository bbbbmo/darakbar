import { HiClock } from 'react-icons/hi'

export type TimePickerProps = {
  rightIcon?: React.ReactNode
  minTime?: string
  maxTime?: string
  placeholder?: string
  value?: string
  required?: boolean
  setValue?: (value: string) => void
}

export default function TimePicker({
  rightIcon,
  minTime,
  maxTime,
  placeholder,
  value,
  required,
  setValue,
}: TimePickerProps) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 end-0 top-0 flex items-center pe-3.5">
        <span className="text-gray-400 dark:text-gray-200">
          {rightIcon ?? <HiClock className="h-4 w-4" />}
        </span>
      </div>
      <input
        type="time"
        id="start-time"
        className="block w-full rounded-lg border border-gray-800 bg-gray-700 p-2.5 text-sm leading-none text-gray-50 placeholder-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-800 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        min={minTime}
        max={maxTime}
        value={value ?? '00:00'}
        placeholder={placeholder}
        required={required}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue?.(e.currentTarget.value)
        }
      />
    </div>
  )
}

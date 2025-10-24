import { basicTheme } from '@/lib/flowbite/themes/basicTheme'
import { Select } from 'flowbite-react'

type FormOptionProps = {
  options: string[]
  setOption: (option: string) => void
  className?: string
}

export default function FormOption({
  options,
  setOption,
  className,
}: FormOptionProps) {
  return (
    <Select
      theme={basicTheme.select}
      color="primary"
      className={className || ''}
      onChange={(e) => setOption(e.target.value)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>
  )
}

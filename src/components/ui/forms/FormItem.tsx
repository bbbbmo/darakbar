import { Label } from 'flowbite-react'
import FormRequiredMark from './FormRequiredMark'

type FormItemProps = {
  label: string
  labelClassName?: string
  wrapperClassName?: string
  required?: boolean
  children: React.ReactNode
}

/**
 * @description 폼 아이템 UI 컴포넌트
 * @param {FormItemProps} props
 */
export default function FormItem({
  label,
  labelClassName,
  wrapperClassName,
  children,
  required,
}: FormItemProps) {
  return (
    <div className={`flex flex-col gap-3 rounded-lg p-2 ${wrapperClassName}`}>
      <Label className={`font-bold text-gray-100 ${labelClassName}`}>
        {label}
        {required && <FormRequiredMark />}
      </Label>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  )
}

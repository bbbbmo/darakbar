import { Label } from "flowbite-react";
import RequiredMark from "./RequiredMark";

type FormItemProps = {
  label: string;
  labelClassName?: string;
  wrapperClassName?: string;
  required?: boolean;
  children: React.ReactNode;
};

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
      <Label className={`font-bold ${labelClassName}`}>
        {label}
        {required && <RequiredMark />}
      </Label>
      <div className="flex gap-1">{children}</div>
    </div>
  );
}

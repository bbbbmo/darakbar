import { basicTheme } from "@/lib/flowbite/themes/basicTheme";
import { Select } from "flowbite-react";

export default function FormOption({ options }: { options: string[] }) {
  return (
    <Select theme={basicTheme.select} color="primary">
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
}

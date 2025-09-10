import { basicTheme } from "@/lib/flowbite/themes/basicTheme";
import { Button, Card, TextInput } from "flowbite-react";
import { HiAdjustments } from "react-icons/hi";
import { barFilterSelect } from "./BarFilter.const";
import FormOption from "@/components/Forms/FormOption";

export default function BarFilter() {
  return (
    <Card>
      <section className="flex flex-col gap-4">
        <h2 className="flex items-center gap-2">
          <HiAdjustments className="h-6 w-6 text-amber-500" />
          필터 및 정렬
          <Button className="ml-auto" size="sm">
            필터 초기화
          </Button>
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <TextInput
            theme={basicTheme.textInput}
            color="primary"
            placeholder="바 이름 검색"
          />
          {barFilterSelect.map((select) => (
            <FormOption key={select.key} options={select.options} />
          ))}
        </div>
      </section>
      <p className="text-center text-gray-300">0개의 바가 검색되었습니다.</p>
    </Card>
  );
}

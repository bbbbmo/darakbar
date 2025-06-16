import { Select, TextInput, Button } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import type { IngredientForm } from "./form.type";
import { XCircleIcon } from "@heroicons/react/24/solid";
import FormItem from "../../../Form/FormItem";
import FormDescription from "../../../Form/FormDescription";

const unitOptions = [
  { value: "oz", label: "oz" },
  { value: "ml", label: "ml" },
  { value: "티스푼", label: "티스푼" },
  { value: "스푼", label: "스푼" },
  { value: "개", label: "개" },
];

export default function IngredientForm() {
  const { register, handleSubmit } = useForm<IngredientForm>();
  const ingredients = [
    {
      name: "",
      amount: 0,
      unit: "",
    },
  ];

  const onSubmit: SubmitHandler<IngredientForm> = (data) => {
    console.log(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormDescription>
          나만의 특별한 레시피를 위한 재료를 입력해 주세요!
        </FormDescription>
        {/* 베이스 입력 */}
        <div className="scroll-none flex flex-col gap-2 overflow-y-auto">
          <FormItem label="베이스(주재료)" required>
            <TextInput
              type="text"
              placeholder="메인이 되는 술이나 재료를 입력해 주세요"
              className="h-10 grow"
              {...register("baseLiquor", { required: true, maxLength: 15 })}
            />
            <TextInput
              className="w-22"
              type="number"
              step={0.25}
              placeholder="용량"
              {...register("baseLiquorAmount", { required: true, min: 0 })}
            />
            <Select
              className="w-28"
              {...register("baseLiquorUnit", { required: true })}
            >
              {unitOptions.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </Select>
          </FormItem>
          {/* 재료 입력 */}
          {ingredients?.map((ingredient, index) => (
            <FormItem key={index} label={`재료 ${index + 1}`} required>
              {index !== 0 && (
                <span className="absolute right-2 cursor-pointer">
                  <XCircleIcon className="size-5" />
                </span>
              )}
              <TextInput
                type="text"
                placeholder="추가적인 재료를 입력해 주세요"
                className="h-10 grow"
                {...register("ingredients", { required: true })}
              />
              <TextInput
                className="w-22"
                type="number"
                step={0.25}
                placeholder="용량 및 개수"
                {...register("ingredientAmounts", { required: true, min: 0 })}
              />
              <Select
                className="w-28"
                {...register("ingredientUnits", { required: true })}
              >
                {unitOptions.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </Select>
            </FormItem>
          ))}
        </div>
        {/* 재료 추가 버튼 */}
        <div className="mt-2">
          <Button className="w-full rounded-lg bg-zinc-600 p-2">
            재료 추가
          </Button>
        </div>
      </form>
    </>
  );
}

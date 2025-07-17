import { Select, TextInput, Button } from "flowbite-react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import type { IngredientForm } from "../_types/create-form.type";
import { XCircleIcon } from "@heroicons/react/24/solid";
import FormItem from "../../../../../components/Forms/FormItem";
import FormDescription from "../../../../../components/Forms/FormDescription";
import { emptyIngredient, unitOptions } from "./create-form.const";
import { useRecipeCreateStore } from "../_stores/recipeCreateStore";
import { useEffect } from "react";

type IngredientFormProps = {
  onNext: () => void;
  setSubmitHandler: (handler: () => void) => void;
};

export default function IngredientForm({
  onNext,
  setSubmitHandler,
}: IngredientFormProps) {
  const { register, control, handleSubmit } = useForm<IngredientForm>({
    defaultValues: {
      baseLiquor: structuredClone(emptyIngredient),
      ingredients: [structuredClone(emptyIngredient)],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const { updateIngredients, getAllForm } = useRecipeCreateStore();

  const onSubmit: SubmitHandler<IngredientForm> = (data) => {
    updateIngredients(data);
    console.log("저장된 값", getAllForm());
    onNext();
  };

  useEffect(() => {
    setSubmitHandler(() => handleSubmit(onSubmit));
  }, [handleSubmit]);
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
              {...register("baseLiquor.name", {
                required: "베이스 재료 이름을 입력해주세요",
                maxLength: { value: 15, message: "15자 이하로 입력해주세요" },
              })}
            />
            <TextInput
              className="w-22"
              type="number"
              step={0.25}
              placeholder="용량"
              {...register("baseLiquor.amount", {
                required: true,
                min: 0,
                valueAsNumber: true,
              })}
            />
            <Select
              className="w-28"
              {...register("baseLiquor.unit", { required: true })}
            >
              {unitOptions.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </Select>
          </FormItem>
          {/* 재료 입력 */}
          {fields?.map((field, index) => (
            <FormItem key={field.id} label={`재료 ${index + 1}`} required>
              <TextInput
                type="text"
                placeholder="추가적인 재료를 입력해 주세요"
                className="h-10 grow"
                {...register(`ingredients.${index}.name`, {
                  required: "재료 이름을 입력해주세요",
                  maxLength: { value: 15, message: "15자 이하로 입력해주세요" },
                })}
              />
              <TextInput
                className="w-22"
                type="number"
                step={0.25}
                placeholder="용량 및 개수"
                {...register(`ingredients.${index}.amount`, {
                  required: true,
                  min: 0,
                  valueAsNumber: true,
                })}
              />
              <Select
                className="w-28"
                {...register(`ingredients.${index}.unit`, { required: true })}
              >
                {unitOptions.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </Select>
              {index !== 0 && (
                <button
                  className="ml-2 cursor-pointer"
                  onClick={() => remove(index)}
                >
                  <XCircleIcon className="size-5" />
                </button>
              )}
            </FormItem>
          ))}
        </div>
        {/* 재료 추가 버튼 */}
        <div className="mt-2">
          <Button
            className="w-full rounded-lg bg-zinc-600 p-2"
            type="button"
            onClick={() => append(structuredClone(emptyIngredient))}
          >
            재료 추가
          </Button>
        </div>
      </form>
    </>
  );
}

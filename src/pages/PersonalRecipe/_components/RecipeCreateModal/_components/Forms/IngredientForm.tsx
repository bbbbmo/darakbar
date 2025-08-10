import { Select, TextInput, Button, ThemeProvider } from "flowbite-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { XCircleIcon } from "@heroicons/react/24/solid";
import FormItem from "@/components/Forms/FormItem";
import FormDescription from "@/components/Forms/FormDescription";
import { emptyIngredient, unitOptions } from "../../RecipeCreateModal.const";
import { buttonTheme } from "@/flowbite/themes/button.theme";
import { CreateRecipeForm } from "../../RecipeCreateModal.schemes";
import FormErrorMessage from "@/components/Forms/FormErrorMessage";

export default function IngredientForm() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateRecipeForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  return (
    <ThemeProvider theme={buttonTheme}>
      <FormDescription>
        나만의 특별한 레시피를 위한 재료를 입력해 주세요!
      </FormDescription>
      {/* 베이스 입력 */}
      <div className="scroll-none flex flex-col gap-2 overflow-y-auto">
        <FormItem label="베이스(주재료)" required>
          <div className="flex items-center gap-2">
            <TextInput
              type="text"
              placeholder="메인이 되는 술이나 재료를 입력해 주세요"
              className="h-10 grow"
              {...register("baseLiquor.name")}
              aria-invalid={!!errors.baseLiquor?.name}
            />
            <TextInput
              className="w-22"
              type="number"
              step={0.25}
              placeholder="용량"
              {...register("baseLiquor.amount", {
                valueAsNumber: true,
              })}
              aria-invalid={!!errors.baseLiquor?.amount}
            />
            <Select
              className="w-28"
              {...register("baseLiquor.unit")}
              aria-invalid={!!errors.baseLiquor?.unit}
            >
              {unitOptions.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </Select>
          </div>
          <FormErrorMessage
            error={
              errors.baseLiquor?.amount ||
              errors.baseLiquor?.unit ||
              errors.baseLiquor?.name
            }
          />
        </FormItem>
        {/* 재료 입력 */}
        {fields?.map((field, index) => (
          <FormItem key={field.id} label={`재료 ${index + 1}`} required>
            <div className="flex items-center gap-2">
              <TextInput
                type="text"
                placeholder="추가적인 재료를 입력해 주세요"
                className="h-10 grow"
                {...register(`ingredients.${index}.name`)}
                aria-invalid={!!errors.ingredients?.[index]?.name}
              />

              <TextInput
                className="w-22"
                type="number"
                step={0.25}
                placeholder="용량 및 개수"
                {...register(`ingredients.${index}.amount`, {
                  valueAsNumber: true,
                })}
                aria-invalid={!!errors.ingredients?.[index]?.amount}
              />

              <Select
                className="w-28"
                {...register(`ingredients.${index}.unit`)}
                aria-invalid={!!errors.ingredients?.[index]?.unit}
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
            </div>
            <FormErrorMessage
              error={
                errors.baseLiquor?.amount ||
                errors.baseLiquor?.unit ||
                errors.baseLiquor?.name
              }
            />
          </FormItem>
        ))}
      </div>
      {/* 재료 추가 버튼 */}
      <div className="mt-2">
        <Button
          className="w-full"
          type="button"
          onClick={() => append(structuredClone(emptyIngredient))}
        >
          재료 추가
        </Button>
      </div>
    </ThemeProvider>
  );
}

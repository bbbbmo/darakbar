import { Select, TextInput, Button, ThemeProvider } from "flowbite-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { XCircleIcon } from "@heroicons/react/24/solid";
import FormItem from "@/app/components/Forms/FormItem";
import FormDescription from "@/app/components/Forms/FormDescription";
import { emptyIngredient, unitOptions } from "../../RecipeCreateModal.const";
import { buttonTheme } from "@/app/flowbite/themes/button.theme";
import { CreateRecipeForm } from "../../RecipeCreateModal.schemes";
import FormErrorMessage from "@/app/components/Forms/FormErrorMessage";

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
              {...register("ingredients.0.name")}
              aria-invalid={!!errors.ingredients?.[0]?.name}
            />
            <TextInput
              className="w-22"
              type="number"
              step={0.25}
              placeholder="용량"
              {...register("ingredients.0.amount", {
                valueAsNumber: true,
              })}
              aria-invalid={!!errors.ingredients?.[0]?.amount}
            />
            <Select
              className="w-28"
              {...register("ingredients.0.unit")}
              aria-invalid={!!errors.ingredients?.[0]?.unit}
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
              errors.ingredients?.[0]?.amount ||
              errors.ingredients?.[0]?.unit ||
              errors.ingredients?.[0]?.name
            }
          />
        </FormItem>
        {/* 재료 입력 */}
        {fields?.slice(1).map((field, index) => {
          const actualIndex = index + 1;
          return (
            <FormItem key={field.id} label={`재료 ${actualIndex}`} required>
              <div className="flex items-center gap-2">
                <TextInput
                  type="text"
                  placeholder="추가적인 재료를 입력해 주세요"
                  className="h-10 grow"
                  {...register(`ingredients.${actualIndex}.name`)}
                  aria-invalid={!!errors.ingredients?.[actualIndex]?.name}
                />

                <TextInput
                  className="w-22"
                  type="number"
                  step={0.25}
                  placeholder="용량 및 개수"
                  {...register(`ingredients.${actualIndex}.amount`, {
                    valueAsNumber: true,
                  })}
                  aria-invalid={!!errors.ingredients?.[actualIndex]?.amount}
                />

                <Select
                  className="w-28"
                  {...register(`ingredients.${actualIndex}.unit`)}
                  aria-invalid={!!errors.ingredients?.[actualIndex]?.unit}
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
                    onClick={() => remove(actualIndex)}
                  >
                    <XCircleIcon className="size-5" />
                  </button>
                )}
              </div>
              <FormErrorMessage
                error={
                  errors.ingredients?.[actualIndex]?.amount ||
                  errors.ingredients?.[actualIndex]?.unit ||
                  errors.ingredients?.[actualIndex]?.name
                }
              />
            </FormItem>
          );
        })}
      </div>
      {/* 재료 추가 버튼 */}
      <div className="mt-2">
        <Button
          className="w-full"
          type="button"
          onClick={() =>
            append(
              structuredClone({ ...emptyIngredient, is_base_liquor: false }),
            )
          }
        >
          재료 추가
        </Button>
      </div>
    </ThemeProvider>
  );
}

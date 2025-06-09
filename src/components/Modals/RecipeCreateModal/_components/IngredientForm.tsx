import { Label, TextInput } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import type { IngredientForm } from "./form.type";

export default function IngredientForm() {
  const { register, handleSubmit } = useForm<IngredientForm>();

  const onSubmit: SubmitHandler<IngredientForm> = (data) => {
    console.log(data);
  };
  return (
    <>
      <form
        className="register-container min-w-100"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="mt-2 mb-5 text-lg">
          <span>나만의 특별한 레시피를 위한 재료를 입력해 주세요!</span>
        </p>
        <div className="scroll-none flex max-h-100 flex-col gap-2 overflow-y-auto text-stone-700">
          <div className="flex flex-col gap-3 rounded-lg bg-slate-100 p-2">
            <Label htmlFor="" className="font-bold">
              베이스(주재료) <span className="text-red-500">*</span>
            </Label>
            <div className="flex gap-1">
              <TextInput
                type="text"
                placeholder="메인이 되는 술이나 재료를 입력해 주세요"
                className="input-primary h-10 grow"
                {...register("baseLiquor", { required: true, maxLength: 15 })}
              />
              <TextInput
                className="input-primary ml-3 w-20"
                type="number" // null이면 0으로 처리
                step={0.25}
                placeholder="용량 및 개수"
                {...register("baseLiquorAmount", { required: true, min: 0 })}
              />
              <select
                className="w-15 rounded-sm"
                required
                {...register("baseLiquorUnit")}
              >
                <option value="oz">oz</option>
                <option value="ml">ml</option>
                <option value="티스푼">티스푼</option>
                <option value="스푼">스푼</option>
                <option value="개">개</option>
              </select>
            </div>
          </div>
          {ingredients?.map((ingredient, index) => (
            <div
              key={index}
              className="text relative flex flex-col gap-3 rounded-lg bg-slate-100 p-2"
            >
              <Label htmlFor="" className="font-bold">
                재료 {index + 1}
              </Label>
              {index !== 0 && (
                <span
                  className="absolute right-2 cursor-pointer"
                  onClick={() => removeIngredient(index)}
                >
                  <XCircleIcon className="size-5" />
                </span>
              )}
              <div className="input-container flex gap-1">
                <TextInput
                  type="text"
                  value={ingredient || ""}
                  placeholder="추가적인 재료를 입력해 주세요"
                  className="input-primary h-10 grow"
                  required
                  onChange={(e) => handleIngredientChange(e, index)}
                />
                <TextInput
                  value={ingredientAmounts[index] || 0}
                  className="input-primary ml-3 w-20"
                  type="number"
                  min={0}
                  step={0.25}
                  placeholder="용량 및 개수"
                  onChange={(e) => handleIngredientAmountsChange(e, index)}
                />
                <select
                  value={ingredientUnits[index] || "oz"}
                  className="w-15 rounded-sm"
                  required
                  onChange={(e) => handleIngredientUnitsChange(e, index)}
                >
                  <option value="oz">oz</option>
                  <option value="ml">ml</option>
                  <option value="티스푼">티스푼</option>
                  <option value="스푼">스푼</option>
                  <option value="개">개</option>
                </select>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="rounded-lg bg-zinc-600 p-2 text-white"
            onClick={addNewIngredient}
          >
            재료 추가
          </button>
        </div>
      </form>
    </>
  );
}

import { ArrowRightIcon, XCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import useRegisterStore from "../registerStore";

interface RecipeRegisterIngredientsProps {
  nextStep: () => void;
}

// [TODO] 재료 1 처음부터 있게, 용량 사용자 입력 가능하게
export default function RecipeRegisterIngredients({
  nextStep,
}: RecipeRegisterIngredientsProps) {
  // registerStore에서 상태 불러옴
  const {
    baseLiquor,
    baseLiquorAmount,
    baseLiquorUnit,
    ingredients,
    ingredientAmounts,
    ingredientUnits,
    setBaseLiquor,
    setBaseLiquorAmount,
    setBaseLiquorUnit,
    setIngredients,
    setIngredientAmounts,
    setIngredientUnits,
  } = useRegisterStore();

  /** 재료 추가 버튼 클릭 시 새로운 재료 입력을 추가 */
  const addNewIngredient = () => {
    if (ingredients || ingredientAmounts || ingredientUnits) {
      setIngredients([...ingredients, null]); // 새로운 재료 추가
      setIngredientAmounts([...ingredientAmounts, null]); // 새로운 용량 추가
      setIngredientUnits([...ingredientUnits, null]); // 새로운 단위 추가
    }
  };
  /** X 버튼 클릭 시 해당 재료 입력 삭제 */
  const removeIngredient = (index: number) => {
    if (ingredients) {
      setIngredients(ingredients.filter((_, i) => i !== index)); // 해당 인덱스의 재료 제거
      setIngredientAmounts(ingredientAmounts.filter((_, i) => i !== index)); // 해당 인덱스의 amounts 제거
      setIngredientUnits(ingredientUnits.filter((_, i) => i !== index)); // 해당 인덱스의 units 제거
    }
  };

  // 베이스 재료 입력 이벤트 함수's
  const handleBaseLiquorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBaseLiquor(e.target.value || "");
  };

  const handleBaseLiquorAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newAmount = Number(e.target.value) || 0;
    setBaseLiquorAmount(newAmount);
  };

  const handleBaseLiquorUnitChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newUnit = e.target.value || "oz";
    setBaseLiquorUnit(newUnit);
  };

  // 재료 1, 2, 3... 입력 이벤트 함수's
  const handleIngredientChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (ingredients) {
      const newIngredients = [...ingredients];
      newIngredients[index] = e.target.value || "";
      setIngredients(newIngredients);
    }
  };

  const handleIngredientAmountsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newAmounts = [...ingredientAmounts];
    newAmounts[index] = Number(e.target.value) || 0;
    setIngredientAmounts(newAmounts);
  };

  const handleIngredientUnitsChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => {
    const newUnits = [...ingredientUnits];
    newUnits[index] = e.target.value || "oz";
    setIngredientUnits(newUnits);
  };

  // 폼 기본 제출 방지
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  /** 재료 입력 잘 저장되는지 확인용 */
  // const check = () => {
  //   console.log(`
  //     베이스: ${baseLiquor},
  //     베이스 용량: ${baseLiquorAmount},
  //     베이스 단위: ${baseLiquorUnit},
  //     재료: ${ingredients},
  //     재료 용량: ${ingredientAmounts},
  //     재료 단위: ${ingredientUnits}`);
  // };

  return (
    <>
      <form className="register-container min-w-100" onSubmit={handleSubmit}>
        <p className="mt-2 mb-5 text-lg">
          <span>나만의 특별한 레시피를 위한 재료를 입력해 주세요!</span>
        </p>
        <div className="scroll-none flex max-h-100 flex-col gap-2 overflow-y-auto text-stone-700">
          <div className="flex flex-col gap-3 rounded-lg bg-slate-100 p-2">
            <label htmlFor="" className="font-bold">
              베이스(주재료) <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-1">
              <input
                type="text"
                value={baseLiquor || ""}
                placeholder="메인이 되는 술이나 재료를 입력해 주세요"
                className="input-primary h-10 grow"
                onChange={handleBaseLiquorChange}
                required
              />
              <input
                className="input-primary ml-3 w-20"
                type="number"
                value={baseLiquorAmount ?? 0} // null이면 0으로 처리
                min={0}
                step={0.25}
                placeholder="용량 및 개수"
                onChange={handleBaseLiquorAmountChange}
              />
              <select
                className="w-15 rounded-sm"
                value={baseLiquorUnit || "oz"}
                required
                onChange={handleBaseLiquorUnitChange}
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
              <label htmlFor="" className="font-bold">
                재료 {index + 1}
              </label>
              {index !== 0 && (
                <span
                  className="absolute right-2 cursor-pointer"
                  onClick={() => removeIngredient(index)}
                >
                  <XCircleIcon className="size-5" />
                </span>
              )}
              <div className="input-container flex gap-1">
                <input
                  type="text"
                  value={ingredient || ""}
                  placeholder="추가적인 재료를 입력해 주세요"
                  className="input-primary h-10 grow"
                  required
                  onChange={(e) => handleIngredientChange(e, index)}
                />
                <input
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
      <div className="footer mt-auto w-full">
        <button
          className="ml-auto flex items-center gap-1 hover:text-amber-400"
          onClick={() => {
            // check();
            nextStep();
          }}
        >
          다음 단계로 <ArrowRightIcon className="size-4" />
        </button>
      </div>
    </>
  );
}

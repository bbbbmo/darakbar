import { ArrowRightIcon, XCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import useRegisterStore from "../registerStore";

interface RecipeRegisterIngredientsProps {
  nextStep: () => void;
}

export default function RecipeRegisterIngredients({
  nextStep,
}: RecipeRegisterIngredientsProps) {
  const {
    baseLiquor,
    ingredients,
    ingredientUnits,
    addIngredient,
    removeIngredient,
    setBaseLiquor,
    setIngredients,
    setIngredientUnit,
  } = useRegisterStore();

  // 새 재료를 추가하는 함수
  const addNewIngredient = () => {
    addIngredient(""); // 빈 문자열로 새로운 재료 추가
  };

  const handleBaseLiquorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBaseLiquor(e.target.value);
  };

  // 재료 입력값을 변경하는 함수
  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value; // 해당 인덱스의 값 수정
    setIngredients(updatedIngredients); // Zustand에 새로운 배열을 설정
  };

  const handleIngredientUnitChange = (index: number, unit: string) => {
    setIngredientUnit(index, unit);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <form className="register-container min-w-100" onSubmit={handleSubmit}>
        <p className="mt-2 mb-5 text-lg">
          <span>나만의 특별한 레시피를 위한 재료를 입력해 주세요!</span>
        </p>
        <div className="scroll-none flex max-h-100 flex-col gap-2 overflow-y-auto text-stone-700">
          <div className="flex flex-col gap-3 rounded-lg bg-slate-100 p-2">
            <label htmlFor="" className="font-bold">
              베이스(주재료)
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={baseLiquor}
                placeholder="칵테일의 메인이 되는 술이나 재료를 입력해 주세요"
                className="h-10 grow rounded-sm border-2 pl-2 focus:outline focus:outline-stone-800"
                onChange={handleBaseLiquorChange}
                required
              />
              <select className="w-15 rounded-sm" required>
                <option value="oz">oz</option>
                <option value="ml">ml</option>
                <option value="티스푼">티스푼</option>
                <option value="스푼">스푼</option>
                <option value="개">개</option>
              </select>
            </div>
          </div>
          {ingredients.map((ingredient, index) => (
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
              <div className="flex gap-3">
                <input
                  type="text"
                  value={ingredient[index]} // 각 재료 입력값 바인딩
                  placeholder="추가적인 재료를 입력해 주세요"
                  className="h-10 grow rounded-sm border-2 pl-2 focus:outline focus:outline-stone-800"
                  onChange={(e) =>
                    handleIngredientChange(index, e.target.value)
                  } // 각 재료 수정
                  required
                />
                <select
                  value={ingredientUnits[index]} // 현재 단위 바인딩
                  className="w-15 rounded-sm"
                  required
                  onChange={(e) =>
                    handleIngredientUnitChange(index, e.target.value)
                  }
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
          onClick={nextStep}
        >
          다음 단계로 <ArrowRightIcon className="size-4" />
        </button>
      </div>
    </>
  );
}

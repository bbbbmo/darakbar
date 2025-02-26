import { ArrowRightIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface RecipeRegisterIngredientsProps {
  nextStep: () => void;
}

export default function RecipeRegisterIngredients({
  nextStep,
}: RecipeRegisterIngredientsProps) {
  const [base, setBase] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([""]);

  // 재료 입력 추가
  const addNewIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  // 재료 입력 삭제
  const deleteNewIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index); // index와 일치하지 않는 항목만 필터링
    setIngredients(newIngredients); // 필터링된 새 배열을 상태로 업데이트
  };

  // 재료 입력 시 해당 데이터 저장
  const changeIngredientsValue = (index: number, value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value; // 변경된 값으로 배열 업데이트
    setIngredients(updatedIngredients);
  };

  // 베이스 입력 시 해당 데이터 저장
  const changeBaseValue = (value: string) => {
    setBase(value);
  };

  // 폼 제출 방지
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
          <div className="text flex flex-col gap-3 rounded-lg bg-slate-100 p-2">
            <label htmlFor="" className="font-bold">
              베이스(주재료)
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={base}
                placeholder="칵테일의 메인이 되는 술이나 재료를 입력해 주세요"
                className="h-10 grow rounded-sm border-2 pl-2 focus:outline focus:outline-stone-800"
                onChange={(e) => changeBaseValue(e.target.value)}
              />
              <select className="w-15" required>
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
                  onClick={() => deleteNewIngredient(index)}
                >
                  <XCircleIcon className="size-5" />
                </span>
              )}
              <div className="flex gap-3">
                <input
                  type="text"
                  value={ingredient}
                  placeholder="추가적인 재료를 입력해 주세요"
                  className="h-10 grow rounded-sm border-2 pl-2 focus:outline focus:outline-stone-800"
                  onChange={(e) =>
                    changeIngredientsValue(index, e.target.value)
                  }
                />
                <select className="w-15" required>
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
            className="rounded-lg bg-zinc-600 p-2 text-white"
            onClick={addNewIngredient}
          >
            재료 추가
          </button>
        </div>
      </form>
      <div className="footer mt-auto w-full">
        <button
          className="flex items-center gap-1 hover:text-amber-400"
          onClick={nextStep}
        >
          다음 단계로 <ArrowRightIcon className="size-4" />
        </button>
      </div>
    </>
  );
}

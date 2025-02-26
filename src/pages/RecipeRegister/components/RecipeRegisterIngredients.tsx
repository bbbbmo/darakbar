import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function RecipeRegisterIngredients() {
  const [index, setIndex] = useState(1);
  const addNewIngredient = () => {
    setIndex(index + 1);
  };
  return (
    <section className="register-container min-w-100">
      <p className="my-2 text-lg">
        <span>만들고 싶은 칵테일의 재료를 입력해 주세요!</span>
      </p>
      <div className="flex max-h-600 flex-col gap-2 overflow-y-auto text-stone-700">
        <div className="text flex flex-col gap-3 rounded-lg bg-slate-100 p-2">
          <label htmlFor="" className="font-bold">
            베이스(주재료)
          </label>
          <input
            type="text"
            placeholder=""
            className="h-10 rounded-sm border-2 pl-2 focus:outline focus:outline-stone-800"
          />
        </div>
        <div className="text flex flex-col gap-3 rounded-lg bg-slate-100 p-2">
          <label htmlFor="" className="font-bold">
            재료 1
          </label>
          <input
            type="text"
            placeholder=""
            className="h-10 rounded-sm border-2 pl-2 focus:outline focus:outline-stone-800"
          />
        </div>
        <button
          className="rounded-lg bg-zinc-600 p-2 text-white"
          onClick={addNewIngredient}
        >
          재료 추가
        </button>
      </div>
      <button className="flex items-center gap-1 hover:text-amber-400">
        다음 단계로 <ArrowRightIcon className="size-4" />
      </button>
    </section>
  );
}

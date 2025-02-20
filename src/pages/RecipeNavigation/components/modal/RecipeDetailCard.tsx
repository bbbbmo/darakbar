import { XMarkIcon } from "@heroicons/react/24/solid";
import useRecipeStore from "../../useRecipeStore";
import { useState } from "react";
import { Cocktail_T } from "../../../../types/cocktailTypes";

interface RecipeDetailCardProps {
  cocktail: Cocktail_T | null;
}

// 레시피 정보
export default function RecipeDetailCard({ cocktail }: RecipeDetailCardProps) {
  const { closeDetail } = useRecipeStore();
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="wrapper h-full w-full flex-col rounded-3xl bg-slate-100">
      {/* 해당 레시피 이미지 */}
      <div className="image-container relative h-60 w-full rounded-t-3xl bg-stone-300">
        {/* detail 닫기 버튼 */}
        <div className="close-detail-card-btn absolute top-2 right-2 z-60 cursor-pointer rounded-lg bg-zinc-700">
          <XMarkIcon className="size-6" onClick={closeDetail} />
        </div>
      </div>
      <div className="details-container h-auto w-full text-stone-700">
        {/* 탭 구간 */}
        <div className="tab-group mt-2 flex gap-5 border-b border-gray-200 px-3 text-xl">
          <ul className="tabs flex flex-wrap gap-2">
            <li onClick={() => handleTabClick(0)}>
              <span
                className={`tab inline-block rounded-t-lg border-b-2 ${activeTab === 0 ? "border-red-300 bg-zinc-200 text-stone-900" : "border-transparent hover:border-red-300 hover:text-stone-900"} p-2`}
              >
                Description
              </span>
            </li>
            <li onClick={() => handleTabClick(1)}>
              <span
                className={`tab inline-block rounded-t-lg border-b-2 ${activeTab === 1 ? "border-red-300 bg-zinc-200 text-stone-900" : "border-transparent hover:border-red-300 hover:text-stone-900"} p-2`}
              >
                Ingredients
              </span>
            </li>
            <li onClick={() => handleTabClick(2)}>
              <span
                className={`tab inline-block rounded-t-lg border-b-2 ${activeTab === 2 ? "border-red-300 bg-zinc-200 text-stone-900" : "border-transparent hover:border-red-300 hover:text-stone-900"} p-2`}
              >
                Instruction
              </span>
            </li>
          </ul>
        </div>
        <p className="tab-content p-4 text-xl">
          {activeTab === 0 && cocktail && (
            <div className="tab-content__description flex flex-col gap-3">
              <div className="description__base">
                <span className="mr-1 font-bold">베이스:</span>
                {cocktail.base_liquor}
              </div>
              <div className="description__glass">
                <span className="mr-1 font-bold">잔:</span>
                {cocktail.glass_type}
              </div>
              <div className="description__description">
                <span className="mr-1 font-bold">설명:</span>
                {cocktail.description}
              </div>
            </div>
          )}
          {activeTab === 1 && cocktail && cocktail.ingredients}
          {activeTab === 2 && cocktail && cocktail.instructions}
        </p>
      </div>
    </div>
  );
}

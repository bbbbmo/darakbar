import { useState } from "react";
import { useRecipeStore } from "@/stores/recipe.store";

// 레시피 정보
export default function Detail() {
  const { clickedRecipe } = useRecipeStore();

  const [activeTab, setActiveTab] = useState<number>(0);

  const baseLiquor = clickedRecipe?.recipe_ingredients?.find(
    (ingredient) => ingredient.is_base_liquor,
  )?.ingredients.name;

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="wrapper relative h-full w-full flex-col rounded-xl bg-slate-100">
      <div className="details-container h-full w-full text-stone-700">
        {/* 탭 구간 */}
        <div className="tab-group flex gap-5 border-b border-gray-200 px-3 text-xl">
          <ul className="tabs flex flex-wrap gap-2">
            <li onClick={() => handleTabClick(0)}>
              <strong
                className={`tab flex items-center justify-center ${activeTab === 0 ? "border-amber-400 bg-zinc-200 text-stone-900" : "border-transparent hover:border-amber-400 hover:text-stone-900"} p-2`}
              >
                설명
              </strong>
            </li>
            <li onClick={() => handleTabClick(1)}>
              <strong
                className={`tab flex items-center justify-center ${activeTab === 1 ? "border-amber-400 bg-zinc-200 text-stone-900" : "border-transparent hover:border-amber-400 hover:text-stone-900"} p-2`}
              >
                재료
              </strong>
            </li>
            <li onClick={() => handleTabClick(2)}>
              <strong
                className={`tab flex items-center justify-center ${activeTab === 2 ? "border-amber-400 bg-zinc-200 text-stone-900" : "border-transparent hover:border-amber-400 hover:text-stone-900"} p-2`}
              >
                제조법
              </strong>
            </li>
          </ul>
        </div>
        <section className="p-4 text-xl">
          {activeTab === 0 && clickedRecipe && (
            <div className="flex flex-col gap-2">
              <div>
                <strong className="mr-1 font-bold">베이스:</strong>
                {baseLiquor}
              </div>
              <div>
                <strong className="mr-1 font-bold">잔:</strong>
                {clickedRecipe.glass_type}
              </div>
            </div>
          )}
          {activeTab === 1 &&
            clickedRecipe &&
            clickedRecipe.recipe_ingredients?.map((ingredient) => (
              <div key={ingredient.ingredients.id}>
                {ingredient.ingredients.name}
              </div>
            ))}
          {activeTab === 2 && clickedRecipe && clickedRecipe.instructions}
        </section>
      </div>
    </div>
  );
}

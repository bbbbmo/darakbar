import { Cocktail_T } from "../../../../types/cocktailTypes";
import RecipeBtnGroup from "./RecipeBtnGroup";

interface RecipeViewCardProps {
  cocktail: Cocktail_T;
}

// 레시피 시각 파트
export default function RecipeViewCard({ cocktail }: RecipeViewCardProps) {
  return (
    // [TODO] 배경색 어떻게 할지
    <div className="h-full w-full rounded-xl bg-stone-700 text-stone-100">
      <div className="h-[70%] w-full rounded-t-xl bg-white"></div>
      <div className="p-3">
        <div className="flex items-center">
          <div className="w-full text-2xl font-bold">
            {cocktail && cocktail.name}
          </div>
          <RecipeBtnGroup />
        </div>
        <article className="mt-2 text-lg">
          {cocktail && cocktail.description}
        </article>
      </div>
    </div>
  );
}

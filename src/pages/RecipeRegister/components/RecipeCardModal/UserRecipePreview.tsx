import useCocktailStore from "../../../../stores/cocktailStore";
import UserRecipeBtns from "./UserRecipeBtnGroup";

// 레시피 시각 파트
export default function UserRecipePreview() {
  const { clickedCardData } = useCocktailStore();

  return (
    // [TODO] 배경색 어떻게 할지
    <div className="h-full w-full rounded-xl bg-stone-700 text-stone-100">
      <div className="flex h-[70%] w-full items-center justify-center rounded-t-xl"></div>
      <div className="p-3">
        <div className="flex items-center">
          <div className="w-full text-2xl font-bold">
            {clickedCardData ? clickedCardData.name : "이름 없는 칵테일"}
          </div>
          <UserRecipeBtns />
        </div>
        <article className="mt-2 text-lg">
          {clickedCardData ? clickedCardData.description : "칵테일 설명 없음"}
        </article>
      </div>
    </div>
  );
}

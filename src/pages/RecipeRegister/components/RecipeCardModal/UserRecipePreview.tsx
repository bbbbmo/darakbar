import useCocktailStore from "../../../../stores/cocktailStore";
import UserRecipeBtns from "../../../../components/BtnGroup/ButtonGroup";

// 레시피 시각 파트
export default function UserRecipePreview() {
  const { clickedCardData } = useCocktailStore();

  return (
    <div className="flex h-full max-w-180 min-w-150 flex-col rounded-xl bg-stone-700 text-stone-100">
      <div className="flex h-[70%] w-full items-center justify-center">
        <img
          className="h-110 bg-contain"
          src={clickedCardData?.image_url ?? ""}
        />
      </div>
      <div className="p-3">
        <div className="flex items-center">
          <div className="w-full text-2xl font-bold">
            <span className="italic">
              {clickedCardData ? clickedCardData.name : "이름 없는 칵테일"} -
              {clickedCardData?.userinfo?.name}
            </span>
          </div>

          <UserRecipeBtns
            heartBtn={true}
            shareBtn={true}
            chatBtn={true}
            detailBtn={true}
          />
        </div>
        <article className="mt-2 text-lg">
          {clickedCardData ? clickedCardData.description : "칵테일 설명 없음"}
        </article>
      </div>
    </div>
  );
}

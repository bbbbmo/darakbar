import RecipeBtnGroup from "./RecipeBtnGroup";

// 레시피 시각 파트
export default function RecipeViewCard() {
  return (
    // [TODO] 배경색 어떻게 할지
    <div className="h-full w-full rounded-xl bg-stone-700 text-stone-100">
      <div className="h-100 w-full rounded-t-xl bg-white"></div>
      <div className="p-3">
        <div className="flex">
          <div className="w-full text-2xl">Name</div>
          <RecipeBtnGroup />
        </div>
        <article className="mt-2 text-lg">details</article>
      </div>
    </div>
  );
}

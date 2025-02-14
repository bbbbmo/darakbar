export default function RecipeDetailCard() {
  return (
    <div className="h-full w-full flex-col rounded-xl bg-slate-100">
      <div className="h-60 w-full rounded-t-xl bg-stone-300"></div>
      <div className="h-auto w-full text-stone-700">
        <div className="flex gap-5 px-3 text-xl underline decoration-stone-950">
          <span className="cursor-pointer">Itroduce</span>
          <span className="cursor-pointer">Ingredients</span>
          <span className="cursor-pointer">Instructions</span>
        </div>
        <div className="p-4 text-xl">
          <p>hi</p>
        </div>
      </div>
    </div>
  );
}

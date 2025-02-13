import { XMarkIcon } from "@heroicons/react/24/solid";
import RecipeDetailCard from "./modal-recipe-components/RecipeDetailCard";
import RecipeViewCard from "./modal-recipe-components/RecipeViewCard";

export default function RecipeModal() {
  return (
    <div className="bg-stone-opacity-50 fixed inset-0 z-100 flex items-center justify-center">
      <div className="h-180 w-auto rounded-xl bg-neutral-700 p-8">
        <div className="float-right">
          <XMarkIcon className="size-7 fill-zinc-600" />
        </div>
        <div className="flex h-full gap-5">
          <div className="h-full w-200">
            <RecipeViewCard />
          </div>
          <div className="ml-auto h-full w-100">
            <RecipeDetailCard />
          </div>
        </div>
      </div>
    </div>
  );
}

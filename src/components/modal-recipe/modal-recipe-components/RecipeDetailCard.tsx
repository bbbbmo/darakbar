import { XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import useRecipeStore from "./useRecipeStrore";

// 레시피 정보
export default function RecipeDetailCard() {
  const { toggleOpen } = useRecipeStore();
  return (
    <div className="wrapper h-full w-full flex-col rounded-3xl bg-slate-100">
      <div className="image-container relative h-60 w-full rounded-t-3xl bg-stone-300">
        <div className="close-detail-card-btn absolute top-2 right-2 z-60 cursor-pointer rounded-lg bg-zinc-700">
          <XMarkIcon className="size-6" onClick={toggleOpen} />
        </div>
      </div>
      <div className="details-container h-auto w-full text-stone-700">
        <div className="tab-group mt-2 flex gap-5 border-b border-gray-200 px-3 text-xl">
          <ul className="tabs flex flex-wrap gap-3">
            <li>
              <Link
                to=""
                className="tab inline-block rounded-t-lg border-b-2 border-transparent p-2 hover:border-red-300 hover:text-stone-900"
              >
                Introduce
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="tab inline-block rounded-t-lg border-b-2 border-transparent p-2 hover:border-red-300 hover:text-stone-900"
              >
                Ingredients
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="tab inline-block rounded-t-lg border-b-2 border-transparent p-2 hover:border-red-300 hover:text-stone-900"
              >
                Instructions
              </Link>
            </li>
          </ul>
        </div>
        <div className="p-4 text-xl">
          <p>hi</p>
        </div>
      </div>
    </div>
  );
}

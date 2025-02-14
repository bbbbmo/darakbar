import { Link } from "react-router-dom";

// 레시피 정보
export default function RecipeDetailCard() {
  return (
    <div className="h-full w-full flex-col rounded-3xl bg-slate-100">
      <div className="h-60 w-full rounded-t-3xl bg-stone-300"></div>
      <div className="h-auto w-full text-stone-700">
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

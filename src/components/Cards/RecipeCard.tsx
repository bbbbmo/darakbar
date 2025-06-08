import useModalStore from "../Modals/modalStore";

type RecipeCardProps = {
  title: string;
  image: string | null;
  rating?: number;
  creater?: string;
};

const MAX_STARS = 5;

const RecipeCard = ({ title, image, rating = 0, creater }: RecipeCardProps) => {
  const { open } = useModalStore();

  const safeRating = Math.max(0, Math.min(MAX_STARS, Math.round(rating)));

  return (
    <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow-sm dark:border-stone-700 dark:bg-stone-700">
      {/* 칵테일 이미지 */}
      <img
        className="h-100 w-100 rounded-t-lg p-8"
        alt="product image"
        src={image ? image : undefined}
      />
      <div className="px-5 pb-5">
        {/* 칵테일 이름 */}
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        {/* ⭐️ stars */}
        <div className="mt-2.5 mb-5 flex items-center">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {Array.from({ length: MAX_STARS }).map((_, i) => (
              <svg
                key={i}
                className={`h-4 w-4 ${
                  i < safeRating
                    ? "text-yellow-300"
                    : "text-gray-200 dark:text-gray-600"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
          </div>
          {rating ? (
            <span className="ms-3 rounded-sm bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
              {rating}
            </span>
          ) : null}
        </div>

        <div className="flex items-center justify-between">
          {/* 등록한 사람 */}
          {creater ? (
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {creater}
            </span>
          ) : null}
          {/** 레시피 보기 버튼 */}
          <button
            className="ml-auto rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-black hover:bg-amber-800 focus:ring-4 focus:ring-amber-300 focus:outline-none dark:bg-amber-400 dark:hover:bg-amber-500 dark:focus:ring-amber-800"
            onClick={() => open("recipe")}
          >
            레시피 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

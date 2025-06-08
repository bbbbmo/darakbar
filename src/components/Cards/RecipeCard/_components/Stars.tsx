const MAX_STARS = 5;

type StarsProps = {
  rating: number;
};

export default function Stars({ rating }: StarsProps) {
  const safeRating = Math.max(0, Math.min(MAX_STARS, Math.round(rating)));
  return (
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
  );
}

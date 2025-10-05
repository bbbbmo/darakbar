import { HiStar } from "react-icons/hi";

const MAX_STARS = 5;

type StarsProps = {
  rating: number;
  size?: number;
  showRatingChip?: boolean;
};

export default function Stars({ rating, size, showRatingChip }: StarsProps) {
  const safeRating = Math.max(0, Math.min(MAX_STARS, Math.round(rating)));
  return (
    <div className="flex items-center">
      <div className="flex items-center rtl:space-x-reverse">
        {Array.from({ length: MAX_STARS }).map((_, i) => (
          <HiStar
            key={i}
            className={`${
              i < safeRating
                ? "text-yellow-300"
                : "text-gray-200 dark:text-gray-600"
            }`}
            size={size}
          ></HiStar>
        ))}
      </div>
      {rating && showRatingChip ? (
        <span className="ms-3 rounded-sm bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
          {rating}
        </span>
      ) : null}
    </div>
  );
}

import { Button, Card } from "flowbite-react";
import useModalStore from "../../Modals/modalStore";
import Stars from "./_components/Stars";
import useCocktailStore from "../../Modals/RecipeModal/recipe-modal.store";
import { Cocktail } from "../../../types/cocktails";

type RecipeCardProps = {
  title: string;
  image: string | null;
  rating?: number;
  creater?: string;
  className?: string;
  cocktail: Cocktail;
};

const RecipeCard = ({
  title,
  image,
  rating = 0,
  creater,
  cocktail,
  className,
}: RecipeCardProps) => {
  const { open } = useModalStore();
  const { setClickedCardData } = useCocktailStore();

  const showCocktail = () => {
    setClickedCardData(cocktail); // 클릭한 칵테일 데이터 저장
    open("recipe");
  };

  return (
    <Card
      className={`${className} bg-secondary !shadow-2xl transition delay-150 duration-400 ease-in-out hover:-translate-y-1 hover:scale-103`}
    >
      <img
        src={image ? image : undefined}
        alt="Cocktail Image"
        className="max-h-80 w-full"
      />
      <section className="px-3 pb-5">
        {/* 칵테일 이름 */}
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        {/* ⭐️ stars */}
        <Stars rating={rating} />

        <div className="flex items-center justify-between">
          {/* 등록한 사람 */}
          {creater ? (
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {creater}
            </span>
          ) : null}
          {/* 레시피 보기 버튼 */}
          <Button
            className="ml-auto rounded-lg px-5 py-2.5 text-center text-sm font-bold text-black hover:bg-amber-800 focus:ring-4 focus:ring-amber-300 focus:outline-none dark:bg-amber-400 dark:hover:bg-amber-500 dark:focus:ring-amber-800"
            onClick={showCocktail}
          >
            레시피 보기
          </Button>
        </div>
      </section>
    </Card>
  );
};

export default RecipeCard;

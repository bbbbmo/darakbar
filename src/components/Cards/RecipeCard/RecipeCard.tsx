import { Button, Card, ThemeProvider } from "flowbite-react";
import useModalStore from "../../Modals/modalStore";
import Stars from "./_components/Stars";
import useCocktailStore from "../../Modals/RecipeModal/recipe-modal.store";
import { Cocktail } from "../../../types/cocktails";
import { cardTheme } from "@/flowbite/themes/card.theme";

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
    <ThemeProvider theme={cardTheme}>
      <Card
        theme={cardTheme.cocktail}
        className={`${className}`}
        imgAlt="Cocktail Image"
        imgSrc={image ? image : undefined}
      >
        <section>
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
    </ThemeProvider>
  );
};

export default RecipeCard;

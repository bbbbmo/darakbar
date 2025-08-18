import { Button, Card, ThemeProvider } from "flowbite-react";
import useModalStore from "../../Modals/modalStore";
import Stars from "./_components/Stars";
import { cardTheme } from "@/flowbite/themes/card.theme";
import { buttonTheme } from "@/flowbite/themes/button.theme";
import CardSkeleton from "../CardSkeleton";

type RecipeCardProps = {
  title: string;
  image: string | null;
  rating?: number;
  creater?: string;
  className?: string;
  loading?: boolean;
};

const RecipeCard = ({
  title,
  image,
  rating = 0,
  creater,
  className,
  loading,
}: RecipeCardProps) => {
  const { open } = useModalStore();

  const showCocktail = () => {
    open("recipe");
  };

  return (
    <>
      {loading ? (
        <CardSkeleton />
      ) : (
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
                <ThemeProvider theme={buttonTheme}>
                  <Button
                    theme={buttonTheme.button}
                    color="primary"
                    className="ml-auto"
                    onClick={showCocktail}
                  >
                    레시피 보기
                  </Button>
                </ThemeProvider>
              </div>
            </section>
          </Card>
        </ThemeProvider>
      )}
    </>
  );
};

export default RecipeCard;

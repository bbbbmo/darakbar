"use client";

import { Button, Card, ThemeProvider } from "flowbite-react";
import Stars from "./_components/Stars";
import { cardTheme } from "@lib/flowbite/themes/card.theme";
import { buttonTheme } from "@lib/flowbite/themes/button.theme";
import CardSkeleton from "../../../../components/Cards/CardSkeleton";
import { UserRecipeWithIngredients } from "@/app/(main)/personal-recipe/_hooks/useUserRecipe";
import Link from "next/link";
import { usePathname } from "next/navigation";

type RecipeCardProps = {
  recipe: UserRecipeWithIngredients;
  loading: boolean;
  className?: string;
};

const RecipeCard = ({ recipe, loading, className }: RecipeCardProps) => {
  const pathname = usePathname();
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
            imgSrc={recipe.image_url ? recipe.image_url : undefined}
          >
            <section>
              {/* 칵테일 이름 */}
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {recipe.name}
              </h5>
              {/* ⭐️ stars */}
              <Stars rating={0} />

              <div className="flex items-center justify-between">
                {/* 등록한 사람 */}
                {recipe.userinfo ? (
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {recipe.userinfo?.name}
                  </span>
                ) : null}
                {/* 레시피 보기 버튼 */}
                <ThemeProvider theme={buttonTheme}>
                  <Button
                    theme={buttonTheme.button}
                    color="primary"
                    className="ml-auto"
                  >
                    <Link
                      href={`${process.env.NEXT_PUBLIC_BASE_URL}/${pathname}/${recipe.id}`}
                    >
                      레시피 보기
                    </Link>
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

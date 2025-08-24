"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@components/LoadingScreen";
import { Button } from "flowbite-react";
import { Card } from "flowbite-react";
import BlurText from "@components/Reactbits/BlurText";
import RecipeCard from "../../components/Cards/RecipeCard/RecipeCard";
import { UserRecipeWithIngredients } from "../personal-recipe/_hooks/useUserRecipe";
import { mockCocktails } from "./home.const";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [randomCocktails, setRandomCocktails] = useState<
    UserRecipeWithIngredients[]
  >([]);

  const cocktailLoading = true;

  const goPersonalRecipePage = () => {
    router.push("/personal-recipe");
  };

  // const getRandomCocktails = async () => {
  //   const { data } = await supabase
  //     .from("cocktails")
  //     .select("*")
  //     .order("id", { ascending: true });
  //   setRandomCocktails(data ?? []);
  // };

  useEffect(() => {
    setRandomCocktails(mockCocktails);
    // getRandomCocktails();
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="wrapper m-10 flex h-full flex-col justify-center gap-10">
          <Card className="bg-primary h-90 w-full">
            <BlurText
              text={"다락바 - 나만의 칵테일 레시피"}
              delay={150}
              animateBy="words"
              direction="top"
              className="mb-8 text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
            />
            <p className="text-primary">
              <span>
                다락바는 마치 나만의 작은 다락방처럼, 잊혀진 보물과 같은 칵테일
                레시피들이 숨어있는 공간입니다.
                <br></br>
                이곳에서 독창적인 레시피와 그 속에 담긴 감성을 보여주세요.
              </span>
            </p>
            <Button
              className="btn-secondary mt-10 ml-auto w-xs font-bold"
              onClick={goPersonalRecipePage}
            >
              시작하기
              <svg
                className="-mr-1 ml-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Card>
          <Card className="bg-primary w-full">
            <div className="grid w-full grid-cols-3 gap-20">
              {randomCocktails.map((cocktail) => (
                <RecipeCard
                  key={cocktail.id}
                  recipe={cocktail}
                  loading={cocktailLoading}
                />
              ))}
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

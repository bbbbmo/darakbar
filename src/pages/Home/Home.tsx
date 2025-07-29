// 컴포넌트

import { useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import { Button } from "flowbite-react";
import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import BlurText from "../../reactbits/BlurText";
// import supabase from "../../supabase";
import { Cocktail } from "../../types/cocktails";
import RecipeCard from "../../components/Cards/RecipeCard/RecipeCard";

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [randomCocktails, setRandomCocktails] = useState<Cocktail[]>([]);

  const goPersonalRecipePage = () => {
    navigate("/personal-recipe");
  };

  // const getRandomCocktails = async () => {
  //   const { data } = await supabase
  //     .from("cocktails")
  //     .select("*")
  //     .order("id", { ascending: true });
  //   setRandomCocktails(data ?? []);
  // };

  const ramdomData: Cocktail[] = [
    {
      id: 1,
      name: "칵테일 1",
      base_liquor: "베이스 위스키",
      ingredients: ["재료1", "재료2", "재료3"],
      glass_type: "잔 타입",
      instructions: "레시피 1",
      description: "설명 1",
      image_url: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "칵테일 2",
      base_liquor: "베이스 위스키",
      ingredients: ["재료1", "재료2", "재료3"],
      glass_type: "잔 타입",
      instructions: "레시피 1",
      description: "설명 1",
      image_url: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "칵테일 3",
      base_liquor: "베이스 위스키",
      ingredients: ["재료1", "재료2", "재료3"],
      glass_type: "잔 타입",
      instructions: "레시피 1",
      description: "설명 1",
      image_url: "https://via.placeholder.com/150",
    },
  ];

  useEffect(() => {
    setRandomCocktails(ramdomData);
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
            <div className="grid w-full grid-cols-3 gap-10">
              {randomCocktails.map((cocktail) => (
                <RecipeCard
                  key={cocktail.id}
                  title={cocktail.name ?? ""}
                  image={cocktail.image_url}
                  rating={0}
                  creater={""}
                  cocktail={cocktail}
                />
              ))}
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

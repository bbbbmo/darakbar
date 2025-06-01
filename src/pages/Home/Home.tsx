// 컴포넌트

import { useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import { Button } from "flowbite-react";
import { Card } from "flowbite-react";
export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="flex h-full justify-center">
          <Card className="mt-10 h-100 max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              다락바 - 나만의 칵테일 레시피
            </h1>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <span>
                다락바는 마치 나만의 작은 다락방처럼, 잊혀진 보물과 같은 칵테일
                레시피들이 숨어있는 공간입니다.
                <br></br>
                이곳에서 여러분만의 독창적인 레시피와 그 속에 담긴 감성을
                보여주세요.
              </span>
            </p>
            <Button>
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
        </div>
      )}
    </>
  );
}

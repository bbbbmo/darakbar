"use client";

import BlurText from "@/components/Reactbits/BlurText";
import { Button, Card } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function IntroSection() {
  const router = useRouter();
  const goPersonalRecipePage = () => {
    router.push("/personal-recipe");
  };
  return (
    <Card className="bg-primary h-90 w-full">
      <BlurText
        text={"다락바 - 나만의 칵테일 레시피"}
        delay={150}
        animateBy="words"
        direction="top"
        className="mb-8 text-4xl font-bold tracking-tight dark:text-white"
      />
      <p className="text-zinc-500">
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
  );
}

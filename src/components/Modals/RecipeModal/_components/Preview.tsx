import useCocktailStore from "../recipe-modal.store";
import { Button, ButtonGroup, Carousel } from "flowbite-react";

export default function Preview() {
  const { clickedCardData } = useCocktailStore();
  return (
    <div className="flex h-full w-full flex-col text-stone-100">
      <div className="h-[70%] w-full bg-gray-800">
        {/* TODO: 이미지 여러개 추가 */}
        <Carousel pauseOnHover slideInterval={5000} className="">
          <img
            className="h-full w-full object-contain"
            src={clickedCardData?.image_url ?? ""}
            alt="칵테일 이미지"
          />

          <img
            className="h-full w-full object-contain"
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="예시 이미지 1"
          />

          <img
            className="h-full w-full object-contain"
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="예시 이미지 2"
          />
        </Carousel>
      </div>
      <div className="mt-3 p-3">
        <div className="flex w-full items-center text-2xl font-bold">
          <span className="italic">
            {clickedCardData ? clickedCardData.name : "이름 없는 칵테일"} -
            {clickedCardData?.userinfo?.name ?? "익명"}
          </span>
          <ButtonGroup className="ml-auto">
            <Button color="gray">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2 size-5 text-amber-400"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
              좋아요
            </Button>
            <Button color="gray">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2 size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
                  clipRule="evenodd"
                />
              </svg>
              공유
            </Button>
          </ButtonGroup>
        </div>
        <article className="mt-2 text-lg">
          {clickedCardData ? clickedCardData.description : "칵테일 설명 없음"}
        </article>
      </div>
    </div>
  );
}

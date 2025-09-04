"use client";

import useModalStore from "@components/Modals/modalStore";
import { Button } from "flowbite-react";
import RecipeCreateModal from "./RecipeCreateModal/RecipeCreateModal";
import { basicTheme } from "@/lib/flowbite/themes/basicTheme";
import HeaderCard from "@/components/Cards/HeaderCard";

export default function PersonalRecipeHeader() {
  const { open } = useModalStore();
  return (
    <HeaderCard
      title="나만의 레시피"
      message="나만의 칵테일을 만들어 다락바에 보관해 보세요!"
    >
      <Button
        className="mt-10 ml-auto font-bold"
        theme={basicTheme.button}
        color="primary"
        onClick={() => open("create")}
      >
        레시피 등록하기
      </Button>
      <RecipeCreateModal />
    </HeaderCard>
  );
}

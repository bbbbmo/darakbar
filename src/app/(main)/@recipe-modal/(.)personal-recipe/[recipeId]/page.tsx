"use client";

import RecipeModal from "@/app/(main)/_components/RecipeModal/RecipeModal";
import useModalStore from "@/components/Modals/modalStore";
import { useEffect, useState } from "react";

type PersonalRecipeModalProps = {
  params: Promise<{
    recipeId: string;
  }>;
};

export default function PersonalRecipeModal({
  params,
}: PersonalRecipeModalProps) {
  const { open } = useModalStore();
  const [recipeId, setRecipeId] = useState<number | null>(null);

  useEffect(() => {
    const openModal = async () => {
      const { recipeId } = await params;
      setRecipeId(parseInt(recipeId));
      open("recipe");
    };

    openModal();
  }, [params, open]);

  if (!recipeId) return null;

  return <RecipeModal id={recipeId} />;
}

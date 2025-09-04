import RecipeModal from "@/app/(main)/_components/RecipeModal/RecipeModal";
import Loading from "@/app/loading";
import { Suspense } from "react";

type BasicRecipeModalProps = {
  params: Promise<{
    recipeId: string;
  }>;
};

export default async function BasicRecipeModal({
  params,
}: BasicRecipeModalProps) {
  const { recipeId } = await params;

  if (!recipeId) return null;

  return (
    <Suspense fallback={<Loading />}>
      <RecipeModal id={parseInt(recipeId)} />;
    </Suspense>
  );
}

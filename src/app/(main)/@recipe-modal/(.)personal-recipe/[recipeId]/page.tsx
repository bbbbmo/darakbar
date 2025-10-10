import RecipeModal from "@/app/(main)/_components/RecipeModal/RecipeModal";
import Loading from "@/app/loading";
import { Suspense } from "react";

type PersonalRecipeModalProps = {
  params: Promise<{
    recipeId: string;
  }>;
};

export default async function PersonalRecipeModal({
  params,
}: PersonalRecipeModalProps) {
  const { recipeId } = await params;

  if (!recipeId) return null;

  return (
    <Suspense fallback={<Loading />}>
      <RecipeModal id={parseInt(recipeId)} />;
    </Suspense>
  );
}

import RecipeModal from "@/app/(main)/_components/RecipeModal/RecipeModal";

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

  return <RecipeModal id={parseInt(recipeId)} />;
}

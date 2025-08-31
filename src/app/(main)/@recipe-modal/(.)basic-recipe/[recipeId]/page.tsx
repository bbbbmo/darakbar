import RecipeModal from "@/app/(main)/_components/RecipeModal/RecipeModal";

type BasicRecipeModalProps = {
  params: {
    recipeId: string;
  };
};

export default function BasicRecipeModal({ params }: BasicRecipeModalProps) {
  return <RecipeModal id={params.recipeId} />;
}

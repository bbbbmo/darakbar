import RecipeModal from "@/components/Modals/RecipeModal/RecipeModal";

type BasicRecipeModalProps = {
  recipeId: string;
};

export default function BasicRecipeModal({ recipeId }: BasicRecipeModalProps) {
  return <RecipeModal id={recipeId} />;
}

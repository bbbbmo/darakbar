import RecipeModal from "@/components/Modals/RecipeModal/RecipeModal";

type PersonalRecipeModalProps = {
  recipeId: string;
};

export default function PersonalRecipeModal({
  recipeId,
}: PersonalRecipeModalProps) {
  return <RecipeModal id={recipeId} />;
}

import RecipeModal from "@/app/(main)/_components/RecipeModal/RecipeModal";

type PersonalRecipeModalProps = {
  params: {
    recipeId: string;
  };
};

export default function PersonalRecipeModal({
  params,
}: PersonalRecipeModalProps) {
  return <RecipeModal id={params.recipeId} />;
}

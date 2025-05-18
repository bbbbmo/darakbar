import RecipeModalDetails from "./_components/RecipeModalDetails";
import RecipeModalPreview from "./_components/RecipeModalPreview";

export default function RecipeModal() {
  return (
    <div>
      <RecipeModalPreview />
      <RecipeModalDetails />
    </div>
  );
}

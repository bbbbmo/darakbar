import SearchBar from "@components/SearchBar";
import BasicRecipes from "./_components/BasicRecipes";
import BasicRecipeHeader from "./_components/BasicRecipeHeader";

export default function RecipeNavigation() {
  return (
    <section>
      <BasicRecipeHeader />
      <SearchBar />
      {/* 레시피 카드 */}
      <BasicRecipes />
    </section>
  );
}

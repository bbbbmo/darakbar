import GlobalFooter from "../../components/layout/GlobalFooter";
import GlobalNav from "../../components/layout/GlobalNav";
import SearchBar from "../../components/SearchBar";

export default function RecipeRegister() {
  return (
    <>
      <GlobalNav />
      <div className="wrapper h-full w-full px-15 pt-15">
        <SearchBar />
      </div>
      <GlobalFooter />
    </>
  );
}

import { useEffect, useState } from "react";
import GlobalFooter from "../../components/layout/GlobalFooter";
import GlobalNav from "../../components/layout/GlobalNav";
import SearchBar from "../../components/SearchBar";
import supabase from "../../supabase";

interface Cocktail {
  id: number;
  name: string;
  base_liquor: string;
  ingredients: string[];
  glass_type: string;
  recipe: string;
  description: string;
}

export default function RecipeRegister() {
  const [cocktailsData, setCocktailsData] = useState<Cocktail[] | null>(null);

  useEffect(() => {
    getCocktailsData();
  }, []);

  // cocktailsData가 변경될 때마다 콘솔 출력
  useEffect(() => {
    if (cocktailsData) {
      console.log("Cocktails Data:", cocktailsData);
    }
  }, [cocktailsData]);

  const getCocktailsData = async () => {
    const { data, error } = await supabase.from("cocktails").select(); // 객체 배열 반환

    if (error) {
      console.log("Error Fetching data", error);
      return;
    }
    setCocktailsData(data);
  };

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

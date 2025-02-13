import RecipeCard from "../components/RecipeCard";

export default function Home() {
  return (
    <nav className="flex h-full w-full bg-neutral-800 pt-15">
      <div className="w-100"></div>
      <div className="ml-auto h-full w-100 py-10 pr-5">
        <RecipeCard />
      </div>
    </nav>
  );
}

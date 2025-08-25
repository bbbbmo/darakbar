import { Suspense } from "react";
import Loading from "../loading";
import IntroSection from "./_components/IntroSection";
import RandomRecipes from "./_components/RandomRecipes";

export default function HomePage() {
  return (
    <main className="wrapper m-10 flex h-full flex-col justify-center gap-10">
      <Suspense fallback={<Loading />}>
        <IntroSection />
        <RandomRecipes />
      </Suspense>
    </main>
  );
}

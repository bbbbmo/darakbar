import { Suspense } from "react";
import Loading from "../../loading";
import IntroSection from "./_components/IntroSection";
import RandomRecipes from "./_components/RandomRecipes";

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <IntroSection />
        <RandomRecipes />
      </Suspense>
    </>
  );
}

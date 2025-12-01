import LandingFooter from './_components/LandingFooter'
import LandingHeader from './_components/LandingHeader'
import RandomCocktails from './_components/RandomCocktails'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-60">
      <LandingHeader />
      <RandomCocktails />
      <LandingFooter />
    </div>
  )
}

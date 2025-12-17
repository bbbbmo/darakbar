import ContentWrapper from '@/components/ui/layout/ContentWrapper'
import MainNavBar from '../_components/MainNavBar'
import LandingFooter from './_components/LandingFooter'
import LandingHeader from './_components/LandingHeader'
import RandomBars from './_components/RandomBars'
import RandomCocktails from './_components/RandomCocktails'

export default function HomePage() {
  return (
    <>
      <MainNavBar />
      <ContentWrapper className="gap-60">
        <LandingHeader />
        <RandomBars />
        <RandomCocktails />
        <LandingFooter />
      </ContentWrapper>
    </>
  )
}

import BarSearchHeader from './_components/BarSearchHeader'
import BarSearchFooter from './_components/BarSearchFooter'
import BarSearchContent from './_components/BarSearchContent'
import MainNavBar from '../_components/MainNavBar'
import ContentWrapper from '@/components/ui/layout/ContentWrapper'

export default async function BarSearch() {
  return (
    <>
      <MainNavBar />
      <ContentWrapper className="gap-10">
        <BarSearchHeader />
        <BarSearchContent />
        <BarSearchFooter />
      </ContentWrapper>
    </>
  )
}

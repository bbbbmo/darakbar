import ContentWrapper from '@/components/ui/layout/ContentWrapper'
import BarRegister from './_components/BarRegister'
import SubNavBar from '../_components/SubNavBar'

export default function BarSuggestionPage() {
  return (
    <>
      <SubNavBar
        title="바 제안하기"
        description="알고 계신 바 정보를 공유해서 다른 사용자들에게 도움을 주세요"
        href="/bars"
      />
      <ContentWrapper>
        <BarRegister />
      </ContentWrapper>
    </>
  )
}

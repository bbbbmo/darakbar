// 컴포넌트
import GlobalNav from "../../components/layout/GlobalNav";
import GlobalFooter from "../../components/layout/GlobalFooter";
export default function Home() {
  return (
    <>
      {/* Nav 바 */}
      <GlobalNav />
      <div className="wrapper h-full w-full px-15 pt-15"></div>
      <GlobalFooter />
    </>
  );
}

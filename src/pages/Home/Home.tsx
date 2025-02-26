// 컴포넌트
import GlobalNav from "../../components/layout/GlobalNav";
import GlobalFooter from "../../components/layout/GlobalFooter";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      {/* Nav 바 */}
      <GlobalNav />
      <div className="wrapper h-full w-full px-15 pt-15 text-amber-400">
        <div className="introduce mt-10 mb-10 flex h-full w-full">
          <img src="/images/bg.jpg" className="introduce__img h-110 w-220" />
          <p className="introduce__text ml-5 flex flex-col justify-between">
            <h1 className="text-8xl">칵테일 레시피 공유 서비스</h1>
            <br />
            <span>
              다락바는 자신만의 칵테일 레시피를 만들고 공유하는 공간입니다.
            </span>
            <span></span>
            <Link to="/recipe-register" className="ml-auto">
              <button className="btn-secondary sm:w-30 xl:w-50">
                시작하기
              </button>
            </Link>
          </p>
        </div>
      </div>
      <GlobalFooter />
    </>
  );
}

// 컴포넌트
import GlobalNav from "../../components/Nav/GlobalNav";
import GlobalFooter from "../../components/GlobalFooter";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen";
export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [showIntro, setShowIntro] = useState<boolean>(false);
  const location = useLocation(); // 현재 url 정보를 담은 location 객체 반환

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  useEffect(() => {
    setShowIntro(false);
    const timeoutId = setTimeout(() => setShowIntro(true), 10);
    return () => clearTimeout(timeoutId);
  }, [location]);
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="flex h-full flex-col">
          {/* Nav 바 */}
          <GlobalNav />
          <div
            className={`wrapper h-full w-full px-15 pt-16 text-amber-400 ${showIntro ? "opacity-100" : "opacity-0"} transition delay-100 duration-600`}
          >
            <div className="introduce mt-10 mb-10 flex w-full">
              <img
                src="/images/bg.jpg"
                className="introduce__img h-110 w-220"
              />
              <p className="introduce__text ml-5 flex flex-col justify-between">
                <span className="text-7xl">다락바 - 나만의 칵테일 레시피</span>
                <br />
                <span>
                  다락바는 마치 나만의 작은 다락방처럼, 잊혀진 보물과 같은
                  칵테일 레시피들이 숨어있는 공간입니다.
                  <br></br>
                  이곳에서 여러분만의 독창적인 레시피와 그 속에 담긴 감성을
                  보여주세요.
                </span>
                <span className="font-bold text-black">
                  #나만의 레시피 만들기 #레시피 공유 #전국 바 찾기
                </span>
                <Link to="/recipe-register" className="ml-auto">
                  <button className="btn-secondary sm:w-30 xl:w-50">
                    시작하기
                  </button>
                </Link>
              </p>
            </div>
          </div>
          <GlobalFooter />
        </div>
      )}
    </>
  );
}

import NavMenu from "./components/NavMenu";
import UserProfile from "./components/UserProfile";

export default function GlobalNav() {
  // [TODO] 스크롤 이동 안되는 버그 수정
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <nav className="fixed top-0 z-10 flex h-16 w-full items-center justify-between bg-neutral-700 px-5 text-lg">
        {/* 로고 */}
        <div
          className="nav-title mr-auto cursor-pointer hover:animate-bounce"
          onClick={scrollToTop}
        >
          <div className="flex items-center gap-2">
            <img src="/images/logo/logo-icon.png" alt="Logo" className="w-9" />
            <img src="images/logo/logo-text.png" className="w-20" />
          </div>
        </div>

        <NavMenu />

        <div className="mr-5 ml-auto">
          <UserProfile />
        </div>
      </nav>
    </>
  );
}

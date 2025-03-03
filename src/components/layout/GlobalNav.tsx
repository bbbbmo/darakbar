import { UserIcon } from "@heroicons/react/24/solid";
import Menu from "./Menu";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../supabase";
import useAuth from "../../hooks/useAuth";
import LoadingScreen from "../LoadingScreen";

export default function GlobalNav() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { session, isLoading } = useAuth();
  const user = session?.user; // 현재 로그인된 유저 정보
  const navigate = useNavigate();

  const toggleUserMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /** 로그아웃, 에러 발생 시 alert */
  const signOut = async () => {
    navigate("/");
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(`로그아웃 에러 발생 ${error}`);
    }
    alert("로그아웃 완료 !");
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <nav className="border-b-white-100 fixed top-0 z-10 flex h-16 w-full items-center justify-between bg-neutral-700 px-5 text-lg">
          <div className="nav-title mr-auto cursor-pointer hover:animate-bounce">
            <Link to="/">
              <div className="flex items-center gap-2">
                <img
                  src="/images/logo/logo-icon.png"
                  alt="Logo"
                  className="w-9"
                />
                <img src="images/logo/logo-text.png" className="w-20" />
                {/* <span className="nav-title-name font-unpen text-2xl text-amber-400">
            다락바
          </span> */}
              </div>
            </Link>
          </div>
          <div className="flex flex-grow justify-center">
            <ul className="nav-menu flex gap-5">
              <li>
                <Link to="/">Home</Link>
              </li>
              <span className="border-r border-stone-400"></span>
              <li>
                <Link to="/recipe-register">나만의 레시피</Link>
              </li>
              <span className="border-r border-stone-400"></span>
              <li>
                <Link to="/recipe-navigation">레시피 탐색</Link>
              </li>
            </ul>
          </div>
          <div className="relative ml-auto">
            {session ? (
              <div className="flex items-center gap-3">
                <div>
                  <UserIcon
                    className="size-6 cursor-pointer"
                    onClick={toggleUserMenu}
                  />
                  <Menu isOpen={isMenuOpen}>
                    <div onClick={signOut}>로그아웃</div>
                    <Link to="/user-profile">
                      <div>정보수정</div>
                    </Link>
                  </Menu>
                </div>
                <div className="font-bold">
                  {user &&
                  user.identities &&
                  user.identities[0]?.identity_data?.name
                    ? user.identities[0].identity_data.name
                    : "No name available"}
                </div>
              </div>
            ) : (
              <>
                <UserIcon
                  className="size-6 cursor-pointer"
                  onClick={toggleUserMenu}
                />
                <Menu isOpen={isMenuOpen}>
                  <Link to="/signin">
                    <div>로그인</div>
                  </Link>
                  <Link to="/signup">
                    <div>회원가입</div>
                  </Link>
                </Menu>
              </>
            )}
          </div>
        </nav>
      )}
    </>
  );
}

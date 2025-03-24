import { UserIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../../Menu";
import supabase from "../../../supabase";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";

export default function UserProfile() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { session } = useAuth();

  const user = session?.user.user_metadata; // 현재 로그인된 유저 정보

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
      {session ? (
        <div
          className="relative flex cursor-pointer items-center gap-4"
          onClick={toggleUserMenu}
        >
          <UserIcon className="user-icon size-6" />
          <div className="absolute top-10 right-0 mt-2">
            <Menu isOpen={isMenuOpen}>
              <span onClick={signOut}>로그아웃</span>
              <Link to="/edit-profile">
                <span>정보수정</span>
              </Link>
            </Menu>
          </div>

          <div className="user-name font-bold">
            {user ? user.name : "No name available"}
          </div>
        </div>
      ) : (
        <div
          className="relative flex cursor-pointer items-center gap-4"
          onClick={toggleUserMenu}
        >
          <UserIcon className="user-icon size-6" />
          <div className="absolute top-10 right-0 mt-2">
            <Menu isOpen={isMenuOpen}>
              <Link to="/signin">
                <span>로그인</span>
              </Link>
              <Link to="/signup">
                <span>회원가입</span>
              </Link>
            </Menu>
          </div>
        </div>
      )}
    </>
  );
}

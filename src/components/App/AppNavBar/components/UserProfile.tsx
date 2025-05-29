import { UserIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  NavbarToggle,
} from "flowbite-react";
import supabase from "../../../../supabase";
import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();
  const { session, userName } = useAuth();
  const [profileImage, setProfileImage] = useState(null);

  console.log(session);
  const userId = session?.user.id;

  const getProfileImage = async () => {
    const { data, error } = await supabase
      .from("userinfo")
      .select("profile_img_url")
      .eq("id", userId);
    if (data) {
      setProfileImage(data[0].profile_img_url);
      console.log(data);
    }
    if (error) {
      alert(`유저 프로필 가져오기 중 에러 발생 ${error.message}`);
    }
  };

  /** 로그아웃, 에러 발생 시 alert */
  const signOut = async () => {
    navigate("/");
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(`로그아웃 에러 발생 ${error.message}`);
    }
    alert("로그아웃 완료 !");
  };

  useEffect(() => {
    if (userId) {
      getProfileImage();
    }
  }, [userId]);
  return (
    <>
      <Dropdown
        arrowIcon={false}
        inline
        label={
          profileImage ? (
            <Avatar alt="User Avatar" img={profileImage} rounded />
          ) : (
            <UserIcon className="user-icon size-6" />
          )
        }
      >
        <DropdownHeader>
          <span className="block text-sm">{userName}</span>
          <span className="block truncate text-sm font-medium">
            {session?.user.email}
          </span>
        </DropdownHeader>
        {session ? (
          <>
            <DropdownItem>
              <Link to="/edit-profile">정보수정</Link>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={signOut}>로그아웃</DropdownItem>
          </>
        ) : (
          <>
            <DropdownItem>
              <Link to="/signin">로그인</Link>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem>
              <Link to="/signup">회원가입</Link>
            </DropdownItem>
          </>
        )}
      </Dropdown>
      <NavbarToggle />
    </>
  );
}

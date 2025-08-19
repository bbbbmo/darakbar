import { UserIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  NavbarToggle,
} from "flowbite-react";
import supabase from "../../../../supabase/supabase";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { useQueryClient } from "@tanstack/react-query";
import AppSnackBar from "../../AppSnackBar/AppSnackBar";
import { useState } from "react";
import { AppSnackBarColor } from "../../AppSnackBar/AppSnackBar.types";
import { AuthError } from "@supabase/supabase-js";

export default function UserProfile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userData } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);

  /** 로그아웃, 에러 발생 시 alert */
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      useAuthStore.getState().reset();
      queryClient.clear();
      if (error) {
        throw new Error(`로그아웃 에러 발생 ${error.message}`);
      }
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof AuthError) {
        setSignOutError(error.message);
      } else {
        setSignOutError("알 수 없는 에러가 발생했습니다.");
      }
    } finally {
      setIsOpen(true);
    }
  };

  return (
    <>
      <Dropdown
        arrowIcon={false}
        inline
        label={
          userData?.avatarUrl ? (
            <Avatar alt="User Avatar" img={userData.avatarUrl} rounded />
          ) : (
            <UserIcon className="user-icon size-6" />
          )
        }
      >
        <DropdownHeader>
          <strong className="block">{userData?.name}</strong>

          <span className="block truncate text-sm font-medium">
            {userData?.email}
          </span>
        </DropdownHeader>
        {userData ? (
          <>
            <DropdownItem onClick={() => navigate("/edit-profile")}>
              정보수정
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={signOut}>로그아웃</DropdownItem>
          </>
        ) : (
          <>
            <DropdownItem onClick={() => navigate("/signin")}>
              로그인
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={() => navigate("/signup")}>
              회원가입
            </DropdownItem>
          </>
        )}
      </Dropdown>
      <NavbarToggle />
      <AppSnackBar
        color={
          signOutError ? AppSnackBarColor.FAILURE : AppSnackBarColor.SUCCESS
        }
        open={isOpen}
        onClose={() => setIsOpen(false)}
        position="top"
        subject="로그아웃"
        message={signOutError ?? "로그아웃 완료 !"}
      />
    </>
  );
}

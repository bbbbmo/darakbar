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
import { Link, useNavigate } from "react-router-dom";
import { useProfileQuery } from "@/hooks/useProfileQuery";
import { useAuthStore } from "@/stores/authStore";
import { useQueryClient } from "@tanstack/react-query";
import AppSnackBar from "../../AppSnackBar/AppSnackBar";
import { useState } from "react";
import { AppSnackBarColor } from "../../AppSnackBar/AppSnackBar.types";
import { AuthError } from "@supabase/supabase-js";

export default function UserProfile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: profile } = useProfileQuery();
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
          profile?.profile_img_url ? (
            <Avatar alt="User Avatar" img={profile.profile_img_url} rounded />
          ) : (
            <UserIcon className="user-icon size-6" />
          )
        }
      >
        <DropdownHeader>
          <strong className="block text-sm">{profile?.name}</strong>

          <span className="block truncate text-sm font-medium">
            {profile?.email}
          </span>
        </DropdownHeader>
        {profile ? (
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

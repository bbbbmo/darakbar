import { User } from "@supabase/supabase-js";
import supabase from "../supabase";
import { uploadToStorage } from "./storage";

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    throw new Error(error?.message || "유저 정보를 가져올 수 없습니다.");
  }

  return data.user; // User 객체
};

/**
 * @description 유저 프로필 이미지 가져오기
 * @param userId 유저 아이디
 * @returns 유저 프로필 이미지 주소
 */
export const getUserProfileImage = async (userId: string) => {
  const { data, error } = await supabase
    .from("userinfo")
    .select("profile_img_url")
    .eq("id", userId);
  if (error) {
    throw new Error(`유저 프로필 가져오기 중 에러 발생 ${error.message}`);
  }
  if (!data || data.length === 0) {
    throw new Error("유저 정보를 찾을 수 없습니다.");
  }
  if (data) {
    return data[0].profile_img_url;
  }
};

/**
 * @description 이미지 파일 유효성 검사
 * @param file 업로드할 이미지 파일
 */
const imageFileValidation = (file: File) => {
  // 파일 유효성 검사
  if (!file) {
    throw new Error("파일이 선택되지 않았습니다.");
  }

  // 이미지 파일 타입 체크
  if (!file.type.startsWith("image/")) {
    throw new Error("이미지 파일만 업로드 가능합니다.");
  }

  // 파일 크기 체크 (1MB 이하)
  if (file.size > 1024 * 1024) {
    throw new Error("파일 크기는 1MB를 넘을 수 없습니다.");
  }

  // 파일 확장자 체크
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      "지원하지 않는 이미지 형식입니다. (JPEG, PNG, GIF, WebP만 지원)",
    );
  }
};

/**
 * @description 유저 프로필 이미지 업로드 및 업데이트
 * @param file 업로드할 이미지 파일
 * @param userId 유저 아이디
 * @returns 업로드된 이미지 URL
 */
export const uploadUserProfileImage = async (file: File, userId: string) => {
  try {
    imageFileValidation(file);

    // 파일명 생성 (중복 방지)
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `${userId}/profile/${fileName}`;

    const { path, error: uploadError } = await uploadToStorage(file, filePath);

    if (uploadError) {
      throw new Error(`이미지 업로드 실패: ${uploadError.message}`);
    }

    // 데이터베이스에 프로필 이미지 URL 업데이트
    const { error: updateError } = await supabase
      .from("userinfo")
      .update({
        profile_img_url: path,
      })
      .eq("id", userId);

    if (updateError) {
      throw new Error(
        `프로필 이미지 URL 업데이트 실패: ${updateError.message}`,
      );
    }

    return path;
  } catch (error) {
    throw new Error(`프로필 이미지 업로드 에러: ${error}`);
  }
};

/**
 * @description 유저 프로필 수정
 * @param newName 새로운 이름
 * @param newEmail 새로운 이메일
 * @param newPassword 새로운 비밀번호
 * @returns 수정된 유저 정보
 */
export const updateUserProfile = async (
  newName?: string | null,
  newEmail?: string | null,
  newPassword?: string | null,
): Promise<User> => {
  const { data, error } = await supabase.auth.updateUser({
    ...(newEmail && { email: newEmail }),
    ...(newPassword && { password: newPassword }),
    ...(newName
      ? {
          data: {
            ...(newName && { name: newName }),
          },
        }
      : {}),
  });
  if (error) {
    throw new Error(`유저 프로필 수정 중 에러 발생 ${error.message}`);
  }
  return data.user;
};

/**
 * @description 유저 프로필 이미지 삭제
 * @param userId 유저 아이디
 */
export const deleteUserProfileImage = async (userId: string) => {
  try {
    const filePath = `${userId}/profile`;
    // Storage에서 기존 이미지 파일들 삭제
    const { data: files, error: listError } = await supabase.storage
      .from("darackbar-storage")
      .list(filePath);

    if (listError) {
      throw new Error(`기존 파일 목록 조회 실패: ${listError.message}`);
    }

    if (files && files.length > 0) {
      const fileNames = files.map((file) => `${userId}/profile/${file.name}`);

      const { error: deleteError } = await supabase.storage
        .from("darackbar-storage")
        .remove(fileNames);

      if (deleteError) {
        throw new Error(`기존 파일 삭제 실패: ${deleteError.message}`);
      }
    }

    // 데이터베이스에서 프로필 이미지 URL 제거
    const { error: updateError } = await supabase
      .from("userinfo")
      .update({
        profile_img_url: null,
      })
      .eq("id", userId);

    if (updateError) {
      console.warn("프로필 이미지 URL 제거 실패:", updateError.message);
    }
  } catch (error) {
    throw new Error(`프로필 이미지 삭제 에러: ${error}`);
  }
};

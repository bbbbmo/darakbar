import supabase from "../supabase";

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
  if (data) {
    return data[0].profile_img_url;
  }
  if (error) {
    throw new Error(`유저 프로필 가져오기 중 에러 발생 ${error.message}`);
  }
};

export const patchUserProfileImage = async (file: File) => {
  if (file) {
    // 파일 유형 체크 (이미지 파일인지 확인)
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    // 파일 크기 체크 (1MB 이하), 1MB = 1024KB = 1024 * 1024 Bytes
    if (file.size > 1024 * 1024) {
      alert("파일 크기는 1MB를 넘을 수 없습니다.");
      return;
    }
    // 이미지 미리보기 설정
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
    };
    reader.readAsDataURL(file);
  } else {
    alert("잘못된 파일입니다.");
  }
};

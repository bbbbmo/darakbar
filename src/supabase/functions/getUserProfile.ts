import supabase from "../supabase";

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

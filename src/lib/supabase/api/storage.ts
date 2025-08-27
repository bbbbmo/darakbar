import supabase from "@lib/supabase/supabase";

/**
 * @description supabase storage에 파일 업로드
 * @param file 업로드할 파일
 * @param filePath 업로드할 파일 경로
 * @returns 업로드된 파일 데이터와 에러
 */
export const uploadToStorage = async (file: File, filePath: string) => {
  const { data, error } = await supabase.storage
    .from("darakbar-storage")
    .upload(filePath, file, {
      cacheControl: "3600", // 파일 캐시 시간 (초 단위)
      upsert: true,
    });

  return { data, ...data, error };
};

export const getUrlFromStorage = async (filePath: string) => {
  const { data } = await supabase.storage
    .from("darakbar-storage")
    .getPublicUrl(filePath);

  return data.publicUrl;
};

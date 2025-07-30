import supabase from "../supabase";

export const uploadToStorage = async (file: File, filePath: string) => {
  const { data, error } = await supabase.storage
    .from("darakbar-storage")
    .upload(filePath, file, {
      cacheControl: "3600", // 파일 캐시 시간 (초 단위)
      upsert: true,
    });

  return { ...data, error };
};

export const getUrlFromStorage = async (filePath: string) => {
  const { data } = await supabase.storage
    .from("darakbar-storage")
    .getPublicUrl(filePath);

  return data.publicUrl;
};

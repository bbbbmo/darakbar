import supabase from "../../supabase";

/**
 * @description 재료 조회
 * @returns 재료 데이터
 */
export const getIngredients = async (name?: string) => {
    let query = supabase.from("ingredients").select("*");
  
    if (name) {
      query = query.eq("name", name);
    }
  
    const { data, error } = await query;
    return { data, error };
  };
import supabase from "../supabase";

export const getRecipes = async (userId?: number) => {
  let query = supabase
    .from("recipes")
    .select("*")
    .order("created_at", { ascending: false });

  if (userId) {
    query = query.eq("user_id", userId).eq("is_user_recipe", true);
  }

  const { data, error } = await query;
  return { data, error };
};

// export const createRecipes = async () => {
//   const { data, error } = await supabase
//     .from("recipes")
//     .insert({
//       name: "test",
//     })
//     .select();
//   return { data, error };
// };

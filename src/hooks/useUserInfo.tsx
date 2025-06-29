// import supabase from "../supabase";

// const fetchUserProfile = async () => {
//   const {
//     data: { user },
//     error,
//   } = await supabase.auth.getUser();
//   if (error) throw error;
//   return user;
// };

// export const useUserInfo = () => {
//   return useQuery({
//     queryKey: ["user"],
//     queryFn: fetchUserProfile,
//     staleTime: 1000 * 60 * 5, // 5분 동안 fresh
//     gcTime: 1000 * 60 * 10,
//   });
// };

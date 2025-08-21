import { getUserProfile } from "@/app/supabase/api/user";
import { useQuery } from "@tanstack/react-query";

export const useProfileQuery = (userId: string) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => {
      if (!userId) throw new Error("유저 아이디가 없습니다.");
      return getUserProfile(userId);
    },
    enabled: !!userId,
  });
};

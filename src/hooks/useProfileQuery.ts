import { useAuthStore } from "@/stores/authStore";
import { getUserProfile } from "@/supabase/api/user";
import { useQuery } from "@tanstack/react-query";

export const useProfileQuery = () => {
  const { userData } = useAuthStore();

  return useQuery({
    queryKey: ["profile", userData?.id],
    queryFn: () => {
      if (!userData?.id) throw new Error("유저 아이디가 없습니다.");
      return getUserProfile(userData.id);
    },
    enabled: !!userData?.id,
  });
};

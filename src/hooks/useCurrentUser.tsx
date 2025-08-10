import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/supabase/api/user";

export const useCurrentUser = () => {
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const userId = userData?.user?.id ?? null;
  const userEmail = userData?.user?.email ?? null;
  const userName = userData?.user?.user_metadata?.name ?? null;

  return { userId, userEmail, userName, userData, isLoading, error };
};

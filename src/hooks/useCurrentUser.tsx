import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/supabase/functions/user";

export const useCurrentUser = () => {
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const userId = userData?.id ?? null;
  const userEmail = userData?.email ?? null;
  const userName = userData?.user_metadata?.name ?? null;

  return { userId, userEmail, userName, userData, isLoading, error };
};

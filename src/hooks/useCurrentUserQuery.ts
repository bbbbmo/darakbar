import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/supabase/api/user";

export const useCurrentUser = () => {
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const userId = userData?.user?.id 
  const userEmail = userData?.user?.email 
  const userName = userData?.user?.user_metadata?.name 

  return { userId, userEmail, userName, userData, isLoading, error };
};

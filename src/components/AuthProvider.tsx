import { useAuthStore } from "@/stores/authStore";
import supabase from "@/supabase/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setAuth = useAuthStore((state) => state.setAuth);
  const setReady = useAuthStore((state) => state.setReady);
  const { session, isReady } = useAuthStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (mounted) {
        setAuth({
          user: data?.session?.user ?? null,
          session: data?.session ?? null,
        });
        setReady(true);
      }
    })();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // 로그인/로그아웃 시 자동으로 감지
      setAuth({ user: session?.user ?? null, session: session ?? null });

      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["user-recipe"] });
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [setAuth, setReady, queryClient]);

  if (!isReady) return <LoadingScreen />;

  return <>{session === null ? <Navigate to="/signin" /> : <>{children}</>}</>;
}

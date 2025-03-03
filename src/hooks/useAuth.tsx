import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import supabase from "../supabase";

/** 현재 이용자가 로그인 상태인지 확인하고 session과 isLoading을 반환하는 hook*/
export default function useAuth() {
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false); // 세션 정보 로딩 완료
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session: Session | null) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  return { session, isLoading };
}

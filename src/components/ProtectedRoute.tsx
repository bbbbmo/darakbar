import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "../supabase";

// 로그인한 경우 이 페이지, 로그인 하지 않은 경우는 로그인 페이지로 가게 함
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 첫 번째 렌더링 시 로그인된 사용자 세션 확인
    const checkSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getSession(); // 로그인된 사용자 정보 가져오기
      if (user) {
        setUser(user); // 로그인된 경우 user 상태 업데이트
      }
    };

    checkSession(); // 세션 확인

    // 인증 상태 변경 리스너 등록
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user); // 로그인된 경우 상태 업데이트
        } else {
          setUser(null); // 로그아웃된 경우 상태 null로 설정
        }
      },
    );

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  if (user === null) {
    // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    return <Navigate to="/signin" />;
  }

  return <>{children}</>; // 로그인한 경우 자식 요소를 렌더링
}
